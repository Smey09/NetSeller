"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { InternetPackage, Locale } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrivacyAnalytics } from "@/lib/analytics";
import { TelegramService } from "@/features/telegram/telegram.service";
import {
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Send,
  Info,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  packageData: InternetPackage;
  onSelect: (pkg: InternetPackage) => void;
  className?: string;
}

export function PackageCard({ packageData, onSelect, className }: PackageCardProps) {
  const t = useTranslations("packages");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const isPopular = packageData.isPopular;
  const isPromoted = packageData.isPromoted;
  const isComingSoon = packageData.availabilityStatus === "coming_soon";
  const isLimited = packageData.availabilityStatus === "limited";

  const features = isKm ? packageData.featuresKm : packageData.features;
  const description = isKm ? packageData.descriptionKm : packageData.descriptionEn;
  const badgeText = isKm ? packageData.badgeKm : packageData.badge;

  // Direct 1-tap Telegram order without requiring any form input
  const handleDirectTelegramOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    PrivacyAnalytics.track("telegram_click", {
      location: "package_card_direct_order",
      packageId: packageData.id,
    });

    const links = TelegramService.prepareInquiry({
      packageName: packageData.name,
      packageSpeed: `${packageData.speedMbps} Mbps`,
      packagePrice: `$${packageData.monthlyPriceUsd}/month`,
      locale,
    });

    // Auto-copy pre-composed message as friendly fallback
    TelegramService.copyToClipboard(links.formattedText);

    // Open Telegram chat with consultant immediately
    TelegramService.openTelegram(links, "direct");
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-1 bg-white",
        isPopular
          ? "border-2 border-primary-600 shadow-md shadow-primary-600/10"
          : "border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300",
        className
      )}
    >
      {/* Top Banner for popular / featured */}
      {isPopular && (
        <div className="bg-primary-600 py-1 px-3 sm:py-1.5 sm:px-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-2xs flex items-center justify-center gap-1.5">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>{badgeText || t("popular")}</span>
        </div>
      )}

      {/* Header */}
      <CardHeader className={cn("p-3.5 pb-2 sm:p-6 sm:pb-3", isPopular ? "pt-3.5 sm:pt-5" : "pt-4 sm:pt-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary-600 block">
              {packageData.category === "home" ? t("categoryHome") : t("categoryBusiness")}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 break-words">
              {packageData.name}
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            {!isPopular && badgeText && (
              <Badge
                variant={isPromoted ? "accent" : "secondary"}
                className="font-semibold text-[10px] sm:text-xs py-0.5 px-2"
              >
                {badgeText}
              </Badge>
            )}

            {isComingSoon && (
              <Badge variant="outline" className="text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-600 border-slate-300">
                <Clock className="h-3 w-3 mr-1" />
                {t("comingSoon")}
              </Badge>
            )}

            {!isPopular && !badgeText && isLimited && (
              <Badge variant="accent" className="font-semibold text-[10px] sm:text-xs py-0.5 px-2">
                {t("limited")}
              </Badge>
            )}
          </div>
        </div>

        {description && (
          <p className="text-[11px] sm:text-sm text-slate-500 leading-relaxed mt-1 sm:mt-1.5 line-clamp-1">
            {description}
          </p>
        )}

        {/* Speed Highlight & Pricing Hero Box */}
        <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between rounded-xl sm:rounded-2xl bg-slate-50/80 p-2.5 sm:p-3.5 border border-slate-200/70">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary-600 text-white shadow-xs shrink-0">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t("speed")}
              </span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                {packageData.speedMbps}{" "}
                <span className="text-[11px] sm:text-xs font-bold text-slate-500">Mbps</span>
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            {packageData.originalPriceUsd && (
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 line-through block leading-none mb-0.5 sm:mb-1">
                ${packageData.originalPriceUsd}
              </span>
            )}
            <div className="flex items-baseline justify-end leading-none">
              <span className="text-xl sm:text-3xl font-black text-slate-900">
                ${packageData.monthlyPriceUsd}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 ml-0.5">
                {t("perMonth")}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Clean, Essential Highlights (Only top essential items - NO cluttered walls of text) */}
      <CardContent className="px-3.5 py-1.5 sm:px-6 sm:py-2 flex-1">
        <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600 pt-1 border-t border-slate-100">
          {packageData.routerIncluded && (
            <li className="flex items-center gap-1.5 sm:gap-2 text-slate-800 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
              <span className="truncate">{packageData.routerIncluded}</span>
            </li>
          )}

          <li className="flex items-center gap-1.5 sm:gap-2 text-emerald-700 font-semibold">
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
            <span>{t("freeInstall")} ($0 Setup)</span>
          </li>

          {features && features.length > 0 && (
            <li className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
              <span className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 stroke-[3]" />
              </span>
              <span className="truncate">{features[0]}</span>
            </li>
          )}
        </ul>
      </CardContent>

      {/* Action Footer: 1-Tap Direct Telegram Button + View Full Details */}
      <CardFooter className="p-3.5 pt-1.5 sm:p-6 sm:pt-3 flex flex-col gap-1.5 sm:gap-2">
        {/* Primary 1-Click Order via Telegram (No form required!) */}
        <Button
          type="button"
          onClick={handleDirectTelegramOrder}
          disabled={isComingSoon}
          variant="telegram"
          size="default"
          className="w-full rounded-xl font-bold text-xs sm:text-base py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-[#229ED9]/20 transition-all active:scale-[0.99] cursor-pointer min-h-[44px]"
        >
          <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span>{isComingSoon ? t("comingSoon") : t("orderViaTelegram")}</span>
        </Button>

        {/* Secondary: View Full Details & Specs in Dialog */}
        <Button
          type="button"
          onClick={() => !isComingSoon && onSelect(packageData)}
          disabled={isComingSoon}
          variant="outline"
          size="sm"
          className="w-full rounded-xl text-[11px] sm:text-xs font-semibold py-2 sm:py-2.5 border-slate-200 text-slate-700 hover:text-primary-600 hover:border-primary-400 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[38px]"
          aria-label={isComingSoon ? `${packageData.name} - ${t("comingSoon")}` : `Buy Now for ${packageData.name}`}
        >
          <Info className="h-3.5 w-3.5 text-slate-400" />
          <span>{t("viewDetails")}</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
