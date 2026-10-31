"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import {
  Wifi,
  Send,
  Phone,
  ShieldCheck,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";
import { Locale } from "@/types";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const sellerTitle = isKm ? sellerConfig.titleKm : sellerConfig.titleEn;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-8 sm:pt-14 pb-12 sm:pb-10 border-t border-slate-800/80">
      <div className="container mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10 pb-8 sm:pb-12 border-b border-slate-800/80">
          {/* Col 1: Officer Seller Brand & Profile (lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-md group-hover:scale-105 transition-transform">
                <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center">
                  Net<span className="text-primary-400">Seller</span>
                  <span className="ml-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary-300 bg-secondary-900/60 px-1.5 py-0.5 rounded border border-secondary-700/50">
                    KH
                  </span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  {tNav("cambodiaInternet")}
                </span>
              </div>
            </Link>

            {/* Officer Seller Profile Badge */}
            <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/70 p-2.5 sm:p-3.5 max-w-sm">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="relative shrink-0">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white overflow-hidden font-black text-xs">
                    {sellerConfig.avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={sellerConfig.avatarUrl}
                        alt={sellerConfig.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Wifi className="h-4 w-4" />
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <ShieldCheck className="h-2 w-2" />
                  </span>
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold text-white block">
                    {sellerConfig.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">
                    {sellerTitle}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {t("tagline")}
            </p>

            {/* Direct Connect Action Row */}
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#229ED9] text-white hover:bg-[#1d8bc0] transition-colors text-xs font-bold shadow-sm"
                aria-label="Telegram"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href={`tel:${sellerConfig.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-xs font-bold shadow-sm"
                aria-label="Call Direct"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{sellerConfig.phoneDisplay}</span>
              </a>

              <a
                href={sellerConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">f</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="h-3 w-3 text-slate-600 group-hover:text-primary-400" />
                  <span>{tNav("home")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#packages"
                  className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="h-3 w-3 text-slate-600 group-hover:text-primary-400" />
                  <span>{tNav("packages")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#promotions"
                  className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="h-3 w-3 text-slate-600 group-hover:text-primary-400" />
                  <span>{tNav("promotions")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="h-3 w-3 text-slate-600 group-hover:text-primary-400" />
                  <span>{tNav("contact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Official Channels (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t("contactInfo")}
            </h4>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3.5 text-xs sm:text-sm">
              {/* Telegram Channel */}
              <div className="flex items-start gap-2.5">
                <Send className="h-4 w-4 text-[#229ED9] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    {tContact("telegramDirect")}
                  </span>
                  <a
                    href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary-400 hover:underline"
                  >
                    @{sellerConfig.telegramUsername.replace(/^@/, "")}
                  </a>
                </div>
              </div>

              {/* Personal Phone & Call */}
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    {tContact("phone")}
                  </span>
                  <a
                    href={`tel:${sellerConfig.phone}`}
                    className="font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    {sellerConfig.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Disclaimer, Copyright, Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <p className="leading-relaxed">
              {t("disclaimer")}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-slate-400">
              &copy; {new Date().getFullYear()} {sellerConfig.name}.
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
              aria-label={t("backToTop")}
            >
              <span>{t("backToTop")}</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
