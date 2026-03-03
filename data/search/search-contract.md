# Contrato de busca — Paraguay Shopping Search

**Task:** buildSearchEngine()  
**Consumidor:** buildBackendApi()  
**Search Engineer** — contrato de queries e filtros.

---

## 1. Endpoint (para a API)

A API de busca expõe um único endpoint (ou método) que aceita os parâmetros abaixo e devolve resultados paginados + facetas.

**Método sugerido:** `GET /api/search` ou `POST /api/search` (body JSON).

---

## 2. Parâmetros de entrada (query)

| Parâmetro    | Tipo   | Obrigatório | Descrição |
|-------------|--------|-------------|-----------|
| `q`         | string | Não         | Texto livre para full-text (title, description, category) |
| `category`  | string | Não         | Filtro por categoria (ex.: "Electrónica", "Celulares") |
| `store`     | string | Não         | Filtro por loja |
| `price_min` | number | Não         | Preço mínimo em PYG |
| `price_max` | number | Não         | Preço máximo em PYG |
| `sort`      | string | Não         | Ordenação: `relevance` (default), `price_asc`, `price_desc`, `updated_desc` |
| `page`      | number | Não         | Página (1-based); default 1 |
| `limit`     | number | Não         | Itens por página (default 20, máx. 100) |

---

## 3. Formato de resposta

```json
{
  "results": [
    {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "price_pyg": "number",
      "store": "string",
      "url": "string",
      "image_url": "string | null",
      "category": "string | null",
      "locale": "es-PY",
      "currency": "PYG"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number",
  "facets": {
    "categories": [ { "value": "string", "count": "number" } ],
    "stores": [ { "value": "string", "count": "number" } ],
    "price_range": { "min": "number", "max": "number" }
  }
}
```

- **results:** Itens do catálogo que batem na busca/filtros.
- **total:** Total de resultados (para paginação).
- **facets:** Valores disponíveis para filtros (categorias, lojas, faixa de preço) considerando o resultado atual.

---

## 4. Facetas (filtros)

| Faceta      | Campo no catálogo | Uso na UI |
|-------------|-------------------|-----------|
| categories  | `category`        | Lista de categorias com contagem |
| stores      | `store`           | Lista de lojas com contagem |
| price_range | `price_pyg`       | min/max para slider ou faixas |

---

## 5. Ordenação (sort)

| Valor         | Comportamento |
|---------------|----------------|
| `relevance`   | Relevância textual (full-text); default |
| `price_asc`   | Preço crescente (PYG) |
| `price_desc`  | Preço decrescente |
| `updated_desc`| Mais recentes primeiro (updated_at) |

---

## 6. Latência esperada (searchMetadata)

- **Target:** &lt; 200 ms p95 para catálogo &lt; 100k itens (busca em memória ou índice local).
- **Produção (Meilisearch/PostgreSQL FTS/Elasticsearch):** &lt; 100 ms p95 com cache de queries quentes.

---

## 7. Referência ao índice

- **searchIndexRef:** `data/search` — módulo Node que lê `data/catalog/products.json` e aplica filtros/ordenação (MVP).
- **Produção:** Substituir por URL do Meilisearch/Elasticsearch ou conexão PostgreSQL FTS; contrato (parâmetros e resposta) permanece o mesmo.

Este documento é o **searchContract** entregue ao Backend Engineer para implementar o endpoint de busca.
