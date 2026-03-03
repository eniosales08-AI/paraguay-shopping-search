# Schema do catálogo unificado — Paraguay Shopping Search

**Responsável:** Data Engineer  
**Consumidores:** buildSearchEngine(), buildBackendApi()  
**Moeda:** PYG | **Locale:** es-PY

---

## Campos (obrigatórios)

| Campo        | Tipo     | Descrição |
|-------------|----------|-----------|
| `id`        | string   | ID único no catálogo (ex.: hash de source + source_id) |
| `title`     | string   | Título do produto (es-PY) |
| `price_pyg` | number   | Preço em guaraníes (≥ 0) |
| `store`     | string   | Nome da loja/fonte |
| `url`       | string   | URL do produto na loja de origem (afiliado) |
| `source`    | string   | Identificador da fonte (ex.: compras-paraguay) |
| `locale`    | string   | Sempre `es-PY` |

## Campos (opcionais)

| Campo        | Tipo     | Descrição |
|-------------|----------|-----------|
| `description` | string | Descrição do produto (es-PY) |
| `store_id`    | string | ID interno da loja |
| `image_url`   | string | URL da imagem principal |
| `category`    | string | Categoria normalizada (es-PY) |
| `source_id`    | string | ID do item na fonte original |
| `currency`    | string | Sempre `PYG` |
| `ingested_at`  | string | ISO 8601 — data de ingestão |
| `updated_at`   | string | ISO 8601 — última atualização |

## Uso para busca e API

- **Full-text:** `title`, `description`, `category`, `store`
- **Filtros/facetas:** `category`, `store`, faixa de `price_pyg`
- **Ordenação:** `price_pyg`, relevância, `updated_at`

Referência machine-readable: `schema.json` (JSON Schema).
