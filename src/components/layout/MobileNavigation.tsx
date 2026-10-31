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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-2xl border-t border-white/85 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_-8px_30px_rgba(15,23,42,0.06)] px-2.5 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-4 items-center justify-around gap-1 max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "home")}
          aria-label={t("home")}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] sm:text-[11px] font-semibold transition-all active:scale-95",
            activeTab === "home"
              ? "text-primary-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          <div className="relative flex flex-col items-center">
            <Home
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeTab === "home" ? "scale-110 text-primary-600" : "text-slate-500"
              )}
            />
            {activeTab === "home" && (
              <span className="h-1 w-3.5 rounded-full bg-primary-500 shadow-xs shadow-primary-500/40 mt-0.5" />
            )}
          </div>
          <span className={cn("truncate mt-0.5", activeTab === "home" ? "font-bold text-slate-900" : "text-slate-500")}>
            {t("home")}
          </span>
        </Link>

        {/* Packages (Shortened label so it never crowds or overflows) */}
        <Link
          href="/#packages"
          onClick={(e) => handleNavClick(e, "packages")}
          aria-label={t("packages")}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] sm:text-[11px] font-semibold transition-all active:scale-95",
            activeTab === "packages"
              ? "text-primary-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          <div className="relative flex flex-col items-center">
            <Package
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeTab === "packages" ? "scale-110 text-primary-600" : "text-slate-500"
              )}
            />
            {activeTab === "packages" && (
              <span className="h-1 w-3.5 rounded-full bg-primary-500 shadow-xs shadow-primary-500/40 mt-0.5" />
            )}
          </div>
          <span className={cn("truncate mt-0.5", activeTab === "packages" ? "font-bold text-slate-900" : "text-slate-500")}>
            {t("packagesShort")}
          </span>
        </Link>

        {/* Call Direct */}
        <a
          href={`tel:${sellerConfig.phone}`}
          onClick={handleCallClick}
          aria-label={t("callNow")}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] sm:text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-all active:scale-95"
        >
          <div className="relative flex flex-col items-center">
            <PhoneCall className="h-5 w-5 text-slate-600 mb-0.5" />
          </div>
          <span className="truncate mt-0.5 text-slate-600">{t("call")}</span>
        </a>

        {/* Telegram Direct (Executive Branded CTA Action Pill) */}
        <a
          href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTelegramClick}
          aria-label={t("telegramChat")}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold text-white bg-[#229ED9] hover:bg-[#1E88C7] shadow-sm shadow-[#229ED9]/25 transition-all active:scale-95 border border-white/20"
        >
          <Send className="h-4 w-4 mb-0.5 text-white" />
          <span className="truncate tracking-tight">Telegram</span>
        </a>
      </div>
    </nav>
  );
}
