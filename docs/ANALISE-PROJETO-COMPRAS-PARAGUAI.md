# Análise do projeto Compras Paraguai — o que falta para o site ir ao ar

**Data:** 03/03/2026  
**Objetivo:** Site de buscas de compras do Paraguai (paraguay-shopping-search + compras-paraguai-ops) no ar **sem erros**.

---

## 1. Estado atual do projeto

### 1.1 O que existe

| Área | Status | Detalhes |
|-----|--------|----------|
| **Squads** | ✅ | `paraguay-shopping-search` (9 agentes, 9 tasks, 3 workflows) e `compras-paraguai-ops` (5 agentes, 5 tasks, 2 workflows) definidos e validados |
| **Rules Cursor** | ✅ | `@paraguay-shopping` / `@pss` e `@compras-paraguai-ops` / `@cpo` |
| **Frontend (Next.js)** | ✅ Fase 0 | Layout, i18n (es/pt), home, página buscar, `/api/search` (mock), CSS + Tailwind; **build passa** |
| **Build frontend** | ✅ | `npm run build` no `frontend/` conclui sem erro (Fase 0 concluída) |
| **API de busca** | ✅ | `app/api/search/route.ts` usa catálogo **embutido** (const `CATALOG` no código); contrato em `docs/search-contract.md`. Em produção **não** lê arquivo; `frontend/data/catalog/products.json` é referência/backup. |
| **Dados / Catálogo** | ✅ | `docs/vision/product-vision.md`, `data/catalog/catalog-schema.json`, `data/catalog/products.json` (6 itens seed); API em produção usa catálogo embutido em `route.ts`; cópia em `frontend/data/catalog/` é referência. |
| **Motor de busca** | ✅ Básico | Busca em memória sobre o JSON do catálogo (filtros + ordenação) |
| **Backend API** | ✅ | Rota `/api/search` com contrato documentado |
| **Design / SEO** | ✅ | Tokens em `globals.css` e `docs/design-tokens.md`; SEO em `docs/seo-spec.md`; metadata e JSON-LD WebSite+SearchAction; skip link e a11y |
| **Deploy / CI/CD** | ✅ | GitHub Actions (frontend-ci); `frontend/vercel.json` e `docs/deploy.md`; variável `NEXT_PUBLIC_SITE_URL` documentada |
| **QA / Gates** | ✅ | Checklist em `qa/quality-gate-checklist.md` (build, lint, smoke, SEO, deploy) |

Resumo: **Fases 0 a 4 concluídas** — visão, catálogo, API, SEO, design tokens, acessibilidade (skip link, empty state, aria), deploy (Vercel + docs), quality gate checklist. Site pronto para deploy em produção; falta apenas conectar o repositório à Vercel e definir `NEXT_PUBLIC_SITE_URL`.

---

## 2. O que precisa ser feito para o site ir ao ar sem erros

Seguindo a ordem do pipeline do **paraguay-shopping-search** e fechando os buracos do front-end.

### Fase 0 — Front-end funcionar em modo “mock” (obrigatório para build e dev)

Sem isso o `npm run build` no frontend **falha** e não há como testar o site localmente.

| # | Item | Responsável (squad) | Descrição |
|---|------|---------------------|-----------|
| 0.1 | **Root layout** | Frontend Engineer | `app/layout.tsx` com `<html>`, `<body>`, import do CSS global |
| 0.2 | **CSS global** | Frontend Engineer | `app/globals.css` com variáveis: `--color-text`, `--color-text-muted`, `--color-border`, `--color-surface`, `--color-primary`, `--color-primary-hover` |
| 0.3 | **Layout locale** | Frontend Engineer | `app/[locale]/layout.tsx` (e opcionalmente middleware para redirecionar `/` → `/es` ou locale default) |
| 0.4 | **Página home** | Frontend Engineer | `app/[locale]/page.tsx` — home com link para `/es/buscar` (ou locale escolhido) |
| 0.5 | **Página buscar** | Frontend Engineer | `app/[locale]/buscar/page.tsx` que renderiza `BuscarClient` e passa `locale` |
| 0.6 | **lib/i18n** | Frontend Engineer | `lib/i18n.ts`: `Locale` type, `isValidLocale()`, `getTranslations(locale)` com chaves usadas em BuscarClient (loading, errorMessage, sortLabel, categoryLabel, storeLabel, resultsCount, etc.) em es-PY (e opcional pt-BR) |
| 0.7 | **Rota API /api/search** | Backend Engineer / Frontend | `app/api/search/route.ts` que aceite `q`, `page`, `limit`, `category`, `store`, `sort` e devolva `{ results, total, page, limit, facets }` — **inicialmente com dados mock** (array vazio ou poucos itens fixos) para o front não quebrar |
| 0.8 | **Build e lint** | DevOps / QA | `npm run build` e `npm run lint` no `frontend/` sem erros |

