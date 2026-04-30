import { Instagram, MapPin, Music, Phone } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function ContactSection({ messages }: { messages: Messages }) {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-aurelia-cream/60 py-16 md:py-20"
    >
      <div className="aurelia-container">
        <div className="soft-card grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="eyebrow">{messages.contact.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
              {messages.contact.title}
            </h2>
          </div>
          <div className="grid gap-4 text-sm text-aurelia-charcoal/74">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-aurelia-gold" aria-hidden="true" />
              <span>{messages.contact.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-aurelia-gold" aria-hidden="true" />
              <span>{messages.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Instagram
                className="h-5 w-5 text-aurelia-gold"
                aria-hidden="true"
              />
              <span>{messages.contact.instagram}</span>
            </div>
            <div className="flex items-center gap-3">
              <Music className="h-5 w-5 text-aurelia-gold" aria-hidden="true" />
              <span>{messages.contact.tiktok}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
