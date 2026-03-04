# Design tokens — Compras Paraguay

**Documento principal do design system:** `docs/design-system-paraguay.md`  
(Estrutura baseada no template `apple.md` em `C:\Users\Crypto\apple.md`.)

---

## Resumo rápido

Tokens definidos em **`frontend/app/globals.css`**:

| Token | Uso | Claro | Escuro |
|-------|-----|-------|--------|
| `--color-text` | Texto principal | #1a1a1a | #f3f4f6 |
| `--color-text-muted` | Texto secundário | #6b7280 | #9ca3af |
| `--color-border` | Bordas | #e5e7eb | #374151 |
| `--color-surface` | Fundo | #ffffff | #111827 |
| `--color-primary` | Botões, links | #059669 | #10b981 |
| `--color-primary-hover` | Hover primário | #047857 | #34d399 |

- Componentes usam `var(--color-*)`.
- Tailwind: `text-primary` etc. mapeados em `tailwind.config.ts`.
- Acessibilidade: contraste WCAG AA; skip link (`.sr-only` + focus visible).

Ver seções completas (tipografia, espaçamento, componentes, acessibilidade) em **`docs/design-system-paraguay.md`**.
