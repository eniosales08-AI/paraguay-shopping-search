# Deploy no Vercel — Passo a passo (Compras Paraguay)

Siga na ordem. O projeto fica na pasta **frontend** (monorepo); a Vercel precisa usar essa pasta como raiz.

---

## Passo 1 — Repositório no GitHub

1. Se ainda não tiver o código no GitHub, crie um repositório (ex.: `compras-paraguay` ou `congnittusai`).
2. No seu computador, na pasta do projeto (ex.: `C:\Users\Crypto\congnittusai`), rode:
   ```bash
   git init
   git add .
   git commit -m "Checkpoint: site pronto para deploy"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```
   Troque `SEU_USUARIO` e `NOME_DO_REPO` pelo seu usuário e nome do repositório.

---

## Passo 2 — Entrar na Vercel

1. Acesse **[vercel.com](https://vercel.com)** e faça login (ou crie conta).
2. Use **“Continue with GitHub”** para vincular sua conta ao GitHub (recomendado).

---

## Passo 3 — Novo projeto a partir do Git

1. No dashboard da Vercel, clique em **“Add New…”** → **“Project”**.
2. Na lista de repositórios, escolha o repositório do projeto (ex.: `congnittusai` ou `compras-paraguay`).
3. Se não aparecer, clique em **“Import Git Repository”** e autorize a Vercel a acessar sua conta/organização no GitHub.
4. Depois de selecionar o repo, clique em **“Import”**.

---

## Passo 4 — Definir a raiz do projeto (Root Directory)

1. Na tela de configuração do projeto, em **“Configure Project”**, procure **“Root Directory”**.
2. Clique em **“Edit”** ao lado.
3. Digite: **`frontend`** (só essa pasta; sem barra no final).
4. Confirme. A Vercel vai usar apenas a pasta `frontend` como raiz do projeto (onde está o `package.json` do Next.js).

---

## Passo 5 — Build (deixar como está)

1. **Framework Preset:** deve aparecer **Next.js** (detectado automaticamente).
2. **Build Command:** deixe em branco ou `npm run build` (padrão).
3. **Output Directory:** deixe em branco (Next.js usa `.next`).
4. **Install Command:** deixe em branco ou `npm install` (padrão).

Não é preciso alterar nada aqui se estiver tudo padrão.

---

## Passo 6 — Variáveis de ambiente (opcional mas recomendado)

1. Na mesma tela, expanda **“Environment Variables”**.
2. Adicione:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** a URL que o site vai ter na Vercel, por exemplo:  
     `https://seu-projeto.vercel.app`  
     (você pode trocar depois para um domínio próprio, ex.: `https://comprasparaguay.com`)
3. Marque **Production** (e, se quiser, Preview e Development).
4. Clique em **“Add”** ou **“Save”**.

Isso é usado nas meta tags e no schema.org (canonical, Open Graph).

---

## Passo 7 — Fazer o deploy

1. Clique em **“Deploy”**.
2. Aguarde o build (alguns minutos). A Vercel vai rodar `npm install` e `npm run build` dentro da pasta `frontend`.
3. Se der erro, veja o **Build Logs** na tela do deployment; o motivo mais comum é **Root Directory** errado (tem que ser `frontend`).

---

## Passo 8 — Conferir o site

1. Quando o status ficar **“Ready”**, clique no link do deployment (ex.: `https://seu-projeto.vercel.app`).
2. Verifique:
   - Abertura da **home** (pode redirecionar para `/es`).
   - Link **“Ir a buscar”** levando para `/es/buscar`.
   - **Busca** carregando e mostrando os 6 produtos do catálogo (ou “No se encontraron resultados” se filtrar algo que não existe).

---

## Resumo rápido (checklist)

| # | Ação |
|---|------|
| 1 | Código no GitHub |
| 2 | Login na Vercel (com GitHub) |
| 3 | Add New → Project → importar o repo |
| 4 | **Root Directory = `frontend`** |
| 5 | Build: padrão Next.js |
| 6 | Variável `NEXT_PUBLIC_SITE_URL` = URL do site |
| 7 | Deploy |
| 8 | Abrir a URL e testar home + busca |

---

## Depois do primeiro deploy

- **Novos deploys:** a cada push na branch conectada (ex.: `main`), a Vercel faz um novo deploy automaticamente.
- **Domínio próprio:** em **Project → Settings → Domains** adicione seu domínio (ex.: `comprasparaguay.com`) e atualize `NEXT_PUBLIC_SITE_URL` para essa URL.
- **Preview:** cada pull request pode ganhar uma URL de preview (ex.: `seu-projeto-git-branch-username.vercel.app`).

---

## Problemas comuns

| Problema | Solução |
|----------|---------|
| Build falha com “Cannot find module” ou “package.json not found” | Confirme **Root Directory** = `frontend`. |
| Página em branco ou 404 | Verifique se está acessando a URL correta (ex.: `/es` ou `/es/buscar`). |
| Meta tags / canonical erradas | Defina `NEXT_PUBLIC_SITE_URL` com a URL final do site (com `https://`). |

Se quiser, na próxima sessão podemos revisar o checklist em `qa/quality-gate-checklist.md` depois do primeiro deploy na Vercel.
