# IDEATION.md — Fase 2 (Agent Creator)

Squad: **music-publish-squad**. Geração de agentes a partir de analysis.md e component-registry.md.

---

## 1. Justificativa por agente

| Agent ID | Capacidade coberta | Archetype | Rationale |
|----------|--------------------|-----------|-----------|
| **creative-director** | Brief e direção criativa | Guardian | Define visão e brief; analisa antes de propor; evita ambiguidade para os demais. |
| **music-composer** | Composição e arranjo | Builder | Constrói a estrutura da música a partir do brief; output executável para Audio Producer. |
| **audio-producer** | Produção e mixagem | Builder | Constrói produção e mix até pré-master; tom técnico. |
| **mastering-engineer** | Masterização e stems | Builder | Constrói master e exports; tom técnico. |
| **platform-adapter** | Adaptação por plataforma | Flow_Master | Orquestra formatos por canal; garante conformidade. |
| **video-editor** | Edição de vídeo/visual | Builder | Constrói vídeos (lyric, visualizer, clipe) e arte. |
| **publisher** | Publicação e agendamento | Flow_Master | Orquestra upload e agendamento em múltiplos canais. |
| **content-strategist** | Estratégia e métricas | Guardian | Valida e otimiza títulos, descrições, SEO; analítico. |

---

## 2. Mapeamento agente → capacidades (analysis)

- creative-director → Capacidade 1 (Brief e direção criativa)
- music-composer → Capacidade 2 (Composição e arranjo)
- audio-producer → Capacidade 3 (Produção e mixagem)
- mastering-engineer → Capacidade 4 (Masterização e stems)
- platform-adapter → Capacidade 5 (Adaptação por plataforma)
- video-editor → Capacidade 6 (Edição de vídeo/visual)
- publisher → Capacidade 7 (Publicação e agendamento)
- content-strategist → Capacidade 8 (Estratégia e métricas)

Nenhuma capacidade ficou sem agente; nenhum agente redundante.

---

## 3. Alternativas consideradas

- **Unificar music-composer + audio-producer:** Descartado — composição é decisão criativa/estrutural; produção é execução técnica. Separar permite trocar ferramentas de produção sem redefinir o papel de compositor.
- **Unificar platform-adapter + publisher:** Descartado — adapter cuida de formato/specs; publisher cuida de API/upload. Responsabilidades distintas.
- **Content-strategist como Builder:** Escolhido Guardian — o foco é validar e otimizar (SEO, métricas), não apenas “criar” texto; tom analítico.

---

## 4. Colaboração e handoffs

- **Pipeline principal:** creative-director → music-composer → audio-producer → mastering-engineer.
- **Fan-out após master:** mastering-engineer entrega para platform-adapter, video-editor e content-strategist (em paralelo conceitual).
- **Convergência:** platform-adapter + video-editor + content-strategist alimentam publisher, que faz upload/agendamento.

Handoffs documentados em cada agente (Receives From / Hands Off To).

---

## 5. Skills referenciadas

Conforme analysis.md (seção 7) e skills-free-phase1.md (seção 8):

- **creative-director:** prompt-engineering-patterns, docx; Producer AI/Lyria.
- **music-composer:** ai-music-audio (SkillMD), music-cli, Producer AI, Sonic Forge, ACE-Step.
- **audio-producer:** ai-music-audio, inference.sh, Sonic Forge stems.
- **mastering-engineer:** docx/pdf specs; APIs de áudio.
- **platform-adapter:** web-design-guidelines, frontend-design; Video Production Skill (SkillMD).
- **video-editor:** ai-video-generation, ai-image-generation; Video Production, Video Content Analyzer (SkillMD).
- **publisher:** deployment-pipeline-design, github-actions-templates; YouTube API v3, Upload-Post, Warply.
- **content-strategist:** seo-audit, programmatic-seo, schema-markup; Social Producer Agent (Playbooks).

---

## 6. Notas para o Optimizer (Fase 5)

- Campo **skills_reference** nos agentes é extensão ao padrão AIOS; o Optimizer pode mover para `dependencies.tools` ou doc separado se preferir.
- Nomes e IDs seguem rigorosamente o component-registry.md; nenhum nome foi alterado.
- Tasks referenciadas (define-creative-brief.md, compose-track.md, etc.) serão geradas na Fase 3 (Task Creator); os agentes já apontam para os nomes canônicos.

---

## 7. Fase 5 (Optimizer) — Decisões

### AgentDropout
- **Antes:** 8 agentes.
- **Depois:** 8 agentes (nenhum removido).
- **Eliminados:** 0. Justificativa: cada agente tem command único e capacidade distinta; Strict Subset Rule não permitiu merge.

### Cross-References Corrigidas
- Nenhuma correção necessária. Verificação: agent IDs = filenames; task responsavel = agent.name existente; workflow agent_sequence = agent.id existentes; squad.yaml components e config paths consistentes.

### Naming Fixes
- Nenhuma alteração. Convenções (kebab-case, camelCase(), snake_case) já respeitadas em agents, tasks e workflows.

---

*Fim do IDEATION.md — Fases 2 e 5. Próximo passo: Fase 6 (Validator).*
