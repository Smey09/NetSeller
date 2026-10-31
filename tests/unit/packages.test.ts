import { describe, it, expect } from "vitest";
import { internetPackages } from "@/data/packages";
import { promotionsData } from "@/data/promotions";
import { sellerConfig } from "@/config/seller";

describe("Internet Packages and Seller Data Integrity", () => {
  it("contains all required example packages with positive speed and price", () => {
    expect(internetPackages.length).toBeGreaterThanOrEqual(4);

    internetPackages.forEach((pkg) => {
      expect(pkg.id).toBeTruthy();
      expect(pkg.name).toBeTruthy();
      expect(pkg.speedMbps).toBeGreaterThan(0);
      expect(pkg.monthlyPriceUsd).toBeGreaterThan(0);
      expect(pkg.routerIncluded).toBeTruthy();
      expect(pkg.features.length).toBeGreaterThan(0);
      expect(pkg.featuresKm.length).toBeGreaterThan(0);
      expect(pkg.equipmentTermsEn).toBeTruthy();
      expect(pkg.equipmentTermsKm).toBeTruthy();
    });
  });

  it("has centralized seller configuration without hardcoded bot tokens", () => {
    expect(sellerConfig.name).toBeTruthy();
    expect(sellerConfig.telegramUsername).toBeTruthy();
    expect(sellerConfig.phone).toBeTruthy();
    expect(sellerConfig.serviceAreas.length).toBeGreaterThan(0);

    // Verify no secret token exposed in client config
    expect((sellerConfig as any).telegramBotToken).toBeUndefined();
    expect((sellerConfig as any).botToken).toBeUndefined();
  });

  it("contains valid promotions data with expiration and descriptions", () => {
    expect(promotionsData.length).toBeGreaterThan(0);
    promotionsData.forEach((promo) => {
      expect(promo.titleEn).toBeTruthy();
      expect(promo.titleKm).toBeTruthy();
      expect(promo.validUntil).toBeTruthy();
    });
  });
});

