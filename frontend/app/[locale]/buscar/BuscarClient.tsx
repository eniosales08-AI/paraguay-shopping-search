"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { getTranslations, type Locale } from "@/lib/i18n";

type Product = {
  id: string;
  title: string;
  description: string | null;
  price_pyg: number;
  store: string;
  url: string;
  image_url: string | null;
  category: string | null;
  locale: string;
  currency: string;
};

type SearchResponse = {
  results: Product[];
  total: number;
  page: number;
  limit: number;
  facets?: {
    categories?: { value: string; count: number }[];
    stores?: { value: string; count: number }[];
    price_range?: { min: number; max: number };
  };
};

const DEFAULT_FACETS = {
  categories: [] as { value: string; count: number }[],
  stores: [] as { value: string; count: number }[],
  price_range: { min: 0, max: 0 },
};

function formatPrice(pyg: number, suffix: string): string {
  return new Intl.NumberFormat("es-PY", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(pyg) + suffix;
}

function Resultados({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "";
  const store = searchParams.get("store") || "";
  const sort = searchParams.get("sort") || "relevance";

  const t = getTranslations(locale);
  const base = `/${locale}/buscar`;

  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(page));
    params.set("limit", "20");
    if (category) params.set("category", category);
    if (store) params.set("store", store);
    if (sort) params.set("sort", sort);

    setLoading(true);
    fetch(`/api/search?${params}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.error || !Array.isArray(json?.results)) {
          setData(null);
          return;
        }
        const rawFacets = json.facets ?? null;
        const facets = rawFacets && typeof rawFacets === "object" ? rawFacets : {};
        setData({
          results: json.results ?? [],
          total: typeof json.total === "number" ? json.total : 0,
          page: typeof json.page === "number" ? json.page : 1,
          limit: typeof json.limit === "number" ? json.limit : 20,
          facets: {
            categories: Array.isArray(facets?.categories) ? facets.categories : DEFAULT_FACETS.categories,
            stores: Array.isArray(facets?.stores) ? facets.stores : DEFAULT_FACETS.stores,
            price_range: facets?.price_range && typeof facets.price_range.min === "number" ? facets.price_range : DEFAULT_FACETS.price_range,
          },
        });
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [q, page, category, store, sort]);

  if (loading) {
    return (
      <div className="py-12 text-center text-[var(--color-text-muted)]">
        {t.loading}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-12 text-center text-red-600">
        {t.errorMessage}
      </div>
    );
  }

  const results = data.results ?? [];
  const total = typeof data.total === "number" ? data.total : 0;
  const facets = data.facets && typeof data.facets === "object" ? data.facets : DEFAULT_FACETS;
  const categories = Array.isArray(facets?.categories) ? facets.categories : [];
  const stores = Array.isArray(facets?.stores) ? facets.stores : [];
  const totalPages = Math.ceil(total / 20);

  function buildUrl(updates: Record<string, string>) {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) p.set(k, v);
      else p.delete(k);
    });
    p.delete("page");
    return `${base}?${p.toString()}`;
  }

  const sortOptions = [
    { value: "relevance", label: t.sortRelevance },
    { value: "price_asc", label: t.sortPriceAsc },
    { value: "price_desc", label: t.sortPriceDesc },
    { value: "updated_desc", label: t.sortNewest },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">{t.sortLabel}</h3>
            <select
              value={sort}
              onChange={(e) => (window.location.href = buildUrl({ sort: e.target.value }))}
              className="w-full min-h-[44px] px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t.sortLabel}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          {categories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">{t.categoryLabel}</h3>
              <ul className="space-y-1">
                {!category && <li className="text-[var(--color-text-muted)] text-sm">{t.categoryAll}</li>}
                {categories.map((f) => (
                  <li key={f.value}>
                    <Link
                      href={buildUrl({ category: category === f.value ? "" : f.value })}
                      className={`text-sm ${category === f.value ? "font-medium text-primary" : "text-[var(--color-text-muted)] hover:text-primary"}`}
                    >
                      {f.value} ({f.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {stores.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">{t.storeLabel}</h3>
              <ul className="space-y-1">
                {!store && <li className="text-[var(--color-text-muted)] text-sm">{t.storeAll}</li>}
                {stores.map((f) => (
                  <li key={f.value}>
                    <Link
                      href={buildUrl({ store: store === f.value ? "" : f.value })}
                      className={`text-sm ${store === f.value ? "font-medium text-primary" : "text-[var(--color-text-muted)] hover:text-primary"}`}
                    >
                      {f.value} ({f.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="flex-1 min-w-0">
          <p className="text-[var(--color-text-muted)] mb-6" aria-live="polite">
            {total} {t.resultsCount}
            {q && ` ${t.resultsFor} "${q}"`}
          </p>

          {results.length === 0 ? (
            <p className="py-12 text-center text-[var(--color-text-muted)]" role="status">
              {t.noResults}
            </p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label={t.resultsCount}>
            {results.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="aspect-square bg-[var(--color-border)] rounded-lg mb-3 overflow-hidden">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element -- external product URLs
                    <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                      {t.sinImagen}
                    </div>
                  )}
                </div>
                <h2 className="font-medium text-[var(--color-text)] line-clamp-2 mb-1">{p.title}</h2>
                <p className="text-lg font-semibold text-primary">
                  {formatPrice(p.price_pyg, t.currencySuffix)}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">{p.store}</p>
              </a>
            ))}
          </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-8 flex justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`${base}?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    page: String(page - 1),
                  })}`}
                  className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)]"
                >
                  {t.pagePrev}
                </Link>
              )}
              <span className="px-4 py-2 text-[var(--color-text-muted)]">
                {t.pageOf} {page} / {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`${base}?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    page: String(page + 1),
                  })}`}
                  className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)]"
                >
                  {t.pageNext}
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

export default function BuscarPageClient({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const t = getTranslations(locale);

  return (
    <>
      <div className="mb-8">
        <Link
          href={`/${locale}`}
          className="text-[var(--color-text-muted)] hover:text-primary text-sm"
        >
          {t.backHome}
        </Link>
      </div>

      <form action={`/${locale}/buscar`} method="GET" className="mb-8 flex gap-2">
        <input type="hidden" name="q" value={q} />
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder={t.searchPlaceholder}
          className="flex-1 min-h-[48px] px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-[var(--color-primary-hover)]"
        >
          {t.searchButton}
        </button>
      </form>

      <Suspense fallback={<div className="py-12 text-center">{t.loading}</div>}>
        <Resultados locale={locale} />
      </Suspense>
    </>
  );
}
