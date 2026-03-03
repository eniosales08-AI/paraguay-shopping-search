# Source Tree — paraguay-shopping-search

Estrutura de diretórios do squad e sugestão de workspace para execução.

## Diretório do squad (raiz)

```
paraguay-shopping-search/
├── agents/           # Definições dos 9 agentes
├── tasks/            # Definições das 9 tasks (contratos Entrada/Saída)
├── workflows/        # Workflows YAML (data_to_search_to_api, etc.)
├── config/           # coding-standards, tech-stack, source-tree
├── analysis.md       # Análise de domínio (Fase 1)
├── component-registry.md
├── skills-free-phase1.md
├── IDEATION.md
├── squad.yaml        # Manifest do squad
└── README.md         # (opcional)
```

## Workspace de execução (sugerido)

Para rodar o pipeline em um projeto, recomenda-se:

```
workspace/
├── docs/
│   └── vision/       # productVision (output defineProductVision)
├── data/
│   ├── catalog/      # Schema e dados normalizados (output ingestAndNormalizeCatalog)
│   └── search/       # Índice e contrato (output buildSearchEngine)
├── api/              # Código e spec da API (output buildBackendApi)
├── design/           # Design system e assets (output designUiSystem)
├── seo/              # SEO spec e checklist (output planSeoLocalization)
├── frontend/         # Código Next.js/React (output implementFrontend)
├── deploy/           # Config CI/CD e infra (output setupDeployAndMonitor)
└── qa/               # Relatórios e gate status (output runQualityGates)
```

Ou um único diretório `output/` com subpastas por fase. O squad não impõe caminhos absolutos; as tasks referenciam entradas/saídas por nome de artefato ou convenção do projeto.
