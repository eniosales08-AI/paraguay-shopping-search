# P1.1 — Comandos para subir o código (GitHub + Vercel)

Execute **no PowerShell**, na pasta do projeto (`C:\Users\Crypto\congnittusai`).

## 1. Adicionar tudo e commitar

```powershell
git add -A
git status
```

Confira se a lista é a esperada (modificados + novos + removidos). Depois:

```powershell
git commit -m "feat: Paraguay estável - catálogo embutido, docs alinhados, CI smoke, backlog"
```

## 2. Enviar para o GitHub

```powershell
git push origin main
```

(Se o branch remoto tiver outro nome, use esse nome.)

## 3. Na Vercel

- Abra o projeto (ex.: paraguay-shopping-search).
- **Deployments** → o último deploy deve disparar com o commit novo (ou faça **Redeploy**).
- Quando estiver **Ready**, teste: `https://[seu-projeto].vercel.app/api/search`

Deve retornar JSON com `results`, `total`, `facets`.

## Se der conflito no push

Se aparecer que o remoto tem commits que você não tem:

```powershell
git pull origin main --rebase
git push origin main
```

---

*Depois de testar a API no ar, marque P1.1 como feito no backlog (docs/backlog-paraguay.md): troque `[ ]` por `[x]` na linha do P1.1.*
