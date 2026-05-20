# Match Made In Class — Prototype (static build)

Plain HTML / CSS / JavaScript export of the Groupa prototype. Edit any
file in place; no build step is required.

## Structure

```
static/
├── index.html                          ← entry point
├── css/
│   └── style.css                       ← global page styles
└── js/
    ├── app.js                          ← top-level App (5-screen flow)
    ├── groupa-components.js            ← shared tokens, buttons, page shell
    ├── groupa-screens.js               ← scenario, role, onboarding, submitted, group
    ├── groupa-questionnaire-atoms.js   ← reference data + form inputs
    ├── groupa-questionnaire-sections.js← per-step renderers (Q1–Q23)
    └── groupa-questionnaire.js         ← wizard with TIPI / Mini-IPIP switch
```

## How it works

- React 18.3.1 is loaded from a CDN. Everything else is a normal `<script>`
  tag — no Babel, no bundler. Each component script attaches its public
  values onto `window` (e.g. `window.QuestionnaireScreen`); later scripts
  read them off `window`.
- The questionnaire ships in two lengths:
  - **Short** → 10-item TIPI personality scale (Gosling et al. 2003).
  - **Long** → 20-item Mini-IPIP (Donnellan et al. 2006, IPIP public domain).
- The user picks the version on step 1 of the wizard.

## Editing

Because each file is a plain script using `React.createElement` (no JSX),
you can open it in any editor and edit components directly. If you want
JSX again, the original `*.jsx` sources are still in the parent project.

## Running

Just open `static/index.html` in a browser. There's no server needed.
The CDN scripts (React, fonts) require an internet connection on first
load; you can self-host them if you need fully offline operation.
