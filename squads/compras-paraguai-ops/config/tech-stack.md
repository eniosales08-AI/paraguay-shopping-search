# Tech Stack — compras-paraguai-ops

Tecnologias e ferramentas para operações de Compras Paraguai. Reutiliza e complementa o paraguay-shopping-search.

## Câmbio e preços

- **Fontes:** APIs oficiais ou configuradas (BCP Paraguay, etc.); fallback definido pelo Product Owner Ops.
- **Armazenamento:** Mesmo datalake/DB do paraguay-shopping-search quando aplicável; arquivos JSON/YAML para exchange-rates quando standalone.
- **Scripts:** Node.js ou Python conforme projeto; rate limiting e cache para APIs externas.

## Catálogo

- **Schema:** Idêntico ao do paraguay-shopping-search (produto, preço em PYG, loja, URL, imagem, categoria).
- **Normalização:** Scripts de dedup e categorização; logs de manutenção para auditoria.
- **Entrega:** Catálogo pronto para ingestão no pipeline do paraguay-shopping-search.

## Conteúdo

- **Formato:** Markdown, JSON (schema markup), ou código do front (Next.js/React).
- **Locale:** es-PY; revisão de links e imagens.
- **SEO:** Alinhado à spec do paraguay-shopping-search (meta, headings, schema).

## Relatórios e pipelines

- **Relatórios:** Markdown ou JSON; opcional integração com dashboard (Grafana, etc.).
- **Agendamento:** Cron ou GitHub Actions; handoff para DevOps do paraguay-shopping-search quando unificado.
- **Segurança:** Variáveis de ambiente para APIs; sem credenciais em repositório.
