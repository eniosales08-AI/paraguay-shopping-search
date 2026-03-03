---
task: runQualityGates()
responsavel: "QA Engineer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: deployUrl
    tipo: string
    obrigatorio: true
    descricao: "URL do ambiente a validar (origen: setupDeployAndMonitor())"
  - nome: seoSpec
    tipo: file
    obrigatorio: false
    descricao: "Especificação de SEO para validação (origen: planSeoLocalization())"
  - nome: frontendBuild
    tipo: string
    obrigatorio: false
    descricao: "Referência ao build (origen: implementFrontend()) — fallback quando deployUrl não existir"

Saida:
  - nome: qualityReport
    tipo: file
    obrigatorio: true
    descricao: "Relatório de E2E, performance, acessibilidade e SEO"
  - nome: gateStatus
    tipo: object
    obrigatorio: true
    descricao: "Go/no-go por gate (E2E, performance, a11y, SEO)"

Checklist:
  pre-conditions:
    - "[ ] deployUrl ou frontendBuild disponível para testes"
  post-conditions:
    - "[ ] qualityReport criado com resultados de E2E, Core Web Vitals, acessibilidade"
    - "[ ] gateStatus indicando go ou no-go por critério"
  acceptance-criteria:
    - blocker: true
      criteria: "Gates executados e relatório acionável"
    - blocker: false
      criteria: "Recomendação de go/no-go para produção"

Performance:
  duration_expected: "5-20 minutos"
  cost_estimated: "~2000-5000 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca em pipeline de release"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Relatório parcial com falhas documentadas"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que os gates de qualidade sejam executados antes de produção"
  version: "1.0.0"
  dependencies:
    - setupDeployAndMonitor()
    - implementFrontend()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# runQualityGates()

## Pipeline Diagram

setupDeployAndMonitor(), implementFrontend() -> deployUrl, seoSpec -> runQualityGates() -> qualityReport, gateStatus.
Última task do pipeline antes de go/no-go para produção.

## Descrição

Executa gates de qualidade (E2E, performance, acessibilidade, SEO). Produz relatório e status go/no-go. Consome deployUrl e opcionalmente seoSpec para validação.
