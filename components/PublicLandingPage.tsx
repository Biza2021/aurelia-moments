import { AboutSection } from "@/components/AboutSection";
import { BookingForm } from "@/components/BookingForm";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSteps } from "@/components/ExperienceSteps";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PackagesSection } from "@/components/PackagesSection";
import { getMessages, type Locale } from "@/lib/i18n";

export function PublicLandingPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <>
      <Header locale={locale} messages={messages} />
      <main>
        <HeroSection locale={locale} messages={messages} />
        <AboutSection locale={locale} messages={messages} />
        <ExperienceSteps messages={messages} />
        <GallerySection locale={locale} messages={messages} />
        <PackagesSection messages={messages} />
        <BookingForm locale={locale} messages={messages} />
        <ContactSection messages={messages} />
      </main>
      <Footer locale={locale} messages={messages} />
    </>
  );
}
