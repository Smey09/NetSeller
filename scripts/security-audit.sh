#!/usr/bin/env bash
# ==============================================================================
# NetSeller - Next.js Security Audit Script
# Validates secrets, dependencies, headers, types, and server boundaries.
# ==============================================================================
set -euo pipefail

echo "================================================================="
echo "  NetSeller Security Audit & Quality Verification"
echo "================================================================="

FAILED=0

# 1. Secret leakage scan in client bundles
echo -n "1. Checking for secret tokens in client components... "
SECRET_MATCHES=$(grep -rnE "(TELEGRAM_BOT_TOKEN|ADMIN_PIN)" src/components/ src/hooks/ 2>/dev/null || true)
if [ -n "$SECRET_MATCHES" ]; then
  echo "FAILED"
  echo "   [!] Sensitive token references detected in client components:"
  echo "$SECRET_MATCHES"
  FAILED=1
else
  echo "PASSED (0 exposed secrets)"
fi

# 2. Check for dangerous HTML injections
echo -n "2. Checking for unescaped dangerouslySetInnerHTML... "
HTML_MATCHES=$(grep -rn "dangerouslySetInnerHTML" src/ | grep -v "JSON.stringify(jsonLd)" || true)
if [ -n "$HTML_MATCHES" ]; then
  echo "WARNING"
  echo "   [!] Non-JSON-LD dangerouslySetInnerHTML found in codebase:"
  echo "$HTML_MATCHES"
else
  echo "PASSED (0 unescaped dangerouslySetInnerHTML, only structured SEO JSON-LD)"
fi

# 3. Check for .env files committed to git
echo -n "3. Verifying Git ignore rules for environment files... "
if git check-ignore -q .env .env.local .env.production 2>/dev/null; then
  echo "PASSED (.env files properly gitignored)"
else
  echo "WARNING (verify .gitignore for .env entries)"
fi

# 4. TypeScript Type Safety & Boundary Check
echo -n "4. Running strict TypeScript type check... "
if pnpm tsc --noEmit > /dev/null 2>&1; then
  echo "PASSED (0 type errors)"
else
  echo "FAILED"
  pnpm tsc --noEmit
  FAILED=1
fi

# 5. ESLint Security & Boundary Check
echo -n "5. Running ESLint static analysis... "
if pnpm lint > /dev/null 2>&1; then
  echo "PASSED (0 lint warnings/errors)"
else
  echo "FAILED"
  pnpm lint
  FAILED=1
fi

# 6. Dependency Vulnerability Audit
echo -n "6. Running dependency vulnerability audit... "
if pnpm audit --audit-level=high > /dev/null 2>&1; then
  echo "PASSED (No high/critical CVEs)"
else
  echo "WARNING (Run 'pnpm audit' to inspect advisories)"
fi

# 7. Unit Tests & Admin Validation Schemas
echo -n "7. Running unit test suite (schemas & route handlers)... "
if pnpm test > /dev/null 2>&1; then
  echo "PASSED (All unit tests green)"
else
  echo "FAILED"
  pnpm test
  FAILED=1
fi

echo "================================================================="
if [ "$FAILED" -eq 0 ]; then
  echo "  ✅ NetSeller Security Audit Completed: ALL GATES PASSED"
  echo "================================================================="
  exit 0
else
  echo "  ❌ NetSeller Security Audit: ISSUES DETECTED"
  echo "================================================================="
  exit 1
fi
