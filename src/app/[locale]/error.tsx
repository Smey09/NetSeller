"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { sellerConfig } from "@/config/seller";
import { AlertTriangle, RotateCcw, Home, Send } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  React.useEffect(() => {
    // Log error securely
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("somethingWentWrong")}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("somethingWentWrongDesc")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button onClick={() => reset()} className="w-full sm:w-auto font-bold gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>{t("tryAgain")}</span>
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto font-bold gap-2">
              <Home className="h-4 w-4" />
              <span>{t("backToHome")}</span>
            </Button>
          </Link>
          <a
            href={`https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="telegram" className="w-full sm:w-auto font-bold gap-2">
              <Send className="h-4 w-4" />
              <span>{t("contactTelegram")}</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

