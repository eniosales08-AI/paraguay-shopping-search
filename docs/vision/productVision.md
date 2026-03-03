# Visão de produto — Site de buscas de compras do Paraguai

**Squad:** paraguay-shopping-search  
**Responsável:** Product Owner  
**Data:** 2026-03-03  
**Status:** Aprovado para pipeline (ingestão → busca → API → front-end → deploy → QA)

---

## 1. Objetivo do produto

Construir o **melhor site de buscas de compras para o mercado paraguaio**: moderno, funcional, rápido e com boa experiência de uso. O site agrega ofertas e preços de fontes existentes (ex.: Compras Paraguay e outras), permitindo ao usuário comparar e encontrar onde comprar, respeitando sempre **compliance** (ToS, robots.txt e APIs oficiais).

**Em uma frase:** Um comparador de preços / buscador de compras focado no Paraguai, com agregação ética de dados, busca relevante, API sólida e front-end de qualidade.

---

## 2. Escopo (in scope)

| Área | Descrição |
|------|-----------|
| **Agregação de dados** | Ingestão e normalização de catálogo a partir de fontes permitidas (ver seção 5). |
| **Motor de busca** | Indexação, queries, filtros (categoria, preço, loja) e relevância para o catálogo. |
| **Backend / API** | API REST (ou GraphQL) documentada (OpenAPI), com cache para consultas quentes. |
| **Front-end** | Site Next.js/React, responsivo, acessível, rápido (Core Web Vitals), em es-PY e PYG. |
| **SEO e localização** | SEO para Paraguai, locale es-PY, moeda PYG, meta tags e estrutura para descoberta. |
| **Deploy e operação** | CI/CD, hospedagem (ex.: Vercel), monitoramento e observabilidade. |
| **Qualidade** | Gates de qualidade: E2E, performance, acessibilidade, relatórios acionáveis. |

**Monetização (visão de negócio):** Afiliados/CPA, anúncios (CPC/CPM) e eventual destaque pago para lojas. A implementação técnica (links de afiliado, slots de anúncios) será tratada no escopo de produto após a base do site estar estável.

---

## 3. Prioridades do pipeline

Ordem de execução acordada para o squad:

1. **defineProductVision** (esta visão) → documento de visão e compliance.
2. **ingestAndNormalizeCatalog** → schema unificado e dados normalizados (fontes permitidas).
3. **buildSearchEngine** → motor de busca e contrato de índice.
4. **buildBackendApi** → especificação e implementação da API.
5. **designUiSystem** e **planSeoLocalization** (paralelo) → design system + especificação SEO/localização.
6. **implementFrontend** → front-end consumindo API, design system e SEO.
7. **setupDeployAndMonitor** → deploy e monitoramento.
8. **runQualityGates** → gates de qualidade e relatório.

Prioridade de produto: **dados e busca primeiro**, depois API e experiência do usuário (UI/UX + SEO), por último escala e qualidade contínua.

---

## 4. Escopo (fora de scope nesta fase)

- Operação de loja própria (não somos e-commerce, somos agregador/comparador).
- Pagamentos no site (redirecionamento para lojas/afiliados).
- Apps nativos (mobile) — apenas web responsiva nesta fase.
- Fontes de dados não listadas na seção 5 ou que violem ToS/robots.txt.

---

## 5. Fontes de dados e compliance

### 5.1 Princípios

- **Agregação ética e legal:** Respeitar sempre os Termos de Serviço (ToS), robots.txt e preferir APIs oficiais quando existirem.
- **Documentação:** As fontes permitidas e as restrições de uso devem estar documentadas e acessíveis ao Data Engineer e ao time.
- **Rate limiting:** Qualquer coleta automatizada deve usar rate limiting e carregar apenas o necessário, sem sobrecarregar os servidores de origem.

### 5.2 Fontes desejadas (iniciais)

| Fonte | Tipo preferido | Observação |
|-------|----------------|------------|
| **Compras Paraguay** (e sites similares) | API oficial se disponível; caso contrário, verificar ToS e robots.txt antes de qualquer scraping. | Referência explícita do usuário; priorizar acordo ou API. |
| Outras fontes paraguaias ou regionais | APIs, feeds ou scraping só após validação de ToS e robots.txt. | Product Owner deve aprovar novas fontes antes de ingestão. |

### 5.3 Regras obrigatórias para o Data Engineer

- **Antes de implementar ingestão** de uma nova fonte: verificar ToS, robots.txt e preferir API/feed oficial.
- **Não** usar scraping em domínios que proíbam explicitamente (ToS ou robots.txt).
- **Documentar** cada fonte: URL, método (API/feed/scraping), restrições e data da última verificação.
- **Normalização:** Schema unificado; moeda PYG; locale es-PY; campos mínimos: título, descrição, preço, loja, categoria, URL de origem.

### 5.4 Rastreabilidade

- Manter lista de fontes em `docs/vision/sources.md` (ou equivalente) atualizada quando novas fontes forem aprovadas ou descontinuadas.

---

## 6. Entregáveis para o pipeline

| Consumidor | Artefato / uso |
|------------|-----------------|
| **Data Engineer** | Este documento + seção 5 (fontes e compliance); `sources.md` quando existir. |
| **Search Engineer** | Escopo de dados (catálogo normalizado); prioridade de relevância e filtros. |
| **Backend Engineer** | Escopo da API (busca, filtros, cache); requisitos de performance. |
| **UX Designer / Frontend Engineer** | Objetivo do produto, locale es-PY, PYG; foco em comparação e descoberta. |
| **SEO Specialist** | Mercado Paraguai, es-PY, PYG; objetivos de descoberta e meta tags. |
| **DevOps / QA** | Escopo de deploy, monitoramento e critérios de qualidade. |

---

## 7. Metadados (visionMetadata)

- **version:** 1.0.0  
- **created_at:** 2026-03-03  
- **author:** paraguay-shopping-search (Product Owner)  
- **next_task:** ingestAndNormalizeCatalog (Data Engineer)

---

*Documento gerado pela task defineProductVision(). Próximo passo: Data Engineer — ingestAndNormalizeCatalog usando fontes e regras acima.*
