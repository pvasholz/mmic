// netlify/functions/match.js
// ────────────────────────────────────────────────────────────────────────────
// Match Made In Class — group matching function.
//
// Receives one respondent (the usability-test "tester") from the questionnaire
// frontend, combines them with a synthetic user pool generated with Gemini, scores personality
// instruments, builds a matching prompt, calls Venice.ai, and returns just the
// tester's group to the frontend.
//
// Design notes (the "why" behind the code below):
//
// 1. Pre-computed flags, not LLM judgment. Difficult-to-work-with routing is
//    based on deterministic rules from the respondent's *own answers*, not on
//    LLM-interpreted character judgment. This is defensible, reproducible,
//    and respects that respondents are self-flagging. The LLM decides what
//    to do with the flags (routing), not whether someone gets flagged.
//
// 2. Personality is a structured composition signal, not a threshold compatibility 
//    factor. Communication, pace, availability, and logistics determine whether a group
//    is viable; personality helps choose stronger compositions among viable groups.
//
// 3. Only the tester's group is returned to the frontend. The function
//    computes all groups internally (the LLM needs the whole cohort to do
//    conflict-routing) but the frontend only sees the tester's row. This
//    keeps payloads small and prevents devtools snooping into other groups'
//    rationale.
//
// 4. Fail-loud on missing env vars, fail-soft on LLM failures. Missing API
//    key throws at startup (configuration error, deploy-time problem).
//    LLM call failures return a structured error the frontend's fail-open
//    path can detect and fall back to the static team display.
// ────────────────────────────────────────────────────────────────────────────

'use strict';

// ── Configuration ───────────────────────────────────────────────────────────
const AKASH_URL = 'https://api.venice.ai/api/v1/chat/completions';
const MODEL = 'qwen3-next-80b';   
const TEMPERATURE = 0.4;                  // lower than chat default — matching wants consistency
const MAX_TOKENS = 1500;
const REQUEST_TIMEOUT_MS = 28_000;

const TARGET_GROUP_SIZE = 4;
const MIN_GROUP_SIZE = 3;
const MAX_GROUP_SIZE = 5;

// ── Load seeded cohort at cold start ────────────────────────────────────────
// Bundled alongside the function. See seeded_cohort.json.
const SEEDED_COHORT = require('./seeded_cohort.json');

function loadCohort() {
  return SEEDED_COHORT;
}

// ── Personality scoring (deterministic, runs in this function) ──────────────
// TIPI: 10 items, 7-point Likert. Items at indices 1,3,5,7,9 are reverse-scored.
// Trait pairs (BIG5 order): E=[0,5], A=[1,6], C=[2,7], N=[3,8], O=[4,9].
const TIPI_LABELS = [
  'Extraverted, enthusiastic',
  'Critical, quarrelsome',
  'Dependable, self-disciplined',
  'Anxious, easily upset',
  'Open to new experiences, complex',
  'Reserved, quiet',
  'Sympathetic, warm',
  'Disorganized, careless',
  'Calm, emotionally stable',
  'Conventional, uncreative',
];
const TIPI_REVERSE = new Set([1, 3, 5, 7, 9]);
const TIPI_TRAITS = { E: [0, 5], A: [1, 6], C: [2, 7], N: [3, 8], O: [4, 9] };

function scoreTipi(rawByLabel) {
  // rawByLabel is { "Extraverted, enthusiastic": 5, ... } on a 1–7 scale.
  // Returns { extraversion, agreeableness, conscientiousness, neuroticism, openness }
  // on a 1–7 scale (averaged across the two items per trait, with reverse-flipping).
  if (!rawByLabel || Object.keys(rawByLabel).length === 0) return null;

  const flip = (v) => 8 - v;
  const item = (idx) => {
    const raw = rawByLabel[TIPI_LABELS[idx]];
    if (raw === undefined || raw === null) return null;
    return TIPI_REVERSE.has(idx) ? flip(raw) : raw;
  };

  const traits = {};
  // Note: in standard TIPI scoring (Gosling 2003), the N trait pair scores
  // *emotional stability*, not neuroticism (items 4-reversed + 9 average →
  // higher = calmer/more stable). For consistency with Mini-IPIP (which
  // scores neuroticism directly), we flip TIPI's ES into N here: N = 8 - ES.
  // Both instruments now produce a comparable `neuroticism` value where
  // higher = more neurotic, regardless of which form the respondent took.
  const names = {
    E: 'extraversion', A: 'agreeableness', C: 'conscientiousness',
    N: 'neuroticism', O: 'openness',
  };
  for (const [k, indices] of Object.entries(TIPI_TRAITS)) {
    const vals = indices.map(item).filter((v) => v !== null);
    if (!vals.length) { traits[names[k]] = null; continue; }
    let avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    // TIPI's N pair scores emotional stability; flip to neuroticism.
    if (k === 'N') avg = 8 - avg;
    traits[names[k]] = +avg.toFixed(2);
  }
  return { ...traits, instrument: 'TIPI', scale_max: 7 };
}

