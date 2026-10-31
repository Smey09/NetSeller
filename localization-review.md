# NetSeller Localization & Bilingual UX/UI Review (Khmer & English)

**Review Date:** October 2026  
**Auditor:** Senior UX/UI Designer, Khmer Localization Specialist, Frontend Architect & QA Engineer  
**Project:** NetSeller (Personal Internet Sales & Package Platform – Cambodia)  
**Supported Locales:** `en` (English), `km` (Khmer)

---

## 1. Executive Summary

This comprehensive localization and bilingual UI review was conducted on the complete NetSeller platform. NetSeller is an independent Internet Sales Consultant web platform tailored for the Cambodian market. Its primary user journeys initiate via physical business card QR code scans or digital links, followed by browsing Internet packages, comparing speeds and pricing, filling in customer inquiry details, and completing order conversations directly through Telegram.

### Key Audit Findings:
1. **Previous Hardcoded UI Copy:** A substantial number of UI strings (including speed dial actions, hero badges, network telemetry graphics, service area check CTAs, card landing statistics, and QR code generation tooling) were hardcoded in English, resulting in an incomplete experience for Khmer-speaking visitors.
2. **Khmer Cultural & Linguistic Naturalness:** Previous translations in certain sections were literal machine translations that did not reflect Cambodian telecommunications conventions (e.g., using English acronyms where standard in Cambodia such as `Wi-Fi 6`, `Mbps`, `Dual-Band`, and `Telegram`, but expressing value propositions in natural, polite Khmer phrasing).
3. **Typography & Word Breaking:** Khmer script without zero-width spaces or CSS word-break rules suffers from irregular wrapping and line clipping on mobile screens (320px–375px).
4. **Form Validation Language:** Validation errors previously rendered English-only messages from Zod schemas regardless of the active locale.

---

## 2. Hardcoded Strings Audit & Defect Catalog

The audit analyzed every component, layout, and page in `src/`. Below is the catalog of uncovered hardcoded strings and their resolution:

