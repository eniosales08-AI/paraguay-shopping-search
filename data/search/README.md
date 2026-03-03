# Motor de busca — Paraguay Shopping Search

**Task:** buildSearchEngine()  
**Search Engineer** — saída para buildBackendApi().

---

## searchIndexRef (referência ao índice)

- **MVP:** `data/search/search.js` — módulo Node que lê `data/catalog/products.json` e aplica filtros/ordenação (full-text simples).
- **Uso no Backend:** `const { search } = require('./data/search/search.js'); search({ q: 'auriculares', limit: 10 });`
- **Produção:** Substituir por serviço externo (Meilisearch, Elasticsearch, PostgreSQL FTS); manter o mesmo contrato em `search-contract.md`.

---

## searchContract

- **Arquivo:** `data/search/search-contract.md`
- Parâmetros: `q`, `category`, `store`, `price_min`, `price_max`, `sort`, `page`, `limit`.
- Resposta: `results`, `total`, `page`, `limit`, `facets` (categories, stores, price_range).

---

## searchMetadata

| Campo        | Valor |
|-------------|--------|
| **facets**  | categories, stores, price_range |
| **sort**    | relevance, price_asc, price_desc, updated_desc |
| **latency_target** | < 200 ms p95 (MVP); < 100 ms p95 com índice dedicado |
| **catalog_source** | data/catalog/products.json |

---

## Índice (estado atual)

- **Populado:** Sim — via leitura direta de `products.json` no módulo `search.js`.
- **Spec para produção:** Usar `search-contract.md`; migrar para Meilisearch ou PostgreSQL FTS indexando os mesmos campos (title, description, category, store, price_pyg).
