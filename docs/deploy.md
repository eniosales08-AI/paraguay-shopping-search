# Deploy — Compras Paraguay

## Vercel (recomendado)

**Passo a passo completo:** use **[VERCEL-PASSO-A-PASSO.md](./VERCEL-PASSO-A-PASSO.md)** para o guia detalhado.

Resumo:
1. Conectar o repositório ao Vercel (GitHub/GitLab/Bitbucket).
2. **Root Directory:** definir como `frontend` (ou o caminho onde está o `package.json` do Next.js).
3. **Build:** Vercel detecta Next.js; comando padrão `npm run build` e output `.next`.
4. **Variáveis de ambiente (opcional):**
   - `NEXT_PUBLIC_SITE_URL`: URL final do site (ex. `https://comprasparaguay.com`) para metadata e schema.org.

O projeto inclui `frontend/vercel.json` com framework nextjs; o root do deploy deve ser a pasta `frontend` no monorepo.

## Deploy manual (Node)

```bash
cd frontend
npm ci
npm run build
npm start
```

Requer Node 18+ e variável `PORT` opcional (default 3000).

## CI

O workflow `.github/workflows/frontend-ci.yml` roda `npm run lint` e `npm run build` em todo push/PR que altere `frontend/`. Garantir que o deploy use o mesmo Node (ex. 20) que a CI.
