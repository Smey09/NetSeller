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
  Clock,
  Zap,
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
            ONE UNIFIED HERO MAIN FOLD: Left (Offer & CTAs) + Right (Seller Profile & Live Hub)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Seller Identity Micro-Pill, Headline, Subtitle, Actions, Trust */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Seller Identity Header Micro-Pill (Frosted Glass with Crisp Specular Border) */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-xl p-1.5 pr-3.5 sm:pr-4 border border-slate-200/90 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:border-amber-400/50 transition-all">
              <div className="relative shrink-0">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-slate-900 ring-2 ring-amber-400/40 flex items-center justify-center text-white overflow-hidden text-[10px] font-bold">
                  {sellerConfig.avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={sellerConfig.avatarUrl}
                      alt={sellerConfig.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Wifi className="h-3.5 w-3.5 text-amber-400" />
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800">
                {sellerConfig.name}
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] py-0.5 px-2.5 font-bold rounded-full bg-amber-50 text-amber-900 border border-amber-200/90 shadow-2xs">
                <ShieldCheck className="h-2.5 w-2.5 text-amber-600" />
                <span>{t("verifiedBadge")}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.18]">
              {t("titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              {t("subtitle")}
            </p>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1">
              <a href="#packages" className="w-full sm:w-auto">
                <Button
                  size="default"
                  className="w-full sm:w-auto font-black rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all gap-2 text-xs sm:text-base cursor-pointer min-h-[46px]"
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
                  className="w-full sm:w-auto font-bold rounded-xl sm:rounded-2xl px-4 sm:px-7 py-3 sm:py-3.5 shadow-md shadow-[#229ED9]/25 hover:shadow-lg hover:shadow-[#229ED9]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all gap-2 text-xs sm:text-base cursor-pointer min-h-[46px]"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{t("contactTelegram")}</span>
                </Button>
              </a>

              {/* Mobile Hotline Pill */}
              <a
                href={`tel:${sellerConfig.phone}`}
                onClick={() => PrivacyAnalytics.track("call_click", { location: "hero_call" })}
                className="col-span-2 sm:hidden inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200/90 bg-white/90 backdrop-blur-md text-xs font-bold text-slate-800 shadow-xs hover:bg-white transition-colors w-full min-h-[42px]"
              >
                <PhoneCall className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                <span>{t("callNow")}: {sellerConfig.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust bullet row */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[11px] sm:text-xs font-bold text-slate-800">
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{t("zeroSetup")}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{t("routerIncludedBadge")}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{t("fastInstallBadge")}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Friendly Consultant with Wi-Fi 6 Router Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Elevated Friendly Image Container (Frosted Glass Outer Shell) */}
              <div className="relative rounded-3xl border border-white/90 bg-gradient-to-b from-white/95 via-white/85 to-white/75 backdrop-blur-2xl p-2 sm:p-2.5 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.12),0_1px_0_rgba(255,255,255,1)] overflow-hidden group">
                <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] w-full rounded-2xl overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-friendly-consultant.jpg"
                    alt={`${sellerConfig.name} - Home Wi-Fi Consultant`}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full max-w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle Gradient Overlay for floating badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Pill: Telegram Online & Verified (High-Contrast Refined Glass) */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-2xl py-1.5 px-3 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.18)] border border-white">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-black text-slate-900 tracking-tight">
                        {t("onlineStatus")}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/95 backdrop-blur-2xl py-1.5 px-3 text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)] border border-white/20">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary-400 shrink-0" />
                      <span className="text-[11px] font-bold text-white tracking-tight">
                        {sellerConfig.name}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Floating Info Pill: Free Wi-Fi 6 Router Included & 1-on-1 Consultation */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl p-2.5 sm:p-3.5 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.18)] border border-white">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-orange-50 text-primary-500 border border-orange-100 shrink-0">
                          <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                        <div className="leading-tight">
                          <span className="text-[11px] sm:text-xs font-bold text-slate-900 block">
                            {t("routerIncludedBadge")}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-primary-500 font-semibold flex items-center gap-1 mt-0.5">
                            <CheckCircle2 className="h-3 w-3 text-primary-500 shrink-0" />
                            {t("zeroSetup")}
                          </span>
                        </div>
                      </div>

                      <a
                        href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 rounded-xl bg-[#229ED9] hover:bg-[#1b8ec6] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 sm:py-2 shadow-xs transition-colors cursor-pointer"
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
            BOTTOM HIGHLIGHT METRICS ROW (Clean Tactile Modern Tiles)
            ========================================================================= */}
        <div className="mt-8 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {/* Metric 1: Speed */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-3 sm:p-5 shadow-[0_4px_16px_-3px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-2 group">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 group-hover:scale-105 transition-transform">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-500/20" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Fast</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-amber-600 tracking-tight block leading-tight">{t("features.speed")}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5 block leading-tight">{t("features.speedDesc")}</span>
            </div>
          </div>

          {/* Metric 2: Support */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-3 sm:p-5 shadow-[0_4px_16px_-3px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-2 group">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:scale-105 transition-transform">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">SLA</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight block leading-tight">{t("features.support")}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5 block leading-tight">{t("features.supportDesc")}</span>
            </div>
          </div>

          {/* Metric 3: Free Install */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-3 sm:p-5 shadow-[0_4px_16px_-3px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-2 group">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">$0 Free</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight block leading-tight">{t("features.freeInstall")}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5 block leading-tight">{t("features.freeInstallDesc")}</span>
            </div>
          </div>

          {/* Metric 4: Unlimited */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-3 sm:p-5 shadow-[0_4px_16px_-3px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-2 group">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:scale-105 transition-transform">
                <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uncapped</span>
            </div>
            <div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight block leading-tight">{t("features.unlimited")}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5 block leading-tight">{t("features.unlimitedDesc")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
