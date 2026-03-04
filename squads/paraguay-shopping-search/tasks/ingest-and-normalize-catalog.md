---
task: ingestAndNormalizeCatalog()
responsavel: "Data Engineer"
responsavel_type: Agente
atomic_layer: Organism

Entrada:
  - nome: productVision
    tipo: file
    obrigatorio: true
    descricao: "Documento de visão e compliance (origen: defineProductVision())"
  - nome: visionMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados da visão (origen: defineProductVision())"

Saida:
  - nome: catalogSchema
    tipo: file
    obrigatorio: true
    descricao: "Schema do catálogo unificado (destino: buildSearchEngine(), buildBackendApi())"
  - nome: catalogDataRef
    tipo: string
    obrigatorio: true
    descricao: "Referência aos dados normalizados (path ou URI) — destino: buildSearchEngine()"
  - nome: catalogMetadata
    tipo: object
    obrigatorio: false
    descricao: "Metadados (moeda PYG, locale es-PY, fontes)"

Checklist:
  pre-conditions:
    - "[ ] productVision existe e é legível"
    - "[ ] Visão define fontes permitidas e regras de compliance"
  post-conditions:
    - "[ ] catalogSchema criado com campos: produto, preço, loja, URL, imagem, PYG, es-PY"
    - "[ ] Dados normalizados disponíveis para indexação"
  acceptance-criteria:
    - blocker: true
      criteria: "Schema unificado e compatível com busca e API"

Performance:
  duration_expected: "variável (depende de fontes)"
  cost_estimated: "~2000-8000 tokens"
  cacheable: true
  parallelizable: false
  skippable_when: "Nunca"

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "10s"
  fallback: "Documentar schema e spec de ingestão"
  notification: "orchestrator"

Metadata:
  story: "Como pipeline, preciso que o catálogo seja ingerido e normalizado a partir da visão"
  version: "1.0.0"
  dependencies:
    - defineProductVision()
  author: "paraguay-shopping-search"
  created_at: "2026-03-02T00:00:00Z"
  updated_at: "2026-03-02T00:00:00Z"
---

# ingestAndNormalizeCatalog()

## Pipeline Diagram

```
[defineProductVision()] ──► productVision
        │
        ▼
[ingestAndNormalizeCatalog()] ──► catalogSchema ──► [buildSearchEngine()]
        │                            catalogDataRef     [buildBackendApi()]
        └──► catalogMetadata
```

## Descrição

Segunda task do pipeline. Desenha ou executa o pipeline de ingestão a partir da visão; normaliza dados e produz schema e referência ao catálogo. Saída consumível por buildSearchEngine() e buildBackendApi().

---

## Implementação (Congnittusai)

- **Fonte de verdade:** `frontend/data/catalog/products.json` — schema em `data/catalog/catalog-schema.json`.
- **API:** `frontend/app/api/search/route.ts` importa o JSON no build (funciona na Vercel). Para atualizar o catálogo: editar o JSON e redeploy. Próximo passo (fontes externas): pipeline que gera/atualiza esse JSON (compras-paraguai-ops maintain-catalog).
