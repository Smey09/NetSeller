import { describe, it, expect, beforeEach } from "vitest";
import { PrivacyAnalytics } from "@/lib/analytics";

describe("PrivacyAnalytics Tracking", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("records events locally and aggregates counts", () => {
    PrivacyAnalytics.track("page_view");
    PrivacyAnalytics.track("package_click", { packageId: "pkg-standard" });
    PrivacyAnalytics.track("telegram_click");

    const summary = PrivacyAnalytics.getSummary();
    expect(summary.totalPageViews).toBe(1);
    expect(summary.packageClicks).toBe(1);
    expect(summary.telegramClicks).toBe(1);
  });
});
