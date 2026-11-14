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
  const [activeTab, setActiveTab] = React.useState<"home" | "packages">("home");

  React.useEffect(() => {
    const handleScroll = () => {
      const pkgEl = document.getElementById("packages");
      if (pkgEl && window.scrollY >= pkgEl.offsetTop - 220) {
        setActiveTab("packages");
      } else {
        setActiveTab("home");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: "home" | "packages"
  ) => {
    setActiveTab(targetId);
    if (pathname === "/" || pathname === "") {
      e.preventDefault();
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", window.location.pathname);
        }
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          if (typeof window !== "undefined") {
            window.history.pushState(null, "", `#${targetId}`);
          }
        }
      }
    }
  };

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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-slate-200/60 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-4 items-center justify-around gap-1.5 max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "home")}
          aria-label={t("home")}
          className={cn(
            "flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[10px] sm:text-[11px] font-semibold transition-all duration-200 active:scale-95 min-h-[48px]",
            activeTab === "home"
              ? "bg-orange-50 text-primary-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          <Home
            className={cn(
              "h-5 w-5 mb-0.5 transition-transform duration-200",
              activeTab === "home" ? "scale-105 text-primary-600" : "text-slate-500"
            )}
          />
          <span className="truncate">{t("home")}</span>
        </Link>

        {/* Packages */}
        <Link
          href="/#packages"
          onClick={(e) => handleNavClick(e, "packages")}
          aria-label={t("packages")}
          className={cn(
            "flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[10px] sm:text-[11px] font-semibold transition-all duration-200 active:scale-95 min-h-[48px]",
            activeTab === "packages"
              ? "bg-orange-50 text-primary-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          <Package
            className={cn(
              "h-5 w-5 mb-0.5 transition-transform duration-200",
              activeTab === "packages" ? "scale-105 text-primary-600" : "text-slate-500"
            )}
          />
          <span className="truncate">{t("packagesShort")}</span>
        </Link>

        {/* Call Direct */}
        <a
          href={`tel:${sellerConfig.phone}`}
          onClick={handleCallClick}
          aria-label={t("callNow")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[10px] sm:text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-all active:scale-95 min-h-[48px]"
        >
          <PhoneCall className="h-5 w-5 mb-0.5 text-slate-600" />
          <span className="truncate">{t("call")}</span>
        </a>

        {/* Telegram Direct (Light Sky Action Pill matching user screenshot aesthetic) */}
        <a
          href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTelegramClick}
          aria-label={t("telegramChat")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[10px] sm:text-[11px] font-bold text-[#229ED9] bg-[#E8F5FD] hover:bg-[#d8edf9] border border-[#229ED9]/15 transition-all active:scale-95 min-h-[48px]"
        >
          <Send className="h-5 w-5 mb-0.5 text-[#229ED9]" />
          <span className="truncate tracking-tight">Telegram</span>
        </a>
      </div>
    </nav>
  );
}
