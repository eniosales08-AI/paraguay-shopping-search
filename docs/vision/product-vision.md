# Visión de producto — Compras Paraguay

**Versión:** 1.0  
**Fecha:** 2026-03  
**Squad:** paraguay-shopping-search (Congnittusai)

---

## 1. Objetivo

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

## 6. Metadatos de la visión

- **Autor:** Congnittusai (squad paraguay-shopping-search).
- **Destinatarios:** Data Engineer, Search Engineer, Backend Engineer, Frontend Engineer, SEO, DevOps, QA.
- **Próxima revisión:** al añadir nuevas fuentes o cambiar alcance.
