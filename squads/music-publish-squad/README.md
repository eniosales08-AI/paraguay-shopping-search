# music-publish-squad

**Confidencial — Congnittusai.** Este squad tem valor comercial. Uso interno apenas. Não publicar em marketplaces (ex.: squads.sh) nem compartilhar o conteúdo fora da empresa.

---

Squad AIOS para **artistas e músicos** — criação de música e publicação multi-plataforma (YouTube, TikTok, Instagram). Desenvolvido pela **Congnittusai**, empresa de tecnologia que constrói soluções para artistas e músicos.

Pipeline: brief → composição → produção → masterização → adaptação por plataforma + vídeo + estratégia → publicação.

## Visão geral

O squad cobre o fluxo completo desde o objetivo criativo até a publicação (ou agendamento) nos canais, com 8 agentes e 8 tasks encadeadas.

## Agentes

| Agente | ID | Papel |
|--------|-----|--------|
| Creative Director | creative-director | Direção criativa e brief |
| Music Composer | music-composer | Composição e arranjo |
| Audio Producer | audio-producer | Produção e mixagem |
| Mastering Engineer | mastering-engineer | Masterização e stems |
| Platform Adapter | platform-adapter | Adaptação por plataforma (YouTube, TikTok, Instagram) |
| Video Editor | video-editor | Edição de vídeo/visual (lyric, visualizer, clipe) |
| Publisher | publisher | Publicação e agendamento |
| Content Strategist | content-strategist | Estratégia e métricas (títulos, descrições, hashtags, SEO) |

## Tasks

- `defineCreativeBrief()` — Brief criativo a partir do objetivo do usuário
- `composeTrack()` — Composição e arranjo a partir do brief
- `produceAndMix()` — Produção e mixagem
- `masterAndExportStems()` — Masterização e export de stems/versões
- `adaptForPlatforms()` — Adaptação às specs de cada plataforma
- `editVideoForTrack()` — Vídeos e thumbnails
- `planContentStrategy()` — Metadados para publicação
- `publishToChannels()` — Upload e agendamento nos canais

## Workflows

- **music_creation_to_publish** — Pipeline principal (brief → … → publicação)
- **platform_adaptation_flow** — Adaptação de formatos e publicação
- **publish_and_schedule_flow** — Publicação e agendamento (converge adapt + vídeo + estratégia → publisher)

## Uso

- **Slash prefix:** `mps` (ex.: `/SQUADS:mps:creative-director` se habilitado no projeto).
- **Comandos:** cada agente expõe comandos com prefixo `*` (ex.: `*define-creative-brief`, `*compose-track`).
- **Skills:** ver `analysis.md` (seção 7), `skills-free-phase1.md` e `agents/*.md` (campo `skills_reference`).

## Configuração

- **config/coding-standards.md** — Convenções de naming e documentos
- **config/tech-stack.md** — Tecnologias e APIs (áudio, vídeo, publicação)
- **config/source-tree.md** — Estrutura de diretórios do squad e workspace sugerido

## Dependências

- AIOS minVersion: 2.1.0
- API keys e ferramentas: ver `config/tech-stack.md` e `.env` do projeto (YouTube, Upload-Post, Warply, etc.).

## Sobre a Congnittusai

Congnittusai é uma empresa de tecnologia que desenvolve projetos e soluções para artistas, músicos e criadores de conteúdo. O music-publish-squad é um dos squads AIOS disponíveis para automatizar o fluxo de criação e publicação em múltiplas plataformas.

## Licença

MIT.
