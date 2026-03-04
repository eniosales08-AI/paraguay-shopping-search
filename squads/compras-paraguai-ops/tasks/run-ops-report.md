---
task: runOpsReport()
responsavel: "Data Ops"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: exchangeRates
    tipo: file
    obrigatorio: false
    descricao: "Último output updateExchangeRates (para timestamp)"
  - nome: catalogUpdated
    tipo: file
    obrigatorio: false
    descricao: "Último catálogo (para contagens)"
  - nome: contentArtifacts
    tipo: file
    obrigatorio: false
    descricao: "Último sync de conteúdo (para status)"

Saida:
  - nome: opsReport
    tipo: file
    obrigatorio: true
    descricao: "Relatório de operações (markdown ou JSON): câmbio, catálogo, conteúdo, saúde"
  - nome: reportMetadata
    tipo: object
    obrigatorio: false
    descricao: "Data/hora do relatório, período coberto"

Checklist:
  pre-conditions:
    - "[ ] Pelo menos uma entrada disponível para gerar relatório útil"
    - "[ ] Destino gravável para opsReport"
  post-conditions:
    - "[ ] opsReport contém: última atualização de câmbio, contagem de itens no catálogo, status de conteúdo"
    - "[ ] Alertas ou avisos quando dados desatualizados ou falhas recentes"
  acceptance-criteria:
    - blocker: true
      criteria: "Relatório legível e acionável para o time"
    - blocker: false
      criteria: "Metadados permitem agendamento e histórico"

Performance:
  duration_expected: "1-2 minutos"
  cost_estimated: "~300-800 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca — relatório é leve e útil para visibilidade"

Error Handling:
  strategy: best-effort
  best_effort: "Se uma entrada falhar, incluir no relatório como 'não disponível' e continuar"
---

Gera relatório de operações: câmbio, catálogo, conteúdo e saúde. Consome artefatos das outras tasks do squad; saída para o time e Product Owner Ops.
