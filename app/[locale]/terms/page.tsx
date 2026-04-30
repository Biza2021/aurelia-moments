import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

type LegalPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function TermsPage({ params }: LegalPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <main className="min-h-screen bg-aurelia-ivory px-5 py-12 text-aurelia-ink">
      <section className="mx-auto max-w-3xl rounded-[1.5rem] bg-white/80 p-7 shadow-soft">
        <Link
          href={`/${locale}`}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-aurelia-gold"
        >
          {messages.brand}
        </Link>
        <h1 className="mt-6 font-display text-4xl">{messages.terms.title}</h1>
        <p className="mt-4 leading-8 text-aurelia-charcoal/75">
          {messages.terms.text}
        </p>
      </section>
    </main>
  );
}
