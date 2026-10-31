"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { sellerConfig } from "@/config/seller";
import { QRCodeService } from "@/features/qr/qr.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  Download,
  Copy,
  Check,
  Smartphone,
  Printer,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";
import { Locale } from "@/types";

export function QRCodeGenerator() {
  const t = useTranslations("qr");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const [qrPngUrl, setQrPngUrl] = React.useState<string>("");
  const [includeCampaignParam, setIncludeCampaignParam] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const activeUrl = React.useMemo(() => {
    return includeCampaignParam
      ? `${siteConfig.url}/?source=business_card`
      : siteConfig.url;
  }, [includeCampaignParam]);

  React.useEffect(() => {
    let isMounted = true;
    QRCodeService.generatePngDataUrl({ url: activeUrl }).then((dataUrl) => {
      if (isMounted) setQrPngUrl(dataUrl);
    });
    return () => {
      isMounted = false;
    };
  }, [activeUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadPng = async () => {
    setIsGenerating(true);
    try {
      await QRCodeService.downloadPng("NetSeller_BusinessCard_QR.png", { url: activeUrl });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSvg = async () => {
    setIsGenerating(true);
    try {
      await QRCodeService.downloadSvg("NetSeller_BusinessCard_QR.svg", { url: activeUrl });
    } finally {
      setIsGenerating(false);
    }
  };

  const title = isKm ? sellerConfig.titleKm : sellerConfig.titleEn;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 mb-2 border border-primary-200">
            <QrCode className="h-3.5 w-3.5 text-primary-600" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t("subtitle")}
          </p>
        </div>

        <Badge variant="success" className="text-xs py-1 px-3">
          <ShieldCheck className="h-3.5 w-3.5 mr-1" />
          {t("errorCorrection")}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: QR Code Visual & Card Mockup */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative p-6 bg-gradient-to-tr from-slate-900 via-primary-950 to-slate-900 rounded-3xl shadow-xl text-center w-full max-w-xs">
            {/* White QR Code container with standard quiet zone */}
            <div className="bg-white p-4 rounded-2xl shadow-md inline-block mx-auto">
              {qrPngUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrPngUrl}
                  alt="NetSeller Business Card QR Code"
                  width={220}
                  height={220}
                  className="rounded-lg aspect-square"
                />
              ) : (
                <div className="w-[220px] h-[220px] flex items-center justify-center bg-slate-50 animate-pulse text-xs text-slate-400">
                  {t("scanToConnect")}...
                </div>
              )}
            </div>

            <div className="mt-4 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary-400 block">
                {sellerConfig.name}
              </span>
              <span className="text-[11px] text-slate-300 block">
                {title}
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block truncate">
                {activeUrl}
              </span>
            </div>
          </div>

          <span className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-primary-600" />
            iPhone & Android
          </span>
        </div>

        {/* Right Column: Customization, URLs, and Downloads */}
        <div className="md:col-span-7 space-y-6">
          {/* Target URL Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              {t("destinationUrl")}
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={activeUrl}
                className="flex-1 h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 select-all"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="rounded-xl h-11 px-3 gap-1.5 text-xs shrink-0"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? t("copied") : t("copyUrl")}</span>
              </Button>
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeCampaignParam}
                onChange={(e) => setIncludeCampaignParam(e.target.checked)}
                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
              />
              <span>{t("analyticsParam")}</span>
            </label>
          </div>

          {/* Download Buttons for Print Shops */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={handleDownloadSvg}
                disabled={isGenerating}
                className="w-full rounded-2xl font-bold gap-2 text-xs sm:text-sm py-3 bg-primary-600 hover:bg-primary-700 shadow-sm"
              >
                <Layers className="h-4 w-4" />
                <span>{t("downloadSvg")}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleDownloadPng}
                disabled={isGenerating}
                className="w-full rounded-2xl font-semibold gap-2 text-xs sm:text-sm py-3 border-slate-200 text-slate-800 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                <span>{t("downloadPng")}</span>
              </Button>
            </div>
          </div>

          {/* Guidelines */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <span className="font-bold text-slate-900 block mb-1">{t("printGuideTitle")}</span>
            <p>• {t("guide1")}</p>
            <p>• {t("guide2")}</p>
            <p>• {t("guide3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
