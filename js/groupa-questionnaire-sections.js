// Compiled from groupa-questionnaire-sections.jsx — edit the corresponding .jsx if you want JSX back.
(function () {
  "use strict";

"use strict";

// Per-section step renderers for the wizard. Each function takes (s, helpers)
// and renders a single page's questions. Order is defined in WIZARD_STEPS.

var _SecT = window.TOKENS;

// Re-pull atoms from window so each step is self-explanatory.
var {
  QLabel,
  QText,
  SectionHead,
  MEET_MODES,
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
  TASK_ASSIGN
} = window;

// ── Shared layout: one question block ────────────────────────────────────────
function QBox(_ref) {
  var {
    n,
    q,
    hint,
    required = true,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement(QLabel, {
    n: n,
    q: q,
    hint: hint,
    required: required
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 28
    }
  }, children));
}

// ── Length picker step ───────────────────────────────────────────────────────
function StepLength(_ref2) {
  var {
    s
  } = _ref2;
  var opts = [{
    key: 'short',
    title: 'Short version',
    time: '~5 min',
    blurb: 'A 10-item personality check (TIPI). Best when most of the class is short on time.',
    bullets: ['22 required questions', '10-item personality scale', 'Single page per section']
  }, {
    key: 'long',
    title: 'Long version',
    time: '~10 min',
    blurb: 'A 20-item personality check (Mini-IPIP). More signal for matching, but takes longer.',
    bullets: ['22 required questions', '20-item personality scale', 'More reliable Big-Five scoring']
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Before you start",
    title: "Quick or thorough?",
    body: "Your instructor has enabled both versions. Pick whichever you have time for \u2014 your answers help us match you with teammates either way."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 14,
      marginTop: 18
    }
  }, opts.map(o => {
    var on = s.length === o.key;
    return /*#__PURE__*/React.createElement("button", {
      key: o.key,
      type: "button",
      onClick: () => s.setLength(o.key),
      style: {
        textAlign: 'left',
        background: on ? _SecT.primary + '0d' : _SecT.white,
        border: "2px solid ".concat(on ? _SecT.primary : _SecT.neutral + '44'),
        borderRadius: 12,
        padding: '20px 22px',
        cursor: 'pointer',
        boxShadow: on ? "0 6px 18px ".concat(_SecT.primary, "22") : '0 1px 3px rgba(0,0,0,.04)',
        transition: 'all .15s',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 600,
        fontSize: 18,
        color: _SecT.ink
      }
    }, o.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 11,
        fontWeight: 700,
        color: on ? _SecT.white : _SecT.neutral,
        background: on ? _SecT.primary : _SecT.neutral + '22',
        padding: '3px 9px',
        borderRadius: 999,
        letterSpacing: '.06em',
        textTransform: 'uppercase'
      }
    }, o.time)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 13.5,
        color: _SecT.neutral,
        lineHeight: 1.5
      }
    }, o.blurb), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, o.bullets.map(b => /*#__PURE__*/React.createElement("li", {
      key: b,
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 12.5,
        color: _SecT.ink,
        display: 'flex',
        gap: 8,
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: _SecT.success,
        fontWeight: 700
      }
    }, "\u2713"), b))));
  })));
}

// ── Section 1 · Profile ──────────────────────────────────────────────────────
function StepProfile(_ref3) {
  var {
    s
  } = _ref3;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 1 of 8",
    title: "Let's create your profile."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 1,
    q: "Please tell me your first name."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement(QText, {
    value: s.firstName,
    onChange: s.setFirstName,
    placeholder: "First name",
    maxLength: 60
  }))), /*#__PURE__*/React.createElement(QBox, {
    n: 2,
    q: "And your last name."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement(QText, {
    value: s.lastName,
    onChange: s.setLastName,
    placeholder: "Last name",
    maxLength: 60
  }))), /*#__PURE__*/React.createElement(QBox, {
    n: 3,
    q: "And where are you located?",
    hint: "City, State"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement(QText, {
    value: s.location,
    onChange: s.setLocation,
    placeholder: "e.g., Minneapolis, MN",
    maxLength: 80
  }))));
}

