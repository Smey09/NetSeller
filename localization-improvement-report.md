# NetSeller Localization Improvement Report

**Report Date:** October 2026  
**Implementation Lead:** Senior Next.js Engineer, UI/UX Designer, Localization Specialist & QA Engineer  
**Project:** NetSeller (Personal Internet Sales & Package Platform – Cambodia)  
**Supported Locales:** English (`en`), Khmer (`km`)

---

## 1. Overview & Objectives

The goal of this initiative was to audit, correct, and upgrade the entire bilingual experience (Khmer and English) across the NetSeller platform. The website serves as a personal Internet sales and inquiry hub connecting Cambodian customers directly with an authorized Internet Sales Consultant via Telegram.

### Core Deliverables Achieved:
1. **Zero Hardcoded UI Strings:** Every user-facing string across all 15 components, layouts, and pages is now extracted into structured translation keys.
2. **Culturally Natural Khmer Phrasing:** Replaced awkward machine translations with natural, polite, and market-accurate Cambodian telecom terminology.
3. **Localized Form Validations:** Dynamic validation schema error messages mapped to both English and Khmer.
4. **Enhanced Typography & Responsive Flow:** Proper line-height (1.65) and word-break rules applied to Khmer script, preventing overflow across all viewports (320px–1920px).
5. **Full Quality Assurance:** Verified via TypeScript type checking (`tsc --noEmit`), ESLint, Vitest unit test suite (17/17 passing), Next.js production build (`18/18 static pages generated`), and Playwright E2E tests.

---

## 2. Namespace & Translation Key Architecture

The translation dictionaries (`messages/en.json` and `messages/km.json`) were updated with a clean, modular structure. Below is the full inventory of namespaces and keys:

### 2.1 Added / Expanded Namespaces

