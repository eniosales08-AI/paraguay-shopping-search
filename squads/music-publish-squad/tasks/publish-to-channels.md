---
task: publishToChannels()
responsavel: "Publisher"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: adaptedContent
    tipo: object
    obrigatorio: true
    descricao: "Conteúdo adaptado por plataforma (origen: adaptForPlatforms())"
  - nome: videoAssets
    tipo: array<file>
    obrigatorio: false
    descricao: "Vídeos e thumbnails (origen: editVideoForTrack())"
  - nome: publishMetadata
    tipo: object
    obrigatorio: true
    descricao: "Títulos, descrições, hashtags (origen: planContentStrategy())"
  - nome: scheduleOptional
    tipo: string
    obrigatorio: false
    descricao: "Data/hora de agendamento ISO (origen: usuário ou config)"

Saida:
  - nome: publishReport
    tipo: object
    obrigatorio: true
    descricao: "Links publicados, status por canal, erros (destino: usuário/dashboard)"
  - nome: publishLog
    tipo: file
    obrigatorio: false
    descricao: "Log de uploads para auditoria (destino: documentação)"

Checklist:
  pre-conditions:
    - "[ ] adaptedContent e publishMetadata fornecidos"
    - "[ ] Credenciais/APIs configuradas para as plataformas alvo"
  post-conditions:
    - "[ ] publishReport contém status por canal (sucesso ou erro)"
    - "[ ] Links de vídeo preenchidos quando upload bem-sucedido"
  acceptance-criteria:
    - blocker: true
      criteria: "Upload executado para pelo menos um canal ou erro reportado"

Performance:
  duration_expected: "5-20 minutos"
  cost_estimated: "~500-2000 tokens + chamadas de API"
  cacheable: false
  parallelizable: false
  skippable_when: "Usuário opta por não publicar"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 3
    delay: "10s"
  fallback: "Reportar falha por canal e continuar com os demais"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o conteúdo seja publicado ou agendado nos canais"
  version: "1.0.0"
  dependencies:
    - adaptForPlatforms()
    - editVideoForTrack()
    - planContentStrategy()
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# publishToChannels()

## Pipeline Diagram

```
[adaptForPlatforms()] ──► adaptedContent ──┐
[editVideoForTrack()] ──► videoAssets ─────┼──► [publishToChannels()] ──► publishReport
[planContentStrategy()] ──► publishMetadata ─┘
```

## Descrição

Última task do pipeline. Publica ou agenda o conteúdo (vídeo, áudio, metadados) nos canais configurados (YouTube, TikTok, Instagram). Entrega relatório com links e status por canal.
