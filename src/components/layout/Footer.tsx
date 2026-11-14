"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import { internetPackages } from "@/data/packages";
import {
  Wifi,
  Send,
  Phone,
  ShieldCheck,
  ArrowUpRight,
  ChevronUp,
  Clock,
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
    <footer className="relative bg-gradient-to-b from-amber-400 via-amber-400 to-amber-500 text-slate-950 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-amber-300 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-12 border-b border-slate-950/15">
          {/* Col 1: Seller Brand & Profile (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-amber-400 shadow-xs group-hover:scale-105 transition-transform">
                <Wifi className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-950 flex items-center">
                  Net<span className="text-white drop-shadow-xs">Seller</span>
                  <span className="ml-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-950 bg-white/90 px-1.5 py-0.5 rounded border border-white shadow-2xs">
                    KH
                  </span>
                </span>
                <span className="text-[10px] font-bold text-slate-900/80 uppercase tracking-wider -mt-0.5">
                  {tNav("cambodiaInternet")}
                </span>
              </div>
            </Link>

            {/* Seller Consultant Identity Snippet (Clean, uncluttered) */}
            <div className="flex items-center gap-3 pt-1">
              <div className="relative shrink-0">
                <div className="h-11 w-11 rounded-full bg-slate-950 ring-2 ring-white/70 flex items-center justify-center text-white overflow-hidden font-black text-xs shadow-xs">
                  {sellerConfig.avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={sellerConfig.avatarUrl}
                      alt={sellerConfig.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Wifi className="h-5 w-5 text-amber-400" />
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                  <ShieldCheck className="h-2.5 w-2.5" />
                </span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-slate-950">
                    {sellerConfig.name}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-slate-950/10 text-slate-950 border border-slate-950/20">
                    Verified
                  </span>
                </div>
                <span className="text-xs text-slate-900/80 font-medium block mt-0.5">
                  {sellerTitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-900/90 font-medium leading-relaxed max-w-sm">
              {t("tagline")}
            </p>

            {/* Facebook Social Link */}
            <div className="pt-1">
              <a
                href={sellerConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 hover:text-black transition-colors"
                aria-label="Facebook Page"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-white text-xs font-bold shadow-2xs">
                  f
                </span>
                <span>NetSeller Cambodia</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-900/85 hover:text-black transition-all inline-flex items-center gap-1.5 font-bold group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-900/70 group-hover:text-black transition-colors" />
                  <span>{tNav("home")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#packages"
                  className="text-slate-900/85 hover:text-black transition-all inline-flex items-center gap-1.5 font-bold group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-900/70 group-hover:text-black transition-colors" />
                  <span>{tNav("packages")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#promotions"
                  className="text-slate-900/85 hover:text-black transition-all inline-flex items-center gap-1.5 font-bold group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-900/70 group-hover:text-black transition-colors" />
                  <span>{tNav("promotions")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-900/85 hover:text-black transition-all inline-flex items-center gap-1.5 font-bold group hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-900/70 group-hover:text-black transition-colors" />
                  <span>{tNav("contact")}</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/admin"
                  className="text-slate-900/75 hover:text-black transition-all inline-flex items-center gap-1 text-[11px] font-semibold"
                >
                  <span>{t("ownerPortal")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Home Wi-Fi Packages (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
              {tNav("packages")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {internetPackages.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    href="/#packages"
                    className="text-slate-900/85 hover:text-black transition-all flex items-center justify-between font-semibold group py-0.5"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-950/40 group-hover:bg-slate-950" />
                      <span>{pkg.speedMbps} Mbps</span>
                      {pkg.isPopular && (
                        <span className="text-[9px] font-black uppercase px-1 py-0.2 rounded bg-slate-950 text-white leading-none">
                          Popular
                        </span>
                      )}
                    </span>
                    <span className="font-black text-slate-950">
                      ${pkg.monthlyPriceUsd}/mo
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact & Action Channels (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
              {t("contactInfo")}
            </h4>

            <div className="space-y-2.5">
              {/* Telegram Direct Channel */}
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-[#229ED9] hover:bg-[#1a8bc0] text-white shadow-xs transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="h-4 w-4 shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 block">
                      Telegram Direct
                    </span>
                    <span className="text-xs font-black">
                      @{sellerConfig.telegramUsername.replace(/^@/, "")}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Phone Hotline */}
              <a
                href={`tel:${sellerConfig.phone}`}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white shadow-xs transition-all active:scale-[0.98]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-amber-400 shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <div className="leading-tight text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    {tContact("phone")}
                  </span>
                  <span className="text-xs font-black text-white">
                    {sellerConfig.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Fast Response Note */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-950/80 pt-1">
                <Clock className="h-3.5 w-3.5 text-slate-950 shrink-0" />
                <span>{t("fastResponse")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Disclaimer, Copyright, Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-950/85">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="h-4 w-4 text-slate-950 shrink-0" />
            <p className="leading-relaxed font-medium">{t("disclaimer")}</p>
          </div>

          <div className="flex items-center gap-3.5 shrink-0">
            <span className="text-slate-950/80 font-medium">
              &copy; {new Date().getFullYear()} {sellerConfig.name}. {t("rights")}
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white transition-all cursor-pointer shadow-xs active:scale-95"
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
