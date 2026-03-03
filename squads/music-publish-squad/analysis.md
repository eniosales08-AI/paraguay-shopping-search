# analysis.md — Squad: Criação de Música + Publicação Multi-plataforma

Gerado na Fase 1 (Analyzer) do Nirvana Squad Creator.  
Objetivo do usuário: *"Melhor squad do universo para criações de música e posterior publicações no YouTube, TikTok, Instagram..."*

---

## 1. Domínio identificado

**Domínio:** Criação de música e publicação multi-plataforma.  
**Subdomínios:** Produção musical, edição de áudio/vídeo, adaptação por plataforma, distribuição (YouTube, TikTok, Instagram), estratégia de conteúdo/SEO.

---

## 2. Capacidades necessárias

| # | Capacidade | Descrição |
|---|------------|-----------|
| 1 | Brief e direção criativa | Definir ideia, estilo, referências e direção geral |
| 2 | Composição e arranjo | Estrutura da música (partes, instrumentos, BPM, clave) |
| 3 | Produção e mixagem | Produção de áudio, mix e pré-master |
| 4 | Masterização e stems | Master final e export de stems/versões por plataforma |
| 5 | Adaptação por plataforma | Regras e formatos por canal (duração, aspect ratio, capa) |
| 6 | Edição de vídeo/visual | Montagem de vídeo (lyric, visualizer, clipe) a partir do áudio |
| 7 | Publicação e agendamento | Upload, metadados, thumbnails, agendamento em cada plataforma |
| 8 | Estratégia e métricas | Títulos, descrições, hashtags, análise de performance |

---

## 3. Roles propostos

| Agent ID | Nome legível | Título | Arquétipo |
|----------|--------------|--------|-----------|
| creative-director | Creative Director | Direção criativa e brief | Guardian |
| music-composer | Music Composer | Composição e arranjo | Builder |
| audio-producer | Audio Producer | Produção e mixagem | Builder |
| mastering-engineer | Mastering Engineer | Masterização e stems | Builder |
| platform-adapter | Platform Adapter | Adaptação por plataforma | Flow_Master |
| video-editor | Video Editor | Edição de vídeo/visual | Builder |
| publisher | Publisher | Publicação e agendamento | Flow_Master |
| content-strategist | Content Strategist | Estratégia e métricas | Guardian |

---

## 4. Dependency graph

```
[creative-director] ──► brief + direção
        │
        ▼
[music-composer] ──► composição + arranjo
        │
        ▼
[audio-producer] ──► produção + mix
        │
        ▼
[mastering-engineer] ──► master + stems
        │
        ├──────────────────┬──────────────────┐
        ▼                  ▼                  ▼
[platform-adapter]   [video-editor]    [content-strategist]
        │                  │                  │
        └────────┬─────────┴────────┬─────────┘
                 ▼                   ▼
            [publisher] ──► upload, agendamento, métricas
```

---

## 5. Workflow patterns sugeridos

| Pattern | Uso |
|--------|-----|
| Sequential (pipeline) | Criativo → Composição → Produção → Masterização |
| Fan-out | Após master: platform-adapter, video-editor, content-strategist em paralelo |
| Converge | Saídas convergem para publisher |

**Workflow principal:** `music_creation_to_publish`

---

## 6. Contexto do projeto (skills disponíveis)

Skills encontradas em `.cursor/skills/` do projeto **congnittusai** (24 skills).

---

## 7. Skills recomendadas por role (Fase 1)

Mapeamento de **skills do projeto** que podem auxiliar cada agente. Uso opcional na Fase 2 ao definir os agentes.

| Role (Agent ID) | Skills do projeto recomendadas | Justificativa |
|-----------------|--------------------------------|----------------|
| **creative-director** | `prompt-engineering-patterns`, `docx` | Briefs e direção em texto; prompts para criatividade assistida |
| **music-composer** | *(nenhuma direta no projeto)* | Possível skill futura: referências de teoria/arrranjo ou APIs de áudio |
| **audio-producer** | *(nenhuma direta no projeto)* | Possível skill futura: fluxos de áudio, DAW, stems |
| **mastering-engineer** | *(nenhuma direta no projeto)* | Idem produção; export/formatos podem usar `docx`/`pdf` para specs |
| **platform-adapter** | `web-design-guidelines`, `frontend-design` | Aspect ratios, formatos visuais, boas práticas por plataforma |
| **video-editor** | **`ai-video-generation`**, **`ai-image-generation`** | Vídeo e imagens para thumbnails, lyric videos, clipes; geração por IA |
| **publisher** | `deployment-pipeline-design`, `github-actions-templates` | Automação de upload/agendamento; integrações (YouTube API, etc.) |
| **content-strategist** | **`seo-audit`**, **`programmatic-seo`**, **`schema-markup`** | Títulos, descrições, SEO para YouTube e busca; dados estruturados |

### Skills de suporte transversal

- **`ui-ux-pro-max`**, **`clean-code`**: Qualidade de briefs, docs e scripts de automação.
- **`docx`**, **`pptx`**, **`pdf`**: Briefs, relatórios de métricas, apresentações de estratégia.

### Skills externas gratuitas (pesquisa concluída — ver seção 8 abaixo)

---

## 8. Skills externas gratuitas (free)

**Detalhes em:** [skills-free-phase1.md](skills-free-phase1.md) — música/áudio, vídeo, publicação, estratégia, repositórios e mapeamento por role.

Resumo: Google Producer AI (Lyria 3), Notevibes, Sonic Forge, music-cli, ACE-Step, HeartMuLa, inference.sh, Skill ai-music-audio (SkillMD); Video Production / Video Content Analyzer (SkillMD); YouTube API v3, Upload-Post, Warply; Social Producer Agent (Playbooks); SkillMD.ai, agentskillsrepo.com, Cursor Marketplace.

- Fase 1 inclui: (7) skills do projeto por role; (8) skills e APIs gratuitas (ver arquivo acima).
- Agent Creator (Fase 2) deve referenciar as seções 7 e 8 e o arquivo skills-free-phase1.md. Removido texto antigo: Na Fase 1 também podemos **procurar** skills externas (marketplace, npm, repositórios) e anotar “skills a instalar depois” para o squad de música/publicação. Se quiser, na próxima iteração da Fase 1 podemos adicionar uma subseção “Skills externas sugeridas (a procurar)”.

---

*Fim do analysis.md — Fase 1 (Analyzer) completa. Próximo passo: Fase 2 (Agent Creator).*
