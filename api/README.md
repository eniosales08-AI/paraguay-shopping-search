# API Backend — Paraguay Shopping Search

**Task:** buildBackendApi()  
**Backend Engineer** — saída para implementFrontend() e setupDeployAndMonitor().

---

## apiSpec

- **Arquivo:** `api/openapi.yaml` (OpenAPI 3.0)
- **Endpoints:** `GET /search` (parâmetros: q, category, store, price_min, price_max, sort, page, limit).
- **Resposta:** results, total, page, limit, facets (categories, stores, price_range).

---

## apiEndpointRef (referência ao endpoint)

| Ambiente | URL base |
|----------|----------|
| **Local (servidor Node)** | http://localhost:4000 |
| **Next.js API routes** | /api (relativo ao app; ex. GET /api/search) |

Para rodar o servidor standalone:
```bash
node api/server.js
```
Depois: `GET http://localhost:4000/search?q=auriculares&limit=10`

---

## Implementação

- **api/server.js** — servidor HTTP mínimo (Node) que usa `data/search/search.js` e expõe GET /search e GET /health.
- Em produção com Next.js: migrar para `app/api/search/route.js` (ou `pages/api/search.js`) usando o mesmo contrato; cache (Redis) e rate limiting podem ser adicionados nessa camada.
