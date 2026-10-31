# NetSeller Engineering & Development Guide

**Document:** `DEVELOPMENT_GUIDE.md`  
**Package Manager:** `pnpm`  
**Node.js Version:** $\ge 18.17.0$ (Recommended: Node 20 LTS)  
**Last Updated:** October 31, 2026  

---

## 1. Core Development Commands

All commands are defined in [`package.json`](./package.json):

```bash
# 1. Install dependencies
pnpm install

# 2. Run local development server (http://localhost:3000)
pnpm dev

# 3. Type check without emitting files
pnpm tsc --noEmit

# 4. Run ESLint static analysis
pnpm lint

# 5. Run Vitest unit test suite
pnpm test

# 6. Run Vitest in watch mode (TDD)
pnpm test:watch

# 7. Run Playwright end-to-end tests across viewports
pnpm test:e2e

# 8. Build production bundle (SSG pre-rendering)
pnpm build

# 9. Start production server locally
pnpm start
```

---

## 2. Common Development Workflows

### A. How to Add a New Page
1. Create the page folder inside `src/app/[locale]/<new-route>/page.tsx`.
2. Add `unstable_setRequestLocale(locale)` at the top of the Server Component.
3. Export a `generateMetadata` function that provides localized titles and descriptions.
4. Add the route path to `src/config/navigation.ts` if it should appear in the header/footer.
5. If static prerendering is needed, ensure it returns a valid Server Component shell.

### B. How to Add a Reusable Component
1. Place domain-agnostic UI primitives in `src/components/ui/` (e.g., buttons, badges, inputs).
2. Place feature-specific components in their respective directory:
   - `src/components/home/`: Homepage section components.
   - `src/components/packages/`: Packages, dialogs, and comparison tables.
   - `src/components/layout/`: Navigation, footer, floating buttons.
3. Adhere to Server Component conventions: do **NOT** add `"use client"` unless using React state, effects, or browser event handlers.

### C. How to Add or Modify Translations
1. Open both `messages/en.json` and `messages/km.json`.
2. Keep keys identical in both files.
3. For Khmer translations, use natural Cambodian telecommunications phrasing.
4. Access translations in Server Components:
   ```typescript
   import { getTranslations } from "next-intl/server";
   const t = await getTranslations("namespace");
   ```
5. Access translations in Client Components:
   ```typescript
   import { useTranslations } from "next-intl";
   const t = useTranslations("namespace");
   ```

### D. How to Update or Add Internet Packages
1. Open `src/data/packages.ts`.
2. Ensure new items satisfy the `InternetPackage` interface in `src/types/index.ts`:
   - `id`: Unique kebab-case slug (e.g., `fiber-gamer-300`).
   - `speedMbps`: Positive number.
   - `monthlyPriceUsd`: Base monthly subscription fee.
   - `features` & `featuresKm`: Arrays of highlights.
   - `availabilityStatus`: `"available"` | `"limited"` | `"coming_soon"`.
3. If introducing an optional property, update `tests/unit/packages.test.ts` to assert integrity.

### E. How to Add a Promotion
1. Open `src/data/promotions.ts`.
2. Add a new promotion object conforming to the `Promotion` interface (`src/types/index.ts`):
   - `badgeEn` & `badgeKm`
   - `titleEn` & `titleKm`
   - `descriptionEn` & `descriptionKm`
   - `validUntil` (English date string) & `validUntilKm` (Khmer date string)
   - `isExpired`: boolean flag (`false` for active, `true` for ended)
   - `code`: Optional promo code string

### F. How to Modify Design Tokens & Styles
1. All tokens are centralized in `src/app/globals.css`.
2. When tweaking colors, update the HSL values under `:root`.
3. Test changes on both light backgrounds and gradient headers.
4. Verify that touch targets remain at least 44px on mobile devices.

---

## 3. Git & Pull Request Guidelines

> **On-Demand Skill:** For comprehensive Git instructions, branching diagrams, release tagging, and conflict recovery, refer to [`.agent/skills/git-workflow/SKILL.md`](./.agent/skills/git-workflow/SKILL.md).

### Branch Naming Conventions
- `feat/<short-description>`: New capabilities, components, or sections.
- `fix/<issue-description>`: Bug fixes or visual defect corrections.
- `chore/<task>`: Dependency updates, build tooling, or refactoring.
- `docs/<topic>`: Documentation updates only.

### Commit Message Standard (Conventional Commits)
- `feat(packages): add coming soon availability status`
- `fix(dialog): increase close button contrast on dark gradient header`
- `i18n(promotions): add validUntilKm Khmer expiration dates`
- `test(e2e): verify zero horizontal overflow on 320px viewport`

---

## 4. Code Review & Verification Gate

Before submitting code or declaring a task complete, verify that every check passes:

```bash
# Full verification chain
pnpm tsc --noEmit && pnpm lint && pnpm test && pnpm build
```

- [ ] **No Hardcoded Strings:** Every user-facing string is in `messages/*.json`.
- [ ] **No Client JavaScript Leakage:** Only components requiring client state have `"use client"`.
- [ ] **Zero Horizontal Scroll:** Checked on 320px mobile viewport.
- [ ] **Accessibility:** Close buttons, FABs, and icon buttons have `aria-label`.
- [ ] **No Secrets in Client:** No bot tokens or private credentials in client code.

