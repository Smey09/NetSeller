"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import {
  Wifi,
  Send,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Locale } from "@/types";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  React.useEffect(() => {
    PrivacyAnalytics.track("page_view");
  }, []);

  const title = isKm ? sellerConfig.titleKm : sellerConfig.titleEn;
  const bio = isKm ? sellerConfig.bioKm : sellerConfig.bioEn;

  return (
    <section id="home" className="relative overflow-hidden bg-transparent pt-4 sm:pt-12 pb-8 sm:pb-20 border-b border-slate-200/50 scroll-mt-20">
      {/* Subtle Ambient Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-10" />

      <div className="container mx-auto px-3.5 sm:px-6">
        {/* =========================================================================
            ONE UNIFIED HERO MAIN FOLD: Left (Offer & CTAs) + Right (Officer Profile & Live Hub)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Officer Seller Micro-Pill, Headline, Subtitle, Actions, Trust */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-6 text-center lg:text-left">
            {/* Officer Seller Identity Header Micro-Pill (Frosted Glass) */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md p-1 pr-3 sm:p-1.5 sm:pr-4 border border-white/80 shadow-xs">
              <div className="relative shrink-0">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-slate-900 flex items-center justify-center text-white overflow-hidden text-[10px] font-bold">
                  {sellerConfig.avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={sellerConfig.avatarUrl}
                      alt={sellerConfig.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Wifi className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800">
                {sellerConfig.name}
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <Badge variant="success" className="text-[9px] sm:text-[10px] py-0 px-1.5 sm:px-2 font-bold gap-1 shadow-2xs">
                <ShieldCheck className="h-2.5 w-2.5" />
                <span>{t("verifiedBadge")}</span>
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
              {t("titlePrefix")}{" "}
              <span className="text-primary-600">
                {t("titleHighlight")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t("subtitle")}
            </p>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 pt-1">
              <a href="#packages" className="w-full sm:w-auto">
                <Button
                  size="default"
                  className="w-full sm:w-auto font-bold rounded-xl sm:rounded-2xl px-3 sm:px-8 py-2.5 sm:py-3.5 bg-primary-500 hover:bg-primary-600 text-white shadow-sm shadow-primary-500/25 gap-1.5 text-xs sm:text-base cursor-pointer min-h-[44px]"
                >
                  <span className="truncate">{t("explorePackages")}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </Button>
              </a>

              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => PrivacyAnalytics.track("telegram_click", { location: "hero_primary" })}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="telegram"
                  size="default"
                  className="w-full sm:w-auto font-bold rounded-xl sm:rounded-2xl px-3 sm:px-7 py-2.5 sm:py-3.5 shadow-sm shadow-[#229ED9]/20 gap-1.5 text-xs sm:text-base cursor-pointer min-h-[44px]"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{t("contactTelegram")}</span>
                </Button>
              </a>

              {/* Mobile Hotline Pill (Frosted Glass) */}
              <a
                href={`tel:${sellerConfig.phone}`}
                onClick={() => PrivacyAnalytics.track("call_click", { location: "hero_call" })}
                className="col-span-2 sm:hidden inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs font-semibold text-slate-700 shadow-xs hover:bg-white transition-colors w-full min-h-[40px]"
              >
                <PhoneCall className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{t("callNow")}: {sellerConfig.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust bullet row */}
            <div className="pt-0.5 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-6 text-[11px] sm:text-sm font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-xs sm:bg-transparent px-2.5 py-0.5 sm:p-0 rounded-full sm:rounded-none border border-white/80 sm:border-0 shadow-2xs sm:shadow-none">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{t("zeroSetup")}</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-xs sm:bg-transparent px-2.5 py-0.5 sm:p-0 rounded-full sm:rounded-none border border-white/80 sm:border-0 shadow-2xs sm:shadow-none">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{t("routerIncludedBadge")}</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-xs sm:bg-transparent px-2.5 py-0.5 sm:p-0 rounded-full sm:rounded-none border border-white/80 sm:border-0 shadow-2xs sm:shadow-none">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{t("fastInstallBadge")}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Friendly Consultant with Wi-Fi 6 Router Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Elevated Friendly Image Container (Frosted Glass Outer Shell) */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-2xl p-2 sm:p-2.5 shadow-[inset_0_1px_2px_0_rgba(255,255,255,1),0_20px_40px_-10px_rgba(15,23,42,0.08)] overflow-hidden group">
                <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-friendly-consultant.jpg"
                    alt={`${sellerConfig.name} - Home Wi-Fi Consultant`}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full max-w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle Gradient Overlay for floating badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Pill: Telegram Online & Verified (Frosted Glass) */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xl py-1 px-2.5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.06)] border border-white/90">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-800">
                        {t("onlineStatus")}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/85 backdrop-blur-xl py-1 px-2.5 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] border border-white/20">
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      <span className="text-[10px] font-bold">
                        {sellerConfig.name}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Floating Info Pill: Free Wi-Fi 6 Router Included & 1-on-1 Consultation (Frosted Glass) */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl bg-white/90 backdrop-blur-2xl p-2.5 sm:p-3 shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_8px_24px_rgba(0,0,0,0.08)] border border-white/90">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-primary-50 text-primary-600 shrink-0">
                          <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                        <div className="leading-tight">
                          <span className="text-[11px] sm:text-xs font-bold text-slate-900 block">
                            {t("routerIncludedBadge")}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                            {t("zeroSetup")}
                          </span>
                        </div>
                      </div>

                      <a
                        href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[#229ED9] hover:bg-[#1E88C7] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Send className="h-3 w-3" />
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM HIGHLIGHT METRICS ROW (Frosted Glass Specular Tiles)
            ========================================================================= */}
        <div className="mt-6 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
          <div className="rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-xl p-2.5 sm:p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_6px_20px_-3px_rgba(15,23,42,0.04)] text-center lg:text-left flex flex-col justify-between hover:from-white/95 hover:to-white/80 hover:border-white hover:shadow-md transition-all">
            <span className="text-lg sm:text-3xl font-black text-primary-600">{t("features.speed")}</span>
            <span className="text-[10px] sm:text-sm font-semibold text-slate-600 mt-0.5 sm:mt-1">{t("features.speedDesc")}</span>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-xl p-2.5 sm:p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_6px_20px_-3px_rgba(15,23,42,0.04)] text-center lg:text-left flex flex-col justify-between hover:from-white/95 hover:to-white/80 hover:border-white hover:shadow-md transition-all">
            <span className="text-lg sm:text-3xl font-black text-slate-900">{t("features.support")}</span>
            <span className="text-[10px] sm:text-sm font-semibold text-slate-600 mt-0.5 sm:mt-1">{t("features.supportDesc")}</span>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-xl p-2.5 sm:p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_6px_20px_-3px_rgba(15,23,42,0.04)] text-center lg:text-left flex flex-col justify-between hover:from-white/95 hover:to-white/80 hover:border-white hover:shadow-md transition-all">
            <span className="text-lg sm:text-3xl font-black text-slate-900">{t("features.freeInstall")}</span>
            <span className="text-[10px] sm:text-sm font-semibold text-slate-600 mt-0.5 sm:mt-1">{t("features.freeInstallDesc")}</span>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-xl p-2.5 sm:p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_6px_20px_-3px_rgba(15,23,42,0.04)] text-center lg:text-left flex flex-col justify-between hover:from-white/95 hover:to-white/80 hover:border-white hover:shadow-md transition-all">
            <span className="text-lg sm:text-3xl font-black text-slate-900">{t("features.unlimited")}</span>
            <span className="text-[10px] sm:text-sm font-semibold text-slate-600 mt-0.5 sm:mt-1">{t("features.unlimitedDesc")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
