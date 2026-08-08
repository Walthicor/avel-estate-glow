import type { Locale } from "../config/site";
import {
  PROPERTIES,
  imageFor,
  type PropertyRecord,
} from "./properties";
import { PROPERTY_IMAGES, COLLECTION_IMAGES } from "./home";

/** Deterministic pseudo-random from a slug so SSR and client agree. */
function hash(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

const GALLERY_POOL = [...PROPERTY_IMAGES, ...COLLECTION_IMAGES];

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  medellin: { lat: 6.2088, lng: -75.5674 },
  cartagena: { lat: 10.4236, lng: -75.5464 },
  bogota: { lat: 4.6663, lng: -74.0536 },
  "santa-marta": { lat: 11.2076, lng: -74.2103 },
};

const DEVELOPERS = ["Arquitectura Andina", "Grupo Meridiano", "Costa Norte Desarrollos", "Estudio Vértice"];

export type PropertyDetail = {
  record: PropertyRecord;
  slug: string;
  heroImage: string;
  gallery: string[];
  floorplans: string[];
  videoYoutubeId: string | null;
  bathroomsMin: number;
  bathroomsMax: number;
  parking: number;
  floors: number;
  developer: string;
  reference: string;
  lat: number | null;
  lng: number | null;
  priceOnRequest: true;
};

export function getPropertyDetail(slug: string): PropertyDetail | null {
  const record = PROPERTIES.find((p) => p.slug === slug);
  if (!record) return null;
  const h = hash(slug);
  const start = h % GALLERY_POOL.length;
  const gallery = Array.from({ length: 6 }, (_, i) => GALLERY_POOL[(start + i) % GALLERY_POOL.length]!);
  const coords = CITY_COORDS[record.city] ?? null;

  return {
    record,
    slug,
    heroImage: imageFor(record),
    gallery: [imageFor(record), ...gallery.filter((g) => g !== imageFor(record)).slice(0, 5)],
    floorplans: [GALLERY_POOL[(start + 7) % GALLERY_POOL.length]!, GALLERY_POOL[(start + 8) % GALLERY_POOL.length]!],
    videoYoutubeId: null,
    bathroomsMin: Math.max(1, record.bedroomsMin),
    bathroomsMax: Math.max(1, record.bedroomsMax),
    parking: 1 + (h % 2),
    floors: 8 + (h % 22),
    developer: DEVELOPERS[h % DEVELOPERS.length]!,
    reference: `AVL-${record.city.slice(0, 3).toUpperCase()}-${String(1000 + (h % 8999))}`,
    lat: coords ? coords.lat : null,
    lng: coords ? coords.lng : null,
    priceOnRequest: true,
  };
}

export const featuresFor = (d: PropertyDetail, locale: Locale): string[] => {
  const en = [
    "Rooftop pool and sun deck",
    "24/7 concierge and controlled access",
    "Co-working lounge with fibre internet",
    "Gym and wellness area",
    "Back-up power and water storage",
    "Private parking with visitor bays",
    d.record.str ? "Licensed for short-term rental" : "Pet friendly building",
    "Landscaped social terrace",
  ];
  const es = [
    "Piscina en la azotea y solárium",
    "Portería 24/7 y acceso controlado",
    "Sala de co-working con internet de fibra",
    "Gimnasio y zona de bienestar",
    "Planta eléctrica y tanque de reserva",
    "Parqueadero privado y bahías de visitantes",
    d.record.str ? "Habilitado para renta corta" : "Edificio pet friendly",
    "Terraza social con paisajismo",
  ];
  return locale === "es" ? es : en;
};

export const descriptionFor = (d: PropertyDetail, locale: Locale): string[] => {
  const p = d.record;
  if (locale === "es") {
    return [
      `${p.titleEn} es un proyecto de ${p.typeEs.toLowerCase()} en ${p.zone}, ${p.cityLabel}, con unidades entre ${p.areaMin} y ${p.areaMax} m². El edificio fue diseñado para propietarios internacionales: acabados listos para habitar, administración profesional y documentación en orden desde el primer día.`,
      `Las unidades ofrecen entre ${p.bedroomsMin} y ${p.bedroomsMax} habitaciones, con ventanales de piso a techo y áreas sociales abiertas. ${p.delivery ? `La entrega está prevista para ${p.delivery}.` : "El inmueble está listo para entrega inmediata."} ${p.str ? "El uso de renta corta está permitido por el reglamento de propiedad horizontal." : ""}`,
      "Acompañamos todo el proceso a distancia: verificación de títulos, poder notarial, apertura de cuenta y registro de la inversión extranjera ante el Banco de la República.",
    ];
  }
  return [
    `${p.titleEn} is ${/^[aeiou]/i.test(p.typeEn) ? "an" : "a"} ${p.typeEn.toLowerCase()} project in ${p.zone}, ${p.cityLabel}, with units between ${p.areaMin} and ${p.areaMax} m². The building was designed with international owners in mind: move-in finishes, professional administration and clean paperwork from day one.`,
    `Units offer ${p.bedroomsMin} to ${p.bedroomsMax} bedrooms, floor-to-ceiling glazing and open social areas. ${p.delivery ? `Delivery is scheduled for ${p.delivery}.` : "The property is ready for immediate handover."} ${p.str ? "Short-term rental is permitted under the building bylaws." : ""}`,
    "We run the whole process remotely: title verification, power of attorney, bank account opening and registration of the foreign investment with Banco de la República.",
  ];
};

