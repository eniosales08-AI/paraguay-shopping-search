---
task: normalizePrices()
responsavel: "Pricing Analyst"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: catalogInput
    tipo: file
    obrigatorio: true
    descricao: "Catálogo atual (ou stream) com preços em origem (multi-moeda)"
  - nome: exchangeRates
    tipo: file
    obrigatorio: true
    descricao: "Taxas de câmbio (output updateExchangeRates)"

Saida:
  - nome: catalogNormalized
    tipo: file
    obrigatorio: true
    descricao: "Catálogo com preços em PYG; campos de preço normalizados"
  - nome: normalizationReport
    tipo: object
    obrigatorio: false
    descricao: "Contagem de itens convertidos, erros, outliers"

Checklist:
  pre-conditions:
    - "[ ] catalogInput e exchangeRates disponíveis"
    - "[ ] Schema de catálogo compatível com paraguay-shopping-search"
  post-conditions:
    - "[ ] Todos os preços em PYG no catalogNormalized"
    - "[ ] Arredondamento conforme regras do projeto"
  acceptance-criteria:
    - blocker: true
      criteria: "Nenhum preço em moeda estrangeira no output"
    - blocker: false
      criteria: "Relatório de normalização gerado para auditoria"

Performance:
  duration_expected: "2-10 minutos (depende do tamanho do catálogo)"
  cost_estimated: "~600-2000 tokens"
  cacheable: false
  parallelizable: true
  skippable_when: "Catálogo já está 100% em PYG e sem alteração de câmbio"

Error Handling:
  strategy: partial
  partial: "Itens com preço inválido são registrados no report e opcionalmente excluídos ou marcados"
---

Normaliza preços do catálogo para PYG usando exchangeRates. Saída consumida pelo **maintain-catalog** e pelo pipeline de busca (paraguay-shopping-search).
