# Design tokens — Compras Paraguay

Tokens usados no front-end (CSS custom properties). Definidos em `frontend/app/globals.css`.

## Cores

| Token | Uso | Claro | Escuro (prefers-color-scheme: dark) |
|-------|-----|-------|-------------------------------------|
| `--color-text` | Texto principal | #1a1a1a | #f3f4f6 |
| `--color-text-muted` | Texto secundário, placeholders | #6b7280 | #9ca3af |
| `--color-border` | Bordas, divisores | #e5e7eb | #374151 |
| `--color-surface` | Fundo de cards e superfícies | #ffffff | #111827 |
| `--color-primary` | Botões, links, destaque | #059669 | #10b981 |
| `--color-primary-hover` | Hover em primário | #047857 | #34d399 |

## Uso

- Componentes usam `var(--color-*)` para respeitar tema claro/escuro.
- Tailwind: `text-primary` mapeia para `var(--color-primary)` em `tailwind.config.ts`.
- Acessibilidade: contraste entre texto e fundo deve atender WCAG AA (verificado em revisão).

## Utilitários

- `.sr-only`: conteúdo só para leitores de tela; com `.focus:not-sr-only:focus` vira visível ao foco (skip link).
