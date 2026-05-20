// Compiled from groupa-questionnaire.jsx — edit the corresponding .jsx if you want JSX back.
(function () {
  "use strict";

"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Group Formation Exercise — multi-step wizard.
// Overrides window.QuestionnaireScreen. Loads after sections.

var {
  useState,
  useMemo,
  useRef,
  useEffect
} = React;
var _SHT = window.TOKENS;
var _SHNOISE = window.NOISE_SVG;
var _SBtn = window.Button;
var _SShell = window.PageShell;
var _SDots = window.StepDots;

// ── Inline RadioList (used by step renderers) ────────────────────────────────
function RadioList(_ref) {
  var {
    value,
    onChange: _onChange,
    options
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, options.map((opt, i) => /*#__PURE__*/React.createElement(window.QRadio, {
    key: i,
    label: opt,
    checked: value === i,
    onChange: () => _onChange(i)
  })));
}

// ── Q5: meeting-time grid ────────────────────────────────────────────────────
function MeetTimeGrid(_ref2) {
  var {
    value,
    toggle
  } = _ref2;
  var {
    MEET_DAYS,
    MEET_PARTS
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: 'meet-grid',
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(96px, max-content) repeat(3, minmax(0, 1fr))',
      gap: 8,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", null), MEET_PARTS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    className: 'meet-part-header',
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: _SHT.neutral,
      textAlign: 'center',
      alignSelf: 'end',
      paddingBottom: 4
    }
  }, p)), MEET_DAYS.map(day => /*#__PURE__*/React.createElement(React.Fragment, {
    key: day
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 13.5,
      color: _SHT.ink,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 4
    }
  }, day), MEET_PARTS.map(part => {
    var key = "".concat(day, " ").concat(part.toLowerCase());
    var on = value.has(key);
    return /*#__PURE__*/React.createElement("button", {
      key: part,
      type: "button",
      onClick: () => toggle(key),
      style: {
        padding: '10px 4px',
        background: on ? _SHT.primary + '12' : _SHT.white,
        color: _SHT.ink,
        border: "1.5px solid ".concat(on ? _SHT.primary : _SHT.neutral + '44'),
        borderRadius: 7,
        cursor: 'pointer',
        fontFamily: '"Inter", sans-serif',
        fontSize: 12,
        fontWeight: on ? 600 : 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        transition: 'all .1s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 3,
        flexShrink: 0,
        border: "2px solid ".concat(on ? _SHT.primary : _SHT.neutral + '88'),
        background: on ? _SHT.primary : _SHT.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement("svg", {
      width: "9",
      height: "9",
      viewBox: "0 0 12 12",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 6.5l2.5 2.5L10 3.5",
      stroke: _SHT.white,
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), on ? 'Yes' : 'Pick');
  }))));
}

