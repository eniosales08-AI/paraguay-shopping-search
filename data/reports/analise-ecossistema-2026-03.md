# Análise do ecossistema — Compras Paraguay / Congnittusai

**Data:** 2026-03  
**Tipo:** Análise tipo Kaizen (gaps + recomendações)  
**Escopo:** Squads paraguay-shopping-search, compras-paraguai-ops; frontend; docs; deploy.

---

## 1. Visão geral do ecossistema

| Componente | Estado | Observação |
|------------|--------|------------|
| **paraguay-shopping-search** | Definido e parcialmente implementado | 9 agentes, 9 tasks, 3 workflows; pipeline refletido no código em parte |
| **compras-paraguai-ops** | Só definição | 5 agentes, 5 tasks, 2 workflows; nenhum script ou integração no front/API |
| **Frontend (Next.js)** | Implementado | Home, busca (/es/buscar), API /api/search, i18n es/pt, catálogo embutido na API |
| **Docs** | Completos | Visão, schema, contrato de busca, SEO, deploy, checkpoint, “o que não deu certo” |
| **CI** | Ativo | GitHub Actions (lint + build no frontend) |
| **Deploy** | Vercel | Configurado; estabilidade dependente de commit/push e redeploy |

---

## 2. Cobertura tasks (paraguay-shopping-search) vs. código

| Task | Responsável | Implementação atual |
|------|-------------|----------------------|
| defineProductVision | Product Owner | ✅ docs/vision/product-vision.md |
| ingestAndNormalizeCatalog | Data Engineer | ⚠️ Catálogo estático embutido na API (6 produtos); sem pipeline de ingestão real |
| buildSearchEngine | Search Engineer | ⚠️ Busca em memória no route.ts (filterAndSort); sem índice externo |
| buildBackendApi | Backend Engineer | ✅ GET /api/search com contrato documentado |
| designUiSystem | UX Designer | ✅ Tokens em globals.css + docs/design-tokens.md |
| implementFrontend | Frontend Engineer | ✅ Home, busca, fallbacks, a11y (skip link, empty state) |
| planSeoLocalization | SEO Specialist | ✅ Metadata, JSON-LD, docs/seo-spec.md |
| setupDeployAndMonitor | DevOps | ✅ Vercel + docs/deploy; CI no GitHub Actions |
| runQualityGates | QA Engineer | ⚠️ Checklist manual (qa/quality-gate-checklist.md); sem E2E/Lighthouse automatizado |

---

## 3. Gaps identificados

### 3.1 Dados e catálogo

- **Catálogo estático:** API usa array fixo **embutido** em `frontend/app/api/search/route.ts` (const `CATALOG`); o arquivo `products.json` **não é lido** pela API em produção (Vercel). Não há ingestão a partir de fontes externas (compras-paraguai-ops não está ligado ao front/API).
- **Sem pipeline de preços/câmbio:** Tasks do compras-paraguai-ops (update-exchange-rates, normalize-prices) não têm implementação; não há integração com paraguay-shopping-search.

### 3.2 Busca

- **Sem índice escalável:** Busca em memória é suficiente para poucos itens; para crescimento (centenas/milhares) será preciso índice (ex.: PostgreSQL FTS, Meilisearch) e tarefa buildSearchEngine executada de fato.

### 3.3 Qualidade e operação

- **Quality gates manuais:** Nenhum script E2E (Playwright/Cypress) nem Lighthouse em CI; relatório de gate depende de checklist humano.
- **Deploy/código:** Risco de deploy na Vercel com código desatualizado se commit/push não for feito ou se Redeploy não for acionado após mudanças.

### 3.4 Squad compras-paraguai-ops

- **Só definição:** Nenhum script, job ou API que execute update-exchange-rates, normalize-prices, maintain-catalog, sync-content, run-ops-report; o squad existe no papel e nas rules do Cursor, mas não no runtime.

### 3.5 Documentação vs. realidade

- **CHECKPOINT e ANALISE** falam em “catálogo em frontend/data/catalog/products.json”; na prática a API usa catálogo **embutido** no route.ts. Docs deveriam ser alinhados para evitar confusão.

---

## 4. Recomendações (priorizadas)

### P1 — Estabilizar e alinhar

1. **Confirmar deploy na Vercel**  
   Garantir que o último commit (catálogo embutido + facets defensivos) está no repositório e que a Vercel fez deploy desse commit. Testar `/api/search` e a página de busca. *Responsável sugerido: DevOps / você.*

2. **Atualizar docs de checkpoint/catálogo**  
   Em `docs/CHECKPOINT-CONTINUAR.md` e onde couber, deixar explícito que a API usa catálogo **embutido** em `frontend/app/api/search/route.ts` (e que `frontend/data/catalog/products.json` é referência/backup, não lido em produção na Vercel). *Responsável: qualquer.*

### P2 — Dados e operações

3. **Decisão sobre catálogo**  
   - Se v1 for só demonstração: manter catálogo embutido e documentar.  
   - Se for para crescer: definir uma fonte de verdade (JSON em repo, DB ou ingestão) e fazer a API ler dessa fonte (ou manter um build-step que gera o array a partir de JSON). *Responsável: Product Owner + Data Engineer.*

4. **Compras-paraguai-ops: primeiro uso**  
   Escolher uma task para implementar de fato (ex.: **run-ops-report** como script ou página que lê status da API e gera um relatório markdown). Assim o squad passa a ter impacto no projeto. *Responsável: Data Ops / você.*

### P3 — Qualidade e escala

5. **Automatizar um quality gate**  
   Adicionar à CI um passo que: (a) sobe o front em modo produção (ou usa URL da Vercel) e (b) chama GET `/api/search` e verifica que `results` é array e `total` é número; ou um smoke E2E com Playwright (home + buscar). *Responsável: QA Engineer / DevOps.*

6. **Quando o catálogo crescer**  
   Implementar ingestão (task ingest-and-normalize-catalog) e índice de busca (task build-search-engine); a API então consulta o índice em vez do array em memória. *Responsável: Data Engineer + Search Engineer.*

---

## 5. Resumo executivo

- **O que está bom:** Squads definidos, front e API no ar (com catálogo embutido), visão e compliance documentados, SEO e deploy configurados, CI com build e lint.
- **Principais gaps:** Catálogo estático e sem pipeline de ingestão; compras-paraguai-ops só no papel; quality gates manuais; risco de deploy/código dessincronizado.
- **Próximos passos sugeridos:** (1) Estabilizar deploy e docs; (2) Decidir evolução do catálogo e dar um primeiro uso ao compras-paraguai-ops; (3) Automatizar pelo menos um gate e planejar índice quando houver mais dados.

---

*Relatório gerado com base no repositório atual. Para recomendações semanais e meta-análise contínua, considerar o squad Kaizen (squads.sh) quando instalado.*
