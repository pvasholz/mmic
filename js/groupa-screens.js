// Compiled from groupa-screens.jsx — edit the corresponding .jsx if you want JSX back.
(function () {
  "use strict";

"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Six screens of the Groupa prototype.
// Components from groupa-components.jsx are on window.

var {
  useState,
  useEffect
} = React;
// Pull shared bits off window so this file is self-explanatory.
var _T = window.TOKENS;
var _Btn = window.Button;
var _Card = window.Card;
var _Shell = window.PageShell;
var _Logo = window.GroupaLogo;
var _NOISE = window.NOISE_SVG;

// ── Hatched placeholder for imagery ──────────────────────────────────────────
function Placeholder(_ref) {
  var {
    w,
    h,
    label,
    radius = 8,
    style = {}
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      width: w,
      height: h,
      flexShrink: 0,
      background: 'repeating-linear-gradient(45deg,#D8D8D8,#D8D8D8 3px,#EBEBEB 3px,#EBEBEB 9px)',
      border: "1.5px dashed ".concat(_T.neutral, "88"),
      borderRadius: radius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Caveat", cursive',
      fontSize: 13,
      color: _T.neutral
    }, style)
  }, label);
}
function Initials(_ref2) {
  var {
    initials,
    color,
    size = 56
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: size / 2,
      background: color,
      flexShrink: 0,
      color: _T.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: size * 0.36,
      letterSpacing: '.02em',
      boxShadow: '0 1px 3px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.18)'
    }
  }, initials);
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 0 · Task scenario overlay
// ─────────────────────────────────────────────────────────────────────────────
function ScenarioOverlay(_ref3) {
  var {
    onBegin
  } = _ref3;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(28,28,28,.55)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: '"Inter", sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 540,
      width: '100%',
      background: _T.white,
      borderRadius: 18,
      padding: '36px 40px 32px',
      boxShadow: '0 30px 80px rgba(0,0,0,.4)',
      backgroundImage: _NOISE,
      backgroundBlendMode: 'multiply',
      border: "1px solid ".concat(_T.neutral, "33")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.12em',
      color: _T.primary,
      background: "".concat(_T.primary, "15"),
      padding: '4px 10px',
      borderRadius: 4,
      marginBottom: 18
    }
  }, "USER TESTING \xB7 TASK SCENARIO"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 22,
      color: _T.ink,
      lineHeight: 1.3,
      marginBottom: 14
    }
  }, "Imagine you're a student in HCI 5xx."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 15,
      color: _T.ink,
      lineHeight: 1.6,
      marginBottom: 12
    }
  }, "Your instructor has just announced that the semester project will be done in groups of four. Rather than letting students pick their own teams, she's using ", /*#__PURE__*/React.createElement("strong", null, "Groupa"), " \u2014 a new tool that surveys each student and assigns balanced groups automatically."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 15,
      color: _T.ink,
      lineHeight: 1.6,
      marginBottom: 22
    }
  }, "You've just opened the link she shared. Please complete the task of", /*#__PURE__*/React.createElement("strong", null, " joining the project and submitting your preferences"), ". Think aloud as you go \u2014 there are no wrong answers, and we're testing the design, not you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(_Btn, {
    variant: "primary",
    size: "lg",
    onClick: onBegin
  }, "Begin Session \u2192"))));
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1 · Role selection (landing)
// ─────────────────────────────────────────────────────────────────────────────
function RoleScreen(_ref4) {
  var {
    onNext
  } = _ref4;
  var [role, setRole] = useState('student');
  return /*#__PURE__*/React.createElement(_Shell, {
    networkBg: true,
    maxWidth: 820
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(_Logo, {
    size: "lg"
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 30,
      color: _T.ink,
      marginTop: 22,
      lineHeight: 1.25
    }
  }, "Better project groups, by design."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 15,
      color: _T.neutral,
      marginTop: 10,
      maxWidth: 460,
      margin: '10px auto 0'
    }
  }, "Tell us how you work, when you're free, and what you're hoping to learn \u2014 we'll handle the matching.")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 13,
      color: _T.neutral,
      marginBottom: 16,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '.1em'
    }
  }, "I'm joining as a\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setRole('student'),
    style: {
      width: 240,
      padding: '28px 22px',
      background: _T.white,
      backgroundImage: _NOISE,
      backgroundBlendMode: 'multiply',
      border: "2.5px solid ".concat(role === 'student' ? _T.primary : _T.neutral + '44'),
      borderRadius: 14,
      cursor: 'pointer',
      textAlign: 'center',
      boxShadow: role === 'student' ? "0 8px 24px ".concat(_T.primary, "28") : '0 2px 6px rgba(0,0,0,.05)',
      transition: 'all .15s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 28,
      background: "".concat(_T.primary, "15"),
      margin: '0 auto 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 14a4 4 0 100-8 4 4 0 000 8z",
    stroke: _T.primary,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4 4-6 8-6s8 2 8 6",
    stroke: _T.primary,
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 18,
      color: _T.ink
    }
  }, "Student"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      color: _T.neutral,
      marginTop: 4
    }
  }, "Find your project team")), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    style: {
      width: 240,
      padding: '28px 22px',
      background: _T.foundation,
      border: "2px solid ".concat(_T.neutral, "33"),
      borderRadius: 14,
      cursor: 'not-allowed',
      textAlign: 'center',
      opacity: 0.5,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 28,
      background: "".concat(_T.neutral, "22"),
      margin: '0 auto 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7l9-4 9 4-9 4-9-4z",
    stroke: _T.neutral,
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 9v5c0 2 3 3 5 3s5-1 5-3V9",
    stroke: _T.neutral,
    strokeWidth: "2"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 18,
      color: _T.neutral
    }
  }, "Instructor"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      color: _T.neutral,
      marginTop: 4
    }
  }, "Manage classes & groups"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontFamily: '"Inter", sans-serif',
      fontSize: 10,
      fontWeight: 600,
      color: _T.neutral,
      background: _T.white,
      padding: '3px 8px',
      borderRadius: 10,
      border: "1px solid ".concat(_T.neutral, "55")
    }
  }, "COMING SOON"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(_Btn, {
    variant: "primary",
    size: "lg",
    disabled: !role,
    onClick: onNext
  }, "Continue \u2192")));
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2 · Onboarding
// ─────────────────────────────────────────────────────────────────────────────
function StepDots(_ref5) {
  var {
    step,
    total
  } = _ref5;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, Array.from({
    length: total
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i === step ? 22 : 7,
      height: 7,
      borderRadius: 4,
      background: i <= step ? _T.primary : _T.neutral + '55',
      transition: 'width .25s'
    }
  })));
}
function OnboardingScreen(_ref6) {
  var {
    onNext,
    onBack
  } = _ref6;
  var items = [{
    num: '01',
    t: 'Answer a few questions',
    d: "Work style, schedule, and what you're hoping to get out of the class. About 5 minutes."
  }, {
    num: '02',
    t: 'We match the whole class',
    d: 'Once everyone has submitted, Groupa assembles balanced teams of four.'
  }, {
    num: '03',
    t: "You'll get your group",
    d: "We'll email you when your team is ready — once the instructor has reviewed all the teams."
  }];
  return /*#__PURE__*/React.createElement(_Shell, {
    navRight: /*#__PURE__*/React.createElement(StepDots, {
      step: 0,
      total: 3
    })
  }, /*#__PURE__*/React.createElement(_Card, {
    padding: 40,
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    w: 200,
    h: 220,
    label: "welcome illustration",
    radius: 10
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 26,
      color: _T.ink,
      marginBottom: 8,
      lineHeight: 1.25
    }
  }, "Welcome to Groupa."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 14,
      color: _T.neutral,
      marginBottom: 24,
      lineHeight: 1.6
    }
  }, "Here's how it works."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.num,
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: 22,
      color: _T.primary,
      lineHeight: 1,
      flexShrink: 0,
      width: 36
    }
  }, it.num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 15,
      color: _T.ink,
      marginBottom: 3
    }
  }, it.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      color: _T.neutral,
      lineHeight: 1.55
    }
  }, it.d)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(_Btn, {
    variant: "neutral",
    size: "md",
    onClick: onBack
  }, "\u2190 Back"), /*#__PURE__*/React.createElement(_Btn, {
    variant: "primary",
    size: "lg",
    onClick: onNext
  }, "Get Started \u2192")));
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3 · Questionnaire
// ─────────────────────────────────────────────────────────────────────────────
function QuestionnaireScreen(_ref7) {
  var {
    onSubmit,
    onBack
  } = _ref7;
  var [workStyle, setWorkStyle] = useState(null);
  var [availability, setAvailability] = useState(new Set());
  var [communication, setCommunication] = useState(null);
  var [goal, setGoal] = useState('');
  var [skills, setSkills] = useState(new Set());
  var workOpts = ['Divide tasks and work independently', 'Collaborate closely throughout', 'Plan together, then execute solo', "Flexible — adapt to the team's needs"];
  var availOpts = ['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Weekends', 'Async only'];
  var commOpts = ['Mostly async (Slack/email)', 'Mix of async + meetings', 'Frequent video calls'];
  var skillOpts = ['Research', 'Writing', 'Design / UX', 'Frontend', 'Backend', 'Data / ML', 'Project mgmt', 'Presenting'];
  var toggleSet = (set, setter, v) => {
    var next = new Set(set);
    next.has(v) ? next.delete(v) : next.add(v);
    setter(next);
  };
  var answered = [workStyle !== null, availability.size > 0, communication !== null, goal.length > 0, skills.size > 0];
  var progress = answered.filter(Boolean).length / answered.length;
  var canSubmit = answered.every(Boolean);
  return /*#__PURE__*/React.createElement(_Shell, {
    navRight: /*#__PURE__*/React.createElement(StepDots, {
      step: 1,
      total: 3
    }),
    maxWidth: 760
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 6,
      background: _T.neutral + '33',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "".concat(progress * 100, "%"),
      height: '100%',
      background: _T.success,
      borderRadius: 3,
      transition: 'width .25s'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: _T.neutral,
      fontWeight: 500,
      minWidth: 70,
      textAlign: 'right'
    }
  }, answered.filter(Boolean).length, " of ", answered.length, " answered")), /*#__PURE__*/React.createElement(_Card, {
    padding: 32,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(QBlock, {
    n: 1,
    q: "How do you prefer to work on group projects?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, workOpts.map((opt, i) => /*#__PURE__*/React.createElement(Radio, {
    key: i,
    label: opt,
    checked: workStyle === i,
    onChange: () => setWorkStyle(i)
  })))), /*#__PURE__*/React.createElement(QBlock, {
    n: 2,
    q: "When are you usually available to meet?",
    hint: "Select all that apply"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, availOpts.map(opt => /*#__PURE__*/React.createElement(Chip, {
    key: opt,
    label: opt,
    on: availability.has(opt),
    onClick: () => toggleSet(availability, setAvailability, opt)
  })))), /*#__PURE__*/React.createElement(QBlock, {
    n: 3,
    q: "What communication style works best for you?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, commOpts.map((opt, i) => /*#__PURE__*/React.createElement(Radio, {
    key: i,
    label: opt,
    checked: communication === i,
    onChange: () => setCommunication(i)
  })))), /*#__PURE__*/React.createElement(QBlock, {
    n: 4,
    q: "Which skills can you bring to a team?",
    hint: "Pick 2 or more"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, skillOpts.map(opt => /*#__PURE__*/React.createElement(Chip, {
    key: opt,
    label: opt,
    on: skills.has(opt),
    onClick: () => toggleSet(skills, setSkills, opt)
  })))), /*#__PURE__*/React.createElement(QBlock, {
    n: 5,
    q: "In one sentence, what do you want to get out of this project?"
  }, /*#__PURE__*/React.createElement("textarea", {
    value: goal,
    onChange: e => setGoal(e.target.value),
    placeholder: "e.g., I want to apply what I've learned about usability testing to a real product\u2026",
    style: {
      width: '100%',
      minHeight: 70,
      padding: '12px 14px',
      fontFamily: '"Inter", sans-serif',
      fontSize: 14,
      lineHeight: 1.5,
      color: _T.ink,
      background: _T.white,
      border: "1.5px solid ".concat(_T.neutral, "55"),
      borderRadius: 8,
      resize: 'vertical',
      outline: 'none'
    },
    onFocus: e => e.target.style.borderColor = _T.primary,
    onBlur: e => e.target.style.borderColor = _T.neutral + '55'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(_Btn, {
    variant: "neutral",
    size: "md",
    onClick: onBack
  }, "\u2190 Back"), /*#__PURE__*/React.createElement(_Btn, {
    variant: "primary",
    size: "lg",
    disabled: !canSubmit,
    onClick: onSubmit
  }, "Submit my answers \u2192")));
}
function QBlock(_ref8) {
  var {
    n,
    q,
    hint,
    children
  } = _ref8;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: hint ? 4 : 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 13,
      color: _T.primary
    }
  }, "Q", n, "."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 16,
      color: _T.ink,
      lineHeight: 1.35
    }
  }, q)), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      color: _T.neutral,
      marginBottom: 12,
      marginLeft: 24
    }
  }, hint), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 24
    }
  }, children));
}
function Radio(_ref9) {
  var {
    label,
    checked,
    onChange
  } = _ref9;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onChange,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 14px',
      background: checked ? _T.primary + '0d' : _T.white,
      border: "1.5px solid ".concat(checked ? _T.primary : _T.neutral + '44'),
      borderRadius: 8,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all .12s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 9,
      flexShrink: 0,
      border: "2px solid ".concat(checked ? _T.primary : _T.neutral + '88'),
      background: checked ? _T.primary : _T.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 4,
      background: _T.white
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 14,
      color: _T.ink,
      fontWeight: checked ? 500 : 400
    }
  }, label));
}
function Chip(_ref0) {
  var {
    label,
    on,
    onClick
  } = _ref0;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      padding: '8px 14px',
      borderRadius: 20,
      border: "1.5px solid ".concat(on ? _T.primary : _T.neutral + '55'),
      background: on ? _T.primary : _T.white,
      color: on ? _T.white : _T.ink,
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      fontWeight: on ? 600 : 400,
      cursor: 'pointer',
      transition: 'all .12s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, on && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11
    }
  }, "\u2713"), label);
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4 · Submitted / Confirmation
// ─────────────────────────────────────────────────────────────────────────────
function SubmittedScreen(_ref1) {
  var {
    onContinue
  } = _ref1;
  return /*#__PURE__*/React.createElement(_Shell, {
    navRight: /*#__PURE__*/React.createElement(StepDots, {
      step: 1,
      total: 3
    }),
    maxWidth: 620
  }, /*#__PURE__*/React.createElement(_Card, {
    padding: 44,
    style: {
      marginTop: 48,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 44,
      background: "".concat(_T.success, "1a"),
      border: "2px solid ".concat(_T.success),
      margin: '0 auto 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5l4.5 4.5L19 7.5",
    stroke: _T.success,
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 26,
      color: _T.ink,
      marginBottom: 10,
      lineHeight: 1.25
    }
  }, "Thanks \u2014 your answers are in."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 15,
      color: _T.neutral,
      lineHeight: 1.6,
      marginBottom: 28,
      maxWidth: 440,
      margin: '0 auto 28px'
    }
  }, "We'll match you with three classmates once everyone in HCI 5xx has finished their questionnaire. You'll get an email \u2014 usually within 24 hours of the class deadline."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: _T.foundation,
      border: "1px solid ".concat(_T.neutral, "33"),
      borderRadius: 10,
      padding: '18px 20px',
      textAlign: 'left',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 700,
      color: _T.neutral,
      letterSpacing: '.1em',
      marginBottom: 12
    }
  }, "WHAT HAPPENS NEXT"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      margin: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(NextStep, {
    n: 1,
    active: true
  }, /*#__PURE__*/React.createElement("strong", null, "Your responses are saved."), " You can revisit and edit them until the class deadline (", wkdy(), ")."), /*#__PURE__*/React.createElement(NextStep, {
    n: 2
  }, /*#__PURE__*/React.createElement("strong", null, "The class finishes."), " 13 of 16 classmates have answered so far."), /*#__PURE__*/React.createElement(NextStep, {
    n: 3
  }, /*#__PURE__*/React.createElement("strong", null, "You'll get a message."), " An email will introduce your team of four."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Btn, {
    variant: "neutral",
    size: "md"
  }, "Edit my answers"), /*#__PURE__*/React.createElement(_Btn, {
    variant: "primary",
    size: "md",
    onClick: onContinue
  }, "Preview a sample group \u2192")), /*#__PURE__*/React.createElement("p", {
    style: _objectSpread(_objectSpread({}, {
      fontFamily: '"Caveat", cursive',
      fontSize: 13,
      color: _T.warning,
      marginTop: 18,
      background: "".concat(_T.warning, "1a"),
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 4
    }), {}, {
      color: "rgb(21, 21, 20)"
    })
  }, "prototype-only: the right button jumps ahead so testers can see screen 6")));
}
function wkdy() {
  // Static label for the prototype — keep it stable across sessions.
  return 'Fri, May 22';
}
function NextStep(_ref10) {
  var {
    n,
    active = false,
    children
  } = _ref10;
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      flexShrink: 0,
      background: active ? _T.success : _T.neutral + '33',
      color: active ? _T.white : _T.neutral,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: 11,
      marginTop: 1
    }
  }, active ? '✓' : n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      color: _T.ink,
      lineHeight: 1.55
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 5 · Group result (4 students)
// ─────────────────────────────────────────────────────────────────────────────
var TEAM = [{
  you: true,
  name: 'You',
  initials: 'Y',
  color: _T.primary,
  role: 'HCI Spring 2026',
  skills: ['Interaction Design', 'Prototyping', 'User Research'],
  avail: ['Weekday evenings', 'Weekends'],
  reason: 'Anchored the schedule overlap and contributed core interaction design skills'
}, {
  name: 'Jordan Kim',
  initials: 'JK',
  color: _T.success,
  role: 'Computer Science · Junior',
  skills: ['Technical Development', 'Prototyping', 'Data Analysis'],
  avail: ['Weekday evenings', 'Weekends'],
  reason: 'Brings technical implementation depth to complement the design and research focus'
}, {
  name: 'Maya Patel',
  initials: 'MP',
  color: _T.warning,
  role: 'Cognitive Science · Senior',
  skills: ['User Research', 'Usability Testing', 'Writing'],
  avail: ['Weekday afternoons', 'Weekday evenings'],
  reason: 'Strong research and evaluation skills — well suited to lead user testing'
}, {
  name: 'Sam Rivera',
  initials: 'SR',
  color: _T.failure,
  role: 'Information Science · Junior',
  skills: ['Project Mgmt', 'Information Architecture', 'Presenting'],
  avail: ['Weekday evenings', 'Weekends'],
  reason: 'Brings IA and PM structure to keep the project on track'
}];
function getDynamicFallbackTeam() {
  var dynamicTeam = JSON.parse(JSON.stringify(TEAM));
  try {
    var raw = localStorage.getItem('groupa_user_v1') || localStorage.getItem('groupa_q_v1');
    if (raw) {
      var s = JSON.parse(raw);
      var fullName = [s.firstName, s.lastName].filter(Boolean).join(' ');
      if (fullName) {
        dynamicTeam[0].name = fullName;
        dynamicTeam[0].initials = fullName.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
      }
      if (s.skills && typeof s.skills === 'object') {
        var topSkills = Object.entries(s.skills)
          .sort(function(a, b) { return b[1] - a[1]; })
          .slice(0, 3)
          .map(function(pair) { return pair[0]; });
        if (topSkills.length) {
          dynamicTeam[0].skills = topSkills;
          dynamicTeam[0].reason = 'Anchored the team profile and contributed core ' + topSkills[0] + ' skills.';
        }
      }
      if (Array.isArray(s.meetTimes) && s.meetTimes.length) {
        dynamicTeam[0].avail = s.meetTimes;
      }
    }
  } catch (e) {
    console.warn('Could not inject user state into fallback:', e);
  }
  return dynamicTeam;
}

