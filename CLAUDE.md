# CognittusAI — CLAUDE.md

## O que e este projeto

Plataforma CognittusAI — showcase do framework AIOS + site de buscas Paraguay Shopping + incubadora de squads IA.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS (design system Apple-inspired)
- i18n custom (ES-PY + PT-BR)
- Vercel (hosting)
- GitHub Actions (CI: lint + build)
- AIOS Framework v2.1+ (agentes, tasks, workflows)
- Cursor IDE (ambiente principal)

## Comandos

```bash
cd frontend
npm run dev      # Dev server
npm run build    # Build
npm run lint     # ESLint
```

## URLs

- https://cognittusai.com (dominio principal, Vercel)
- https://cognittusai.netlify.app (legacy, ainda funciona)

## Arquitetura

```
frontend/
  app/
    page.tsx                    # Redirect / → /es
    api/search/route.ts         # GET /api/search (q, page, category, store, sort)
    [locale]/
      page.tsx                  # Homepage (hero + busca + lang switcher)
      buscar/page.tsx           # Resultados de busca (BuscarClient)
  lib/
    i18n.ts                     # Traducoes ES-PY / PT-BR (36+ chaves)
    catalog-search.ts           # Busca in-memory sobre products.json
  data/catalog/
    products.json               # Catalogo seed (6 itens teste)
    catalog-schema.json         # JSON Schema dos produtos

squads/                         # Squads operacionais
  nirvana-squad-creator/        # Gerador de squads (COMPLETO)
  music-publish-squad/          # Criacao musical → YouTube (COMPLETO)
  paraguay-shopping-search/     # Busca de produtos PY (ATIVO)
  compras-paraguai-ops/         # Catalogo e pricing (ATIVO)
  video-factory/                # Video IA: Flux Pro + Kling 2.6 + Remotion (COMPLETO)
  kaizen/                       # Meta-squad melhoria continua (COMPLETO)

.aios-core/                     # Framework AIOS (constitution, tasks, workflows)
.cursor/rules/                  # Regras de agentes para Cursor IDE (20+)
.cursor/skills/                 # Skills reutilizaveis (40+)
```

## Squads registrados

| Squad | Agentes | Status |
|-------|---------|--------|
| Nirvana Squad Creator | 9 | COMPLETO |
| Music Publish | 8 | COMPLETO |
| Paraguay Shopping Search | 9 | ATIVO |
| Compras Paraguay Ops | 5 | ATIVO |
| Video Factory | 6 | COMPLETO |
| Kaizen | 10 | COMPLETO |
| DeFi (Hyperliquid) | 6 | COMPLETO (agentes no Claude Code) |

## Design system

- Apple-inspired: CSS variables para cores, sombras, border-radius, transitions
- Dark mode suportado via prefers-color-scheme
- Tokens: --apple-shadow-*, --apple-radius-*, --apple-duration, --apple-easing

## i18n

- 2 locales: `es` (espanhol Paraguai), `pt` (portugues Brasil)
- Rota: /es/... e /pt/...
- getTranslations(locale) retorna objeto com 36+ chaves

## API de busca

```
GET /api/search?q=celular&page=1&category=phones&store=&sort=relevance
Response: { results: Product[], total, page, limit, facets }
```
Atualmente busca in-memory sobre JSON seed. Futuro: Meilisearch ou PostgreSQL FTS.

## CI/CD

- GitHub Actions: `.github/workflows/frontend-ci.yml`
- Trigger: push/PR em frontend/
- Steps: lint + build

## Regras

- Este projeto roda no Cursor IDE (nao Claude Code diretamente)
- AIOS God Mode (@aios-god-mode) e o orquestrador no Cursor
- Squads DeFi tem agentes duplicados no Claude Code (`~/.claude/commands/AIOS/agents/`)
- Pasta real: `C:\Users\Crypto\congnittusai\` (typo no nome, manter assim)
