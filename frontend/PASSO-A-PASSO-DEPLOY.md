# Passo a passo — Deploy na Vercel

Siga na ordem. Use o **Caminho 1** se quiser subir só a pasta do site; use o **Caminho 2** se quiser subir o projeto inteiro (congnittusai).

---

## Parte 1: Conta e repositório

### Passo 1.1 — Conta no GitHub
- Se ainda não tiver: acesse [github.com](https://github.com), clique em **Sign up** e crie a conta.
- Faça login.

### Passo 1.2 — Criar um repositório novo
1. No GitHub, clique no **+** (canto superior direito) → **New repository**.
2. **Repository name:** por exemplo `paraguay-shopping-search`.
3. Deixe **Public**.
4. **Não** marque "Add a README" (o projeto já tem arquivos).
5. Clique em **Create repository**.

### Passo 1.3 — Anotar a URL do repositório
Na página do repositório você verá algo como:
`https://github.com/SEU-USUARIO/paraguay-shopping-search.git`  
Substitua **SEU-USUARIO** pelo seu usuário do GitHub. Você vai usar essa URL no próximo passo.

---

## Parte 2: Enviar o código para o GitHub

Abra o **PowerShell** e siga **um** dos caminhos abaixo.

---

### Caminho 1 — Subir só a pasta do site (frontend)

Assim o repositório no GitHub fica só com o que a Vercel precisa. Na Vercel você **não** precisa configurar Root Directory.

**Passo 2.1** — Ir para a pasta do frontend:
```powershell
cd C:\Users\Crypto\congnittusai\frontend
```

**Passo 2.2** — Inicializar o Git e fazer o primeiro commit:
```powershell
git init
git add .
git status
```
(Confira se aparecem os arquivos do projeto.)

```powershell
git commit -m "Site Paraguay Shopping Search - pronto para Vercel"
```

**Passo 2.3** — Ligar ao GitHub e enviar (troque pela **sua** URL do repositório):
```powershell
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/paraguay-shopping-search.git
git push -u origin main
```
- Se pedir usuário e senha: use seu **usuário** do GitHub e um **Personal Access Token** (senha de app) em vez da senha da conta.  
- Para criar um token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Generate new token**.

Se der certo, ao abrir o repositório no GitHub você verá todos os arquivos da pasta `frontend`.

**Na Vercel (Parte 3):** use **Root Directory** em branco (deixe o padrão).

---

### Caminho 2 — Subir o projeto inteiro (congnittusai)

O repositório terá a pasta `frontend` dentro. Na Vercel você vai apontar o **Root Directory** para `frontend`.

**Passo 2.1** — Ir para a pasta do projeto:
```powershell
cd C:\Users\Crypto\congnittusai
```

**Passo 2.2** — Inicializar o Git e fazer o primeiro commit:
```powershell
git init
git add .
git status
```
(Devem aparecer pastas como `frontend`, `data`, `api`, `docs`, etc.)

```powershell
git commit -m "Projeto Paraguay Shopping Search - cognittusai"
```

**Passo 2.3** — Ligar ao GitHub e enviar (troque pela **sua** URL):
```powershell
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/paraguay-shopping-search.git
git push -u origin main
```

**Na Vercel (Parte 3):** em **Root Directory** coloque **`frontend`**.

---

## Parte 3: Deploy na Vercel

### Passo 3.1 — Entrar na Vercel
- Acesse [vercel.com](https://vercel.com).
- Clique em **Login** e entre com sua conta **GitHub** (recomendado).

### Passo 3.2 — Criar projeto
1. No painel da Vercel, clique em **Add New** → **Project**.
2. Na lista de repositórios, encontre **paraguay-shopping-search** (ou o nome que você deu).
3. Clique em **Import** ao lado dele.

### Passo 3.3 — Configurar o projeto
Na tela de configuração:

| Campo | O que fazer |
|-------|-------------|
| **Project Name** | Pode deixar o sugerido (ex.: paraguay-shopping-search). |
| **Root Directory** | **Caminho 1:** deixe em branco. **Caminho 2:** clique em **Edit**, digite `frontend` e confirme. |
| **Framework Preset** | Deve aparecer **Next.js** (não mude). |
| **Build Command** | Deixe `npm run build`. |
| **Output Directory** | Deixe o padrão. |
| **Install Command** | Deixe `npm install`. |

Não é obrigatório configurar variáveis de ambiente agora.

### Passo 3.4 — Fazer o deploy
1. Clique em **Deploy**.
2. Aguarde o build (1–2 minutos).
3. Quando aparecer **Congratulations!**, o deploy terminou.

### Passo 3.5 — Abrir o site
- Clique em **Visit** (ou na URL que aparecer, algo como `https://paraguay-shopping-search-xxx.vercel.app`).
- O site deve abrir em português, com busca e os 30 produtos.

---

## Parte 4: Depois do deploy (opcional)

- **Atualizar o site:** altere os arquivos, depois no PowerShell (na mesma pasta que você usou no Passo 2):
  ```powershell
  git add .
  git commit -m "Atualização do site"
  git push
  ```
  A Vercel faz um novo deploy automaticamente.

- **URL em meta tags:** no projeto na Vercel, vá em **Settings** → **Environment Variables**, crie `NEXT_PUBLIC_SITE_URL` com valor `https://sua-url.vercel.app` (a URL que a Vercel te deu).

---

## Resumo rápido

1. Criar repositório no GitHub (vazio).
2. No PowerShell: `cd` na pasta (frontend ou cognittusai), `git init`, `git add .`, `git commit`, `git remote add origin`, `git push`.
3. Vercel → Add New → Project → Import do repositório.
4. Root Directory: em branco (Caminho 1) ou `frontend` (Caminho 2).
5. Deploy → Visit.

Se em algum passo aparecer uma mensagem de erro, copie e cole aqui que eu te digo o que fazer em seguida.
