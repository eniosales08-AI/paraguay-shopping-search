# Quality gate — Compras Paraguay

Checklist antes de considerar o site pronto para produção (go/no-go).

## Build e lint

- [ ] `cd frontend && npm ci && npm run lint` — sem erros
- [ ] `npm run build` — conclui com sucesso; sem warnings críticos

## Smoke (manual ou automatizado)

- [ ] Home carrega (`/` redireciona para `/es`; página exibe título e link "Ir a buscar")
- [ ] Busca carrega (`/es/buscar`) — formulário visível; sem erro no console
- [ ] API responde: `GET /api/search` retorna JSON com `results`, `total`, `facets`
- [ ] Busca com resultados: ao buscar (ex. "Notebook" ou vazio) aparecem resultados ou mensagem "No se encontraron resultados"
- [ ] Skip link: Tab no carregamento foca "Saltar al contenido"; Enter leva ao `#main`

## SEO e metadata

- [ ] Título da aba correto na home e na busca
- [ ] `NEXT_PUBLIC_SITE_URL` definido em produção (canonical e schema)

## Deploy

- [ ] Ambiente de produção configurado (ex. Vercel)
- [ ] URL de produção acessível; HTTPS ativo

## Opcional (melhoria contínua)

- [ ] Lighthouse (performance, acessibilidade, SEO) sem regressões
- [ ] E2E (ex. Playwright) para fluxo home → buscar → resultados
- [ ] Monitoramento (ex. Vercel Analytics ou ping de saúde)

---

**Aprovação:** preencher e assinar antes de marcar release como produção.
