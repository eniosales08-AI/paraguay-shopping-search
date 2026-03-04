# Source Tree — compras-paraguai-ops

Estrutura do squad e integração com o workspace.

## Diretório do squad

```
compras-paraguai-ops/
├── agents/           # product-owner-ops, pricing-analyst, catalog-manager, content-editor, data-ops
├── tasks/            # update-exchange-rates, normalize-prices, maintain-catalog, sync-content, run-ops-report
├── workflows/        # pricing-and-catalog-ops, content-and-reporting
├── config/           # coding-standards, tech-stack, source-tree
├── squad.yaml
└── README.md
```

## Workspace de execução

Recomenda-se usar o mesmo workspace do paraguay-shopping-search, com pastas adicionais para operações:

```
workspace/
├── docs/vision/           # visão (paraguay-shopping-search)
├── data/
│   ├── catalog/           # catálogo normalizado (compartilhado)
│   ├── exchange/         # exchange-rates (output compras-paraguai-ops)
│   └── search/           # índice (paraguay-shopping-search)
├── content/               # conteúdo editorial (output sync-content)
├── reports/               # ops-report (output run-ops-report)
├── api/                   # (paraguay-shopping-search)
├── frontend/              # (paraguay-shopping-search)
└── ...
```

Artefatos de **compras-paraguai-ops** (exchange, catalog atualizado, content, reports) alimentam ou coexistem com o pipeline do **paraguay-shopping-search**.
