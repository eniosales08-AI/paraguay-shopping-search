# Catálogo normalizado — Paraguay Shopping Search

**Task:** ingestAndNormalizeCatalog()  
**Data Engineer** — saída para buildSearchEngine() e buildBackendApi().

---

## catalogDataRef (referência aos dados)

- **Path:** `data/catalog/products.json`  
- **Formato:** JSON array de objetos conforme `schema.json`.  
- Para produção: pode ser substituído por PostgreSQL/MongoDB/Meilisearch; a referência será a connection string ou a URI do índice.

---

## catalogMetadata

| Campo   | Valor |
|--------|--------|
| **locale** | es-PY |
| **currency** | PYG |
| **schema_version** | 1.0.0 |
| **sources** | seed (datos de prueba); Compras Paraguay pendiente validación ToS/robots |
| **updated_at** | 2026-03-03 |

---

## Artefatos neste directorio

| Arquivo | Descripción |
|---------|-------------|
| `schema.json` | JSON Schema del catálogo (validación + API) |
| `schema.md` | Documentación humana del schema |
| `products.json` | Datos normalizados (seed para desarrollo; reemplazar por ingestión real) |
| `README.md` | Este archivo — catalogDataRef y metadata |

---

## Pipeline de ingestão (especificación)

Cuando existan fuentes aprobadas en `docs/vision/sources.md`:

1. **Validar** ToS y robots.txt de cada fuente; preferir API/feed oficial.
2. **Colectar** con rate limiting (ej.: 1 req/s por dominio); herramientas sugeridas: Puppeteer/Playwright, Cheerio, o cliente HTTP para APIs.
3. **Normalizar** cada ítem al schema: `id`, `title`, `description`, `price_pyg`, `store`, `url`, `image_url`, `category`, `source`, `source_id`, `locale`, `currency`, `ingested_at`, `updated_at`.
4. **Deduplicar** por `(source, source_id)` o por hash de (url, store).
5. **Persistir** en `products.json` (MVP) o en PostgreSQL/MongoDB/archivos NDJSON para producción.
6. **Actualizar** `docs/vision/sources.md` con método y fecha de verificación.

Salida de esta task: **catalogSchema** = `schema.json` + `schema.md`; **catalogDataRef** = `data/catalog/products.json`.
