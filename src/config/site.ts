export const SITE = {
  domain: "avelestates.com",
  url: "https://avelestates.com",
  name: "AVEL Estates",
  legalName: "AVEL Inmobiliaria",
  publicEmail: "info@avelestates.com",
  notifyEmail: "avelinmobiliaria@gmail.com",
  fromEmail: "noreply@avelestates.com",
  phone: "",
  defaultLocale: "en",
  locales: ["en", "es"] as const,
} as const;

export type Locale = (typeof SITE.locales)[number];
