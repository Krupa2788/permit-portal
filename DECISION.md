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
