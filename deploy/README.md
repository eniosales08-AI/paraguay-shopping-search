# Deploy — Paraguay Shopping Search

**Task:** setupDeployAndMonitor()  
**DevOps** — deploy repetível e monitoramento.

---

## deployUrl (após deploy)

- **Local:** http://localhost:3000 (frontend) | http://localhost:4000 (API standalone)
- **Staging/Produção:** Configurar en Vercel u otro host; actualizar aquí la URL.

## Pipeline CI/CD

- **Frontend (Next.js):** Carpeta `frontend/` lista para Vercel (`vercel` o conexión GitHub).
- **API:** Opción 1 — Next.js sirve `/api/search` desde el mismo deploy (recomendado). Opción 2 — desplegar `api/server.js` en un servicio Node (Railway, Render, etc.).
- **Monitoramiento:** Configurar en el dashboard de Vercel (analytics, logs) o añadir Sentry/Similar.

## Pasos manuales (MVP)

1. Desde la raíz del repo: `cd frontend && npm install && npm run build`
2. Deploy en Vercel: conectar repo, root = `frontend`, build = `npm run build`, output = Next.js.
3. La API de búsqueda funciona en el mismo deploy vía `/api/search` (lee `../data`; en Vercel asegurar que `data/` esté en el repo o empaquetado).

## pipelineRef

- `deploy/vercel.json` — configuración opcional de Vercel (root `frontend` si se despliega desde monorepo).
