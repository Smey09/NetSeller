import { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { sellerConfig } from "@/config/seller";
import { siteConfig } from "@/config/site";
import { internetPackages } from "@/data/packages";
import { PackageGrid } from "@/components/packages/PackageGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import {
  Send,
  Phone,
  Download,
  Share2,
  ShieldCheck,
  MapPin,
  Clock,
  Wifi,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { VCardButton } from "./VCardButton";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKm = locale === "km";
  const title = isKm
    ? `${sellerConfig.name} - កាតអាជីវកម្មឌីជីថល NetSeller`
    : `${sellerConfig.name} - NetSeller Digital Business Card`;

  const description = isKm
    ? `ស្កេនភ្ជាប់សេវាអ៊ីនធឺណិតខ្សែកាបអុបទិក និងវ៉ាយហ្វាយល្បឿនលឿនជាមួយ ${sellerConfig.name}។ ឆាតផ្ទាល់តាម Telegram ឬទូរស័ព្ទមកកាន់ ${sellerConfig.phoneDisplay}។`
    : `Official Digital Business Card for ${sellerConfig.name}. Fast fiber Internet packages, free installation, and direct Telegram support across Cambodia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/card`,
    },
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function DigitalBusinessCardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("card");
  const isKm = locale === "km";
  const title = isKm ? sellerConfig.titleKm : sellerConfig.titleEn;
  const bio = isKm ? sellerConfig.bioKm : sellerConfig.bioEn;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-slate-50 to-white py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-xl">
        {/* Scanned Badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("connectedBadge")}</span>
          </div>
        </div>

        {/* Digital Business Card Hero Container */}
        <div className="relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl overflow-hidden">
          {/* Decorative banner top */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500" />

          {/* Avatar & Verified Badge */}
          <div className="relative pt-8 text-center flex flex-col items-center">
            <div className="relative">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center text-white overflow-hidden">
                {sellerConfig.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={sellerConfig.avatarUrl}
                    alt={sellerConfig.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Wifi className="h-12 w-12 text-primary-400" />
                )}
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md border-2 border-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {sellerConfig.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-primary-600">
                {title}
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{t("coverageLabel")}</span>
              </div>
            </div>

            {/* Quick Bio */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 max-w-md">
              {bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-6 w-full space-y-2.5">
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  variant="telegram"
                  size="lg"
                  className="w-full font-bold rounded-2xl gap-2 shadow-lg shadow-[#229ED9]/25 text-sm py-3.5"
                >
                  <Send className="h-4 w-4" />
                  <span>{t("chatTelegram", { username: sellerConfig.telegramUsername.replace(/^@/, "") })}</span>
                </Button>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a href={`tel:${sellerConfig.phone}`} className="w-full">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full font-semibold rounded-2xl gap-2 text-xs border-slate-200 text-slate-800"
                  >
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>{t("callHotline")}</span>
                  </Button>
                </a>

                {/* Save Contact (vCard download) */}
                <VCardButton />
              </div>
            </div>

            {/* Seller stats pill */}
            <div className="mt-6 grid grid-cols-3 gap-2 w-full pt-4 border-t border-slate-100 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50">
                <strong className="block text-slate-900 font-extrabold text-sm sm:text-base">
                  {sellerConfig.experienceYears}+ {t("yrs")}
                </strong>
                <span className="text-[10px] text-slate-500">{t("experienceLabel")}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <strong className="block text-primary-600 font-extrabold text-sm sm:text-base">
                  {sellerConfig.completedInstallations}+
                </strong>
                <span className="text-[10px] text-slate-500">{t("installsLabel")}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <strong className="block text-emerald-600 font-extrabold text-sm sm:text-base">
                  &lt;15m
                </strong>
                <span className="text-[10px] text-slate-500">{t("replyLabel")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Packages Section right below card */}
        <div className="mt-10 space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
              {t("popularPackagesTitle")}
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {t("popularPackagesSubtitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("zeroSetupNote")}
            </p>
          </div>

          <PackageGrid packages={internetPackages.slice(0, 3)} showFilters={false} />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/packages">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto rounded-xl border-slate-300 text-slate-700 font-semibold gap-1.5 text-xs shadow-sm hover:border-primary-500 hover:text-primary-600"
              >
                <span>{t("viewAllPlans")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="w-full sm:w-auto rounded-xl text-slate-600 font-semibold gap-1.5 text-xs hover:text-primary-600 hover:bg-slate-100"
              >
                <span>{t("visitWebsite")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
