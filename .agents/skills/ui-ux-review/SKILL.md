---
name: ui-ux-review
description: Comprehensive playbook for auditing and enhancing UI/UX, visual hierarchy, mobile responsiveness, accessibility, and conversion flows.
---

# UI/UX Review Skill

Use this skill when auditing or improving page layouts, responsive behaviors, visual design tokens, component accessibility, or conversion flows in NetSeller.

---

## 1. Context & Design Guidelines
- **Master Guidelines:** Read [`.agents/rules/04-ui-ux-design.md`](../rules/04-ui-ux-design.md) and [`src/app/globals.css`](../../src/app/globals.css).
- **Core Conversion Flow:** Physical QR $\rightarrow$ Landing Page $\rightarrow$ Package Selection $\rightarrow$ Modal $\rightarrow$ Telegram.

---

## 2. Review Checklist

### A. Responsive & Layout Integrity
- [ ] Test on 320px, 375px, 414px, 768px, 1440px.
- [ ] Verify zero horizontal scrolling (`scrollWidth <= clientWidth`).
- [ ] Confirm mobile bottom navigation does not overlap page content or floating actions.

### B. Visual Consistency & Tokens
- [ ] Primary Blue (`#2563EB`) used for main CTAs.
- [ ] Telegram Blue (`#229ED9`) used for Telegram triggers.
- [ ] Emerald (`#059669`) used for verified badges and free offers.
- [ ] Border radius matches system design tokens (`rounded-2xl`, `rounded-3xl`).

### C. Data States
- [ ] Empty state renders properly when filters return 0 results.
- [ ] Expired promotions display "Offer Ended" and disable action buttons.
- [ ] "Coming Soon" plans disable order buttons.
- [ ] Long customer text wraps without overflowing containers.

### D. Accessibility (WCAG 2.2 AA)
- [ ] Text contrast $\ge 4.5:1$.
- [ ] Mobile touch targets $\ge 44\text{px} \times 44\text{px}$.
- [ ] Focus rings visible during keyboard navigation.
- [ ] Close buttons and icon triggers have `aria-label`.

---

## 3. Verification Command
Execute Playwright responsive tests:
```bash
pnpm test:e2e
```

