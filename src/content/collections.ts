import type { Locale } from "../config/site";
import type { PropertySearch } from "../lib/property-search";

import strImg from "../assets/collection-rental.jpg";
import preImg from "../assets/collection-preconstruction.jpg";
import pobladoImg from "../assets/property-1.jpg";
import beachImg from "../assets/collection-second-home.jpg";
import readyImg from "../assets/property-3.jpg";
import landImg from "../assets/collection-diversification.jpg";

export type CollectionCopy = {
  name: string;
  seoTitle: string;
  seoDescription: string;
  /** Short thesis: who this collection is for. */
  thesis: string;
  gridHeading: string;
};

export type CollectionRecord = {
  slug: string;
  image: string;
  /** Applied on top of the default search to build the grid. */
  filter: PropertySearch;
  /** Extra client-side narrowing the generic filter cannot express. */
  zones?: string[];
  en: CollectionCopy;
  es: CollectionCopy;
};

export const COLLECTIONS: CollectionRecord[] = [
  {
    slug: "short-term-rental-approved",
    image: strImg,
    filter: { str: true },
    en: {
      name: "Short-term rental approved",
      seoTitle: "Short-term rental approved property | AVEL Estates",
      seoDescription: "Buildings whose reglamento de propiedad horizontal permits nightly stays.",
      thesis:
        "For buyers whose numbers only work with nightly rental. Every property here sits in a building whose reglamento de propiedad horizontal permits short stays, confirmed in writing before it was listed — not promised by a sales agent. Rules in Medellín and Cartagena have tightened, so an approval that exists today is an asset in itself.",
      gridHeading: "Approved for short-term rental",
    },
    es: {
      name: "Aptas para renta corta",
      seoTitle: "Propiedades aptas para renta corta | AVEL Estates",
      seoDescription: "Edificios cuyo reglamento de propiedad horizontal permite estadías cortas.",
      thesis:
        "Para compradores cuyos números solo funcionan con renta por noches. Cada propiedad está en un edificio cuyo reglamento de propiedad horizontal permite estadías cortas, confirmado por escrito antes de publicarla, no prometido por un asesor. Las reglas en Medellín y Cartagena se endurecieron, así que una autorización vigente hoy es un activo en sí misma.",
      gridHeading: "Aptas para renta corta",
    },
  },
  {
    slug: "pre-construction",
    image: preImg,
    filter: { stage: "pre-construction" },
    en: {
      name: "Pre-construction",
      seoTitle: "Pre-construction property in Colombia — AVEL Estates",
      seoDescription: "Projects sold before delivery, paid in instalments and held under a fiducia.",
      thesis:
        "For buyers with time. You pay in instalments over the build, your money sits with a fiduciary rather than with the developer, and the entry price per square metre is the lowest you will see for that building. The trade-off is a delivery date that can move — so we list the developer's record on previous projects alongside the plan.",
      gridHeading: "Pre-construction projects",
    },
    es: {
      name: "Sobre planos",
      seoTitle: "Propiedad sobre planos en Colombia — AVEL Estates",
      seoDescription: "Proyectos vendidos antes de la entrega, pagados por cuotas y con encargo fiduciario.",
      thesis:
        "Para compradores con tiempo. Usted paga por cuotas durante la obra, su dinero queda en una fiducia y no en manos del constructor, y el precio por metro cuadrado es el más bajo que verá en ese edificio. El costo es una fecha de entrega que puede moverse, por eso mostramos el historial del constructor junto al plan de pagos.",
      gridHeading: "Proyectos sobre planos",
    },
  },
  {
    slug: "poblado-and-envigado",
    image: pobladoImg,
    filter: { city: "medellin" },
    en: {
      name: "Poblado & Envigado",
      seoTitle: "Property in El Poblado and Envigado, Medellín — AVEL Estates",
      seoDescription: "El Poblado and Envigado: the deepest international demand and the strongest resale market in Medellín.",
      thesis:
        "For buyers who want the safest resale in Medellín. This is the southern corridor of the valley, where international demand concentrates and where a unit still sells in a slow market. Remember they are two municipalities: Envigado sets its own rules on density and tourist rental, and they are not Medellín's.",
      gridHeading: "Poblado and Envigado",
    },
    es: {
      name: "Poblado y Envigado",
      seoTitle: "Propiedades en El Poblado y Envigado | AVEL Estates",
      seoDescription: "El Poblado y Envigado: la mayor demanda internacional y la reventa más sólida de Medellín.",
      thesis:
        "Para compradores que buscan la reventa más segura de Medellín. Este es el corredor sur del valle, donde se concentra la demanda internacional y donde una unidad todavía se vende en un mercado lento. Tenga presente que son dos municipios: Envigado fija sus propias reglas de densidad y alojamiento turístico, y no son las de Medellín.",
      gridHeading: "Poblado y Envigado",
    },
  },
  {
    slug: "beachfront-caribbean",
    image: beachImg,
    filter: {},
    zones: ["Centro Histórico", "Rodadero", "Bello Horizonte", "Pozos Colorados", "Playa Salguero", "Bocagrande"],
    en: {
      name: "Beachfront Caribbean",
      seoTitle: "Caribbean beachfront property in Colombia — AVEL Estates",
      seoDescription: "Cartagena and Santa Marta coastal property: seasonal demand, salt-air upkeep and remote management.",
      thesis:
        "For buyers who want the coast and understand the seasonality that comes with it. Occupancy peaks in December, Easter and long weekends and thins out in September — anyone quoting you a flat annual figure has not run a season here. Salt air is the other cost: we prioritise buildings with a maintenance record you can read.",
      gridHeading: "Caribbean coast",
    },
    es: {
      name: "Frente al mar Caribe",
      seoTitle: "Propiedad frente al mar en el Caribe | AVEL Estates",
      seoDescription: "Cartagena y Santa Marta frente al mar: estacionalidad, mantenimiento por salitre y gestión remota.",
      thesis:
        "Para compradores que quieren la costa y entienden su estacionalidad. La ocupación se dispara en diciembre, Semana Santa y puentes, y baja en septiembre: quien le ofrezca un promedio anual plano no ha vivido una temporada aquí. El otro costo es el salitre, por eso priorizamos edificios con historial de mantenimiento verificable.",
      gridHeading: "Costa Caribe",
    },
  },
  {
    slug: "ready-to-move",
    image: readyImg,
    filter: { stage: "ready" },
    en: {
      name: "Ready to move",
      seoTitle: "Ready-to-move property in Colombia — AVEL Estates",
      seoDescription: "Delivered, registered units you can occupy or rent immediately.",
      thesis:
        "For buyers who want a key, not a delivery date. These units are built, delivered and registrable now, so you can walk the actual apartment on video, see the finished common areas and start renting the month you close. You pay more per square metre than pre-construction; what you buy is the removal of construction risk.",
      gridHeading: "Ready now",
    },
    es: {
      name: "Listas para habitar",
      seoTitle: "Propiedades listas para habitar en Colombia — AVEL Estates",
      seoDescription: "Unidades entregadas y registrables que puede ocupar o arrendar de inmediato.",
      thesis:
        "Para compradores que quieren una llave y no una fecha de entrega. Son unidades construidas, entregadas y registrables hoy: puede recorrer el apartamento real en video, ver las zonas comunes terminadas y empezar a arrendar el mes en que cierra. Paga más por metro cuadrado que sobre planos; lo que compra es la eliminación del riesgo de obra.",
      gridHeading: "Disponibles ya",
    },
  },
  {
    slug: "land-and-lots",
    image: landImg,
    filter: { type: "land" },
    en: {
      name: "Land & lots",
      seoTitle: "Land and lots for sale in Colombia — AVEL Estates",
      seoDescription: "Serviced plots and country land in Antioquia and on the coast.",
      thesis:
        "For buyers who want to build, or to hold an asset that cannot be diluted by a neighbouring tower. Land is the least forgiving purchase in Colombia: permitted use, minimum subdivision size, water rights and registered access decide whether a plot is worth anything. We check all four before a lot appears here, and we hand you the documents.",
      gridHeading: "Land and lots",
    },
    es: {
      name: "Lotes y tierra",
      seoTitle: "Lotes y tierra en venta en Colombia — AVEL Estates",
      seoDescription: "Lotes urbanizados y tierra campestre en Antioquia y la costa.",
      thesis:
        "Para compradores que quieren construir, o mantener un activo que ninguna torre vecina puede diluir. La tierra es la compra menos indulgente en Colombia: uso permitido, área mínima de subdivisión, derechos de agua y acceso registrado deciden si un lote vale algo. Verificamos los cuatro antes de publicar y le entregamos los documentos.",
      gridHeading: "Lotes y tierra",
    },
  },
];

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

export const COLLECTIONS_INDEX: Record<Locale, { title: string; description: string; heading: string; intro: string }> = {
  en: {
    title: "Collections — property in Colombia by buyer intent",
    description:
      "Six ways into the Colombian market: short-term rental approved, pre-construction, Poblado and Envigado, Caribbean beachfront, ready to move, land and lots.",
    heading: "Collections",
    intro: "Six ways into the market, grouped by what you are actually trying to do.",
  },
  es: {
    title: "Colecciones — propiedad en Colombia por objetivo del comprador",
    description:
      "Seis entradas al mercado colombiano: aptas para renta corta, sobre planos, Poblado y Envigado, frente al mar Caribe, listas para habitar, lotes y tierra.",
    heading: "Colecciones",
    intro: "Seis entradas al mercado, agrupadas por lo que usted realmente quiere lograr.",
  },
};
