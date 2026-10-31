# Rule 03: Next.js App Router Architecture

## Core Mandates
1. **App Router Conventions:**
   - Adhere strictly to Next.js 14 App Router patterns (`src/app/[locale]/`).
   - Use standard special files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
2. **Server Components by Default:**
   - Keep page shells and static informational sections as Server Components.
   - Do NOT add `"use client"` unless the component explicitly requires:
     - React state (`useState`, `useReducer`)
     - Lifecycle hooks (`useEffect`)
     - Event listeners (`onClick`, `onChange`, `onSubmit`)
     - Browser DOM APIs (window, localStorage, navigator)
3. **Minimize Client-Side JavaScript:**
   - Push Client Components down the component tree to the leaf nodes.
   - Never convert a whole page or section into a Client Component just to add a single interactive button or modal.
4. **Sub-path Routing & Localization (`next-intl`):**
   - Use `Link` from `@/i18n/routing` for internal page transitions to preserve locale prefix.
   - Use `useRouter` from `@/i18n/routing` when programmatically navigating.
   - Call `unstable_setRequestLocale(locale)` in Server Component pages to enable static generation.
5. **Metadata & OpenGraph:**
   - Export `generateMetadata` in page files to provide localized `title`, `description`, and OpenGraph properties.
   - Use `siteConfig.url` as `metadataBase`.

