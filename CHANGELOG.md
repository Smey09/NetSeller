# NetSeller Project Changelog

All notable technical and architectural changes to the NetSeller project are documented here.

---

## [1.2.0] - 2026-10-31

### Complete Website UI Audit & App Router Hardening
- **App Router State Additions:**
  - Added bilingual `not-found.tsx` (`src/app/[locale]/not-found.tsx`) with recovery actions to home and Telegram.
  - Added client error boundary `error.tsx` (`src/app/[locale]/error.tsx`) with error reset and Telegram fallback.
  - Added layout loading skeleton `loading.tsx` (`src/app/[locale]/loading.tsx`).
- **Component & Data Resilience:**
  - `PackageCard`: Added support for `availabilityStatus` (`coming_soon` and `limited`). Handled empty features gracefully.
  - `PackageGrid`: Added an empty state with a "Reset Filter" action when category filters return 0 matching items.
  - `PromotionSection`: Added support for `isExpired` flag with "Offer Ended" visual badge and localized expiration dates (`validUntilKm`).
  - `PackageOrderDialog`: Refactored `DialogContent` to support `closeClassName`, elevating contrast on dark gradient headers.
  - `DigitalBusinessCard` (`/card`): Added dual CTAs ("View All 5 Plans" and "Visit Full Website") and graceful avatar fallback.
- **Testing & Verification:**
  - Added `tests/unit/data-states.test.ts` covering edge cases, expired promos, and long text inputs.
  - Total automated test coverage elevated to 22 Vitest unit tests and 44 Playwright E2E assertions.

---

## [1.1.0] - 2026-10-31

### Localization & Khmer Typography Polish
- **Bilingual Coverage:**
  - Completely reviewed and unified `messages/en.json` and `messages/km.json`.
  - Replaced hardcoded English UI strings with translation keys.
- **Khmer Typography:**
  - Applied `leading-relaxed` line-height adjustments to prevent Khmer subscript vowel collisions.
  - Standardized authentic Cambodian telecommunications phrasing.

---

## [1.0.0] - 2026-10-31

### Initial Production Release & Architecture Foundation
- **Core Platform:**
  - Next.js 14 App Router project foundation with TypeScript strict mode.
  - Sub-path bilingual routing with `next-intl` (`/en` and `/km`).
  - Mobile-first responsive layout (320px to 2560px) with fixed bottom dock for mobile viewports.
- **Features Implemented:**
  - Internet package catalog and comparison matrix (`src/components/packages/`).
  - Two-step order inquiry wizard with automatic Telegram message builder (`src/features/telegram/`).
  - Digital business card page (`/[locale]/card`) with vCard 3.0 generation (`src/features/vcard/`).
  - Print-ready QR code generator with ISO/IEC 18004 Level H error correction (`src/features/qr/`).
  - Zero-cookie anonymous privacy analytics (`src/lib/analytics.ts`).

