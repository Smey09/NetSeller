# Workflow: Implement Feature

Use this workflow when adding a new user-facing capability, section, route, or configuration option to NetSeller.

---

## Step 1: Read Project Context
- Read [`AGENTS.md`](../../AGENTS.md) and [`PROJECT_CONTEXT.md`](../../PROJECT_CONTEXT.md).
- Identify which existing components, utilities, or types can be reused.

## Step 2: Understand the Feature Scope
- Clarify whether the feature needs:
  - New route(s) or modification to existing pages.
  - New translation keys in `messages/en.json` and `messages/km.json`.
  - New domain logic or Zod validation schemas.

## Step 3: Locate Related Existing Files
- Find the exact file paths directly (e.g., `src/components/packages/`, `src/data/`, `src/config/`).
- Do NOT perform broad repository scans.

## Step 4: Implement in Smallest Scope
- Follow Next.js Server Component defaults.
- Use existing Tailwind design tokens and CSS variables.
- Ensure all user-facing strings are localized.

## Step 5: Test & Verify
- Run type check: `pnpm tsc --noEmit`.
- Run unit tests: `pnpm test`.
- Add test coverage if new business logic or validations were introduced.

## Step 6: Update Documentation
- If routes, data schemas, or configuration changed, update `PROJECT_CONTEXT.md` and `ARCHITECTURE.md`.
- For significant milestones, add an entry to `CHANGELOG.md`.

## Step 7: Report Deliverables
- Summarize modified files and actual command test outputs to the user.

