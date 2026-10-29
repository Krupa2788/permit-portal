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
