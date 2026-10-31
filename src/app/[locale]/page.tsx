import { unstable_setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { PackageSection } from "@/components/home/PackageSection";
import { PromotionSection } from "@/components/home/PromotionSection";
import { WhyChooseMe } from "@/components/home/WhyChooseMe";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AboutSection } from "@/components/home/AboutSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
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
      <WhyChooseMe />
      <HowItWorks />
      <AboutSection />
      <ServiceAreasSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
