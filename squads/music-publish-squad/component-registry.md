# component-registry.md — Fonte canônica de nomes

Squad: **music-publish-squad** (criação de música + publicação multi-plataforma).  
Nomes a serem usados nas Fases 2, 3 e 4 do Nirvana.

---

## Agents (kebab-case)

| agent.id | agent.name (PascalCase) | Título |
|----------|-------------------------|--------|
| creative-director | Creative Director | Direção criativa e brief |
| music-composer | Music Composer | Composição e arranjo |
| audio-producer | Audio Producer | Produção e mixagem |
| mastering-engineer | Mastering Engineer | Masterização e stems |
| platform-adapter | Platform Adapter | Adaptação por plataforma |
| video-editor | Video Editor | Edição de vídeo/visual |
| publisher | Publisher | Publicação e agendamento |
| content-strategist | Content Strategist | Estratégia e métricas |

**Filenames:** `creative-director.md`, `music-composer.md`, … (kebab-case.md).

---

## Tasks (camelCase) — identificadores

| task | Responsável (agent.id) |
|------|-------------------------|
| defineCreativeBrief() | creative-director |
| composeTrack() | music-composer |
| produceAndMix() | audio-producer |
| masterAndExportStems() | mastering-engineer |
| adaptForPlatforms() | platform-adapter |
| editVideoForTrack() | video-editor |
| publishToChannels() | publisher |
| planContentStrategy() | content-strategist |

**Filenames:** `define-creative-brief.md`, `compose-track.md`, … (kebab-case.md).

---

## Workflows (snake_case)

| workflow_name | Descrição |
|---------------|-----------|
| music_creation_to_publish | Pipeline principal: criativo → composição → produção → master → adaptação/vídeo/estratégia → publicação |
| platform_adaptation_flow | Adaptação de formatos por plataforma (YouTube, TikTok, Instagram) |
| publish_and_schedule_flow | Publicação e agendamento em canais |

**Filenames:** `music-creation-to-publish.yaml`, `platform-adaptation-flow.yaml`, `publish-and-schedule-flow.yaml` (kebab-case.yaml).

---

## Mapeamento role → skills (sugestão Fase 2)

| agent.id | Skills do projeto a referenciar |
|----------|---------------------------------|
| creative-director | prompt-engineering-patterns, docx |
| platform-adapter | web-design-guidelines, frontend-design |
| video-editor | ai-video-generation, ai-image-generation |
| publisher | deployment-pipeline-design, github-actions-templates |
| content-strategist | seo-audit, programmatic-seo, schema-markup |

*(music-composer, audio-producer, mastering-engineer: sem skills específicas no projeto; podem ganhar referências quando houver skills de áudio/música.)*
