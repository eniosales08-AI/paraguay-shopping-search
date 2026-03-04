# Contrato da API de busca — Compras Paraguay

**Versão:** 1.0  
**Squad:** paraguay-shopping-search

---

## Endpoint

`GET /api/search`

## Parâmetros de query

| Parâmetro | Tipo   | Obrigatório | Descrição |
|-----------|--------|-------------|-----------|
| `q`       | string | Não         | Termo de busca (título, categoria, loja) |
| `page`    | number | Não         | Página (default: 1) |
| `limit`   | number | Não         | Itens por página (default: 20, max: 50) |
| `category`| string | Não         | Filtrar por categoria exata |
| `store`   | string | Não         | Filtrar por loja exata |
| `sort`    | string | Não         | `relevance` \| `price_asc` \| `price_desc` \| `updated_desc` |

## Formato de resposta (200)

```json
{
  "results": [
    {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "price_pyg": number,
      "store": "string",
      "url": "string",
      "image_url": "string | null",
      "category": "string | null",
      "locale": "string",
      "currency": "string"
    }
  ],
  "total": number,
  "page": number,
  "limit": number,
  "facets": {
    "categories": [ { "value": "string", "count": number } ],
    "stores": [ { "value": "string", "count": number } ],
    "price_range": { "min": number, "max": number }
  }
}
```

- **results:** itens da página atual.
- **total:** total de itens que batem com os filtros.
- **facets:** contagens e faixa de preço sobre o conjunto filtrado (para filtros laterais na UI).

## Erros

- Respostas não-JSON ou sem `results` (array) devem ser tratadas pelo cliente como erro; exibir mensagem genérica (ex.: "No se pudieron cargar los resultados").
