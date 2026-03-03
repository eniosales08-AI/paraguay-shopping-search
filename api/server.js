/**
 * API backend — Paraguay Shopping Search
 * Backend Engineer — buildBackendApi()
 * Servidor mínimo que expõe GET /search conforme openapi.yaml.
 * Uso: node api/server.js (desde la raíz del proyecto)
 */

const path = require('path');

// Resolver raíz del proyecto (congnittusai)
const projectRoot = path.resolve(__dirname, '..');
const { search } = require(path.join(projectRoot, 'data', 'search', 'search.js'));

const PORT = process.env.PORT || 4000;

function createServer() {
  const http = require('http');
  return http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://localhost:${PORT}`);
    if (req.method === 'GET' && (url.pathname === '/search' || url.pathname === '/api/search')) {
      const q = url.searchParams.get('q') || '';
      const category = url.searchParams.get('category') || undefined;
      const store = url.searchParams.get('store') || undefined;
      const price_min = url.searchParams.get('price_min');
      const price_max = url.searchParams.get('price_max');
      const sort = url.searchParams.get('sort') || 'relevance';
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);

      const params = {
        q,
        category,
        store,
        sort,
        page,
        limit,
      };
      if (price_min !== null && price_min !== '') params.price_min = Number(price_min);
      if (price_max !== null && price_max !== '') params.price_max = Number(price_max);

      try {
        const result = search(params);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'GET' && url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });
}

const server = createServer();
server.listen(PORT, () => {
  console.log(`Paraguay Shopping Search API — http://localhost:${PORT}`);
  console.log(`  GET /search?q=...&category=...&page=1&limit=20`);
  console.log(`  GET /health`);
});