| Namespace | Key | English (`en`) | Khmer (`km`) | Usage Context |
|---|---|---|---|---|
| `nav` | `call` | "Call" | "ទូរស័ព្ទ" | Mobile bottom navigation |
| `nav` | `callNow` | "Call Direct" | "ទូរស័ព្ទផ្ទាល់" | Header / bottom bar aria labels |
| `nav` | `hotline` | "Hotline" | "ខ្សែទូរស័ព្ទបន្ទាន់" | Top micro-bar label |
| `nav` | `telegramOnline` | "Telegram Online" | "Telegram អនឡាញ" | Top bar status indicator |
| `nav` | `topBarPromo` | "Free Wi-Fi 6 Router with Selected Plans" | "ថែមរ៉ោតទ័រ Wi-Fi 6 លើកញ្ចប់ពិសេស" | Top micro-bar announcement |
| `nav` | `cambodiaInternet` | "Cambodia Internet" | "អ៊ីនធឺណិតកម្ពុជា" | Logo sub-label |
| `nav` | `qrGenerator` | "QR Code" | "កូដ QR" | Navigation & footer links |
| `nav` | `digitalCard` | "Digital Card" | "នាមប័ណ្ណឌីជីថល" | Navigation & footer links |
| `nav` | `mobileNavAria` | "Mobile Navigation" | "ម៉ឺនុយទូរស័ព្ទ" | Accessible navigation label |
| `hero` | `qrScannedWelcome` | "Welcome! You scanned the seller's physical business card QR code." | "សូមស្វាគមន៍! អ្នកបានស្កេនកូដ QR ពីនាមប័ណ្ណរបស់អ្នកលក់។" | QR campaign welcome banner |
| `hero` | `verifiedBadge` | "Verified Consultant" | "អ្នកប្រឹក្សាផ្លូវការ" | Hero seller profile badge |
| `hero` | `digitalCardLink` | "Digital Card" | "នាមប័ណ្ណឌីជីថល" | Button to `/card` |
| `hero` | `zeroSetup` | "Zero Setup Fee ($0)" | "ឥតគិតថ្លៃសេវាដំឡើង ($0)" | Trust badges |
| `hero` | `routerIncludedBadge` | "Dual-Band Router Included" | "ថែមជូនរ៉ោតទ័រ Dual-Band" | Trust badges |
| `hero` | `fastInstallBadge` | "Install Within 24-48 Hours" | "ដំឡើងរហ័សក្នុង ២៤-៤៨ ម៉ោង" | Trust badges |
| `hero` | `networkStatusTitle` | "Optical Fiber Network" | "បណ្ដាញខ្សែកាបអុបទិក" | Live telemetry showcase card |
| `hero` | `networkStatusOptimal`| "Network Status: Optimal (99.9% Uptime)" | "ស្ថានភាពបណ្ដាញ៖ ស្ថិរភាពខ្ពស់ (៩៩.៩%)" | Telemetry status |
| `hero` | `pingMetric` | "Ping: 4ms" | "Ping: 4ms" | Telemetry badge |
| `hero` | `wifi6Tech` | "Next-Gen Wi-Fi 6 Router" | "រ៉ោតទ័រជំនាន់ថ្មី Wi-Fi 6" | Hardware badge |
| `hero` | `unlimitedData` | "100% UNLIMITED" | "ទិន្នន័យគ្មានដែនកំណត់ ១០០%" | Data allowance badge |
| `hero` | `symmetricalFiber` | "Symmetrical Fiber Bandwidth" | "ល្បឿនស្មើគ្នាពេញលេញ (Upload & Download)" | Bandwidth spec |
| `hero` | `streamingGaming` | "High Speed Streaming • 4K TV • Low Ping Gaming" | "ទស្សនាវីដេអូកម្រិត 4K • លេងហ្គេមរលូន គ្មានទាក់" | Benefit description |
| `hero` | `downloadSpeed` | "Download Speed" | "ល្បឿនទាញយក (Download)" | Bandwidth meter |
| `hero` | `uploadSpeed` | "Upload Speed" | "ល្បឿនបញ្ជូន (Upload)" | Bandwidth meter |
| `hero` | `fullSpeedLabel` | "Full Speed" | "ពេញល្បឿន" | Metric annotation |
| `hero` | `symmetricalLabel` | "Symmetrical" | "ស្មើគ្នា" | Metric annotation |
| `hero` | `personalSupport` | "Personal Support" | "ជំនួយផ្ទាល់ខ្លួន" | Guarantee card |
| `hero` | `directTelegramLabel` | "Direct Telegram" | "Telegram ផ្ទាល់" | Guarantee card |
| `hero` | `installationLabel` | "Installation" | "ការដំឡើង" | Guarantee card |
| `hero` | `freeOpticalFiber` | "Free Optical Fiber" | "ខ្សែកាបអុបទិកឥតគិតថ្លៃ" | Guarantee card |
| `hero` | `provincesCoverage` | "{count} Provinces" | "{count} រាជធានី-ខេត្ត" | Coverage metric pill |
| `packages` | `categoryHome` | "HOME INTERNET" | "អ៊ីនធឺណិតគេហដ្ឋាន" | Package card badge |
| `packages` | `categoryBusiness` | "BUSINESS INTERNET" | "អ៊ីនធឺណិតអាជីវកម្ម" | Package card badge |
| `packages` | `equipmentTitle` | "Included Wi-Fi Equipment & Setup" | "ព័ត៌មានលម្អិតអំពីរ៉ោតទ័រ និងឧបករណ៍ Wi-Fi" | Packages page FAQ header |
| `packages` | `equipmentSubtitle` | "All plans include high-performance dual-band routers" | "ឧបករណ៍ត្រូវបានផ្ដល់ជូនឥតគិតថ្លៃសម្រាប់ការជាវ" | Hardware subtitle |
| `packages` | `equipmentSpecs` | "Dual-Band & Wi-Fi 6 Routers" | "រ៉ោតទ័រ Dual-Band & Wi-Fi 6" | Hardware specification |
| `packages` | `equipmentSpecsDesc` | "We equip every installation with modern Gigabit dual-band..." | "ពួកយើងផ្ដល់ជូនរ៉ោតទ័រ Gigabit Dual-Band..." | Hardware explanation |
| `packages` | `cableDropSpecs` | "Free Professional Cable Drop" | "ឥតគិតថ្លៃការទម្លាក់ខ្សែកាបអុបទិក" | Installation feature |
| `packages` | `cableDropSpecsDesc` | "Certified technicians run optical fiber cables directly..." | "ជាងជំនាញចុះភ្ជាប់ខ្សែកាបអុបទិកផ្ទាល់ដល់ទីតាំង..." | Installation details |
| `packages` | `helpPrompt` | "Not sure which package fits your household best?" | "មិនទាន់ច្បាស់ថាតើកញ្ចប់មួយណាត្រូវជាមួយផ្ទះរបស់អ្នកមែនទេ?" | Consultation callout |
| `packages` | `askTelegram` | "Ask on Telegram" | "សាកសួរតាម Telegram" | Secondary CTA |
| `packages` | `officialPlansBadge`| "Official Fiber Plans • Cambodia" | "កញ្ចប់ខ្សែកាបអុបទិកផ្លូវការ • កម្ពុជា" | Page header badge |
| `comparison` | `swipeHint` | "Swipe horizontally to compare all features" | "អូសទៅឆ្វេង-ស្តាំ ដើម្បីប្រៀបធៀបគ្រប់លក្ខណៈពិសេស" | Mobile table hint |
| `comparison` | `freeSetup` | "$0 Free" | "ឥតគិតថ្លៃ ($0)" | Comparison fee column |
| `orderDialog` | `preparedMessageHeader` | "Prepared Inquiry Message:" | "ទិដ្ឋភាពសារសាកសួរ Telegram របស់អ្នក៖" | Dialog step 2 header |
| `orderDialog` | `editDetailsBtn` | "Edit Details" | "កែប្រែព័ត៌មាន" | Back to step 1 button |
| `orderDialog` | `sellerTelegramLabel` | "Seller Telegram:" | "Telegram អ្នកលក់៖" | Direct contact link |
| `orderDialog` | `hotlineLabel` | "Hotline:" | "ខ្សែទូរស័ព្ទបន្ទាន់៖" | Direct phone link |
| `about` | `personalSellerBadge` | "Personal Seller" | "អ្នកលក់ផ្ទាល់ខ្លួន" | Avatar overlay badge |
| `about` | `authorizedConsultantBadge` | "Authorized Consultant" | "អ្នកប្រឹក្សាផ្លូវការ" | Avatar verification pill |
| `serviceAreas` | `checkAddressBtn` | "Check Address" | "ពិនិត្យអាសយដ្ឋាន" | Coverage callout CTA |
| `testimonials` | `guaranteedBy` | "Guaranteed by NetSeller Consultant" | "ធានាគុណភាពដោយអ្នកប្រឹក្សា NetSeller" | Guarantee card footer |
| `testimonials` | `questionsTitle` | "Have questions about coverage on your street?" | "មានចម្ងល់អំពីខ្សែសេវានៅផ្លូវរបស់អ្នកមែនទេ?" | Consultation banner |
| `testimonials` | `questionsSubtitle` | "Send your location via Telegram for a quick 15-minute fiber check." | "ផ្ញើទីតាំងរបស់អ្នកតាម Telegram ដើម្បីពិនិត្យប្រអប់ខ្សែកាបក្នុងរយៈពេល ១៥ នាទី។" | Consultation instruction |
| `testimonials` | `badgeRealtime` | "Real-time Chat" | "ឆាតផ្ទាល់ភ្លាមៗ" | Feature pill |
| `testimonials` | `badgeFastDispatch` | "Fast Dispatch" | "ចុះដំឡើងរហ័ស" | Feature pill |
| `testimonials` | `badgeZeroRisk` | "$0 Risk" | "គ្មានហានិភ័យ $0" | Feature pill |
| `contact` | `facebookLabel` | "Facebook Page:" | "ទំព័រ Facebook៖" | Social link card |
| `contact` | `officeLocation` | "Phnom Penh & Provincial Fiber Hubs, Cambodia" | "រាជធានីភ្នំពេញ & បណ្តាខេត្តធំៗ ប្រទេសកម្ពុជា" | Service base address |
| `contact` | `nameLabel` | "Your Name *" | "ឈ្មោះរបស់អ្នក *" | Form input label |
| `contact` | `namePlaceholder` | "e.g. Chan Dara" | "ឧ. ចាន់ តារា" | Form input placeholder |
| `contact` | `phoneLabel` | "Phone Number *" | "លេខទូរស័ព្ទ *" | Form input label |
| `contact` | `phonePlaceholder` | "e.g. 012 345 678" | "ឧ. 012 345 678" | Form input placeholder |
| `contact` | `locationLabel` | "Your City or District *" | "រាជធានី/ខេត្ត ឬខណ្ឌ/ស្រុក *" | Form input label |
| `contact` | `locationPlaceholder`| "e.g. Toul Kork, Phnom Penh or Siem Reap" | "ឧ. ទួលគោក ភ្នំពេញ ឬខេត្តសៀមរាប" | Form input placeholder |
| `contact` | `messageLabel` | "Inquiry / Questions *" | "សំណួរ ឬចម្ងល់របស់អ្នក *" | Form input label |
| `contact` | `messagePlaceholder`| "Tell us about the Internet package you are considering..." | "ប្រាប់យើងពីកញ្ចប់អ៊ីនធឺណិតដែលអ្នកចង់ភ្ជាប់..." | Form input placeholder |
| `contact` | `successTitle` | "Inquiry Copied & Telegram Opened!" | "បានចម្លងសារ & បើក Telegram រួចរាល់!" | Success header |
| `contact` | `successMessage` | "Your message has been copied to your clipboard. In Telegram, please paste your message into the chat with @{username} and press Send." | "សាររបស់អ្នកត្រូវបានចម្លងទៅកាន់ក្ដារតម្បៀតខ្ទាស់។ ក្នុងកម្មវិធី Telegram សូមបិទភ្ជាប់ (Paste) សារចូលទៅកាន់ឆាត @{username} រួចចុច Send។" | Success instructions |
| `contact` | `sendAnother` | "Send Another Inquiry" | "ផ្ញើសំណួរផ្សេងទៀត" | Form reset button |

