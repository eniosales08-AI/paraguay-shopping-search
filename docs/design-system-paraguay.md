---
name: "compras-paraguay"
description: "Design system do site Compras Paraguay — busca de compras no mercado paraguayo. Tokens de cores, tipografia, espaçamento, componentes e acessibilidade. Locale es-PY, moeda PYG."
source_url: "https://github.com/congnittusai/paraguay-shopping-search"
extracted_at: "2026-03-03"
version: "1.0.0"
tokens:
  colors:
    text: "#1a1a1a"
    text_muted: "#6b7280"
    border: "#e5e7eb"
    surface: "#ffffff"
    primary: "#059669"
    primary_hover: "#047857"
  colors_dark:
    text: "#f3f4f6"
    text_muted: "#9ca3af"
    border: "#374151"
    surface: "#111827"
    primary: "#10b981"
    primary_hover: "#34d399"
  typography:
    font_body: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    size_body: "1rem"
    size_sm: "0.875rem"
    size_lg: "1.125rem"
  spacing:
    xs: "4px"
    sm: "8px"
    md: "16px"
    lg: "24px"
  border_radius:
    sm: "4px"
    md: "8px"
    base: "12px"
  breakpoints:
    sm: "640px"
    md: "768px"
    lg: "1024px"
---

# Compras Paraguay — Design System v1.0

> Tokens e padrões do front-end | Fonte: `frontend/app/globals.css`, Tailwind, acessibilidade

---

## 1. Filosofia de design

O site Compras Paraguay prioriza **clareza e confiança** para busca de ofertas:

- **Foco na busca:** Interface limpa; filtros (categoria, loja, preço) e resultados em destaque.
- **Preços em PYG:** Moeda única na interface; sem distração.
- **Locale es-PY (e opcional pt):** Conteúdo e labels no idioma do usuário.
- **Acessibilidade:** Contraste WCAG AA, skip link, labels e estados de foco visíveis.
- **Responsivo:** Uso de Tailwind e tokens para mobile-first.

---

## 2. Paleta de cores

### 2.1 Tema claro (default)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text` | `#1a1a1a` | Texto principal, títulos |
| `--color-text-muted` | `#6b7280` | Texto secundário, placeholders, legendas |
| `--color-border` | `#e5e7eb` | Bordas, divisores, inputs |
| `--color-surface` | `#ffffff` | Fundo da página, cards |
| `--color-primary` | `#059669` | Botões, links, destaque (emerald) |
| `--color-primary-hover` | `#047857` | Hover em primário |

### 2.2 Tema escuro (prefers-color-scheme: dark)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text` | `#f3f4f6` | Texto principal |
| `--color-text-muted` | `#9ca3af` | Texto secundário |
| `--color-border` | `#374151` | Bordas |
| `--color-surface` | `#111827` | Fundo |
| `--color-primary` | `#10b981` | Primário |
| `--color-primary-hover` | `#34d399` | Hover primário |

### 2.3 Contraste (WCAG)

| Combinação | Objetivo |
|------------|----------|
| text / surface | AA ou superior |
| text-muted / surface | AA para texto secundário |
| primary / surface | AA para botões e links |

---

## 3. Tipografia

### 3.1 Font stack

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
```

- **Body:** tamanho base 1rem (16px); line-height adequado para leitura.
- **Tailwind:** classes `text-sm`, `text-base`, `text-lg` mapeadas em `tailwind.config.ts` para usar as cores semânticas (`--color-text`, `--color-primary`).

### 3.2 Tamanhos de referência

| Uso | Tamanho | Peso |
|-----|---------|------|
| Body | 1rem (16px) | 400 |
| Small / metadados | 0.875rem (14px) | 400 |
| Lead / destaque | 1.125rem (18px) | 400 |
| Headings | Conforme nível (h1–h6) | 600–700 |

---

## 4. Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Gaps mínimos |
| sm | 8px | Padding interno compacto |
| md | 16px | Padding padrão, entre elementos |
| lg | 24px | Entre blocos, seções |

Tailwind: `p-4`, `gap-4`, `space-y-4`, etc. Alinhado a múltiplos de 4.

---

## 5. Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| sm | 4px | Badges, tags |
| md | 8px | Inputs, botões pequenos |
| base | 12px | Cards, imagens de produto |

---

## 6. Componentes

### 6.1 Botão primário

```css
.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: var(--color-primary-hover);
}
```

### 6.2 Links

- Cor: `var(--color-primary)`.
- Hover: sublinhado ou `var(--color-primary-hover)`.

### 6.3 Cards de produto

- Fundo: `var(--color-surface)`.
- Borda: `var(--color-border)`.
- Border-radius: 12px.
- Imagem: object-fit cover; fallback quando image_url falha (placeholder ou “Sin imagen”).

### 6.4 Formulário (busca, filtros)

- Inputs e selects usam `--color-border`, `--color-text`.
- Focus: outline visível para acessibilidade.

---

## 7. Grid e layout

- **Container:** max-width adequado ao viewport; padding lateral.
- **Lista de resultados:** grid ou lista; responsivo (1 col mobile, 2–3 cols desktop).
- Tailwind: `grid`, `flex`, `container` conforme necessidade.

---

## 8. Breakpoints (referência)

| Token | Valor | Uso |
|-------|-------|-----|
| sm | 640px | Mobile landscape / tablet |
| md | 768px | Tablet |
| lg | 1024px | Desktop |

Mobile-first; media queries quando necessário.

---

## 9. Acessibilidade

| Critério | Implementação |
|----------|----------------|
| Contraste | Cores texto/superfície e primary/superfície atendem WCAG AA |
| Skip link | Classe `.sr-only` com `.focus\:not-sr-only:focus` para “Pular para conteúdo” |
| Focus visible | Estados de foco visíveis em links e botões |
| Labels | Inputs e filtros com labels associados |
| Empty state | Mensagem clara quando não há resultados de busca |
| Imagens | Alt ou fallback “Sin imagen” quando a imagem falha |

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.sr-only.focus\:not-sr-only:focus {
  position: fixed;
  width: auto;
  height: auto;
  padding: inherit;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## 10. CSS custom properties (completo)

Definidas em `frontend/app/globals.css`:

```css
:root {
  --color-text: #1a1a1a;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-surface: #ffffff;
  --color-primary: #059669;
  --color-primary-hover: #047857;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f3f4f6;
    --color-text-muted: #9ca3af;
    --color-border: #374151;
    --color-surface: #111827;
    --color-primary: #10b981;
    --color-primary-hover: #34d399;
  }
}
```

---

## 11. Referências

- **Tokens no código:** `frontend/app/globals.css`
- **Tailwind:** `frontend/tailwind.config.ts` (cores mapeadas para os tokens)
- **Contrato de UI:** componentes em `frontend/app/[locale]/buscar/` (BuscarClient, etc.)
- **Template de referência:** `C:\Users\Crypto\apple.md` (estrutura deste doc)

---

*Compras Paraguay — paraguay-shopping-search (Congnittusai) | Design system v1.0*
