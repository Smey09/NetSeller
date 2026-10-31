---
name: production-readiness
description: Comprehensive deployment and pre-flight verification runbook covering security, performance, build stability, SEO, and tests.
---

# Production Readiness Skill

Use this skill prior to deploying new versions, cutting release builds, or verifying production release gates.

---

## 1. Context & Security References
- **Master Guidelines:** Read [`.agents/rules/06-testing-quality.md`](../rules/06-testing-quality.md) and [`.agents/rules/07-security-performance.md`](../rules/07-security-performance.md).
- **Environment Policy:** Secrets are strictly server-side; client code relies on `sellerConfig.telegramUsername`.

---

## 2. Pre-Flight Verification Checklist

### A. Code & Type Hygiene
- [ ] TypeScript: Zero type errors (`pnpm tsc --noEmit`).
- [ ] ESLint: Zero lint errors or warnings (`pnpm lint`).
- [ ] Unused dependencies: None added without justification.

### B. Security & Secret Exposure
- [ ] No `process.env.TELEGRAM_BOT_TOKEN` in Client Components.
- [ ] No private API credentials committed to repository or `.env.example`.
- [ ] Zero-cookie privacy compliance intact.

### C. Build & Static Generation
- [ ] Execute `pnpm build`.
- [ ] Verify that all 18 static pages prerender cleanly (SSG).
- [ ] Shared client bundle size $\le 100\text{ kB}$.

### D. Automated Test Gates
- [ ] Run unit tests: `pnpm test` (All 22 tests pass).
- [ ] Run E2E tests: `pnpm test:e2e` (All 44 assertions pass).

---

## 3. Pre-Flight Execution Command Chain
Run the complete production release verification chain:
```bash
pnpm tsc --noEmit && pnpm lint && pnpm test && pnpm build && pnpm test:e2e
```

