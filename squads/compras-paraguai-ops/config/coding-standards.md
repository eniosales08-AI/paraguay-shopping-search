# Coding Standards — compras-paraguai-ops

Convenções para scripts e artefatos do squad de operações (câmbio, preços, catálogo, conteúdo). Alinhado ao paraguay-shopping-search.

## Naming

- **Câmbio e preços:** `exchange-rates.json` ou equivalente; timestamp em ISO 8601.
- **Catálogo:** Mesmo schema e convenção do paraguay-shopping-search (kebab-case para arquivos).
- **Conteúdo:** Arquivos em kebab-case; locale es-PY nos nomes quando aplicável.
- **Relatórios:** `ops-report-{date}.md` ou `ops-report.json`.

## Dados

- **Moeda:** PYG no catálogo normalizado; fontes de câmbio rastreáveis.
- **Schema de catálogo:** Compatível com o definido em paraguay-shopping-search (produto, preço, loja, URL, imagem).
- **Idioma:** Conteúdo editorial em es-PY.

## Qualidade

- Tasks de câmbio e preços devem registrar data/hora e fonte.
- Catálogo deve passar na validação de schema antes de ser consumido pelo motor de busca.
- Relatórios de ops devem ser acionáveis (alertas quando dados desatualizados).

## Integração

- Este squad depende do paraguay-shopping-search (schema, visão, SEO). Não alterar contrato sem alinhamento.
