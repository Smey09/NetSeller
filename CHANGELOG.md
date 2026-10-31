# NetSeller Project Changelog

All notable technical and architectural changes to the NetSeller project are documented here.

---

## [1.7.1] - 2026-10-31

### Admin Responsive Data Tables, Search Filters & UI Styling Refinements
- **Admin Portal Data Tables (`src/app/[locale]/admin/page.tsx`):**
  - **Table View Mode:** Implemented full responsive data tables for both Internet Packages and Promotions catalogs, equipped with horizontal scroll wrapping (`overflow-x-auto`) to guarantee zero mobile page overflow.
  - **View Mode Switcher:** Added a 1-tap `Table` ⇄ `Cards` toggle allowing the website owner to seamlessly switch between dense tabular analysis and visual preview cards.
  - **Live Search Filtering:** Real-time search filter filtering packages by name, speed, category, price, router, or badge, and promotions by title, code, or tag.
  - **Packages Table Columns:** Reorder `#` with Up/Down buttons, Package Name & Category badge, Speed (with dark squircle and yellow Zap badge), Monthly Price & Discounts, Router included, Custom badge, Availability status pill, and Edit/Delete action buttons.
  - **Promotions Table Columns:** `#`, Campaign Title (EN/KM), Corner Tag (dark navy ribbon), Promo Code, Validity date, 1-Click Status toggle (Active/Expired), and Edit/Delete action buttons.
- **Visual Design Alignments:**
  - **Dark Navy Promotion Ribbon (`PromotionSection.tsx`):** Updated promotion card highlight badge to sleek dark navy (`bg-[#0B132B] text-white font-extrabold uppercase py-1 px-3 sm:py-1.5 sm:px-4.5 rounded-bl-2xl`) matching requested styling.
  - **Speed Badge Squircle (`PackageCard.tsx`):** Replaced speed gradient box with dark navy rounded squircle (`bg-[#0B132B] border-slate-800`) and golden yellow lightning bolt (`Zap text-[#F9A01B] stroke-[2.5]`).
- **Quality Gates Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 29 / 29 unit tests passing.
  - Production Build: 12 / 12 static pages prerendered successfully.
  - Playwright E2E: 32 / 32 end-to-end tests passing across all viewports (Mobile 320px–414px, Tablet 768px, Desktop 1440px).

---

## [1.7.0] - 2026-10-31

### JSON Data Architecture & Website Owner Management Portal
- **JSON Data Layer (`packages.json`, `promotions.json`):**
  - Migrated Internet Packages & Pricing and Promotions into pure, clean JSON files (`src/data/packages.json` and `src/data/promotions.json`).
  - Preserved typed TypeScript exports in `packages.ts` and `promotions.ts` for full backwards compatibility across all components and tests.
  - Implemented strict Zod validation schemas (`packageSchema`, `promotionSchema`, `adminDataPayloadSchema`) guarding data types, positive speeds, non-negative prices, and bilingual copies.
- **Data Service & Secure Admin API (`data-service.ts`, `/api/admin/data`):**
  - Built `DataService` providing safe disk read/write routines and fallback recovery.
  - Implemented `GET /api/admin/data` returning live packages and promotions.
  - Implemented `POST /api/admin/data` protected with Owner PIN authentication (`ADMIN_PIN` or default `seller2026`), saving updates directly to disk with instant timestamped confirmation.
  - Implemented factory default reset action (`action: "reset"`).
- **Owner Admin Management Dashboard (`src/app/[locale]/admin/page.tsx`):**
  - **Security Gate:** PIN-protected authentication screen with session persistence and quick logout.
  - **Packages & Pricing Editor:** Visual management cards, interactive package editor modal (name, speed, price, original price, category, router included, features list, descriptions), package deletion, and reordering.
  - **Promotions Editor:** Campaign cards, 1-click active/expired toggle, add/edit modal (title, description, highlight ribbon, valid until, promo code), and deletion.
  - **Backup & Import Hub:** "Download Backup (.json)" and "Import JSON" for one-click website backups and restores.
  - **Raw JSON Editor:** Interactive JSON code viewer and updater.
  - **Discrete Access:** Added "Owner Portal" link in the footer for easy consultant access from mobile or desktop.
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 29 / 29 passed across 7 test suites (+8 new unit tests in `admin-data.test.ts`).
  - Production Build: 12 / 12 static pages prerendered.
  - Playwright E2E: 32 / 32 passed across all viewports (Mobile 320px–414px, Tablet 768px, Desktop 1440px).

