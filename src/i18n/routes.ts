import type { Locale } from "../config/site";

/** EN segment → ES segment. EN is the canonical key. */
export const ROUTE_SEGMENTS = {
  properties: "propiedades",
  cities: "ciudades",
  collections: "colecciones",
  guides: "guias",
  about: "nosotros",
  contact: "contacto",
  "buying-from-abroad": "comprar-desde-el-exterior",
  legal: "legal",
} as const;

export type EnSegment = keyof typeof ROUTE_SEGMENTS;

export const ES_TO_EN: Record<string, EnSegment> = Object.entries(ROUTE_SEGMENTS).reduce(
  (acc, [en, esSeg]) => {
    acc[esSeg] = en as EnSegment;
    return acc;
  },
  {} as Record<string, EnSegment>,
);

const translateSegment = (segment: string, locale: Locale) => {
  if (locale === "es") return ROUTE_SEGMENTS[segment as EnSegment] ?? segment;
  return ES_TO_EN[segment] ?? segment;
};

/** Normalize any path (EN or ES) to its canonical EN path, e.g. '/es/propiedades' → '/properties'. */
export function toEnglishPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "es") parts.shift();
  const en = parts.map((p) => ES_TO_EN[p] ?? p);
  return "/" + en.join("/");
}

/** Build the path for a locale from a canonical EN path. */
export function pathForLocale(enPath: string, locale: Locale): string {
  const parts = enPath.split("/").filter(Boolean);
  if (locale === "en") return "/" + parts.join("/");
  const translated = parts.map((p) => translateSegment(p, "es"));
  return "/" + ["es", ...translated].join("/");
}

/** Locale implied by a pathname. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}