// Mini-IPIP: 20 items, 5-point Likert. Reverse flags live alongside the items
// in the frontend definition; we re-declare them here so this function is
// self-contained (no frontend imports).
const MINI_IPIP_ITEMS = [
  { t: 'Am the life of the party.', f: 'E', r: false },
  { t: "Sympathize with others' feelings.", f: 'A', r: false },
  { t: 'Get chores done right away.', f: 'C', r: false },
  { t: 'Have frequent mood swings.', f: 'N', r: false },
  { t: 'Have a vivid imagination.', f: 'O', r: false },
  { t: "Don't talk a lot.", f: 'E', r: true },
  { t: "Am not interested in other people's problems.", f: 'A', r: true },
  { t: 'Often forget to put things back in their proper place.', f: 'C', r: true },
  { t: 'Am relaxed most of the time.', f: 'N', r: true },
  { t: 'Am not interested in abstract ideas.', f: 'O', r: true },
  { t: 'Talk to a lot of different people at parties.', f: 'E', r: false },
  { t: "Feel others' emotions.", f: 'A', r: false },
  { t: 'Like order.', f: 'C', r: false },
  { t: 'Get upset easily.', f: 'N', r: false },
  { t: 'Have difficulty understanding abstract ideas.', f: 'O', r: true },
  { t: 'Keep in the background.', f: 'E', r: true },
  { t: 'Am not really interested in others.', f: 'A', r: true },
  { t: 'Make a mess of things.', f: 'C', r: true },
  { t: 'Seldom feel blue.', f: 'N', r: true },
  { t: 'Do not have a good imagination.', f: 'O', r: true },
];

function scoreMiniIpip(rawByText) {
  if (!rawByText || Object.keys(rawByText).length === 0) return null;

  const traitBuckets = { E: [], A: [], C: [], N: [], O: [] };
  for (const item of MINI_IPIP_ITEMS) {
    const raw = rawByText[item.t];
    if (raw === undefined || raw === null) continue;
    const scored = item.r ? 6 - raw : raw; // 5-point scale → reverse with 6 - v
    traitBuckets[item.f].push(scored);
  }

  const names = {
    E: 'extraversion', A: 'agreeableness', C: 'conscientiousness',
    N: 'neuroticism', O: 'openness',
  };
  const out = {};
  for (const [k, vals] of Object.entries(traitBuckets)) {
    out[names[k]] = vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : null;
  }
  return { ...out, instrument: 'MiniIPIP', scale_max: 5 };
}

function scorePersonality(respondent) {
  // Frontend sends both maps but only one will be populated based on version choice.
  const { bigFive, miniIpip } = respondent.personality || {};
  if (respondent.length === 'long' && miniIpip && Object.keys(miniIpip).length) {
    return scoreMiniIpip(miniIpip);
  }
  if (bigFive && Object.keys(bigFive).length) {
    return scoreTipi(bigFive);
  }
  return null;
}

function median(nums) {
  const clean = nums
    .filter((n) => typeof n === 'number' && Number.isFinite(n))
    .sort((a, b) => a - b);

  if (!clean.length) return null;

  const mid = Math.floor(clean.length / 2);
  return clean.length % 2
    ? clean[mid]
    : +((clean[mid - 1] + clean[mid]) / 2).toFixed(3);
}

function normalizeTrait(value, scaleMax) {
  if (typeof value !== 'number' || !Number.isFinite(value) || !scaleMax) {
    return null;
  }

  // Both instruments start at 1, so normalize 1..scaleMax to 0..1.
  return +((value - 1) / (scaleMax - 1)).toFixed(3);
}

function computePersonalityContext(cohort) {
  const traits = [
    'extraversion',
    'agreeableness',
    'conscientiousness',
    'neuroticism',
    'openness',
  ];

  const normalizedMedians = {};

  for (const trait of traits) {
    normalizedMedians[trait] = median(
      cohort.map((r) =>
        normalizeTrait(
          r.personality_scored?.[trait],
          r.personality_scored?.scale_max
        )
      )
    );
  }

  return {
    normalized_trait_medians: normalizedMedians,
    scale: '0–1 normalized from each respondent’s instrument scale',
    interpretation:
      'Use these medians only as cohort-relative anchors for composition rules, not as clinical or diagnostic cutoffs.',
  };
}

