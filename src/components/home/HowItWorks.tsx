"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Search, CheckCircle, Send, Wifi, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      step: "01",
      icon: Search,
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      step: "02",
      icon: CheckCircle,
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      step: "03",
      icon: Send,
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
    {
      step: "04",
      icon: Wifi,
      title: t("step4Title"),
      desc: t("step4Desc"),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3.5 py-1 text-xs font-bold text-secondary-700 mb-3 border border-secondary-200">
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md shadow-primary-600/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

