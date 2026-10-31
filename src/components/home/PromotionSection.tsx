"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { promotionsData } from "@/data/promotions";
import { sellerConfig } from "@/config/seller";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Tag, Send, ArrowRight, Gift, Clock } from "lucide-react";
import { Locale } from "@/types";

export function PromotionSection() {
  const t = useTranslations("promotions");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  return (
    <section id="promotions" className="py-8 sm:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="container mx-auto px-3.5 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-amber-800 mb-2 sm:mb-3 border border-amber-200/60">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Promotions Cards Grid or Empty State */}
        {promotionsData && promotionsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-8">
            {promotionsData.map((promo) => {
              const title = isKm ? promo.titleKm : promo.titleEn;
              const description = isKm ? promo.descriptionKm : promo.descriptionEn;
              const badge = isKm ? promo.badgeKm : promo.badgeEn;
              const highlight = isKm ? promo.highlightKm : promo.highlightEn;
              const validUntil = isKm && promo.validUntilKm ? promo.validUntilKm : promo.validUntil;
              const isExpired = !!promo.isExpired;

              const promoClaimText = isKm
                ? `សួស្តីបង! ខ្ញុំចង់ទទួលយកការផ្ដល់ជូនប្រូម៉ូសិន៖ ${title} (${promo.code || "ការផ្ដល់ជូនពិសេស"})`
                : `Hello! I want to claim this promotion for Internet subscription: ${title} (${promo.code || "Special Offer"})`;

              const telegramClaimUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(promoClaimText)}`;

              return (
                <div
                  key={promo.id}
                  className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-white p-4 sm:p-7 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 overflow-hidden ${
                    isExpired ? "border-slate-200 opacity-75" : "border-slate-200/80"
                  }`}
                >
                  {/* Decorative corner tag */}
                  {highlight && (
                    <div className="absolute top-0 right-0">
                      <div className={`text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider py-0.5 px-3 sm:py-1 sm:px-4 rounded-bl-xl sm:rounded-bl-2xl shadow-2xs ${
                        isExpired
                          ? "bg-slate-400"
                          : "bg-amber-500"
                      }`}>
                        {highlight}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="mb-3 sm:mb-4 flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] sm:text-xs font-bold text-primary-700 bg-primary-50 border-primary-200 py-0.5">
                        {badge}
                      </Badge>
                      {isExpired && (
                        <Badge variant="outline" className="text-[10px] sm:text-xs font-bold bg-slate-100 text-slate-500 border-slate-300 py-0.5">
                          <Clock className="h-3 w-3 mr-1" />
                          {t("expiredBadge")}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 sm:mt-2.5">
                      {description}
                    </p>

                    {/* Promo details */}
                    <div className="mt-3.5 sm:mt-5 space-y-1.5 sm:space-y-2 border-t border-slate-100 pt-2.5 sm:pt-3 text-[11px] sm:text-xs text-slate-500">
                      {validUntil && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>
                            {t("validUntil")}{" "}
                            <strong className="text-slate-800">{validUntil}</strong>
                          </span>
                        </div>
                      )}

                      {promo.code && (
                        <div className="flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span>
                            {t("promoCode")}{" "}
                            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                              {promo.code}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-6 mt-3 sm:mt-4">
                    {isExpired ? (
                      <Button
                        disabled
                        variant="outline"
                        size="sm"
                        className="w-full rounded-xl font-bold text-xs sm:text-sm py-2 sm:py-2.5 opacity-50 cursor-not-allowed min-h-[42px]"
                      >
                        <span>{t("expiredBadge")}</span>
                      </Button>
                    ) : (
                      <a
                        href={telegramClaimUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          variant="telegram"
                          size="sm"
                          className="w-full rounded-xl font-bold text-xs sm:text-sm py-2 sm:py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm min-h-[42px]"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>{t("claimBtn")}</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-10 text-center max-w-md mx-auto space-y-3 shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Gift className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">{t("noPromotions")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
