import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/home/ContactSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKm = locale === "km";
  return {
    title: isKm
      ? "ទំនាក់ទំនង និងជំនួយតាម Telegram"
      : "Contact & Telegram Support",
    description: isKm
      ? "ទាក់ទងមកកាន់អ្នកប្រឹក្សាលក់សេវាអ៊ីនធឺណិតផ្ទាល់តាម Telegram ឬទូរស័ព្ទដៃ។ ឆ្លើយតបរហ័សក្រោម ១៥ នាទី។"
      : "Contact our personal Internet sales consultant in Cambodia directly on Telegram or phone. Fast response under 15 minutes.",
  };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="py-8 bg-slate-50/60 min-h-screen">
      <ContactSection />
      <ServiceAreasSection />
    </div>
  );
}
