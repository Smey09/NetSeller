# NetSeller Project Changelog

All notable technical and architectural changes to the NetSeller project are documented here.

---

## [1.5.1] - 2026-10-31

### Git Configuration & Git Workflow Skill Addition
- **Improved `.gitignore` Coverage:**
  - Added comprehensive ignore rules for TypeScript incremental build cache (`*.tsbuildinfo`), pnpm store (`.pnpm-store`), Turbo & Vercel caches (`.turbo`, `.vercel`), OS clutter (`.DS_Store?`, `._*`, `Thumbs.db`), and local environment credential patterns.
  - Untracked `tsconfig.tsbuildinfo` from git index to eliminate persistent dirty-tree noise during builds.
- **Added `git-workflow` Skill:**
  - Authored [`.agent/skills/git-workflow/SKILL.md`](.agent/skills/git-workflow/SKILL.md) providing a structured Git playbook for:
    - Branch naming conventions (`feat/`, `fix/`, `perf/`, `style/`, `chore/`, `docs/`).
    - Pre-commit quality verification gate (TypeScript $\rightarrow$ Lint $\rightarrow$ Unit tests $\rightarrow$ SSG Build $\rightarrow$ Playwright E2E).
    - Conventional Commits standard (types and permitted scopes).
    - Safe rebasing and synchronization protocols.
    - Release tagging and semantic versioning workflows (`vMAJOR.MINOR.PATCH`).
    - Stashing and emergency conflict recovery.
  - Updated [`AGENTS.md`](AGENTS.md) and [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md) to reference the new skill.
- **Verification:** 18 Vitest unit tests passed, Next.js SSG build passed (58.9 kB), 0 ESLint warnings, 32 Playwright E2E tests passed.

---

## [1.5.0] - 2026-10-31

### Production-Ready Clean Color Theme Design
- **Eliminated Multi-Stop Gradients & Muddy Background Blobs:**
  - Replaced noisy blur-blob gradients in `HeroSection.tsx` with a pristine, modern canvas: `bg-gradient-to-b from-slate-50/90 via-white to-white` with an elegant subtle dot matrix pattern (`opacity-40`).
  - Simplified primary CTA buttons and headlines to high-contrast, pure brand primary `#2563EB` and Telegram `#229ED9`.
  - Replaced the 3-stop multi-color gradient banner on `PackageCard.tsx` with a crisp, executive solid `bg-primary-600` banner.
  - Upgraded package pricing and speed containers to subtle, clean `bg-slate-50/80 border border-slate-200/70` with high-legibility slate-900 typography.
  - Polished section alternating rhythm across the entire landing page:
    - **Hero:** Clean white canvas with subtle slate gradient & dot matrix.
    - **Packages:** Pure white with subtle hairline separation.
    - **Promotions:** Soft slate tint (`bg-slate-50/70`) with clean amber-500 accent tag.
    - **Contact:** Pure white with clean sky/slate card surfaces.
    - **Footer:** Deep executive dark slate-950.
- **Verification:** 18 Vitest unit tests passed, Next.js SSG build passed (58.9 kB), 0 ESLint warnings, and 32 Playwright E2E tests passed across all mobile & desktop viewports (320px–1440px).

---

## [1.4.9] - 2026-10-31

### Friendly Hero Image Showcase
- **Replaced Technical Telemetry Card with Friendly Hero Image:**
  - Removed the dark telemetry cockpit card with technical speed meters from the right column of the Hero section (`src/components/home/HeroSection.tsx`).
  - Integrated a friendly, professional commercial photo of the consultant holding a sleek Wi-Fi 6 router (`public/images/hero-friendly-consultant.jpg`).
  - Added modern, subtle floating glassmorphic pills:
    - Top pill: Officer Seller identity and live Telegram online status indicator (`< 15m Fast Reply`).
    - Bottom pill: Free Wi-Fi 6 router included badge, $0 setup guarantee, and a 1-tap direct Telegram inquiry button.
  - Configured `sellerConfig.avatarUrl` to use the friendly consultant portrait across all avatar chips and header/footer profile badges.
- **Verification:** 18 Vitest unit tests passed, Next.js SSG build passed (59 kB), 0 ESLint warnings, 32 Playwright E2E tests passed across all mobile & desktop viewports (320px–1440px).

---

## [1.4.8] - 2026-10-31

