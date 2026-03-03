"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "$1") || "/";
  const base = pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`;
  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";

  return (
    <nav className="flex items-center gap-2" aria-label="Idioma">
      {locales.map((loc) => (
        <a
          key={loc}
          href={`/${loc}${base}${query}`}
          className={`px-2 py-1 rounded text-sm font-medium min-w-[44px] text-center ${
            loc === currentLocale
              ? "bg-primary text-white"
              : "text-[var(--color-text-muted)] hover:text-primary hover:bg-[var(--color-surface)]"
          }`}
        >
          {localeNames[loc]}
        </a>
      ))}
    </nav>
  );
}
