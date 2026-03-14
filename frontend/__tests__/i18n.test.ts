import { describe, it, expect } from 'vitest'
import { isValidLocale, getLocale, getTranslations } from '../lib/i18n'

describe('isValidLocale', () => {
  it('aceita "es"', () => expect(isValidLocale('es')).toBe(true))
  it('aceita "pt"', () => expect(isValidLocale('pt')).toBe(true))
  it('rejeita "en"', () => expect(isValidLocale('en')).toBe(false))
  it('rejeita string vazia', () => expect(isValidLocale('')).toBe(false))
})

describe('getLocale', () => {
  it('retorna locale valido', () => expect(getLocale('pt')).toBe('pt'))
  it('retorna "es" como fallback para null', () => expect(getLocale(null)).toBe('es'))
  it('retorna "es" como fallback para undefined', () => expect(getLocale(undefined)).toBe('es'))
  it('retorna "es" como fallback para invalido', () => expect(getLocale('fr')).toBe('es'))
})

describe('getTranslations', () => {
  it('retorna traducoes ES', () => {
    const t = getTranslations('es')
    expect(t.siteTitle).toBe('Compras Paraguay')
    expect(t.searchButton).toBe('Buscar')
    expect(t.loading).toBe('Cargando…')
  })

  it('retorna traducoes PT', () => {
    const t = getTranslations('pt')
    expect(t.siteTitle).toBe('Compras Paraguay')
    expect(t.searchButton).toBe('Buscar')
    expect(t.loading).toBe('Carregando…')
  })

  it('ES e PT tem as mesmas chaves', () => {
    const es = getTranslations('es')
    const pt = getTranslations('pt')
    const keysEs = Object.keys(es).sort()
    const keysPt = Object.keys(pt).sort()
    expect(keysEs).toEqual(keysPt)
  })

  it('nenhuma traducao esta vazia', () => {
    for (const locale of ['es', 'pt'] as const) {
      const t = getTranslations(locale)
      for (const [key, value] of Object.entries(t)) {
        expect(value.length, `${locale}.${key} esta vazio`).toBeGreaterThan(0)
      }
    }
  })
})
