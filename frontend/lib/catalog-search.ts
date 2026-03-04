/**
 * Módulo de busca sobre o catálogo.
 * Hoje: busca em memória sobre JSON importado.
 * Próximo passo (P3.2): trocar por cliente Meilisearch/PostgreSQL FTS mantendo esta interface.
 */

import catalogFromFile from "../data/catalog/products.json";

export type Product = {
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

export type SearchParams = {
  q?: string;
  category?: string;
  store?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type SearchResult = {
  results: Product[];
  total: number;
  page: number;
  limit: number;
  facets: {
    categories: { value: string; count: number }[];
    stores: { value: string; count: number }[];
    price_range: { min: number; max: number };
  };
};

const CATALOG: Product[] = Array.isArray(catalogFromFile) ? (catalogFromFile as Product[]) : [];

function filterAndSort(
  items: Product[],
  q: string,
  category: string,
  store: string,
  sort: string
): Product[] {
  let out = [...items];
  if (q) {
    const lower = q.toLowerCase();
    out = out.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        (p.description && p.description.toLowerCase().includes(lower)) ||
        (p.category && p.category.toLowerCase().includes(lower)) ||
        p.store.toLowerCase().includes(lower)
    );
  }
  if (category) out = out.filter((p) => p.category === category);
  if (store) out = out.filter((p) => p.store === store);
  if (sort === "price_asc") out.sort((a, b) => a.price_pyg - b.price_pyg);
  else if (sort === "price_desc") out.sort((a, b) => b.price_pyg - a.price_pyg);
  return out;
}

/** Retorna o catálogo atual (para trocar depois por índice externo). */
export function getCatalog(): Product[] {
  return CATALOG;
}

/** Executa busca com filtros e paginação. Contrato estável para trocar implementação por Meilisearch/DB. */
export function search(params: SearchParams): SearchResult {
  const q = params.q ?? "";
  const category = params.category ?? "";
  const store = params.store ?? "";
  const sort = params.sort ?? "relevance";
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(50, Math.max(1, params.limit ?? 20));

  const filtered = filterAndSort(CATALOG, q, category, store, sort);
  const total = filtered.length;
  const start = (page - 1) * limit;
  const results = filtered.slice(start, start + limit);

  const categoryCount = new Map<string, number>();
  const storeCount = new Map<string, number>();
  for (const p of filtered) {
    if (p.category) categoryCount.set(p.category, (categoryCount.get(p.category) ?? 0) + 1);
    storeCount.set(p.store, (storeCount.get(p.store) ?? 0) + 1);
  }
  const categories = [...categoryCount.entries()].map(([value, count]) => ({ value, count }));
  const stores = [...storeCount.entries()].map(([value, count]) => ({ value, count }));
  const priceValues = filtered.map((p) => p.price_pyg).filter((n) => n > 0);
  const price_range = {
    min: priceValues.length ? Math.min(...priceValues) : 0,
    max: priceValues.length ? Math.max(...priceValues) : 0,
  };

  return { results, total, page, limit, facets: { categories, stores, price_range } };
}
