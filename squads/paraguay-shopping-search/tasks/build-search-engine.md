---
task: buildSearchEngine()
responsavel: "Search Engineer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: catalogSchema
    tipo: file
    obrigatorio: true
    descricao: "Schema do catálogo (origen: ingestAndNormalizeCatalog())"
  - nome: catalogDataRef
    tipo: string
    obrigatorio: true
    descricao: "Referência aos dados normalizados (origen: ingestAndNormalizeCatalog())"
  - nome: catalogMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados do catálogo"

Saida:
  - nome: searchContract
    tipo: file
    obrigatorio: true
    descricao: "Contrato de queries e filtros da busca (destino: buildBackendApi())"
  - nome: searchIndexRef
    tipo: string
    obrigatorio: true
    descricao: "Referência ao índice ou serviço de busca (destino: buildBackendApi())"
  - nome: searchMetadata
    tipo: object
    obrigatorio: false
    descricao: "Facetas, latência esperada"

Checklist:
  pre-conditions:
    - "[ ] catalogSchema existe e é legível"
    - "[ ] catalogDataRef acessível"
  post-conditions:
    - "[ ] searchContract criado com queries, filtros (categoria, preço, loja)"
    - "[ ] Índice populado ou spec de indexação documentada"
  acceptance-criteria:
    - blocker: true
      criteria: "Contrato utilizável pelo Backend para expor API de busca"

Performance:
  duration_expected: "variável (indexação)"
  cost_estimated: "~2000-5000 tokens"
  cacheable: true
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Documentar contrato e spec do motor"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o motor de busca seja construído sobre o catálogo"
  version: "1.0.0"
  dependencies:
    - ingestAndNormalizeCatalog()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# buildSearchEngine()

## Pipeline Diagram

```
[ingestAndNormalizeCatalog()] ──► catalogSchema, catalogDataRef
        │
        ▼
[buildSearchEngine()] ──► searchContract ──► [buildBackendApi()]
        │                    searchIndexRef
        └──► searchMetadata
```

## Descrição

Terceira task do pipeline. Constrói o motor de busca sobre o catálogo; produz contrato de queries/filtros e referência ao índice. Saída consumível por buildBackendApi().
