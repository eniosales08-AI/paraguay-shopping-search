# Backlog — Projeto Paraguay (Compras Paraguay)

**Objetivo:** Concluir estabilização e próximos passos com o mínimo de interferência, usando os squads **paraguay-shopping-search** (@pss) e **compras-paraguai-ops** (@cpo).  
**Fonte:** Relatório Kaizen `data/reports/kaizen-report-paraguay-shopping-2026-03-03.md`.

---

## Como usar

1. **Avançar sozinho:** Cole o **Prompt único** (seção abaixo) no chat e deixe o assistente trabalhar nas tarefas em aberto.
2. **Uma task por vez:** Diga: *"Próxima task do backlog Paraguay"* — o assistente usa este doc e as regras @paraguay-shopping / @compras-paraguai-ops.
3. **Marcar feito:** Quando uma task for concluída, altere `[ ]` para `[x]` nesta página.
4. **Ao acordar (após rodadas noturnas):** Siga os passos em **`docs/AO-ACORDAR.md`** (push, deploy, testar).

---

## Backlog (prioridade Kaizen)

### P1 — Estabilizar

| ID | Task | Pronto quando | Responsável squad |
|----|------|----------------|-------------------|
| P1.1 | [x] Confirmar deploy na Vercel e testar /api/search | (Manual) Último commit com catálogo embutido está no GitHub; Vercel fez deploy; GET `.../api/search` retorna JSON com `results`, `total`, `facets`. Doc `docs/O-QUE-NAO-DEU-CERTO-E-COMO-LEVANTAR.md` tem passo a passo. | DevOps / você |
| P1.2 | [x] Alinhar docs ao catálogo embutido | Docs que citam "catálogo em products.json" ou "ler arquivo" passam a dizer que a API usa catálogo **embutido** em `frontend/app/api/search/route.ts`; `products.json` é referência/backup, não lido em produção. Arquivos: `docs/CHECKPOINT-CONTINUAR.md`, `docs/ANALISE-PROJETO-COMPRAS-PARAGUAI.md`, `data/reports/analise-ecossistema-2026-03.md` (se aplicável). | Qualquer / Frontend |
| P1.3 | [x] Implementar quality gate automatizado (smoke da API) | CI (`.github/workflows/`) tem um step que, após build do frontend, chama GET `/api/search` (ou URL da Vercel) e valida que a resposta tem `results` (array) e `total` (número). Ou: smoke E2E mínimo (ex. Playwright) que abre a página de busca e verifica que não dá erro. | QA Engineer + DevOps |

### P2 — Dados e operações

| ID | Task | Pronto quando | Responsável squad |
|----|------|----------------|-------------------|
| P2.1 | [x] Dar primeiro uso ao compras-paraguai-ops (run-ops-report) | Existe um script ou página (ex. `/api/ops-report` ou script em `scripts/`) que lê o status da API de busca (ex. GET /api/search) e gera um relatório (markdown ou JSON) com: total de produtos, facets, timestamp. Task `squads/compras-paraguai-ops/tasks/run-ops-report.md` referenciada ou implementada. | compras-paraguai-ops (data-ops) |
| P2.2 | [x] Decisão sobre catálogo | Documentado em `docs/` ou no product-vision: para v1 o catálogo permanece **embutido** (demo) OU define-se fonte de verdade (JSON no repo / DB / ingestão) e próximo passo de implementação. | Product Owner |

### P3 — Escala (quando houver mais dados)

| ID | Task | Pronto quando | Responsável squad |
|----|------|----------------|-------------------|
| P3.1 | [x] Implementar ingestão de catálogo (task ingest-and-normalize-catalog) | API ou build-step lê de fonte externa (arquivo, DB, API) e alimenta o catálogo; não depende só de array fixo no código. | Data Engineer |
| P3.2 | [ ] Implementar índice de busca (task build-search-engine) | Busca usa índice (ex. Meilisearch, PostgreSQL FTS) em vez de filter em array em memória. | Search Engineer |

---

## Prompt único (colar no chat)

Use o bloco abaixo para acionar os agentes e avançar várias tasks com uma única mensagem. O assistente deve usar as regras **@paraguay-shopping** e **@compras-paraguai-ops** e o relatório Kaizen.

```
Avança o projeto Paraguay: segue o backlog em docs/backlog-paraguay.md. Faz em sequência as tasks P1.2 e P1.3 (alinhar docs ao catálogo embutido e implementar smoke da API na CI). Usa os squads paraguay-shopping-search e compras-paraguai-ops quando precisar (devops, qa-engineer, frontend). Ao terminar cada task, indica o que foi feito e sugere marcar [x] no backlog. Se algo exigir decisão minha (ex. URL da Vercel para o smoke), para e pergunta.
```

**Variações úteis:**

- Só uma task: *"Próxima task do backlog Paraguay em docs/backlog-paraguay.md."*
- Só docs: *"Faz a task P1.2 do backlog Paraguay (alinhar docs ao catálogo embutido)."*
- Só CI: *"Faz a task P1.3 do backlog Paraguay (smoke da API na CI)."*
- Ops: *"Faz a task P2.1 do backlog Paraguay (run-ops-report do compras-paraguai-ops)."*

---

## Referências

- **Relatório Kaizen:** `data/reports/kaizen-report-paraguay-shopping-2026-03-03.md`
- **O que não deu certo / como levantar:** `docs/O-QUE-NAO-DEU-CERTO-E-COMO-LEVANTAR.md`
- **Regras Cursor:** `@paraguay-shopping` (pss), `@compras-paraguai-ops` (cpo), `@kaizen-referencia`
