import { NextResponse } from "next/server";
import { generateVCardString } from "@/features/vcard/vcard.utils";
import { sellerConfig } from "@/config/seller";

export async function GET() {
  const vcard = generateVCardString();
  const filename = `${sellerConfig.name.replace(/\s+/g, "_")}.vcf`;

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

