"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { internetPackages } from "@/data/packages";
import { PackageGrid } from "@/components/packages/PackageGrid";
import { Sparkles } from "lucide-react";

export function PackageSection() {
  const t = useTranslations("packages");

  return (
    <section id="packages" className="py-8 sm:py-20 bg-transparent relative scroll-mt-16 sm:scroll-mt-20">
      <div className="container mx-auto px-3.5 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-xl px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-slate-700 mb-2 sm:mb-3 border border-white/85 shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(15,23,42,0.03)]">
            <Sparkles className="h-3.5 w-3.5 text-slate-700" />
            <span>{t("badgeFiber")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 4 Dedicated Home Wi-Fi Packages Grid */}
        <PackageGrid packages={internetPackages} showFilters={false} />
      </div>
    </section>
  );
}
