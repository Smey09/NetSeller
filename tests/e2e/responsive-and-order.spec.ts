import { test, expect } from "@playwright/test";

const viewports = [
  { name: "Mobile 320px", width: 320, height: 640 },
  { name: "Mobile 375px", width: 375, height: 667 },
  { name: "Mobile 414px", width: 414, height: 896 },
  { name: "Tablet 768px", width: 768, height: 1024 },
  { name: "Desktop 1440px", width: 1440, height: 900 },
];

test.describe("NetSeller Responsive Layout & No Horizontal Overflow", () => {
  for (const vp of viewports) {
    test(`renders without horizontal overflow at ${vp.name} (${vp.width}x${vp.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/en");

      // Wait for page to fully load
      await page.waitForLoadState("domcontentloaded");

      // Verify no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > window.innerWidth ||
          document.body.scrollWidth > window.innerWidth
        );
      });

      expect(hasHorizontalScroll).toBe(false);
    });
  }
});

test.describe("NetSeller User Journey: Discover -> Select -> Buy Now -> Telegram", () => {
  test("allows selecting a package and preparing Telegram message", async ({ page }) => {
    await page.goto("/en");

    // Check Hero and Packages presence
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Click Buy Now on the first package card
    const buyNowBtn = page.getByRole("button", { name: /Buy Now for/i }).first();
    await buyNowBtn.scrollIntoViewIfNeeded();
    await buyNowBtn.click();

    // Verify order dialog opens
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Fill customer details in dialog
    await page.fill("#customerName", "Sokha Chan");
    await page.fill("#phoneNumber", "012345678");
    await page.fill("#installationLocation", "Khan Toul Kork, Phnom Penh");

    // Click Proceed to Telegram
    const proceedBtn = page.getByRole("button", { name: /Continue to Telegram/i });
    await proceedBtn.click();

    // Verify Step 2 review appears with Telegram action button
    const openTelegramBtn = page.getByRole("button", { name: /Open in Telegram Chat/i });
    await expect(openTelegramBtn).toBeVisible();

    // Verify message preview contains the entered data
    const messageBox = page.getByTestId("telegram-message-preview");
    await expect(messageBox).toContainText("Sokha Chan");
    await expect(messageBox).toContainText("012345678");
    await expect(messageBox).toContainText("Khan Toul Kork, Phnom Penh");
  });

  test("switches language between English and Khmer preserving page", async ({ page }) => {
    await page.goto("/en");

    // Check English text
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Fast, Reliable Internet");

    // Switch to Khmer
    const khmerLink = page.getByRole("link", { name: /ខ្មែរ/i }).first();
    await khmerLink.click();

    // Should redirect to /km
    await page.waitForURL(/\/km/);

    // Verify Khmer text
    await expect(page.getByRole("heading", { level: 1 })).toContainText("អ៊ីនធឺណិត");
  });
});
