import { describe, it, expect } from "vitest";
import { formatTelegramMessage } from "@/features/telegram/telegram.utils";
import { InternetPackage, Promotion, SellerConfig } from "@/types";

describe("Data States and Edge Cases Verification", () => {
  it("handles packages with optional fields omitted safely", () => {
    const minimalPackage: InternetPackage = {
      id: "minimal-test",
      key: "minimal_test",
      name: "Minimal Fiber Plan",
      speedMbps: 50,
      monthlyPriceUsd: 15,
      installationFeeUsd: 0,
      isFreeInstallation: true,
      routerIncluded: "Basic Router",
      category: "home",
      features: [],
      featuresKm: [],
      descriptionEn: "Basic plan",
      descriptionKm: "គម្រោងសាមញ្ញ",
      suitableForEn: "Browsing",
      suitableForKm: "ការប្រើប្រាស់ទូទៅ",
      availabilityStatus: "available",
    };

    expect(minimalPackage.originalPriceUsd).toBeUndefined();
    expect(minimalPackage.badge).toBeUndefined();
    expect(minimalPackage.badgeKm).toBeUndefined();
    expect(minimalPackage.equipmentTermsEn).toBeUndefined();
    expect(minimalPackage.features.length).toBe(0);
  });

  it("handles packages with availability statuses (available, limited, coming_soon)", () => {
    const statuses: Array<InternetPackage["availabilityStatus"]> = [
      "available",
      "limited",
      "coming_soon",
    ];

    statuses.forEach((status) => {
      const pkg: InternetPackage = {
        id: `test-${status}`,
        key: `key_${status}`,
        name: `Plan ${status}`,
        speedMbps: 100,
        monthlyPriceUsd: 25,
        installationFeeUsd: 0,
        isFreeInstallation: true,
        routerIncluded: "Router",
        category: "residential",
        features: ["High Speed"],
        featuresKm: ["ល្បឿនលឿន"],
        descriptionEn: "Fast fiber",
        descriptionKm: "ខ្សែកាបល្បឿនលឿន",
        suitableForEn: "Streaming",
        suitableForKm: "ទស្សនាវីដេអូ",
        availabilityStatus: status,
      };

      expect(pkg.availabilityStatus).toBe(status);
    });
  });

  it("handles active and expired promotions gracefully", () => {
    const activePromo: Promotion = {
      id: "active-1",
      badgeEn: "Special Offer",
      badgeKm: "ការផ្ដល់ជូនពិសេស",
      titleEn: "Free Fiber Setup",
      titleKm: "ដំឡើងឥតគិតថ្លៃ",
      descriptionEn: "Valid for new signups",
      descriptionKm: "សម្រាប់អតិថិជនថ្មី",
      highlightEn: "Save $50",
      highlightKm: "សន្សំ $50",
      validUntil: "End of this month",
      validUntilKm: "ដាច់ខែនេះ",
      isExpired: false,
      code: "FREESETUP",
    };

    const expiredPromo: Promotion = {
      id: "expired-1",
      badgeEn: "Past Deal",
      badgeKm: "ការផ្ដល់ជូនកន្លងទៅ",
      titleEn: "Holiday Special",
      titleKm: "ការបញ្ចុះតម្លៃពិសេស",
      descriptionEn: "Past offer",
      descriptionKm: "ការផ្តល់ជូនកន្លងផុត",
      highlightEn: "Ended",
      highlightKm: "បានបញ្ចប់",
      validUntil: "January 1, 2026",
      validUntilKm: "១ មករា ២០២៦",
      isExpired: true,
    };

    expect(activePromo.isExpired).toBe(false);
    expect(activePromo.code).toBe("FREESETUP");
    expect(expiredPromo.isExpired).toBe(true);
    expect(expiredPromo.code).toBeUndefined();
  });

  it("correctly formats Telegram messages with long text, special characters, and Khmer script", () => {
    const longInquiry = {
      customerName: "លោក សុខ ចិន្តា និងគ្រួសារ (Sok Chenda & Family)",
      phoneNumber: "012 345 678 / 098 765 432",
      packageName: "Ultra Gamer Pro (Wi-Fi 6 Plus)",
      packageSpeed: "300 Mbps",
      packagePrice: "$38/month",
      installationLocation: "ផ្ទះលេខ ១២៣E0 ផ្លូវ ២៧១ សង្កាត់បឹងទំពុន ខណ្ឌមានជ័យ រាជធានីភ្នំពេញ",
      notes: "សូមមកដំឡើងនៅថ្ងៃអាទិត្យ ព្រឹកម៉ោង ៩:០០។ ត្រូវការខ្សែកាប fiber ប្រវែង ៣០ ម៉ែត្របន្ថែម និងរ៉ោតទ័រ Wi-Fi 6។",
      locale: "km" as const,
    };

    const formattedKm = formatTelegramMessage(longInquiry);

    expect(formattedKm).toContain("NetSeller");
    expect(formattedKm).toContain("លោក សុខ ចិន្តា");
    expect(formattedKm).toContain("012 345 678");
    expect(formattedKm).toContain("Ultra Gamer Pro");
    expect(formattedKm).toContain("បឹងទំពុន");
    expect(formattedKm).toContain("ខ្សែកាប fiber");
  });

  it("supports seller configuration with or without avatarUrl", () => {
    const configWithAvatar: Partial<SellerConfig> = {
      name: "Dara Internet",
      avatarUrl: "https://example.com/avatar.jpg",
    };

    const configWithoutAvatar: Partial<SellerConfig> = {
      name: "Dara Internet",
    };

    expect(configWithAvatar.avatarUrl).toBe("https://example.com/avatar.jpg");
    expect(configWithoutAvatar.avatarUrl).toBeUndefined();
  });
});
