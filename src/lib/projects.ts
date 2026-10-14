import type { Locale } from "../config/site";

export type Project = {
  id: string;
  slug: string;
  name: string;
  city: string;
  department: string;
  type: string;
  area_m2: number | null;
  year: number | null;
  team_role: string;
  status: string;
  tagline: string;
  description: string;
  main_photo: string | null;
  sketch: string | null;
  gallery: string[];
  services: string[];
  lat: number | null;
  lng: number | null;
  sort_order: number;
  published: boolean;
};

export type ProjectNeighbor = { slug: string; name: string; main_photo: string | null };

export const PROJECT_TYPES = ["Residencial", "Corporativo", "Comercial"] as const;
export const PROJECT_STATUSES = ["Entregado", "En obra", "En desarrollo"] as const;
export const PROJECT_SERVICES = [
  "Diseño arquitectónico",
  "Diseño estructural",
  "Diseño eléctrico",
  "Diseño hidrosanitario",
  "Presupuesto",
  "Cronograma",
  "Gerencia de obra",
] as const;

const EN: Record<string, string> = {
  Residencial: "Residential",
  Corporativo: "Corporate",
  Comercial: "Commercial",
  Entregado: "Delivered",
  "En obra": "Under construction",
  "En desarrollo": "In development",
  "Diseño arquitectónico": "Architectural design",
  "Diseño estructural": "Structural design",
  "Diseño eléctrico": "Electrical design",
  "Diseño hidrosanitario": "Plumbing design",
  Presupuesto: "Budget",
  Cronograma: "Schedule",
  "Gerencia de obra": "Construction management",
};

/** Translate a stored (Spanish) enum value for display. */
export const tr = (v: string, locale: Locale) => (locale === "en" ? (EN[v] ?? v) : v);

export const projectPath = (slug: string, locale: Locale) =>
  locale === "es" ? `/es/arquitectura/proyectos/${slug}` : `/architecture/projects/${slug}`;

export const PROJECT_COPY = {
  es: {
    all: "Todos los proyectos",
    hint: "Arrastra para comparar · Desplázate ↓",
    type: "Tipo",
    city: "Ciudad",
    area: "Área (m²)",
    year: "Año",
    status: "Estado",
    about: "Sobre el proyecto",
    gallery: "Galería",
    did: "Lo que hicimos",
    role: "Rol del equipo",
    prev: "Proyecto anterior",
    next: "Siguiente proyecto",
    cta: "¿Tienes un proyecto parecido? \n Cotízalo en 3 minutos.",
    ctaBtn: "Ir al cotizador",
    listTitle: "Proyectos",
    listIntro: "Obras diseñadas y construidas por AVEL Arquitectura en Colombia.",
    lb: { close: "Cerrar", prev: "Anterior", next: "Siguiente", slide: (i: number, n: number) => `Foto ${i} de ${n}` },
  },
  en: {
    all: "All projects",
    hint: "Drag to compare · Scroll ↓",
    type: "Type",
    city: "City",
    area: "Area (m²)",
    year: "Year",
    status: "Status",
    about: "About the project",
    gallery: "Gallery",
    did: "What we did",
    role: "Team role",
    prev: "Previous project",
    next: "Next project",
    cta: "Have a similar project? \n Get a quote in 3 minutes.",
    ctaBtn: "Get a quote",
    listTitle: "Projects",
    listIntro: "Work designed and built by AVEL Arquitectura across Colombia.",
    lb: { close: "Close", prev: "Previous", next: "Next", slide: (i: number, n: number) => `Photo ${i} of ${n}` },
  },
} as const;
