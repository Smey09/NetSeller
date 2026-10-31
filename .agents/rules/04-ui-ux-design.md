# Rule 04: UI/UX Design System & Mobile-First Excellence

## Core Mandates
1. **Design Tokens & Palette Consistency:**
   - Use centralized design tokens defined in `src/app/globals.css`:
     - Primary: Blue-600 (`#2563EB`)
     - Secondary: Sky-500 (`#0EA5E9`)
     - Telegram Brand: `#229ED9`
     - Success / Verified: Emerald-600 (`#059669`)
     - Accent / Urgency: Amber-500 (`#F59E0B`)
   - Avoid ad-hoc arbitrary hex colors in Tailwind classes when tokens exist.
2. **Mobile-First Responsive Guarantee (320px – 2560px):**
   - Design and test for small mobile screens (320px iPhone SE) first.
   - Absolutely zero horizontal overflow. Maintain `overflow-x: clip` on root HTML and body.
   - Interactive touch targets must be at least 44px $\times$ 44px on mobile devices.
3. **Data State Resilience:**
   - Always implement and test for:
     - **Empty States:** When a package filter returns 0 items, display an empty state with a "Reset Filter" button.
     - **Expired Promotions:** Render an "Offer Ended" / "ការផ្ដល់ជូនបានបញ្ចប់" badge and disable the button.
     - **Coming Soon Plans:** Display a "Coming Soon" badge and disable ordering.
     - **Variable Text Lengths:** Safeguard long names and addresses with text wrapping and line-clamping.
4. **Elevation & Layout Geometry:**
   - Use consistent modern curvature (`rounded-2xl`, `rounded-3xl`) across cards and dialogs.
   - Subtle layered elevation (`shadow-xs`, `shadow-sm`, `shadow-xl`) without excessive glow.
5. **Accessibility (WCAG 2.2 AA):**
   - Maintain minimum 4.5:1 text contrast ratios.
   - Ensure high-contrast close buttons on dark headers.
   - Provide accessible focus rings (`focus:ring-2 focus:ring-primary-500`) for keyboard navigation.
   - Add `aria-label` or `sr-only` text to icon-only buttons.

