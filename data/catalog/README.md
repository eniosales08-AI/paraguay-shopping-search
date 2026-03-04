# Catálogo — Compras Paraguay

- **catalog-schema.json:** JSON Schema do produto (id, title, price_pyg, store, url, image_url, category, locale es-PY, currency PYG).
- **products.json:** Seed do catálogo (fonte canônica no repositório).

O frontend usa uma cópia em `frontend/data/catalog/products.json` para a API `/api/search` ler em runtime. Para atualizar: editar este `products.json` e copiar para `frontend/data/catalog/`, ou configurar a API para ler deste diretório conforme ambiente.