// ── Q19: skill self-rating Likert (1–5) ──────────────────────────────────────
function SkillLikert(_ref3) {
  var {
    values,
    set
  } = _ref3;
  var {
    SKILLS,
    SKILL_SCALE
  } = window;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: _SHT.foundation,
      border: "1px solid ".concat(_SHT.neutral, "33"),
      borderRadius: 10,
      padding: '12px 16px',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: _SHT.neutral,
      marginBottom: 8
    }
  }, "How to rate yourself"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, SKILL_SCALE.map(_ref4 => {
    var {
      n,
      full
    } = _ref4;
    return /*#__PURE__*/React.createElement("li", {
      key: n,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'baseline',
        fontFamily: '"Inter", sans-serif',
        fontSize: 12.5,
        color: _SHT.ink,
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 700,
        fontSize: 13,
        color: _SHT.primary,
        minWidth: 14
      }
    }, n), /*#__PURE__*/React.createElement("span", null, full));
  }))), /*#__PURE__*/React.createElement("div", {
    className: 'skill-wrap',
    style: {
      background: _SHT.white,
      border: "1px solid ".concat(_SHT.neutral, "33"),
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'skill-header',
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(140px, 1.5fr) repeat(5, minmax(56px, 1fr))',
      padding: '10px 16px',
      gap: 6,
      background: _SHT.foundation,
      borderBottom: "1px solid ".concat(_SHT.neutral, "33")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: _SHT.neutral,
      alignSelf: 'center'
    }
  }, "Skill"), SKILL_SCALE.map(_ref5 => {
    var {
      n,
      short
    } = _ref5;
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      title: SKILL_SCALE[n - 1].full,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 700,
        fontSize: 14,
        color: _SHT.primary,
        lineHeight: 1
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 10,
        color: _SHT.neutral,
        marginTop: 3,
        lineHeight: 1.2
      }
    }, short));
  })), SKILLS.map((skill, rIdx) => {
    var _values$skill;
    var v = (_values$skill = values[skill]) !== null && _values$skill !== void 0 ? _values$skill : null;
    return /*#__PURE__*/React.createElement("div", {
      key: skill,
      className: 'skill-row',
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(140px, 1.5fr) repeat(5, minmax(56px, 1fr))',
        padding: '10px 16px',
        gap: 6,
        alignItems: 'center',
        borderBottom: rIdx < SKILLS.length - 1 ? "1px solid ".concat(_SHT.neutral, "22") : 'none',
        background: rIdx % 2 ? _SHT.foundation + '99' : _SHT.white
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'skill-label',
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 14,
        fontWeight: 500,
        color: _SHT.ink
      }
    }, skill), /*#__PURE__*/React.createElement("div", { className: 'skill-cells' }, SKILL_SCALE.map(_ref6 => {
      var {
        n
      } = _ref6;
      var on = v === n;
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        type: "button",
        onClick: () => set(skill, n),
        title: "".concat(skill, ": ").concat(SKILL_SCALE[n - 1].full),
        style: {
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 24,
          height: 24,
          borderRadius: 12,
          border: "2px solid ".concat(on ? _SHT.primary : _SHT.neutral + '88'),
          background: on ? _SHT.primary : _SHT.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .1s'
        }
      }, on && /*#__PURE__*/React.createElement("div", {
        style: {
          width: 9,
          height: 9,
          borderRadius: 5,
          background: _SHT.white
        }
      })));
    })));
  })));
}

