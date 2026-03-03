# Coding Standards — paraguay-shopping-search

Convenções de código e estilo aplicáveis aos artefatos e scripts do squad (visão, catálogo, API, front-end).

## Naming

- **Documentos de visão:** `vision-{projeto ou data}.md` (kebab-case).
- **Schema e dados:** `catalog-schema.json` ou equivalente; nomes de arquivo em kebab-case.
- **API:** Especificação em `api-spec.yaml` ou OpenAPI; endpoints em kebab-case ou camelCase conforme convenção da stack.
- **Design system:** Tokens e componentes em kebab-case; variáveis CSS/JS conforme projeto (camelCase ou kebab-case).
- **Configs:** camelCase para chaves JSON/YAML em scripts; kebab-case para nomes de arquivo.

## Estrutura de documentos

- **Visão:** seções obrigatórias — escopo, prioridades, fontes permitidas, regras de compliance (ToS, robots.txt).
- **Catálogo:** schema com campos produto, preço, loja, URL, imagem; moeda PYG, locale es-PY.
- **Contrato de busca:** queries, filtros (categoria, faixa de preço, loja), formato de resposta.
- **API:** OpenAPI ou equivalente com endpoints de busca e catálogo.
- **SEO:** meta tags, estrutura de headings, schema markup documentados por página/tipo.

## Qualidade

- Visão deve ser não ambígua para Data Engineer e demais agentes.
- Ingestão deve respeitar compliance definido na visão.
- API e front-end devem seguir design system e seoSpec.
- Relatórios de QA devem incluir E2E, performance, acessibilidade e status por gate.

## Idiomas e locale

- Documentação interna: português ou inglês, conforme projeto.
- Produto e UI: es-PY (espanhol Paraguai); moeda PYG quando aplicável.