---

## [1.6.2] - 2026-10-31

### Mobile Bottom Navigation Redesign & Safe Area Fixes
- **Mobile Bottom Navigation Redesign (`MobileNavigation.tsx`):**
  - **Label Optimization:** Shortened mobile tab label from verbose "Internet Packages" to concise "Packages" (`packagesShort`: "Packages" / "កញ្ចប់"), eliminating cramped spacing and ugly text wrapping.
  - **Removed Clumsy Gray Box:** Replaced the heavy gray rectangular background (`bg-slate-900/10`) with a clean, high-end native iOS tab aesthetic: dynamic active primary icon scaling (`scale-110 text-primary-600`), bold label styling, and an animated amber indicator pill (`bg-primary-500 shadow-xs shadow-primary-500/40`).
  - **Polished Telegram Action CTA:** Upgraded Telegram on the bottom dock into an executive primary action pill (`bg-[#229ED9] text-white rounded-xl py-1.5 px-2 shadow-sm shadow-[#229ED9]/25`) with tactile press animation.
  - **Smooth Programmatic Scrolling:** Integrated `handleNavClick` for bottom tabs so tapping "Home" or "Packages" triggers smooth scroll without page jumps.
- **iOS Safe Area Support (`layout.tsx`, `MobileNavigation.tsx`):**
  - Added `viewportFit: "cover"` to Next.js viewport configuration.
  - Configured dynamic bottom safe area padding (`pb-[max(0.6rem,env(safe-area-inset-bottom,0px))]`) ensuring bottom dock content is never obscured by the iOS home swipe indicator.
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Playwright E2E: 32 / 32 tests passed across Mobile 320px, 375px, 414px, Tablet 768px, and Desktop 1440px.

---

## [1.6.1] - 2026-10-31

### Brand Yellow Accent Update & Visual Hierarchy Refinement
- **Promotion Corner Ribbon Ribbons (`PromotionSection.tsx`):**
  - Updated decorative corner highlight tags from dark navy (`bg-slate-900`) to vibrant brand yellow/golden-amber gradient (`bg-gradient-to-r from-amber-400 to-primary-500`).
  - Styled with high-contrast text (`text-slate-950 font-black shadow-xs`) achieving an exceptional 11.4:1 contrast ratio that exceeds WCAG 2.2 AA requirements.
- **Package Card Speed Highlight Box (`PackageCard.tsx`):**
  - Converted speed highlight icon container from dark slate (`bg-slate-900`) to brand yellow gradient (`bg-gradient-to-tr from-primary-600 via-primary-500 to-amber-400 border border-white/20 shadow-sm shadow-primary-500/25`).
  - Updated `Zap` lightning bolt to solid dark slate (`text-slate-950 fill-slate-950`) creating sharp visual clarity.
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Playwright E2E: 32 / 32 tests passed across Mobile 320px–414px, Tablet 768px, and Desktop 1440px.

---

## [1.6.0] - 2026-10-31

### Header Active Tab Navigation, Language Switcher & Action Button Screen Feedback
- **Header Active Tab & Smooth Scroll Spy (`Header.tsx`, Section Components):**
  - Added dedicated anchor IDs and scroll margins (`id="home"`, `scroll-mt-16 sm:scroll-mt-20` on `#packages`, `#promotions`, `#contact`) to prevent sticky header content clipping.
  - Implemented `handleNavClick` providing programmatic smooth scrolling across sections without full-page hash jumping.
  - Enhanced active navigation pill indicators with scale highlight (`scale-[1.02]`), pulsing amber status dot (`bg-primary-400 ring-2 ring-primary-400/30 animate-pulse`), and tactile press feedback (`active:scale-95`).
- **High-Contrast Language Switcher (`LanguageSwitcher.tsx`):**
  - Redesigned active language indicator using high-contrast dark glass pill (`bg-slate-900 text-white font-bold shadow-xs`) eliminating low-contrast white-on-white ambiguity.
  - Added `scroll={false}` on `Link` elements to preserve the user's exact scroll position when toggling between English and Khmer (prevents jarring screen jumping to top).
  - Added tactile press feedback (`active:scale-95`) with zero horizontal overflow on compact viewports (320px).