### Mobile UX/UI Ergonomics & Compact Card Overhaul
- **Eliminated Excessive Spacing & Oversized Cards on Mobile Devices:**
  - **Hero Section:**
    - Reduced excessive vertical padding from `pt-8 pb-16` (128px) down to sleek mobile padding `pt-4 pb-8`.
    - Compacted column gap from 40px (`gap-10`) to 24px (`gap-6`).
    - Redesigned 3 tall stacked full-width buttons into a thumb-ergonomic 2-column action grid (Explore Packages + Telegram) plus a compact hotline pill.
    - Compacted the Right Showcase Container padding from `p-6` to `p-3.5`, streamlining speed telemetry and dual bandwidth meters into a space-efficient cockpit row.
    - Reduced bottom highlight metric cards from large blocks (`mt-12 p-4`) to 4 sleek metric chips (`mt-6 p-2.5`).
  - **Package Cards:**
    - Overhauled [`PackageCard.tsx`](src/components/packages/PackageCard.tsx) to eliminate bloated mobile cards: reduced inner padding from 24px to 14px (`p-3.5`), optimized Zap icon from 40px to 32px, and streamlined speed/pricing boxes.
    - Shaved ~120px of unnecessary vertical height per card on mobile phones, creating a native, modern, compact appearance.
    - Reduced section vertical padding from 64px (`py-16`) to 32px (`py-8`).
  - **Promotion & Contact Sections:**
    - Reduced section padding from `py-16` to `py-8` and header margins from `mb-12` to `mb-6`.
    - Compacted interactive quick-action cards and Telegram cards for 1-tap phone accessibility.
    - Maintained strict $\ge 44$px touch targets for all primary buttons and interactive links.
  - **Footer:**
    - Compacted top padding from `pt-14` to `pt-8` with responsive `p-2.5` officer profile card.
- **Verification:** 18 Vitest unit tests passed, Next.js SSG build passed (59.6 kB), 0 ESLint warnings, and 32 Playwright E2E tests passed across all mobile & desktop viewports (320px–1440px).

---

## [1.4.7] - 2026-10-31

### Unified Ultra-Modern Hero Main Fold
- **Single Hero Main Fold Architecture:**
  - Removed separate stacked top fold box that pushed the hero headline and packages down.
  - Consolidated Officer Seller profile and telecommunications showcase into a single, cohesive, ultra-modern Hero fold (`src/components/home/HeroSection.tsx`).
  - **Left Column:** Officer Seller micro-identity pill (avatar, verified badge, title), high-impact responsive headline, personalized consultant value proposition, 1-tap Telegram and Call CTA buttons, and trust indicators.
  - **Right Column:** Modern elevated glassmorphic card uniting Officer Seller profile header (online status indicator, title, avatar) with real-time optical network monitor (99.9% uptime, 4ms latency, Wi-Fi 6 indicator, symmetrical 100 Mbps meters, and personal direct service guarantees).
  - **Bottom Highlight Metrics:** 4 sleek metrics (Up to 150 Mbps, < 15 Mins Telegram response, $0 Setup Fee, 100% UNLIMITED data).
- **Mobile-First Responsiveness:** Zero horizontal scroll across 320px–2560px viewports, immediate visibility of Officer Seller identity and CTAs above the fold.
- **Verification:** 18 Vitest unit tests passed, Next.js SSG build passed (59 kB), 32 Playwright E2E tests passed across all mobile & desktop viewports (320px, 375px, 414px, 768px, 1440px).

---

## [1.4.6] - 2026-10-31

### Website Owner (Officer Seller) Profile Hero Redesign
- **Officer Seller Profile Card in Hero Fold:**
  - Placed an executive personal profile card directly in the Hero Section header:
    - High-resolution avatar with official telecom verified badge.
    - Officer Name: **Officer Seller** with "Official Sales Officer" verification pill.
    - Localized Title: `Home Wi-Fi Sales Officer • Official Telecom Consultant` (`មន្ត្រីផ្នែកលក់សេវា Home Wi-Fi • អ្នកប្រឹក្សាផ្លូវការ`).
    - Real-Time Online Status: `Telegram Online • Fast Reply < 15m`.
    - Localized personal introduction bio explaining 1-on-1 package consultations and optical coverage feasibility checks.
    - 4 Core Officer Stats: 5+ Years Experience, 1,250+ Installations, 99.4% Satisfaction Rate, < 15m Telegram Reply.
    - 1-Tap Quick Action Buttons: Direct Telegram chat (`@NetSellerKH`) and direct phone call.
- **Visual Telecommunications Monitor:**
  - Paired the profile card with the live optical network status monitor (99.9% Uptime, 4ms Ping, symmetrical 100 Mbps meters, Wi-Fi 6 indicator).
- **Verification:** 18 unit tests passed, 32 Playwright E2E tests passed across all screen sizes with 0 errors.

