# Rule 01: Project Context & Knowledge Reuse

## Core Mandates
1. **Understand NetSeller Business:**
   - NetSeller is a personal Internet sales consultant platform for Cambodia.
   - Its primary mission is converting residential and business customers into direct Telegram inquiries.
   - It is not an e-commerce platform with automated credit card payments. Keep workflows streamlined.
2. **Reuse Existing Architecture:**
   - Do not reinvent or reimplement established features.
   - Reuse existing components in `src/components/`, utilities in `src/lib/`, domain logic in `src/features/`, and centralized configurations in `src/config/`.
3. **Mandatory Documentation Reading:**
   - Always read `PROJECT_CONTEXT.md` before implementing any feature.
   - Read `ARCHITECTURE.md` before making changes that touch routing, layouts, data flow, or component boundaries.
4. **Avoid Repetitive Repository Analysis:**
   - Do NOT run recursive directory listings (`find .`, broad `ls`, or whole-tree audits) on every task.
   - Trust the documented project structure and navigate directly to target files.
5. **Keep Documentation in Sync:**
   - When introducing new routes, configuration fields, data attributes, or scripts, update `PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, or `DEVELOPMENT_GUIDE.md` accordingly.
   - Record significant releases and architectural decisions in `CHANGELOG.md`.

