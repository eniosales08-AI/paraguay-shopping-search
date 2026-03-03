"use client";

import { useEffect } from "react";
import { localeHreflang, type Locale } from "@/lib/i18n";

export default function SetLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = localeHreflang[locale];
  }, [locale]);
  return null;
}
