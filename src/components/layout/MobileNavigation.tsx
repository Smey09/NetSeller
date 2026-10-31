"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import { Home, Package, Send, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const handleCallClick = () => {
    PrivacyAnalytics.track("call_click", { location: "mobile_bottom_bar" });
  };

  const handleTelegramClick = () => {
    PrivacyAnalytics.track("telegram_click", { location: "mobile_bottom_bar" });
  };

  return (
    <nav
      role="navigation"
      aria-label={t("mobileNavAria")}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="grid grid-cols-4 items-center justify-around gap-1 max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          aria-label={t("home")}
          className={cn(
            "flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-colors",
            pathname === "/"
              ? "text-primary-600 bg-primary-50"
              : "text-slate-600 hover:text-primary-600"
          )}
        >
          <Home className="h-5 w-5 mb-0.5" />
          <span className="truncate">{t("home")}</span>
        </Link>

        {/* Home Wi-Fi Packages */}
        <Link
          href="/#packages"
          aria-label={t("packages")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold text-slate-600 hover:text-primary-600 transition-colors"
        >
          <Package className="h-5 w-5 mb-0.5" />
          <span className="truncate">{t("packages")}</span>
        </Link>

        {/* Call Direct */}
        <a
          href={`tel:${sellerConfig.phone}`}
          onClick={handleCallClick}
          aria-label={t("callNow")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <PhoneCall className="h-5 w-5 mb-0.5 text-emerald-600" />
          <span className="truncate">{t("call")}</span>
        </a>

        {/* Telegram Direct */}
        <a
          href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTelegramClick}
          aria-label={t("telegramChat")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold text-[#229ED9] bg-[#229ED9]/10 transition-colors"
        >
          <Send className="h-5 w-5 mb-0.5 text-[#229ED9]" />
          <span className="truncate">Telegram</span>
        </a>
      </div>
    </nav>
  );
}
