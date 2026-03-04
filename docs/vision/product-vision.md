# Visión de producto — Compras Paraguay

**Versión:** 1.0  
**Fecha:** 2026-03  
**Squad:** paraguay-shopping-search (Congnittusai)

---

## Objetivo final (north star)

**Ser el sitio de referencia de búsqueda de compras en Paraguay:** un único lugar donde la persona encuentra ofertas de varias tiendas, con búsqueda por texto, filtros (categoría, tienda, precio), precios en PYG, experiencia en español (es-PY) y opcionalmente en portugués, rápido y confiable, sin checkout en el sitio — solo búsqueda, comparación y enlace a la tienda. El catálogo se alimenta de fuentes permitidas (APIs, feeds, compliance) y la operación (precios, cambio, contenido) es sostenible vía los squads paraguay-shopping-search y compras-paraguai-ops.

*Resumen en una frase:* un “Google de compras” para Paraguay: buscar, filtrar, comparar precios en PYG e ir a comprar a la tienda.  
*Doc dedicado:* `docs/OBJETIVO-FINAL.md`.

---

## 1. Objetivo (alcance actual)

Construir el mejor sitio de **búsqueda de compras para el mercado paraguayo**: agregar ofertas de productos, exponer búsqueda por texto, categoría, tienda y precio, y ofrecer una experiencia rápida, clara y en español (es-PY), con precios en PYG.

## 2. Alcance

- **En alcance:** búsqueda de productos, filtros (categoría, tienda, orden por precio/relevancia), API REST para el front-end, interfaz responsive, locale es-PY y opcional pt (Brasil), SEO básico.
- **Fuera de alcance (v1):** checkout, carrito, cuentas de usuario, scraping automático sin reglas de compliance.

## 3. Prioridades del pipeline

1. **Visión y compliance** (Product Owner) → define este documento y reglas de fuentes.
2. **Catálogo** (Data Engineer / compras-paraguai-ops) → schema unificado, datos normalizados (PYG, es-PY).
3. **Motor de búsqueda** (Search Engineer) → índice, contrato de queries y filtros.
4. **API backend** (Backend Engineer) → endpoint `/api/search` estable y documentado.
5. **Diseño y SEO** (UX Designer, SEO Specialist) → design system mínimo, meta y localización.
6. **Front-end** (Frontend Engineer) → Next.js/React, integración con API.
7. **Deploy y QA** (DevOps, QA Engineer) → CI/CD, quality gates, monitoreo.

## 4. Fuentes de datos permitidas

- Cualquier fuente debe respetar **ToS**, **robots.txt** y APIs oficiales.
- Agregación solo desde fuentes permitidas y documentadas (listado en anexo o en docs).
- Preferir APIs oficiales o feeds; si se usa scraping, rate limiting y uso ético.
- **Moeda:** PYG. **Locale:** es-PY para contenido y precios mostrados.

## 5. Reglas de compliance

- No clonar datos de sitios que prohíban agregación en sus ToS.
- Respetar robots.txt y cabeceras de no-index cuando apliquen.
- No almacenar datos personales de usuarios en el catálogo; solo productos, precios, tiendas, URLs.
- Documentar en este repo las fuentes utilizadas y la fecha de última actualización cuando haya ingestión real.

## 6. Catálogo en v1 (decisión)

- **v1 (actual):** catálogo **embutido** en `frontend/app/api/search/route.ts` (6 productos). No se lee archivo en producción (Vercel serverless). Ver `docs/decisao-catalogo-v1.md`.
- **Al escalar:** definir fuente de verdad (JSON/DB/ingesta) y ejecutar ingest-and-normalize-catalog (P3.1) y, si aplica, build-search-engine (P3.2).

## 7. Metadatos de la visión

- **Autor:** Congnittusai (squad paraguay-shopping-search).
- **Destinatarios:** Data Engineer, Search Engineer, Backend Engineer, Frontend Engineer, SEO, DevOps, QA.
- **Próxima revisión:** al añadir nuevas fuentes o cambiar alcance.
