# Deploy na Vercel — Paraguay Shopping Search

Siga um dos dois caminhos abaixo.

---

## Opção A: Deploy pelo site da Vercel (recomendado)

### 1. Subir o projeto no GitHub

1. Crie um repositório no GitHub (ex.: `paraguay-shopping-search`).
2. No PowerShell, na pasta do **projeto inteiro** (congnittusai ou só frontend):

   **Se for subir só a pasta frontend:**
   ```powershell
   cd C:\Users\Crypto\congnittusai\frontend
   git init
   git add .
   git commit -m "Paraguay Shopping Search - frontend"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/paraguay-shopping-search.git
   git push -u origin main
   ```

   **Se for subir o repositório cognittusai inteiro:**
   ```powershell
   cd C:\Users\Crypto\congnittusai
   git init
   git add .
   git commit -m "Paraguay Shopping Search"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/congnittusai.git
   git push -u origin main
   ```

### 2. Conectar na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar conta GitHub).
2. Clique em **Add New** → **Project**.
3. **Import** o repositório que você criou (GitHub).
4. **Configuração do projeto:**
   - **Root Directory:**  
     - Se o repositório é **só o frontend:** deixe em branco (`.`).  
     - Se o repositório é **congnittusai inteiro:** clique em **Edit** e coloque `frontend`.
   - **Framework Preset:** Next.js (já detectado).
   - **Build Command:** `npm run build` (padrão).
   - **Output Directory:** `.next` (padrão).
5. Clique em **Deploy**.

### 3. Depois do deploy

- A Vercel mostra uma URL tipo `https://paraguay-shopping-xxx.vercel.app`.
- Abra essa URL: a home em português e a busca devem funcionar (catálogo de 30 produtos).
- (Opcional) Em **Settings → Environment Variables** defina `NEXT_PUBLIC_SITE_URL` = `https://sua-url.vercel.app` para meta tags e links corretos.

---

## Opção B: Deploy pela Vercel CLI

1. Instale a CLI:
   ```powershell
   npm i -g vercel
   ```

2. Faça login e deploy a partir da pasta do frontend:
   ```powershell
   cd C:\Users\Crypto\congnittusai\frontend
   vercel login
   vercel
   ```
   Siga as perguntas (linkar a um projeto existente ou criar um novo). No fim, a CLI mostra a URL do deploy.

---

## Observações

- O catálogo e o motor de busca estão em `frontend/data/` e vão junto no deploy (a API `/api/search` usa esses arquivos).
- Para atualizar o site: dê `git push` (Opção A) ou rode `vercel --prod` de novo (Opção B).