// ── Generic Likert matrix used by both Big5/TIPI (7pt) and Mini-IPIP (5pt) ──
function LikertMatrix(_ref7) {
  var {
    items,
    scale,
    values,
    set,
    getKey,
    getLabel,
    lhsHeader = 'Statement'
  } = _ref7;
  return /*#__PURE__*/React.createElement("div", {
    className: 'likert-wrap',
    style: {
      background: _SHT.white,
      border: "1px solid ".concat(_SHT.neutral, "33"),
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'likert-header',
    style: {
      display: 'grid',
      gridTemplateColumns: "minmax(190px, 2fr) repeat(".concat(scale.length, ", minmax(54px, 1fr))"),
      padding: '12px 16px 10px',
      gap: 4,
      background: _SHT.foundation,
      borderBottom: "1px solid ".concat(_SHT.neutral, "33")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: _SHT.neutral,
      alignSelf: 'end'
    }
  }, lhsHeader), scale.map((lbl, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 10,
      fontWeight: 600,
      color: _SHT.neutral,
      textAlign: 'center',
      lineHeight: 1.2,
      whiteSpace: 'pre-line'
    }
  }, lbl))), /*#__PURE__*/React.createElement("div", {
    className: 'likert-mobile-anchors'
  }, /*#__PURE__*/React.createElement("span", null, scale[0].replace(/\n/g, ' ')), /*#__PURE__*/React.createElement("span", null, scale[scale.length - 1].replace(/\n/g, ' '))), items.map((item, rIdx) => {
    var _values$key;
    var key = getKey(item);
    var v = (_values$key = values[key]) !== null && _values$key !== void 0 ? _values$key : null;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: 'likert-row',
      style: {
        display: 'grid',
        gridTemplateColumns: "minmax(190px, 2fr) repeat(".concat(scale.length, ", minmax(54px, 1fr))"),
        padding: '11px 16px',
        gap: 4,
        alignItems: 'center',
        borderBottom: rIdx < items.length - 1 ? "1px solid ".concat(_SHT.neutral, "22") : 'none',
        background: rIdx % 2 ? _SHT.foundation + '99' : _SHT.white
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'likert-label',
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 13.5,
        fontWeight: 500,
        color: _SHT.ink,
        paddingRight: 8,
        lineHeight: 1.4
      }
    }, getLabel(item)), /*#__PURE__*/React.createElement("div", { className: 'likert-cells' }, scale.map((_, i) => {
      var on = v === i;
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        type: "button",
        onClick: () => set(key, i),
        title: "".concat(getLabel(item), " \u2014 ").concat(scale[i].replace(/\n/g, ' ')),
        style: {
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 22,
          height: 22,
          borderRadius: 11,
          border: "2px solid ".concat(on ? _SHT.primary : _SHT.neutral + '77'),
          background: on ? _SHT.primary : _SHT.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .1s'
        }
      }, on && /*#__PURE__*/React.createElement("div", {
        style: {
          width: 7,
          height: 7,
          borderRadius: 4,
          background: _SHT.white
        }
      })));
    })));
  }));
}
function Big5Matrix(_ref8) {
  var {
    values,
    set
  } = _ref8;
  return /*#__PURE__*/React.createElement(LikertMatrix, {
    items: window.BIG5,
    scale: window.BIG5_SCALE,
    values: values,
    set: set,
    getKey: t => t.label,
    getLabel: t => "".concat(t.label, "."),
    lhsHeader: "I see myself as\u2026"
  });
}
function MiniIpipMatrix(_ref9) {
  var {
    values,
    set
  } = _ref9;
  return /*#__PURE__*/React.createElement(LikertMatrix, {
    items: window.MINI_IPIP,
    scale: window.MINI_IPIP_SCALE,
    values: values,
    set: set,
    getKey: it => it.t,
    getLabel: it => it.t,
    lhsHeader: "Statement"
  });
}

// ── Build the POST payload from wizard state ─────────────────────────────────
function buildSubmissionPayload(s) {
  var opt = (arr, idx) => idx !== null && idx !== undefined ? arr[idx] : null;
  return {
    length: s.length,
    profile: {
      firstName: s.firstName,
      lastName: s.lastName,
      location: s.location,
    },
    logistics: {
      meetMode:     opt(window.MEET_MODES, s.meetMode),
      meetTimes:    Array.from(s.meetTimes),
      availability: opt(window.AVAILABILITY, s.availability),
    },
    motivation: {
      importance: opt(window.IMPORTANCE, s.importance),
      motivation: opt(window.MOTIVATION, s.motivation),
      timeAvail:  opt(window.TIME_AVAILABLE, s.timeAvail),
    },
    expectations: {
      respondExpect: opt(window.RESPOND_EXPECT, s.respondExpect),
      commStyle:     opt(window.COMM_STYLE, s.commStyle),
      deadlineStyle: opt(window.DEADLINE_STYLE, s.deadlineStyle),
      workStyle:     opt(window.WORK_STYLE, s.workStyle),
      slacker:       opt(window.SLACKER, s.slacker),
    },
    workHabits: {
      respondPace:  opt(window.RESPOND_PACE, s.respondPace),
      deliverHist:  opt(window.DELIVER_HISTORY, s.deliverHist),
      earlyFinisher: opt(window.EARLY_FINISHER, s.earlyFinisher),
    },
    skillsRole: {
      teamRole:  opt(window.TEAM_ROLE, s.teamRole),
      skills:    s.skills,
      taskAssign: opt(window.TASK_ASSIGN, s.taskAssign),
    },
    personality: {
      bigFive:  s.bigFive,
      miniIpip: s.miniIpip,
    },
    topic: s.topic,
    other: s.other,
  };
}