Com a Fase 0 concluída: o site sobe em `npm run dev`, a página de busca carrega e a API responde (mock). **Ainda não há dados reais.**

**Status (03/2026):** Fase 0 **concluída** — layout, i18n (es/pt), home, buscar, `/api/search` mock, Tailwind; `npm run build` passa.

---

### Fase 1 — Visão e dados (fundação)

| # | Item | Responsável (squad) | Descrição |
|---|------|---------------------|-----------|
| 1.1 | **Visão de produto** | Product Owner | Documento em `docs/vision/` com escopo, prioridades, fontes de dados permitidas e compliance (ToS, robots.txt) |
| 1.2 | **Schema do catálogo** | Data Engineer | Schema unificado (ex.: JSON Schema ou doc) com campos: id, title, description, price_pyg, store, url, image_url, category, locale (es-PY), currency (PYG) |
| 1.3 | **Catálogo normalizado** | Data Engineer / compras-paraguai-ops | Dados reais ou seed em `data/catalog/` (ou DB) conforme schema; pode começar com um JSON/CSV pequeno para testes |
| 1.4 | **Contrato de busca** | Search Engineer | Documento com queries e filtros (q, page, limit, category, store, sort) e formato de resposta (results, total, facets) |

**Status (03/2026):** Fase 1 **concluída** — `docs/vision/product-vision.md`, `data/catalog/catalog-schema.json`, `data/catalog/products.json`, `docs/search-contract.md`.

---

### Fase 2 — Busca e API real

| # | Item | Responsável (squad) | Descrição |
|---|------|---------------------|-----------|
| 2.1 | **Índice de busca** | Search Engineer | Implementar busca (ex.: busca em JSON em memória, ou PostgreSQL FTS, ou Meilisearch/Typesense) a partir do catálogo normalizado |
| 2.2 | **API de busca real** | Backend Engineer | Substituir o mock em `app/api/search/route.ts` por chamada ao índice; manter contrato (results, total, page, limit, facets) |
| 2.3 | **OpenAPI / doc** | Backend Engineer | Documentar endpoint `/api/search` (parâmetros e resposta) para o time e para o frontend |

**Status (03/2026):** Fase 2 **concluída** — API usa catálogo **embutido** em `frontend/app/api/search/route.ts` (não lê arquivo em produção); busca em memória (filtros + sort); contrato documentado em `docs/search-contract.md`.

---

### Fase 3 — Design, SEO e polish do front

| # | Item | Responsável (squad) | Descrição |
|---|------|---------------------|-----------|
| 3.1 | **Design system (mínimo)** | UX Designer | Tokens (cores, tipografia) e regras já refletidas no `globals.css` e nos componentes (já parcialmente usados no BuscarClient) |
| 3.2 | **SEO e localização** | SEO Specialist | Meta tags, títulos por página, locale es-PY, PYG; opcional schema markup para produtos |
| 3.3 | **Acessibilidade e UX** | Frontend Engineer / QA | Labels, contraste, foco; mensagens de erro e vazio claras na página de busca |

**Status (03/2026):** Fase 3 concluída — design-tokens, seo-spec, metadata, JSON-LD, skip link, a11y. Isso evita “site no ar mas com erros” de SEO e acessibilidade.