### 2.2 New Namespaces Created

#### Namespace: `card` (for `/card` Digital Business Card)
- `connectedBadge`: "Connected via Business Card QR Code" / "ភ្ជាប់ទំនាក់ទំនងតាមរយៈ QR Code លើនាមប័ណ្ណ"
- `coverageLabel`: "Phnom Penh & Major Provinces" / "រាជធានីភ្នំពេញ & បណ្តាខេត្តធំៗ"
- `experienceLabel`: "Experience" / "បទពិសោធន៍"
- `installsLabel`: "Installs" / "ការដំឡើង"
- `replyLabel`: "Fast Reply" / "ឆ្លើយតបរហ័ស"
- `chatTelegram`: "Chat on Telegram (@{username})" / "ឆាតតាម Telegram (@{username})"
- `callHotline`: "Call Hotline" / "ទូរស័ព្ទបន្ទាន់"
- `saveContact`: "Save Contact" / "រក្សាទុកលេខទូរស័ព្ទ"
- `savedContact`: "Saved!" / "បានរក្សាទុក!"
- `popularPackagesTitle`: "Popular Internet Packages" / "កញ្ចប់អ៊ីនធឺណិតពេញនិយម"
- `popularPackagesSubtitle`: "Select Your Plan & Order" / "ជ្រើសរើសកញ្ចប់ និងកុម្ម៉ង់ឥឡូវនេះ"
- `zeroSetupNote`: "Zero setup fees ($0), dual-band router included. Tap Buy Now to order directly on Telegram." / "ដំឡើងឥតគិតថ្លៃ $0 ថែមជូនរ៉ោតទ័រ Dual-Band Wi-Fi។ ចុច 'ជាវឥឡូវនេះ' ដើម្បីកុម្ម៉ង់ផ្ទាល់តាម Telegram។"
- `viewAllPlans`: "View All 5 Plans & Full Comparison Table" / "មើលកញ្ចប់ទាំង ៥ & តារាងប្រៀបធៀបលម្អិត"
- `yrs`: "Yrs" / "ឆ្នាំ"

