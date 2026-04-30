import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { Locale, Messages } from "@/lib/i18n";

type HeroSectionProps = {
  locale: Locale;
  messages: Messages;
};

export function HeroSection({ locale, messages }: HeroSectionProps) {
  const isArabic = locale === "ar";
  const hero = messages.hero;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-aurelia-ink text-white sm:min-h-[700px] md:min-h-[82vh]"
    >
      <Image
        src="/images/aurelia/hero-abaya-valet-aurelia-moments.png"
        alt="Elegant Aurelia Moments abaya valet setup"
        fill
        priority
        sizes="100vw"
        className="h-full w-full object-cover object-[58%_50%] animate-image-reveal md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/32 via-black/18 to-black/78 md:from-black/20 md:to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/36 via-transparent to-black/18 md:from-black/30 md:to-black/20" />

      <div className="aurelia-container relative z-10 pb-9 pt-24 sm:pb-12 md:pb-16">
        <div
          className={`max-w-3xl animate-fade-up ${
            isArabic ? "text-right" : ""
          }`}
        >
          <p className="eyebrow text-aurelia-cream">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.08rem] leading-[1.08] text-white sm:text-5xl md:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-white/88 sm:mt-5 sm:text-lg sm:leading-8">
            {hero.subheadline}
          </p>

          <div
            className={`mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row ${
              isArabic ? "sm:flex-row-reverse sm:justify-end" : ""
            }`}
          >
            <Link
              href={`/${locale}#booking`}
              className="gold-button px-4 text-[0.68rem] tracking-[0.14em] sm:px-5 sm:text-xs sm:tracking-[0.18em]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}#experience`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/55 bg-white/10 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 sm:px-5 sm:text-xs sm:tracking-[0.18em]"
            >
              {hero.secondaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div
            className={`mt-6 flex flex-wrap gap-2 sm:mt-7 ${
              isArabic ? "justify-end" : ""
            }`}
          >
            {hero.trustLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-white/80 backdrop-blur sm:px-3 sm:text-[0.68rem] sm:tracking-[0.18em]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
