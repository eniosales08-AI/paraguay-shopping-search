import { describe, it, expect } from 'vitest'
import { search, getCatalog } from '../lib/catalog-search'

describe('getCatalog', () => {
  it('retorna array', () => {
    const catalog = getCatalog()
    expect(Array.isArray(catalog)).toBe(true)
  })
})

describe('search', () => {
  it('retorna resultado com estrutura correta', () => {
    const result = search({ q: '' })
    expect(result).toHaveProperty('results')
    expect(result).toHaveProperty('total')
    expect(result).toHaveProperty('page')
    expect(result).toHaveProperty('limit')
    expect(result).toHaveProperty('facets')
    expect(result.facets).toHaveProperty('categories')
    expect(result.facets).toHaveProperty('stores')
    expect(result.facets).toHaveProperty('price_range')
  })

  it('pagina 1 por padrao', () => {
    const result = search({})
    expect(result.page).toBe(1)
  })

  it('limita maximo 50 por pagina', () => {
    const result = search({ limit: 100 })
    expect(result.limit).toBeLessThanOrEqual(50)
  })

  it('limita minimo 1 por pagina', () => {
    const result = search({ limit: 0 })
    expect(result.limit).toBeGreaterThanOrEqual(1)
  })

  it('filtra por query quando catalogo tem dados', () => {
    const catalog = getCatalog()
    if (catalog.length > 0) {
      const firstTitle = catalog[0].title
      const result = search({ q: firstTitle })
      expect(result.total).toBeGreaterThanOrEqual(1)
    }
  })

  it('ordena por preco ascendente', () => {
    const result = search({ sort: 'price_asc' })
    if (result.results.length >= 2) {
      expect(result.results[0].price_pyg).toBeLessThanOrEqual(result.results[1].price_pyg)
    }
  })

  it('ordena por preco descendente', () => {
    const result = search({ sort: 'price_desc' })
    if (result.results.length >= 2) {
      expect(result.results[0].price_pyg).toBeGreaterThanOrEqual(result.results[1].price_pyg)
    }
  })
})