---

## [1.4.5] - 2026-10-31

### Package Section Streamlining
- **Removed Hardware Equipment Showcase Card:**
  - Removed "Included Wi-Fi Equipment & Professional Setup" card from [`PackageSection.tsx`](src/components/home/PackageSection.tsx).
  - The packages section now cleanly presents the 4 Home Wi-Fi packages without additional long equipment text walls.
  - Reduced First Load JS to 58.8 kB.
- **Verification:** 18 unit tests passed, 32 Playwright E2E cross-browser responsive tests passed.

---

## [1.4.4] - 2026-10-31

### Included Wi-Fi Equipment & Professional Setup Card Polish
- **Interactive 1-Tap Advice Action:**
  - Configured the Telegram advice button with clipboard auto-copy for mobile users asking about Wi-Fi equipment in multi-story houses or villas.
  - Added visual confirmation notification upon clicking ("Message copied! Opening Telegram...").
- **Enhanced Value Highlighting:**
  - Added dedicated value badges to each pillar:
    - Pillar 1: Free Loan ($45 – $65 Value)
    - Pillar 2: Free Setup (Save up to $45)
    - Pillar 3: 100% Peace of Mind
  - Added hardware summary badge: Wi-Fi 5 & Wi-Fi 6 Gigabit hardware on $0 loan.
- **Khmer Terminology Polish:**
  - Localized title naturally as `ឧបករណ៍ Wi-Fi រួមបញ្ចូល & ការដំឡើងប្រកបដោយវិជ្ជាជីវៈ`.
- **Verification:** 18 unit tests passed, 32 E2E cross-browser tests passed with 0 errors.

---

## [1.4.3] - 2026-10-31

### Hero & Equipment Upgrades & Simplification
- **Removed Operating Hours:**
  - Pruned operating hours from [`ContactSection.tsx`](src/components/home/ContactSection.tsx) and [`Footer.tsx`](src/components/layout/Footer.tsx) to keep contact touchpoints focused exclusively on 24/7 direct Telegram messaging and personal phone calls.
- **Removed Package Comparison Table:**
  - Removed `PackageComparisonTable.tsx` and the grid/table view toggle buttons in [`PackageSection.tsx`](src/components/home/PackageSection.tsx) to eliminate redundancy with the package cards.
- **Improved Hero Section (`HeroSection.tsx`):**
  - Upgraded Officer Seller verification fold with clear title and fast Telegram handle.
  - Enhanced optical network telecommunications showcase card with live uptime, 4ms ping gauge, symmetrical bandwidth bars, and Wi-Fi 6 indicator.
  - Aligned the 4 key metrics to: Up to 150 Mbps, < 15 Mins Telegram response, $0 Setup Fee, and 100% UNLIMITED data.
- **Improved "Included Wi-Fi Equipment & Professional Setup" (`PackageSection.tsx`):**
  - Enhanced 3-pillar hardware architecture: Gigabit Dual-Band / Wi-Fi 6 Routers, Direct Optical Fiber Drop ($0 setup), and Continuous Hardware Replacement Guarantee.
  - Added interactive Telegram consultation callout for villas, shophouses, and concrete wall setups.
- **Verification:** 18 unit tests passed, 32 E2E cross-browser tests passed with 0 errors and 0 horizontal overflows.

---

## [1.4.2] - 2026-10-31

### Personal Sales Branding Alignment (No Corporate Clutter)
- **Removed Corporate Terms & Blocks:**
  - Removed "Coverage Provinces" tag section from [`Footer.tsx`](src/components/layout/Footer.tsx).
  - Removed "Service Base" / office hubs from [`Footer.tsx`](src/components/layout/Footer.tsx) and [`ContactSection.tsx`](src/components/home/ContactSection.tsx).
  - Replaced "Call Center" with personal "Personal Phone & Call" (`លេខទូរស័ព្ទផ្ទាល់ (Phone & Call)`) in [`messages/en.json`](messages/en.json) and [`messages/km.json`](messages/km.json).
- **Quality Gates:** 18 unit tests passed, 32 E2E cross-browser tests passed across all screen sizes.

---

## [1.4.1] - 2026-10-31

### Section Pruning for Streamlined Sales Flow
- **Removed 5 Informational & Text-Heavy Sections:**
  - Removed "Why Work with a Personal Consultant?" (`WhyChooseMe.tsx`)
  - Removed "How It Works" (`HowItWorks.tsx`)
  - Removed "A Message From Your Consultant" (`AboutSection.tsx`)
  - Removed "Service Areas in Cambodia" (`ServiceAreasSection.tsx`)
  - Removed "Our Quality & Service Commitments" (`TestimonialsSection.tsx`)
