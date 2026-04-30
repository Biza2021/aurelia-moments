"use client";

import Link from "next/link";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  getLocalizedPath,
  LOCALE_COOKIE_NAME,
  type Locale,
  type Messages
} from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  messages: Messages;
};

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; max-age=31536000; path=/; SameSite=Lax`;
}

export function Header({ locale, messages }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const isArabic = locale === "ar";
  const t = messages.header;
  const navItems = [
    { label: t.nav.home, href: `/${locale}#home` },
    { label: t.nav.experience, href: `/${locale}#experience` },
    { label: t.nav.gallery, href: `/${locale}#gallery` },
    { label: t.nav.packages, href: `/${locale}#packages` },
    { label: t.nav.booking, href: `/${locale}#booking` },
    { label: t.nav.contact, href: `/${locale}#contact` }
  ];

  const closeMenu = () => setOpen(false);
  const switchLanguage = (nextLocale: Locale) => {
    persistLocale(nextLocale);
    const nextPath = getLocalizedPath(window.location.pathname, nextLocale);
    window.location.assign(`${nextPath}${window.location.hash}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-aurelia-sand/35 bg-aurelia-ivory/90 backdrop-blur-xl">
      <div className="aurelia-container flex h-16 items-center justify-between">
        <Link
          href={`/${locale}#home`}
          className="font-display text-sm uppercase tracking-[0.34em] text-aurelia-ink"
          onClick={closeMenu}
        >
          {messages.brand}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.16em] text-aurelia-charcoal/70 transition hover:text-aurelia-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div
            className="flex rounded-full border border-aurelia-sand/60 bg-white/70 p-1"
            aria-label={t.language}
          >
            {(["en", "ar"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={locale === item}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  locale === item
                    ? "bg-aurelia-ink text-white"
                    : "text-aurelia-charcoal/68 hover:text-aurelia-gold"
                }`}
                onClick={() => switchLanguage(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href={`/${locale}#booking`} className="gold-button px-4 py-2.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {t.bookNow}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-aurelia-sand/70 bg-white/70 text-aurelia-ink shadow-sm lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t.menu}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-aurelia-sand/35 bg-aurelia-ivory px-5 py-5 shadow-soft lg:hidden"
        >
          <nav className="mx-auto flex max-w-md flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 text-sm font-medium uppercase text-aurelia-charcoal/80 transition hover:bg-white/70 hover:text-aurelia-gold ${
                  isArabic ? "text-right tracking-normal" : "tracking-[0.16em]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="mt-2 flex rounded-full border border-aurelia-sand/60 bg-white/70 p-1"
              aria-label={t.language}
            >
              {(["en", "ar"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={locale === item}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    locale === item
                      ? "bg-aurelia-ink text-white"
                      : "text-aurelia-charcoal/68 hover:text-aurelia-gold"
                  }`}
                  onClick={() => switchLanguage(item)}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <Link
              href={`/${locale}#booking`}
              onClick={closeMenu}
              className="gold-button mt-2"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {t.bookNow}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
