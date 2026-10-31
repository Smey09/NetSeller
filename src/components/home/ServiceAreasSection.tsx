"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import { MapPin, Clock, CheckCircle2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Locale } from "@/types";

export function ServiceAreasSection() {
  const t = useTranslations("serviceAreas");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const getStatusBadge = (status: "full" | "high" | "expanding") => {
    switch (status) {
      case "full":
        return (
          <Badge variant="success" className="text-[11px] font-bold">
            {t("statusFull")}
          </Badge>
        );
      case "high":
        return (
          <Badge variant="secondary" className="text-[11px] font-bold">
            {t("statusHigh")}
          </Badge>
        );
      case "expanding":
        return (
          <Badge variant="accent" className="text-[11px] font-bold">
            {t("statusExpanding")}
          </Badge>
        );
    }
  };

  return (
    <section id="service-areas" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-3 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Coverage cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {sellerConfig.serviceAreas.map((area) => (
            <div
              key={area.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {isKm ? area.nameKm : area.nameEn}
                    </h3>
                  </div>
                </div>

                <div className="mt-2">
                  {getStatusBadge(area.coverageStatus)}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {t("timeLabel")}
                </span>
                <strong className="text-slate-800 font-semibold">
                  {isKm && area.estimatedInstallHoursKm ? area.estimatedInstallHoursKm : area.estimatedInstallHours}
                </strong>
              </div>
            </div>
          ))}
        </div>

        {/* Check your address callout */}
        <div className="mt-10 max-w-2xl mx-auto rounded-2xl bg-primary-50 border border-primary-200 p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-primary-900 leading-relaxed font-medium">
            {t("customLocationPrompt")}
          </p>
          <a
            href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="telegram" size="sm" className="rounded-xl font-bold gap-1.5 text-xs">
              <Send className="h-3.5 w-3.5" />
              <span>{t("checkAddressBtn")}</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

