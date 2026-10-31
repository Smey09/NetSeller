import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { QRCodeGenerator } from "@/components/qr/QRCodeGenerator";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKm = locale === "km";
  return {
    title: isKm
      ? "បង្កើតកូដ QR សម្រាប់នាមប័ណ្ណ (Business Card QR Code)"
      : "Business Card QR Code Generator",
    description: isKm
      ? "ទាញយកកូដ QR កម្រិតខ្ពស់ SVG និង PNG សម្រាប់បោះពុម្ពលើនាមប័ណ្ណផ្ទាល់របស់អ្នកលក់។"
      : "Download high-resolution print-ready SVG and PNG QR codes for your physical NetSeller business cards.",
  };
}

export default async function QRPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="py-12 sm:py-16 bg-slate-50/60 min-h-screen">
      <div className="container mx-auto px-4">
        <QRCodeGenerator />
      </div>
    </div>
  );
}

