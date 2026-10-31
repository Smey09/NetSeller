import { TelegramLinks, TelegramMessagePayload } from "./telegram.types";

/**
 * Formats a clean, readable Telegram inquiry message in English or Khmer.
 */
export function formatTelegramMessage(payload: TelegramMessagePayload): string {
  const isKm = payload.locale === "km";

  if (isKm) {
    let msg = `សួស្តីបង! ខ្ញុំមានចំណាប់អារម្មណ៍ចង់ភ្ជាប់សេវាអ៊ីនធឺណិត NetSeller។\n\n`;
    msg += `📦 កញ្ចប់៖ ${payload.packageName}\n`;
    msg += `⚡ ល្បឿន៖ ${payload.packageSpeed}\n`;
    msg += `💵 តម្លៃប្រចាំខែ៖ ${payload.packagePrice}\n`;

    if (payload.customerName && payload.customerName.trim().length > 0) {
      msg += `👤 ឈ្មោះអតិថិជន៖ ${payload.customerName.trim()}\n`;
    }
    if (payload.phoneNumber && payload.phoneNumber.trim().length > 0) {
      msg += `📞 លេខទូរស័ព្ទ៖ ${payload.phoneNumber.trim()}\n`;
    }
    if (payload.installationLocation && payload.installationLocation.trim().length > 0) {
      msg += `📍 ទីតាំងដំឡើង៖ ${payload.installationLocation.trim()}\n`;
    }

    if (payload.notes && payload.notes.trim().length > 0) {
      msg += `📝 ចំណាំបន្ថែម៖ ${payload.notes.trim()}\n`;
    }

    msg += `\nសូមបងជួយណែនាំ និងរៀបចំដំណើរការភ្ជាប់សេវាជូនខ្ញុំផង។\n\nសូមអរគុណ!`;
    return msg;
  }

  // English default matching spec exactly:
  let msg = `Hello! I am interested in subscribing to your Internet package.\n\n`;
  msg += `Package: ${payload.packageName}\n`;
  msg += `Speed: ${payload.packageSpeed}\n`;
  msg += `Monthly Price: ${payload.packagePrice}\n`;

  if (payload.customerName && payload.customerName.trim().length > 0) {
    msg += `Customer Name: ${payload.customerName.trim()}\n`;
  }
  if (payload.phoneNumber && payload.phoneNumber.trim().length > 0) {
    msg += `Phone: ${payload.phoneNumber.trim()}\n`;
  }
  if (payload.installationLocation && payload.installationLocation.trim().length > 0) {
    msg += `Installation Location: ${payload.installationLocation.trim()}\n`;
  }

  if (payload.notes && payload.notes.trim().length > 0) {
    msg += `Additional Notes: ${payload.notes.trim()}\n`;
  }

  msg += `\nPlease help me with the subscription process.\n\nThank you!`;
  return msg;
}

/**
 * Builds safe Telegram dispatch URLs.
 * Telegram web/app supports:
 * - Direct profile/chat: https://t.me/<username>
 * - Native app direct chat: tg://resolve?domain=<username>
 * - Sharing link with prefilled text: https://t.me/share/url?text=<encoded_text>
 * - Native app share: tg://msg_url?text=...
 */
export function generateTelegramLinks(
  telegramUsername: string,
  formattedText: string
): TelegramLinks {
  const sanitizedUsername = telegramUsername.replace(/^@/, "").trim();
  const encodedText = encodeURIComponent(formattedText);

  const shareUrl = `https://t.me/share/url?url=&text=${encodedText}`;
  const directChatUrl = `https://t.me/${sanitizedUsername}`;
  const appDirectUrl = `tg://resolve?domain=${sanitizedUsername}`;
  const deepLinkUrl = `tg://msg_url?url=&text=${encodedText}`;

  return {
    shareUrl,
    directChatUrl,
    appDirectUrl,
    deepLinkUrl,
    formattedText,
  };
}
