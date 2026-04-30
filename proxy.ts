import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  isLocale,
  LOCALE_COOKIE_NAME,
  type Locale
} from "@/lib/i18n";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const preferredLocale: Locale = isLocale(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/privacy" || pathname === "/terms") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !pathname.startsWith("/admin/login/")
  ) {
    const hasSessionCookie = Boolean(
      request.cookies.get(SESSION_COOKIE_NAME)?.value
    );

    if (!hasSessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const locale = isLocale(firstSegment)
    ? firstSegment
    : getLocaleFromPathname(pathname);
  headers.set("x-aurelia-pathname", pathname);

  const response = NextResponse.next({
    request: {
      headers
    }
  });

  if (isLocale(firstSegment)) {
    response.cookies.set(LOCALE_COOKIE_NAME, firstSegment, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production"
    });
  } else if (pathname.startsWith("/admin")) {
    headers.set("x-aurelia-pathname", `/${DEFAULT_LOCALE}`);
  }

  response.headers.set("x-aurelia-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml).*)"]
};
