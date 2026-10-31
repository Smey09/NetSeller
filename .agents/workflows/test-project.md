# Workflow: Test Project

Use this workflow to execute the full testing and quality verification pipeline across NetSeller.

---

## Step 1: Run Static Type Checking
```bash
pnpm tsc --noEmit
```
- Verify 0 TypeScript compiler errors.

## Step 2: Run ESLint
```bash
pnpm lint
```
- Verify 0 ESLint errors and warnings.

## Step 3: Run Vitest Unit Suite
```bash
pnpm test
```
- Verify all 7 unit test suites pass (22 tests).

## Step 4: Run Playwright E2E Suite
```bash
pnpm test:e2e
```
- Verify all 44 browser tests pass across mobile, tablet, and desktop viewports.

## Step 5: Run Production Build
```bash
pnpm build
```
- Verify Next.js SSG pre-rendering succeeds for all 18 static pages.

## Step 6: Report Results
- Report exact pass counts, execution times, and any identified warnings.