export const zoneParagraph = (d: PropertyDetail, locale: Locale): string => {
  const p = d.record;
  return locale === "es"
    ? `${p.zone} es uno de los sectores más consolidados de ${p.cityLabel}: cafés, restaurantes, supermercados y transporte a pocos minutos a pie. Mostramos la ubicación aproximada por privacidad; la dirección exacta se comparte durante la visita o la reserva.`
    : `${p.zone} is one of the most established sectors in ${p.cityLabel}: cafés, restaurants, supermarkets and transport within a short walk. We show an approximate location for privacy; the exact address is shared during the viewing or reservation.`;
};

export const similarProperties = (d: PropertyDetail) =>
  PROPERTIES.filter((p) => p.city === d.record.city && p.slug !== d.slug)
    .sort((a, b) => b.order - a.order)
    .slice(0, 3);

export type DetailCopy = {
  priceOnRequest: string;
  specs: Record<
    "area" | "bedrooms" | "bathrooms" | "parking" | "floors" | "delivery" | "developer" | "stage" | "reference",
    string
  >;
  requestPrice: string;
  videoTour: string;
  amenities: string;
  location: string;
  approximate: string;
  floorplans: string;
  pathHeading: string;
  pathBody: string;
  pathLink: string;
  similar: string;
  requestDetails: string;
  gallery: { open: string; close: string; prev: string; next: string; slide: (i: number, n: number) => string };
  meta: (p: PropertyRecord) => { title: string; description: string };
};

export const DETAIL_COPY: Record<Locale, DetailCopy> = {
  en: {
    priceOnRequest: "Price on request",
    specs: {
      area: "Area",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      parking: "Parking",
      floors: "Floors",
      delivery: "Delivery",
      developer: "Developer",
      stage: "Stage",
      reference: "Reference",
    },
    requestPrice: "Request price and availability",
    videoTour: "Schedule a video tour",
    amenities: "Amenities",
    location: "Location",
    approximate: "Approximate location",
    floorplans: "Floorplans",
    pathHeading: "Buying from abroad",
    pathBody: "Six steps, from first call to registered title — handled remotely with power of attorney.",
    pathLink: "See the full buyer path →",
    similar: "Similar properties",
    requestDetails: "Request details",
    gallery: {
      open: "Open gallery",
      close: "Close gallery",
      prev: "Previous image",
      next: "Next image",
      slide: (i, n) => `Image ${i} of ${n}`,
    },
    meta: (p) => ({
      title: `${p.titleEn} — ${p.zone}, ${p.cityLabel} | Price on request`,
      description: `${p.titleEn} in ${p.zone}, ${p.cityLabel}. ${p.areaMin}–${p.areaMax} m², ${p.bedroomsMin}–${p.bedroomsMax} bedrooms. Title-checked and available to remote buyers. Price on request.`,
    }),
  },
  es: {
    priceOnRequest: "Precio a consultar",
    specs: {
      area: "Área",
      bedrooms: "Habitaciones",
      bathrooms: "Baños",
      parking: "Parqueadero",
      floors: "Pisos",
      delivery: "Entrega",
      developer: "Constructora",
      stage: "Etapa",
      reference: "Referencia",
    },
    requestPrice: "Solicitar precio y disponibilidad",
    videoTour: "Agendar tour por video",
    amenities: "Amenidades",
    location: "Ubicación",
    approximate: "Ubicación aproximada",
    floorplans: "Planos",
    pathHeading: "Comprar desde el exterior",
    pathBody: "Seis pasos, de la primera llamada al título registrado — todo a distancia con poder notarial.",
    pathLink: "Ver el proceso completo →",
    similar: "Propiedades similares",
    requestDetails: "Solicitar información",
    gallery: {
      open: "Abrir galería",
      close: "Cerrar galería",
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      slide: (i, n) => `Imagen ${i} de ${n}`,
    },
    meta: (p) => ({
      title: `${p.titleEn} — ${p.zone}, ${p.cityLabel} | Precio a consultar`,
      description: `${p.titleEn} en ${p.zone}, ${p.cityLabel}. ${p.areaMin}–${p.areaMax} m², ${p.bedroomsMin}–${p.bedroomsMax} habitaciones. Con estudio de títulos y disponible para compradores remotos. Precio a consultar.`,
    }),
  },
};
