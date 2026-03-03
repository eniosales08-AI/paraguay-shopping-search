---
task: buildBackendApi()
responsavel: "Backend Engineer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: searchContract
    tipo: file
    obrigatorio: true
    descricao: "Contrato de queries e filtros (origen: buildSearchEngine())"
  - nome: searchIndexRef
    tipo: string
    obrigatorio: true
    descricao: "Referência ao índice de busca (origen: buildSearchEngine())"
  - nome: catalogSchema
    tipo: file
    obrigatorio: false
    descricao: "Schema do catálogo (origen: ingestAndNormalizeCatalog())"

Saida:
  - nome: apiSpec
    tipo: file
    obrigatorio: true
    descricao: "Especificação da API (OpenAPI ou equivalente) — destino: implementFrontend()"
  - nome: apiEndpointRef
    tipo: string
    obrigatorio: false
    descricao: "URL base da API (staging/produção) — destino: implementFrontend(), setupDeployAndMonitor()"

Checklist:
  pre-conditions:
    - "[ ] searchContract existe e é legível"
    - "[ ] searchIndexRef acessível"
  post-conditions:
    - "[ ] apiSpec criado com endpoints de busca, filtros, catálogo"
    - "[ ] API documentada para consumo pelo Frontend"
  acceptance-criteria:
    - blocker: true
      criteria: "API estável e documentada para o front-end consumir"

Performance:
  duration_expected: "variável"
  cost_estimated: "~2000-6000 tokens"
  cacheable: true
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Documentar spec da API"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que a API backend exponha busca e catálogo"
  version: "1.0.0"
  dependencies:
    - buildSearchEngine()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# buildBackendApi()

## Pipeline Diagram

buildSearchEngine() -> searchContract, searchIndexRef -> buildBackendApi() -> apiSpec, apiEndpointRef.
Destinos: implementFrontend(), setupDeployAndMonitor().

## Descrição

Quarta task do pipeline. Expõe busca e catálogo via API; produz especificação (ex.: OpenAPI) e referência ao endpoint. Saída consumível por implementFrontend().
