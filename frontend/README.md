# Frontend — Paraguay Shopping Search

**Task:** implementFrontend()  
**Frontend Engineer** — Next.js 14, React, Tailwind. Consume apiSpec, designSystem, seoSpec.

---

## frontendBuild

- **Comando:** `npm run build` (desde `frontend/`).
- **Dev:** `npm run dev` → http://localhost:3000
- **Salida:** `.next/` (build de Next.js). Deploy con `next start` o en Vercel.

---

## Uso

1. Instalar: `cd frontend && npm install`
2. La API de búsqueda se sirve desde el mismo proyecto en `/api/search` (lee `../data/search/search.js`). Asegurarse de estar en la raíz del repo `congnittusai` al ejecutar (o que exista `../data`).
3. Alternativa: levantar el backend standalone `node api/server.js` (puerto 4000) y configurar el frontend para llamar a esa URL (variable de entorno).

---

## frontendMetadata

- **Preview local:** http://localhost:3000
- **Rutas:** `/` (home con búsqueda), `/buscar?q=...` (resultados)
- **SEO:** lang=es-PY, meta title/description, JSON-LD WebSite
- **Moneda:** Precios en Gs (PYG) en toda la UI
