"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { sellerConfig } from "@/config/seller";
import {
  Wifi,
  Menu,
  X,
  Send,
  PhoneCall,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("packages"), href: "/packages" },
    { label: t("promotions"), href: "/#promotions" },
    { label: t("whyMe"), href: "/#why-choose-me" },
    { label: t("about"), href: "/#about" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <>
      {/* Top micro-bar for quick contact info (hidden on mobile) */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium hidden sm:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {t("telegramOnline")}: <strong className="text-white">@{sellerConfig.telegramUsername.replace(/^@/, "")}</strong>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              {t("hotline")}: <a href={`tel:${sellerConfig.phone}`} className="hover:text-primary-300 underline font-bold">{sellerConfig.phoneDisplay}</a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 flex items-center gap-1 text-[11px] font-semibold">
              <Sparkles className="h-3 w-3" />
              {t("topBarPromo")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-slate-200/80 py-2.5 sm:py-3"
            : "bg-white border-slate-100 py-2.5 sm:py-3.5"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl shrink-0"
            aria-label={t("home")}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 text-white shadow-xs group-hover:scale-105 transition-transform">
              <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center">
                Net<span className="text-primary-600">Seller</span>
                <span className="ml-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary-600 bg-secondary-50 px-1 py-0.2 rounded">
                  KH
                </span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase -mt-1 hidden md:block">
                {t("cambodiaInternet")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl transition-all duration-150 hover:bg-slate-100 hover:text-primary-600",
                    isActive
                      ? "text-primary-600 font-bold bg-primary-50"
                      : "text-slate-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls (Language Switcher + Telegram CTA) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSwitcher />

            <a
              href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                variant="telegram"
                size="sm"
                className="font-bold rounded-xl text-xs sm:text-sm px-3.5 gap-1.5 shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{t("telegramChat")}</span>
              </Button>
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t("close") : t("menu")}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 mt-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100 hover:text-primary-600 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </nav>

            <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="telegram"
                  size="lg"
                  className="w-full font-bold justify-center gap-2 rounded-xl text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>{t("telegramChat")}</span>
                </Button>
              </a>

              <a href={`tel:${sellerConfig.phone}`} className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-semibold justify-center gap-2 rounded-xl text-sm border-slate-200"
                >
                  <PhoneCall className="h-4 w-4 text-primary-600" />
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
