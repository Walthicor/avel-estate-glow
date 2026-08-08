import type { Locale } from "../config/site";

export type PropertiesCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  filters: {
    city: string;
    type: string;
    area: string;
    bedrooms: string;
    stage: string;
    str: string;
    any: string;
    reset: string;
    to: string;
  };
  count: (n: number) => string;
  sort: { label: string; newest: string; largest: string; smallest: string };
  card: { priceOnRequest: string; str: string; ready: string; pre: string };
  loadMore: string;
  empty: { text: string; link: string };
};

export const PROPERTIES_COPY: Record<Locale, PropertiesCopy> = {
  en: {
    title: "Properties in Colombia — Price on Request",
    description:
      "Browse verified apartments, penthouses and houses in Medellín, Cartagena, Bogotá and Santa Marta. Filter by city, area, bedrooms and delivery stage.",
    heading: "Properties",
    intro:
      "Every listing is title-checked and available to remote buyers. Prices are shared on request.",
    filters: {
      city: "City",
      type: "Type",
      area: "Area (m²)",
      bedrooms: "Bedrooms",
      stage: "Stage",
      str: "Short-term rental approved",
      any: "Any",
      reset: "Reset filters",
      to: "to",
    },
    count: (n) => `${n} ${n === 1 ? "property" : "properties"}`,
    sort: {
      label: "Sort",
      newest: "Newest",
      largest: "Largest area",
      smallest: "Smallest area",
    },
    card: {
      priceOnRequest: "Price on request",
      str: "STR approved",
      ready: "Ready",
      pre: "Pre-construction",
    },
    loadMore: "Load more",
    empty: {
      text: "No properties match these filters yet. Widen the area range, or tell us what you're looking for",
      link: "tell us what you're looking for →",
    },
  },
  es: {
    title: "Propiedades en Colombia — Precio a consultar",
    description:
      "Apartamentos, penthouses y casas verificadas en Medellín, Cartagena, Bogotá y Santa Marta. Filtra por ciudad, área, habitaciones y etapa de entrega.",
    heading: "Propiedades",
    intro:
      "Cada propiedad tiene estudio de títulos y está disponible para compradores remotos. El precio se comparte a solicitud.",
    filters: {
      city: "Ciudad",
      type: "Tipo",
      area: "Área (m²)",
      bedrooms: "Habitaciones",
      stage: "Etapa",
      str: "Apta para renta corta",
      any: "Todas",
      reset: "Limpiar filtros",
      to: "a",
    },
    count: (n) => `${n} ${n === 1 ? "propiedad" : "propiedades"}`,
    sort: {
      label: "Ordenar",
      newest: "Más recientes",
      largest: "Mayor área",
      smallest: "Menor área",
    },
    card: {
      priceOnRequest: "Precio a consultar",
      str: "Apta renta corta",
      ready: "Entrega inmediata",
      pre: "Preventa",
    },
    loadMore: "Cargar más",
    empty: {
      text: "Ninguna propiedad coincide con estos filtros todavía. Amplía el rango de área o cuéntanos qué buscas",
      link: "cuéntanos qué buscas →",
    },
  },
};
