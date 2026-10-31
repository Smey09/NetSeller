"use client";

export interface AnalyticsEvent {
  event: "page_view" | "qr_scan_visit" | "package_click" | "telegram_click" | "call_click";
  properties?: Record<string, string | number | boolean>;
  timestamp: number;
}

const STORAGE_KEY = "netseller_analytics_events";

export class PrivacyAnalytics {
  /**
   * Tracks an event locally without collecting any personal data or IP.
   */
  public static track(
    event: AnalyticsEvent["event"],
    properties?: Record<string, string | number | boolean>
  ): void {
    if (typeof window === "undefined") return;

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const events: AnalyticsEvent[] = existingStr ? JSON.parse(existingStr) : [];

      const newEvent: AnalyticsEvent = {
        event,
        properties,
        timestamp: Date.now(),
      };

      // Keep only last 100 aggregated events locally
      const updated = [...events.slice(-99), newEvent];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Check if QR campaign visit
      if (event === "page_view") {
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get("source") || urlParams.get("utm_source") || urlParams.get("ref");
        if (source === "qr" || source === "card" || source === "business_card" || source === "qr_card") {
          this.track("qr_scan_visit", { source });
        }
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }

  /**
   * Retrieves summary counts for the seller.
   */
  public static getSummary(): {
    totalPageViews: number;
    qrVisits: number;
    packageClicks: number;
    telegramClicks: number;
  } {
    if (typeof window === "undefined") {
      return { totalPageViews: 0, qrVisits: 0, packageClicks: 0, telegramClicks: 0 };
    }

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const events: AnalyticsEvent[] = existingStr ? JSON.parse(existingStr) : [];

      return {
        totalPageViews: events.filter((e) => e.event === "page_view").length,
        qrVisits: events.filter((e) => e.event === "qr_scan_visit").length,
        packageClicks: events.filter((e) => e.event === "package_click").length,
        telegramClicks: events.filter((e) => e.event === "telegram_click").length,
      };
    } catch {
      return { totalPageViews: 0, qrVisits: 0, packageClicks: 0, telegramClicks: 0 };
    }
  }
}

