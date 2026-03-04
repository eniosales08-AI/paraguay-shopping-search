import Link from "next/link";
import { getLocale, getTranslations } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = getLocale(locale);
  const t = getTranslations(l);
  return {
    title: t.siteTitle,
    description: t.siteTagline,
    openGraph: { locale: l === "es" ? "es_PY" : "pt_BR", type: "website" },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = getLocale(locale);
  const t = getTranslations(l);

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 py-16" role="main">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          {t.siteTitle}
        </h1>
        <p className="text-[var(--color-text-muted)]">{t.siteTagline}</p>
      </header>
      <div className="flex justify-center">
        <Link
          href={`/${l}/buscar`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-[var(--color-primary-hover)]"
        >
          {t.goToSearch}
        </Link>
      </div>
    </main>
  );
}
