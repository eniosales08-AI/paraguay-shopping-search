---
task: designUiSystem()
responsavel: "UX Designer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: productVision
    tipo: file
    obrigatorio: true
    descricao: "Documento de visão e prioridades (origen: defineProductVision())"
  - nome: visionMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados da visão"

Saida:
  - nome: designSystem
    tipo: file
    obrigatorio: true
    descricao: "Design system e especificações de UI/UX (destino: implementFrontend())"
  - nome: designAssetsRef
    tipo: string
    obrigatorio: false
    descricao: "Referência a tokens, protótipos ou assets (destino: implementFrontend())"

Checklist:
  pre-conditions:
    - "[ ] productVision existe e é legível"
  post-conditions:
    - "[ ] designSystem criado com tokens, componentes, acessibilidade, responsividade"
    - "[ ] Specs utilizáveis pelo Frontend Engineer"
  acceptance-criteria:
    - blocker: true
      criteria: "Design system moderno e sofisticado (objetivo Congnittusai)"
    - blocker: false
      criteria: "Critérios de acessibilidade documentados"

Performance:
  duration_expected: "10-30 minutos"
  cost_estimated: "~3000-8000 tokens"
  cacheable: true
  parallelizable: true
  skippable_when: "Quando design já existir e for aprovado"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Documentar spec mínima de UI"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o design system e a UX estejam definidos para o front-end"
  version: "1.0.0"
  dependencies:
    - defineProductVision()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# designUiSystem()

## Pipeline Diagram

defineProductVision() -> productVision -> designUiSystem() -> designSystem, designAssetsRef.
Destino: implementFrontend().

## Descrição

Task em paralelo (com planSeoLocalization). Cria design system e especificações de UI/UX a partir da visão. Saída consumível por implementFrontend().