// ── Main wizard ──────────────────────────────────────────────────────────────
function QuestionnaireScreen(_ref0) {
  var {
    onSubmit,
    onBack
  } = _ref0;
  // Restore from localStorage if a previous session was interrupted
  var _saved = useMemo(() => {
    try {
      var raw = localStorage.getItem('groupa_q_v1');
      if (!raw) return {};
      var d = JSON.parse(raw);
      if (Array.isArray(d.meetTimes)) d.meetTimes = new Set(d.meetTimes);
      return d;
    } catch (e) { return {}; }
  }, []);

  // Version toggle
  var [length, setLength] = useState(_saved.length || 'short');

  // Profile
  var [firstName, setFirstName] = useState(_saved.firstName || '');
  var [lastName, setLastName] = useState(_saved.lastName || '');
  var [location, setLocation] = useState(_saved.location || '');
  // Logistics
  var [meetMode, setMeetMode] = useState(_saved.meetMode !== undefined ? _saved.meetMode : null);
  var [meetTimes, setMeetTimes] = useState(_saved.meetTimes || new Set());
  var [availability, setAvailability] = useState(_saved.availability !== undefined ? _saved.availability : null);
  // Motivation
  var [importance, setImportance] = useState(_saved.importance !== undefined ? _saved.importance : null);
  var [motivation, setMotivation] = useState(_saved.motivation !== undefined ? _saved.motivation : null);
  var [timeAvail, setTimeAvail] = useState(_saved.timeAvail !== undefined ? _saved.timeAvail : null);
  // Expectations
  var [respondExpect, setRespondExpect] = useState(_saved.respondExpect !== undefined ? _saved.respondExpect : null);
  var [commStyle, setCommStyle] = useState(_saved.commStyle !== undefined ? _saved.commStyle : null);
  var [deadlineStyle, setDeadlineStyle] = useState(_saved.deadlineStyle !== undefined ? _saved.deadlineStyle : null);
  var [workStyle, setWorkStyle] = useState(_saved.workStyle !== undefined ? _saved.workStyle : null);
  var [slacker, setSlacker] = useState(_saved.slacker !== undefined ? _saved.slacker : null);
  // How you work
  var [respondPace, setRespondPace] = useState(_saved.respondPace !== undefined ? _saved.respondPace : null);
  var [deliverHist, setDeliverHist] = useState(_saved.deliverHist !== undefined ? _saved.deliverHist : null);
  var [earlyFinisher, setEarlyFinisher] = useState(_saved.earlyFinisher !== undefined ? _saved.earlyFinisher : null);
  // Skills/role
  var [teamRole, setTeamRole] = useState(_saved.teamRole !== undefined ? _saved.teamRole : null);
  var [skills, setSkills] = useState(_saved.skills || {});
  var [taskAssign, setTaskAssign] = useState(_saved.taskAssign !== undefined ? _saved.taskAssign : null);
  // Personality
  var [bigFive, setBigFiveMap] = useState(_saved.bigFive || {});
  var [miniIpip, setMiniIpipMap] = useState(_saved.miniIpip || {});
  // Topic + extras
  var [topic, setTopic] = useState(_saved.topic || '');
  var [other, setOther] = useState(_saved.other || '');

  // Wizard step state
  var [stepIdx, setStepIdx] = useState(_saved.stepIdx || 0);
  var mainRef = useRef(null);
  var toggleMeet = key => setMeetTimes(prev => {
    var next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  var setSkill = (k, n) => setSkills(prev => _objectSpread(_objectSpread({}, prev), {}, {
    [k]: n
  }));
  var setBig5 = (k, n) => setBigFiveMap(prev => _objectSpread(_objectSpread({}, prev), {}, {
    [k]: n
  }));
  var setMiniIpip = (k, n) => setMiniIpipMap(prev => _objectSpread(_objectSpread({}, prev), {}, {
    [k]: n
  }));
  var s = {
    length,
    setLength,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    location,
    setLocation,
    meetMode,
    setMeetMode,
    meetTimes,
    toggleMeet,
    availability,
    setAvailability,
    importance,
    setImportance,
    motivation,
    setMotivation,
    timeAvail,
    setTimeAvail,
    respondExpect,
    setRespondExpect,
    commStyle,
    setCommStyle,
    deadlineStyle,
    setDeadlineStyle,
    workStyle,
    setWorkStyle,
    slacker,
    setSlacker,
    respondPace,
    setRespondPace,
    deliverHist,
    setDeliverHist,
    earlyFinisher,
    setEarlyFinisher,
    teamRole,
    setTeamRole,
    skills,
    setSkill,
    taskAssign,
    setTaskAssign,
    bigFive,
    setBig5,
    miniIpip,
    setMiniIpip,
    topic,
    setTopic,
    other,
    setOther
  };
  var STEPS = window.WIZARD_STEPS;
  var step = STEPS[stepIdx];
  var isFirst = stepIdx === 0;
  var isLast = stepIdx === STEPS.length - 1;

  // Per-step + overall progress
  var stepRequired = step.requiredFn ? step.requiredFn(s) : step.required;
  var stepAnswered = step.answered(s);
  var stepComplete = stepRequired === 0 || stepAnswered >= stepRequired;
  var totalRequired = STEPS.reduce((sum, st) => sum + (st.requiredFn ? st.requiredFn(s) : st.required), 0);
  var totalAnswered = STEPS.reduce((sum, st) => sum + st.answered(s), 0);
  var overallPct = totalRequired === 0 ? 0 : Math.min(100, totalAnswered / totalRequired * 100);
  var goNext = () => {
    if (isLast) {
      try {
        localStorage.setItem('groupa_user_v1', JSON.stringify({
          firstName: s.firstName, lastName: s.lastName, location: s.location,
          skills: s.skills, meetTimes: Array.from(s.meetTimes)
        }));
        localStorage.removeItem('groupa_q_v1');
      } catch (e) {}
      var payload = buildSubmissionPayload(s);
      window.__matchPromise = fetch('/.netlify/functions/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(r => r.json())
        .then(result => { window.__matchResult = result; return result; })
        .catch(err => { console.error('match fetch failed:', err); window.__matchResult = null; return null; });
      onSubmit();
      return;
    }
    setStepIdx(i => Math.min(i + 1, STEPS.length - 1));
    // Scroll the page back to top so the next step's header is visible.
    setTimeout(() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }), 0);
  };
  var goBack = () => {
    if (isFirst) {
      onBack();
      return;
    }
    setStepIdx(i => Math.max(i - 1, 0));
    setTimeout(() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }), 0);
  };

  // Persist wizard state after every change so a refresh resumes mid-flow
  useEffect(() => {
    try {
      localStorage.setItem('groupa_q_v1', JSON.stringify({
        length, firstName, lastName, location,
        meetMode, meetTimes: Array.from(meetTimes), availability,
        importance, motivation, timeAvail,
        respondExpect, commStyle, deadlineStyle, workStyle, slacker,
        respondPace, deliverHist, earlyFinisher,
        teamRole, skills, taskAssign,
        bigFive, miniIpip,
        topic, other, stepIdx,
      }));
    } catch (e) {}
  }, [length, firstName, lastName, location, meetMode, meetTimes, availability,
      importance, motivation, timeAvail, respondExpect, commStyle, deadlineStyle,
      workStyle, slacker, respondPace, deliverHist, earlyFinisher, teamRole,
      skills, taskAssign, bigFive, miniIpip, topic, other, stepIdx]);

  // Keyboard: arrow keys advance/retreat steps (only when not editing text)
  useEffect(() => {
    var handler = e => {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowRight' && stepComplete && !isLast) goNext();
      if (e.key === 'ArrowLeft' && !isFirst) goBack();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [stepIdx, stepComplete, isLast, isFirst]);
  return /*#__PURE__*/React.createElement(_SShell, {
    navRight: /*#__PURE__*/React.createElement(_SDots, {
      step: 1,
      total: 3
    }),
    maxWidth: 860
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 14,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      fontWeight: 700,
      color: _SHT.primary,
      letterSpacing: '.12em',
      textTransform: 'uppercase'
    }
  }, "Group Formation Exercise \xB7 Step ", stepIdx + 1, " of ", STEPS.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11.5,
      fontWeight: 600,
      color: _SHT.neutral
    }
  }, totalAnswered, " of ", totalRequired, " answered \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: length === 'long' ? _SHT.primary : _SHT.neutral,
      fontWeight: 700
    }
  }, length === 'long' ? 'Long version' : 'Short version'))), /*#__PURE__*/React.createElement(StepTabs, {
    steps: STEPS,
    stepIdx: stepIdx,
    setStepIdx: setStepIdx,
    state: s
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: _SHT.neutral + '22',
      borderRadius: 3,
      overflow: 'hidden',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "".concat(overallPct, "%"),
      height: '100%',
      background: _SHT.success,
      borderRadius: 3,
      transition: 'width .25s'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    ref: mainRef,
    style: {
      background: _SHT.white,
      backgroundImage: _SHNOISE,
      backgroundBlendMode: 'multiply',
      border: "1px solid ".concat(_SHT.neutral, "33"),
      borderRadius: 14,
      padding: '6px 32px 32px',
      animation: 'screenIn .2s cubic-bezier(.2,.7,.3,1)'
    },
    key: step.id /* re-mount per step → re-runs entry animation */
  }, /*#__PURE__*/React.createElement(step.Render, {
    s: s,
    RadioList: RadioList,
    MeetTimeGrid: MeetTimeGrid,
    SkillLikert: SkillLikert,
    Big5Matrix: Big5Matrix,
    MiniIpipMatrix: MiniIpipMatrix
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 22,
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(_SBtn, {
    variant: "neutral",
    size: "md",
    onClick: goBack
  }, "\u2190 ", isFirst ? 'Onboarding' : 'Previous'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, !stepComplete && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      color: _SHT.neutral
    }
  }, stepRequired - stepAnswered, " more to continue"), /*#__PURE__*/React.createElement(_SBtn, {
    variant: "primary",
    size: "lg",
    disabled: !stepComplete,
    onClick: goNext
  }, isLast ? 'Submit my answers →' : 'Next →'))));
}

