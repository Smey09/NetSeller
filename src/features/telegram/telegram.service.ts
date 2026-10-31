import { sellerConfig } from "@/config/seller";
import { TelegramLinks, TelegramMessagePayload } from "./telegram.types";
import { formatTelegramMessage, generateTelegramLinks } from "./telegram.utils";

export class TelegramService {
  /**
   * Prepares the Telegram message and links for an inquiry.
   */
  public static prepareInquiry(payload: TelegramMessagePayload): TelegramLinks {
    const formattedText = formatTelegramMessage(payload);
    return generateTelegramLinks(sellerConfig.telegramUsername, formattedText);
  }

  /**
   * Dispatches the user to Telegram safely in a new window/tab,
   * with fallbacks.
   */
  public static openTelegram(links: TelegramLinks, mode: "direct" | "share" = "direct"): void {
    if (typeof window === "undefined") return;

    if (mode === "share") {
      window.open(links.shareUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open(links.directChatUrl, "_blank", "noopener,noreferrer");
    }
  }

  /**
   * Copies formatted text to clipboard as an assisted workflow.
   */
  public static async copyToClipboard(text: string): Promise<boolean> {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
}
