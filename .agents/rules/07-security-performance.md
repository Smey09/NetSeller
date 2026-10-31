# Rule 07: Security, Privacy & Performance

## Core Mandates
1. **Never Expose Secrets in Client Bundles:**
   - Client components and configs must NEVER reference sensitive tokens (e.g., Telegram Bot tokens, private API keys).
   - Only environment variables explicitly prefixed with `NEXT_PUBLIC_` are accessible on the client.
   - Server-only notifications in `src/app/api/inquiries/route.ts` read `process.env.TELEGRAM_BOT_TOKEN` on the server only.
2. **Zero-Cookie Privacy Compliance:**
   - NetSeller uses anonymous, client-side localStorage counters (`PrivacyAnalytics`) with zero tracking cookies and zero third-party tracking scripts.
   - Do NOT inject invasive marketing scripts (Facebook Pixel, Google Tag Manager) without explicit architectural review.
3. **Input Sanitization & Validation:**
   - All customer inputs must pass through Zod validation schemas (`src/lib/validations/order.schema.ts`).
   - Validate customer phone numbers, names, and addresses both on the client and in API handlers.
   - Avoid `dangerouslySetInnerHTML` unless strictly sanitizing trusted static SVG or markup.
4. **Performance & Core Web Vitals:**
   - Pre-render static pages at build time (SSG) with `generateStaticParams`.
   - Keep shared first-load JavaScript bundle under 100 kB.
   - Use Next.js `<Image />` or properly sized static SVGs for icons and graphics.
   - Optimize font loading via `next/font` with zero layout shift (CLS = 0).

