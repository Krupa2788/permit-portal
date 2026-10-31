# Decision Log

## D-001: Build tool – Vite

- Date: 2026-10-29
- Status: Accepted
- Decision: Vite + React.
- Why: fast dev server, industry standard, simple config.
- Alternatives: Next.js (adds server concepts too early).

## D-002: Forms – Form.io open source

- Date: 2026-10-29
- Status: Accepted
- Decision: @formio/react (<Form>, <FormBuilder>); schemas stored by us.
- Why: free, matches Kri's Form.io experience; hosted portal is paid.

## D-003: Language – TypeScript

- Date: 2026-10-29
- Status: Accepted
- Decision: TypeScript (Vite react-ts template).
- Why: typed props catch wrong or missing props at the call site; shared types (e.g. SavedForm) keep data, mocks and components in sync.
- Trade-off: slightly slower initial setup; strict typing pays off as the codebase grows.
- Alternatives: JavaScript (less setup, but no prop checking without PropTypes).

## D-004: Form status labels – Record keyed by the status union

- Date: 2026-10-30
- Status: Accepted
- Decision: map labels with `Record<SavedForm["status"], string>`; the union in `SavedForm` stays the single source of truth.
- Why: `Record` requires every key, so adding a status fails the build until it has a label; the old ternary silently fell back to "Draft".
- Alternatives: `as const` array + derived union (also gives a runtime list for e.g. a filter dropdown; not needed yet); TS `enum` (not allowed: tsconfig sets `erasableSyntaxOnly`).

## D-005: Formatting – Prettier

- Date: 2026-10-30
- Status: Accepted
- Decision: Prettier as a pinned devDependency with default options (`.prettierrc` is `{}`); `npm run format` / `npm run format:check`; VS Code formats on save using the project's Prettier.
- Why: one formatter for editor, CLI and anyone else on the repo; ends mixed tabs/spaces and semicolons. Defaults already match most of the code (2 spaces, double quotes, semicolons).
- Alternatives: ESLint stylistic rules (slower, more config); no formatter (style drifts, noisy diffs). eslint-config-prettier not needed: the Vite ESLint config has no formatting rules.

## D-006: Exports – named, not default

- Date: 2026-10-30
- Status: Accepted
- Decision: modules use named exports (`export function FormCard`); no `export default` in `src/`.
- Why: the import name must match the export, so search and rename-symbol find every use; typos fail at compile time; editors auto-import reliably.
- Exceptions: tool config files that require a default export (`vite.config.ts`, `eslint.config.js`). For `React.lazy`, map the named export: `lazy(() => import("./X").then((m) => ({ default: m.X })))`.
- Alternatives: default exports (Vite template style; any import name is accepted, so names drift across files).

## D-007: Dates display in Australia/Brisbane time

- Date: 2026-10-30
- Status: Accepted
- Decision: All dates formatted with Intl, timeZone Australia/Brisbane, en-AU, dateStyle long.
- Why: permit dates are legal Queensland dates; consistent for every viewer; no DST.
- Alternative: user's local zone (right for global apps, wrong for jurisdictional deadlines).

## D-008: Testing – Vitest

- Date: 2026-10-30
- Status: Accepted
- Decision: Vitest for unit tests, test files next to source (`*.test.ts`), explicit imports from `vitest` (no globals).
- Why: reuses the Vite config and TypeScript/ESM setup with no extra transform; Jest-compatible API; explicit imports match D-006 and need no tsconfig `types`.
- Scope for now: Node environment for pure functions. Add jsdom + Testing Library when component tests are needed.
- Alternative: Jest (needs separate TS/ESM config, duplicates what Vite already does).

## D-009: Scope for v1 (3 days)

- Date: 2026-10-30
- Status: Accepted
- Decision: localStorage persistence behind a storage module; no backend, no auth.
- Why: fits the 3-day timebox by keeping v1 client-only; the storage module makes an API swap a one-file change.
- Deferred to v2: Node API, TanStack Query, Zustand, auth.

## D-010: Form.io compatibility

- Date: 2026-10-31
- Status: Accepted
- Decision: confirm Form.io (D-002) works with React 19, TypeScript 6 and Vite 8 using a throwaway spike before building on it.
- Findings: `@formio/js` 5.7.0 and `@formio/react` 6.2.2 install cleanly (peer `react >=17`). Schemas must be typed as `FormType`; otherwise `display` widens to `string`. Each component needs `input: boolean`.
- Result: browser check passed; spike code removed.
- Why a spike: integration risks surface on one disposable folder, not across real pages.

## D-011: Lazy-load Form.io

- Date: 2026-10-31
- Status: Accepted
- Decision: load Form.io components with `React.lazy` + `<Suspense>`, mapping the named export per D-006.
- Why: Form.io adds ~1.8 MB (~490 kB gzip); lazy loading keeps the main bundle at ~225 kB instead of 2 MB.
- Follow-ups: one route per Form.io page; an error boundary for failed chunk loads. The 500 kB chunk warning remains for the Form.io chunk itself.
- Alternative: manual vendor chunks (better caching, but still downloaded on first load).

## D-012: Invalid dates show a fallback

- Date: 2026-10-30
- Status: Accepted
- Decision: `parseDate` returns `null` and warns; the component shows "Unknown date" as plain text (no `<time>`).
- Why: one bad record doesn't crash the list. Split out of D-007.
- Alternative: throw and catch with an Error Boundary (louder, but more machinery for a display-only value).

## D-013: Routing – React Router, declarative mode

- Date: 2026-10-31
- Status: Accepted
- Decision: `react-router` with `<BrowserRouter>` and `<Routes>`/`<Route>`; one component per route in `src/pages/`.
- Why: standard React routing library; declarative mode is the smallest change from a single-page `App` and needs no loaders while data is local (D-009).
- Alternatives: data mode (`createBrowserRouter` + loaders; worth it once data comes from an API); framework mode (adds server rendering and file-based routes, more than v1 needs).
