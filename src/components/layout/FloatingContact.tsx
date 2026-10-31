"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  Send,
  Phone,
  X,
  MessageCircle,
  QrCode,
  ShieldCheck,
  ChevronUp,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const t = useTranslations("speedDial");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTelegramClick = () => {
    PrivacyAnalytics.track("telegram_click", { location: "floating_widget" });
  };

  const handleCallClick = () => {
    PrivacyAnalytics.track("call_click", { location: "floating_widget" });
  };

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-2.5">
      {/* Expanded Quick Contact Action Menu */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-3 shadow-2xl space-y-2 mb-1 w-64 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("quickContact")}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              aria-label={t("closeMenu")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Action 1: Telegram Direct */}
          <a
            href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50 text-slate-800 transition-colors group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#229ED9] text-white shadow-xs group-hover:scale-105 transition-transform">
              <Send className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-tight">{t("chatTelegram")}</span>
              <span className="text-[11px] text-slate-500">{t("fastReply")}</span>
            </div>
          </a>

          {/* Action 2: Phone Hotline */}
          <a
            href={`tel:${sellerConfig.phone}`}
            onClick={handleCallClick}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 transition-colors group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs group-hover:scale-105 transition-transform">
              <Phone className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-tight">{t("directCall")}</span>
              <span className="text-[11px] text-slate-500">{sellerConfig.phoneDisplay}</span>
            </div>
          </a>

          {/* Action 3: Digital Business Card View */}
          <Link
            href="/card"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs group-hover:scale-105 transition-transform">
              <QrCode className="h-4 w-4 text-primary-400" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-tight">{t("digitalCard")}</span>
              <span className="text-[11px] text-slate-500">{t("saveVcard")}</span>
            </div>
          </Link>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center gap-2 rounded-full p-3.5 sm:px-4 sm:py-3 text-white shadow-lg shadow-[#229ED9]/35 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#229ED9]",
          isOpen ? "bg-slate-900" : "bg-[#229ED9] hover:bg-[#1E88C7]"
        )}
        aria-label={t("ariaLabel")}
        aria-expanded={isOpen}
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
          </span>
        )}

        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
              {t("chatTelegram")}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
