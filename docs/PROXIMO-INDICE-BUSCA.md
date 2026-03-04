# Próximo passo: índice de busca (P3.2)

**Quando:** Catálogo crescer (centenas/milhares de itens).  
**Task:** squads/paraguay-shopping-search/tasks/build-search-engine.md

## Estado atual

- Busca em `frontend/lib/catalog-search.ts` (função `search()`), array em memória.
- Rota `app/api/search/route.ts` chama `search()` e devolve JSON. Contrato estável.

## Como trocar por índice externo

1. Escolher motor: Meilisearch, PostgreSQL FTS ou Typesense.
2. Manter contrato da API: `q`, `category`, `store`, `sort`, `page`, `limit` → `{ results, total, facets }`.
3. Trocar implementação de `search()` em `frontend/lib/catalog-search.ts` por cliente do motor (ou novo arquivo `catalog-search-meilisearch.ts`).
4. Job/script para popular o índice a partir de `products.json` ou fonte de verdade.

Ver task build-search-engine e doc search-contract.md.
