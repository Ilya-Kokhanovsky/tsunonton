# Copilot Coding Agent Onboarding

## Repository Summary
- This repository is a static multi-page marketing/documentation site for the Tsunonton project.
- Main pages live at the repo root (`index.html`, `knowledge.html`, `privacy.html`, `cookies.html`, `risk.html`, `terms.html`).
- Frontend assets are prebuilt and committed under `static/` (especially `static/css/*.min.css` and `static/js/**/*.min.js`).
- JS source modules also live in `static/js/` (non-minified `*.js` entries), and Vite outputs minified bundles back into `static/js`.
- CSS source is Tailwind input files under `src/css/pages/*.input.css`.

## Project Type And Toolchain
- Type: Node-based static site build pipeline.
- Runtime validated locally: `node v22.21.1`, `npm 10.9.4`.
- Build stack: Tailwind CSS 3, PostCSS, Vite 6, javascript-obfuscator.
- Deploy/CI model: GitHub Pages workflow uploads the whole repository as artifact (no CI build/test job).

## Always-Use Command Sequences
Run commands from repository root.

1. Bootstrap (always do first on a fresh machine or after dependency drift):
   - `npm ci`
   - Validated success (about 4s).

2. Fast local verification for most code changes:
   - `npm run build:css:all`
   - `npm run build:js`
   - Validated success (`build:css:all` about 20s, `build:js` about 2s).

3. Production-equivalent verification (full obfuscation path):
   - `npm run build`
   - Validated success (about 32s).
   - This runs CSS builds, then `build:js`, then obfuscates selected minified outputs.

4. Preview server:
   - `npm run preview -- --host 127.0.0.1 --port 4173`
   - Validated startup; Vite prints local URL and keeps running until manually stopped.

5. Dev watch mode:
   - `npm run dev`
   - Starts six concurrent Tailwind watchers and stays active.
   - Expect very noisy repeated `Rebuilding...` logs; this is normal in this repo.

## Known Command Failures (Expected)
- `npm test` fails: missing `test` script.
- `npm run lint` fails: missing `lint` script.
- Treat these as expected repository state, not agent-introduced regressions.

## Preconditions, Postconditions, And Order Rules
- Always run `npm ci` before any build if dependencies may be stale.
- Always run a build command before `preview` so preview reflects fresh assets.
- `npm run build` rewrites committed minified assets in `static/css` and `static/js`; check `git status` before finishing a task.
- Because minified artifacts are source-of-truth in this repo, do not assume generated diffs are accidental.
- No `.env` setup is required for validated build/run flows.

## Validated Behavioral Notes
- Tailwind builds print a Browserslist warning (`caniuse-lite is outdated`) but still succeed.
- `build:js:obfuscate` also succeeds standalone; it internally runs `build:js` first.
- Full build modifies these tracked artifacts:
  - `static/css/*.min.css`
  - `static/js/main.min.js`
  - `static/js/modules/index-enhancements.min.js`
  - `static/js/modules/theme-preload.min.js`
  - `static/js/pages/knowledge.min.js`
  - `static/js/schema/{index,knowledge,privacy,cookies}.min.js`

## Architecture And Layout Quick Map
- Root HTML entry points:
  - `index.html` (main landing page)
  - `knowledge.html` (knowledge/FAQ page)
  - `privacy.html`, `cookies.html`, `risk.html`, `terms.html` (policy pages)
- CSS source:
  - `src/css/pages/*.input.css` (per-page Tailwind inputs)
  - `src/css/shared/_base.css`
- Built CSS output:
  - `static/css/*.min.css`
- JS source and runtime modules:
  - `static/js/main.js` (main boot entry)
  - `static/js/modules/*.js` (feature modules: i18n, theme, menu, faq, chart, etc.)
  - `static/js/pages/knowledge.js` (knowledge-page logic)
  - `static/js/schema/*.js` (structured data scripts)
- Built JS output:
  - `static/js/**/*.min.js`
  - `static/js/chunks/*.min.js`
- Localization:
  - `static/locales/{en,pl,ru}/translation.json`
- Build/config files:
  - `package.json` (all scripts)
  - `vite.config.js` (multi-entry JS build to `static/`)
  - `tailwind.config.js`, `postcss.config.js`
  - `.github/workflows/static.yml` (GitHub Pages deploy)

## CI/Pre-Check Replication
- There is no workflow that compiles or tests before deploy.
- The only GitHub workflow (`.github/workflows/static.yml`) checks out repository and deploys repository contents as-is to Pages.
- To prevent deploy-time regressions, agents should self-enforce:
  1. `npm ci`
  2. `npm run build`
  3. optional `npm run preview -- --host 127.0.0.1 --port 4173` for manual smoke check
  4. inspect `git status --short` and confirm only intended files changed

## Non-Obvious Repository Facts
- `.gitignore` is intentionally broad and ignores many source JS/TS patterns while allowing minified artifacts and selected config files.
- Several root-level scripts like `replace-hero.js`, `patch_nav.js`, `add-head-links.js`, etc. are one-off text patch helpers and not part of npm build scripts.
- Core app initialization starts in `static/js/main.js` and composes feature modules from `static/js/modules/`.

## Agent Working Rules For This Repo
- Prefer editing source files (`src/css/pages/*.input.css`, non-minified JS modules, HTML) and then regenerate assets with npm scripts.
- Do not hand-edit minified files unless the task explicitly requires it.
- After making changes, always run at least `npm run build:css:all` and/or `npm run build:js` for the touched area; run full `npm run build` before final handoff when unsure.
- Trust this document first. Only perform additional repository-wide search when these instructions are incomplete or contradicted by current file contents.