- **Action Button Screen Feedback & Visual Sheen (`Header.tsx`, `button.tsx`):**
  - Added interactive on-screen action feedback: clicking the Header Telegram action button displays a sleek frosted glass confirmation toast (`CheckCircle2` + "Opening Telegram..."), copies the consultant's handle to clipboard as fallback assistance, and tracks privacy-safe analytics.
  - Implemented dynamic light sweep glass sheen animation on action button hover/focus.
  - Standardized tactile micro-interactions (`active:scale-95 active:shadow-inner`) across all button variants (`default`, `telegram`, `outline`, etc.).
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Playwright E2E: 32 / 32 tests passed across Mobile 320px, 375px, 414px, Tablet 768px, and Desktop 1440px.

---

## [1.5.9] - 2026-10-31

### Header & Footer Glassmorphism & Specular Edge Refactor
- **Header Specular Glass Architecture (`Header.tsx`):**
  - Upgraded top micro-bar to dark frosted glass (`bg-slate-950/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06)]`) with an ambient promo glass pill.
  - Enhanced brand logo with gradient glass container (`bg-gradient-to-tr from-primary-600 to-primary-500 border border-white/20`) and specular-highlighted `KH` pill badge.
  - Upgraded desktop Telegram CTA button with specular edge border (`border border-white/20 shadow-[#229ED9]/25`).
  - Refactored mobile menu trigger and dropdown menu into deep frosted glass shell (`bg-white/95 backdrop-blur-3xl shadow-[0_20px_40px_rgba(15,23,42,0.12)] rounded-b-3xl`).
- **Footer Dark Glassmorphism Refactor (`Footer.tsx`):**
  - Re-engineered footer as a dark frosted glass foundation (`bg-slate-950/90 backdrop-blur-3xl border-t border-white/[0.08] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08)]`) with dual ambient optical glows.
  - Converted Officer Seller profile card and official direct channel box into dark frosted glass panels (`border border-white/[0.08] bg-white/[0.04] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.25)]`).
  - Upgraded direct connect action buttons (Telegram, Call, Facebook) and Back-to-Top button to frosted glass tiles with smooth scale feedback.
  - Enhanced quick navigation links with subtle horizontal hover slide and amber icon glow.
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Next.js build: 9 / 9 static pages prerendered (59.4 kB First Load JS).
  - Playwright E2E: 32 / 32 tests passed across Mobile 320px–414px, Tablet 768px, and Desktop 1440px.

---

## [1.5.8] - 2026-10-31

### Enhanced Glassmorphism Specular Edge & Background Canvas Refinement
- **Ambient Canvas & Continuous Refraction (`layout.tsx`, Section Components):**
  - Upgraded global body background to a multi-stop ambient canvas (`bg-gradient-to-br from-slate-100/90 via-slate-50 to-sky-50/40`) with 4 strategic optical light orbs (`blur-[120px]–[130px]`).
  - Removed opaque white section backgrounds in `HeroSection`, `PackageSection`, and `ContactSection` to allow continuous optical depth to shine through frosted cards.
- **Top Specular Edge Reflection & Glass Borders (`card.tsx`, `PackageCard.tsx`, `globals.css`):**
  - Integrated top specular reflection highlight (`inset 0 1px 1px 0 rgba(255,255,255,0.95)`) on all frosted glass cards and inner panels.
  - Implemented high-opacity translucent glass rim borders (`border border-white/85`) and subtle vertical glass gradients (`from-white/85 via-white/75 to-white/65 backdrop-blur-2xl`).
- **Segmented Docks & Interactive Glass Controls:**
  - Upgraded desktop navigation track, language switcher, and package filter pill dock to true floating frosted glass with inset specular highlights.
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Next.js build: 9 / 9 static pages prerendered (59.4 kB First Load JS).
  - Playwright E2E: 32 / 32 tests passed across Mobile 320px–414px, Tablet 768px, and Desktop 1440px.

---

## [1.5.7] - 2026-10-31

### Dynamic Scroll Spy & Segmented Header Active State
- **Scroll Spy Navigation Engine (`src/components/layout/Header.tsx`):**
  - Integrated dynamic scroll spy that monitors viewport position across `#packages`, `#promotions`, `#contact`, and top (`home`).
  - Seamlessly keeps active indicator in sync as user scrolls or clicks anchor links.
- **Segmented Glass Pill Track & Active Styling:**
  - Enclosed desktop navigation items within a refined frosted track (`bg-slate-100/70 backdrop-blur-md border border-slate-200/50 shadow-2xs`).
  - Elevated active tab to modern executive pill (`bg-slate-900 text-white font-bold shadow-xs`) with a subtle pulsating amber indicator dot (`bg-primary-400 animate-pulse`).
