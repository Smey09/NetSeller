"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { internetPackages } from "@/data/packages";
import { PackageGrid } from "@/components/packages/PackageGrid";
import { PackageComparisonTable } from "@/components/packages/PackageComparisonTable";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, LayoutGrid } from "lucide-react";

export function PackageSection() {
  const t = useTranslations("packages");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");

  return (
    <section id="packages" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold text-primary-700 mb-3 border border-primary-200/50">
            <span>{t("badgeFiber")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Toggle between Grid & Table view */}
          <div className="mt-6 inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-white text-primary-700 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>{t("cardsView")}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                viewMode === "table"
                  ? "bg-white text-primary-700 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>{t("compareTable")}</span>
            </button>
          </div>
        </div>

        {/* View rendering */}
        {viewMode === "grid" ? (
          <PackageGrid packages={internetPackages} />
        ) : (
          <PackageComparisonTable packages={internetPackages} />
        )}

        {/* Link to full dedicated packages page */}
        <div className="mt-12 text-center">
          <Link href="/packages">
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl border-slate-300 font-semibold text-slate-700 hover:border-primary-600 hover:text-primary-600 gap-2 px-6"
            >
              <span>{t("exploreAllSpecs")}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

