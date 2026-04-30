import type { Metadata } from "next";
import { headers } from "next/headers";
import { Noto_Sans_Arabic } from "next/font/google";
import {
  DEFAULT_LOCALE,
  getDirection,
  getLocaleFromPathname,
  getLocalizedPath,
  getMessages,
  type Locale
} from "@/lib/i18n";
import "./globals.css";

const arabicFont = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap"
});

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://aureliamoments.com";
}

function getPublicPath(pathname: string, locale: Locale) {
  const fallback = `/${locale}`;
  const cleanPath = pathname.startsWith("/") ? pathname : fallback;
  return cleanPath === "/" ? fallback : cleanPath;
}

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const pathname = headerStore.get("x-aurelia-pathname") ?? `/${DEFAULT_LOCALE}`;
  const locale = getLocaleFromPathname(pathname);
  const messages = getMessages(locale);
  const siteUrl = getSiteUrl();
  const publicPath = getPublicPath(pathname, locale);
  const alternatePath =
    locale === "ar"
      ? getLocalizedPath(publicPath, "en")
      : getLocalizedPath(publicPath, "ar");

  return {
    metadataBase: new URL(siteUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: [...messages.meta.keywords],
    alternates: {
      canonical: publicPath,
      languages: {
        en: locale === "en" ? publicPath : alternatePath,
        ar: locale === "ar" ? publicPath : alternatePath
      }
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: publicPath,
      siteName: "Aurelia Moments",
      images: [
        {
          url: "/images/aurelia/hero-abaya-valet-aurelia-moments.png",
          width: 1200,
          height: 630,
          alt: messages.meta.ogAlt
        }
      ],
      locale: locale === "ar" ? "ar_QA" : "en_QA",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["/images/aurelia/hero-abaya-valet-aurelia-moments.png"]
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const locale = getLocaleFromPathname(headerStore.get("x-aurelia-pathname"));
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} className={arabicFont.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
