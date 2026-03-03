---
task: planContentStrategy()
responsavel: "Content Strategist"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: creativeBrief
    tipo: file
    obrigatorio: true
    descricao: "Brief criativo para contexto (origen: defineCreativeBrief())"
  - nome: contentRef
    tipo: object
    obrigatorio: false
    descricao: "Referência ao conteúdo final (vídeos, master) para contexto (origen: editVideoForTrack, masterAndExportStems)"

Saida:
  - nome: publishMetadata
    tipo: object
    obrigatorio: true
    descricao: "Títulos, descrições, hashtags, sugestões de SEO por plataforma (destino: publishToChannels())"
  - nome: strategyNotes
    tipo: file
    obrigatorio: false
    descricao: "Notas de estratégia e critérios (destino: documentação)"

Checklist:
  pre-conditions:
    - "[ ] creativeBrief existe para contexto"
    - "[ ] Pelo menos uma plataforma alvo definida"
  post-conditions:
    - "[ ] publishMetadata contém títulos e descrições por plataforma"
    - "[ ] Hashtags e sugestões de SEO quando aplicável"
  acceptance-criteria:
    - blocker: true
      criteria: "Títulos e descrições gerados para todas as plataformas configuradas"

Performance:
  duration_expected: "3-8 minutos"
  cost_estimated: "~1000-3000 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca — metadata é necessária para publicação"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Gerar metadata mínima (título genérico)"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso de títulos, descrições e hashtags otimizados para cada plataforma"
  version: "1.0.0"
  dependencies:
    - defineCreativeBrief()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# planContentStrategy()

## Pipeline Diagram

```
[defineCreativeBrief()] ──► creativeBrief
        │
        ▼
[planContentStrategy()] ──► publishMetadata ──► [publishToChannels()]
```

## Descrição

Planeja a estratégia de conteúdo: títulos, descrições, hashtags e SEO por plataforma. Saída consumível pelo Publisher no upload.
