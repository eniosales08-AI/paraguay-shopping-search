# Configurar GitHub para a Vercel ver o repositório

Se o repositório **não aparece** na lista quando você clica em "Import" na Vercel, faça os passos abaixo.

---

## 1. Dar acesso da Vercel ao GitHub

### Opção A — Pelo site da Vercel (recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça **Login** com **GitHub** (se ainda não fez).
2. No canto superior direito, clique no seu **avatar** ou no **ícone de configurações**.
3. Vá em **Settings** (Configurações da conta).
4. No menu lateral, procure **Git** ou **Connected Git Repository**.
5. Clique em **Connect Git Account** ou **Adjust GitHub App Permissions**.
6. Você será redirecionado ao **GitHub**. Autorize a **Vercel** (e, se pedir, o app **Vercel**).
7. Se o GitHub perguntar em quais repositórios a Vercel pode acessar:
   - **All repositories** = todos (mais simples), ou  
   - **Only select repositories** = escolha **paraguay-shopping-search** (ou o nome do seu repo).
8. Clique em **Install** / **Authorize** e volte para a Vercel.

Depois disso, ao criar um **New Project** na Vercel, o repositório deve aparecer na lista.

---

### Opção B — Pelo GitHub (configurar o app Vercel)

1. Acesse [github.com](https://github.com) e faça login.
2. Clique no seu **avatar** (canto superior direito) → **Settings**.
3. No menu lateral esquerdo, vá em **Applications** → **Installed GitHub Apps** (ou **Integrations**).
4. Procure por **Vercel** na lista.
   - Se **não** estiver instalado: volte à Vercel, tente **Add New → Project** e, ao escolher GitHub, o GitHub deve pedir para instalar o app Vercel. Aceite e escolha o repositório (ou todos).
   - Se **já** estiver instalado: clique em **Vercel** → **Configure**. Em **Repository access**, escolha **All repositories** ou **Only select repositories** e inclua **paraguay-shopping-search**. Salve.

---

## 2. Conferir se o repositório existe e tem código

1. No GitHub, vá em [github.com](https://github.com) e abra seu perfil (Your repositories).
2. Verifique se existe o repositório **paraguay-shopping-search** (ou o nome que você criou).
3. Entre nele e confira se há arquivos (ex.: pasta `frontend` ou arquivos como `package.json`, `app/`, etc.).
   - Se estiver **vazio**: você ainda não fez o `git push`. Volte ao passo a passo e rode os comandos na pasta do projeto (frontend ou cognittusai).

---

## 3. Tentar o import de novo na Vercel

1. Na Vercel: **Add New** → **Project**.
2. A lista deve mostrar seus repositórios do GitHub.
3. Se **paraguay-shopping-search** aparecer: clique em **Import** ao lado dele e siga o deploy (Root Directory: em branco ou `frontend`).
4. Se **não** aparecer:
   - Clique em **Adjust GitHub App Permissions** (ou link similar) e libere acesso ao repositório ou a todos os repos.
   - Ou use a opção **Import Third-Party Git Repository**: cole a URL do repo (`https://github.com/SEU-USUARIO/paraguay-shopping-search`) e faça o deploy (pode pedir um token do GitHub).

---

## 4. Se ainda não aparecer — import por URL

1. Na Vercel, em **Add New** → **Project**, procure algo como **Import Git Repository** ou **Import from URL**.
2. Cole a URL do repositório:  
   `https://github.com/SEU-USUARIO/paraguay-shopping-search`
3. Se pedir autenticação, use um **Personal Access Token** do GitHub (Settings → Developer settings → Personal access tokens) com permissão **repo**.

---

Resumo: o mais comum é faltar **autorizar a Vercel no GitHub** (passo 1). Depois disso, o repositório costuma aparecer na hora de criar o projeto.
