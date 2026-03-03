# Tech Stack — paraguay-shopping-search

Tecnologias e ferramentas referenciadas pelo squad para o site de buscas de compras do Paraguai.

## Dados e ingestão

- **Ingestão:** Respeitar ToS e robots.txt; preferir APIs oficiais; scraping ético com rate limiting (ver skills-free-phase1.md).
- **Ferramentas comuns:** Puppeteer/Playwright, Cheerio; armazenamento PostgreSQL, MongoDB ou datalake conforme escala.
- **Normalização:** Schema unificado; moeda PYG; locale es-PY.

## Busca

- **Motor de busca:** PostgreSQL FTS, Elasticsearch/OpenSearch, Meilisearch ou Typesense (ver skills-free-phase1.md).
- **Índice:** Campos título, descrição, categoria, preço, loja; facetas para filtros.

## Backend

- **API:** REST ou GraphQL; documentação OpenAPI; cache (Redis ou similar) para queries quentes.
- **Runtime:** Node.js ou stack do projeto (Next.js API routes quando aplicável).

## Front-end

- **Framework:** Next.js, React, TypeScript, Tailwind (objetivo: moderno, rápido, sofisticado).
- **Skills (projeto):** frontend-design, vercel-react-best-practices, web-design-guidelines.
- **Performance:** Core Web Vitals; lazy loading; otimização de imagens.

## SEO e localização

- **Skills (projeto):** seo-audit, programmatic-seo, schema-markup.
- **Mercado:** Paraguai; es-PY; PYG; estrutura e meta para descoberta.

## DevOps e QA

- **CI/CD:** GitHub Actions ou equivalente (deployment-pipeline-design, github-actions-templates).
- **Hospedagem:** Vercel, AWS, ou conforme projeto.
- **QA:** E2E (Playwright/Cypress), Lighthouse, acessibilidade (axe); relatórios acionáveis.

## Runtime e segurança

- Variáveis de ambiente em `.env`; nunca commitar credenciais ou API keys.
- Compliance e fontes de dados definidos na visão (Product Owner).
