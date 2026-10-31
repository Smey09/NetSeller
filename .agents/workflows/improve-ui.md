# Workflow: Improve UI & UX

Use this workflow when auditing, refining, or redesigning visual components, layouts, responsive states, or micro-interactions.

---

## Step 1: Inspect Affected Page & Components
- Identify the target route (e.g., `/packages`, `/card`, `/qr`, or homepage).
- Locate the corresponding component files under `src/components/`.

## Step 2: Check Both Languages
- Inspect rendering in English (`/en/...`) and Khmer (`/km/...`).
- Ensure Khmer text maintains `leading-relaxed` and has no clipped subscripts or diacritics.

## Step 3: Test Realistic Data Permutations
- Test with short and long package names.
- Verify empty states (e.g., 0 packages matching filter).
- Verify disabled states (e.g., expired promotion, coming soon package).

## Step 4: Validate Multi-Screen Responsiveness
- Test viewports: 320px, 375px, 414px, 768px, 1440px.
- Confirm zero horizontal scrolling (`scrollWidth <= clientWidth`).
- Confirm minimum 44px touch targets on mobile.

## Step 5: Verify Contrast & Accessibility
- Verify WCAG 2.2 AA contrast ($\ge 4.5:1$).
- Verify close buttons, focus rings, and `aria-label` tags.

## Step 6: Execute Automated Verification
```bash
pnpm test:e2e
```

## Step 7: Report Improvements
- Report the specific visual changes, responsive fixes, and verification results.

