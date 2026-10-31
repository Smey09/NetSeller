import { sellerConfig } from "@/config/seller";
import { siteConfig } from "@/config/site";

export function generateVCardString(): string {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${sellerConfig.name}`,
    `N:Consultant;NetSeller;;;`,
    `TITLE:${sellerConfig.titleEn}`,
    `ORG:NetSeller Cambodia`,
    `TEL;TYPE=CELL,VOICE:${sellerConfig.phone}`,
    `EMAIL;TYPE=INTERNET:${sellerConfig.email}`,
    `URL:${siteConfig.url}`,
    `X-SOCIALPROFILE;type=telegram:https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`,
    `NOTE:Official Cambodian Fiber Internet Consultant. Telegram: @${sellerConfig.telegramUsername.replace(/^@/, "")} | Working hours: ${sellerConfig.workingHours}`,
    "END:VCARD",
  ].join("\r\n");

  return vcard;
}

export function downloadVCard(): void {
  if (typeof window === "undefined") return;

  const vcardContent = generateVCardString();
  const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${sellerConfig.name.replace(/\s+/g, "_")}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

