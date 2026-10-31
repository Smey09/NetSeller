import { describe, it, expect } from "vitest";
import { formatTelegramMessage, generateTelegramLinks } from "@/features/telegram/telegram.utils";

describe("Telegram Message and Link Formatting", () => {
  it("formats English inquiry message correctly matching specifications", () => {
    const payload = {
      packageName: "Premium",
      packageSpeed: "100 Mbps",
      packagePrice: "$30",
      customerName: "John",
      phoneNumber: "012345678",
      installationLocation: "Phnom Penh",
      notes: "Please call before coming",
      locale: "en" as const,
    };

    const message = formatTelegramMessage(payload);

    expect(message).toContain("Hello! I am interested in subscribing to your Internet package.");
    expect(message).toContain("Package: Premium");
    expect(message).toContain("Speed: 100 Mbps");
    expect(message).toContain("Monthly Price: $30");
    expect(message).toContain("Customer Name: John");
    expect(message).toContain("Phone: 012345678");
    expect(message).toContain("Installation Location: Phnom Penh");
    expect(message).toContain("Additional Notes: Please call before coming");
    expect(message).toContain("Please help me with the subscription process.");
    expect(message).toContain("Thank you!");
  });

  it("formats Khmer inquiry message correctly", () => {
    const payload = {
      packageName: "Family Standard",
      packageSpeed: "50 Mbps",
      packagePrice: "$20",
      customerName: "សុខា",
      phoneNumber: "098765432",
      installationLocation: "ទួលគោក ភ្នំពេញ",
      locale: "km" as const,
    };

    const message = formatTelegramMessage(payload);

    expect(message).toContain("សួស្តីបង! ខ្ញុំមានចំណាប់អារម្មណ៍ចង់ភ្ជាប់សេវាអ៊ីនធឺណិត NetSeller។");
    expect(message).toContain("កញ្ចប់៖ Family Standard");
    expect(message).toContain("ល្បឿន៖ 50 Mbps");
    expect(message).toContain("តម្លៃប្រចាំខែ៖ $20");
    expect(message).toContain("ឈ្មោះអតិថិជន៖ សុខា");
    expect(message).toContain("លេខទូរស័ព្ទ៖ 098765432");
    expect(message).toContain("ទីតាំងដំឡើង៖ ទួលគោក ភ្នំពេញ");
    expect(message).toContain("សូមបងជួយណែនាំ និងរៀបចំដំណើរការភ្ជាប់សេវាជូនខ្ញុំផង។");
    expect(message).toContain("សូមអរគុណ!");
  });

  it("generates safe and properly encoded Telegram URLs", () => {
    const text = "Hello! Package: Premium\nSpeed: 100 Mbps";
    const links = generateTelegramLinks("NetSellerKH", text);

    expect(links.directChatUrl).toBe("https://t.me/NetSellerKH");
    expect(links.appDirectUrl).toBe("tg://resolve?domain=NetSellerKH");
    expect(links.shareUrl).toContain("https://t.me/share/url?url=&text=");
    expect(links.shareUrl).toContain(encodeURIComponent(text));
    expect(links.deepLinkUrl).toContain("tg://msg_url?url=&text=");
  });

  it("sanitizes @ in telegram username if provided", () => {
    const links = generateTelegramLinks("@CustomSeller", "Test");
    expect(links.directChatUrl).toBe("https://t.me/CustomSeller");
  });
});

