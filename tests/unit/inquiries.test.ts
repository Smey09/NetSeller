import { describe, it, expect, vi } from "vitest";
import { POST } from "@/app/api/inquiries/route";
import { NextRequest } from "next/server";

describe("Inquiries API Endpoint (/api/inquiries)", () => {
  it("accepts and processes a full inquiry payload", async () => {
    const req = new NextRequest("http://localhost:3000/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Chan Dara",
        phoneNumber: "012345678",
        selectedPackageId: "fiber-starter-50",
        installationLocation: "Toul Kork, Phnom Penh",
        notes: "Install near router box",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.inquiryId).toMatch(/^INQ-/);
    expect(data.summaryText).toContain("Chan Dara");
    expect(data.summaryText).toContain("012345678");
  });

  it("accepts quick inquiries with minimal or empty contact details", async () => {
    const req = new NextRequest("http://localhost:3000/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Telegram Quick Visitor",
        phoneNumber: "",
        selectedPackageId: "pkg-quick",
        installationLocation: "coverage",
        notes: "Quick check coverage",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.inquiryId).toMatch(/^INQ-/);
  });

  it("handles malformed JSON gracefully", async () => {
    const req = new NextRequest("http://localhost:3000/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const data = await res.json();
    expect(data.success).toBe(false);
  });
});

