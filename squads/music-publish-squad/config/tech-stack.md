# Tech Stack — music-publish-squad

Tecnologias e ferramentas referenciadas pelo squad para criação de música e publicação.

## Áudio e música

- **APIs / ferramentas free:** Google Producer AI (Lyria 3), Notevibes, Sonic Forge AI, music-cli (MusicGen, AudioLDM, Bark), ACE-Step v1.5, HeartMuLa, inference.sh (Diffrythm, Tencent Song).
- **Skills:** ai-music-audio (SkillMD.ai) para text-to-music, TTS, SFX.
- **Formatos:** WAV, MP3, M4A; stems e versões por duração quando necessário.

## Vídeo e visual

- **Skills (projeto):** ai-video-generation, ai-image-generation (Veo, FLUX, etc.).
- **Skills externas:** Video Production Skill, Video Content Analyzer (SkillMD.ai).
- **Formatos:** MP4, mov; thumbnails JPG/PNG; aspect ratios por plataforma (YouTube, TikTok, Instagram).

## Publicação

- **APIs:** YouTube Data API v3, Upload-Post (API unificada), Warply (API unificada).
- **Skills (projeto):** deployment-pipeline-design, github-actions-templates para automação.
- **Plataformas alvo:** YouTube, TikTok, Instagram.

## Estratégia e SEO

- **Skills (projeto):** seo-audit, programmatic-seo, schema-markup.
- **Ferramentas:** Social Producer Agent (Playbooks) para packs de conteúdo.

## Runtime

- Node.js (para scripts de automação quando aplicável).
- Python (para music-cli, ACE-Step quando usados localmente).
- Variáveis de ambiente: API keys em `.env` (YouTube, Upload-Post, Warply, etc.); nunca commitar credenciais.
