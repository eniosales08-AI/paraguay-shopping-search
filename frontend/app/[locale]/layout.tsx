import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import SetLang from "@/components/SetLang";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <SetLang locale={locale as Locale} />
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <a href={`/${locale}`} className="font-display font-bold text-lg text-[var(--color-text)]">
            Paraguay
          </a>
          <LocaleSwitcher currentLocale={locale as Locale} />
        </div>
      </header>
      {children}
    </>
  );
}
