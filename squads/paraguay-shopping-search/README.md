# paraguay-shopping-search

Squad AIOS para o **site de buscas de compras do Paraguai** — moderno, funcional, rápido e sofisticado. Desenvolvido pela **Congnittusai**, empresa de tecnologia.

## Objetivo

Construir o melhor site de buscas de compras para o mercado paraguaio, com agregação de dados de sites existentes (ex.: Compras Paraguay), respeitando compliance (ToS, robots.txt, APIs). Pipeline: visão → ingestão → busca → API → design e SEO → front-end → deploy → QA.

## Componentes

- **9 agentes:** Product Owner, Data Engineer, Search Engineer, Backend Engineer, UX Designer, Frontend Engineer, SEO Specialist, DevOps, QA Engineer.
- **9 tasks:** defineProductVision, ingestAndNormalizeCatalog, buildSearchEngine, buildBackendApi, designUiSystem, implementFrontend, planSeoLocalization, setupDeployAndMonitor, runQualityGates.
- **3 workflows:** data_to_search_to_api, design_and_seo_to_frontend, full_product_lifecycle.

## Uso

- **Prefixo slash:** `pss` (paraguay shopping search).
- **Regra Cursor:** após deploy (Fase 8), ativar com **@paraguay-shopping** ou **@pss** no Cursor.
- **Pipeline completo:** usar workflow `full_product_lifecycle` ou executar tasks na ordem do dependency graph.

## Config

- `config/coding-standards.md` — convenções de código e documentos.
- `config/tech-stack.md` — tecnologias e ferramentas (Next.js, React, busca, PYG, es-PY).
- `config/source-tree.md` — estrutura do squad e workspace sugerido.

## Congnittusai

Congnittusai é uma empresa de tecnologia. O paraguay-shopping-search é um dos squads para produtos de e-commerce e busca no mercado paraguaio.
