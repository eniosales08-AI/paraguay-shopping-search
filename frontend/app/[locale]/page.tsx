import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, isValidLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getTranslations(locale as Locale);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-center text-[var(--color-text)] mb-2">
          {t.homeTitle}
        </h1>
        <p className="text-center text-[var(--color-text-muted)] mb-10">
          {t.homeSubtitle}
        </p>

        <form
          action={`/${locale}/buscar`}
          method="GET"
          className="flex gap-2 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm focus-within:ring-2 focus-within:ring-primary"
        >
          <input
            type="search"
            name="q"
            placeholder={t.searchPlaceholder}
            className="flex-1 min-h-[48px] px-4 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
            aria-label={t.searchAria}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            {t.searchButton}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          {t.examples}{" "}
          <Link href={`/${locale}/buscar?q=auriculares`} className="text-primary hover:underline">
            auriculares
          </Link>
          ,{" "}
          <Link href={`/${locale}/buscar?q=celular`} className="text-primary hover:underline">
            celular
          </Link>
          ,{" "}
          <Link href={`/${locale}/buscar?q=notebook`} className="text-primary hover:underline">
            notebook
          </Link>
        </p>
      </div>
    </main>
  );
}
