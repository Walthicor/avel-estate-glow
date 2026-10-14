import type { UIKey } from "../i18n/en";

export type NavItem = { key: UIKey; path: string };

export const MAIN_NAV: NavItem[] = [
  { key: "nav.properties", path: "/properties" },
  { key: "nav.collections", path: "/collections" },
  { key: "nav.buyingFromAbroad", path: "/buying-from-abroad" },
  { key: "nav.guides", path: "/guides" },
  { key: "nav.about", path: "/about" },
];

export const FOOTER_CITIES: { label: string; path: string; key?: string }[] = [
  { label: "Medellín", path: "/cities/medellin" },
  { label: "Cartagena", path: "/cities/cartagena" },
  { label: "Bogotá", path: "/cities/bogota" },
  { label: "Santa Marta", path: "/cities/santa-marta" },
  { label: "Cali", path: "/contact", key: "cali" },
  { label: "Popayán", path: "/contact", key: "popayan" },
  { label: "Eje Cafetero", path: "/contact", key: "eje-cafetero" },
];

export const FOOTER_COMPANY: NavItem[] = [
  { key: "nav.about", path: "/about" },
  { key: "nav.guides", path: "/guides" },
  { key: "nav.contact", path: "/contact" },
];

export const FOOTER_LEGAL: { key: UIKey; path: string }[] = [
  { key: "footer.privacy", path: "/legal/privacy" },
  { key: "footer.terms", path: "/legal/terms" },
  { key: "footer.cookies", path: "/legal/cookies" },
  { key: "footer.habeasData", path: "/legal/habeas-data" },
];
