import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3055",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chrome (1440px)",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome (375x667)",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 375, height: 667 },
        isMobile: true,
      },
    },
    {
      name: "Mobile 320px",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 320, height: 640 },
        isMobile: true,
      },
    },
    {
      name: "Tablet 768px",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: "pnpm start -p 3055",
    url: "http://localhost:3055",
    reuseExistingServer: true,
    timeout: 30 * 1000,
  },
});
