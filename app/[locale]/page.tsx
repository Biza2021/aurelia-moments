import { notFound } from "next/navigation";
import { PublicLandingPage } from "@/components/PublicLandingPage";
import { isLocale, type Locale } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <PublicLandingPage locale={locale as Locale} />;
}
