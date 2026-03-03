import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, getTranslations, type Locale } from "@/lib/i18n";
import BuscarPageClient from "./BuscarClient";
import { Suspense } from "react";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const p = await searchParams;
  const q = p?.q?.trim() || "";
  const t = getTranslations(locale as Locale);
  return {
    title: q ? `${q} — ${t.homeTitle}` : t.homeTitle,
    description: q
      ? `${t.resultsCount} ${t.resultsFor} ${q}.`
      : t.homeSubtitle,
  };
}

export default async function BuscarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <Suspense fallback={<div className="py-12 text-center">...</div>}>
        <BuscarPageClient locale={locale as Locale} />
      </Suspense>
    </main>
  );
}
