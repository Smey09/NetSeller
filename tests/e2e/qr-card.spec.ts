import { test, expect } from "@playwright/test";

test.describe("QR Code Business Card & Mobile Landing Experience", () => {
  test("displays QR scan welcome banner when scanned with campaign param", async ({ page }) => {
    await page.goto("/en?source=business_card");

    // Check QR welcome banner is visible
    const qrBanner = page.getByText(/scanned the seller's physical business card/i);
    await expect(qrBanner).toBeVisible();

    // Check seller identity appears immediately on the first fold
    await expect(page.getByText("NetSeller Consultant").first()).toBeVisible();
    await expect(page.getByText(/Internet & Fiber Sales Consultant/i).first()).toBeVisible();
  });

  test("renders Digital Business Card (/card) with contact actions", async ({ page }) => {
    await page.goto("/en/card");

    // Verify seller header, name, title, and verified badge
    await expect(page.getByRole("heading", { level: 1 })).toContainText("NetSeller Consultant");
    await expect(page.getByText(/Internet & Fiber Sales Consultant/i)).toBeVisible();

    // Verify Telegram, Hotline Call, and Save Contact buttons
    await expect(page.getByRole("button", { name: /Chat on Telegram/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Call Hotline/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Save Contact/i })).toBeVisible();

    // Verify packages section is present on card page
    await expect(page.getByText(/Select Your Plan & Order/i)).toBeVisible();
  });

  test("renders QR Code Generator (/qr) for the seller", async ({ page }) => {
    await page.goto("/en/qr");

    await expect(page.getByRole("heading", { level: 2 })).toContainText("Business Card QR Integration");
    await expect(page.getByRole("button", { name: /Download SVG/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Download PNG/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Copy/i })).toBeVisible();
  });

  test("contact actions respond according to viewport", async ({ page, isMobile }) => {
    await page.goto("/en");

    if (!isMobile) {
      const floatingBtn = page.getByRole("button", { name: /Open Quick Contact/i });
      await expect(floatingBtn).toBeVisible();
      await floatingBtn.click();

      // Check revealed actions inside floating widget
      await expect(page.getByText("Quick Contact")).toBeVisible();
      await expect(page.getByRole("link", { name: /Chat on Telegram/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /Direct Phone Call/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /Digital Business Card/i }).last()).toBeVisible();
    } else {
      // On mobile viewports, bottom navigation bar handles direct contact
      const mobileNav = page.locator("nav[aria-label='Mobile Navigation']");
      await expect(mobileNav).toBeVisible();
      await expect(page.getByRole("link", { name: /Telegram/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Call/i }).first()).toBeVisible();
    }
  });
});
