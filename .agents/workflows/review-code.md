# Workflow: Review Code

Use this workflow to conduct a thorough architectural, security, accessibility, and quality review of changes in NetSeller.

---

## Step 1: Inspect Changed Files
- Run `git status` or inspect the modified files list.
- Check that changes are constrained to the intended scope.

## Step 2: Architecture & Boundary Compliance
- Ensure no unnecessary `"use client"` directives were added to Server Components.
- Verify that `Link` and `useRouter` imports originate from `@/i18n/routing`.
- Confirm that data access satisfies types in `src/types/index.ts`.

## Step 3: Localization Check
- Confirm zero hardcoded user-facing strings in JSX/TSX.
- Check that new keys exist in both `messages/en.json` and `messages/km.json`.

## Step 4: Security & Privacy Check
- Ensure no secret tokens (`TELEGRAM_BOT_TOKEN`, private keys) are exposed in client code.
- Verify that customer inputs are sanitized through Zod schemas.

## Step 5: Accessibility & Responsiveness Check
- Verify keyboard focus rings and `aria-label` tags.
- Verify zero horizontal overflow across responsive viewports.

## Step 6: Test Suite & Build Verification
```bash
pnpm tsc --noEmit && pnpm lint && pnpm test
```

## Step 7: Report Findings
- Provide an itemized review with recommendations and verification status.