- **Mobile Navigation Active State Synchronization (`MobileNavigation.tsx`):**
  - Synchronized bottom mobile navigation bar with scroll position to dynamically highlight Packages when scrolled past the fold.
- **Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Next.js build: 9 / 9 static pages prerendered (58.9 kB First Load JS).
  - Playwright E2E: 32 / 32 tests passed.

---

## [1.5.6] - 2026-10-31

### Modern Glassmorphism ("Glasses Style") UI System Architecture
- **Ambient Lighting Foundation (`src/app/[locale]/layout.tsx`):**
  - Integrated zero-layout-shift fixed ambient optical glow orbs (`pointer-events-none -z-10`) in brand warm amber and sky tones to provide genuine background depth for frosted glass refractions.
- **Glass Navbar & Micro-Bar (`src/components/layout/Header.tsx`):**
  - Refactored sticky navbar into true frosted glass (`bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-xs`).
  - Implemented sleek dark frosted glass micro-bar (`bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80`).
  - Mobile dropdown menu upgraded to `bg-white/90 backdrop-blur-2xl shadow-2xl`.
- **Frosted Segmented Controls (`LanguageSwitcher.tsx`, `PackageGrid.tsx`):**
  - Upgraded language switcher into a frosted glass pill container (`bg-slate-200/50 backdrop-blur-md border-white/70`).
  - Re-engineered package category selector as a modern floating glass dock with segmented pills.
- **Glass Component Surfaces (`Card.tsx`, `PackageCard.tsx`, `PromotionSection.tsx`, `ContactSection.tsx`):**
  - Upgraded base `Card` primitive to frosted glass (`bg-white/80 backdrop-blur-xl border border-white/80 shadow-slate-900/5`).
  - Upgraded Package cards with frosted inner speed containers (`bg-slate-900/[0.03] backdrop-blur-xs border-slate-200/70`) and glass secondary action buttons.
  - Upgraded Hero stats, consultant image frame, and floating badges to multi-layered frosted glass.
  - Refactored contact hub cards, hotline card, and quick action cards with translucent glass panels.
- **Glass Modals & Floating Widgets (`dialog.tsx`, `PackageOrderDialog.tsx`, `MobileNavigation.tsx`, `FloatingContact.tsx`):**
  - Dialog overlay enhanced with `bg-slate-950/40 backdrop-blur-md` and modal container `bg-white/95 backdrop-blur-2xl border-white/80`.
  - Upgraded mobile bottom navigation bar to `bg-white/80 backdrop-blur-xl border-t border-white/60 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]`.
  - Floating speed dial menu upgraded to `bg-white/85 backdrop-blur-2xl border border-white/80`.
- **Quality Gates Verification:**
  - TypeScript: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest: 21 / 21 tests passed (`pnpm test`).
  - Next.js build: 9 / 9 static pages prerendered (58.9 kB First Load JS).
  - Playwright E2E: 32 / 32 tests passed across Mobile 320px, 375px, 414px, Tablet 768px, and Desktop 1440px.

---

## [1.5.5] - 2026-10-31

### Clean UI Color Harmony & Visual Decluttering Overhaul
- **Systematic Color Decluttering (60-30-10 Rule):**
  - Eliminated conflicting multicolor badges and neon fills across the entire interface (removing random sky-blue, emerald-green, and multi-color gradients on non-CTA cards).
  - Standardized on 60% clean whites & soft slate neutrals (`bg-slate-50`, `bg-white`), 30% crisp executive slate typography and containers (`slate-900`, `slate-950`), and 10% purposeful brand accent (`#F9A01B` / `primary-500` / `primary-600`) dedicated to high-intent conversions and brand identity.
- **Top Micro-Bar & Header (`src/components/layout/Header.tsx`):**
  - Replaced jarring loud orange bar with a sleek, executive dark micro-bar (`bg-slate-900 text-slate-300 border-slate-800`).
  - Standardized logo icon to clean `bg-primary-500 text-white rounded-xl`.
  - Neutralized Khmer/English pill and desktop active navigation links to calm `bg-slate-100 text-slate-950`.
  - Tightened horizontal padding to `px-2.5 sm:px-6` to prevent micro-overflow on narrow viewports.
