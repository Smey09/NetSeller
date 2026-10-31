---
name: nextjs-development
description: Guidelines and procedures for implementing new routes, components, and data logic within the NetSeller Next.js 14 App Router codebase.
---

# Next.js Development Skill

Use this skill when implementing new routes, developing components, refactoring data models, or adding server/client logic in NetSeller.

---

## 1. Context & Architecture References
- **Master Guidelines:** Read [`ARCHITECTURE.md`](../../ARCHITECTURE.md) and [`.agents/rules/03-nextjs-architecture.md`](../rules/03-nextjs-architecture.md).
- **Core Entities:** Inspect [`src/types/index.ts`](../../src/types/index.ts).
- **Routing Engine:** Review [`src/i18n/routing.ts`](../../src/i18n/routing.ts).

---

## 2. Standard Development Procedure

### Step 1: Component Boundary Assessment
- Determine if the feature can be rendered statically on the server (Server Component).
- If user interaction (state, effects, event listeners) is mandatory, create a dedicated Client Component (`"use client"`) at the lowest possible leaf node.

### Step 2: Implement Domain Code
1. Place reusable UI primitives in `src/components/ui/`.
2. Place feature components in `src/components/<domain>/`.
3. If introducing new routes, create `src/app/[locale]/<route>/page.tsx`.
4. Call `unstable_setRequestLocale(locale)` in page Server Components to preserve static generation.

### Step 3: Type & Schema Validation
1. Ensure all props and data entities conform to TypeScript interfaces in `src/types/index.ts`.
2. If introducing or modifying form inputs, update the corresponding Zod schema in `src/lib/validations/`.

### Step 4: Verification
1. Run type check: `pnpm tsc --noEmit`.
2. Run lint check: `pnpm lint`.
3. Run unit tests: `pnpm test`.

