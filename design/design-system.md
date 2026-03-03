# Design System — Paraguay Shopping Search

**Task:** designUiSystem()  
**UX Designer** — destino: implementFrontend()  
**Objetivo:** Site moderno, sofisticado e acessível para o mercado paraguaio.

---

## 1. Tokens de design

### Cores (modo claro — base)
| Token | Valor | Uso |
|-------|--------|-----|
| `--color-bg` | #FAFAFA | Fundo principal |
| `--color-surface` | #FFFFFF | Cards, inputs |
| `--color-border` | #E4E4E7 | Bordas |
| `--color-text` | #18181B | Texto principal |
| `--color-text-muted` | #71717A | Texto secundário |
| `--color-primary` | #4338CA | Botões, links, destaque |
| `--color-primary-hover` | #6366F1 | Hover |
| `--color-accent` | #22D3EE | Destaque secundário (badges, preço) |

### Tipografia
- **Font sans:** Inter ou system-ui (fallback).
- **Font display (logo/títulos):** Syne ou similar.
- **Escala:** 12px (small), 14px (body), 16px (base), 18px (lead), 24px (h3), 32px (h2), 40px (h1).
- **Peso:** 400 (body), 500 (medium), 600 (semibold), 700 (bold).

### Espaçamento
- **Base:** 4px. Escala: 4, 8, 12, 16, 24, 32, 48, 64.
- **Container:** max-width 1280px, padding 24px.

### Bordas e sombras
- **Radius:** 8px (cards), 12px (modais), 9999px (pills).
- **Shadow:** 0 1px 3px rgba(0,0,0,0.08); 0 4px 12px rgba(0,0,0,0.08) para cards.

---

## 2. Componentes principais

### Busca (header)
- Input de busca: altura 48px, radius 12px, ícone à esquerda, placeholder "Buscar productos... (es-PY)".
- Botão "Buscar" ou submit no teclado.

### Card de produto
- Imagem (aspect-ratio 1:1), título (2 linhas max), preço em **PYG** (formatado, ex.: "185.000 Gs"), nome da loja, link "Ver en tienda".
- Hover: leve sombra e transição.

### Lista de resultados
- Grid responsivo: 1 col (mobile), 2–3 (tablet), 4 (desktop).
- Facetas (filtros) em sidebar ou drawer no mobile: categorias, lojas, faixa de preço.

### Acessibilidade
- Contraste mínimo 4.5:1 (texto normal), 3:1 (texto grande).
- Foco visível em todos os interativos (outline 2px primary).
- Labels em inputs; aria-labels onde necessário.
- Navegação por teclado funcional.

### Responsividade
- Breakpoints sugeridos: 640px, 768px, 1024px, 1280px.
- Touch targets ≥ 44px no mobile.

---

## 3. Páginas

- **Home:** Busca em destaque + categorias populares (opcional).
- **Resultados:** Barra de busca, filtros (facetas), grid de cards, paginação.
- **Detalhe (opcional nesta fase):** Redirecionar para URL da loja (afiliado).

---

## 4. designAssetsRef

- Tokens em CSS custom properties (este doc); sem protótipos Figma por ora.
- Frontend Engineer pode gerar `design-tokens.css` a partir desta spec.
