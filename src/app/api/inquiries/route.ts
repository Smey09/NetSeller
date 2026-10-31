import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { internetPackages } from "@/data/packages";
import { formatTelegramMessage } from "@/features/telegram/telegram.utils";

const apiInquirySchema = z.object({
  customerName: z.string().trim().max(100).optional().default(""),
  phoneNumber: z.string().trim().max(30).optional().default(""),
  selectedPackageId: z.string().min(1).default("pkg-general"),
  installationLocation: z.string().trim().max(250).optional().default(""),
  notes: z.string().max(1000).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = apiInquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { customerName, phoneNumber, selectedPackageId, installationLocation, notes } =
      result.data;

    const matchedPkg = internetPackages.find((p) => p.id === selectedPackageId);
    const packageName = matchedPkg ? matchedPkg.name : "Custom Package";
    const packageSpeed = matchedPkg ? `${matchedPkg.speedMbps} Mbps` : "N/A";
    const packagePrice = matchedPkg ? `$${matchedPkg.monthlyPriceUsd}/mo` : "N/A";

    const summaryText = formatTelegramMessage({
      customerName,
      phoneNumber,
      packageName,
      packageSpeed,
      packagePrice,
      installationLocation,
      notes,
    });

    // Optional server-side notification if bot token is provided in server environment
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `[New NetSeller Web Inquiry]\n\n${summaryText}`,
          }),
        });
      } catch (err) {
        console.error("Failed to forward inquiry to Telegram Bot:", err);
      }
    }

    const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Inquiry recorded successfully.",
      summaryText,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

