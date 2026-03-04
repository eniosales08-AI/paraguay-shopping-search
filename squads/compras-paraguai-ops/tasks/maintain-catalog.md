---
task: maintainCatalog()
responsavel: "Catalog Manager"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: catalogNormalized
    tipo: file
    obrigatorio: false
    descricao: "Catálogo com preços já normalizados (output normalizePrices)"
  - nome: productVision
    tipo: file
    obrigatorio: false
    descricao: "Visão do produto (paraguay-shopping-search) para schema e fontes"
  - nome: lastCatalog
    tipo: file
    obrigatorio: false
    descricao: "Última versão do catálogo para diff e deduplicação"

Saida:
  - nome: catalogUpdated
    tipo: file
    obrigatorio: true
    descricao: "Catálogo atualizado (dedup, categorias, disponibilidade, schema)"
  - nome: maintenanceLog
    tipo: object
    obrigatorio: false
    descricao: "Log de alterações (novos, atualizados, removidos, duplicatas)"

Checklist:
  pre-conditions:
    - "[ ] Entrada de catálogo disponível (normalized ou lastCatalog)"
    - "[ ] Schema alinhado ao paraguay-shopping-search"
  post-conditions:
    - "[ ] catalogUpdated válido contra schema"
    - "[ ] Duplicatas tratadas; categorias e lojas consistentes"
  acceptance-criteria:
    - blocker: true
      criteria: "Catálogo pronto para ingestão no motor de busca"
    - blocker: false
      criteria: "maintenanceLog permite rollback ou auditoria"

Performance:
  duration_expected: "5-20 minutos (depende do volume)"
  cost_estimated: "~800-2500 tokens"
  cacheable: false
  parallelizable: true
  skippable_when: "Nenhuma alteração pendente em fontes de dados"

Error Handling:
  strategy: partial
  partial: "Itens inválidos registrados no log; catálogo parcial entregue quando aplicável"
---

Mantém o catálogo: deduplicação, categorização, disponibilidade. Consome catálogo normalizado e visão; entrega catálogo pronto para o pipeline do paraguay-shopping-search.
