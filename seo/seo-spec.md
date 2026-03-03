# Especificación SEO y localización — Paraguay Shopping Search

**Task:** planSeoLocalization()  
**SEO Specialist** — destino: implementFrontend(), runQualityGates()  
**Mercado:** Paraguay | **Locale:** es-PY | **Moneda:** PYG

---

## 1. Meta tags por tipo de página

### Homepage
- **title:** "Comparador de precios Paraguay — Buscar ofertas y precios en Gs"
- **description:** "Encontrá los mejores precios en Paraguay. Buscador de ofertas y comparador en guaraníes (Gs). Electrónica, celulares y más."
- **lang:** `es-PY`
- **og:locale:** `es_PY`
- **og:type:** website
- **canonical:** URL absoluta de la homepage

### Página de resultados (búsqueda)
- **title:** "{query} — Precios en Paraguay | [Site name]"
- **description:** "Resultados de búsqueda para {query}. Compará precios en Gs en Paraguay."
- **robots:** index, follow (salvo que sea búsqueda vacía o spam)

### Páginas genéricas
- **lang** siempre `es-PY` en `<html>`.
- **meta charset** UTF-8.

---

## 2. Estructura y contenido

- **h1** único por página: en home "Comparador de precios Paraguay" o similar; en resultados "{query}".
- **URLs:** semánticas, con palabras clave (ej. `/buscar/auriculares-bluetooth`).
- **Navegación:** enlaces internos a categorías y términos populares (opcional).
- **Breadcrumbs:** Home > Buscar > [query] para resultados.

---

## 3. Schema markup (JSON-LD)

### WebSite (home)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[Nombre del sitio]",
  "url": "https://...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://.../buscar?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Product (en resultados / ficha)
- Usar `Product` con `name`, `description`, `offers` (Offer con `price`, `priceCurrency`: "PYG"), `url`.
- Incluir cuando se muestre un producto para rich results.

---

## 4. Localización

- **Idioma:** Español Paraguay (es-PY) en todo el contenido y UI.
- **Moneda:** Siempre mostrar precios en guaraníes (Gs o PYG); formato ej. "185.000 Gs".
- **Formato de fecha:** Preferir formato local paraguayo si se muestra fecha.

---

## 5. Checklist para Frontend y QA

- [ ] `<html lang="es-PY">`
- [ ] Meta title y description únicos por tipo de página
- [ ] Canonical en todas las páginas
- [ ] Schema WebSite en home; Product en listados cuando aplique
- [ ] Precios siempre en PYG con etiqueta clara (Gs)
- [ ] URLs amigables para búsqueda
- [ ] Sitemap y robots.txt (DevOps/implementación)

---

**seoMetadata:** schema_version 1.0; locale es-PY; currency PYG; checklist anterior para runQualityGates().
