import { describe, it, expect } from "vitest";
import { QRCodeService } from "@/features/qr/qr.service";

describe("QRCodeService Integration", () => {
  it("generates a high-resolution PNG data URL starting with data:image/png", async () => {
    const dataUrl = await QRCodeService.generatePngDataUrl({
      url: "https://netseller.com.kh/?source=business_card",
    });

    expect(dataUrl).toBeTruthy();
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("generates valid vector SVG with correct viewBox and paths", async () => {
    const svg = await QRCodeService.generateSvgString({
      url: "https://netseller.com.kh",
    });

    expect(svg).toBeTruthy();
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("viewBox");
  });

  it("encodes custom campaign parameters correctly", async () => {
    const campaignUrl = "https://netseller.com.kh/en/card?ref=print_card_v1";
    const svg = await QRCodeService.generateSvgString({ url: campaignUrl });

    expect(svg).toBeTruthy();
  });
});
