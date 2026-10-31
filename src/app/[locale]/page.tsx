import { unstable_setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { PackageSection } from "@/components/home/PackageSection";
import { PromotionSection } from "@/components/home/PromotionSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <PackageSection />
      <PromotionSection />
      <ContactSection />
    </div>
  );
}
