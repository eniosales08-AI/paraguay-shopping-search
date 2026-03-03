---
task: defineCreativeBrief()
responsavel: "Creative Director"
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
  - nome: userObjective
    tipo: string
    obrigatorio: true
    descricao: "Objetivo ou tema do projeto em linguagem natural (origen: usuário ou orquestrador)"
  - nome: contextRef
    tipo: string
    obrigatorio: false
    descricao: "Referência a contexto adicional (origen: input do usuário)"

Saida:
  - nome: creativeBrief
    tipo: file
    obrigatorio: true
    descricao: "Brief criativo com ideia, estilo, referências, mood, BPM (destino: composeTrack())"
  - nome: briefMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados do brief para rastreabilidade (destino: documentação do pipeline)"

Checklist:
  pre-conditions:
    - "[ ] userObjective fornecido e não vazio"
    - "[ ] Diretório de saída para brief existe e é gravável"
  post-conditions:
    - "[ ] creativeBrief criado (docx ou markdown) com seções: ideia, estilo, referências, mood, BPM sugerido"
    - "[ ] Brief claro o suficiente para Music Composer executar sem ambiguidade"
  acceptance-criteria:
    - blocker: true
      criteria: "Brief contém referências de estilo (gênero, mood e/ou BPM)"
    - blocker: false
      criteria: "Brief documentado em formato reutilizável (docx ou markdown)"

Performance:
  duration_expected: "2-5 minutos"
  cost_estimated: "~500-1500 tokens"
  cacheable: false
  parallelizable: false
  skippable_when: "Nunca — é a primeira task do pipeline"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "5s"
  fallback: "Solicitar esclarecimento ao usuário"
  notification: "orchestrator"

Metadata:
  story: "Como usuário, preciso que meu objetivo vire um brief criativo executável"
  version: "1.0.0"
  dependencies: []
  author: "music-publish-squad"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# defineCreativeBrief()

## Pipeline Diagram

```
usuário/orquestrador (userObjective)
        │
        ▼
[defineCreativeBrief()] ──► creativeBrief ──► [composeTrack()]
        │
        └──► briefMetadata (opcional)
```

## Descrição

Primeira task do pipeline. Transforma o objetivo do usuário em um brief criativo com ideia, estilo, referências, mood e BPM sugerido. A saída alimenta o Music Composer.

### Responsabilidades

1. Interpretar o objetivo em linguagem natural.
2. Produzir documento de brief (docx ou markdown) com seções obrigatórias.
3. Garantir que referências de estilo estejam presentes para as tasks seguintes.

### Critérios de Qualidade

- Brief não ambíguo para composição.
- Referências de estilo explícitas (gênero, mood, BPM quando aplicável).
