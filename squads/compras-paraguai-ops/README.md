# compras-paraguai-ops

Squad de **operações** para o projeto Compras Paraguai: preços, câmbio, catálogo e conteúdo. Complementa o [paraguay-shopping-search](../paraguay-shopping-search/), que cobre busca, API e front-end.

## Objetivo

- **Câmbio:** Atualizar taxas PYG/USD e PYG/BRL de forma rastreável.
- **Preços:** Normalizar preços do catálogo em PYG.
- **Catálogo:** Manter catálogo (dedup, categorias, disponibilidade) alinhado ao schema do paraguay-shopping-search.
- **Conteúdo:** Sincronizar conteúdo editorial e SEO (es-PY).
- **Relatórios:** Gerar relatório de operações para o time.

## Agentes

| Agente | Foco |
|--------|------|
| Product Owner (Ops) | Prioridades e regras de operações (câmbio, preço, catálogo) |
| Pricing Analyst | Câmbio e normalização de preços |
| Catalog Manager | Manutenção do catálogo |
| Content Editor | Conteúdo e SEO editorial |
| Data Ops | Pipelines e relatórios de operações |

## Tasks

- `update-exchange-rates` — Atualiza taxas de câmbio.
- `normalize-prices` — Normaliza preços do catálogo para PYG.
- `maintain-catalog` — Mantém catálogo (dedup, categorias, schema).
- `sync-content` — Sincroniza conteúdo editorial.
- `run-ops-report` — Gera relatório de operações.

## Workflows

- **pricing-and-catalog-ops:** update-exchange-rates → normalize-prices → maintain-catalog.
- **content-and-reporting:** sync-content → run-ops-report.

## Dependência

Este squad declara dependência do **paraguay-shopping-search** (schema, visão, SEO). Use os dois em conjunto no mesmo projeto para cobertura completa: busca + operações.

## Uso no Cursor / AIOS

- Prefixo de comandos: `cpo` (compras-paraguai-ops).
- Para criar/validar squads: use o agente **@squad-creator** (Craft) com `*validate-squad compras-paraguai-ops`.

## Tags

`ecommerce` · `paraguay` · `compras` · `operations` · `pricing` · `catalog` · `aios` · `congnittusai`
