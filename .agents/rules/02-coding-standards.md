# Rule 02: Coding Standards & Code Quality

## Core Mandates
1. **TypeScript Strictness:**
   - Adhere strictly to TypeScript compiler rules (`strict: true`).
   - Disallow explicit `any` where a concrete type or interface can be written.
   - Use types defined in `src/types/index.ts` for domain entities (`InternetPackage`, `Promotion`, `SellerConfig`, `ServiceArea`).
2. **Naming Conventions:**
   - **Components:** PascalCase (e.g., `PackageOrderDialog.tsx`, `FloatingContact.tsx`).
   - **Hooks:** camelCase with `use` prefix (e.g., `useTranslations()`, `usePathname()`).
   - **Utilities & Services:** camelCase (e.g., `formatTelegramMessage()`, `TelegramService`).
   - **Types & Interfaces:** PascalCase (e.g., `OrderFormValues`, `SellerConfig`).
   - **Constants & Configs:** camelCase for objects (`sellerConfig`, `siteConfig`), UPPER_SNAKE_CASE for constant values.
3. **Component Structure:**
   - Keep components focused and modular with clear props interfaces.
   - Order imports systematically:
     1. React / Framework (`react`, `next`, `next-intl`)
     2. UI primitives (`@/components/ui/*`)
     3. Icons (`lucide-react`)
     4. Domain components, utilities, config, and types
4. **Error Handling & Defensive Coding:**
   - Gracefully handle undefined or missing optional fields (e.g., package badges, equipment terms, avatar URLs).
   - Never allow unhandled promise rejections in API routes or client handlers.
5. **Simplicity Over Abstraction:**
   - Avoid creating unnecessary wrappers or micro-abstractions that obscure intent.
   - Reuse existing utilities (`cn()` for Tailwind merging, `TelegramService` for Telegram links).