---

### Fase 4 — Deploy e qualidade

| # | Item | Responsável (squad) | Descrição |
|---|------|---------------------|-----------|
| 4.1 | **Ambiente de deploy** | DevOps | Configurar deploy (ex.: Vercel) para o `frontend/`; variáveis de ambiente se a API ou busca dependerem de URL/keys |
| 4.2 | **CI (build + lint)** | DevOps | Pipeline (ex.: GitHub Actions) que rode `npm run build` e `npm run lint` em todo push/PR |
| 4.3 | **Quality gates** | QA Engineer | Checklist ou script: build OK, lint OK, smoke (home + buscar carregam), opcional Lighthouse/E2E; relatório de gate (go/no-go) |
| 4.4 | **Monitoramento básico** | DevOps | Saúde do deploy (ex.: Vercel dashboard ou ping em produção); alerta se o site cair |

**Status (03/2026):** Fase 4 concluída — vercel.json, deploy.md, quality-gate-checklist; deploy: conectar Vercel e NEXT_PUBLIC_SITE_URL. Com Fase 4, o site “está no ar” de forma repetível e com critérios claros de qualidade.

---

## 3. Checklist resumido — “site no ar sem erros”

Use como lista de verificação antes de considerar o site pronto.

### Build e execução

- [ ] `cd frontend && npm install && npm run build` — conclui sem erro
- [ ] `npm run dev` — site acessível em localhost; home e `/es/buscar` (ou locale default) carregam
- [ ] `/api/search` responde com JSON (mock ou real) e o front exibe resultados ou “0 resultados” sem erro de JS

### Dados e API

- [ ] Existe documento de visão em `docs/vision/`
- [ ] Existe schema do catálogo e dados (ou seed) normalizados
- [ ] API `/api/search` consome índice/catálogo real (ou mock estável) e retorna `results`, `total`, `facets` no formato esperado pelo front

### Front-end

- [ ] Existem `app/layout.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/buscar/page.tsx`
- [ ] Existe `lib/i18n.ts` com todas as chaves usadas em BuscarClient
- [ ] Existe `app/globals.css` com as variáveis CSS usadas (--color-*)
- [ ] Sem erros no console do navegador na home e na busca

### Deploy e QA

- [ ] Deploy configurado (ex.: Vercel) e URL de produção conhecida
- [ ] Build e lint na CI (ex.: GitHub Actions) passando
- [ ] Pelo menos um smoke test: acessar URL de produção, home e buscar — sem 500 nem tela em branco

---

## 4. Ordem sugerida de execução

1. **Fase 0** (1–2 dias): fechar todos os itens 0.1–0.8 para o front buildar e rodar com API mock.
2. **Fase 1** (conforme disponibilidade de dados): visão + schema + catálogo (ou seed) + contrato de busca.
3. **Fase 2**: índice + API real em `/api/search`.
4. **Fase 3**: ajustes de design/SEO/a11y.
5. **Fase 4**: deploy + CI + quality gates + monitoramento.

Assim o site pode “ir ao ar” primeiro em modo **mock** (sem erros de build ou runtime) e depois trocar para **dados reais** e **deploy em produção** sem quebrar a experiência.

---

## 5. Referências no repositório

- **Pipeline e tasks:** `squads/paraguay-shopping-search/tasks/` (define-product-vision, ingest-and-normalize-catalog, build-search-engine, build-backend-api, implement-frontend, plan-seo-localization, setup-deploy-and-monitor, run-quality-gates).
- **Front-end atual:** `frontend/app/[locale]/buscar/BuscarClient.tsx` (única página; depende de `@/lib/i18n` e `/api/search`).
- **Workspace sugerido:** `squads/paraguay-shopping-search/config/source-tree.md` e `squads/compras-paraguai-ops/config/source-tree.md`.

---

*Documento gerado a partir da análise do estado atual do repositório congnittusai (frontend, squads, docs e pastas de dados/API/deploy).*