// ── Deterministic difficulty flags ──────────────────────────────────────────
// These flags are descriptive labels of the respondent's own answers, not
// character judgments. The LLM uses them for routing (2+ flags → place in a
// group with at least two high-agreeableness members), not for exclusion.
//
// Single flags trigger nothing on their own. Routing only fires when patterns
// compound — that's the difference between "one trait" and "a syndrome", and
// it's also why this design isn't reducible to stigmatizing any one answer.

function computeMatcherFlags(r) {
  const flags = [];

  if (r.expectations?.slacker === 'Pick up the slack / avoid conflict') {
    flags.push('avoids_direct_conflict');
  }
  if (r.workHabits?.deliverHist === "It depended on the task — some tasks went smoothly, others didn't") {
    flags.push('inconsistent_delivery');
  }
  if (r.workHabits?.respondPace === 'It depends on my schedule') {
    flags.push('unpredictable_response');
  }
  if (
    r.motivation?.importance === 'Just need to pass' &&
    r.motivation?.timeAvail === "I'm stretched thin this term and only have time to make the necessary contributions"
  ) {
    flags.push('low_engagement_risk');
  }

  return flags;
}

// ── Prompt assembly ─────────────────────────────────────────────────────────

function buildSystemPrompt(groupCount, groupSize) {
  return `You are forming groups for a graduate HCI course project.

## Group structure
Form ${groupCount} groups. Target group size is ${groupSize}; groups of ${MIN_GROUP_SIZE}–${MAX_GROUP_SIZE} are acceptable to keep all groups balanced. Everyone must be placed. No respondent is excluded.

## Compatibility factors
These are threshold conditions: a group that fails on these cannot function regardless of how well personalities mesh. Satisfy these first.

1. **Communication compatibility** — match on response-time expectations (\`expectations.respondExpect\`) and communication-style preference (\`expectations.commStyle\`). Mismatches here are the most predictive failure mode in our user research.
2. **Pace alignment** — match on deadline approach (\`expectations.deadlineStyle\`), respondent's own response pace (\`workHabits.respondPace\`), and historical delivery reliability (\`workHabits.deliverHist\`). Pace mismatch is the most common failure mode our user research surfaced.
3. **Time availability** — \`motivation.timeAvail\` should be roughly compatible within a group. Don't pair "stretched thin" with "can take on extra work" if avoidable.
4. **Logistics compatibility** — meeting mode (\`logistics.meetMode\`) and meetTimes overlap. Async-preferring respondents (Zoe in Bali, anyone in a non-CST timezone) need at least one other async-friendly groupmate.

## Composition factors
These determine how well a group will thrive, given that the compatibility conditions above are met. Use personality (Big Five via TIPI or Mini-IPIP) to prefer better group compositions among viable candidates:

  1. **Conscientiousness anchor:** include at least one member with conscientiousness at or above the normalized cohort median in every group. Avoid groups where all members score below the normalized cohort median — at least one reliable executor reduces coordination risk.
  2. **Avoid low-C / low-A concentration:** do not place multiple members with both low conscientiousness and low agreeableness in the same group. One such member is manageable; two or more compounds friction risk.
  3. **Extraversion balance:** prefer groups that include at least one higher-extraversion member (likely communication initiator) without clustering all high-extraversion members together. A group of all introverts may struggle to self-organize; a group of all dominant voices may create conflict.
  4. **Conflict-routing:** respondents with 2+ entries in \`matcher_flags\` should be placed in groups with at least two members whose \`personality.agreeableness\` is above the normalized cohort median. Do not place two heavily-flagged respondents in the same group.

Do NOT match by personality similarity. Diverse personalities are productive when communication style and pace are aligned. When describing the match, translate personality into work-style language — do not mention trait names or scores.

When a compatibility factor and a composition factor are in tension, resolve in favor of compatibility — not because personality matters less, but because a team needs to be able to meet and communicate before personality dynamics become relevant.

### Instrument reliability and weighting
Respondents who completed the long version (\`length === "long"\`) took the 20-item Mini-IPIP, which produces more reliable trait estimates than the 10-item TIPI taken by short-version respondents. Apply personality signals with **more confidence** for Mini-IPIP respondents and **more caution** for TIPI respondents — treat TIPI scores as directional rather than precise, and do not let a TIPI score alone decide a close placement.

### matcher_flags (descriptive, not evaluative)
Each respondent has a \`matcher_flags\` array indicating self-reported patterns that correlate with collaboration friction:
  - \`avoids_direct_conflict\`: prefers indirect handling of teammate issues
  - \`inconsistent_delivery\`: history of variable deadline performance
  - \`unpredictable_response\`: variable response time
  - \`low_engagement_risk\`: minimal investment combined with limited time

These are descriptive labels of the respondent's own answers. Use them only for routing as described above. Do not exclude, downgrade, or comment on flagged respondents in your output.

## Light tie-breakers / display factors
These factors should not override compatibility or composition rules, but they may help refine close decisions and explain the match to students.

- **Skills balance**: not a threshold compatibility factor. Use skills for student-facing chips and as a light composition signal only after communication, pace, availability, logistics, and personality-composition constraints are satisfied.
- **Topic preferences**: informational; you may use as a very weak tie-breaker if a group has clear convergent interest, but do not split otherwise-compatible groups over topic.

## Not used

- **Demographics** (excluded by design — not collected).



## Output

Return ONLY valid JSON, no prose before or after, matching this exact schema:

\`\`\`json
{
  "groups": [
    {
      "group_id": "G1",
      "member_ids": ["r_001", "r_007", "r_013", "r_018"],
      "headline": "One short sentence about THE GROUP — e.g., availability overlap, communication style, async/sync mix. Not about matching logic. Useful to a student about to meet their team.",
      "member_chips": {
        "r_001": ["chip 1", "chip 2", "chip 3"],
        "r_007": ["chip 1", "chip 2"],
        "r_013": ["chip 1", "chip 2", "chip 3"],
        "r_018": ["chip 1", "chip 2"]
      }
    }
  ]
}
\`\`\`

### Chip guidelines

Produce 4–5 chips per member. Each chip is a 2–5 word phrase drawn from a specific field in that respondent's questionnaire data. The goal is for a student to scan their teammate's card and immediately know what kind of collaborator they're working with — based on what that person actually said about themselves, not on generic positive labels.

**Source each chip from a real field.** Every chip should map to one of these:
- \`logistics.meetMode\` → "In-person preferred" / "Async-friendly" / "Sync online"
- \`logistics.meetTimes\` → the distinctive overlap, e.g. "Weekday evenings + Saturdays" (only if 1–2 windows; skip if more)
- \`logistics.availability\` → "Limited availability" / "Flexible schedule"
- \`motivation.importance\` → "Aims for strong outcome" / "Pass-focused" (use sparingly)
- \`motivation.timeAvail\` → "Can take on extra" / "Stretched thin this term"
- \`expectations.respondExpect\` → "Responds within hours" / "Responds within a day or two" / "Deadline-flexible"
- \`expectations.commStyle\` → "Communicates frequently" / "Surfaces issues quietly" / "Mid-frequency communicator"
- \`expectations.deadlineStyle\` → "Spreads work over time" / "Finishes early" / "Works close to deadline"
- \`expectations.workStyle\` → "Mix of independent + collaborative" / "Prefers close collaboration" / "Divides and works solo"
- \`workHabits.respondPace\` → covered by respondExpect; skip duplicates
- \`workHabits.deliverHist\` → "Reliable deliverer" (only for "Always") / "Mixed delivery history" (only for "It depended on the task")
- \`skillsRole.teamRole\` → "Leader/organizer" / "Supporter/helper" / "Contributor/doer"
- \`skillsRole.skills\` → name the top 1–2 skill areas, e.g. "Strong on research + writing"

**Diversity requirement.** Members of the same group should not have identical chip sets. If two members answered the same way on a particular question, the chip drawn from that question can repeat — but the overall set of 4–5 chips per person should reflect what makes each person distinct. If you find yourself writing the same chip on three or more members of one group, replace at least one with a chip from a different field for each of those members.

**Tone.** Neutral and descriptive. Help a student introduce themselves to teammates, not relitigate the matching decision.

**Banned chips** (vague filler that says nothing specific):
- "Detail-oriented"
- "Team player" / "Team-oriented"
- "Hard worker"
- "Early bird"
- "Collaborative"
- "Independent worker" (use "Divides and works solo" instead, drawn from workStyle)
- Any personality trait label (extraverted, agreeable, etc.)
- Any value from \`matcher_flags\`

**Banned because they leak the routing logic:**
- "Easy to work with"
- "Difficult to work with"
- "Low engagement"
- "High agreeableness"

Do not include any text outside the JSON. Do not wrap in markdown code fences. Just the JSON object.`;
}