// ── Step tabs (clickable breadcrumb of section names) ────────────────────────
function StepTabs(_ref1) {
  var {
    steps,
    stepIdx,
    setStepIdx,
    state
  } = _ref1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, steps.map((st, i) => {
    var required = st.requiredFn ? st.requiredFn(state) : st.required;
    var answered = st.answered(state);
    var isDone = required === 0 || answered >= required;
    var isCurrent = i === stepIdx;
    // Allow jumping to any visited step OR forward to step i if all prior are done
    var allPriorDone = steps.slice(0, i).every(p => {
      var r = p.requiredFn ? p.requiredFn(state) : p.required;
      return r === 0 || p.answered(state) >= r;
    });
    var canJump = i <= stepIdx || allPriorDone;
    return /*#__PURE__*/React.createElement("button", {
      key: st.id,
      type: "button",
      onClick: () => canJump && setStepIdx(i),
      disabled: !canJump,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 11px',
        borderRadius: 999,
        fontFamily: '"Inter", sans-serif',
        fontSize: 12,
        fontWeight: isCurrent ? 700 : 500,
        border: "1.5px solid ".concat(isCurrent ? _SHT.primary : isDone ? _SHT.success : _SHT.neutral + '55'),
        background: isCurrent ? _SHT.primary : isDone ? _SHT.success + '15' : _SHT.white,
        color: isCurrent ? _SHT.white : isDone ? _SHT.success : _SHT.ink,
        cursor: canJump ? 'pointer' : 'not-allowed',
        opacity: canJump ? 1 : 0.5,
        transition: 'all .12s'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: 8,
        flexShrink: 0,
        background: isCurrent ? _SHT.white + '33' : isDone ? _SHT.success : _SHT.neutral + '33',
        color: isCurrent ? _SHT.white : isDone ? _SHT.white : _SHT.neutral,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 700,
        fontSize: 10
      }
    }, isDone && !isCurrent ? '✓' : i + 1), st.title);
  }));
}
window.QuestionnaireScreen = QuestionnaireScreen;
})();
