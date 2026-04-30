import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";

const galleryItems = [
  {
    src: "/images/aurelia/abaya-rack-luxury-setup.png",
    alt: "Luxury abaya rack setup for Aurelia Moments",
    labelKey: "rack",
    aspect: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/6]",
    position: "58% center",
    featured: true
  },
  {
    src: "/images/aurelia/numbered-tags-closeup.png",
    alt: "Numbered valet tags for abaya organization",
    labelKey: "tags",
    aspect: "aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]",
    position: "center center",
    featured: false
  },
  {
    src: "/images/aurelia/hostess-receiving-abaya.png",
    alt: "Hostess receiving an abaya with care",
    labelKey: "hostess",
    aspect: "aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]",
    position: "52% center",
    featured: false
  },
  {
    src: "/images/aurelia/event-entrance-abaya-valet.png",
    alt: "Elegant event entrance with abaya valet service",
    labelKey: "entrance",
    aspect: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]",
    position: "center center",
    featured: false
  },
  {
    src: "/images/aurelia/full-setup-wedding-event.png",
    alt: "Full abaya valet setup for a wedding event",
    labelKey: "setup",
    aspect: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]",
    position: "center center",
    featured: false
  },
  {
    src: "/images/aurelia/gallery-detail-gold-hangers.png",
    alt: "Gold hangers detail for abaya valet presentation",
    labelKey: "details",
    aspect: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]",
    position: "center center",
    featured: false
  }
] as const;

export function GallerySection({
  locale,
  messages
}: {
  locale: Locale;
  messages: Messages;
}) {
  const isArabic = locale === "ar";

  return (
    <section id="gallery" className="scroll-mt-20 bg-aurelia-ivory py-16 md:py-24">
      <div className="aurelia-container">
        <div
          className={`flex flex-col gap-4 md:items-end md:justify-between ${
            isArabic ? "md:flex-row-reverse text-right" : "md:flex-row"
          }`}
        >
          <div>
            <p className="eyebrow">{messages.gallery.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
              {messages.gallery.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-aurelia-charcoal/70">
            {messages.gallery.subtitle}
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure
              key={item.src}
              className={`group relative overflow-hidden rounded-[1.45rem] shadow-soft ${
                item.featured ? "lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${item.aspect}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  style={{ objectPosition: item.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/0 to-transparent" />
                <figcaption
                  className={`absolute bottom-4 rounded-full border border-white/25 bg-white/20 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-white backdrop-blur ${
                    isArabic ? "right-4" : "left-4"
                  }`}
                >
                  {messages.gallery.labels[item.labelKey]}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
