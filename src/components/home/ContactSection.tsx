"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import { TelegramService } from "@/features/telegram/telegram.service";
import { PrivacyAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Phone,
  ExternalLink,
  MessageSquare,
  MapPinned,
  CalendarCheck,
  HelpCircle,
  CheckCircle2,
  Copy,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Locale } from "@/types";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";

  const [customMessage, setCustomMessage] = React.useState("");
  const [notification, setNotification] = React.useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleQuickAction = async (type: "coverage" | "booking" | "advice") => {
    let text = "";
    if (type === "coverage") {
      text = isKm
        ? `សួស្តីបង Officer Seller! ខ្ញុំចង់ពិនិត្យមើលខ្សែបណ្ដាញ Home Wi-Fi នៅទីតាំងរបស់ខ្ញុំ (ផ្ញើទីតាំង/Location)។`
        : `Hello Officer Seller! I would like to check Home Wi-Fi fiber coverage for my location. (Sending location...)`;
      PrivacyAnalytics.track("telegram_click", { location: "contact_quick_coverage" });
    } else if (type === "booking") {
      text = isKm
        ? `សួស្តីបង Officer Seller! ខ្ញុំចង់កក់សេវាដំឡើង Home Wi-Fi គេហដ្ឋាន។ សូមជួយណែនាំព័ត៌មានលម្អិត។`
        : `Hello Officer Seller! I would like to book a Home Wi-Fi installation at my home.`;
      PrivacyAnalytics.track("telegram_click", { location: "contact_quick_booking" });
    } else {
      text = isKm
        ? `សួស្តីបង Officer Seller! ខ្ញុំចង់ពិគ្រោះយោបល់ដើម្បីជ្រើសរើសកញ្ចប់ Home Wi-Fi ដែលស័ក្តិសមបំផុតសម្រាប់គេហដ្ឋានរបស់ខ្ញុំ។`
        : `Hello Officer Seller! I need advice on selecting the best Home Wi-Fi package for my household.`;
      PrivacyAnalytics.track("telegram_click", { location: "contact_quick_advice" });
    }

    await TelegramService.copyToClipboard(text);

    // Optional fire-and-forget log
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Telegram Quick Visitor",
        phoneNumber: "",
        selectedPackageId: "pkg-quick",
        installationLocation: type,
        notes: text,
      }),
    }).catch(() => {});

    showNotification(
      isKm
        ? "បានចម្លងសាររួចរាល់! កំពុងបើក Telegram..."
        : "Message copied! Opening Telegram..."
    );

    window.open(
      `https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSendCustomMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNote = customMessage.trim();
    const defaultText = isKm
      ? `សួស្តីបង Officer Seller! ខ្ញុំមានចម្ងល់ចង់សាកសួរអំពីសេវា Home Wi-Fi។`
      : `Hello Officer Seller! I have a question about your Home Wi-Fi service.`;

    const textToSend = cleanNote
      ? isKm
        ? `សួស្តីបង Officer Seller!\n\nសំណួរ៖ ${cleanNote}\n\nសូមអរគុណ!`
        : `Hello Officer Seller!\n\nInquiry: ${cleanNote}\n\nThank you!`
      : defaultText;

    await TelegramService.copyToClipboard(textToSend);

    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Direct Telegram Inquiry",
        phoneNumber: "",
        selectedPackageId: "pkg-inquiry",
        installationLocation: "",
        notes: textToSend,
      }),
    }).catch(() => {});

    showNotification(
      isKm
        ? "បានចម្លងសាររួចរាល់! កំពុងបើក Telegram..."
        : "Message copied! Opening Telegram..."
    );

    window.open(
      `https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="contact" className="py-8 sm:py-20 bg-transparent border-t border-slate-200/50 scroll-mt-16 sm:scroll-mt-20 relative">
      <div className="container mx-auto px-3.5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-xl px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-slate-700 mb-2 sm:mb-3 border border-white/85 shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(15,23,42,0.03)]">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Global Copied Notification Banner */}
        {notification && (
          <div className="max-w-xl mx-auto mb-4 sm:mb-6 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-emerald-500 text-white font-semibold text-center text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{notification}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 max-w-6xl mx-auto items-start">
          {/* Direct channels left */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Telegram highlight card (Frosted Glass) */}
            <div className="rounded-2xl sm:rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-50/80 via-white/85 to-sky-50/60 backdrop-blur-2xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,1),0_12px_28px_-5px_rgba(34,158,217,0.12)]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-4">
                <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#229ED9] text-white shadow-sm shrink-0">
                  <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#229ED9] uppercase tracking-wider block">
                    {t("telegramDirect")}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    @{sellerConfig.telegramUsername.replace(/^@/, "")}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-5">
                {t("telegramPrompt")}
              </p>
              <a
                href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="telegram"
                  size="default"
                  className="w-full font-bold rounded-xl sm:rounded-2xl shadow-xs text-xs sm:text-sm gap-2 py-2.5 sm:py-3 cursor-pointer min-h-[44px]"
                >
                  <Send className="h-4 w-4" />
                  <span>{t("telegramAction")}</span>
                </Button>
              </a>
            </div>

            {/* Direct hotline (Frosted Glass) */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-xl p-3.5 sm:p-6 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_6px_20px_-3px_rgba(15,23,42,0.04)] space-y-2 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {t("phone")}
                  </span>
                  <a
                    href={`tel:${sellerConfig.phone}`}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    {sellerConfig.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Facebook / Social (Frosted Glass) */}
            <div className="rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-xl p-3 sm:p-4 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(15,23,42,0.03)] flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{t("facebookLabel")}</span>
              <a
                href={sellerConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-600 hover:underline flex items-center gap-1"
              >
                <span>NetSeller Cambodia</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: 1-Tap Action Hub (Frosted Glass Panel) */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-white/85 bg-gradient-to-b from-white/85 via-white/75 to-white/65 backdrop-blur-2xl p-4 sm:p-8 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_15px_35px_-5px_rgba(15,23,42,0.05)] space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-slate-700" />
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t("quickActionTitle")}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {t("quickActionSubtitle")}
              </p>
            </div>

            {/* 3 Interactive 1-Tap Quick Action Cards */}
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {/* Action 1: Check Fiber Coverage (Frosted Glass Card) */}
              <button
                type="button"
                onClick={() => handleQuickAction("coverage")}
                className="group text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 to-white/65 backdrop-blur-xl hover:from-white/95 hover:to-white/80 hover:border-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-md transition-all flex items-start justify-between gap-2.5 sm:gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <MapPinned className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors truncate">
                      {t("checkCoverageBtn")}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug line-clamp-1">
                      {t("checkCoverageDesc")}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-xs px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/90 text-[10px] sm:text-xs font-bold text-slate-700 group-hover:bg-[#229ED9] group-hover:text-white group-hover:border-[#229ED9] transition-colors mt-0.5 shadow-2xs">
                  <Send className="h-3 w-3" />
                  <span>Telegram</span>
                </div>
              </button>

              {/* Action 2: Book Installation (Frosted Glass Card) */}
              <button
                type="button"
                onClick={() => handleQuickAction("booking")}
                className="group text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 to-white/65 backdrop-blur-xl hover:from-white/95 hover:to-white/80 hover:border-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-md transition-all flex items-start justify-between gap-2.5 sm:gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <CalendarCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors truncate">
                      {t("orderInstallBtn")}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug line-clamp-1">
                      {t("orderInstallDesc")}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-xs px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/90 text-[10px] sm:text-xs font-bold text-slate-700 group-hover:bg-[#229ED9] group-hover:text-white group-hover:border-[#229ED9] transition-colors mt-0.5 shadow-2xs">
                  <Send className="h-3 w-3" />
                  <span>Telegram</span>
                </div>
              </button>

              {/* Action 3: General Advice & Package Choice (Frosted Glass Card) */}
              <button
                type="button"
                onClick={() => handleQuickAction("advice")}
                className="group text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/85 bg-gradient-to-b from-white/85 to-white/65 backdrop-blur-xl hover:from-white/95 hover:to-white/80 hover:border-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-md transition-all flex items-start justify-between gap-2.5 sm:gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors truncate">
                      {t("askQuestionsBtn")}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug line-clamp-1">
                      {t("askQuestionsDesc")}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-xs px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/90 text-[10px] sm:text-xs font-bold text-slate-700 group-hover:bg-[#229ED9] group-hover:text-white group-hover:border-[#229ED9] transition-colors mt-0.5 shadow-2xs">
                  <Send className="h-3 w-3" />
                  <span>Telegram</span>
                </div>
              </button>
            </div>

            {/* Optional Custom Message Box */}
            <form onSubmit={handleSendCustomMessage} className="pt-2 border-t border-slate-100 space-y-2.5 sm:space-y-3">
              <div>
                <label
                  htmlFor="contactCustomNote"
                  className="text-xs font-bold text-slate-800 block mb-0.5"
                >
                  {t("customMessageTitle")}
                </label>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {t("customMessageSubtitle")}
                </p>
              </div>

              <Textarea
                id="contactCustomNote"
                rows={2}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={t("customMessagePlaceholder")}
                className="rounded-xl sm:rounded-2xl border-slate-200/80 bg-white/60 backdrop-blur-xs text-xs sm:text-sm focus:bg-white transition-colors resize-none py-2"
              />

              <Button
                type="submit"
                variant="telegram"
                size="default"
                className="w-full font-bold rounded-xl sm:rounded-2xl py-2.5 sm:py-3 text-xs sm:text-sm shadow-md shadow-[#229ED9]/25 gap-2 cursor-pointer min-h-[44px]"
              >
                <Send className="h-4 w-4" />
                <span>{t("sendViaTelegramBtn")}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
