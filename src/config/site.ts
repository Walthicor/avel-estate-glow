export const SITE = {
  domain: "avelestates.com",
  url: "https://avelestates.com",
  name: "AVEL Estates",
  legalName: "AVEL Inmobiliaria",
  publicEmail: "info@avelestates.com",
  notifyEmail: "avelinmobiliaria@gmail.com",
  fromEmail: "noreply@avelestates.com",
  phone: "",
  /** Número de WhatsApp en formato internacional sin "+" (ej. 573001234567). Vacío = botón oculto. */
  whatsapp: "",
  advisor: {
    name: "Valentina Restrepo",
    titleEn: "Client Advisor",
    titleEs: "Asesora de clientes",
  },
  social: {
    instagram: "https://www.instagram.com/avelestates",
    linkedin: "https://www.linkedin.com/company/avelestates",
  },
  defaultLocale: "en",
  locales: ["en", "es"] as const,
} as const;

export type Locale = (typeof SITE.locales)[number];
