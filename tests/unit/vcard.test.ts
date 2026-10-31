import { describe, it, expect } from "vitest";
import { generateVCardString } from "@/features/vcard/vcard.utils";
import { sellerConfig } from "@/config/seller";

describe("vCard Business Card Generation", () => {
  it("formats compliant vCard 3.0 content with seller contact details", () => {
    const vcard = generateVCardString();

    expect(vcard).toContain("BEGIN:VCARD");
    expect(vcard).toContain("VERSION:3.0");
    expect(vcard).toContain(`FN:${sellerConfig.name}`);
    expect(vcard).toContain(`TEL;TYPE=CELL,VOICE:${sellerConfig.phone}`);
    expect(vcard).toContain(`EMAIL;TYPE=INTERNET:${sellerConfig.email}`);
    expect(vcard).toContain("https://t.me/");
    expect(vcard).toContain("END:VCARD");
  });
});
