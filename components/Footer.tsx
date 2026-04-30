import Link from "next/link";
import { Instagram, Music } from "lucide-react";
import type { Locale, Messages } from "@/lib/i18n";

export function Footer({
  locale,
  messages
}: {
  locale: Locale;
  messages: Messages;
}) {
  const footerLinks = [
    { label: messages.header.nav.home, href: `/${locale}#home` },
    { label: messages.header.nav.experience, href: `/${locale}#experience` },
    { label: messages.header.nav.gallery, href: `/${locale}#gallery` },
    { label: messages.header.nav.packages, href: `/${locale}#packages` },
    { label: messages.header.nav.booking, href: `/${locale}#booking` }
  ];

  return (
    <footer className="border-t border-aurelia-sand/45 bg-aurelia-ivory py-10">
      <div className="aurelia-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg uppercase tracking-[0.28em]">
              {messages.brand}
            </p>
            <p className="mt-3 text-sm text-aurelia-charcoal/65">
              {messages.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.16em] text-aurelia-charcoal/66">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-aurelia-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/privacy`}
              className="transition hover:text-aurelia-gold"
            >
              {messages.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="transition hover:text-aurelia-gold"
            >
              {messages.footer.terms}
            </Link>
          </nav>

          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/"
              aria-label={`Aurelia Moments ${messages.footer.instagram}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-aurelia-sand/70 bg-white/65 text-aurelia-gold transition hover:-translate-y-0.5 hover:border-aurelia-gold"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.tiktok.com/"
              aria-label={`Aurelia Moments ${messages.footer.tiktok}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-aurelia-sand/70 bg-white/65 text-aurelia-gold transition hover:-translate-y-0.5 hover:border-aurelia-gold"
            >
              <Music className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-aurelia-sand/40 pt-6 text-xs text-aurelia-charcoal/60">
          {messages.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
