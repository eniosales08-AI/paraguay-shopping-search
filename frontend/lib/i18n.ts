/**
 * i18n — Paraguay Shopping Search
 * Idioma principal: Português (pt) — brasileiros são a maioria dos compradores.
 * Demais: es (Español), en (English), gn (Guarani / Avañe'ẽ).
 */

export const locales = ["pt", "es", "en", "gn"] as const;
export type Locale = (typeof locales)[number];

/** Idioma principal: português. Usado na primeira visita (/) e como fallback. */
export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  es: "Español",
  en: "English",
  gn: "Avañe'ẽ",
};

export const localeHreflang: Record<Locale, string> = {
  pt: "pt-BR",
  es: "es-PY",
  en: "en",
  gn: "gn",
};

type Translations = {
  homeTitle: string;
  homeSubtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  searchAria: string;
  examples: string;
  backHome: string;
  resultsCount: string;
  resultsFor: string;
  noResults: string;
  sortLabel: string;
  sortRelevance: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortNewest: string;
  categoryLabel: string;
  categoryAll: string;
  storeLabel: string;
  storeAll: string;
  pagePrev: string;
  pageNext: string;
  pageOf: string;
  loading: string;
  errorMessage: string;
  retry: string;
  currencySuffix: string;
  sinImagen: string;
};

export const translations: Record<Locale, Translations> = {
  pt: {
    homeTitle: "Comparador de preços Paraguai",
    homeSubtitle: "Pesquise ofertas e compare preços em guaranis (Gs)",
    searchPlaceholder: "Buscar produtos...",
    searchButton: "Buscar",
    searchAria: "Buscar produtos",
    examples: "Exemplos:",
    backHome: "← Início",
    resultsCount: "resultado(s)",
    resultsFor: "para",
    noResults: "Nenhum resultado.",
    sortLabel: "Ordenar",
    sortRelevance: "Relevância",
    sortPriceAsc: "Preço: menor a maior",
    sortPriceDesc: "Preço: maior a menor",
    sortNewest: "Mais recentes",
    categoryLabel: "Categoria",
    categoryAll: "Todas",
    storeLabel: "Loja",
    storeAll: "Todas",
    pagePrev: "Anterior",
    pageNext: "Próxima",
    pageOf: "Página",
    loading: "Carregando...",
    errorMessage: "Erro ao carregar. Verifique se a API está disponível.",
    retry: "Tentar novamente",
    currencySuffix: " Gs",
    sinImagen: "Sem imagem",
  },
  es: {
    homeTitle: "Comparador de precios Paraguay",
    homeSubtitle: "Buscá ofertas y compará precios en guaraníes (Gs)",
    searchPlaceholder: "Buscar productos...",
    searchButton: "Buscar",
    searchAria: "Buscar productos",
    examples: "Ejemplos:",
    backHome: "← Inicio",
    resultsCount: "resultado(s)",
    resultsFor: "para",
    noResults: "Ningún resultado.",
    sortLabel: "Ordenar",
    sortRelevance: "Relevancia",
    sortPriceAsc: "Precio: menor a mayor",
    sortPriceDesc: "Precio: mayor a menor",
    sortNewest: "Más recientes",
    categoryLabel: "Categoría",
    categoryAll: "Todas",
    storeLabel: "Tienda",
    storeAll: "Todas",
    pagePrev: "Anterior",
    pageNext: "Siguiente",
    pageOf: "Página",
    loading: "Cargando...",
    errorMessage: "Error al cargar. Verificá que la API esté disponible.",
    retry: "Reintentar",
    currencySuffix: " Gs",
    sinImagen: "Sin imagen",
  },
  en: {
    homeTitle: "Paraguay Price Comparator",
    homeSubtitle: "Search deals and compare prices in guaraníes (Gs)",
    searchPlaceholder: "Search products...",
    searchButton: "Search",
    searchAria: "Search products",
    examples: "Examples:",
    backHome: "← Home",
    resultsCount: "result(s)",
    resultsFor: "for",
    noResults: "No results.",
    sortLabel: "Sort by",
    sortRelevance: "Relevance",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",
    sortNewest: "Newest",
    categoryLabel: "Category",
    categoryAll: "All",
    storeLabel: "Store",
    storeAll: "All",
    pagePrev: "Previous",
    pageNext: "Next",
    pageOf: "Page",
    loading: "Loading...",
    errorMessage: "Error loading. Check that the API is available.",
    retry: "Retry",
    currencySuffix: " Gs",
    sinImagen: "No image",
  },
  gn: {
    homeTitle: "Paraguai hepy joaju",
    homeSubtitle: "Eheka oferta ha ejoaju hepy guaraníme (Gs)",
    searchPlaceholder: "Eheka tembiapo...",
    searchButton: "Eheka",
    searchAria: "Eheka tembiapo",
    examples: "Techapyrã:",
    backHome: "← Ñepyrũ",
    resultsCount: "jeporeka",
    resultsFor: "pegua",
    noResults: "Ndaipóri jeporeka.",
    sortLabel: "Ñemohenda",
    sortRelevance: "Oĩva",
    sortPriceAsc: "Hepy: michĩ guive tuichave",
    sortPriceDesc: "Hepy: tuichave guive michĩ",
    sortNewest: "Pyahuve",
    categoryLabel: "Ñemohenda",
    categoryAll: "Opavavé",
    storeLabel: "Ñemuha",
    storeAll: "Opavavé",
    pagePrev: "Mboyve",
    pageNext: "Upeigua",
    pageOf: "Kuatiarogue",
    loading: "Henyhẽ...",
    errorMessage: "Oiko jejavy. Ehechajey API oĩpa.",
    retry: "Eha'ãjey",
    currencySuffix: " Gs",
    sinImagen: "Ta'ãnga'ỹ",
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function isValidLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}
