// Top-level App + mount.
(function () {
  "use strict";

// Match Made In Class — top-level App.
// Drives the 5-screen flow and the facilitator chrome.

const { useState, useEffect } = React;

const SCREENS = [
  { id: 'role',       label: '01 Role Select' },
  { id: 'onboarding', label: '02 Onboarding' },
  { id: 'questions',  label: '03 Questionnaire' },
  { id: 'submitted',  label: '04 Submitted' },
  { id: 'group',      label: '05 Group Result' },
];

function App() {
  const [showScenario, setShowScenario] = useState(true);
  const [idx, setIdx] = useState(0);
  const [stamps, setStamps] = useState({}); // for passive timing during testing

  // Stamp time each time the screen changes — useful for the facilitator to
  // glance at where the participant slowed down, without instrumenting events.
  useEffect(() => {
    if (showScenario) return;
    const s = SCREENS[idx];
    setStamps(prev => ({ ...prev, [s.id]: prev[s.id] ?? Date.now() }));
  }, [idx, showScenario]);

  const restart = () => {
    setShowScenario(true);
    setIdx(0);
    setStamps({});
    try { localStorage.removeItem('groupa_q_v1'); localStorage.removeItem('groupa_user_v1'); } catch (e) {}
    delete window.__matchPromise;
    delete window.__matchResult;
  };

  const next = () => setIdx(i => Math.min(i + 1, SCREENS.length - 1));
  const back = () => setIdx(i => Math.max(i - 1, 0));

  const screen = SCREENS[idx].id;

  return React.createElement(
    React.Fragment,
    null,
    // Facilitator chrome — always visible during testing
    React.createElement(
      'div',
      {
        className: 'facilitator-bar',
        'data-screen-label': '00 Facilitator Bar',
      },
      React.createElement('span', null, SCREENS[idx].label),
      React.createElement(
        'button',
        { onClick: restart, title: 'Reset prototype to scenario card' },
        '\u21BA Reset'
      )
    ),

    // Scenario card on first load
    showScenario &&
      React.createElement(window.ScenarioOverlay, {
        onBegin: () => setShowScenario(false),
      }),

    // Current screen
    React.createElement(
      'div',
      {
        key: screen,
        className: 'screen-enter',
        'data-screen-label': SCREENS[idx].label,
        style: { minHeight: '100vh' },
      },
      screen === 'role' &&
        React.createElement(window.RoleScreen, { onNext: next }),
      screen === 'onboarding' &&
        React.createElement(window.OnboardingScreen, { onNext: next, onBack: back }),
      screen === 'questions' &&
        React.createElement(window.QuestionnaireScreen, { onSubmit: next, onBack: back }),
      screen === 'submitted' &&
        React.createElement(window.SubmittedScreen, { onContinue: next }),
      screen === 'group' &&
        React.createElement(window.GroupScreen, { onRestart: restart })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);

})();
