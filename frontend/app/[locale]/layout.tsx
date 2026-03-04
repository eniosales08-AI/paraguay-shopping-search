import { type Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["es", "pt"];

export default function LocaleLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
