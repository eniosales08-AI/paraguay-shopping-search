# Decisão sobre catálogo — v1 (Compras Paraguay)

**Data:** 2026-03  
**Status:** Documentado | **Responsável:** Product Owner (paraguay-shopping-search)

---

## Decisão para v1 (atualizada)

**Fonte de verdade do catálogo:** `frontend/data/catalog/products.json` (importado no build na API).

- A API em `frontend/app/api/search/route.ts` **importa** esse JSON; o bundle da Vercel inclui o arquivo, então funciona em serverless. Para alterar o catálogo: edite o JSON e faça redeploy.
- **Antes:** catálogo era array fixo no código; agora é o JSON do repo (ingestão mínima — P3.1 parcial).

---

## Quando escalar (pós-v1)

Quando houver **mais produtos** ou necessidade de **atualização sem redeploy**:

1. **Definir fonte de verdade:** JSON no repo (lido em build), DB (ex. Vercel Postgres), ou pipeline de ingestão (compras-paraguai-ops: maintain-catalog, update-exchange-rates).
2. **Implementar P3.1** (task ingest-and-normalize-catalog): API ou build-step lê da fonte e alimenta o catálogo.
3. **Opcional P3.2** (task build-search-engine): índice (Meilisearch, PostgreSQL FTS) em vez de filtro em memória.

Referência de tasks: `squads/paraguay-shopping-search/tasks/ingest-and-normalize-catalog.md`, `squads/paraguay-shopping-search/tasks/build-search-engine.md`, `docs/backlog-paraguay.md` (P3).

---

*Este doc atende à task P2.2 do backlog (decisão sobre catálogo documentada).*
