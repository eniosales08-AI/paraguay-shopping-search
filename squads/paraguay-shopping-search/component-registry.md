# component-registry.md — Fonte canônica de nomes

Squad: **paraguay-shopping-search** (site de buscas de compras do Paraguai — Congnittusai).  
Nomes a serem usados nas Fases 2, 3 e 4 do Nirvana.

---

## Agents (kebab-case)

| agent.id | agent.name (PascalCase) | Título |
|----------|-------------------------|--------|
| product-owner | Product Owner | Visão de produto e compliance |
| data-engineer | Data Engineer | Ingestão e catálogo |
| search-engineer | Search Engineer | Motor de busca |
| backend-engineer | Backend Engineer | API e performance |
| ux-designer | UX Designer | Design system e UX |
| frontend-engineer | Frontend Engineer | Implementação do site |
| seo-specialist | SEO Specialist | SEO e localização Paraguai |
| devops | DevOps | Infra e deploy |
| qa-engineer | QA Engineer | Qualidade e performance |

**Filenames:** `product-owner.md`, `data-engineer.md`, … (kebab-case.md).

---

## Tasks (camelCase) — identificadores

| task | Responsável (agent.id) |
|------|-------------------------|
| defineProductVision() | product-owner |
| ingestAndNormalizeCatalog() | data-engineer |
| buildSearchEngine() | search-engineer |
| buildBackendApi() | backend-engineer |
| designUiSystem() | ux-designer |
| implementFrontend() | frontend-engineer |
| planSeoLocalization() | seo-specialist |
| setupDeployAndMonitor() | devops |
| runQualityGates() | qa-engineer |

**Filenames:** `define-product-vision.md`, `ingest-and-normalize-catalog.md`, … (kebab-case.md).

---

## Workflows (snake_case)

| workflow_name | Descrição |
|---------------|-----------|
| data_to_search_to_api | Pipeline: ingestão → catálogo → busca → API |
| design_and_seo_to_frontend | Design system + SEO → implementação front-end |
| full_product_lifecycle | Ciclo completo: visão → dados → busca → API → front-end → QA/deploy |

**Filenames:** `data-to-search-to-api.yaml`, `design-and-seo-to-frontend.yaml`, `full-product-lifecycle.yaml` (kebab-case.yaml).

---

## Mapeamento role → skills (sugestão Fase 2)

| agent.id | Skills do projeto a referenciar |
|----------|---------------------------------|
| product-owner | prompt-engineering-patterns |
| data-engineer | (skills-free: scraping ético, APIs, normalização) |
| search-engineer | (skills-free: search/indexing) |
| backend-engineer | deployment-pipeline-design, github-actions-templates |
| ux-designer | web-design-guidelines, frontend-design |
| frontend-engineer | frontend-design, vercel-react-best-practices |
| seo-specialist | seo-audit, programmatic-seo, schema-markup |
| devops | deployment-pipeline-design, github-actions-templates |
| qa-engineer | seo-audit, (performance testing) |
