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

- Decision: All dates formatted with Intl, timeZone Australia/Brisbane, en-AU, dateStyle long.
- Why: permit dates are legal Queensland dates; consistent for every viewer; no DST.
- Alternative: user's local zone (right for global apps, wrong for jurisdictional deadlines).
- Invalid dates: `parseDate` returns `null` and warns; the component shows "Unknown date" as plain text (no `<time>`), so one bad record doesn't crash the list.
- Alternative: throw and catch with an Error Boundary (louder, but more machinery for a display-only value).

## D-008: Testing – Vitest

- Decision: Vitest for unit tests, test files next to source (`*.test.ts`), explicit imports from `vitest` (no globals).
- Why: reuses the Vite config and TypeScript/ESM setup with no extra transform; Jest-compatible API; explicit imports match D-006 and need no tsconfig `types`.
- Scope for now: Node environment for pure functions. Add jsdom + Testing Library when component tests are needed.
- Alternative: Jest (needs separate TS/ESM config, duplicates what Vite already does).