- **Streamlined Navigation & Footer:**
  - Pruned dead anchor links (`#why-choose-me`, `#about`) from [`Header.tsx`](src/components/layout/Header.tsx), [`Footer.tsx`](src/components/layout/Footer.tsx), and [`navigation.ts`](src/config/navigation.ts).
- **Lightweight Single-Page Layout (`src/app/[locale]/page.tsx`):**
  - The entire page is now focused exclusively on the conversion funnel:
    $$\text{Hero (Officer Seller)} \longrightarrow \text{Home Wi-Fi Packages \& Hardware} \longrightarrow \text{Promotions} \longrightarrow \text{1-Tap Telegram Contact}$$
- **First Load JS:** Reduced bundle to 61.4 kB.
- **Verification:** 18 unit tests passed, 32 E2E cross-browser tests passed across all screen sizes (320px–1440px).

---

## [1.4.0] - 2026-10-31

### Officer Seller Single-Page App (SPA) & 100% Home Wi-Fi Transformation
- **Persona & Identity Realignment:**
  - Configured seller identity specifically as **"Officer Seller"** (`titleEn: "Home Wi-Fi Sales Officer • Official Telecom Consultant"`, `titleKm: "មន្ត្រីផ្នែកលក់សេវា Home Wi-Fi • អ្នកប្រឹក្សាផ្លូវការ"`).
  - Rewrote bios and consultation pledges to focus on residential Home Wi-Fi packages, coverage feasibility checks, and optical fiber installations in Cambodia.
- **Dedicated Home Wi-Fi Catalog Overhaul (`src/data/packages.ts`):**
  - Pruned corporate/leased-line plans ("Business Pro", "Enterprise Dedicated") to focus exclusively on Home Wi-Fi:
    1. **Home Wi-Fi Starter** (30 Mbps — $15/mo)
    2. **Home Wi-Fi Family Standard** (50 Mbps — $20/mo) [Most Popular]
    3. **Home Wi-Fi Ultra Fast** (100 Mbps — $30/mo, Wi-Fi 6) [Best Value]
    4. **Home Wi-Fi Super Speed** (150 Mbps — $42/mo, Villa & Large Homes)
- **Single-Page Architecture Consolidation:**
  - Removed multi-page routing overhead (`/[locale]/packages` and `/[locale]/contact`) in favor of seamless in-page anchor scrolling (`/#packages`, `/#contact`).
  - Added HTTP 307 redirects in `next.config.mjs` routing `/:locale/packages` $\to$ `/:locale#packages` and `/:locale/contact` $\to$ `/:locale#contact`.
  - Moved the **Wi-Fi Equipment & Setup Showcase Card** directly into `PackageSection.tsx` on the main landing page.
- **1-Tap Telegram Contact Action Hub (`ContactSection.tsx`):**
  - Replaced the previous 4-field blocking web form with an interactive 1-Tap Telegram Action Hub:
    - **Check Home Fiber Coverage:** 1-tap pre-fills a location check message and opens Telegram.
    - **Book Home Wi-Fi Installation:** 1-tap schedules an installation appointment directly.
    - **Ask Questions / Speed Advice:** 1-tap connects directly to Officer Seller for router/speed consultations.
    - **Optional Custom Note:** Allows customers to optionally draft custom questions without mandatory form restrictions.
- **All Quality Gates Green:**
  - Vitest: 18 unit tests passing.
  - Playwright: 32 cross-browser responsive tests passing across 320px, 375px, 414px, 768px, and 1440px with zero horizontal scroll overflow.
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings or errors (`pnpm lint`).
  - Production Build: Static site generation (`SSG`) completes cleanly (`pnpm build`).

---

## [1.3.0] - 2026-10-31

### Feature Pruning & High-Conversion Showcase Cards
- **Removal of Digital Card & QR Code Generator Features:**
  - Removed route `/[locale]/card` and vCard binary streaming API (`/api/vcard`).
  - Removed route `/[locale]/qr` and `QRCodeGenerator` component suite.
  - Removed `src/features/qr` and `src/features/vcard` services and utilities.
  - Cleaned all navigation entry points: removed Digital Card and QR Code links from `HeroSection`, `FloatingContact`, `Footer`, and `sitemap.ts`.
  - Cleaned translation dictionaries: removed unused `"card"` and `"qr"` blocks from `en.json` and `km.json`.
