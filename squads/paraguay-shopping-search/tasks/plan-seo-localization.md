---
task: planSeoLocalization()
responsavel: "SEO Specialist"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: productVision
    tipo: file
    obrigatorio: true
    descricao: "Documento de visão e público-alvo (origen: defineProductVision())"
  - nome: visionMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados da visão"

Saida:
  - nome: seoSpec
    tipo: file
    obrigatorio: true
    descricao: "Especificação de SEO e localização es-PY, PYG (destino: implementFrontend(), runQualityGates())"
  - nome: seoMetadata
    tipo: object
    obrigatorio: false
    descricao: "Schema markup, meta por página, checklist"

Checklist:
  pre-conditions:
    - "[ ] productVision existe e é legível"
  post-conditions:
    - "[ ] seoSpec criado com meta tags, estrutura, schema markup, locale es-PY/PYG"
    - "[ ] Spec utilizável pelo Frontend e QA"
  acceptance-criteria:
    - blocker: true
      criteria: "SEO e localização para mercado paraguaio documentados"

Performance:
  duration_expected: "5-15 minutos"
  cost_estimated: "~1500-4000 tokens"
  cacheable: true
  parallelizable: true
  skippable_when: "Quando estratégia SEO já existir"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Documentar spec mínima de SEO"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que SEO e localização Paraguai estejam planejados"
  version: "1.0.0"
  dependencies:
    - defineProductVision()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# planSeoLocalization()

## Pipeline Diagram

defineProductVision() -> productVision -> planSeoLocalization() -> seoSpec.
Destinos: implementFrontend(), runQualityGates().

## Descrição

Task em paralelo (com designUiSystem). Planeja SEO e localização (es-PY, PYG) para o mercado paraguaio. Saída consumível por implementFrontend() e runQualityGates().
