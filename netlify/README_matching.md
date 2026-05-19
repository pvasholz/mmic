# Match Made In Class — Matching Backend

The static frontend POSTs the questionnaire payload to `/.netlify/functions/match`,
which scores personality, builds the matching prompt, calls Akash, and returns
the tester's assigned group.

## Architecture

```
[ React frontend ] ──POST──▶ [ Netlify Function ] ──HTTPS──▶ [ Akash MiniMax ]
   (groupa-*.js)               (match.js)                    (api.akashml.com)
                                    │
                                    └── reads seeded_cohort.json (bundled)
```

The frontend never holds the API key. Function failures fall through to the
prototype's static team display (see GroupScreen in `groupa-screens.js`).

## Local development

```bash
# One-time setup
npm install -g netlify-cli

# Create local env file (NEVER commit this)
echo "AKASH_API_KEY=your_akash_key_here" > .env

# Run frontend + functions together at http://localhost:8888
netlify dev
```

`.env` should be gitignored. The function reads `process.env.AKASH_API_KEY`
and throws at startup if it's missing.

## Deploy

```bash
# One-time
netlify login
netlify init

# Set the API key as an environment variable in Netlify
netlify env:set AKASH_API_KEY your_akash_key_here

# Deploy
netlify deploy --prod
```

The Akash key lives only in Netlify's environment settings, never in source.

## Swapping the model

Edit the `MODEL` constant at the top of `netlify/functions/match.js`:

```javascript
const MODEL = 'MiniMaxAI/MiniMax-M2.5';  // current
// const MODEL = 'meta-llama/Llama-3.3-70B-Instruct';  // fallback
```

If MiniMax struggles with structured JSON output during testing, switching to
Llama 3.3 70B is a one-line change. Both are OpenAI-compatible on Akash.

## What the function returns

On success, the frontend gets the tester's group hydrated for display:

```json
{
  "your_group": {
    "group_id": "G3",
    "headline": "Sync-friendly weekday-evening group, mix of leaders and supporters.",
    "members": [
      {
        "respondent_id": "tester_001",
        "first_name": "Your", "last_name": "Name",
        "location": "Chicago, IL",
        "chips": ["Communicates frequently", "Spreads work over time"],
        "is_you": true
      },
      { "respondent_id": "r_007", "first_name": "Aisha", ... }
    ]
  }
}
```

On any error (missing key, Akash unreachable, malformed LLM output):

```json
{ "error": "...", "fallback_to_static": true }
```

The frontend's `GroupScreen` detects this and renders the static prototype team.
