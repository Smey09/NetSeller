"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import { TelegramService } from "@/features/telegram/telegram.service";
import {
  Wifi,
  Menu,
  X,
  Send,
  PhoneCall,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("home");
  const [actionToast, setActionToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      // Scroll Spy: dynamically highlight active section as user scrolls
      const sections = ["contact", "promotions", "packages", "home"];
      const scrollPosition = window.scrollY + 180;

      let current = "home";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          current = sectionId;
          break;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync route and hash changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (["home", "packages", "promotions", "contact"].includes(hash)) {
        setActiveSection(hash);
      }
    }
  }, [pathname]);

  const navLinks = [
    { id: "home", label: t("home"), href: "/" },
    { id: "packages", label: t("packages"), href: "/#packages" },
    { id: "promotions", label: t("promotions"), href: "/#promotions" },
    { id: "contact", label: t("contact"), href: "/#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0]
  ) => {
    setActiveSection(link.id);
    setMobileMenuOpen(false);

    if (pathname === "/" || pathname === "") {
      e.preventDefault();
      if (link.id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", window.location.pathname);
        }
      } else {
        const el = document.getElementById(link.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          if (typeof window !== "undefined") {
            window.history.pushState(null, "", `#${link.id}`);
          }
        }
      }
    }
  };

  const handleTelegramAction = async () => {
    PrivacyAnalytics.track("telegram_click", { location: "header_cta" });
    await TelegramService.copyToClipboard(
      `@${sellerConfig.telegramUsername.replace(/^@/, "")}`
    );
    setActionToast(t("openingTelegram"));
    setTimeout(() => setActionToast(null), 3500);
  };

  return (
    <>
      {/* Top micro-bar for quick contact info (Dark Frosted Glass) */}
      <div className="bg-slate-950/85 backdrop-blur-xl text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 font-medium hidden sm:block border-b border-white/[0.08] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06)]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("telegramOnline")}: <strong className="text-white">@{sellerConfig.telegramUsername.replace(/^@/, "")}</strong>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">
              {t("hotline")}: <a href={`tel:${sellerConfig.phone}`} className="hover:text-white underline font-semibold text-slate-200">{sellerConfig.phoneDisplay}</a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.07] backdrop-blur-xs border border-white/[0.1] text-primary-400 text-[11px] font-semibold shadow-2xs">
              <Sparkles className="h-3 w-3" />
              {t("topBarPromo")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar (Frosted Glass Specular Navbar) */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b backdrop-blur-2xl",
          scrolled
            ? "bg-white/80 shadow-[inset_0_-1px_1px_0_rgba(255,255,255,0.8),0_4px_20px_rgba(15,23,42,0.04)] border-slate-200/50 py-2 sm:py-2.5"
            : "bg-white/70 border-slate-200/30 py-2.5 sm:py-3.5"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, navLinks[0])}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl shrink-0"
            aria-label={t("home")}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-sm shadow-primary-500/20 group-hover:scale-105 transition-transform border border-white/20">
              <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center">
                Net<span className="text-primary-600">Seller</span>
                <span className="ml-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white/80 backdrop-blur-xs border border-white/90 shadow-[inset_0_1px_1px_0_rgba(255,255,255,1)] px-1.5 py-0.5 rounded-md">
                  KH
                </span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase -mt-1 hidden md:block">
                {t("cambodiaInternet")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Segmented Glass Pill Track) */}
          <nav className="hidden lg:flex items-center p-1 rounded-full bg-white/65 backdrop-blur-xl border border-white/85 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(15,23,42,0.03)] gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 select-none active:scale-95",
                    isActive
                      ? "bg-slate-900 text-white shadow-xs font-bold scale-[1.02]"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/70"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-400 ring-2 ring-primary-400/30 animate-pulse shrink-0" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls (Language Switcher + Telegram CTA) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSwitcher />

            <div className="relative hidden sm:inline-flex">
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramAction}
                className="inline-flex"
              >
                <Button
                  variant="telegram"
                  size="sm"
                  className="relative overflow-hidden group/btn font-bold rounded-xl text-xs sm:text-sm px-3.5 gap-1.5 shadow-sm shadow-[#229ED9]/25 hover:shadow-md hover:shadow-[#229ED9]/30 transition-all active:scale-95 border border-white/20"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <Send className="h-3.5 w-3.5 relative z-10" />
                  <span className="relative z-10">{t("telegramChat")}</span>
                </Button>
              </a>

              {/* On-screen Action Feedback Toast */}
              {actionToast && (
                <div className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/20 text-white text-[11px] font-semibold shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 z-50 whitespace-nowrap">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{actionToast}</span>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl border border-white/85 bg-white/70 backdrop-blur-xl text-slate-700 hover:bg-white hover:text-slate-950 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-primary-500 shrink-0 transition-all active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t("close") : t("menu")}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu (Frosted Glass Shell) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/80 bg-white/95 backdrop-blur-3xl px-4 pt-3.5 pb-6 mt-2 shadow-[0_20px_40px_rgba(15,23,42,0.12)] animate-in slide-in-from-top-2 duration-200 rounded-b-3xl">
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm font-semibold flex items-center justify-between transition-all active:scale-[0.99]",
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="flex items-center gap-2.5">
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-primary-400 ring-2 ring-primary-400/30 animate-pulse shrink-0" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive ? "text-primary-400 translate-x-0.5" : "text-slate-400"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramAction}
                className="w-full"
              >
                <Button
                  variant="telegram"
                  size="lg"
                  className="relative overflow-hidden group/mbtn w-full font-bold justify-center gap-2 rounded-xl text-sm shadow-md shadow-[#229ED9]/25 active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover/mbtn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <Send className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{t("telegramChat")}</span>
                </Button>
              </a>

              <a href={`tel:${sellerConfig.phone}`} className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-semibold justify-center gap-2 rounded-xl text-sm border-slate-200 bg-white/70 backdrop-blur-md active:scale-95"
                >
                  <PhoneCall className="h-4 w-4 text-slate-700" />
                  <span>{sellerConfig.phoneDisplay}</span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
