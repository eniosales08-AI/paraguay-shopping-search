export type Locale = "es" | "pt";

const DEFAULT_LOCALE: Locale = "es";

const translations: Record<
  Locale,
  Record<
    | "loading"
    | "errorMessage"
    | "sortRelevance"
    | "sortPriceAsc"
    | "sortPriceDesc"
    | "sortNewest"
    | "sortLabel"
    | "categoryLabel"
    | "categoryAll"
    | "storeLabel"
    | "storeAll"
    | "resultsCount"
    | "resultsFor"
    | "sinImagen"
    | "currencySuffix"
    | "pagePrev"
    | "pageOf"
    | "pageNext"
    | "backHome"
    | "searchPlaceholder"
    | "searchButton"
    | "siteTitle"
    | "siteTagline"
    | "goToSearch"
    | "noResults"
    | "skipToContent",
    string
  >
> = {
  es: {
    loading: "Cargando…",
    errorMessage: "No se pudieron cargar los resultados. Intentá de nuevo.",
    sortRelevance: "Relevancia",
    sortPriceAsc: "Precio: menor a mayor",
    sortPriceDesc: "Precio: mayor a menor",
    sortNewest: "Más recientes",
    sortLabel: "Ordenar",
    categoryLabel: "Categoría",
    categoryAll: "Todas",
    storeLabel: "Tienda",
    storeAll: "Todas",
    resultsCount: "resultados",
    resultsFor: "para",
    sinImagen: "Sin imagen",
    currencySuffix: " Gs.",
    pagePrev: "Anterior",
    pageOf: "Página",
    pageNext: "Siguiente",
    backHome: "Volver al inicio",
    searchPlaceholder: "Qué estás buscando…",
    searchButton: "Buscar",
    siteTitle: "Compras Paraguay",
    siteTagline: "Buscá productos y compará precios.",
    goToSearch: "Ir a buscar",
    noResults: "No se encontraron resultados. Probá con otros términos o filtros.",
    skipToContent: "Ir al contenido",
  },
  pt: {
    loading: "Carregando…",
    errorMessage: "Não foi possível carregar os resultados. Tente novamente.",
    sortRelevance: "Relevância",
    sortPriceAsc: "Preço: menor a maior",
    sortPriceDesc: "Preço: maior a menor",
    sortNewest: "Mais recentes",
    sortLabel: "Ordenar",
    categoryLabel: "Categoria",
    categoryAll: "Todas",
    storeLabel: "Loja",
    storeAll: "Todas",
    resultsCount: "resultados",
    resultsFor: "para",
    sinImagen: "Sem imagem",
    currencySuffix: " Gs.",
    pagePrev: "Anterior",
    pageOf: "Página",
    pageNext: "Próxima",
    backHome: "Voltar ao início",
    searchPlaceholder: "O que você está buscando…",
    searchButton: "Buscar",
    siteTitle: "Compras Paraguay",
    siteTagline: "Busque produtos e compare preços.",
    goToSearch: "Ir para busca",
    noResults: "Nenhum resultado encontrado. Tente outros termos ou filtros.",
    skipToContent: "Ir para o conteúdo",
  },
};

export function isValidLocale(value: string): value is Locale {
  return value === "es" || value === "pt";
}

export function getLocale(value: string | null | undefined): Locale {
  if (value && isValidLocale(value)) return value;
  return DEFAULT_LOCALE;
}

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.es;
}
