import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";

export function AboutSection({
  locale,
  messages
}: {
  locale: Locale;
  messages: Messages;
}) {
  const isArabic = locale === "ar";

  return (
    <section className="bg-aurelia-ivory py-16 md:py-24">
      <div className="aurelia-container grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] shadow-aurelia md:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/images/aurelia/booking-section-abaya-rack.png"
            alt="Organized abaya valet rack for a private event"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full object-cover"
            style={{ objectPosition: "61% center" }}
          />
        </div>

        <div
          className={`mx-auto max-w-2xl text-center ${
            isArabic ? "lg:text-right" : "lg:text-left"
          }`}
        >
          <p className="eyebrow">{messages.about.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-aurelia-ink sm:text-5xl">
            {messages.about.title}
          </h2>
          <div className="mt-6 h-px w-24 bg-champagne-line lg:w-36" />
          <p className="mt-7 text-base leading-8 text-aurelia-charcoal/74 sm:text-lg">
            {messages.about.text}
          </p>
        </div>
      </div>
    </section>
  );
}