| File Location | Hardcoded English / Khmer Text | Issue Description | Resolution Implemented |
|---|---|---|---|
| `src/components/layout/Header.tsx` | `"Telegram Online:"`, `"Hotline:"`, `"Free Wi-Fi 6 Router..."`, `"Cambodia Internet"`, `"NetSeller Home"` | Micro-bar and brand metadata lacked translation keys in Khmer. | Added `"telegramOnline"`, `"hotline"`, `"topBarPromo"`, `"cambodiaInternet"` to `nav` namespace in `en.json` and `km.json`. |
| `src/components/layout/MobileNavigation.tsx` | `"Call"`, `"Call Consultant Hotline"`, `"Mobile Navigation"` | Mobile bottom navigation action displayed hardcoded English "Call" and English aria-labels. | Added `"call"`, `"callNow"`, `"mobileNavAria"` to `nav` namespace. |
| `src/components/layout/FloatingContact.tsx` | `"Quick Contact"`, `"Chat on Telegram"`, `"Fast reply < 15 mins"`, `"Direct Phone Call"`, `"Digital Business Card"`, `"Save vCard to Phone"` | Floating speed dial menu was 100% hardcoded English. | Created new namespace `"speedDial"` with full bilingual mapping. |
| `src/components/home/HeroSection.tsx` | `"Welcome! You scanned..."`, `"Verified"`, `"Digital Card"`, `"Zero Setup Fee ($0)"`, `"Dual-Band Router Included"`, `"Install Within 24-48 Hours"`, `"Optical Fiber Network"`, `"Network Status: Optimal..."`, `"Ping: 4ms"`, `"Next-Gen Wi-Fi 6 Router"`, `"100% UNLIMITED"`, `"Symmetrical Fiber Bandwidth"`, `"Download/Upload Speed"` | Hero interactive telemetry card and trust badges were hardcoded English. | Added comprehensive keys under `"hero"` namespace (`qrScannedWelcome`, `verifiedBadge`, `digitalCardLink`, `zeroSetup`, `networkStatusTitle`, `wifi6Tech`, `symmetricalFiber`, etc.). |
| `src/components/home/AboutSection.tsx` | `"Personal Seller"`, `"Authorized Consultant"` | Avatar badges were hardcoded English. | Added `personalSellerBadge` and `authorizedConsultantBadge` to `"about"`. |
| `src/components/home/ServiceAreasSection.tsx` | `"Check Address"`, `estimatedInstallHours` English strings | Callout button was hardcoded English; estimated hours lacked Khmer counterpart. | Added `estimatedInstallHoursKm` in seller config & types; added `checkAddressBtn` to `"serviceAreas"`. |
| `src/components/home/TestimonialsSection.tsx` | `"Real-time Chat"`, `"Fast Dispatch"`, `"Guaranteed by NetSeller Consultant"`, `"Have questions about coverage on your street?"` | Service guarantee cards and consultation banner had hardcoded English text. | Added `guaranteedBy`, `questionsTitle`, `questionsSubtitle`, `badgeRealtime`, `badgeFastDispatch`, `badgeZeroRisk` to `"testimonials"`. |
| `src/components/home/ContactSection.tsx` | Form labels, placeholders, `"Inquiry Copied & Telegram Opened!"`, `"Facebook Page:"`, `"Phnom Penh & Provincial Fiber Hubs"` | Form UI and success state contained hardcoded strings. | Fully localized `"contact"` namespace and dynamic validation schema. |
| `src/components/packages/PackageOrderDialog.tsx` | `"Prepared Inquiry Message:"`, `"Edit Details"`, `"Seller Telegram:"`, `"• Hotline:"` | Review and dispatch dialog had untranslated labels and static validation errors. | Localized dialog review labels and integrated `getOrderFormSchema(tVal)`. |
| `src/components/packages/PackageCard.tsx` | `"{CATEGORY} INTERNET"`, `"($0 Setup)"` | Card category badge and setup fee highlight contained untranslated English. | Localized with `categoryHome`, `categoryBusiness`, and `freeInstall`. |
| `src/components/packages/PackageComparisonTable.tsx` | `"⇄ Swipe horizontally..."`, `"$0 Free"` | Mobile swipe hint and free setup cell were hardcoded English. | Localized with `comparison.swipeHint` and `comparison.freeSetup`. |
| `src/app/[locale]/packages/page.tsx` | `"Official Fiber Plans • Cambodia"`, hardware descriptions, `"Ask on Telegram"` | Secondary page hardware cards and Telegram CTA were hardcoded. | Localized with `equipmentTitle`, `equipmentSpecs`, `cableDropSpecs`, `helpPrompt`, and `askTelegram`. |
| `src/app/[locale]/card/page.tsx` | `"Connected via Business Card QR Code"`, `"Phnom Penh & Major Provinces"`, `"Experience"`, `"Installs"`, `"Fast Reply"`, `"Popular Internet Packages"`, `"Select Your Plan & Order"`, `"View All 5 Plans..."` | Digital business card landing page was 100% hardcoded in English. | Created new dedicated namespace `"card"` with complete bilingual translations. |
| `src/app/[locale]/card/VCardButton.tsx` | `"Save Contact"`, `"Saved!"` | vCard download button was hardcoded English. | Added `saveContact` and `savedContact` to `"card"`. |
| `src/components/qr/QRCodeGenerator.tsx` | Header, badges, copy buttons, print guide lines, payload URL input | QR generator component was 100% hardcoded in English. | Created new dedicated namespace `"qr"` with complete bilingual translations. |
| `src/components/layout/Footer.tsx` | `"Digital Business Card"`, `"Business Card QR Generator"`, `"Service Locations"`, provincial names in English only | Footer navigation links and coverage list were hardcoded English. | Updated with `tNav("digitalCard")`, `tNav("qrGenerator")`, `t("serviceLocations")`, and `area.nameKm`. |
| `src/lib/validations/order.schema.ts` | Error strings: `"Name must be at least 2 characters."`, `"Please enter a valid phone number."`, etc. | Zod schema errors were hardcoded in English. | Created `getOrderFormSchema(messages)` and `getContactFormSchema(messages)` driven by `"validations"` namespace. |

---

## 3. Linguistic & Cultural Analysis (Khmer & English)

