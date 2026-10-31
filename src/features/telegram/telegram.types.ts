import { Locale } from "@/types";

export interface TelegramMessagePayload {
  customerName?: string;
  phoneNumber?: string;
  packageName: string;
  packageSpeed: string;
  packagePrice: string;
  installationLocation?: string;
  notes?: string;
  locale?: Locale;
}

export interface TelegramLinks {
  /** Opens Telegram share prompt where user can select the seller */
  shareUrl: string;
  /** Direct web link to the seller's Telegram profile/chat */
  directChatUrl: string;
  /** Direct native app link to the seller's profile/chat */
  appDirectUrl: string;
  /** Native app share deep link */
  deepLinkUrl: string;
  /** Formatted raw text suitable for clipboard */
  formattedText: string;
}
