# Rule 06: Testing & Quality Assurance

## Core Mandates
1. **Never Assume or Claim Untested Passes:**
   - Never claim tests passed without executing the command and inspecting the output.
   - Do not ignore failing tests or remove assertions to make a build pass.
2. **Unit Testing Standards (Vitest):**
   - Run `pnpm test` for unit verification.
   - Unit tests are located in `tests/unit/`.
   - Test data models, validations, utilities, and edge cases.
   - When modifying forms or validations, update `tests/unit/validations.test.ts`.
   - When modifying Telegram URL logic, update `tests/unit/telegram.test.ts`.
3. **End-to-End Testing Standards (Playwright):**
   - Run `pnpm test:e2e` for browser testing.
   - Ensure tests cover all key viewports: 320px (Mobile S), 375px (Mobile M), 414px (Mobile L), 768px (Tablet), 1440px (Desktop).
   - Assert zero horizontal scroll (`scrollWidth <= clientWidth`).
   - Verify that modal forms submit and construct correct Telegram links.
4. **Static Verification Gate:**
   - Always run `pnpm tsc --noEmit` to verify type completeness.
   - Run `pnpm lint` to ensure ESLint rules pass with 0 errors.
   - Run `pnpm build` when touching layout, metadata, or server configuration to verify SSG pre-rendering.