- **Improved "Included Wi-Fi Equipment & Setup" Card (`src/app/[locale]/packages/page.tsx`):**
  - Upgraded from a plain border container into a 3-pillar hardware showcase card with top gradient accents, dual-band Wi-Fi badges, certified optical fiber drop details, and equipment warranty terms.
  - Added an interactive Telegram advisory callout bar for multi-story buildings, shophouses, and mesh Wi-Fi inquiries.
- **Improved "A Message From Your Consultant" Card (`src/components/home/AboutSection.tsx`):**
  - Upgraded into an executive personal guarantee card featuring a decorative quotation watermark, consultant title, 3 service pledge cards (Honest Plan Sizing, Zero Hidden Costs, Direct Telegram Support), and an official consultant authorization stamp.
  - Retained prominent 1-tap Telegram and Call CTA buttons.
- **Test Suite Optimization:**
  - Vitest: 18 unit tests passing with zero errors.
  - Playwright: 32 cross-device responsive E2E tests passing cleanly across 320px, 375px, 768px, and 1440px.

---

## [1.2.3] - 2026-10-31

### Package Comparison Table UI Alignment & Direct Telegram Ordering
- **Dual-Mode Comparison Experience (`PackageComparisonTable.tsx`):**
  - **Mobile (< 768px):** Transformed comparison view into mobile-optimized comparison card strips (`md:hidden`), eliminating horizontal pan/scroll friction while preserving clean scanability.
  - **Desktop (>= 768px):** Streamlined matrix into an elevated comparison table with highlighted popular plan accents, high-contrast speed/price badges, and zero text walls.
  - **Removed Text Clutter:** Stripped out long legal equipment paragraphs and device counts from table rows; kept concise router hardware highlights and free installation badges.
- **1-Tap Direct Telegram Conversion:**
  - Added primary 1-tap **"Order via Telegram"** button to both mobile card strips and desktop matrix rows, allowing immediate inquiry pre-formatting and Telegram handoff with zero form inputs.
  - Added secondary **"View Details"** button opening `PackageOrderDialog` for users who wish to review full hardware specifications or optional form notes.
- **Root 404 Route (`src/app/not-found.tsx`):**
  - Added root-level 404 handler with its own HTML/body shell to ensure Next.js 14 SSG builds complete cleanly for `/_not-found`.
- **E2E Test Suite Hardening:**
  - Updated Playwright test locators to support click handling over fixed mobile navigation elements across all 4 responsive viewports (320px, 375px, 768px, 1440px).

---

## [1.2.2] - 2026-10-31

### Package Card Streamlining & Direct 1-Tap Telegram Conversion
- **PackageCard (`PackageCard.tsx`):**
  - Streamlined card height and density by removing walls of text: stripped out the 6-item bulleted list, the grey legal disclaimer box, and the redundant persons/devices count from the card face.
  - Replaced clutter with only 3 essential trust highlights: Free Wi-Fi Router, Free Installation ($0 Setup), and Unlimited Fiber Data.
  - Added primary 1-click **"Order via Telegram"** (`variant="telegram"`) button: immediately copies the pre-composed inquiry and launches Telegram directly with zero form filling or data input required.
  - Added secondary **"View Details"** button: opens the dialog for users who want to review technical specifications, equipment terms, or ask questions.
- **PackageOrderDialog (`PackageOrderDialog.tsx`):**
  - Integrated the full 6-item technical feature checklist and hardware loan policy (relocated from the card into the dialog).
  - Added prominent top banner for instant 1-tap Telegram connection with zero form inputs.
  - Made customer details form fields completely optional so users are never blocked or required to enter data before connecting to Telegram.
- **Telegram Utilities (`telegram.utils.ts` & `telegram.types.ts`):**
  - Made `customerName`, `phoneNumber`, and `installationLocation` optional in `TelegramMessagePayload` so inquiries format politely with or without customer details.

---

## [1.2.1] - 2026-10-31

### Order Modal Layout & Scroll UX Polish
- **PackageOrderDialog (`PackageOrderDialog.tsx`):**
  - Resolved dialog bottom truncation on short/medium viewports by converting dialog container into a structured `flex flex-col max-h-[92vh] overflow-hidden` with `flex-1 overflow-y-auto overscroll-contain` for the form body.
  - Streamlined modal header height with compact spec bar, avoiding redundant multi-row repeats of package names and prices.
  - Optimized form layout by grouping **Customer Name** and **Phone Number** in a responsive 2-column grid (`grid grid-cols-1 sm:grid-cols-2 gap-3`), significantly reducing form height.
  - Guaranteed that the primary CTA ("Continue to Telegram") and Telegram direct bypass link are always immediately accessible and never cut off.

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

