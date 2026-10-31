# NetSeller Project Context & Technical Knowledge Base

**Document:** `PROJECT_CONTEXT.md`  
**Last Updated:** October 31, 2026  
**Status:** Production Ready  

---

## 1. Project Overview & Business Model

**NetSeller** is a specialized, mobile-first web application designed for a personal Internet Sales Consultant in Cambodia. The platform showcases high-speed home fiber, residential Wi-Fi, and business Internet packages, allowing Cambodian customers to quickly compare plans and initiate subscriptions directly through Telegram.

### Core Business Objectives:
1. **Physical-to-Digital Bridge:** Convert physical business card contacts into website visitors via a printed ISO/IEC 18004 high-correction QR code.
2. **Instant Consultant Trust:** Display verified consultant credentials, response SLA (<15 mins), service coverage, and direct hotline contact immediately upon landing.
3. **Transparent Comparison:** Enable customers to compare monthly rates, setup fees, Wi-Fi 6 hardware inclusion, and contract terms.
4. **Frictionless Lead Conversion:** Customers enter their name, phone, and address into a 2-step modal, which automatically formats a pre-composed inquiry message and opens a direct chat with the consultant on Telegram.

---

## 2. Technology Stack & Dependencies

All dependencies are verified from [`package.json`](./package.json):

### Core Framework & Runtime
- **Next.js:** `14.2.18` (App Router, Server Components by default, SSG static generation)
- **React:** `18.3.1` / **React DOM:** `18.3.1`
- **TypeScript:** `5.6.3` (Strict mode enabled in `tsconfig.json`)
- **Package Manager:** `pnpm`

### Styling & Design System
- **Tailwind CSS:** `3.4.15` with HSL CSS variables design tokens (`src/app/globals.css`)
- **PostCSS:** `8.4.49` / **Autoprefixer:** `10.4.20`
- **Animation:** `tailwindcss-animate` (`1.0.7`)
- **Utility Libraries:** `clsx` (`2.1.1`), `tailwind-merge` (`2.5.4`)

### UI Primitives & Icons
- **Radix UI Primitives:**
  - `@radix-ui/react-dialog` (`1.1.2`)
  - `@radix-ui/react-label` (`2.1.0`)
  - `@radix-ui/react-select` (`2.1.2`)
  - `@radix-ui/react-slot` (`1.1.0`)
  - `@radix-ui/react-toast` (`1.2.2`)
  - `@radix-ui/react-dropdown-menu` (`2.1.2`)
- **Icons:** `lucide-react` (`0.460.0`)

### Form Handling & Validation
- **React Hook Form:** `7.53.2`
- **Zod:** `3.23.8`
- **Resolvers:** `@hookform/resolvers` (`3.9.1`)

### Internationalization & QR Integration
- **`next-intl`:** `3.25.3` (Sub-path routing: `/en`, `/km`, prefix always)
- **`qrcode`:** `1.5.4` (Client/server PNG and SVG generation with Level H error correction)

### Testing Frameworks
- **Vitest:** `2.1.5` (JSDOM environment, 22 unit tests)
- **Playwright:** `1.49.0` (Cross-browser E2E suite, 44 assertions across 5 viewports)

---

## 3. Application Routes & Page Inventory

| Route Path | Type | File Location | Purpose & Capabilities |
|:---|:---:|:---|:---|
| `/` | Redirect | `src/app/page.tsx` | Middleware redirects to default locale (`/en` or `/km`) |
| `/[locale]` | SSG | `src/app/[locale]/page.tsx` | Main Homepage: Hero fold, packages, promos, trust pillars, areas, contact |
| `/[locale]/packages` | SSG | `src/app/[locale]/packages/page.tsx` | Full Catalog & Comparison: Filter pills, cards grid, detailed comparison table |
| `/[locale]/card` | SSG | `src/app/[locale]/card/page.tsx` | Digital Business Card: Optimized for QR card scans, vCard download, instant Telegram |
| `/[locale]/contact` | SSG | `src/app/[locale]/contact/page.tsx` | Direct Contact: Consultant hotlines, Telegram chat, contact inquiry form, working hours |
| `/[locale]/qr` | SSG | `src/app/[locale]/qr/page.tsx` | QR Generator Suite: Level H vector SVG & 1024px PNG print generator for business cards |
| `/[locale]/not-found` | Client | `src/app/[locale]/not-found.tsx` | Custom 404 page with bilingual recovery CTAs and home redirect |
| `/[locale]/error` | Client | `src/app/[locale]/error.tsx` | Error boundary with retry action and Telegram escalation |
| `/[locale]/loading` | Server | `src/app/[locale]/loading.tsx` | Pulse loading skeleton for SSG page transitions |
| `/api/inquiries` | API | `src/app/api/inquiries/route.ts` | Server-side inquiry validation and optional Telegram Bot webhook notifier |
| `/api/vcard` | API | `src/app/api/vcard/route.ts` | Direct `.vcf` contact file download endpoint |
| `/robots.txt` | Static | `src/app/robots.ts` | Search engine crawler rules |
| `/sitemap.xml` | Static | `src/app/sitemap.ts` | Multilingual XML sitemap generator |

