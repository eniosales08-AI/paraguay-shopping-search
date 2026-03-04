# Checkpoint — Continuar daqui

**Data:** 03/03/2026  
**Objetivo:** Retomar o projeto Compras Paraguay deste ponto sem perder contexto.  
**Objetivo final do projeto:** `docs/OBJETIVO-FINAL.md` (north star: site de referência de busca de compras no Paraguai).

---

## Estado atual (resumo)

- **Fases 0 a 4 concluídas.** O site está pronto para deploy em produção.
- **Frontend:** Next.js 15 em `frontend/` — home (`/es`, `/pt`), busca (`/es/buscar`), API `/api/search` e `/api/ops-report`. Catálogo: fonte em `frontend/data/catalog/products.json` (importado no build em `frontend/lib/catalog-search.ts`); busca em memória; pronto para trocar por índice externo (ver `docs/PROXIMO-INDICE-BUSCA.md`).
- **Squads:** `paraguay-shopping-search` e `compras-paraguai-ops` definidos; regras Cursor: `@paraguay-shopping` / `@pss` e `@compras-paraguai-ops` / `@cpo`.
- **Docs:** visão em `docs/vision/product-vision.md`; schema em `data/catalog/catalog-schema.json`; contrato de busca em `docs/search-contract.md`; SEO em `docs/seo-spec.md`; design em `docs/design-system-paraguay.md` (template apple.md); resumo em `docs/design-tokens.md`; deploy em `docs/deploy.md`; quality gate em `qa/quality-gate-checklist.md`.
- **CI:** `.github/workflows/frontend-ci.yml` — lint + build no push/PR do `frontend/`.
- **Deploy:** `frontend/vercel.json` pronto; falta conectar o repo à Vercel (root = `frontend`) e definir `NEXT_PUBLIC_SITE_URL`.

## Comandos úteis

```bash
cd congnittusai/frontend
npm install
npm run dev      # http://localhost:3000 → /es
npm run build
npm run lint
```

## Próximos passos possíveis (quando retomar)

1. **Colocar no ar:** Conectar repositório à Vercel, root `frontend`, configurar `NEXT_PUBLIC_SITE_URL`; rodar o checklist em `qa/quality-gate-checklist.md`.
2. **Dados reais:** Trocar o catálogo JSON por ingestão real (Data Engineer / compras-paraguai-ops): fontes permitidas na visão, pipeline para `data/catalog/` e cópia ou leitura pela API.
3. **Busca escalável:** Se o catálogo crescer, substituir busca em memória por índice (PostgreSQL FTS, Meilisearch, etc.) conforme `squads/paraguay-shopping-search` (Search Engineer).
4. **Melhorias:** Schema Product/ItemList na página de busca; sitemap/robots; E2E (Playwright); Lighthouse em CI.

## Referências rápidas

| O quê | Onde |
|-------|------|
| **Objetivo final do projeto** | `docs/OBJETIVO-FINAL.md` |
| **Ao acordar (push + deploy)** | `docs/AO-ACORDAR.md` |
| Análise completa do projeto | `docs/ANALISE-PROJETO-COMPRAS-PARAGUAI.md` |
| Visão de produto | `docs/vision/product-vision.md` |
| Catálogo / busca | `frontend/data/catalog/products.json` + `frontend/lib/catalog-search.ts`; próximo índice: `docs/PROXIMO-INDICE-BUSCA.md` |
| **Onde conseguir dados** | `docs/FONTES-DE-DADOS.md` |
| Contrato da API de busca | `docs/search-contract.md` |
| Deploy (Vercel) | `docs/deploy.md` |
| Quality gate | `qa/quality-gate-checklist.md` |
| Squads / agentes | `squads/paraguay-shopping-search/`, `squads/compras-paraguai-ops/` |

---

*Para continuar: abrir este arquivo e seguir "Próximos passos possíveis" ou pedir ao assistente "continuar do checkpoint em docs/CHECKPOINT-CONTINUAR.md".*