var _MEMBER_COLORS = [_T.primary, _T.success, _T.warning, _T.failure];
function normalizeMember(m, idx) {
  var name = [m.first_name, m.last_name].filter(Boolean).join(' ') || m.name || 'Unknown';
  var initials = name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  return {
    you: !!(m.is_you || m.you),
    name: name,
    initials: m.initials || initials,
    color: m.color || _MEMBER_COLORS[idx % _MEMBER_COLORS.length],
    role: m.location || m.role || m.major || m.program || '',
    skills: Array.isArray(m.chips) ? m.chips : Array.isArray(m.skills) ? m.skills : [],
    avail: Array.isArray(m.avail) ? m.avail : Array.isArray(m.meetTimes) ? m.meetTimes : Array.isArray(m.availability) ? m.availability : [],
    reason: m.reason || m.match_reason || ''
  };
}

function GroupScreen(_ref11) {
  var {
    onRestart
  } = _ref11;
  var _loadingMsgs = [
    "Finding your team…",
    "Analyzing your schedules…",
    "Balancing skill sets…",
    "Checking communication styles…",
    "Finalizing team dynamics…"
  ];
  var [matchResult, setMatchResult] = useState(window.__matchResult || null);
  var [matchPending, setMatchPending] = useState(!window.__matchResult && !!window.__matchPromise);
  var [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    if (!window.__matchPromise || window.__matchResult) return;
    window.__matchPromise.then(function(result) {
      setMatchResult(result);
      setMatchPending(false);
    });
  }, []);

  useEffect(() => {
    if (!matchPending) return;
    var id = setInterval(function() {
      setPhaseIdx(function(i) { return (i + 1) % _loadingMsgs.length; });
    }, 3000);
    return function() { clearInterval(id); };
  }, [matchPending]);

  if (matchPending) {
    return /*#__PURE__*/React.createElement(_Shell, {
      navRight: /*#__PURE__*/React.createElement(window.StepDots, { step: 2, total: 3 }),
      maxWidth: 620
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 22,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 64,
        height: 64,
        borderRadius: 32,
        border: "4px solid ".concat(_T.primary, "33"),
        borderTopColor: _T.primary,
        animation: 'spin 0.9s linear infinite'
      }
    }), /*#__PURE__*/React.createElement("div", null,
      /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          fontSize: 20,
          color: _T.ink,
          marginBottom: 8
        }
      }, _loadingMsgs[phaseIdx]),
      /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: '"Inter", sans-serif',
          fontSize: 14,
          color: _T.neutral,
          lineHeight: 1.6
        }
      }, "Matching across schedules, skills, and work styles.", /*#__PURE__*/React.createElement("br", null), "This usually takes up to 30 seconds.")
    )));
  }

  var _llmMembers = matchResult && matchResult.your_group && matchResult.your_group.members;
  var teamData = (_llmMembers && _llmMembers.length) ? _llmMembers.map(normalizeMember) : getDynamicFallbackTeam();
  var isLlm = !!(_llmMembers && _llmMembers.length);
  var groupId = isLlm ? matchResult.your_group.group_id : null;
  var headline = isLlm ? matchResult.your_group.headline : null;

  return /*#__PURE__*/React.createElement(_Shell, {
    navRight: /*#__PURE__*/React.createElement(StepDots, {
      step: 2,
      total: 3
    }),
    maxWidth: 920
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 18,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.12em',
      color: _T.success,
      background: "".concat(_T.success, "1a"),
      padding: '4px 10px',
      borderRadius: 4,
      marginBottom: 12
    }
  }, "YOUR GROUP IS READY"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 28,
      color: _T.ink,
      lineHeight: 1.25
    }
  }, isLlm ? "Group ".concat(groupId) : "Your Project Team."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 15,
      color: _T.neutral,
      marginTop: 8
    }
  }, "HCI 5xx \xB7 Spring 2026 \xB7 ".concat(isLlm ? groupId : "Project Group")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, ".concat(_T.primary, ", ").concat(_T.primary, "dd 60%, ").concat(_T.success, ")"),
      backgroundBlendMode: 'multiply',
      borderRadius: 14,
      padding: '22px 26px',
      marginBottom: 24,
      color: _T.white,
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: _NOISE,
      opacity: 0.6,
      mixBlendMode: 'overlay'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 220,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 13,
      lineHeight: 1.55,
      opacity: 0.95
    }
  }, isLlm ? headline : "High compatibility across schedule availability and complementary project skills. The team balances technical depth with research and project management \u2014 no major gaps.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 14,
      marginBottom: 28
    }
  }, teamData.map((m, i) => /*#__PURE__*/React.createElement(MemberCard, {
    key: i,
    member: m
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Btn, {
    variant: "neutral",
    size: "md"
  }, "View other groups"), /*#__PURE__*/React.createElement(_Btn, {
    variant: "primary",
    size: "lg",
    disabled: true
  }, "Open team chat \u2192 (coming soon)")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRestart,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      color: _T.neutral,
      textDecoration: 'underline'
    }
  }, "\u21BA Restart prototype")));
}
function MemberCard(_ref12) {
  var {
    member
  } = _ref12;
  var m = member;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: _T.white,
      backgroundImage: _NOISE,
      backgroundBlendMode: 'multiply',
      border: m.you ? "2px solid ".concat(_T.primary) : "1px solid ".concat(_T.neutral, "33"),
      borderRadius: 12,
      padding: 18,
      boxShadow: m.you ? "0 8px 24px ".concat(_T.primary, "1f") : '0 1px 3px rgba(0,0,0,.04), 0 6px 18px rgba(0,0,0,.04)',
      position: 'relative'
    }
  }, m.you && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -10,
      left: 14,
      background: _T.primary,
      color: _T.white,
      fontFamily: '"Inter", sans-serif',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.1em',
      padding: '3px 9px',
      borderRadius: 10
    }
  }, "YOU"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Initials, {
    initials: m.initials,
    color: m.color,
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 15,
      color: _T.ink,
      lineHeight: 1.2
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      color: _T.neutral,
      marginTop: 2
    }
  }, m.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Lbl, null, "Skills"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5
    }
  }, m.skills.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      color: _T.primary,
      background: "".concat(_T.primary, "12"),
      padding: '3px 8px',
      borderRadius: 10
    }
  }, s)))), m.avail.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Lbl, null, "Free time"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      color: _T.ink
    }
  }, m.avail.join(' · '))));
}
function Lbl(_ref13) {
  var {
    children
  } = _ref13;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 10,
      fontWeight: 700,
      color: _T.neutral,
      letterSpacing: '.1em',
      marginBottom: 5
    }
  }, children);
}

// ── Export ───────────────────────────────────────────────────────────────────
Object.assign(window, {
  ScenarioOverlay,
  RoleScreen,
  OnboardingScreen,
  QuestionnaireScreen,
  SubmittedScreen,
  GroupScreen,
  StepDots // exposed so groupa-questionnaire.jsx can reuse it
});
})();
