import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Compras Paraguay — Busca de productos", template: "%s | Compras Paraguay" },
  description: "Buscá productos y compará precios en Paraguay. Precios en Gs. (PYG).",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://compras-paraguay.example.com"),
  openGraph: { locale: "es_PY", type: "website" },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://compras-paraguay.example.com";
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Compras Paraguay",
  description: "Buscá productos y compará precios en Paraguay.",
  url: baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/es/buscar?q={search_term}` },
    "query-input": "required name=search_term",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
