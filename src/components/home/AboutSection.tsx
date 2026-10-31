"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  PhoneCall,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  User,
} from "lucide-react";
import { Locale } from "@/types";

export function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const title = isKm ? sellerConfig.titleKm : sellerConfig.titleEn;
  const bio = isKm ? sellerConfig.bioKm : sellerConfig.bioEn;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Avatar & Badges */}
            <div className="lg:col-span-5 text-center">
              <div className="relative inline-block mx-auto">
                <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl bg-gradient-to-tr from-primary-600 via-primary-500 to-secondary-500 p-1 shadow-2xl mx-auto flex items-center justify-center">
                  <div className="h-full w-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white p-3 overflow-hidden">
                    {sellerConfig.avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={sellerConfig.avatarUrl}
                        alt={sellerConfig.name}
                        className="h-full w-full object-cover rounded-[20px]"
                      />
                    ) : (
                      <>
                        <User className="h-12 w-12 text-primary-400 mb-1" />
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary-300">
                          {t("personalSellerBadge")}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Verified seller pill */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-3.5 py-1 text-xs font-bold text-white shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{t("authorizedConsultantBadge")}</span>
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {sellerConfig.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-primary-600">
                  {title}
                </p>
              </div>

              {/* Quick stats grid */}
              <div className="mt-6 grid grid-cols-2 gap-2 text-left">
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-xs">
                  <span className="text-xl font-black text-slate-900 block">
                    {sellerConfig.experienceYears}+
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {t("statExperience")}
                  </span>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-xs">
                  <span className="text-xl font-black text-primary-600 block">
                    {sellerConfig.completedInstallations}+
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {t("statInstallations")}
                  </span>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-xs">
                  <span className="text-xl font-black text-emerald-600 block">
                    {sellerConfig.satisfactionRate}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {t("statSatisfaction")}
                  </span>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-xs">
                  <span className="text-xl font-black text-secondary-600 block">
                    &lt;15m
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {t("statResponse")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Consultant Bio & Direct CTA */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-800">
                <Sparkles className="h-3 w-3 text-primary-600" />
                <span>{t("badge")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t("messageTitle")}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {bio}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed italic bg-white/70 p-4 rounded-2xl border border-slate-200/60">
                &ldquo;{t("messageBody")}&rdquo;
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="telegram"
                    size="lg"
                    className="w-full sm:w-auto font-bold rounded-xl gap-2 text-sm shadow-md shadow-[#229ED9]/25"
                  >
                    <Send className="h-4 w-4" />
                    <span>{t("chatWithSeller")}</span>
                  </Button>
                </a>

                <a href={`tel:${sellerConfig.phone}`} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto font-semibold rounded-xl border-slate-300 gap-2 text-sm text-slate-700"
                  >
                    <PhoneCall className="h-4 w-4 text-emerald-600" />
                    <span>{sellerConfig.phoneDisplay}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

