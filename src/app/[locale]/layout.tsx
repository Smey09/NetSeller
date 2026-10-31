import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { siteConfig } from "@/config/site";
import { sellerConfig } from "@/config/seller";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKm = locale === "km";
  const title = isKm
    ? `${siteConfig.name} - កញ្ចប់សេវាអ៊ីនធឺណិត និងវ៉ាយហ្វាយល្បឿនលឿននៅកម្ពុជា`
    : `${siteConfig.name} - Fast Home & Business Fiber Internet Packages in Cambodia`;

  const description = isKm ? siteConfig.descriptionKm : siteConfig.description;

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: sellerConfig.name }],
    creator: sellerConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        km: "/km",
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.nameFull,
      locale: isKm ? "km_KH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  // Structured Data (JSON-LD) for Local Sales Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.nameFull,
    description: siteConfig.description,
    telephone: sellerConfig.phone,
    url: siteConfig.url,
    priceRange: "$15 - $85",
    areaServed: sellerConfig.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area.nameEn,
    })),
    openingHours: "Mo-Su 07:30-20:30",
    sameAs: [
      `https://t.me/${sellerConfig.telegramUsername.replace(/^@/, "")}`,
      sellerConfig.facebookUrl,
    ],
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-primary-500 selection:text-white flex flex-col justify-between pb-16 lg:pb-0 ${
          locale === "km" ? "font-khmer" : "font-sans"
        }`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingContact />
            <MobileNavigation />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
