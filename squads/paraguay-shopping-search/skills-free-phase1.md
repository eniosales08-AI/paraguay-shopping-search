# skills-free-phase1.md — Referências livres (Fase 1)

Squad: **paraguay-shopping-search**. Skills/ferramentas que não estão em `.cursor/skills/` mas são relevantes para os agentes.

## Data Engineer (ingestão e catálogo)

- **Scraping ético:** Respeitar robots.txt, ToS do site de origem, rate limiting; preferir APIs oficiais quando existirem (ex.: feeds, parceiros).
- **Ferramentas comuns:** Puppeteer/Playwright (browser), Cheerio (HTML parse), APIs REST; armazenamento: PostgreSQL, MongoDB ou datalake conforme escala.
- **Normalização:** Schema unificado (produto, preço, loja, URL, imagem); deduplicação; moeda (PYG) e locale (es-PY).

## Search Engineer (motor de busca)

- **Indexação:** Full-text search (PostgreSQL FTS, Elasticsearch/OpenSearch, Meilisearch, Typesense); campos: título, descrição, categoria, preço, loja.
- **Performance:** Índices adequados, cache de queries quentes, facetas para filtros (categoria, faixa de preço, loja).
- **Relevância:** Ranking por relevância textual e (opcional) por preço/popularidade.

## Uso no squad

Os agentes **data-engineer** e **search-engineer** podem referenciar este arquivo em `skills_reference` ou na descrição de capacidades até que existam skills formais no projeto.
