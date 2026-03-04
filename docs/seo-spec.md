# Especificación SEO — Compras Paraguay

**Versión:** 1.0 | **Squad:** paraguay-shopping-search

## Objetivo

Sitio descubrible por buscadores, con meta correctas, locale es-PY y precios en PYG. Sin conflicto con políticas de fuentes agregadas.

## Implementado

- **Metadata (Next.js):** `metadata` y `generateMetadata` en layout y páginas; título por ruta (home, buscar); descripción y OpenGraph locale (es_PY / pt_BR).
- **Schema.org:** JSON-LD `WebSite` con `SearchAction` en el layout raíz; `metadataBase` para URLs canónicas (usar `NEXT_PUBLIC_SITE_URL` en producción).
- **Idioma:** `lang="es"` en `<html>`; páginas en es-PY y pt; contenido y UI en español/portugués según locale.
- **Accesibilidad:** skip link "Saltar al contenido" → `#main`; landmarks `main` con `id="main"`; mensaje de estado cuando no hay resultados; aria-labels en controles de ordenación.

## Variables de entorno

- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio (ej. `https://comprasparaguay.com`) para canonical, OpenGraph y schema.

## Pendiente (opcional)

- Schema `ItemList` / `Product` en la página de resultados cuando haya datos estructurados por producto.
- Sitemap.xml y robots.txt generados (Next.js config o rutas estáticas).
- Meta para redes sociales por página si se requieren imágenes o títulos específicos.
