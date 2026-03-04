---
task: syncContent()
responsavel: "Content Editor"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: contentSpec
    tipo: file
    obrigatorio: false
    descricao: "Especificação de conteúdo (páginas, meta, schema) — pode vir do SEO do paraguay-shopping-search"
  - nome: locale
    tipo: string
    obrigatorio: false
    descricao: "Locale alvo (default es-PY)"

Saida:
  - nome: contentArtifacts
    tipo: file
    obrigatorio: true
    descricao: "Arquivos de conteúdo (markdown, JSON, ou código) para o site"
  - nome: syncReport
    tipo: object
    obrigatorio: false
    descricao: "Lista de arquivos criados/atualizados"

Checklist:
  pre-conditions:
    - "[ ] contentSpec ou convenção de conteúdo definida"
    - "[ ] Diretório de destino (site/repo) conhecido e gravável"
  post-conditions:
    - "[ ] Conteúdo em es-PY; meta e schema alinhados à spec SEO"
    - "[ ] Links e imagens válidos quando aplicável"
  acceptance-criteria:
    - blocker: true
      criteria: "Artefatos prontos para deploy no front-end"
    - blocker: false
      criteria: "syncReport listando alterações"

Performance:
  duration_expected: "3-8 minutos"
  cost_estimated: "~500-1500 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nenhuma alteração na spec de conteúdo"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 1
  fallback: "Gerar apenas syncReport com erros; não sobrescrever conteúdo válido"
---

Sincroniza conteúdo editorial (páginas, meta, schema markup) com o repositório/site. Trabalha em conjunto com o SEO do paraguay-shopping-search.
