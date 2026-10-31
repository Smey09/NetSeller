"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { InternetPackage } from "@/types";
import { PackageCard } from "./PackageCard";
import { PackageOrderDialog } from "./PackageOrderDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wifi, Building2, Home } from "lucide-react";

interface PackageGridProps {
  packages: InternetPackage[];
  initialCategory?: string;
  showFilters?: boolean;
}

export function PackageGrid({
  packages,
  initialCategory = "all",
  showFilters = true,
}: PackageGridProps) {
  const t = useTranslations("packages");
  const [selectedCategory, setSelectedCategory] = React.useState<string>(initialCategory);
  const [selectedPackageForOrder, setSelectedPackageForOrder] =
    React.useState<InternetPackage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const filteredPackages = React.useMemo(() => {
    if (selectedCategory === "all") return packages;
    if (selectedCategory === "home") {
      return packages.filter(
        (p) => p.category === "home" || p.category === "residential" || p.category === "fiber"
      );
    }
    if (selectedCategory === "business") {
      return packages.filter((p) => p.category === "business" || p.category === "office");
    }
    return packages;
  }, [packages, selectedCategory]);

  const handleSelectPackage = (pkg: InternetPackage) => {
    setSelectedPackageForOrder(pkg);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full">
      {/* Category filter pills (Frosted Glass Dock) */}
      {showFilters && (
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-white/65 backdrop-blur-xl border border-white/85 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(15,23,42,0.03)]">
            <Button
              type="button"
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all",
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent border-transparent text-slate-700 hover:text-slate-950 hover:bg-white/60"
              )}
            >
              <Wifi className="h-3.5 w-3.5 mr-1.5" />
              {t("filterAll")} ({packages.length})
            </Button>

            <Button
              type="button"
              variant={selectedCategory === "home" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("home")}
              className={cn(
                "rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all",
                selectedCategory === "home"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent border-transparent text-slate-700 hover:text-slate-950 hover:bg-white/60"
              )}
            >
              <Home className="h-3.5 w-3.5 mr-1.5" />
              {t("filterHome")}
            </Button>

            <Button
              type="button"
              variant={selectedCategory === "business" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("business")}
              className={cn(
                "rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all",
                selectedCategory === "business"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent border-transparent text-slate-700 hover:text-slate-950 hover:bg-white/60"
              )}
            >
              <Building2 className="h-3.5 w-3.5 mr-1.5" />
              {t("filterBusiness")}
            </Button>
          </div>
        </div>
      )}

      {/* Responsive Grid: 1 col on mobile (320px+), 2 cols on tablet (768px+), 3 cols on desktop (1024px+) */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8 items-stretch">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageData={pkg}
              onSelect={handleSelectPackage}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl p-10 sm:p-12 text-center max-w-md mx-auto space-y-4 my-8 shadow-xs">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Wifi className="h-7 w-7" />
          </div>
          <p className="text-sm font-semibold text-slate-700">{t("noPackagesFound")}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="rounded-xl font-semibold text-xs"
          >
            {t("resetFilter")}
          </Button>
        </div>
      )}

      {/* Accessible Buy Now / Order Dialog */}
      <PackageOrderDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedPackage={selectedPackageForOrder}
        allPackages={packages}
        onPackageChange={(pkg) => setSelectedPackageForOrder(pkg)}
      />
    </div>
  );
}

