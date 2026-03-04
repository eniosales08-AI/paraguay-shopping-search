# Ao acordar — Compras Paraguay

**Objetivo:** Em um único ciclo (push + verificar deploy), deixar o site e os relatórios atualizados com tudo o que foi feito durante a noite.

---

## 1. Enviar o código para o GitHub

No PowerShell, na pasta do projeto:

```powershell
cd C:\Users\Crypto\congnittusai
git add -A
git status
```

Confira a lista. Depois:

```powershell
git commit -m "feat: catálogo via JSON, lib catalog-search, ops-report, docs e P3.1/P3.2 prep"
git push origin main
```

(Se pedir `git pull` antes, faça: `git pull origin main --rebase` e depois `git push origin main`.)

---

## 2. Verificar o deploy na Vercel

- Abra o projeto na Vercel (paraguay-shopping-search ou o nome que estiver).
- Em **Deployments**, confira se o último deploy está **Ready** com o commit que você acabou de dar push.
- Se o deploy não tiver disparado ou estiver em commit antigo, use **Redeploy** no último deployment.

---

## 3. Testar no ar

- **API de busca:**  
  `https://[seu-projeto].vercel.app/api/search`  
  Deve retornar JSON com `results`, `total`, `facets` (6 produtos).

- **Relatório de ops:**  
  `https://[seu-projeto].vercel.app/api/ops-report`  
  Deve retornar JSON com `catalog.total`, `reportMetadata`, etc.

- **Página de busca:**  
  Abra o site → Ir a buscar → deve listar os produtos.

Se algo falhar, use o passo a passo em `docs/O-QUE-NAO-DEU-CERTO-E-COMO-LEVANTAR.md`.

---

## 4. O que foi feito (resumo noturno)

- **Catálogo:** API passou a usar `frontend/data/catalog/products.json` (import no build) como fonte de verdade.
- **Busca:** Lógica extraída para `frontend/lib/catalog-search.ts`; rota `/api/search` só chama `search()`. Pronto para trocar por Meilisearch/DB depois (ver `docs/PROXIMO-INDICE-BUSCA.md`).
- **Docs:** `docs/decisao-catalogo-v1.md`, `docs/PROXIMO-INDICE-BUSCA.md`, task build-search-engine com nota de implementação.
- **Backlog:** P3.1 e preparação P3.2 documentadas; P3.2 (índice externo) fica para quando você decidir o motor.

Nada disso exige sua decisão antes do push: só enviar, conferir o deploy e testar.
