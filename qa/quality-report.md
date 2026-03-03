# Quality Report — Paraguay Shopping Search

**Task:** runQualityGates()  
**QA Engineer** — E2E, performance, acessibilidade, SEO.

---

## deployUrl (entrada)

- **Local:** http://localhost:3000 (ejecutar `cd frontend && npm run dev` desde repo root)
- **Producción:** (actualizar tras deploy)

---

## Gates (gateStatus)

| Gate | Criterio | Estado | Notas |
|------|----------|--------|-------|
| **E2E** | Flujo home → buscar → resultados | Pendiente | Ejecutar con Playwright/Cypress cuando deployUrl esté activo |
| **Performance** | Core Web Vitals (LCP, FID, CLS) | Pendiente | Lighthouse sobre deployUrl |
| **A11y** | axe, contraste, teclado | Pendiente | Lighthouse a11y + axe |
| **SEO** | lang=es-PY, meta, JSON-LD, precios PYG | Checklist manual | Ver seo-spec.md |

---

## Checklist SEO (seoSpec)

- [ ] `<html lang="es-PY">`
- [ ] Meta title y description en home y resultados
- [ ] Schema WebSite (JSON-LD) en home
- [ ] Precios mostrados en Gs (PYG)

---

## Recomendación

- **Go para staging:** Cuando E2E, performance y a11y se ejecuten y pasen (o se documenten excepciones).
- **Go para producción:** Tras revisión de negocio y monitoreo activo.

---

*Ejecutar gates con: Lighthouse (Chrome DevTools), axe-core, Playwright. Actualizar este reporte con resultados.*
