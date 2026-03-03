import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./lib/i18n";

/** Redireciona / para /pt (português = idioma principal, maioria brasileiros). */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split("/")[1];

  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  const lower = pathnameLocale?.toLowerCase();
  if (lower && locales.some((l) => l === lower)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
