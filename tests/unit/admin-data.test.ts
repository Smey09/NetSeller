import { describe, it, expect } from "vitest";
import { packageSchema, promotionSchema, adminDataPayloadSchema } from "@/lib/validations/admin-data.schema";
import { DataService } from "@/lib/data-service";
import packagesJson from "@/data/packages.json";
import promotionsJson from "@/data/promotions.json";
import { GET, POST } from "@/app/api/admin/data/route";
import { NextRequest } from "next/server";

describe("JSON Data Architecture & Admin Validations", () => {
  it("loads packages.json and validates against packageSchema", () => {
    expect(packagesJson.length).toBeGreaterThanOrEqual(4);
    for (const pkg of packagesJson) {
      const result = packageSchema.safeParse(pkg);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.speedMbps).toBeGreaterThan(0);
        expect(result.data.monthlyPriceUsd).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("loads promotions.json and validates against promotionSchema", () => {
    expect(promotionsJson.length).toBeGreaterThanOrEqual(3);
    for (const promo of promotionsJson) {
      const result = promotionSchema.safeParse(promo);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.titleEn.length).toBeGreaterThan(0);
        expect(result.data.titleKm.length).toBeGreaterThan(0);
      }
    }
  });

  it("rejects invalid package schemas (e.g. missing name or negative price)", () => {
    const invalidPkg = {
      id: "test",
      name: "",
      monthlyPriceUsd: -10,
    };
    const result = packageSchema.safeParse(invalidPkg);
    expect(result.success).toBe(false);
  });

  it("validates full admin data payload", () => {
    const payload = {
      packages: packagesJson,
      promotions: promotionsJson,
    };
    const result = adminDataPayloadSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("DataService retrieves packages and promotions successfully", async () => {
    const pkgs = await DataService.getPackages();
    const promos = await DataService.getPromotions();
    expect(Array.isArray(pkgs)).toBe(true);
    expect(Array.isArray(promos)).toBe(true);
    expect(pkgs.length).toBeGreaterThan(0);
    expect(promos.length).toBeGreaterThan(0);
  });
});

describe("Admin Data API Endpoint (/api/admin/data)", () => {
  it("GET returns packages and promotions data", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.packages)).toBe(true);
    expect(Array.isArray(data.promotions)).toBe(true);
  });

  it("POST rejects unauthorized requests with wrong PIN", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": "wrong-pin",
      },
      body: JSON.stringify({ packages: [], promotions: [] }),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });

  it("POST accepts authorized payload and updates website data", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": "seller2026",
      },
      body: JSON.stringify({
        adminPin: "seller2026",
        packages: packagesJson,
        promotions: promotionsJson,
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.packages.length).toBe(packagesJson.length);
  });
});

