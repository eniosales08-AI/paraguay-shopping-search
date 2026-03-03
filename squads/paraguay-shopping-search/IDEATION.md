# IDEATION — paraguay-shopping-search

Documento de justificativas e decisões do pipeline Nirvana para o squad **paraguay-shopping-search** (Congnittusai).

---

## Fase 1 (Analyzer)

- **Objetivo do usuário:** Melhor time para desenvolver o melhor, mais moderno, funcional, rápido, lindo e sofisticado site de buscas de compras do Paraguai, podendo clonar informações de sites existentes (ex.: Compras Paraguay).
- **Domínio:** E-commerce / comparador de preços, mercado paraguaio; ingestão de dados, busca, API, front-end, SEO, DevOps, QA.
- **Compliance:** "Clonar" tratado como agregação ética e legal (ToS, robots.txt, APIs); Product Owner define fontes e regras.
- **Outputs:** analysis.md, component-registry.md, skills-free-phase1.md.

---

## Fase 2 (Agent Creator)

- **Decisão:** 9 agentes, um por role do registry; cada um com um comando principal alinhado à task homônima.
- **Arquétipos:** Guardian (product-owner, seo-specialist, qa-engineer), Builder (data-engineer, search-engineer, backend-engineer, ux-designer, frontend-engineer), Flow_Master (devops).
- **Skills:** Skills do projeto referenciadas onde existem (frontend-design, seo-audit, deployment-pipeline-design, etc.); data-engineer e search-engineer referenciam skills-free-phase1.
- **Arquivos gerados:** agents/product-owner.md … agents/qa-engineer.md (9 arquivos).

---

## Fase 3 (Task Creator)

- **Decisão:** 9 tasks com contratos Entrada/Saída encadeados conforme dependency graph.
- **Encadeamento:** defineProductVision -> productVision; ingestAndNormalizeCatalog -> catalogSchema, catalogDataRef; buildSearchEngine -> searchContract, searchIndexRef; buildBackendApi -> apiSpec; designUiSystem, planSeoLocalization (paralelo) -> designSystem, seoSpec; implementFrontend consome designSystem, apiSpec, seoSpec -> frontendBuild; setupDeployAndMonitor -> deployUrl; runQualityGates consome deployUrl, seoSpec -> qualityReport, gateStatus.
- **Arquivos gerados:** tasks/define-product-vision.md … tasks/run-quality-gates.md (9 arquivos).

---

## Fase 4 (Workflow Creator)

- **Workflows:** data_to_search_to_api (sequential), design_and_seo_to_frontend (fan-out + converge), full_product_lifecycle (pipeline completo).
- **squad.yaml:** name paraguay-shopping-search, version 1.0.0, slashPrefix pss, 9 agents, 9 tasks, 3 workflows, config refs.
- **config/:** coding-standards.md, tech-stack.md, source-tree.md.
- **README.md:** criado com objetivo, componentes e uso.

---

## Fase 5 (Optimizer)

- **AgentDropout:** Nenhum — todos os 9 agentes mantidos; nenhum par satisfaz Strict Subset Rule.
- **Cross-Reference Fix:** Todas as referências verificadas (agent IDs, task responsavel, workflow agent_sequence, squad.yaml components, config paths); nenhuma correção necessária.
- **Naming Consistency:** Agent ID/filename kebab-case, task identifier camelCase(), workflow name snake_case, command *kebab-case — todos em conformidade.
- **Arquivo gerado:** optimization-report.md.

---

## Fase 6 (Validator)

- **Categorias AIOS:** 1 Manifest, 2 Directory Structure, 3 Agent Format, 4 Task Format, 5 Cross-References, 6 YAML Syntax.
- **Resultado:** Todas as 6 categorias PASSED; 0 issues críticos, 0 warnings.
- **Arquivo gerado:** validation-report.md.

---

## Próximas fases

- **Fase 8:** Deploy (regra @ no Cursor, ex.: @paraguay-shopping ou @pss).