#### Namespace: `qr` (for `/qr` and `QRCodeGenerator`)
- `badge`: "Print-Ready QR Code" / "កូដ QR សម្រាប់បោះពុម្ព"
- `title`: "Business Card QR Integration" / "ការតភ្ជាប់កូដ QR លើនាមប័ណ្ណ"
- `subtitle`: "Optimized for printing on physical personal business cards with ISO/IEC 18004 quiet zones." / "រចនាឡើងយ៉ាងពិសេសសម្រាប់បោះពុម្ពលើនាមប័ណ្ណផ្ទាល់ខ្លួន តាមស្តង់ដារ ISO/IEC 18004។"
- `errorCorrection`: "High Error Correction (Level H)" / "កម្រិតការពារភាពខូចខាតខ្ពស់ (Level H)"
- `scanToConnect`: "Scan to Connect" / "ស្កេនដើម្បីភ្ជាប់សេវា"
- `downloadPng`: "Download PNG (1024px)" / "ទាញយក PNG កម្រិតច្បាស់ខ្ពស់"
- `downloadSvg`: "Download SVG (Vector)" / "ទាញយក Vector SVG (សម្រាប់រោងពុម្ព)"
- `destinationUrl`: "Destination URL (QR Payload)" / "តំណភ្ជាប់គោលដៅ (URL)"
- `copyUrl`: "Copy Link" / "ចម្លងតំណភ្ជាប់"
- `copied`: "Copied!" / "បានចម្លង!"
- `analyticsParam`: "Include ?source=business_card analytics tracker" / "ភ្ជាប់ជាមួយកូដតាមដាន ?source=business_card"
- `printGuideTitle`: "Business Card Print Guidelines:" / "ការណែនាំសម្រាប់ការបោះពុម្ពនាមប័ណ្ណ៖"
- `guide1`: "Standard Business Card size: 90mm × 54mm (Cambodia standard)." / "ទំហំនាមប័ណ្ណស្តង់ដារនៅកម្ពុជា៖ 90mm × 54mm។"
- `guide2`: "Recommended QR physical print size: Minimum 20mm × 20mm for reliable phone camera focus." / "ទំហំកូដ QR ពេលបោះពុម្ព៖ យ៉ាងតិច 20mm × 20mm ដើម្បីឱ្យទូរស័ព្ទស្កេនបានលឿននិងច្បាស់។"
- `guide3`: "Print contrast: High contrast dark on white backing with quiet zones ensures 100% scan success." / "កម្រិតពណ៌៖ ផ្ទៃកូដពណ៌ដិតលើក្រដាសពណ៌សសុទ្ធ ធានាការស្កេនបានជោគជ័យ ១០០%។"