### 3.1 Cambodian Telecommunications Context & Terminology
In Cambodia, telecommunications consumers comfortably understand specific international technical terms (e.g., `Wi-Fi`, `Mbps`, `Dual-Band`, `Wi-Fi 6`, `Telegram`, `QR Code`, `vCard`). Translating these into obscure Khmer coinages creates confusion. However, commercial concepts, guarantees, installation terms, and polite customer engagement must be expressed in natural, idiomatic Khmer.

| Concept | Previous / Machine Translation | Improved Khmer Terminology | Rationale |
|---|---|---|---|
| Fiber Internet | អ៊ីនធឺណិតខ្សែកាប (generic) | អ៊ីនធឺណិតខ្សែកាបអុបទិក | Precise technical classification ("fiber optic cable"). |
| Dual-band Wi-Fi | វ៉ាយហ្វាយពីរខ្សែ | រ៉ោតទ័រ Dual-Band | Local market standard among Cambodian tech users. |
| Free Setup / No hidden fees | ដំឡើងឥតគិតថ្លៃ | ឥតគិតថ្លៃសេវាដំឡើង ($0) គ្មានកម្រៃលាក់កំបាំង | Transparent, reassuring tone standard in Phnom Penh. |
| Speed (Download / Upload) | ល្បឿនទាញយក | ល្បឿនទាញយក (Download) / បញ្ជូន (Upload) | Bilingual pairing ensures zero ambiguity. |
| Sales Consultant | អ្នកលក់ (just "seller") | អ្នកប្រឹក្សាសេវាអ៊ីនធឺណិតផ្ទាល់ | Elevates trust and emphasizes consultative guidance. |
| Telegram Inquiry | សារសួរនាំ | សាកសួរផ្ទាល់តាម Telegram | Professional, proactive action verb. |

### 3.2 Tone of Voice
- **Khmer:** Warm, polite, respectful, and reassuring (`សូមស្វាគមន៍`, `ពួកយើងផ្ដល់ជូន...`, `ជួយសម្របសម្រួល`). Perfect for personal sales where trust is paramount.
- **English:** Clear, direct, professional, and concise. High conversion copy highlighting speed, $0 setup, and human support.

---

## 4. Typography & Visual Layout Audit

### 4.1 Fonts & Font Hierarchy
- **Khmer:** `Noto Sans Khmer` (`400`, `500`, `600`, `700`) loaded via Google Fonts with `font-khmer` class applied to `body` when `locale === "km"`.
- **English:** `Inter` (`400`, `500`, `600`, `700`, `800`, `900`) loaded via Google Fonts with `font-sans` class.

### 4.2 Word Wrap & Line Height
- Khmer text is unspaced between words (spaces only indicate clause/sentence boundaries). Without CSS word breaking, long Khmer compounds overflow containers on small devices.
- In `globals.css`:
  ```css
  :lang(km),
  .font-khmer {
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.65;
  }
  ```
  This elevated line height (1.65 vs standard 1.5) prevents Khmer subscript and superscript diacritics (e.g., ត្រ, ញ្ជ, ្ត) from colliding with preceding or succeeding lines.

### 4.3 Responsive Viewport Evaluation (320px–1920px)
- **320px (iPhone SE 1st gen):** Verified zero horizontal scrolling. Khmer text wraps cleanly inside badges, cards, and dialogue headers without clipping.
- **375px–414px (Standard Smartphones):** Telegram CTA buttons, speed dial, and package cards render with balanced padding and legible font sizes.
- **768px (Tablets):** 2-column grids adapt smoothly; typography scale adjusts proportionately.
- **1024px–1920px (Desktop / Ultrawide):** Header micro-bar, comparison table, and showcase cards maintain optimal reading line-lengths and crisp contrast.

---

## 5. Accessibility (WCAG 2.2 AA)
- All interactive buttons have explicit localized `aria-label`s in English and Khmer.
- Mobile bottom navigation includes `aria-label={t("mobileNavAria")}` and `aria-label={t("callNow")}`.
- Language switcher communicates active state via `aria-pressed="true|false"` and has accessible grouping.
- High contrast ratios maintained across all text elements (4.5:1 minimum for body text, 3:1 for large display headers).

