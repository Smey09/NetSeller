import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { internetPackages } from "@/data/packages";
import { PackageGrid } from "@/components/packages/PackageGrid";
import { PackageComparisonTable } from "@/components/packages/PackageComparisonTable";
import { sellerConfig } from "@/config/seller";
import { Button } from "@/components/ui/button";
import {
  Wifi,
  ShieldCheck,
  Send,
  Zap,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKm = locale === "km";
  return {
    title: isKm
      ? "កញ្ចប់សេវាអ៊ីនធឺណិត និងតម្លៃប្រចាំខែ"
      : "Internet Packages & Monthly Pricing",
    description: isKm
      ? "ប្រៀបធៀបល្បឿន និងតម្លៃកញ្ចប់អ៊ីនធឺណិតខ្សែកាបអុបទិកសម្រាប់គេហដ្ឋាន និងអាជីវកម្មនៅកម្ពុជា។"
      : "Compare speed, monthly pricing, and routers for home, fiber, and business internet packages in Cambodia.",
  };
}

export default async function PackagesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("packages");

  return (
    <div className="py-12 sm:py-16 bg-slate-50/60 min-h-screen">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3.5 py-1 text-xs font-bold text-primary-800 mb-3 border border-primary-200">
            <Zap className="h-3.5 w-3.5 text-primary-600" />
            <span>{t("officialPlansBadge")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* All Packages Grid */}
        <div className="mb-16">
          <PackageGrid packages={internetPackages} showFilters={true} />
        </div>

        {/* Detailed Side-by-Side Comparison */}
        <div className="my-16">
          <PackageComparisonTable packages={internetPackages} />
        </div>

        {/* Hardware & Router FAQ Box */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {t("equipmentTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {t("equipmentSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
            <div className="space-y-2 border-l-2 border-primary-500 pl-4">
              <h4 className="font-bold text-slate-900 text-sm">
                {t("equipmentSpecs")}
              </h4>
              <p className="leading-relaxed">
                {t("equipmentSpecsDesc")}
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-emerald-500 pl-4">
              <h4 className="font-bold text-slate-900 text-sm">
                {t("cableDropSpecs")}
              </h4>
              <p className="leading-relaxed">
                {t("cableDropSpecsDesc")}
              </p>
            </div>
          </div>

          {/* Need advice Telegram CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-amber-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">
                {t("helpPrompt")}
              </span>
            </div>

            <a
              href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0"
            >
              <Button variant="telegram" size="sm" className="w-full rounded-xl font-bold gap-2 text-xs">
                <Send className="h-3.5 w-3.5" />
                <span>{t("askTelegram")}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
