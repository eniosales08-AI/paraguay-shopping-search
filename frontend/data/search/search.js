/**
 * Motor de busca MVP — Paraguay Shopping Search (cópia para deploy Vercel)
 * Lê data/catalog/products.json (relativo a este arquivo).
 */

const path = require('path');
const fs = require('fs');

const CATALOG_PATH = path.join(__dirname, '..', 'catalog', 'products.json');

function loadCatalog() {
  const raw = fs.readFileSync(CATALOG_PATH, 'utf8');
  return JSON.parse(raw);
}

function search(params = {}) {
  const {
    q = '',
    category,
    store,
    price_min,
    price_max,
    sort = 'relevance',
    page = 1,
    limit = 20,
  } = params;

  let catalog = loadCatalog();

  if (q && q.trim()) {
    const lower = q.trim().toLowerCase();
    catalog = catalog.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(lower)) ||
        (p.description && p.description.toLowerCase().includes(lower)) ||
        (p.category && p.category.toLowerCase().includes(lower))
    );
  }

  if (category) catalog = catalog.filter((p) => p.category === category);
  if (store) catalog = catalog.filter((p) => p.store === store);
  if (typeof price_min === 'number') catalog = catalog.filter((p) => p.price_pyg >= price_min);
  if (typeof price_max === 'number') catalog = catalog.filter((p) => p.price_pyg <= price_max);

  const total = catalog.length;

  if (sort === 'price_asc') catalog = [...catalog].sort((a, b) => a.price_pyg - b.price_pyg);
  else if (sort === 'price_desc') catalog = [...catalog].sort((a, b) => b.price_pyg - a.price_pyg);
  else if (sort === 'updated_desc') catalog = [...catalog].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));

  const safeLimit = Math.min(Math.max(1, limit), 100);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const results = catalog.slice(start, start + safeLimit);

  const out = results.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? null,
    price_pyg: p.price_pyg,
    store: p.store,
    url: p.url,
    image_url: p.image_url ?? null,
    category: p.category ?? null,
    locale: p.locale || 'es-PY',
    currency: p.currency || 'PYG',
  }));

  const categories = {};
  const stores = {};
  let priceMin = Infinity;
  let priceMax = -Infinity;
  catalog.forEach((p) => {
    if (p.category) categories[p.category] = (categories[p.category] || 0) + 1;
    if (p.store) stores[p.store] = (stores[p.store] || 0) + 1;
    if (typeof p.price_pyg === 'number') {
      priceMin = Math.min(priceMin, p.price_pyg);
      priceMax = Math.max(priceMax, p.price_pyg);
    }
  });

  const facets = {
    categories: Object.entries(categories).map(([value, count]) => ({ value, count })),
    stores: Object.entries(stores).map(([value, count]) => ({ value, count })),
    price_range: { min: priceMin === Infinity ? 0 : priceMin, max: priceMax === -Infinity ? 0 : priceMax },
  };

  return { results: out, total, page: safePage, limit: safeLimit, facets };
}

module.exports = { search, loadCatalog };
