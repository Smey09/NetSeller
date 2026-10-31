---
name: localization
description: Procedures for maintaining high-quality Khmer and English translations, font rendering, terminology consistency, and localized metadata.
---

# Localization Skill (Khmer & English)

Use this skill when adding, reviewing, or modifying bilingual strings, checking Khmer font rendering, or updating localized metadata.

---

## 1. Context & Linguistic Standards
- **Master Guidelines:** Read [`.agents/rules/05-localization-km-en.md`](../rules/05-localization-km-en.md).
- **Translation Catalogs:** `messages/en.json` and `messages/km.json`.
- **Sub-path Locales:** `/en` (English) and `/km` (Khmer).

---

## 2. Terminology Glossary

| English Concept | Standard Khmer Phrasing | Context / Usage |
|:---|:---|:---|
| Internet Packages | កញ្ចប់អ៊ីនធឺណិត | Package headers, catalog titles |
| Fiber Optic | ខ្សែកាបអុបទិក | Fiber specifications & benefits |
| Free Installation | ដំឡើងឥតគិតថ្លៃ | Promotional callouts, zero setup ($0) |
| Wi-Fi Router | រ៉ោតទ័រ Wi-Fi | Hardware inclusion specifications |
| Direct Inquiry | ការសាកសួរព័ត៌មានផ្ទាល់ | Contact forms & Telegram modal |
| Buy Now / Order | ជាវឥឡូវនេះ / កុម្ម៉ង់ឥឡូវនេះ | Package card action buttons |
| Monthly Fee | តម្លៃប្រចាំខែ | Pricing display labels |

---

## 3. Localization Procedure

### Step 1: Key Additions & Sync
- When adding a key in `messages/en.json`, add the exact identical key path in `messages/km.json`.
- Maintain alphabetical order within namespaces where practical.

### Step 2: Typography & Spacing Verification
- Ensure containers rendering Khmer text utilize `leading-relaxed` or `leading-normal`.
- Verify that Khmer vowel diacritics and subscripts (ជើងអក្សរ) are not cut off by tight heights or `overflow: hidden`.

### Step 3: Verification
Run bilingual unit tests:
```bash
pnpm test
```
Verify page rendering in both languages across viewports:
```bash
pnpm test:e2e
```

