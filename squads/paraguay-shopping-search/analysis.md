# analysis.md — Squad: Site de buscas de compras do Paraguai (Congnittusai)

Gerado na Fase 1 (Analyzer) do Nirvana Squad Creator.
Objetivo do usuário: Congnittusai quer o melhor time para desenvolver o melhor, mais moderno, funcional, rápido, lindo e sofisticado site de buscas de compras do Paraguai, podendo clonar informações de sites existentes (ex.: compras paraguai).

---

## 1. Domínio identificado

**Domínio:** E-commerce / comparador de preços e site de buscas de compras para o mercado paraguaio.
**Subdomínios:** Ingestão e agregação de dados de sites existentes, normalização de catálogo, motor de busca, backend performático, front-end moderno e sofisticado, SEO e localização (Paraguai), DevOps e qualidade.

**Nota de compliance:** "Clonar informações" = agregar dados de forma ética e legal (ToS, robots.txt, APIs). O product-owner define compliance e fontes permitidas.

---

## 2. Capacidades necessárias

| # | Capacidade | Descrição |
|---|------------|-----------|
| 1 | Visão de produto e compliance | Escopo, prioridades, regras de uso de dados (scraping/APIs, ToS) |
| 2 | Ingestão e normalização de dados | Coletar de sites existentes, normalizar schema, catálogo unificado |
| 3 | Motor de busca | Indexação, queries, filtros, relevância, performance |
| 4 | API backend | API estável, rápida, cache, escalável |
| 5 | Design system e UX | Sistema de design moderno, UI sofisticada, protótipos, acessibilidade |
| 6 | Implementação front-end | Site rápido, responsivo, acessível, visualmente sofisticado |
| 7 | SEO e localização | SEO para Paraguai, localização (idioma/moeda), descoberta |
| 8 | Infra e deploy | CI/CD, hospedagem, monitoramento, observabilidade |
| 9 | Garantia de qualidade | E2E, performance, acessibilidade, regressão |

---

## 3. Roles propostos

| Agent ID | Nome legível | Título | Arquétipo |
|----------|--------------|--------|-----------|
| product-owner | Product Owner | Visão de produto e compliance | Guardian |
| data-engineer | Data Engineer | Ingestão e catálogo | Builder |
| search-engineer | Search Engineer | Motor de busca | Builder |
| backend-engineer | Backend Engineer | API e performance | Builder |
| ux-designer | UX Designer | Design system e UX | Builder |
| frontend-engineer | Frontend Engineer | Implementação do site | Builder |
| seo-specialist | SEO Specialist | SEO e localização Paraguai | Guardian |
| devops | DevOps | Infra e deploy | Flow_Master |
| qa-engineer | QA Engineer | Qualidade e performance | Guardian |

---

## 4. Dependency graph

```
[product-owner] --> visão, compliance
        |
        v
[data-engineer] --> ingestão, catálogo
        |
        v
[search-engineer] --> índice, busca
        |
        v
[backend-engineer] --> API
        |
        +--------+--------+
        v        v        v
[ux-designer] [seo-specialist] [devops]
        |        |        |
        v        v        v
[frontend-engineer] <-----+
        |
        v
[qa-engineer]
```

---

## 5. Workflow patterns sugeridos

| Pattern | Uso |
|--------|-----|
| Sequential | product-owner -> data-engineer -> search-engineer -> backend-engineer |
| Fan-out | ux-designer, seo-specialist, devops em paralelo |
| Converge | frontend + QA no fim |

**Workflows:** data_to_search_to_api, design_and_seo_to_frontend, full_product_lifecycle.

---

## 6. Contexto e skills

Skills do projeto: frontend-design, web-design-guidelines, seo-audit, programmatic-seo, schema-markup, deployment-pipeline-design. Scraping/ingestão: documentar em skills-free-phase1.md.

---

## 7. Skills por role (sugestão Fase 2)

| agent.id | Skills |
|----------|--------|
| product-owner | prompt-engineering-patterns |
| data-engineer | skills-free: scraping ético, APIs |
| search-engineer | skills-free: search/indexing |
| backend-engineer | deployment-pipeline-design, github-actions-templates |
| ux-designer | web-design-guidelines, frontend-design |
| frontend-engineer | frontend-design, vercel-react-best-practices |
| seo-specialist | seo-audit, programmatic-seo, schema-markup |
| devops | deployment-pipeline-design, github-actions-templates |
| qa-engineer | seo-audit, performance |
