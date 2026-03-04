---
task: updateExchangeRates()
responsavel: "Pricing Analyst"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: opsPriorities
    tipo: file
    obrigatorio: false
    descricao: "Documento de prioridades/regras de ops (output define-ops-priorities)"
  - nome: sourceConfig
    tipo: object
    obrigatorio: false
    descricao: "Config de fontes de câmbio (API, fallback)"

Saida:
  - nome: exchangeRates
    tipo: file
    obrigatorio: true
    descricao: "Arquivo ou registro com taxas PYG/USD, PYG/BRL e timestamp"
  - nome: ratesMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados (fontes, data/hora)"

Checklist:
  pre-conditions:
    - "[ ] Fonte(s) de câmbio definidas (ops ou config)"
    - "[ ] Destino gravável para exchangeRates"
  post-conditions:
    - "[ ] exchangeRates atualizado com PYG/USD e PYG/BRL (ou conforme regras)"
    - "[ ] Timestamp de atualização registrado"
  acceptance-criteria:
    - blocker: true
      criteria: "Taxas válidas e timestamp presente"
    - blocker: false
      criteria: "Metadados permitem auditoria da fonte"

Performance:
  duration_expected: "1-3 minutos"
  cost_estimated: "~400-1000 tokens"
  cacheable: true
  parallelizable: false
  skippable_when: "Quando taxas foram atualizadas no mesmo dia (conforme política)"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    backoff: exponential
---

Atualiza as taxas de câmbio usadas no sistema (PYG/USD, PYG/BRL). Consome regras do Product Owner Ops; saída consumida por **normalize-prices** e pelo catálogo.