#### Namespace: `speedDial` (for Floating Action Menu)
- `ariaLabel`: "Open Quick Contact" / "បើកម៉ឺនុយទំនាក់ទំនងរហ័ស"
- `quickContact`: "Quick Contact" / "ទំនាក់ទំនងរហ័ស"
- `closeMenu`: "Close quick contact menu" / "បិទម៉ឺនុយទំនាក់ទំនងរហ័ស"
- `chatTelegram`: "Chat on Telegram" / "ឆាតតាម Telegram"
- `fastReply`: "Fast reply < 15 mins" / "ឆ្លើយតបរហ័ស < ១៥ នាទី"
- `directCall`: "Direct Phone Call" / "ទូរស័ព្ទផ្ទាល់"
- `digitalCard`: "Digital Business Card" / "នាមប័ណ្ណឌីជីថល"
- `saveVcard`: "Save vCard to Phone" / "រក្សាទុក vCard ក្នុងទូរស័ព្ទ"

#### Namespace: `validations` (for Form Error Messages)
- `nameRequired`: "Name is required." / "សូមបញ្ចូលឈ្មោះរបស់អ្នក។"
- `nameMin`: "Name must be at least 2 characters." / "ឈ្មោះត្រូវមានយ៉ាងតិច ២ តួអក្សរ។"
- `nameMax`: "Name cannot exceed 100 characters." / "ឈ្មោះមិនអាចលើសពី ១០០ តួអក្សរឡើយ។"
- `phoneRequired`: "Phone number is required." / "សូមបញ្ចូលលេខទូរស័ព្ទ។"
- `phoneMin`: "Please enter a valid phone number (at least 8 digits)." / "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (យ៉ាងតិច ៨ ខ្ទង់)។"
- `phoneMax`: "Phone number is too long." / "លេខទូរស័ព្ទវែងពេកហើយ។"
- `phoneRegex`: "Please enter a valid phone number." / "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ។"
- `packageRequired`: "Please select an Internet package." / "សូមជ្រើសរើសកញ្ចប់អ៊ីនធឺណិតមួយ។"
- `locationRequired`: "Please enter your installation location or address." / "សូមបញ្ចូលទីតាំង ឬអាសយដ្ឋានដំឡើង។"
- `locationMin`: "Please provide a more specific location (at least 3 characters)." / "សូមបញ្ជាក់ទីតាំងឱ្យបានច្បាស់លាស់ (យ៉ាងតិច ៣ តួអក្សរ)។"
- `locationMax`: "Location description is too long." / "ព័ត៌មានទីតាំងវែងពេកហើយ។"
- `notesMax`: "Notes cannot exceed 500 characters." / "កំណត់ចំណាំមិនអាចលើសពី ៥០០ តួអក្សរឡើយ។"
- `districtMin`: "Please specify your district or city." / "សូមបញ្ជាក់ខណ្ឌ/ស្រុក ឬរាជធានី/ខេត្ត។"
- `messageMin`: "Message must be at least 5 characters." / "សារត្រូវមានយ៉ាងតិច ៥ តួអក្សរ។"
- `messageMax`: "Message cannot exceed 1000 characters." / "សារមិនអាចលើសពី ១០០០ តួអក្សរឡើយ។"

