"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { InternetPackage, Locale } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Zap, Info } from "lucide-react";
import { PackageOrderDialog } from "./PackageOrderDialog";

interface PackageComparisonTableProps {
  packages: InternetPackage[];
}

export function PackageComparisonTable({ packages }: PackageComparisonTableProps) {
  const t = useTranslations("comparison");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const [selectedPkg, setSelectedPkg] = React.useState<InternetPackage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOrder = (pkg: InternetPackage) => {
    setSelectedPkg(pkg);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{t("title")}</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">{t("subtitle")}</p>
        <span className="sm:hidden text-xs text-slate-400 mt-2 block italic">
          ⇄ {t("swipeHint")}
        </span>
      </div>

      <div className="w-full overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-xs border-b border-slate-200">
            <tr>
              <th scope="col" className="py-4 px-6 font-bold">{t("package")}</th>
              <th scope="col" className="py-4 px-6 font-bold">{t("speed")}</th>
              <th scope="col" className="py-4 px-6 font-bold">{t("monthlyPrice")}</th>
              <th scope="col" className="py-4 px-6 font-bold">{t("router")}</th>
              <th scope="col" className="py-4 px-6 font-bold">{t("setupFee")}</th>
              <th scope="col" className="py-4 px-6 font-bold text-center">{t("action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packages.map((pkg) => {
              const equipmentTerms = isKm ? pkg.equipmentTermsKm : pkg.equipmentTermsEn;

              return (
                <tr key={pkg.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Zap className="h-4 w-4" />
                    </span>
                    <span>{pkg.name}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {pkg.speedMbps} Mbps
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-base font-extrabold text-primary-600">
                      ${pkg.monthlyPriceUsd}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/mo</span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 max-w-[220px]">
                    <div className="flex items-center gap-1.5 font-medium text-slate-800">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{pkg.routerIncluded}</span>
                    </div>
                    {equipmentTerms && (
                      <span className="text-[11px] text-slate-400 block mt-1 line-clamp-2">
                        {equipmentTerms}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-xs font-bold text-emerald-600">
                    {pkg.isFreeInstallation ? t("freeSetup") : `$${pkg.installationFeeUsd}`}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Button
                      size="sm"
                      onClick={() => handleOrder(pkg)}
                      className="rounded-lg text-xs font-semibold px-4 py-1.5"
                      aria-label={`Select ${pkg.name} package`}
                    >
                      {t("action")}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <PackageOrderDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedPackage={selectedPkg}
        allPackages={packages}
      />
    </div>
  );
}