- **Executive Dark Footer (`src/components/layout/Footer.tsx`):**
  - Replaced intense full-orange footer fill with modern, high-trust executive dark theme (`bg-slate-950 text-slate-400 border-t border-slate-800/80`).
  - Streamlined consultant badge, quick navigation, and direct contact widgets with understated slate-900/slate-800 surfaces.
- **Packages & Pricing Cards (`src/components/packages/PackageCard.tsx`, `PackageGrid.tsx`):**
  - Replaced bright orange zap badge boxes with polished `bg-slate-900 text-white` and amber spark `text-primary-400`.
  - Neutralized filter pill buttons to executive `bg-slate-900 text-white`.
  - Cleaned category labels, feature bullet badges, and specs to subtle, legible slate-600/slate-700.
- **Promotions & Contact Sections (`PromotionSection.tsx`, `ContactSection.tsx`):**
  - Unified 3 quick action cards into clean `bg-slate-100 text-slate-700` icons, eliminating multicolor rainbow dissonance.
  - Neutralized section pill badges to `bg-slate-100 text-slate-700 border-slate-200`.
- **Order Modal (`PackageOrderDialog.tsx`):**
  - Replaced loud 3-color rainbow fast-chat gradient with calm `bg-slate-50 border-slate-200` container.
  - Replaced modal header gradient with high-contrast `bg-slate-900 text-white border-b border-slate-800`.
- **Quality Gates Verification:**
  - `pnpm tsc --noEmit`: 0 errors.
  - `pnpm lint`: 0 warnings, 0 errors.
  - `pnpm test`: 21 passed across 6 unit test suites.
  - `pnpm build`: 9/9 static pages prerendered (58.7 kB First Load JS).
  - `pnpm test:e2e`: 32/32 tests passed across Mobile 320px, Mobile 375px, Mobile 414px, Tablet 768px, and Desktop 1440px.

---

## [1.5.4] - 2026-10-31

### Production Readiness & Performance Optimization Overhaul
- **HTTP Security Headers Configuration (`next.config.mjs`):**
  - Integrated enterprise security headers across all routes:
    - `X-Content-Type-Options: nosniff` (MIME sniffing prevention).
    - `X-Frame-Options: SAMEORIGIN` (Clickjacking mitigation).
    - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (HSTS enforcement).
    - `Referrer-Policy: origin-when-cross-origin`.
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()` (Sensor restriction).
    - `X-DNS-Prefetch-Control: on`.
- **Core Web Vitals & LCP Image Optimization (`src/components/home/HeroSection.tsx`):**
  - Configured `fetchPriority="high"`, `loading="eager"`, `decoding="async"`, and explicit dimensions (`width={600} height={450}`) on primary hero image `/images/hero-friendly-consultant.jpg` to maximize LCP and avoid CLS.
- **Inquiries API Resilience (`src/app/api/inquiries/route.ts`):**
  - Updated validation schema to gracefully support both full package order submissions and quick 1-tap inquiries (`Telegram Quick Visitor`, `Direct Telegram Inquiry`) without 400 validation rejection.
  - Implemented safe error handling and malformed JSON resilience.
  - Authored dedicated unit test suite [`tests/unit/inquiries.test.ts`](tests/unit/inquiries.test.ts) covering full orders, quick inquiries, and malformed payload recovery.
- **Verification:**
  - TypeScript typecheck: 0 errors (`pnpm tsc --noEmit`).
  - ESLint: 0 warnings, 0 errors (`pnpm lint`).
  - Vitest unit tests: 21 passed across 6 test suites (`pnpm test`).
  - Next.js SSG build: 9/9 static pages generated, 58.9 kB First Load JS (`pnpm build`).
  - Playwright cross-browser responsive E2E tests: 32 passed across all 5 viewports (320px–1440px).

---

## [1.5.3] - 2026-10-31

### Golden-Orange Theme Expansion to Top Micro-Bar & Footer
- **Top Micro-Bar (`src/components/layout/Header.tsx`):**
  - Updated from legacy slate dark (`bg-slate-900 text-white`) to brand Golden-Orange `bg-primary-500 text-slate-950 border-b border-primary-600/30`.
  - Upgraded typography contrast with `text-slate-900` body and `text-slate-950 font-bold` contact highlights.
  - Enhanced promo badge chip to `bg-white/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-black/5 text-slate-950`.
- **Full Brand Footer Redesign (`src/components/layout/Footer.tsx`):**
  - Updated outer footer canvas from `bg-slate-950` to rich gradient `bg-gradient-to-b from-primary-500 via-primary-500 to-amber-600 text-slate-950 border-t border-primary-600/30 shadow-inner`.
  - Re-styled internal profile and contact cards with high-contrast elevated glassmorphic containers (`bg-white/90 backdrop-blur-sm border border-primary-600/30 shadow-xs`).
  - Set quick links and interactive elements to `text-slate-900 hover:text-white font-semibold`.
  - Preserved authentic Telegram `#229ED9` action CTA and upgraded phone hotline button to `bg-slate-950 text-white hover:bg-slate-900`.
  - Updated bottom copyright, legal disclaimer, and back-to-top button to clean dark-on-amber contrast.