function buildUserPrompt(cohort, personalityContext) {
  // Cohort is the full list (tester + seeds) with personality scored and flags computed.
  return `Form groups for the following cohort of ${cohort.length} respondents.

Use this precomputed personality context when applying composition rules:

${JSON.stringify(personalityContext, null, 2)}

Cohort:

${JSON.stringify(cohort, null, 2)}`;
}

// ── LLM call ────────────────────────────────────────────────────────────────
// AKASH_API_KEY is a historical name: this function now calls the configured OpenAI-compatible provider.
async function callAkash(systemPrompt, userPrompt) {
  const apiKey = process.env.AKASH_API_KEY;
  if (!apiKey) {
    // Fail loud on missing config — this is a deploy-time problem, not a runtime one.
    throw new Error('AKASH_API_KEY environment variable is not set');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(AKASH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
      model: MODEL,
      messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
      ],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      top_p: 0.9,
      venice_parameters: {
        include_venice_system_prompt: false,
        
      },
    }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '<no body>');
      throw new Error(`Akash returned ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? '';
  } finally {
    clearTimeout(timeout);
  }
}

// ── JSON extraction (handle models that don't reliably return clean JSON) ───

function extractJson(text) {
  if (!text) throw new Error('Empty LLM response');

  // First try: parse as-is.
  try {
    return JSON.parse(text);
  } catch (_) { /* fall through */ }

  // Second try: strip markdown code fences.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenced) {
    try {
      return JSON.parse(fenced[1]);
    } catch (_) { /* fall through */ }
  }

  // Third try: extract the outermost {...} block.
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = text.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch (_) { /* fall through */ }
  }

  throw new Error('Could not extract JSON from LLM response');
}

// ── Output filtering ────────────────────────────────────────────────────────
// The LLM returns all groups; the frontend only gets the tester's row.

function filterToTesterGroup(matchResult, testerId, cohort) {
  const groups = matchResult.groups || [];
  const testerGroup = groups.find((g) => (g.member_ids || []).includes(testerId));
  if (!testerGroup) {
    throw new Error(`Tester ${testerId} not found in any group`);
  }

  // Hydrate member IDs back into name+location+chips for the frontend.
  const idLookup = new Map(cohort.map((r) => [r.respondent_id, r]));
  const members = testerGroup.member_ids.map((id) => {
    const r = idLookup.get(id);
    if (!r) return null;
    const isTester = id === testerId;
    return {
      respondent_id: id,
      first_name: r.profile?.firstName ?? '',
      last_name: r.profile?.lastName ?? '',
      meetTimes: r.logistics?.meetTimes ?? [],
      location: r.profile?.location ?? '',
      chips: testerGroup.member_chips?.[id] ?? [],
      is_you: isTester,
    };
  }).filter(Boolean);

  return {
    your_group: {
      group_id: testerGroup.group_id,
      headline: testerGroup.headline ?? '',
      members,
    },
  };
}

// ── Handler ─────────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  // CORS for local dev (netlify dev serves frontend separately).
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const tester = JSON.parse(event.body || '{}');

    // Assign tester an ID and process them like a cohort member.
    const testerId = 'r_000';
    const testerProcessed = {
      respondent_id: testerId,
      ...tester,
      personality_scored: scorePersonality(tester),
      matcher_flags: computeMatcherFlags(tester),
      is_tester: true,
    };

    // Load seeded cohort. Seeds already have personality_scored and matcher_flags
    // baked in (computed offline) — see seeded_cohort.json.
    const seeds = loadCohort();

    const fullCohort = [testerProcessed, ...seeds];
    const personalityContext = computePersonalityContext(fullCohort);

    const cohortSize = fullCohort.length;
    const groupCount = Math.round(cohortSize / TARGET_GROUP_SIZE);

    // Build prompts and call LLM.
    const systemPrompt = buildSystemPrompt(groupCount, TARGET_GROUP_SIZE);
    const userPrompt = buildUserPrompt(fullCohort, personalityContext);
    const rawResponse = await callAkash(systemPrompt, userPrompt);
    const matchResult = extractJson(rawResponse);
    console.log('LLM returned groups:', JSON.stringify(matchResult, null, 2)); 
    const testerView = filterToTesterGroup(matchResult, testerId, fullCohort);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(testerView),
    };
  } catch (err) {
    console.error('match function error:', err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Unknown error', fallback_to_static: true }),
    };
  }
};
