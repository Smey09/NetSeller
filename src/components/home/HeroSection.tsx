"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import {
  Wifi,
  Send,
  Zap,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  UserCheck,
  QrCode,
} from "lucide-react";
import { Locale } from "@/types";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";
  const [isQrVisitor, setIsQrVisitor] = React.useState(false);

  React.useEffect(() => {
    // Check if arriving from physical business card QR scan
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const src = params.get("source") || params.get("ref") || params.get("utm_source");
      if (src && (src.includes("qr") || src.includes("card"))) {
        setIsQrVisitor(true);
      }
      PrivacyAnalytics.track("page_view");
    }
  }, []);

  const title = isKm ? sellerConfig.titleKm : sellerConfig.titleEn;
  const bio = isKm ? sellerConfig.bioKm : sellerConfig.bioEn;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/50 pt-6 sm:pt-14 pb-16 sm:pb-24 border-b border-slate-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary-400/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* QR Visitor Welcome Alert if scanned from physical card */}
        {isQrVisitor && (
          <div className="max-w-2xl mx-auto mb-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-primary-500/10 to-sky-500/10 border border-emerald-300/80 p-3 sm:p-3.5 text-center flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-950 animate-in fade-in slide-in-from-top-2 duration-300">
            <QrCode className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{t("qrScannedWelcome")}</span>
          </div>
        )}

        {/* Mobile-First Seller Profile & Verification Header Fold */}
        <div className="max-w-3xl mx-auto mb-8 p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-xs overflow-hidden">
                {sellerConfig.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={sellerConfig.avatarUrl}
                    alt={sellerConfig.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Wifi className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                <ShieldCheck className="h-2.5 w-2.5" />
              </span>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {sellerConfig.name}
                </span>
                <Badge variant="success" className="text-[10px] py-0 px-1.5 font-bold">
                  {t("verifiedBadge")}
                </Badge>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                {title}
              </span>
            </div>
          </div>

          <Link href="/card" className="shrink-0 hidden xs:inline-block">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-[11px] font-semibold h-8 px-2.5 border-slate-200 gap-1 text-slate-700"
            >
              <QrCode className="h-3 w-3 text-primary-600" />
              <span>{t("digitalCardLink")}</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Subtitle, CTAs, Highlights */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Promotion pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-800 border border-primary-200/60 shadow-xs backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t("badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t("titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </h1>

            {/* Subtitle / Personal Intro */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("subtitle")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link href="/packages" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-bold rounded-2xl px-8 py-3.5 shadow-lg shadow-primary-600/30 gap-2 text-base"
                >
                  <span>{t("explorePackages")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => PrivacyAnalytics.track("telegram_click", { location: "hero_primary" })}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="telegram"
                  size="lg"
                  className="w-full sm:w-auto font-bold rounded-2xl px-7 py-3.5 shadow-lg shadow-[#229ED9]/25 gap-2 text-base"
                >
                  <Send className="h-4 w-4" />
                  <span>{t("contactTelegram")}</span>
                </Button>
              </a>

              <a
                href={`tel:${sellerConfig.phone}`}
                onClick={() => PrivacyAnalytics.track("call_click", { location: "hero_call" })}
                className="sm:hidden w-full"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-semibold rounded-2xl border-slate-300 gap-2 text-sm text-slate-800"
                >
                  <PhoneCall className="h-4 w-4 text-emerald-600" />
                  <span>{sellerConfig.phoneDisplay}</span>
                </Button>
              </a>
            </div>

            {/* Trust bullet row */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {t("zeroSetup")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {t("routerIncludedBadge")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {t("fastInstallBadge")}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Graphic - Interactive Telecommunications Hub Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-500 opacity-20 blur-xl" />

              {/* Showcase Card */}
              <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                {/* Hub top status */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md shadow-primary-600/30">
                      <Wifi className="h-5 w-5 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block leading-tight">
                        {t("networkStatusTitle")}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {t("networkStatusOptimal")}
                      </span>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-[11px] font-mono font-bold text-primary-700 bg-primary-50">
                    {t("pingMetric")}
                  </Badge>
                </div>

                {/* Router & Speed Illustration Box */}
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-6 text-white overflow-hidden shadow-inner">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-secondary-400" />
                        {t("wifi6Tech")}
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">{t("unlimitedData")}</span>
                    </div>

                    {/* Speed display */}
                    <div className="text-center py-4">
                      <span className="text-[11px] uppercase tracking-widest text-secondary-300 font-bold block mb-1">
                        {t("symmetricalFiber")}
                      </span>
                      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                        <span>100</span>
                        <span className="text-xl font-bold text-secondary-400">Mbps</span>
                      </div>
                      <span className="text-xs text-slate-400 block mt-1">
                        {t("streamingGaming")}
                      </span>
                    </div>

                    {/* Bandwidth meters */}
                    <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                          <span>{t("downloadSpeed")}</span>
                          <span className="font-mono text-white font-bold">100 Mbps ({t("fullSpeedLabel")})</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-primary-400 to-secondary-400" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                          <span>{t("uploadSpeed")}</span>
                          <span className="font-mono text-white font-bold">100 Mbps ({t("symmetricalLabel")})</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-secondary-400 to-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seller Quick Guarantee Row */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t("personalSupport")}</span>
                    <strong className="text-slate-900 block font-bold mt-0.5">{t("directTelegramLabel")}</strong>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t("installationLabel")}</span>
                    <strong className="text-emerald-700 block font-bold mt-0.5">{t("freeOpticalFiber")}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature highlight metrics */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs text-center lg:text-left flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-black text-primary-600">{t("features.speed")}</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">{t("features.speedDesc")}</span>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs text-center lg:text-left flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-black text-secondary-600">{t("features.support")}</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">{t("features.supportDesc")}</span>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs text-center lg:text-left flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">{t("features.freeInstall")}</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">{t("features.freeInstallDesc")}</span>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs text-center lg:text-left flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {t("provincesCoverage", { count: sellerConfig.serviceAreas.length })}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">{t("features.coverageDesc")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