- **Verification:**
  - TypeScript check: 0 errors (`pnpm tsc --noEmit`).
  - ESLint check: 0 warnings/errors (`pnpm lint`).
  - Vitest unit tests: 18 passed (`pnpm test`).
  - Next.js SSG build: 9/9 pages statically generated, 58.9 kB First Load JS (`pnpm build`).
  - Playwright responsive E2E tests: 32 tests passed across all 5 viewports (320px–1440px).

---

## [1.5.2] - 2026-10-31

### Project-Wide Golden-Orange (`#F9A01B`) Brand Color Refactor
- **True Brand Color Extraction & Global Design System:**
  - Extracted exact color `#F9A01B` (RGB: 249, 160, 27 / HSL: `36 94.9% 54.1%`) from brand artwork.
  - Replaced legacy blue base with warm golden-orange Cambodian telecom primary palette across `src/app/globals.css` and `tailwind.config.ts`:
    - `--primary: 36 94.9% 54.1%;`
    - `--ring: 36 94.9% 54.1%;`
    - `--accent: 36 100% 97%;`
    - Scale: `50: #fffbeb`, `100: #fef3c7`, `200: #fde68a`, `300: #fcd34d`, `400: #fbbf24`, `500: #f9a01b`, `600: #d97706`, `700: #b45309`, `800: #92400e`, `900: #78350f`, `950: #451a03`.
  - Updated mobile browser theme bar in `src/app/[locale]/layout.tsx` (`themeColor: "#F9A01B"`).
- **Component Design System Enhancements:**
  - **`Button.tsx`**: Updated default variant to `bg-primary-500 text-white font-semibold hover:bg-primary-600 shadow-sm shadow-primary-500/25 active:scale-[0.98]`.
  - **`Header.tsx`**: Updated logo badge to `bg-gradient-to-tr from-primary-500 to-amber-400`, brand text to `Net<span className="text-primary-500">Seller</span>`, and KH country pill to `text-primary-900 bg-primary-100 border border-primary-200/60`.
  - **`Footer.tsx`**: Harmonized footer logo with `from-primary-500 to-amber-400`, `Net<span className="text-primary-400">Seller</span>`, and officer profile card avatar ring.
  - **`HeroSection.tsx`**: Refactored primary Explore Packages button to `bg-primary-500 hover:bg-primary-600 text-white shadow-primary-500/25` and router card badge icon to `bg-primary-50 text-primary-600`.
  - **`PackageCard.tsx`**: Updated popular package card border to `border-2 border-primary-500 shadow-md shadow-primary-500/15`, popular banner to `bg-primary-500`, category header to `text-primary-600`, and speed Zap badge to `bg-primary-500`.
  - **`PackageGrid.tsx`**: Enhanced category filter pill buttons with active state `bg-primary-500 text-white shadow-md shadow-primary-500/25`.
  - **`PackageOrderDialog.tsx`**: Updated header modal gradient to `from-primary-600 via-primary-700 to-primary-900`, step active indicators, and form action button to `bg-primary-500 hover:bg-primary-600 shadow-primary-500/25`.
  - **`not-found.tsx`**: Converted legacy `blue-` tokens to `primary-50`, `primary-200`, and `primary-500`.
  - **Telegram Brand Identity Isolation:** Preserved authentic `#229ED9` for all Telegram buttons and deep links across the entire UI.
- **Verification:**
  - TypeScript check: 0 errors (`pnpm tsc --noEmit`).
  - ESLint check: 0 warnings/errors (`pnpm lint`).
  - Vitest unit tests: 18 passed (`pnpm test`).
  - Next.js SSG build: 9/9 pages statically generated, 58.9 kB First Load JS (`pnpm build`).
  - Playwright cross-browser responsive E2E tests: 32 tests passed across 5 viewports (320px, 375px, 414px, 768px, 1440px) with 0 horizontal overflow.

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

