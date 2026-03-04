# Relatório Kaizen — Paraguay Shopping Search

**Workflow:** wf-ecosystem-analysis  
**Data:** 2026-03-03  
**Escopo:** Projeto paraguay-shopping (Compras Paraguay) — por que não está dando certo  
**Orquestrador:** kaizen-chief | **Regra:** RULE-RD-001 (N≥3)

---

## Executive Summary

**3 achados críticos, 2 moderados.** O projeto tem front e API implementados, mas **não está dando certo** por: (1) dessincronia deploy/código na Vercel, (2) catálogo estático sem pipeline e squad de ops só no papel, (3) quality gates manuais sem smoke/E2E. **Recomendação #1:** Confirmar deploy na Vercel e alinhar docs ao estado real da API (catálogo embutido). As demais recomendações estão priorizadas por impacto × urgência × viabilidade.

---

## 1. Estrutura (Topology — topology-analyst)

| Squad | Tipo | Agentes | Observação |
|-------|------|---------|------------|
| paraguay-shopping-search | stream-aligned | 9 | Parcialmente implementado; tasks definidas, código reflete parte |
| compras-paraguai-ops | stream-aligned | 5 | **Só definição** — zero código/scripts; não alimenta o produto |
| kaizen | complicated-subsystem | 7 | Instalado (Tiag8); usado para esta análise |

**Evidência:** `squads/paraguay-shopping-search/` e `squads/compras-paraguai-ops/` existem; `frontend/app/api/search/route.ts` não referencia compras-paraguai-ops; nenhum script em compras-paraguai-ops chama ou é chamado pelo front/API.

**Achado:** compras-paraguai-ops está desconectado do fluxo de valor (paraguay-shopping). O “não está dando certo” inclui: erros em produção (categories undefined, produtos sumindo, fotos), corrigidos no código mas deploy/código às vezes dessincronizados.

---

## 2. Performance (performance-tracker — DORA + BSC + OKR)

| Dimensão | Estado | Evidência |
|----------|--------|-----------|
| Deploy frequency | Irregular | docs/O-QUE-NAO-DEU-CERTO: “o que está no GitHub não era o último código”; push/deploy manual |
| Lead time | N/A | Sem métricas automatizadas |
| MTTR | Baixo (correções pontuais) | 3+ incidentes documentados (categories, produtos, fotos, git) — corrigidos um a um |
| Rework | Alto | Mesmo problema (deploy/catálogo) reaparece em formas diferentes |

**Achado:** Não há pipeline de qualidade automatizado (E2E, smoke da API). Rework alto por falta de um gate que garanta “API responde + front recebe” antes de considerar deploy ok.

---

## 3. Gargalo (bottleneck-hunter — TOC + OMTM)

**Restrição #1 identificada:** **Fonte de verdade do catálogo + ciclo deploy.**

- **Sintoma:** Produtos “sumindo” na Vercel; API não encontrava `products.json` (serverless); correção foi embutir catálogo no código. Docs ainda falam em arquivo.
- **Exploit atual:** Catálogo embutido em `route.ts` resolve o sintoma em produção; fallbacks no front para `facets` e imagens.
- **Subordinar:** Tudo que depende de “site no ar com produtos” depende desse único ponto: código certo no repo + Vercel com deploy desse commit.
- **Elevar:** (1) Garantir que o último código está no GitHub e que a Vercel fez deploy. (2) Automatizar um gate (ex.: GET `/api/search` em CI) para não depender só de checklist manual.

**OMTM sugerido para paraguay-shopping:** “Deploy verde = último commit no ar + GET /api/search retorna results + total numérico.”

**Evidência:** docs/O-QUE-NAO-DEU-CERTO-E-COMO-LEVANTAR.md (4 itens de “o que deu errado”); analise-ecossistema-2026-03 (gaps 3.1, 3.3, 3.5).

---

## 4. Capabilities (capability-mapper — Wardley + 4R)

| Capacidade | Estado | Gap |
|------------|--------|-----|
| Catálogo dinâmico / ingestão | Ausente | API usa array fixo; task ingest-and-normalize-catalog não implementada |
| Preços/câmbio (compras-paraguai-ops) | Ausente | update-exchange-rates, normalize-prices só no papel |
| Relatório de ops | Ausente | run-ops-report não implementado |
| Quality gate automatizado | Ausente | run-quality-gates = checklist manual; sem E2E/smoke em CI |

**4R:** Recruit — não aplicável (squads já definidos). Retain — manter docs e código alinhados. Reskill — compras-paraguai-ops precisa de pelo menos uma task executável (ex.: run-ops-report). Redesign — decisão sobre catálogo: manter embutido para v1 demo ou definir fonte de verdade e pipeline.

