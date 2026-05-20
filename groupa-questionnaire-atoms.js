// Compiled from groupa-questionnaire-atoms.jsx — edit the corresponding .jsx if you want JSX back.
(function () {
  "use strict";

"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Full Group Formation Exercise questionnaire (Q1–Q23).
// Atoms + reference data. Paired with groupa-questionnaire.jsx which renders
// the screen. Loaded after groupa-screens.jsx so its overrides take effect.

var _QT = window.TOKENS;
var _QNOISE = window.NOISE_SVG;

// ── Reference data ───────────────────────────────────────────────────────────
var MEET_MODES = ['In-person', 'Online, synchronous — live video or voice meetings', 'Online, asynchronous — collaboration tools, messages or shared docs', 'No preference'];
var MEET_DAYS = ['Weekday', 'Saturday', 'Sunday'];
var MEET_PARTS = ['Mornings', 'Afternoons', 'Evenings'];
var AVAILABILITY = ['I have very limited availability', 'Somewhat constrained — I have specific windows that work', 'I can be reasonably flexible and meet when the group needs'];
var IMPORTANCE = ['Very important (want a strong outcome)', 'Moderately important', 'Just need to pass'];
var MOTIVATION = ['Good grade', 'Learning new skills', 'Finishing efficiently', 'Getting to know your team members'];
var TIME_AVAILABLE = ['I have enough time and can take on extra work when needed', 'I have enough time for a regular workload', "I'm stretched thin this term and only have time to make the necessary contributions"];
var RESPOND_EXPECT = ['Within a few hours', 'Within a day or 2', 'I’m flexible as long as we hit our deadline'];
var COMM_STYLE = ['I prefer to communicate frequently', 'I’m somewhere in the middle', 'I prefer to work quietly and surface things only when needed'];
var DEADLINE_STYLE = ['Finish early', 'Spread work over time', 'Do most work close to deadline'];
var WORK_STYLE = ['Divide tasks and work independently', 'Mix of independent + collaboration', 'Work closely together on most tasks'];
var SLACKER = ['Address it with them directly', 'Notify the professor', 'Pick up the slack / avoid conflict'];
var RESPOND_PACE = ['Within a few hours', 'Within a day or 2', 'It depends on my schedule'];
var DELIVER_HISTORY = ['Always — I never missed a group-internal deadline', 'Almost always — once or twice I was late but communicated', "It depended on the task — some tasks went smoothly, others didn't"];
var EARLY_FINISHER = ['I would adjust my pace to match the earlier deadline', 'I would try to meet them partway', 'I would keep my own timeline as long as my work is done by the official deadline'];
var TEAM_ROLE = ['Leader / organizer', 'Contributor / doer', 'Supporter / helper'];
var TASK_ASSIGN = ['Take on specialized roles (e.g., the writer, the project manager, etc.)', 'Take on different roles with a variety of tasks'];

// Q19 — 5-point Likert per skill
var SKILLS = ['Writing', 'Research', 'Technical Development', 'Presentation', 'Organization'];
var SKILL_SCALE = [{
  n: 1,
  short: 'Brand new',
  full: 'I am brand new to this.'
}, {
  n: 2,
  short: 'Basic exposure',
  full: 'I have basic exposure to this.'
}, {
  n: 3,
  short: 'Independent',
  full: 'I can complete standard tasks independently.'
}, {
  n: 4,
  short: 'Troubleshoot',
  full: 'I am highly comfortable and can troubleshoot problems.'
}, {
  n: 5,
  short: 'Can guide team',
  full: 'I have advanced / professional experience and can guide a team.'
}];

// Q21 (short version) — TIPI 7-point Likert (Gosling et al. 2003)
// TIPI (Gosling 2003). Reverse-scored items are 2,4,6,8,10 in 1-indexed = indices 1,3,5,7,9 here.
// Trait pairs: E=[0,5], A=[1,6], C=[2,7], N=[3,8], O=[4,9]; second item in each pair is reverse-scored.
var BIG5 = [
  { label: 'Extraverted, enthusiastic',        f: 'E' },
  { label: 'Critical, quarrelsome',            f: 'A', r: true },
  { label: 'Dependable, self-disciplined',     f: 'C' },
  { label: 'Anxious, easily upset',            f: 'N', r: true },
  { label: 'Open to new experiences, complex', f: 'O' },
  { label: 'Reserved, quiet',                  f: 'E', r: true },
  { label: 'Sympathetic, warm',                f: 'A' },
  { label: 'Disorganized, careless',           f: 'C', r: true },
  { label: 'Calm, emotionally stable',         f: 'N' },
  { label: 'Conventional, uncreative',         f: 'O', r: true },
];
var BIG5_SCALE = ['Disagree\nstrongly', 'Disagree\nmoderately', 'Disagree\na little', 'Neither\nagree nor\ndisagree', 'Agree\na little', 'Agree\nmoderately', 'Agree\nstrongly'];

// Q21 (long version) — Mini-IPIP 20-item Big-Five (Donnellan et al. 2006, IPIP public domain).
// Items are scored 1..5 ("very inaccurate" → "very accurate"); reverse items handled at scoring time.
var MINI_IPIP = [{
  t: 'Am the life of the party.',
  f: 'E'
}, {
  t: "Sympathize with others' feelings.",
  f: 'A'
}, {
  t: 'Get chores done right away.',
  f: 'C'
}, {
  t: 'Have frequent mood swings.',
  f: 'N'
}, {
  t: 'Have a vivid imagination.',
  f: 'O'
}, {
  t: "Don't talk a lot.",
  f: 'E',
  r: true
}, {
  t: "Am not interested in other people's problems.",
  f: 'A',
  r: true
}, {
  t: 'Often forget to put things back in their proper place.',
  f: 'C',
  r: true
}, {
  t: 'Am relaxed most of the time.',
  f: 'N',
  r: true
}, {
  t: 'Am not interested in abstract ideas.',
  f: 'O',
  r: true
}, {
  t: 'Talk to a lot of different people at parties.',
  f: 'E'
}, {
  t: "Feel others' emotions.",
  f: 'A'
}, {
  t: 'Like order.',
  f: 'C'
}, {
  t: 'Get upset easily.',
  f: 'N'
}, {
  t: 'Have difficulty understanding abstract ideas.',
  f: 'O',
  r: true
}, {
  t: 'Keep in the background.',
  f: 'E',
  r: true
}, {
  t: 'Am not really interested in others.',
  f: 'A',
  r: true
}, {
  t: 'Make a mess of things.',
  f: 'C',
  r: true
}, {
  t: 'Seldom feel blue.',
  f: 'N',
  r: true
}, {
  t: 'Do not have a good imagination.',
  f: 'O',
  r: true
}];
var MINI_IPIP_SCALE = ['Very\ninaccurate', 'Moderately\ninaccurate', 'Neither\naccurate nor\ninaccurate', 'Moderately\naccurate', 'Very\naccurate'];

// ── Atoms ────────────────────────────────────────────────────────────────────
function SectionHead(_ref) {
  var {
    kicker,
    title,
    body
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: _QT.primary,
      marginBottom: 6
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 22,
      color: _QT.ink,
      lineHeight: 1.25
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13.5,
      color: _QT.neutral,
      marginTop: 8,
      lineHeight: 1.55,
      maxWidth: 600
    }
  }, body));
}
function QLabel(_ref2) {
  var {
    n,
    q,
    required = true,
    hint
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 12,
      color: _QT.primary,
      letterSpacing: '.04em'
    }
  }, "Q", n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 15,
      color: _QT.ink,
      lineHeight: 1.4
    }
  }, q, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: _QT.failure,
      marginLeft: 4
    },
    "aria-label": "required"
  }, "*"))), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      color: _QT.neutral,
      marginTop: 4,
      marginLeft: 28,
      lineHeight: 1.5
    }
  }, hint));
}
function QRadio(_ref3) {
  var {
    label,
    checked,
    onChange
  } = _ref3;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onChange,
    type: "button",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11,
      padding: '10px 13px',
      background: checked ? _QT.primary + '0d' : _QT.white,
      border: "1.5px solid ".concat(checked ? _QT.primary : _QT.neutral + '44'),
      borderRadius: 8,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all .12s',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 9,
      flexShrink: 0,
      border: "2px solid ".concat(checked ? _QT.primary : _QT.neutral + '88'),
      background: checked ? _QT.primary : _QT.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1
    }
  }, checked && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 4,
      background: _QT.white
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 14,
      color: _QT.ink,
      fontWeight: checked ? 500 : 400,
      lineHeight: 1.45
    }
  }, label));
}
function QCheck(_ref4) {
  var {
    label,
    on,
    onClick
  } = _ref4;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    type: "button",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11,
      padding: '10px 13px',
      background: on ? _QT.primary + '0d' : _QT.white,
      border: "1.5px solid ".concat(on ? _QT.primary : _QT.neutral + '44'),
      borderRadius: 8,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all .12s',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      flexShrink: 0,
      border: "2px solid ".concat(on ? _QT.primary : _QT.neutral + '88'),
      background: on ? _QT.primary : _QT.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6.5l2.5 2.5L10 3.5",
    stroke: _QT.white,
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13.5,
      color: _QT.ink,
      fontWeight: on ? 500 : 400,
      lineHeight: 1.4
    }
  }, label));
}
function QText(_ref5) {
  var {
    value,
    onChange: _onChange,
    placeholder,
    multi = false,
    maxLength
  } = _ref5;
  var common = {
    width: '100%',
    padding: '11px 14px',
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
    lineHeight: 1.5,
    color: _QT.ink,
    background: _QT.white,
    border: "1.5px solid ".concat(_QT.neutral, "55"),
    borderRadius: 8,
    outline: 'none'
  };
  var onFocus = e => {
    e.target.style.borderColor = _QT.primary;
  };
  var onBlur = e => {
    e.target.style.borderColor = _QT.neutral + '55';
  };
  return multi ? /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: e => _onChange(e.target.value),
    placeholder: placeholder,
    maxLength: maxLength,
    onFocus: onFocus,
    onBlur: onBlur,
    style: _objectSpread(_objectSpread({}, common), {}, {
      minHeight: 84,
      resize: 'vertical'
    })
  }) : /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value,
    onChange: e => _onChange(e.target.value),
    placeholder: placeholder,
    maxLength: maxLength,
    onFocus: onFocus,
    onBlur: onBlur,
    style: common
  });
}

// Expose to the screen file.
Object.assign(window, {
  MEET_MODES,
  MEET_DAYS,
  MEET_PARTS,
  AVAILABILITY,
  IMPORTANCE,
  MOTIVATION,
  TIME_AVAILABLE,
  RESPOND_EXPECT,
  COMM_STYLE,
  DEADLINE_STYLE,
  WORK_STYLE,
  SLACKER,
  RESPOND_PACE,
  DELIVER_HISTORY,
  EARLY_FINISHER,
  TEAM_ROLE,
  TASK_ASSIGN,
  SKILLS,
  SKILL_SCALE,
  BIG5,
  BIG5_SCALE,
  MINI_IPIP,
  MINI_IPIP_SCALE,
  SectionHead,
  QLabel,
  QRadio,
  QCheck,
  QText
});
})();
