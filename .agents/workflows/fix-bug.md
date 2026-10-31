# Workflow: Fix Bug

Use this workflow when diagnosing, reproducing, and resolving an issue, defect, or broken behavior in NetSeller.

---

## Step 1: Understand the Reported Issue
- Identify the symptoms: visual misalignment, broken form validation, incorrect Telegram link, routing issue, or missing translation.

## Step 2: Locate the Relevant Implementation
- Check `PROJECT_CONTEXT.md` to identify the responsible component, feature service, or route.
- Open only the specific target file(s).

## Step 3: Reproduce & Identify Root Cause
- Run the relevant unit or E2E test to reproduce the failure:
  ```bash
  pnpm test -t "target test name"
  # or
  pnpm test:e2e
  ```
- Identify the exact line or condition causing the bug.

## Step 4: Fix with Smallest Scope
- Apply the targeted fix directly to the affected logic.
- Avoid wide refactoring or rewriting adjacent stable code.

## Step 5: Add Regression Test & Verify
- Add a test case in `tests/unit/` covering the bug condition.
- Run `pnpm test` and `pnpm tsc --noEmit` to verify resolution.

## Step 6: Report Resolution
- Explain the root cause, the fix applied, and the test verification output.

