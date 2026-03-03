---
task: composeTrack()
responsavel: "Music Composer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: creativeBrief
    tipo: file
    obrigatorio: true
    descricao: "Brief criativo aprovado (origen: defineCreativeBrief())"
  - nome: briefMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados do brief (origen: defineCreativeBrief())"

Saida:
  - nome: compositionSpec
    tipo: file
    obrigatorio: true
    descricao: "Especificação de composição/arranjo (destino: produceAndMix())"
  - nome: compositionMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados da composição (destino: documentação)"

Checklist:
  pre-conditions:
    - "[ ] creativeBrief existe e é legível"
    - "[ ] Brief contém referências de estilo suficientes"
  post-conditions:
    - "[ ] compositionSpec criado com partes, instrumentos, BPM, clave, duração"
    - "[ ] Especificação utilizável pelo Audio Producer"
  acceptance-criteria:
    - blocker: true
      criteria: "Composição respeita referências de estilo e BPM do brief"

Performance:
  duration_expected: "5-15 minutos"
  cost_estimated: "~2000-5000 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Produzir especificação mínima"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o brief vire especificação de composição"
  version: "1.0.0"
  dependencies:
    - defineCreativeBrief()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# composeTrack()

## Pipeline Diagram

```
[defineCreativeBrief()] ──► creativeBrief
        │
        ▼
[composeTrack()] ──► compositionSpec ──► [produceAndMix()]
```

## Descrição

Segunda task do pipeline. Gera a estrutura da música (composição e arranjo) a partir do brief. Saída consumível pela task produceAndMix().
