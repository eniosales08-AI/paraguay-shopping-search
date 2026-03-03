import { NextRequest } from "next/server";
import catalogData from "@/data/catalog/products.json";

export const dynamic = "force-dynamic";

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

const FALLBACK_PRODUCTS: Product[] = [
  { id: "1", title: "Producto de ejemplo", description: null, price_pyg: 100000, store: "Demo", url: "https://example.com/1", image_url: null, category: "General", locale: "es-PY", currency: "PYG" },
];

function getCatalog(): Product[] {
  const data = catalogData as unknown;
  return Array.isArray(data) ? (data as Product[]) : FALLBACK_PRODUCTS;
}

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

function emptyResponse(page: number, limit: number) {
  return Response.json({
    results: [],
    total: 0,
    page,
    limit,
    facets: { categories: [], stores: [], price_range: { min: 0, max: 0 } },
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") ?? "";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
    const category = searchParams.get("category") ?? "";
    const store = searchParams.get("store") ?? "";
    const sort = searchParams.get("sort") ?? "relevance";

    const catalog = getCatalog();
    const filtered = filterAndSort(catalog, q, category, store, sort);
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

    return Response.json({
      results,
      total,
      page,
      limit,
      facets: { categories, stores, price_range },
    });
  } catch {
    const page = Math.max(1, parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(request.nextUrl.searchParams.get("limit") ?? "20", 10)));
    return emptyResponse(page, limit);
  }
}