// ── Section 2 · Logistics ────────────────────────────────────────────────────
function StepLogistics(_ref4) {
  var {
    s,
    RadioList,
    MeetTimeGrid
  } = _ref4;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 2 of 8",
    title: "Let's talk logistics."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 4,
    q: "How do you prefer to meet?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.meetMode,
    onChange: s.setMeetMode,
    options: MEET_MODES
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 5,
    q: "What times are you generally available to meet?",
    hint: "Select all that apply."
  }, /*#__PURE__*/React.createElement(MeetTimeGrid, {
    value: s.meetTimes,
    toggle: s.toggleMeet
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 6,
    q: "What best describes your availability?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.availability,
    onChange: s.setAvailability,
    options: AVAILABILITY
  })));
}

// ── Section 3 · Motivation ───────────────────────────────────────────────────
function StepMotivation(_ref5) {
  var {
    s,
    RadioList
  } = _ref5;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 3 of 8",
    title: "Engagement & motivation.",
    body: "Don't tell us what you think we want to hear \u2014 this won't impact your grade. We just need to make sure your teammates are aligned with you."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 7,
    q: "How important is this project to you?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.importance,
    onChange: s.setImportance,
    options: IMPORTANCE
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 8,
    q: "What motivates you most?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.motivation,
    onChange: s.setMotivation,
    options: MOTIVATION
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 9,
    q: "How much time do you realistically have for group work this term?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.timeAvail,
    onChange: s.setTimeAvail,
    options: TIME_AVAILABLE
  })));
}

// ── Section 4 · Expectations ─────────────────────────────────────────────────
function StepExpectations(_ref6) {
  var {
    s,
    RadioList
  } = _ref6;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 4 of 8",
    title: "What you expect from teammates.",
    body: "It's important to answer honestly so we can match you with the right people."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 10,
    q: "You send a group message about a project that is due soon. When do you expect a response?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.respondExpect,
    onChange: s.setRespondExpect,
    options: RESPOND_EXPECT
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 11,
    q: "Which best describes how you prefer to communicate about group work?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.commStyle,
    onChange: s.setCommStyle,
    options: COMM_STYLE
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 12,
    q: "How do you typically want the group to approach deadlines?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.deadlineStyle,
    onChange: s.setDeadlineStyle,
    options: DEADLINE_STYLE
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 13,
    q: "How do you prefer to work in a group?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.workStyle,
    onChange: s.setWorkStyle,
    options: WORK_STYLE
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 14,
    q: "A teammate has missed multiple deadlines and isn't giving as much effort as others on the team. What do you do?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.slacker,
    onChange: s.setSlacker,
    options: SLACKER
  })));
}

// ── Section 5 · How you work ─────────────────────────────────────────────────
function StepWork(_ref7) {
  var {
    s,
    RadioList
  } = _ref7;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 5 of 8",
    title: "How you work in groups.",
    body: "There are no right or wrong answers \u2014 please choose the option that best reflects how you actually work."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 15,
    q: "How quickly do you typically respond to a group message?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.respondPace,
    onChange: s.setRespondPace,
    options: RESPOND_PACE
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 16,
    q: "Think about your most recent group project. How often did you deliver your work by the agreed-upon time within the group?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.deliverHist,
    onChange: s.setDeliverHist,
    options: DELIVER_HISTORY
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 17,
    q: "A teammate prefers to finish the group deliverable several days before the deadline, but your usual pace is different. How would you respond?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.earlyFinisher,
    onChange: s.setEarlyFinisher,
    options: EARLY_FINISHER
  })));
}

// ── Section 6 · Skills & role ────────────────────────────────────────────────
function StepSkills(_ref8) {
  var {
    s,
    RadioList,
    SkillLikert
  } = _ref8;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 6 of 8",
    title: "Tell us what you're good at."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 18,
    q: "What role do you take in teams most often?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.teamRole,
    onChange: s.setTeamRole,
    options: TEAM_ROLE
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 19,
    q: "How would you rate yourself on each of these skills?",
    hint: "Rate each skill 1\u20135. It's difficult to be good at everything \u2014 be honest."
  }, /*#__PURE__*/React.createElement(SkillLikert, {
    values: s.skills,
    set: s.setSkill
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 20,
    q: "How would you like to assign tasks to group members?"
  }, /*#__PURE__*/React.createElement(RadioList, {
    value: s.taskAssign,
    onChange: s.setTaskAssign,
    options: TASK_ASSIGN
  })));
}

