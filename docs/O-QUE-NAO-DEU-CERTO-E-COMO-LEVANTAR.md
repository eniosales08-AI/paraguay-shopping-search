# O que não deu certo e como levantar o site

**Resumo:** Os squads (paraguay-shopping-search, compras-paraguai-ops) geraram a estrutura, o front e a API, mas na **Vercel** apareceram erros que a gente foi corrigindo aos poucos. Este doc diz o que quebrou e o que fazer para o site ficar no ar de forma estável.

---

## O que deu errado na prática

1. **"Cannot read properties of undefined (reading 'categories')"** — O front esperava sempre `facets.categories`; às vezes a API ou a rede devolviam algo diferente. **Correção:** proteção no front (optional chaining, fallbacks) e API sempre devolver `facets` com `categories`, `stores`, `price_range`.
2. **Produtos sumindo na Vercel** — Na Vercel a API não achava o arquivo `data/catalog/products.json` (serverless não inclui o arquivo no deploy). **Correção:** catálogo **embutido** direto no código da rota `frontend/app/api/search/route.ts` (const `CATALOG` com os 6 produtos). Sem ler arquivo nem importar JSON.
3. **Fotos não carregavam** — O catálogo tinha `image_url: null`. **Correção:** colocamos URLs de placeholder (picsum.photos) e fallback quando a imagem falha.
4. **Git / deploy** — Às vezes o que está no GitHub não era o último código (add/commit/push em um comando só no PowerShell quebrava, ou não dava tempo de subir). O site na Vercel fica igual ao **último push** no branch conectado.

Ou seja: o “esquadrão” desenhou e implementou o site; o que não funcionou foi a **combinação** deploy Vercel + leitura de arquivo + resposta da API em edge cases. Isso a gente foi corrigindo direto no código.

---

## O que o código tem hoje (e deve funcionar)

- **API** (`frontend/app/api/search/route.ts`): catálogo **embutido** (6 produtos com imagem). Não depende de arquivo. Resposta sempre com `results`, `total`, `facets` (categories, stores, price_range).
- **Front** (`BuscarClient.tsx`): trata `facets` indefinido ou malformado; mostra “Sin imagen” se não tiver foto ou se a imagem falhar.
- **Build:** `npm run build` no `frontend/` passa.

Se o **mesmo código** estiver no repositório que a Vercel usa e o deploy tiver sido feito **depois** dessas mudanças, o site deve abrir, listar os 6 produtos e mostrar as fotos (ou o placeholder).

---

## Passo a passo para o site funcionar

### 1. Garantir que o código certo está no GitHub

No PowerShell, na pasta do projeto:

```powershell
cd C:\Users\Crypto\congnittusai
git status
```

- Se `frontend/app/api/search/route.ts` aparecer como **modified**, faça:
  ```powershell
  git add frontend/app/api/search/route.ts
  git commit -m "fix: catálogo embutido na API para Vercel"
  git push
  ```
- Se aparecer **nothing to commit, working tree clean**, o código já está commitado. Aí o que importa é a Vercel ter feito o deploy desse commit.

### 2. Conferir o deploy na Vercel

- Acesse o projeto na Vercel (ex.: paraguay-shopping-search).
- Em **Deployments**, veja o **último deploy**: está “Ready”? Qual commit?
- Se o último commit for antigo (antes do catálogo embutido), faça **Redeploy** (botão ou menu do último deployment) para rodar de novo com o código atual do GitHub.

### 3. Testar a API direto

Abra no navegador (troque pela URL do seu projeto se for diferente):

- `https://paraguay-shopping-search.vercel.app/api/search`

Deve abrir um JSON com `results` (lista de 6 produtos), `total`, `page`, `limit`, `facets`. Se isso aparecer, a API está ok e o problema é só no front ou no cache. Se der 404 ou erro, o problema é deploy ou rota.

### 4. Testar em casa antes de confiar na Vercel

```powershell
cd C:\Users\Crypto\congnittusai\frontend
npm install
npm run dev
```

Abra `http://localhost:3000` → vai para `/es` → “Ir a buscar” → `/es/buscar`.  
Se aí os produtos e as fotos aparecerem, o **código** está certo; aí é só garantir que esse mesmo código está no GitHub e que a Vercel fez deploy dele (passos 1 e 2).

---

## Se ainda não funcionar

- Anote **exatamente** o que acontece:  
  - “Página em branco”, “Algo salió mal”, “0 resultados”, “erro 500”, etc.
- Se puder, abra **F12** → aba **Rede** (Network) → recarregue a busca → clique na requisição **search** e diga:  
  - status (200, 404, 500) e se o corpo da resposta tem `results` e `facets`.
- Envie isso (e a URL do site na Vercel) para que a correção seja feita em cima do sintoma real.

---

## Conclusão

O esquadrão **conseguiu** desenhar e implementar o site (front + API + squads + docs). O que “não deu certo” foram **erros em produção** (API na Vercel, formato da resposta, fotos). O código atual já tem as correções; o que falta é **ter esse código no repositório e a Vercel fazer um deploy novo**. Seguindo o passo a passo acima, o site deve levantar. Se algo ainda falhar, com o detalhe do erro ou do comportamento (e, se possível, da resposta da API), dá para ajustar o que faltar.
