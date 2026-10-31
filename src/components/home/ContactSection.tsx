"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { sellerConfig } from "@/config/seller";
import {
  getContactFormSchema,
  ContactFormValues,
} from "@/lib/validations/order.schema";
import { TelegramService } from "@/features/telegram/telegram.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Send,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Locale } from "@/types";

export function ContactSection() {
  const t = useTranslations("contact");
  const tVal = useTranslations("validations");
  const locale = useLocale() as Locale;
  const isKm = locale === "km";
  const [submitted, setSubmitted] = React.useState(false);

  const contactSchema = React.useMemo(() => {
    return getContactFormSchema({
      nameMin: tVal("nameMin"),
      nameMax: tVal("nameMax"),
      phoneMin: tVal("phoneMin"),
      phoneMax: tVal("phoneMax"),
      phoneRegex: tVal("phoneRegex"),
      districtMin: tVal("districtMin"),
      messageMin: tVal("messageMin"),
      messageMax: tVal("messageMax"),
    });
  }, [tVal]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Format inquiry message in selected language
      const formatted = isKm
        ? `សួស្តីបង! ខ្ញុំមានសំណួរចង់សាកសួរអំពីសេវាអ៊ីនធឺណិត៖\n\nឈ្មោះ៖ ${data.fullName}\nលេខទូរស័ព្ទ៖ ${data.phoneNumber}\nទីតាំង៖ ${data.location}\nសារសាកសួរ៖ ${data.message}\n\nសូមអរគុណ!`
        : `Hello! I have a general Internet inquiry:\n\nName: ${data.fullName}\nPhone: ${data.phoneNumber}\nLocation: ${data.location}\nMessage: ${data.message}\n\nThank you!`;

      // Auto-copy to clipboard
      await TelegramService.copyToClipboard(formatted);

      // Record to server
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.fullName,
          phoneNumber: data.phoneNumber,
          selectedPackageId: "pkg-basic",
          installationLocation: data.location,
          notes: data.message,
        }),
      }).catch(() => {});

      // Open seller chat directly
      window.open(
        `https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`,
        "_blank",
        "noopener,noreferrer"
      );

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const workingHoursDisplay =
    isKm && sellerConfig.workingHoursKm
      ? sellerConfig.workingHoursKm
      : sellerConfig.workingHours;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3.5 py-1 text-xs font-bold text-primary-800 mb-3 border border-primary-200">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Direct channels left */}
          <div className="lg:col-span-5 space-y-4">
            {/* Telegram highlight card */}
            <div className="rounded-3xl border border-[#229ED9]/30 bg-gradient-to-br from-[#229ED9]/10 via-sky-50 to-white p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#229ED9] text-white shadow-md shadow-[#229ED9]/30">
                  <Send className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-xs font-bold text-[#229ED9] uppercase tracking-wider block">
                    {t("telegramDirect")}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    @{sellerConfig.telegramUsername.replace(/^@/, "")}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
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
                  size="lg"
                  className="w-full font-bold rounded-2xl shadow-md shadow-[#229ED9]/25 text-sm gap-2 py-3"
                >
                  <Send className="h-4 w-4" />
                  <span>{t("telegramAction")}</span>
                </Button>
              </a>
            </div>

            {/* Direct hotline */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {t("phone")}
                  </span>
                  <a
                    href={`tel:${sellerConfig.phone}`}
                    className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    {sellerConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">{t("workingHours")}</span>
                  <span>{workingHoursDisplay}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">{t("office")}</span>
                  <span>{t("officeLocation")}</span>
                </div>
              </div>
            </div>

            {/* Facebook / Social */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between text-xs">
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

          {/* Contact / Quick callback Form */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t("formTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 leading-relaxed">
              {t("formSubtitle")}
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-lg">
                  {t("successTitle")}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  {t("successMessage", {
                    username: sellerConfig.telegramUsername.replace(/^@/, ""),
                  })}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl mt-2"
                >
                  {t("sendAnother")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contactFullName">{t("nameLabel")}</Label>
                    <Input
                      id="contactFullName"
                      placeholder={t("namePlaceholder")}
                      {...register("fullName")}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" role="alert" className="text-xs text-red-500 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contactPhone">{t("phoneLabel")}</Label>
                    <Input
                      id="contactPhone"
                      placeholder={t("phonePlaceholder")}
                      type="tel"
                      {...register("phoneNumber")}
                      aria-invalid={!!errors.phoneNumber}
                      aria-describedby={errors.phoneNumber ? "contactPhone-error" : undefined}
                    />
                    {errors.phoneNumber && (
                      <p id="contactPhone-error" role="alert" className="text-xs text-red-500 font-medium">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactLocation">{t("locationLabel")}</Label>
                  <Input
                    id="contactLocation"
                    placeholder={t("locationPlaceholder")}
                    {...register("location")}
                    aria-invalid={!!errors.location}
                    aria-describedby={errors.location ? "contactLocation-error" : undefined}
                  />
                  {errors.location && (
                    <p id="contactLocation-error" role="alert" className="text-xs text-red-500 font-medium">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactMessage">{t("messageLabel")}</Label>
                  <Textarea
                    id="contactMessage"
                    rows={3}
                    placeholder={t("messagePlaceholder")}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contactMessage-error" : undefined}
                  />
                  {errors.message && (
                    <p id="contactMessage-error" role="alert" className="text-xs text-red-500 font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto font-bold rounded-xl px-8 shadow-md shadow-primary-600/25 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Send className="h-4 w-4" />
                    <span>{t("submitBtn")}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
