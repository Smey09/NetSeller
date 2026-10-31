"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Clock, Wrench, CheckCircle2, Send, Zap } from "lucide-react";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Locale } from "@/types";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const tPackages = useTranslations("packages");
  const locale = useLocale() as Locale;

  const commitments = [
    {
      icon: Clock,
      title: t("commitment1Title"),
      subtitle: t("commitment1Subtitle"),
      desc: t("commitment1Desc"),
      badge: t("badgeRealtime"),
      color: "text-[#229ED9] bg-[#229ED9]/10",
    },
    {
      icon: Wrench,
      title: t("commitment2Title"),
      subtitle: t("commitment2Subtitle"),
      desc: t("commitment2Desc"),
      badge: t("badgeFastDispatch"),
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: ShieldCheck,
      title: t("commitment3Title"),
      subtitle: t("commitment3Subtitle"),
      desc: t("commitment3Desc"),
      badge: t("badgeZeroRisk"),
      color: "text-primary-600 bg-primary-50",
    },
  ];

  return (
    <section id="guarantees" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-3 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} shadow-xs`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{t("guaranteedBy")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live consultation banner */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto text-center p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left text-xs sm:text-sm text-slate-700">
            <strong className="block text-slate-900">{t("questionsTitle")}</strong>
            <span>{t("questionsSubtitle")}</span>
          </div>
          <a
            href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => PrivacyAnalytics.track("telegram_click", { location: "guarantees_banner" })}
            className="shrink-0 w-full sm:w-auto"
          >
            <Button variant="telegram" size="sm" className="w-full sm:w-auto font-bold rounded-xl gap-1.5 text-xs">
              <Send className="h-3.5 w-3.5" />
              <span>{tPackages("askTelegram")}</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
