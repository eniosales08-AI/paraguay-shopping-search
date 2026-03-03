---
task: adaptForPlatforms()
responsavel: "Platform Adapter"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: masterAudio
    tipo: file
    obrigatorio: true
    descricao: "Master final (origen: masterAndExportStems())"
  - nome: stemsExported
    tipo: array<file>
    obrigatorio: false
    descricao: "Stems exportados (origen: masterAndExportStems())"
  - nome: platformVersions
    tipo: array<file>
    obrigatorio: false
    descricao: "Versões por duração (origen: masterAndExportStems())"
  - nome: targetPlatforms
    tipo: array<string>
    obrigatorio: true
    descricao: "Lista de plataformas: youtube, tiktok, instagram (origen: config ou usuário)"

Saida:
  - nome: adaptedContent
    tipo: object
    obrigatorio: true
    descricao: "Conteúdo adaptado por plataforma — paths e specs (destino: publishToChannels())"
  - nome: platformSpecsDoc
    tipo: file
    obrigatorio: false
    descricao: "Documentação de specs por canal (destino: documentação)"

Checklist:
  pre-conditions:
    - "[ ] masterAudio existe"
    - "[ ] targetPlatforms não vazio"
  post-conditions:
    - "[ ] adaptedContent contém entradas por plataforma (duração, aspect ratio, paths)"
    - "[ ] Specs conformes a YouTube, TikTok, Instagram conforme config"
  acceptance-criteria:
    - blocker: true
      criteria: "Pelo menos uma plataforma com conteúdo adaptado"

Performance:
  duration_expected: "2-5 minutos"
  cost_estimated: "~500-1500 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Adaptar apenas para plataformas com specs válidas"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o master seja adaptado às specs de cada plataforma"
  version: "1.0.0"
  dependencies:
    - masterAndExportStems()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# adaptForPlatforms()

## Pipeline Diagram

```
[masterAndExportStems()] ──► masterAudio, stemsExported, platformVersions
        │
        ▼
[adaptForPlatforms()] ──► adaptedContent ──► [publishToChannels()]
```

## Descrição

Adapta o conteúdo (master, stems, versões) às especificações de cada plataforma (duração, aspect ratio, capa). Saída consumível pelo Publisher.