// ── Section 7 · Personality (length-dependent) ──────────────────────────────
function StepPersonality(_ref9) {
  var {
    s,
    Big5Matrix,
    MiniIpipMatrix
  } = _ref9;
  var isLong = s.length === 'long';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 7 of 8",
    title: "How you see yourself.",
    body: isLong ? 'These 20 statements ask about your general personality. Rate how accurately each one describes you.' : 'These questions ask about your general personality. Rate the extent to which each pair of traits applies to you, even if one characteristic applies more strongly than the other.'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement(QLabel, {
    n: 21,
    q: isLong ? 'How accurately does each statement describe you?' : 'I see myself as…'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 28
    }
  }, isLong ? /*#__PURE__*/React.createElement(MiniIpipMatrix, {
    values: s.miniIpip,
    set: s.setMiniIpip
  }) : /*#__PURE__*/React.createElement(Big5Matrix, {
    values: s.bigFive,
    set: s.setBig5
  }))));
}

// ── Section 8 · Topic + open-ended ───────────────────────────────────────────
function StepTopic(_ref0) {
  var {
    s
  } = _ref0;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Section 8 of 8",
    title: "One last thing.",
    body: "Questions specific to this course / project \u2014 set by your instructor."
  }), /*#__PURE__*/React.createElement(QBox, {
    n: 22,
    q: "Which topic would you like to focus your project on?"
  }, /*#__PURE__*/React.createElement(QText, {
    value: s.topic,
    onChange: s.setTopic,
    placeholder: "e.g., Accessible voice interfaces for older adults",
    maxLength: 140
  })), /*#__PURE__*/React.createElement(QBox, {
    n: 23,
    q: "Is there anything else you would want future teammates to know about how you work in groups?",
    required: false,
    hint: "Optional \u2014 tell teammates anything that didn't fit above."
  }, /*#__PURE__*/React.createElement(QText, {
    multi: true,
    value: s.other,
    onChange: s.setOther,
    placeholder: "Share any context that would help your future team work with you well.",
    maxLength: 500
  })));
}

// ── Wizard step manifest ────────────────────────────────────────────────────
// Each step declares its title, the renderer, and a function that returns the
// answered-count for that step (used for per-step progress + can-advance gates).
var WIZARD_STEPS = [{
  id: 'length',
  title: 'Pick your version',
  Render: StepLength,
  required: 0,
  // length always has a default, never blocks advance
  answered: () => 1
}, {
  id: 'profile',
  title: 'Profile',
  Render: StepProfile,
  required: 3,
  answered: s => [s.firstName, s.lastName, s.location].filter(x => x.trim().length > 0).length
}, {
  id: 'logistics',
  title: 'Logistics',
  Render: StepLogistics,
  required: 3,
  answered: s => [s.meetMode !== null, s.meetTimes.size > 0, s.availability !== null].filter(Boolean).length
}, {
  id: 'motivation',
  title: 'Motivation',
  Render: StepMotivation,
  required: 3,
  answered: s => [s.importance, s.motivation, s.timeAvail].filter(v => v !== null).length
}, {
  id: 'expectations',
  title: 'Expectations',
  Render: StepExpectations,
  required: 5,
  answered: s => [s.respondExpect, s.commStyle, s.deadlineStyle, s.workStyle, s.slacker].filter(v => v !== null).length
}, {
  id: 'work',
  title: 'How you work',
  Render: StepWork,
  required: 3,
  answered: s => [s.respondPace, s.deliverHist, s.earlyFinisher].filter(v => v !== null).length
}, {
  id: 'skills',
  title: 'Skills',
  Render: StepSkills,
  required: 7,
  // Q18, Q19 (5 rows), Q20
  answered: s => {
    var skillRows = window.SKILLS.filter(k => s.skills[k] != null).length;
    return (s.teamRole !== null ? 1 : 0) + skillRows + (s.taskAssign !== null ? 1 : 0);
  }
}, {
  id: 'personality',
  title: 'Personality',
  Render: StepPersonality,
  required: 0,
  // dynamic — see answered/total
  requiredFn: s => s.length === 'long' ? 20 : 10,
  answered: s => s.length === 'long' ? window.MINI_IPIP.filter(it => s.miniIpip[it.t] != null).length : window.BIG5.filter(b => s.bigFive[b.label] != null).length
}, {
  id: 'topic',
  title: 'Topic',
  Render: StepTopic,
  required: 1,
  // Q22 only; Q23 optional
  answered: s => s.topic.trim().length > 0 ? 1 : 0
}];
window.WIZARD_STEPS = WIZARD_STEPS;
})();
