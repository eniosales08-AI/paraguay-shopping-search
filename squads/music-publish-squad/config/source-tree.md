# Source Tree — music-publish-squad

Estrutura de diretórios esperada para execução do squad e armazenamento de artefatos.

## Diretório do squad (raiz)

```
music-publish-squad/
├── agents/           # Definições dos 8 agentes
├── tasks/            # Definições das 8 tasks (contratos Entrada/Saída)
├── workflows/        # Workflows YAML (music_creation_to_publish, etc.)
├── config/           # coding-standards, tech-stack, source-tree
├── analysis.md       # Análise de domínio (Fase 1)
├── component-registry.md
├── skills-free-phase1.md
├── IDEATION.md
├── squad.yaml        # Manifest do squad
└── README.md
```

## Workspace de execução (sugerido)

Para rodar o pipeline em um projeto, recomenda-se um workspace com:

```
workspace/
├── brief/            # Briefs criativos (output defineCreativeBrief)
├── composition/      # Specs de composição (output composeTrack)
├── audio/            # Mix, master, stems (output produceAndMix, masterAndExportStems)
├── video/            # Vídeos e thumbnails (output editVideoForTrack)
├── adapted/          # Conteúdo adaptado por plataforma (output adaptForPlatforms)
├── metadata/         # Metadados de publicação (output planContentStrategy)
└── publish-report/   # Relatório de publicação (output publishToChannels)
```

Ou um único diretório `output/` com subpastas por fase. O squad não impõe caminhos absolutos; as tasks referenciam entradas/saídas por nome de artefato ou convenção do projeto.
