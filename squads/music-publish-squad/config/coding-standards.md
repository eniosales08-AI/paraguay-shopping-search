# Coding Standards — music-publish-squad

Convenções de código e estilo aplicáveis aos artefatos e scripts do squad (briefs, specs, metadados, automação).

## Naming

- **Arquivos de brief:** `brief-{projeto ou data}.md` ou `.docx` (kebab-case).
- **Arquivos de áudio:** extensões padrão `.wav`, `.mp3`, `.m4a`; nomes em kebab-case, ex.: `master-v1.wav`, `stems-drums.wav`.
- **Arquivos de vídeo:** kebab-case, ex.: `lyric-video-1080p.mp4`, `thumbnail-youtube.jpg`.
- **Metadados e configs:** camelCase para chaves JSON/YAML em scripts; kebab-case para nomes de arquivo.

## Estrutura de documentos

- **Brief:** seções obrigatórias — ideia, estilo, referências, mood, BPM (sugerido).
- **Composition spec:** partes, instrumentos, BPM, clave, duração por seção.
- **Export specs:** sample rate, bit depth, formato, loudness (quando aplicável) documentados em docx ou markdown.

## Qualidade

- Briefs devem ser não ambíguos para o Music Composer.
- Specs de export devem ser reproduzíveis (valores explícitos).
- Logs de publicação devem incluir canal, timestamp e status (sucesso/erro).

## Idiomas

- Briefs e documentação interna: português ou inglês, conforme projeto.
- Metadados para plataformas (títulos, descrições): idioma do canal ou conforme estratégia de conteúdo.
