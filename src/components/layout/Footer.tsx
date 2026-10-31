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
    <footer className="relative bg-slate-950/90 backdrop-blur-3xl text-slate-400 pt-10 sm:pt-16 pb-12 sm:pb-12 border-t border-white/[0.08] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
      {/* Subtle Ambient Glows inside Dark Glass Footer */}
      <div aria-hidden="true" className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-500/5 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10 pb-8 sm:pb-12 border-b border-white/[0.08]">
          {/* Col 1: Officer Seller Brand & Profile (lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-sm shadow-primary-500/20 group-hover:scale-105 transition-transform border border-white/20">
                <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center">
                  Net<span className="text-primary-400">Seller</span>
                  <span className="ml-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/[0.1] shadow-2xs">
                    KH
                  </span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  {tNav("cambodiaInternet")}
                </span>
              </div>
            </Link>

            {/* Officer Seller Profile Badge (Frosted Dark Glass Card) */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-3 sm:p-4 max-w-sm shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative shrink-0">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-slate-800 flex items-center justify-center text-white overflow-hidden font-black text-xs border border-white/[0.1] shadow-xs">
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
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#229ED9] text-white hover:bg-[#1d8bc0] transition-all text-xs font-bold shadow-md shadow-[#229ED9]/20 border border-white/20 active:scale-[0.98]"
                aria-label="Telegram"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href={`tel:${sellerConfig.phone}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/[0.1] backdrop-blur-md transition-all text-xs font-bold shadow-sm active:scale-[0.98]"
                aria-label="Call Direct"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{sellerConfig.phoneDisplay}</span>
              </a>

              <a
                href={sellerConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.12] transition-all border border-white/[0.1] backdrop-blur-md shadow-sm active:scale-[0.98]"
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
                  className="text-slate-400 hover:text-white transition-all inline-flex items-center gap-2 font-medium group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-primary-400 transition-colors" />
                  <span>{tNav("home")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#packages"
                  className="text-slate-400 hover:text-white transition-all inline-flex items-center gap-2 font-medium group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-primary-400 transition-colors" />
                  <span>{tNav("packages")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#promotions"
                  className="text-slate-400 hover:text-white transition-all inline-flex items-center gap-2 font-medium group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-primary-400 transition-colors" />
                  <span>{tNav("promotions")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-400 hover:text-white transition-all inline-flex items-center gap-2 font-medium group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-primary-400 transition-colors" />
                  <span>{tNav("contact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Official Channels (lg: 4 cols) (Frosted Dark Glass Card) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t("contactInfo")}
            </h4>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.25)]">
              {/* Telegram Channel */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <Send className="h-4 w-4 text-[#229ED9] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
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
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
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
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <p className="leading-relaxed">{t("disclaimer")}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-slate-500">
              &copy; {new Date().getFullYear()} {sellerConfig.name}.
            </span>

            <span className="text-slate-700">•</span>

            <Link
              href="/admin"
              className="text-[11px] text-slate-500 hover:text-primary-400 transition-colors"
            >
              Owner Portal
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/[0.1] backdrop-blur-md shadow-sm active:scale-[0.98]"
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
