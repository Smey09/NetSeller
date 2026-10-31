# Rule 05: Bilingual Localization (Khmer & English)

## Core Mandates
1. **Zero Hardcoded Strings:**
   - Every single user-visible string must be defined in `messages/en.json` and `messages/km.json`.
   - Never embed raw text directly into JSX/TSX components.
2. **Key Parity:**
   - Both `messages/en.json` and `messages/km.json` must maintain identical key structures.
   - Any new key added to `en.json` must simultaneously be added to `km.json`.
3. **Natural Khmer Phrasing:**
   - Use natural Cambodian telecommunications vocabulary rather than word-for-word machine translation:
     - "Internet Packages" $\rightarrow$ "កញ្ចប់អ៊ីនធឺណិត"
     - "Fiber Optic" $\rightarrow$ "ខ្សែកាបអុបទិក"
     - "Free Setup / Free Installation" $\rightarrow$ "ដំឡើងឥតគិតថ្លៃ"
     - "Wi-Fi Router" $\rightarrow$ "រ៉ោតទ័រ Wi-Fi"
     - "Inquiry" $\rightarrow$ "ការសាកសួរព័ត៌មាន"
     - "Order Now" $\rightarrow$ "កុម្ម៉ង់ឥឡូវនេះ"
4. **Khmer Font Rendering & Typography:**
   - Apply generous line heights (`leading-relaxed`) to all containers rendering Khmer text.
   - Never use tight line heights (`leading-none` or `leading-tight`) on Khmer headers to avoid clipping vowel diacritics and subscripts (ជើងអក្សរ).
5. **Dynamic Formats & Dates:**
   - Support localized expiration dates (e.g., `validUntil` in English and `validUntilKm` in Khmer for promotions).
   - Localize contact timeframes and response times across languages.

