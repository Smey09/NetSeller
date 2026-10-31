# NetSeller – Personal Internet Sales Platform (Cambodia) 🇰🇭

> Fast, reliable personal Internet and Fiber optic package sales website for Cambodia, prioritizing mobile users and seamless direct-to-seller Telegram ordering.

---

## 🚀 Key Features

1. **Direct Telegram Ordering Journey**:
   - `DISCOVER` → `COMPARE` → `SELECT` → `BUY NOW` → `ENTER DETAILS` → `CONTINUE TO TELEGRAM` → `PRESS SEND` → `SELLER RECEIVES INQUIRY`.
   - Automatic pre-fill of package speed, monthly price, and customer installation address.
   - Built-in clipboard helper with 1-click copy feedback.
   - Never exposes secret bot tokens to the client.
2. **Bilingual Support (English & Khmer)**:
   - Powered by `next-intl` App Router routing (`/en` and `/km`).
   - Retains current page and state across language switching.
   - Tailored Khmer typography with `Noto Sans Khmer`.
3. **Responsive Across All Viewports**:
   - Mobile: 320px, 360px, 375px, 390px, 414px, 430px.
   - Tablet: 600px, 768px, 820px, 1024px.
   - Laptop & Desktop: 1280px, 1440px, 1920px, 2560px.
   - Fixed mobile quick-action bar for Telegram and hotline access.
4. **Internet Package Showcase & Comparison**:
   - Dynamic cards & side-by-side comparison table.
   - Filter by Home, Residential, and Business/Office packages.
   - Clear details on Dual-Band/Wi-Fi 6 routers and $0 free installation.
6. **QR Code Business Card Integration**:
   - Built to work seamlessly with physical business cards printed with QR codes.
   - Mobile-first landing experience with seller verification, instant Telegram link, hotline, and zero login barriers.
   - Dedicated Digital Business Card at `/card` with one-tap vCard (.vcf) contact saving to iOS/Android.
   - Built-in print-ready vector SVG & 300 DPI PNG generator at `/qr` conforming to ISO/IEC 18004 quiet zones.
   - Floating quick contact widget with Telegram pulse badge on all viewports.
   - Privacy-conscious campaign tracking (`?source=business_card`).
7. **Centralized Configuration**:
   - Change seller username, phone numbers, and service areas in one file (`src/config/seller.ts`).
8. **SEO & High Performance**:
   - Next.js Metadata API, dynamic alternates, JSON-LD Structured Data, Open Graph, Sitemap, and Robots.txt.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components by default)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS, CSS variables, `tailwindcss-animate`
- **UI Components**: Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-slot`, `@radix-ui/react-label`), Lucide React icons
- **Form Handling**: React Hook Form, Zod validation
- **Internationalization**: `next-intl`
- **Testing**: Vitest, React Testing Library, Playwright E2E

---

## 📁 Project Structure

```text
NetSeller/
├── public/
│   ├── icons/
│   ├── logo/
│   │   └── logo.svg
│   └── images/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         # Locale root layout with fonts & JSON-LD
│   │   │   ├── page.tsx           # Main homepage
│   │   │   ├── packages/          # Dedicated packages & comparison page
│   │   │   │   └── page.tsx
│   │   │   └── contact/           # Dedicated contact & seller info page
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── inquiries/
│   │   │       └── route.ts       # Server-side validation & optional Telegram dispatch
│   │   ├── globals.css            # Telecommunications design tokens
│   │   ├── layout.tsx             # Root passthrough layout
│   │   ├── robots.ts              # SEO Robots.txt
│   │   └── sitemap.ts             # Multilingual Sitemap
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── MobileNavigation.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PackageSection.tsx
│   │   │   ├── PromotionSection.tsx
│   │   │   ├── WhyChooseMe.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServiceAreasSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── packages/
│   │   │   ├── PackageCard.tsx
│   │   │   ├── PackageGrid.tsx
│   │   │   ├── PackageOrderDialog.tsx
│   │   │   └── PackageComparisonTable.tsx
│   │   └── ui/                    # Reusable button, card, dialog, input, badge
│   │
│   ├── config/
│   │   ├── seller.ts              # Centralized seller credentials & service areas
│   │   ├── site.ts                # Site metadata & URLs
│   │   └── navigation.ts          # Nav routes
│   │
│   ├── data/
│   │   ├── packages.ts            # Typed internet package definitions
│   │   ├── promotions.ts          # Ongoing promotional campaigns
│   │   └── testimonials.ts        # Client feedback & demonstration reviews
│   │
│   ├── features/
│   │   └── telegram/
│   │       ├── telegram.service.ts # Open in Telegram & clipboard logic
│   │       ├── telegram.utils.ts   # Safe message & URL formatting
│   │       └── telegram.types.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validations/
│   │       └── order.schema.ts    # Zod schemas for orders & inquiries
│   └── types/
│       └── index.ts
│
├── messages/
│   ├── en.json                    # English translations
│   └── km.json                    # Khmer translations
├── tests/
│   ├── unit/                      # Vitest unit test suite
│   └── e2e/                       # Playwright responsive & workflow tests
├── middleware.ts                  # next-intl routing middleware
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Configuration

To update the seller details or change the Telegram recipient, edit `src/config/seller.ts`:

```typescript
export const sellerConfig = {
  name: "Your Name",
  telegramUsername: "YourTelegramHandle", // without @
  phone: "+85512345678",
  phoneDisplay: "012 345 678",
  serviceAreas: [ ... ],
};
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Local Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website. It will automatically redirect to `/en` or `/km`.

### 3. Run Unit Tests
```bash
pnpm test
```

### 4. Run Production Build
```bash
pnpm build
```

---

## 🧪 Testing Checklist
- [x] Responsive layout at 320px, 375px, 768px, 1024px, 1440px without horizontal scroll.
- [x] English / Khmer locale preservation on language switch.
- [x] Package selection pre-fills into the accessible order dialog.
- [x] Live validation for name, phone number, and installation address.
- [x] Formatted Telegram inquiry message matching the project specification.
- [x] No bot secrets exposed to client bundles.
- [x] Production build passes cleanly with static metadata and sitemaps.

