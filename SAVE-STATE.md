# Checkpoint — Estado salvo para continuar sem perda

**Data:** 2 de março de 2025  
**Projeto:** Congnittusai (AIOS God Mode)  
**Squad:** music-publish-squad (criação de música + publicação YouTube, TikTok, Instagram)

---

## O que está pronto e onde está

### Squad music-publish-squad
- **Pasta:** `squads/music-publish-squad/`
- **Fases concluídas:** 1 (Analyzer), 2 (Agent Creator), 3 (Task Creator), 4 (Workflow Creator), 5 (Optimizer), 6 (Validator), 8 (Deploy)
- **Arquivos principais:**
  - `squad.yaml` — manifesto do squad (slashPrefix: mps)
  - `agents/*.md` — 8 agentes (creative-director, music-composer, audio-producer, mastering-engineer, platform-adapter, video-editor, content-strategist, publisher)
  - `tasks/*.md` — 8 tasks encadeadas
  - `workflows/*.yaml` — music_creation_to_publish, platform_adaptation_flow, publish_and_schedule_flow
  - `config/` — coding-standards.md, tech-stack.md, source-tree.md
  - `README.md`, `CONFIDENTIAL.md`, `validation-report.md`, `optimization-report.md`

### Regras Cursor (uso no editor)
- **AIOS God Mode (orquestrar/criar):** `.cursor/rules/aios-god-mode.md` — ativar com **@aios-god-mode** ou **@god-mode**
- **Nirvana (criar squads):** `.cursor/rules/nirvana.md` — ativar com **@nirvana**
- **Music Publish Squad (usar o squad):** `.cursor/rules/music-publish.md` — ativar com **@music-publish** ou **@mps**

### Configuração
- **Env:** `.env` (preencher `ANTHROPIC_API_KEY` ou outras chaves se for usar modelos externos)
- **Confidencialidade:** squad interno; não publicar em squads.sh (ver `squads/music-publish-squad/CONFIDENTIAL.md`)

---

## Atalho na Área de Trabalho (voltar rápido)

Foi criado o script **`create-desktop-shortcut.ps1`** na raiz do projeto. Para criar o atalho no Desktop (uma vez):

1. Abra o PowerShell.
2. Execute:
   ```powershell
   cd C:\Users\Crypto\congnittusai
   .\create-desktop-shortcut.ps1
   ```
   *(Se pedir permissão de execução: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` e depois rode o script de novo.)*
3. Na Área de Trabalho aparecerá **"Congnittusai - Cursor"** — ao clicar, o Cursor abre direto neste projeto.

---

## Próximos passos (quando voltar)

1. **Versionar (recomendado):** rodar os comandos da seção abaixo para criar o primeiro commit e não perder nada.
2. **Testar o squad:** no Cursor, usar **@music-publish** e pedir para definir um brief (ex.: "brief para um single de verão").
3. **Opcional:** Fase 7 (README multilíngue) ou refinamentos nos agentes/skills.

---

## Comandos para salvar tudo no Git (rodar no PowerShell na pasta do projeto)

Abra o PowerShell, vá até a pasta do projeto e execute:

```powershell
cd C:\Users\Crypto\congnittusai

# Se ainda não for um repositório Git:
git init

# Adicionar tudo (o .gitignore já exclui .env, node_modules, etc.)
git add .

# Primeiro commit — checkpoint music-publish-squad + deploy
git commit -m "Checkpoint: music-publish-squad completo + deploy (regra @music-publish)"
```

Depois disso, para novos checkpoints:

```powershell
git add .
git commit -m "Descrição do que mudou"
```

---

*Arquivo gerado para continuar o trabalho sem perda. Pode apagar ou renomear depois de versionar.*
