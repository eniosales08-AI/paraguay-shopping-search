---
task: implementFrontend()
responsavel: "Frontend Engineer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: designSystem
    tipo: file
    obrigatorio: true
    descricao: "Design system e specs de UI (origen: designUiSystem())"
  - nome: apiSpec
    tipo: file
    obrigatorio: true
    descricao: "Especificação da API (origen: buildBackendApi())"
  - nome: seoSpec
    tipo: file
    obrigatorio: true
    descricao: "Especificação de SEO e localização (origen: planSeoLocalization())"
  - nome: designAssetsRef
    tipo: string
    obrigatorio: false
    descricao: "Referência a assets (origen: designUiSystem())"
  - nome: apiEndpointRef
    tipo: string
    obrigatorio: false
    descricao: "URL base da API (origen: buildBackendApi())"

Saida:
  - nome: frontendBuild
    tipo: string
    obrigatorio: true
    descricao: "Referência ao build ou artefato do front-end (destino: setupDeployAndMonitor(), runQualityGates())"
  - nome: frontendMetadata
    tipo: object
    obrigatorio: false
    descricao: "URL preview, métricas de build"

Checklist:
  pre-conditions:
    - "[ ] designSystem existe e é legível"
    - "[ ] apiSpec existe e é legível"
    - "[ ] seoSpec existe e é legível"
  post-conditions:
    - "[ ] Front-end implementado (Next.js/React) seguindo design e integrando API"
    - "[ ] SEO e meta conforme seoSpec; locale es-PY, PYG"
  acceptance-criteria:
    - blocker: true
      criteria: "Site funcional, rápido e acessível (objetivo Congnittusai)"

Performance:
  duration_expected: "variável"
  cost_estimated: "~5000-15000 tokens"
  cacheable: true
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Documentar spec do front-end e pendências"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o front-end seja implementado com design, API e SEO"
  version: "1.0.0"
  dependencies:
    - designUiSystem()
    - buildBackendApi()
    - planSeoLocalization()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# implementFrontend()

## Pipeline Diagram

designUiSystem(), buildBackendApi(), planSeoLocalization() -> designSystem, apiSpec, seoSpec -> implementFrontend() -> frontendBuild.
Destinos: setupDeployAndMonitor(), runQualityGates().

## Descrição

Converge design, API e SEO. Implementa o front-end do site de buscas (Next.js/React); produz referência ao build. Saída consumível por setupDeployAndMonitor() e runQualityGates().
