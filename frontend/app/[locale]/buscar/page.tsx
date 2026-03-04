import { Suspense } from "react";
import { getLocale, getTranslations } from "@/lib/i18n";
import BuscarPageClient from "./BuscarClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = getLocale(locale);
  const t = getTranslations(l);
  return {
    title: `${t.searchButton} — ${t.siteTitle}`,
    description: t.siteTagline,
    openGraph: { locale: l === "es" ? "es_PY" : "pt_BR", type: "website" },
  };
}

export default async function BuscarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = getLocale(locale);
  const t = getTranslations(l);

  return (
    <main id="main" className="max-w-6xl mx-auto px-4 py-8" role="main">
      <Suspense fallback={<div className="py-12 text-center text-[var(--color-text-muted)]">{t.loading}</div>}>
        <BuscarPageClient locale={l} />
      </Suspense>
    </main>
  );
}
