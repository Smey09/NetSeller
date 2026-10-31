import * as React from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import {
  Wifi,
  Send,
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { Locale } from "@/types";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const workingHoursDisplay =
    isKm && sellerConfig.workingHoursKm
      ? sellerConfig.workingHoursKm
      : sellerConfig.workingHours;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-md">
                <Wifi className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center">
                  Net<span className="text-primary-400">Seller</span>
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-secondary-300 bg-secondary-900/60 px-1.5 py-0.2 rounded">
                    KH
                  </span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  {tNav("cambodiaInternet")}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("tagline")}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#229ED9] text-white hover:opacity-90 transition-opacity"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={sellerConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a
                href={`tel:${sellerConfig.phone}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white hover:opacity-90 transition-opacity"
                aria-label="Call Direct"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  {tNav("packages")}
                </Link>
              </li>
              <li>
                <Link href="/#promotions" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  {tNav("promotions")}
                </Link>
              </li>
              <li>
                <Link href="/#why-choose-me" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  {tNav("whyMe")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <Link href="/card" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  <span>{tNav("digitalCard")}</span>
                </Link>
              </li>
              <li>
                <Link href="/qr" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  <span>{tNav("qrGenerator")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coverage Areas */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t("serviceLocations")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {sellerConfig.serviceAreas.map((area) => (
                <li key={area.id} className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary-400 shrink-0" />
                  <span>{isKm ? area.nameKm : area.nameEn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t("contactInfo")}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Send className="h-4 w-4 text-[#229ED9] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">{tContact("telegramDirect")}</span>
                  <a
                    href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    @{sellerConfig.telegramUsername.replace(/^@/, "")}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">{tContact("phone")}</span>
                  <a href={`tel:${sellerConfig.phone}`} className="hover:underline">
                    {sellerConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">{tContact("workingHours")}</span>
                  <span>{workingHoursDisplay}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">Email</span>
                  <span>{sellerConfig.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5 text-center md:text-left">
            <Shield className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span>{t("disclaimer")}</span>
          </p>

          <p className="shrink-0 text-center">
            © {new Date().getFullYear()} {sellerConfig.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
