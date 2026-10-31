"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  UserCheck,
  MessageSquare,
  Wrench,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export function WhyChooseMe() {
  const t = useTranslations("whyMe");

  const reasons = [
    {
      icon: UserCheck,
      title: t("item1Title"),
      desc: t("item1Desc"),
      color: "bg-primary-50 text-primary-600 border-primary-200",
    },
    {
      icon: MessageSquare,
      title: t("item2Title"),
      desc: t("item2Desc"),
      color: "bg-sky-50 text-sky-600 border-sky-200",
    },
    {
      icon: Wrench,
      title: t("item3Title"),
      desc: t("item3Desc"),
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      icon: CheckCircle,
      title: t("item4Title"),
      desc: t("item4Desc"),
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  return (
    <section id="why-choose-me" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold text-primary-700 mb-3 border border-primary-200/60">
            <Sparkles className="h-3.5 w-3.5 text-primary-600" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${item.color} mb-5 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6" />
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