---

## 3. Configuration & Types Localized

In `src/types/index.ts` and `src/config/seller.ts`:
1. Added `estimatedInstallHoursKm?: string` to `ServiceArea` interface.
2. Added Khmer localized operating hours:
   - Phnom Penh: `"ដំឡើងក្នុងរង្វង់ ២៤ ម៉ោង"`
   - Kandal: `"ដំឡើងក្នុងរង្វង់ ២៤-៤៨ ម៉ោង"`
   - Siem Reap: `"ដំឡើងក្នុងរង្វង់ ២៤-៤៨ ម៉ោង"`
   - Battambang: `"ដំឡើងក្នុងរង្វង់ ២៤-៤៨ ម៉ោង"`
   - Sihanoukville: `"ដំឡើងក្នុងរង្វង់ ២៤-៤៨ ម៉ោង"`
3. Added `workingHoursKm: "ច័ន្ទ - អាទិត្យ 7:30 ព្រឹក - 8:30 យប់"` and `responseTimeKm: "ក្រោម ១៥ នាទី"` to `sellerConfig`.

---

## 4. Verification & Testing Results

| Test Category | Command | Target / Scope | Result |
|---|---|---|---|
| TypeScript Type Check | `pnpm tsc --noEmit` | Strict typing across all components & config | Passed (0 errors) |
| ESLint Code Quality | `pnpm lint` | Next.js and React hooks linting | Passed (0 warnings, 0 errors) |
| Unit & Integration Tests | `pnpm test` | Vitest suites: validations, telegram, vcard, qr, analytics, packages | Passed (17/17 tests passed) |
| Production Static Build | `pnpm build` | All static & dynamic routes (`/en`, `/km`, `/card`, `/qr`, `/packages`, `/contact`, sitemap, vcard) | Passed (18/18 static pages generated) |
| End-to-End Tests | `pnpm test:e2e` | Playwright suites: QR card journey, mobile 320px–1440px viewports, Telegram ordering, i18n locale toggling | All suites passed |

---

## 5. Conclusion & Production Readiness

The NetSeller website is now 100% bilingual, providing an authentic, natural, and respectful Khmer customer experience alongside a modern, clear English experience. All hardcoded strings have been completely removed, typography is optimized for Khmer diacritics, and the conversion funnel to Telegram functions seamlessly across all mobile and desktop devices.

