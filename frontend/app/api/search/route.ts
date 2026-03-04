import { NextRequest } from "next/server";

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

// Catálogo embutido para funcionar na Vercel (sem depender de arquivo ou import JSON)
const CATALOG: Product[] = [
  { id: "1", title: "Auriculares inalámbricos Bluetooth", description: "Auriculares con cancelación de ruido, batería 20h.", price_pyg: 185000, store: "Electro Paraguay", url: "https://example.com/1", image_url: "https://picsum.photos/seed/auriculares/400/400", category: "Electrónica", locale: "es-PY", currency: "PYG" },
  { id: "2", title: "Cargador rápido 20W", description: null, price_pyg: 45000, store: "Electro Paraguay", url: "https://example.com/2", image_url: "https://picsum.photos/seed/cargador/400/400", category: "Electrónica", locale: "es-PY", currency: "PYG" },
  { id: "3", title: "Silla de oficina ergonómica", description: "Respaldo alto, reposabrazos.", price_pyg: 320000, store: "Muebles Py", url: "https://example.com/3", image_url: "https://picsum.photos/seed/silla/400/400", category: "Hogar", locale: "es-PY", currency: "PYG" },
  { id: "4", title: "Notebook 8GB RAM 256GB", description: "Procesador moderno, pantalla Full HD.", price_pyg: 1850000, store: "TecnoStore", url: "https://example.com/4", image_url: "https://picsum.photos/seed/notebook/400/400", category: "Electrónica", locale: "es-PY", currency: "PYG" },
  { id: "5", title: "Mesa de escritorio 1.20m", description: null, price_pyg: 280000, store: "Muebles Py", url: "https://example.com/5", image_url: "https://picsum.photos/seed/mesa/400/400", category: "Hogar", locale: "es-PY", currency: "PYG" },
  { id: "6", title: "Smartwatch deportivo", description: "Resistente al agua, GPS, pulsómetro.", price_pyg: 420000, store: "TecnoStore", url: "https://example.com/6", image_url: "https://picsum.photos/seed/smartwatch/400/400", category: "Electrónica", locale: "es-PY", currency: "PYG" },
];

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

    const catalog = CATALOG;
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