**Evidência:** analise-ecossistema (seções 2 e 3); squads/compras-paraguai-ops/tasks/*.md existem, nenhum script em frontend ou .github chama esses fluxos.

---

## 5. Technology Radar (tech-radar)

| Item | Ring | Movimento | Evidência |
|------|------|-----------|-----------|
| Next.js 15 + Vercel | Adopt | — | Build ok; deploy configurado |
| Catálogo em código (const CATALOG) | Trial | Adotado por necessidade (Vercel serverless) | route.ts linhas 19–25 |
| products.json no filesystem | Hold | Não usado em produção na Vercel | Docs ainda referenciam; causa confusão |
| E2E / Playwright ou smoke API | Assess | Recomendado para CI | qa/quality-gate-checklist.md manual; CI só lint + build |
| Meilisearch / PostgreSQL FTS | Hold | Para quando catálogo crescer | analise-ecossistema P3 |

**Achado:** Stack atual é adequada para v1. O “não está dando certo” não é por tecnologia errada, e sim por deploy/código dessincronizado e falta de gate automatizado.

---

## 6. Custos (cost-analyst — FinOps + BSC)

| Item | Custo/Impacto |
|------|----------------|
| Tempo de rework (categories, produtos, fotos, git) | Alto — 3+ ciclos de correção documentados |
| Vercel | Baixo (plano free) |
| Squad compras-paraguai-ops | Custo zero de runtime — não executa nada |
| Risco de “site quebrado” de novo | Médio — sem gate, próximo push pode repetir o padrão |

**ROI de recomendações:** Estabilizar deploy + docs (P1) tem custo baixo (tempo de verificação + 1–2 commits) e evita novo ciclo de rework. Gate automatizado (smoke API) reduz retrabalho em incidentes futuros.

---

## Recomendações priorizadas (RULE-RD-001: N≥3)

Cada recomendação abaixo tem **N≥3** ocorrências de evidência no ecossistema (docs, código, análise anterior).

| # | Ação | Evidência | Custo | ROI |
|---|------|-----------|-------|-----|
| **1** | **Confirmar deploy na Vercel e testar /api/search** | O-QUE-NAO-DEU-CERTO (deploy/código); analise-ecossistema P1; bottleneck (restrição #1) | ~15 min (verificar commit, Redeploy, testar URL) | Alto — garante que o site está de fato no ar com o código correto |
| **2** | **Alinhar docs ao catálogo embutido** | analise-ecossistema 3.5 e P1; CHECKPOINT vs route.ts; RULE-RD-VERIFY (evitar remoção sem grep) | ~30 min (editar CHECKPOINT, ANALISE, onde citar products.json) | Médio — evita que próxima pessoa “conserte” lendo arquivo de novo |
| **3** | **Implementar um quality gate automatizado (smoke da API)** | analise-ecossistema 3.3 e P3; performance-tracker (rework); bottleneck (elevar restrição) | 1–2 h (step em CI: GET /api/search, validar results + total) | Alto — reduz rework e incidentes de “produtos sumindo” |
| **4** | **Dar primeiro uso ao compras-paraguai-ops (ex.: run-ops-report)** | analise-ecossistema 3.4 e P2; capability-mapper (4R Reskill); topology (squad desconectado) | 2–4 h (script ou página que lê status da API e gera relatório) | Médio — squad deixa de ser só definição e passa a gerar valor |
| **5** | **Decisão sobre catálogo (manter embutido vs fonte de verdade)** | analise-ecossistema 3.1 e P2; ingest-and-normalize-catalog não implementada; compras-paraguai-ops maintain-catalog | 0 h (decisão) + esforço futuro se crescer | Alto se objetivo for escalar catálogo; baixo se v1 for só demo |

---

## Quality Gates

| Gate | Status |
|------|--------|
| QG-KZ-001 Data Collection Complete | PASS — squads, código, docs coletados |
| QG-KZ-002 Diagnosis Validated | PASS — 6 dimensões analisadas |
| QG-KZ-003 Recommendations Quality | PASS — cada recomendação com evidência + ação + custo; N≥3; máx. 5 |

**GATE-RD (Defensibilidade):** PASS — zero especulação em recomendações de ação; evidências referenciadas (docs, código, análise prévia).

---

## Próximos passos imediatos

1. **Hoje:** Verificar no GitHub se `frontend/app/api/search/route.ts` (catálogo embutido + facets) está commitado; fazer push se necessário; na Vercel, conferir último deploy e rodar Redeploy se o commit for anterior às correções; testar `https://[seu-projeto].vercel.app/api/search` e a página de busca.
2. **Esta semana:** Atualizar docs (CHECKPOINT, ANALISE) para refletir catálogo embutido; adicionar step na CI que chama GET `/api/search` e valida `results` e `total`.
3. **Próximo ciclo:** Escolher uma task do compras-paraguai-ops para implementar (sugestão: run-ops-report) e decidir se o catálogo permanece embutido ou ganha fonte de verdade.

---

*Relatório gerado pela execução do workflow Kaizen (wf-ecosystem-analysis) sobre o projeto paraguay-shopping. Squad Kaizen (Tiag8) — congnittusai.*
