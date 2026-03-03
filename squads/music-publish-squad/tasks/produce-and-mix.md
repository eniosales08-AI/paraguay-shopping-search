---
task: produceAndMix()
responsavel: "Audio Producer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: compositionSpec
    tipo: file
    obrigatorio: true
    descricao: "Especificação de composição/arranjo (origen: composeTrack())"
  - nome: compositionMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados da composição (origen: composeTrack())"

Saida:
  - nome: mixAudio
    tipo: file
    obrigatorio: true
    descricao: "Mix pré-master em formato acordado (destino: masterAndExportStems())"
  - nome: stemsOptional
    tipo: array<file>
    obrigatorio: false
    descricao: "Stems opcionais para masterização (destino: masterAndExportStems())"
  - nome: productionNotes
    tipo: file
    obrigatorio: false
    descricao: "Notas de produção e chain de efeitos (destino: documentação)"

Checklist:
  pre-conditions:
    - "[ ] compositionSpec existe e é legível"
    - "[ ] Diretório de saída para áudio existe e é gravável"
  post-conditions:
    - "[ ] mixAudio gerado (pré-master), formato e sample rate definidos"
    - "[ ] Mix balanceado e pronto para masterização"
  acceptance-criteria:
    - blocker: true
      criteria: "Arquivo de mix existe e é não vazio"
    - blocker: false
      criteria: "Stems ou notas de produção documentados quando aplicável"

Performance:
  duration_expected: "10-30 minutos (depende de ferramentas/APIs)"
  cost_estimated: "~1000-3000 tokens + APIs de áudio"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Usar mix anterior ou especificação mínima"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que a composição vire mix pré-master"
  version: "1.0.0"
  dependencies:
    - composeTrack()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# produceAndMix()

## Pipeline Diagram

```
[composeTrack()] ──► compositionSpec
        │
        ▼
[produceAndMix()] ──► mixAudio ──► [masterAndExportStems()]
        │                 │
        ├──► stemsOptional (opcional)
        └──► productionNotes (opcional)
```

## Descrição

Terceira task do pipeline. Produz e mixa o áudio a partir da especificação de composição. Entrega mix pré-master e opcionalmente stems para a masterização.

### Responsabilidades

1. Consumir compositionSpec e produzir áudio (mix).
2. Garantir balanceamento e preparação para masterização.
3. Documentar decisões de produção quando aplicável.

### Critérios de Qualidade

- Mix utilizável pelo Mastering Engineer.
- Formato e sample rate adequados para a próxima etapa.
