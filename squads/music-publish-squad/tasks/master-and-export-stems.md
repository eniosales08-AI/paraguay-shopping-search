---
task: masterAndExportStems()
responsavel: "Mastering Engineer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: mixAudio
    tipo: file
    obrigatorio: true
    descricao: "Mix pré-master (origen: produceAndMix())"
  - nome: stemsOptional
    tipo: array<file>
    obrigatorio: false
    descricao: "Stems opcionais (origen: produceAndMix())"
  - nome: exportSpecs
    tipo: object
    obrigatorio: false
    descricao: "Especificações de export por plataforma (origen: config ou usuário)"

Saida:
  - nome: masterAudio
    tipo: file
    obrigatorio: true
    descricao: "Master final (destino: adaptForPlatforms(), editVideoForTrack(), publishToChannels())"
  - nome: stemsExported
    tipo: array<file>
    obrigatorio: false
    descricao: "Stems exportados (destino: adaptForPlatforms(), editVideoForTrack())"
  - nome: platformVersions
    tipo: array<file>
    obrigatorio: false
    descricao: "Versões por duração/formato quando aplicável (destino: adaptForPlatforms())"
  - nome: exportSpecsDoc
    tipo: file
    obrigatorio: false
    descricao: "Documentação de specs de export (destino: documentação)"

Checklist:
  pre-conditions:
    - "[ ] mixAudio existe e é legível"
    - "[ ] Diretório de saída existe e é gravável"
  post-conditions:
    - "[ ] masterAudio gerado com formato e loudness conforme specs"
    - "[ ] Stems ou versões por plataforma quando exigido pelo brief"
  acceptance-criteria:
    - blocker: true
      criteria: "Arquivo master existe e é não vazio"
    - blocker: false
      criteria: "Specs de export documentadas (docx/pdf) quando necessário"

Performance:
  duration_expected: "5-15 minutos"
  cost_estimated: "~500-2000 tokens + processamento de áudio"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Exportar master com configuração mínima"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o mix vire master e stems/versões para as plataformas"
  version: "1.0.0"
  dependencies:
    - produceAndMix()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# masterAndExportStems()

## Pipeline Diagram

```
[produceAndMix()] ──► mixAudio
        │
        ▼
[masterAndExportStems()] ──► masterAudio ──┬──► [adaptForPlatforms()]
        │                                  ├──► [editVideoForTrack()]
        ├──► stemsExported ────────────────┤
        ├──► platformVersions ─────────────┴──► [publishToChannels()]
        └──► exportSpecsDoc (opcional)
```

## Descrição

Quarta task do pipeline. Masteriza o mix e exporta stems e/ou versões por plataforma. As saídas alimentam em paralelo Platform Adapter, Video Editor e (via metadados) Content Strategist e Publisher.

### Responsabilidades

1. Masterizar o mix e gerar master final.
2. Exportar stems e versões por duração/formato quando aplicável.
3. Documentar specs de export quando necessário.

### Critérios de Qualidade

- Master e stems conformes às especificações de formato.
- Saídas consumíveis pelas tasks downstream.
