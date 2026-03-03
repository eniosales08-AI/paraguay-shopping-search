---
task: editVideoForTrack()
responsavel: "Video Editor"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: masterAudio
    tipo: file
    obrigatorio: true
    descricao: "Áudio master (origen: masterAndExportStems())"
  - nome: stemsExported
    tipo: array<file>
    obrigatorio: false
    descricao: "Stems (origen: masterAndExportStems())"
  - nome: videoSpecs
    tipo: object
    obrigatorio: false
    descricao: "Specs de vídeo por plataforma (origen: adaptForPlatforms ou config)"
  - nome: videoType
    tipo: string
    obrigatorio: false
    descricao: "lyric, visualizer ou clip (origen: brief ou usuário)"

Saida:
  - nome: videoAssets
    tipo: array<file>
    obrigatorio: true
    descricao: "Vídeos gerados (destino: publishToChannels())"
  - nome: thumbnailAssets
    tipo: array<file>
    obrigatorio: false
    descricao: "Thumbnails (destino: publishToChannels())"

Checklist:
  pre-conditions:
    - "[ ] masterAudio existe"
    - "[ ] Diretório de saída existe"
  post-conditions:
    - "[ ] videoAssets contém pelo menos um vídeo"
    - "[ ] Formatos conforme videoSpecs quando fornecidos"
  acceptance-criteria:
    - blocker: true
      criteria: "Pelo menos um arquivo de vídeo gerado"

Performance:
  duration_expected: "10-30 minutos"
  cost_estimated: "~1000-4000 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Brief não exige vídeo"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Gerar thumbnail ou placeholder"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o áudio vire vídeo e thumbnails"
  version: "1.0.0"
  dependencies:
    - masterAndExportStems()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# editVideoForTrack()

## Pipeline Diagram

```
[masterAndExportStems()] ──► masterAudio, stemsExported
        │
        ▼
[editVideoForTrack()] ──► videoAssets, thumbnailAssets ──► [publishToChannels()]
```

## Descrição

Gera vídeos (lyric, visualizer, clipe) e thumbnails a partir do áudio. Saída consumível pelo Publisher.