---

## 4. Key Component Architecture

### Layout & Navigation
- **`Header.tsx`** (`src/components/layout/Header.tsx`): Sticky desktop/tablet navbar with logo, route navigation links, and `LanguageSwitcher`.
- **`MobileNavigation.tsx`** (`src/components/layout/MobileNavigation.tsx`): Fixed bottom docking navigation bar for viewports $<768\text{px}$, providing thumb-friendly navigation.
- **`FloatingContact.tsx`** (`src/components/layout/FloatingContact.tsx`): Speed-dial floating action button positioned dynamically above the mobile dock.
- **`Footer.tsx`** (`src/components/layout/Footer.tsx`): Global sitemap, regulatory disclaimers, contact details, and copyright.

### Package & Sales Flow
- **`PackageCard.tsx`** (`src/components/packages/PackageCard.tsx`): Renders individual Internet plans with price, speed, included Wi-Fi router, features, and availability badges (`available`, `limited`, `coming_soon`).
- **`PackageGrid.tsx`** (`src/components/packages/PackageGrid.tsx`): Responsive 1-to-3 column grid featuring category tabs and empty state recovery when 0 items match.
- **`PackageComparisonTable.tsx`** (`src/components/packages/PackageComparisonTable.tsx`): Horizontal scrolling comparison matrix with sticky left headers.
- **`PackageOrderDialog.tsx`** (`src/components/packages/PackageOrderDialog.tsx`): Two-stage conversion modal. Stage 1 validates customer name, phone, address, and notes. Stage 2 provides one-click Telegram chat launch and clipboard fallback.

### Marketing & Social Proof
- **`HeroSection.tsx`** (`src/components/home/HeroSection.tsx`): Consultant verification badge, QR arrival greeting banner, and primary CTAs.
- **`PromotionSection.tsx`** (`src/components/home/PromotionSection.tsx`): Time-limited campaign cards with promo codes and expired status handling.
- **`ServiceAreasSection.tsx`** (`src/components/home/ServiceAreasSection.tsx`): Phnom Penh and provincial coverage breakdown with installation SLAs.

---

## 5. Data Entities & Configuration

### Data Files (`src/data/`)
- **`packages.ts`**: Array of 5 core Internet packages:
  1. `fiber-starter-50` (50 Mbps - $15/mo - Home Starter)
  2. `fiber-plus-100` (100 Mbps - $22/mo - Family & Streaming)
  3. `fiber-pro-200` (200 Mbps - $30/mo - Smart Home & Gaming)
  4. `fiber-ultra-350` (350 Mbps - $45/mo - SME & Office)
  5. `fiber-biz-500` (500 Mbps - $70/mo - Enterprise & Commercial)
- **`promotions.ts`**: Active promotional campaigns with bilingual titles, descriptions, promo codes, and expiration tracking (`isExpired`).
- **`testimonials.ts`**: Authentic Cambodian customer reviews across Phnom Penh, Kandal, Siem Reap, and Sihanoukville.

### Centralized Configuration (`src/config/`)
- **`seller.ts`** (`sellerConfig`): Consultant name, Telegram username (`NetSellerKH`), hotline numbers, response time SLA, service coverage areas, and optional avatar URL.
- **`site.ts`** (`siteConfig`): Public metadata, base URLs, SEO keywords, social preview cards.
- **`navigation.ts`**: Main navbar and footer links.

---

## 6. Environment Variables (Reference by Name Only)

NetSeller is designed to operate client-side without mandatory backend credentials. Optional server-side notification variables include:

```env
# Optional: Server-side Telegram Bot Notification (used only in /api/inquiries)
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID

# Public Website URL for Metadata & QR Code generation
NEXT_PUBLIC_APP_URL
```

> **Security Rule:** Never commit `.env.local` or raw bot tokens to version control. The client-side direct sales flow relies exclusively on `sellerConfig.telegramUsername` and deep links.

---

## 7. Testing Suite Architecture

- **Unit Tests (`tests/unit/`):**
  - `analytics.test.ts`: Privacy-preserving zero-cookie analytics.
  - `data-states.test.ts`: Empty package filters, expired promotions, missing optional fields, long text inputs.
  - `packages.test.ts`: Data schema validation and token exposure prevention.
  - `qr.test.ts`: ISO/IEC 18004 QR generation, SVG/PNG payload verification.
  - `telegram.test.ts`: Telegram link construction, message formatting, and deep link fallbacks.
  - `validations.test.ts`: Zod phone number, name, and address validation across locales.
  - `vcard.test.ts`: vCard 3.0 specification compliance.
- **End-to-End Tests (`tests/e2e/`):**
  - `qr-card.spec.ts`: QR code downloads, digital card rendering, vCard trigger.
  - `responsive-and-order.spec.ts`: Zero horizontal overflow across 320px, 375px, 414px, 768px, 1440px viewports, package order dialog submission, language switching.

