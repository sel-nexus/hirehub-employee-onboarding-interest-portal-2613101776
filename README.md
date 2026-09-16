# HireHub Employee Onboarding Interest Portal

HireHub is a demo-ready static portal for collecting candidate interest and letting one browser-local administrator manage those submissions. It is intentionally **not** a production recruiting system: submissions live only in the current browser’s localStorage and the administrator login is the PRD-specified demo gate.

## Features

- Public landing experience at `/` with culture messaging and responsive navigation.
- Candidate application form at `/apply` with field-level validation, duplicate-email protection, local persistence, and four-second confirmation feedback.
- Demo administrator route at `/admin` with sessionStorage-backed login, submission statistics, edit controls, confirmation delete, and logout.
- Resilient browser storage contract under `hirehub_submissions`; damaged JSON is safely reset.
- Vite static build and Vercel SPA fallback configuration.

## Technology

- React 18 and React Router v6
- Vite and JavaScript/JSX
- Plain CSS (`frontend/src/App.css`)
- localStorage and sessionStorage
- Vitest + Testing Library and Playwright

## Local setup

```bash
cd frontend
npm install --no-audit --no-fund --no-bin-links
node node_modules/vite/bin/vite.js
```

Open the URL printed by Vite. The public routes are `/` and `/apply`; the administrator route is `/admin`.

## Demo administrator credentials

- Username: `admin`
- Password: `admin`

These values are intentionally hardcoded for this static demonstration and are not a security mechanism.

## Test commands

```bash
cd frontend
node node_modules/vitest/vitest.mjs run
node node_modules/@playwright/test/cli.js test
node node_modules/vite/bin/vite.js build
```

The sandbox does not create executable npm bin links, so commands invoke each package through Node rather than `npx` or bare package names.

## Storage behavior

Candidate records are stored as a JSON array under `hirehub_submissions` in browser localStorage. Each record has an id, full name, email, mobile number, department, and ISO timestamp. The admin session is tab-scoped under `hirehub_admin_auth` in sessionStorage.

## Deployment

`frontend/` builds a static `dist/` directory. `vercel.json` contains the required SPA rewrite so direct visits to client-side routes resolve to the app. The included nginx Dockerfile is an optional static-hosting path with an SPA fallback and `/healthz` endpoint.

## License

Private and proprietary. All rights reserved.
