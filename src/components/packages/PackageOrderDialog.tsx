"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { InternetPackage, Locale } from "@/types";
import { getOrderFormSchema, OrderFormValues } from "@/lib/validations/order.schema";
import { sellerConfig } from "@/config/seller";
import { PrivacyAnalytics } from "@/lib/analytics";
import { TelegramService } from "@/features/telegram/telegram.service";
import { formatTelegramMessage } from "@/features/telegram/telegram.utils";
import {
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
  Wifi,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Info,
} from "lucide-react";

interface PackageOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: InternetPackage | null;
  allPackages: InternetPackage[];
  onPackageChange?: (pkg: InternetPackage) => void;
}

export function PackageOrderDialog({
  isOpen,
  onClose,
  selectedPackage,
  allPackages,
  onPackageChange,
}: PackageOrderDialogProps) {
  const t = useTranslations("orderDialog");
  const tVal = useTranslations("validations");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const [activeStep, setActiveStep] = React.useState<"form" | "confirm">("form");
  const [copied, setCopied] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentPkg = selectedPackage || allPackages[0];

  const orderSchema = React.useMemo(() => {
    return z.object({
      customerName: z.string().trim().max(100).optional().or(z.literal("")),
      phoneNumber: z.string().trim().max(20).optional().or(z.literal("")),
      selectedPackageId: z.string().min(1, { message: tVal("packageRequired") }),
      installationLocation: z.string().trim().max(250).optional().or(z.literal("")),
      notes: z.string().max(500).optional().or(z.literal("")),
    });
  }, [tVal]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      phoneNumber: "",
      selectedPackageId: currentPkg?.id || "",
      installationLocation: "",
      notes: "",
    },
  });

  // Keep form package value synced with prop
  React.useEffect(() => {
    if (selectedPackage) {
      setValue("selectedPackageId", selectedPackage.id);
    }
  }, [selectedPackage, setValue]);

  // Reset dialog state on close
  React.useEffect(() => {
    if (!isOpen) {
      setActiveStep("form");
      setCopied(false);
    }
  }, [isOpen]);

  const watchedValues = watch();
  const selectedPkgData =
    allPackages.find((p) => p.id === watchedValues.selectedPackageId) || currentPkg;

  const handlePackageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pkgId = e.target.value;
    setValue("selectedPackageId", pkgId);
    const found = allPackages.find((p) => p.id === pkgId);
    if (found && onPackageChange) {
      onPackageChange(found);
    }
  };

  const generatedTelegramMessage = React.useMemo(() => {
    if (!selectedPkgData) return "";
    return formatTelegramMessage({
      customerName: watchedValues.customerName,
      phoneNumber: watchedValues.phoneNumber,
      packageName: selectedPkgData.name,
      packageSpeed: `${selectedPkgData.speedMbps} Mbps`,
      packagePrice: `$${selectedPkgData.monthlyPriceUsd}/month`,
      installationLocation: watchedValues.installationLocation,
      notes: watchedValues.notes,
      locale,
    });
  }, [selectedPkgData, watchedValues, locale]);

  const onFormSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      // Fire-and-forget server logging
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.error("Inquiry record error:", err));

      // Auto-copy formatted message to clipboard for seamless user experience
      await TelegramService.copyToClipboard(generatedTelegramMessage);
      setCopied(true);

      setActiveStep("confirm");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    const success = await TelegramService.copyToClipboard(generatedTelegramMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDirectChatBypass = async () => {
    if (!selectedPkgData) return;
    const links = TelegramService.prepareInquiry({
      customerName: watchedValues.customerName,
      phoneNumber: watchedValues.phoneNumber,
      packageName: selectedPkgData.name,
      packageSpeed: `${selectedPkgData.speedMbps} Mbps`,
      packagePrice: `$${selectedPkgData.monthlyPriceUsd}/month`,
      installationLocation: watchedValues.installationLocation,
      notes: watchedValues.notes,
      locale,
    });

    PrivacyAnalytics.track("telegram_click", {
      location: "dialog_step1_bypass",
      packageId: selectedPkgData.id,
    });

    await TelegramService.copyToClipboard(links.formattedText);
    TelegramService.openTelegram(links, "direct");
  };

  const handleOpenDirectChat = async () => {
    if (!selectedPkgData) return;
    await TelegramService.copyToClipboard(generatedTelegramMessage);
    setCopied(true);

    const links = TelegramService.prepareInquiry({
      customerName: watchedValues.customerName,
      phoneNumber: watchedValues.phoneNumber,
      packageName: selectedPkgData.name,
      packageSpeed: `${selectedPkgData.speedMbps} Mbps`,
      packagePrice: `$${selectedPkgData.monthlyPriceUsd}/month`,
      installationLocation: watchedValues.installationLocation,
      notes: watchedValues.notes,
      locale,
    });

    PrivacyAnalytics.track("telegram_click", {
      location: "dialog_direct_chat",
      packageId: selectedPkgData.id,
    });
    TelegramService.openTelegram(links, "direct");
  };

  const handleOpenTelegramShare = async () => {
    if (!selectedPkgData) return;
    await TelegramService.copyToClipboard(generatedTelegramMessage);
    setCopied(true);

    const links = TelegramService.prepareInquiry({
      customerName: watchedValues.customerName,
      phoneNumber: watchedValues.phoneNumber,
      packageName: selectedPkgData.name,
      packageSpeed: `${selectedPkgData.speedMbps} Mbps`,
      packagePrice: `$${selectedPkgData.monthlyPriceUsd}/month`,
      installationLocation: watchedValues.installationLocation,
      notes: watchedValues.notes,
      locale,
    });

    PrivacyAnalytics.track("telegram_click", {
      location: "dialog_telegram_share",
      packageId: selectedPkgData.id,
    });
    TelegramService.openTelegram(links, "share");
  };

  if (!selectedPkgData) return null;

  const equipmentTerms = isKm
    ? selectedPkgData.equipmentTermsKm
    : selectedPkgData.equipmentTermsEn;

  const selectedPkgFeatures = isKm
    ? selectedPkgData.featuresKm
    : selectedPkgData.features;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg p-0 sm:rounded-3xl border-slate-200 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        closeClassName="text-white/80 hover:text-white hover:bg-white/20 focus:ring-white top-3.5 right-3.5"
      >
        {/* Header styling */}
        <div className="shrink-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-5 pt-5 pb-4 sm:px-6 sm:pt-5 sm:pb-4 text-white relative">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md">
              <Wifi className="h-3.5 w-3.5 text-white" />
            </span>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20 text-[11px] py-0 px-2 font-semibold">
              {isKm ? selectedPkgData.badgeKm || "កញ្ចប់ពេញនិយម" : selectedPkgData.badge || "Verified Plan"}
            </Badge>
          </div>

          <DialogTitle className="text-lg sm:text-2xl font-black text-white tracking-tight">
            {t("title", { packageName: selectedPkgData.name })}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-xs sm:text-sm mt-0.5 line-clamp-2">
            {t("subtitle")}
          </DialogDescription>

          {/* Quick package spec bar */}
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-md text-xs">
            <div className="min-w-0 pr-2">
              <span className="text-white/70 block text-[10px] uppercase font-bold tracking-wider">{t("packageLabel")}</span>
              <span className="font-bold text-white text-xs sm:text-sm truncate block">{selectedPkgData.name} ({selectedPkgData.speedMbps} Mbps)</span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-white/70 block text-[10px] uppercase font-bold tracking-wider">{t("monthlyCost")}</span>
              <span className="text-base sm:text-lg font-black text-amber-300">${selectedPkgData.monthlyPriceUsd}</span>
              <span className="text-white/70 text-xs">/mo</span>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="shrink-0 flex items-center border-b border-slate-100 bg-slate-50/80 px-5 py-2 sm:px-6 sm:py-2 text-xs font-semibold text-slate-600">
          <span className={activeStep === "form" ? "text-primary-600 font-bold" : "text-slate-400"}>
            {t("step1")}
          </span>
          <ArrowRight className="mx-2 h-3.5 w-3.5 text-slate-300" />
          <span className={activeStep === "confirm" ? "text-primary-600 font-bold" : "text-slate-400"}>
            {t("step2")}
          </span>
        </div>

        {/* Body Content with independent smooth scroll */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4">
          {activeStep === "form" ? (
            <div className="space-y-4">
              {/* Option 1: Instant 1-Tap Direct Telegram (ZERO input required) */}
              <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-emerald-50 border border-sky-200/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-[#229ED9] shrink-0" />
                    {t("instantTelegramTitle")}
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5 leading-snug">
                    {t("instantTelegramSubtitle")}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="telegram"
                  size="sm"
                  onClick={handleDirectChatBypass}
                  className="font-bold text-xs shrink-0 rounded-xl gap-1.5 shadow-sm shadow-[#229ED9]/25 cursor-pointer py-2 px-3.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{t("chatNowBtn")}</span>
                </Button>
              </div>

              {/* Full Package Specifications & Features (Moved from card to dialog) */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary-600" />
                    {t("fullSpecsTitle")}
                  </span>
                  <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-200 text-[10px] font-bold">
                    {t("free")} ($0 Setup)
                  </Badge>
                </div>

                {/* All Features Checklist */}
                {selectedPkgFeatures && selectedPkgFeatures.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedPkgFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-snug">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        <span className="text-[11px] sm:text-xs font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Hardware & Terms Details */}
                <div className="pt-2 border-t border-slate-200/60 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium text-slate-800 text-xs">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      {selectedPkgData.routerIncluded}
                    </span>
                    <span className="font-bold text-emerald-700 text-[11px] uppercase">
                      {t("free")}
                    </span>
                  </div>
                  {equipmentTerms && (
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">{t("equipmentPolicy")}</strong> {equipmentTerms}
                    </p>
                  )}
                </div>
              </div>

              {/* Option 2: Pre-fill Details Form (Optional) */}
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {t("optionalFormTitle")}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Package selector dropdown */}
                <div className="space-y-1">
                  <Label htmlFor="selectedPackageId" className="text-xs font-semibold text-slate-700">
                    {t("packageLabel")}
                  </Label>
                  <select
                    id="selectedPackageId"
                    aria-label={t("packageLabel")}
                    value={watchedValues.selectedPackageId}
                    onChange={handlePackageSelect}
                    className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 font-medium cursor-pointer shadow-xs"
                  >
                    {allPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.speedMbps} Mbps (${pkg.monthlyPriceUsd}/mo)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name and Phone side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Customer Name */}
                  <div className="space-y-1">
                    <Label htmlFor="customerName" className="text-xs font-semibold text-slate-700">
                      {t("nameLabel")}
                    </Label>
                    <Input
                      id="customerName"
                      placeholder={t("namePlaceholder")}
                      {...register("customerName")}
                      className="h-10 text-xs sm:text-sm rounded-xl"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <Label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">
                      {t("phoneLabel")}
                    </Label>
                    <Input
                      id="phoneNumber"
                      placeholder={t("phonePlaceholder")}
                      type="tel"
                      {...register("phoneNumber")}
                      className="h-10 text-xs sm:text-sm rounded-xl"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <Label htmlFor="installationLocation" className="text-xs font-semibold text-slate-700">
                    {t("locationLabel")}
                  </Label>
                  <Input
                    id="installationLocation"
                    placeholder={t("locationPlaceholder")}
                    {...register("installationLocation")}
                    className="h-10 text-xs sm:text-sm rounded-xl"
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-1">
                  <Label htmlFor="notes" className="text-xs font-semibold text-slate-700">
                    {t("notesLabel")}
                  </Label>
                  <Textarea
                    id="notes"
                    rows={2}
                    placeholder={t("notesPlaceholder")}
                    {...register("notes")}
                    className="min-h-[50px] text-xs sm:text-sm rounded-xl py-2"
                  />
                </div>

                {/* Submit Button & Fast Chat Option */}
                <div className="pt-2 space-y-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl shadow-lg shadow-primary-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{t("proceedBtn")}</span>
                    <ArrowRight className="h-4 w-4 ml-1 opacity-80" />
                  </Button>

                  {/* 1-Tap Direct Telegram Bypass (Issue 03) */}
                  <button
                    type="button"
                    onClick={handleDirectChatBypass}
                    className="w-full text-center text-xs text-slate-500 hover:text-[#229ED9] transition-colors py-1 font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3 w-3 text-[#229ED9]" />
                    <span>{t("skipFormBtn")}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Confirm & Telegram Dispatch Step */
            <div className="space-y-4">
              <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-3.5 text-xs text-amber-900">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block text-slate-900">{t("telegramNotice")}</span>
                    <span className="text-amber-900/90 text-[11px] block leading-relaxed">
                      {t("disclaimer")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message preview box with auto-copied banner */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>{t("preparedMessageHeader")}</span>
                    {copied && (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {t("copied")}
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">{t("copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t("copyMessageBtn")}</span>
                      </>
                    )}
                  </button>
                </div>

                <div
                  data-testid="telegram-message-preview"
                  className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-3.5 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto selection:bg-primary-500 select-all"
                >
                  {generatedTelegramMessage}
                </div>
              </div>

              {/* Action buttons with dual options */}
              <div className="space-y-2.5 pt-2">
                {/* Primary: Direct chat with seller */}
                <Button
                  type="button"
                  size="lg"
                  variant="telegram"
                  onClick={handleOpenDirectChat}
                  className="w-full text-base font-bold py-3.5 rounded-xl shadow-lg shadow-[#229ED9]/25 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  {t("openTelegramBtn")} (@{sellerConfig.telegramUsername.replace(/^@/, "")})
                </Button>

                {/* Secondary: Telegram Share Sheet */}
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleOpenTelegramShare}
                  className="w-full text-xs font-semibold py-2.5 border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                  {t("shareTelegramBtn")}
                </Button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopy}
                    className="w-full text-xs py-2 flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? t("copied") : t("copyMessageBtn")}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveStep("form")}
                    className="w-full text-xs py-2 flex items-center justify-center gap-1.5 text-slate-600"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t("editDetailsBtn")}
                  </Button>
                </div>
              </div>

              {/* Seller Direct info */}
              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  {t("sellerTelegramLabel")}{" "}
                  <a
                    href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#229ED9] hover:underline"
                  >
                    @{sellerConfig.telegramUsername.replace(/^@/, "")}
                  </a>{" "}
                  • {t("hotlineLabel")}{" "}
                  <a href={`tel:${sellerConfig.phone}`} className="font-semibold text-slate-700 hover:text-emerald-600">
                    {sellerConfig.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
