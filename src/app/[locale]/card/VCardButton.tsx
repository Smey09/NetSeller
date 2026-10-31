"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { downloadVCard } from "@/features/vcard/vcard.utils";
import { PrivacyAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";

export function VCardButton() {
  const t = useTranslations("card");
  const [downloaded, setDownloaded] = React.useState(false);

  const handleClick = () => {
    // Both client-side download helper and server route fallback
    downloadVCard();
    PrivacyAnalytics.track("page_view", { action: "download_vcard" });
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="default"
      onClick={handleClick}
      className="w-full font-semibold rounded-2xl gap-2 text-xs border-slate-200 text-slate-800"
    >
      {downloaded ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Download className="h-4 w-4 text-primary-600" />
      )}
      <span>{downloaded ? t("savedContact") : t("saveContact")}</span>
    </Button>
  );
}
