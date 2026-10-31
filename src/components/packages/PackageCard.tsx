"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { InternetPackage, Locale } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import {
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
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
  const suitableFor = isKm ? packageData.suitableForKm : packageData.suitableForEn;
  const badgeText = isKm ? packageData.badgeKm : packageData.badge;
  const equipmentTerms = isKm ? packageData.equipmentTermsKm : packageData.equipmentTermsEn;

  const handleQuickTelegramChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    PrivacyAnalytics.track("telegram_click", {
      location: "package_card_quick",
      packageId: packageData.id,
    });
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        isPopular
          ? "border-2 border-primary-500 shadow-lg shadow-primary-500/10 ring-4 ring-primary-500/10"
          : "border-slate-200/90 shadow-sm",
        className
      )}
    >
      {/* Top Banner for popular / featured */}
      {isPopular && (
        <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 py-1.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{badgeText || t("popular")}</span>
        </div>
      )}

      {/* Header */}
      <CardHeader className={cn("p-6 pb-4", isPopular ? "pt-5" : "pt-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block">
              {packageData.category === "home" ? t("categoryHome") : t("categoryBusiness")}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5 break-words">
              {packageData.name}
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            {!isPopular && badgeText && (
              <Badge
                variant={isPromoted ? "accent" : "secondary"}
                className="font-semibold text-xs py-0.5"
              >
                {badgeText}
              </Badge>
            )}

            {isComingSoon && (
              <Badge variant="outline" className="text-[11px] font-bold bg-slate-100 text-slate-600 border-slate-300">
                <Clock className="h-3 w-3 mr-1" />
                {t("comingSoon")}
              </Badge>
            )}

            {!isPopular && !badgeText && isLimited && (
              <Badge variant="accent" className="font-semibold text-xs py-0.5">
                {t("limited")}
              </Badge>
            )}
          </div>
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2 line-clamp-2">
            {description}
          </p>
        )}

        {/* Speed Highlight Badge */}
        <div className="mt-4 flex items-baseline justify-between rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/30 shrink-0">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                {t("speed")}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {packageData.speedMbps}{" "}
                <span className="text-sm font-bold text-slate-500">Mbps</span>
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            {packageData.originalPriceUsd && (
              <span className="text-xs font-medium text-slate-400 line-through block">
                ${packageData.originalPriceUsd}
              </span>
            )}
            <div className="flex items-baseline justify-end">
              <span className="text-2xl sm:text-3xl font-black text-primary-600">
                ${packageData.monthlyPriceUsd}
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-0.5">
                {t("perMonth")}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Content / Features */}
      <CardContent className="p-6 pt-0 flex-1">
        {/* Router & installation highlight */}
        <div className="space-y-2 mb-4 pt-2 border-t border-slate-100 text-xs">
          {packageData.routerIncluded && (
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="line-clamp-1">{packageData.routerIncluded}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{t("freeInstall")} ($0)</span>
          </div>

          {suitableFor && (
            <div className="flex items-center gap-2 text-slate-500 text-xs pt-0.5">
              <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{suitableFor}</span>
            </div>
          )}

          {equipmentTerms && (
            <div className="rounded-xl bg-slate-50 p-2 border border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500 leading-snug">
              <Info className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
              <span>{equipmentTerms}</span>
            </div>
          )}
        </div>

        {/* Bullet points (safely rendered when items present) */}
        {features && features.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {t("keyFeatures")}
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      {/* Footer / Buy Now Button & Direct Chat Link */}
      <CardFooter className="p-6 pt-0 flex flex-col gap-2">
        <Button
          onClick={() => !isComingSoon && onSelect(packageData)}
          disabled={isComingSoon}
          variant={isPopular ? "default" : "outline"}
          size="lg"
          className={cn(
            "w-full rounded-xl font-bold text-sm sm:text-base py-3 transition-all flex items-center justify-center gap-2 shadow-sm",
            isPopular
              ? "bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/30"
              : "border-slate-300 hover:border-primary-600 hover:bg-primary-50 hover:text-primary-700 text-slate-800",
            isComingSoon && "opacity-60 cursor-not-allowed hover:bg-slate-50 hover:text-slate-500 hover:border-slate-300"
          )}
          aria-label={isComingSoon ? `${packageData.name} - ${t("comingSoon")}` : `Buy Now for ${packageData.name}`}
        >
          <span>{isComingSoon ? t("comingSoon") : t("buyNow")}</span>
          {!isComingSoon && <ArrowRight className="h-4 w-4" />}
        </Button>

        {/* Direct quick Telegram consultation link */}
        <a
          href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleQuickTelegramChat}
          className="text-xs text-slate-500 hover:text-[#229ED9] transition-colors flex items-center justify-center gap-1.5 py-1 font-medium"
        >
          <Send className="h-3 w-3 text-[#229ED9]" />
          <span>{t("quickChat")}</span>
        </a>
      </CardFooter>
    </Card>
  );
}
