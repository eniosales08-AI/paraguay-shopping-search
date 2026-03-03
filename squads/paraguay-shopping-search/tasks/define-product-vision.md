---
task: defineProductVision()
responsavel: "Product Owner"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: userObjective
    tipo: string
    obrigatorio: true
    descricao: "Objetivo do produto em linguagem natural (origen: usuário ou orquestrador)"
  - nome: contextRef
    tipo: string
    obrigatorio: false
    descricao: "Referência a contexto (ex.: fontes de dados desejadas)"

Saida:
  - nome: productVision
    tipo: file
    obrigatorio: true
    descricao: "Documento de visão, escopo, prioridades e compliance (destino: ingestAndNormalizeCatalog, designUiSystem, planSeoLocalization)"
  - nome: visionMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados para rastreabilidade"

Checklist:
  pre-conditions:
    - "[ ] userObjective fornecido e não vazio"
    - "[ ] Diretório de saída existe e é gravável"
  post-conditions:
    - "[ ] productVision criado (markdown) com escopo, prioridades, fontes permitidas, regras de compliance"
    - "[ ] Visão clara para Data Engineer e demais agentes"
  acceptance-criteria:
    - blocker: true
      criteria: "Documento define fontes de dados e regras de uso (agregação ética/legal)"
    - blocker: false
      criteria: "Prioridades do pipeline documentadas"

Performance:
  duration_expected: "3-8 minutos"
  cost_estimated: "~800-2000 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca — é a primeira task do pipeline"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Solicitar esclarecimento ao usuário"
  notification: "orchestrator"

Metadata:
  story: "Como usuário, preciso que a visão e o compliance do produto estejam documentados"
  version: "1.0.0"
  dependencies: []
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# defineProductVision()

## Pipeline Diagram

Usuário/orquestrador (userObjective) -> defineProductVision() -> productVision.
Destinos: ingestAndNormalizeCatalog(), designUiSystem(), planSeoLocalization().

## Descrição

Primeira task do pipeline. Transforma o objetivo em documento de visão com escopo, prioridades e regras de compliance (ToS, robots.txt). Alimenta Data Engineer, UX Designer e SEO Specialist.

### Responsabilidades

1. Interpretar o objetivo em linguagem natural.
2. Produzir documento (markdown) com escopo, prioridades e compliance.
3. Definir fontes permitidas e restrições para agregação de dados.

### Critérios de Qualidade

- Visão não ambígua para ingestão e design.
- Regras de compliance explícitas.
