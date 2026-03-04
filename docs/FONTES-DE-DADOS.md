# Onde conseguir dados para alimentar o site — Compras Paraguay

**Objetivo:** Esclarecer de onde vêm (e podem vir) os dados do catálogo que o site usa.

---

## Hoje (v1)

Os dados vêm de **um único arquivo no repositório:**

- **Arquivo:** `frontend/data/catalog/products.json`
- **Formato:** JSON com lista de produtos no schema em `data/catalog/catalog-schema.json` (id, title, description, price_pyg, store, url, image_url, category, locale, currency).
- **Como o site usa:** A API importa esse JSON no build (`frontend/lib/catalog-search.ts`) e a busca filtra em cima dele. Para mudar o catálogo: edite o JSON e faça um novo deploy.

Ou seja: **hoje você “consegue” os dados editando esse JSON** (manual) ou rodando algum script seu que gera/atualiza esse arquivo a partir de outra fonte.

---

## De onde podem vir os dados (quando quiser escalar)

Não existe no repo uma lista fechada de “APIs do Paraguai” — cada fonte precisa ser **permitida pela visão** (ToS, robots.txt, uso ético) e **documentada** quando for usada. Opções genéricas:

| Tipo | Exemplo | O que fazer |
|------|--------|-------------|
| **API oficial da loja** | Se uma loja paraguaia tiver API de produtos/catálogo | Integrar (Data Engineer / compras-paraguai-ops); documentar em `docs/fontes/` ou neste doc. |
| **Feed (RSS, CSV, XML)** | Export ou feed que a loja disponibiliza | Script de ingestão que normaliza para o schema e gera/atualiza `products.json` (ou envia para um DB). |
| **Parceria / contrato** | Acordo com loja ou agregador para uso de dados | Documentar a fonte e as regras; pipeline que lê dessa fonte e alimenta o catálogo. |
| **Entrada manual / planilha** | Você ou a equipe preenchem uma planilha ou formulário | Converter (CSV/Excel → JSON) e colocar no repo ou num passo de build que gera `products.json`. |
| **Scraping** | Extração automática de sites (ex.: listagens) | Só se estiver dentro das regras de compliance (ToS, robots.txt, rate limit, uso ético). Documentar e preferir APIs/feeds quando existirem. |

**Regras (visão do produto):**  
- Respeitar **ToS**, **robots.txt** e APIs oficiais.  
- Preferir **APIs oficiais ou feeds**; se usar scraping, com rate limiting e uso ético.  
- **Moeda:** PYG. **Locale:** es-PY.  
- Documentar no repo as **fontes usadas** e a **data da última atualização** quando houver ingestão real.

Ver: `docs/vision/product-vision.md` (seções 4 e 5).

---

## Como “alimentar” o site na prática

1. **Continuar manual:** Editar `frontend/data/catalog/products.json` e fazer push + deploy.  
2. **Semi-automático:** Script (ex.: em `scripts/` ou compras-paraguai-ops) que lê uma planilha, CSV ou API, normaliza para o schema e **escreve** em `frontend/data/catalog/products.json`; aí você faz commit e deploy.  
3. **Automático (futuro):** Pipeline (cron/job) que atualiza o catálogo (arquivo ou DB) e a API passa a ler dessa fonte; ou job que faz deploy após atualizar o JSON no repo.

O schema que qualquer fonte deve respeitar está em **`data/catalog/catalog-schema.json`**.

---

## Resumo direto

- **Onde consigo os dados hoje?** Do próprio repo: arquivo **`frontend/data/catalog/products.json`**. Você pode editar à mão ou gerar esse arquivo a partir de planilha, API ou feed.  
- **Onde conseguir dados “de verdade”?** APIs ou feeds de lojas/agregadores no Paraguai que permitam uso (ToS/compliance). Não há lista pronta no projeto; você escolhe a fonte, documenta e monta o pipeline (script ou job) que gera/atualiza o catálogo.  
- **Formato:** Sempre no schema em `data/catalog/catalog-schema.json` (id, title, price_pyg, store, url, etc., PYG, es-PY).

Quando tiver uma fonte concreta (nome da loja, link da API ou do feed), dá para documentar neste arquivo em uma seção “Fontes em uso” e descrever o passo a passo do script de ingestão.
