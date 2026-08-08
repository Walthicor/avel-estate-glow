import type { Locale } from "../config/site";

import heroPoster from "../assets/hero-poster.jpg";
import heroVideo from "../assets/hero.mp4.asset.json";
import property1 from "../assets/property-1.jpg";
import property2 from "../assets/property-2.jpg";
import property3 from "../assets/property-3.jpg";
import cRental from "../assets/collection-rental.jpg";
import cRelocation from "../assets/collection-relocation.jpg";
import cPre from "../assets/collection-preconstruction.jpg";
import cRetirement from "../assets/collection-retirement.jpg";
import cSecond from "../assets/collection-second-home.jpg";
import cDiversification from "../assets/collection-diversification.jpg";

export const HERO_MEDIA = { poster: heroPoster, video: heroVideo.url };

export const PROPERTY_IMAGES = [property1, property2, property3];

export const COLLECTION_IMAGES = [
  cRental,
  cRelocation,
  cPre,
  cRetirement,
  cSecond,
  cDiversification,
];

export type Step = {
  n: string;
  title: string;
  what: string;
  how_long: string;
  cost: string;
  sign: string;
};

export type Property = {
  city: string;
  title: string;
  area: string;
  type: string;
  stage: string;
  delivery: string;
  href: string;
};

export type HomeContent = {
  hero: {
    label: string;
    headline: string;
    body: string;
    primary: string;
    secondary: string;
  };
  path: { heading: string; intro: string; labels: { what: string; how_long: string; cost: string; sign: string }; steps: Step[] };
  featured: { heading: string; link: string; properties: Property[] };
  collections: { heading: string; items: { label: string; blurb: string; href: string }[] };
  why: { heading: string; columns: { n: string; title: string; body: string }[] };
  lead: {
    heading: string;
    body: string;
    name: string;
    email: string;
    country: string;
    budget: string;
    timeline: string;
    budgetOptions: string[];
    timelineOptions: string[];
    submit: string;
    success: string;
  };
};

const en: HomeContent = {
  hero: {
    label: "MEDELLÍN · CARTAGENA · SANTA MARTA · BOGOTÁ",
    headline: "Own property in Colombia. Without being there.",
    body: "We handle the due diligence, the paperwork, and the part nobody explains — getting your money back out.",
    primary: "View properties",
    secondary: "How buying works",
  },
  path: {
    heading: "Six steps. No surprises.",
    intro: "The remote buyer path, start to finish.",
    labels: {
      what: "What happens",
      how_long: "How long",
      cost: "What it costs",
      sign: "What you sign",
    },
    steps: [
      {
        n: "01",
        title: "Discover",
        what: "We shortlist 3 to 5 properties against your budget, timeline and purpose.",
        how_long: "1 to 2 weeks.",
        cost: "No cost.",
        sign: "Nothing signed.",
      },
      {
        n: "02",
        title: "Verify",
        what: "Title study, developer track record, licence and permit check, HOA and tax status.",
        how_long: "5 to 10 business days.",
        cost: "Included.",
        sign: "You receive a written report.",
      },
      {
        n: "03",
        title: "Reserve",
        what: "Reservation agreement with the developer, typically 1 to 3 percent of the unit price, refundable within the legal cooling-off window.",
        how_long: "Same week.",
        cost: "1 to 3 percent of the unit price, refundable within the legal cooling-off window.",
        sign: "Reservation agreement with the developer.",
      },
      {
        n: "04",
        title: "Fund",
        what: "Funds enter through a registered channel and the foreign investment is declared to Banco de la República. This step protects your right to take the money out later.",
        how_long: "2 to 4 weeks.",
        cost: "Bank and registration fees only.",
        sign: "Foreign investment declaration.",
      },
      {
        n: "05",
        title: "Title",
        what: "Promise of sale, then deed at the notary. You may grant a power of attorney and never fly in.",
        how_long: "Varies with construction stage.",
        cost: "Notary and registration duties.",
        sign: "Promise of sale, deed, optional power of attorney.",
      },
      {
        n: "06",
        title: "Manage",
        what: "Rental management, tax filing, remittance of proceeds abroad.",
        how_long: "Ongoing.",
        cost: "Management fee, agreed up front.",
        sign: "Management mandate.",
      },
    ],
  },
  featured: {
    heading: "Featured properties",
    link: "View property",
    properties: [
      {
        city: "Medellín",
        title: "El Poblado hillside residences",
        area: "96 – 184 m²",
        type: "Apartment",
        stage: "Pre-construction",
        delivery: "Delivery 2028",
        href: "/properties",
      },
      {
        city: "Cartagena",
        title: "Restored mansion, walled city",
        area: "240 – 410 m²",
        type: "Heritage home",
        stage: "Ready",
        delivery: "Immediate",
        href: "/properties",
      },
      {
        city: "Santa Marta",
        title: "Beachfront apartments, Pozos Colorados",
        area: "72 – 138 m²",
        type: "Apartment",
        stage: "Under construction",
        delivery: "Delivery 2027",
        href: "/properties",
      },
    ],
  },
  collections: {
    heading: "Find it by why you're buying.",
    items: [
      { label: "Rental income", blurb: "Short and long-stay yield.", href: "/collections/short-term-rental-approved" },
      { label: "Relocation", blurb: "Living here full time.", href: "/collections/pre-construction" },
      { label: "Pre-construction", blurb: "Buy early, pay in stages.", href: "/collections/poblado-and-envigado" },
      { label: "Retirement", blurb: "Slow living, warm climate.", href: "/collections/beachfront-caribbean" },
      { label: "Second home", blurb: "Coast and country escapes.", href: "/collections/ready-to-move" },
      { label: "Diversification", blurb: "Hard assets outside your currency.", href: "/collections/land-and-lots" },
    ],
  },
  why: {
    heading: "Why AVEL",
    columns: [
      {
        n: "01",
        title: "A bilingual team on the ground",
        body: "We live in the cities we sell in. Every viewing, notary appointment and site visit is done by someone here, and reported to you in your language.",
      },
      {
        n: "02",
        title: "Independent title verification",
        body: "Title studies are run by lawyers who are not paid by the developer. If a property does not pass, you hear it from us before you commit anything.",
      },
      {
        n: "03",
        title: "What it's worth, not what it pays us",
        body: "We tell you what a property is worth, not what it costs us to sell. Comparable sales, rental evidence and exit assumptions, in writing.",
      },
    ],
  },
  lead: {
    heading: "Tell us what you're looking for.",
    body: "A short brief is enough. We reply within one business day.",
    name: "Full name",
    email: "Email address",
    country: "Country of residence",
    budget: "Budget band",
    timeline: "Timeline",
    budgetOptions: [
      "Under USD 150,000",
      "USD 150,000 – 300,000",
      "USD 300,000 – 600,000",
      "USD 600,000 +",
    ],
    timelineOptions: ["Next 3 months", "3 to 6 months", "6 to 12 months", "Just researching"],
    submit: "Send enquiry",
    success: "Thank you — we'll be in touch within one business day.",
  },
};

const es: HomeContent = {
  hero: {
    label: "MEDELLÍN · CARTAGENA · SANTA MARTA · BOGOTÁ",
    headline: "Compra propiedad en Colombia. Sin estar aquí.",
    body: "Nos encargamos de la debida diligencia, los trámites y la parte que nadie explica: cómo sacar tu dinero después.",
    primary: "Ver propiedades",
    secondary: "Cómo funciona la compra",
  },
  path: {
    heading: "Seis pasos. Sin sorpresas.",
    intro: "El camino del comprador remoto, de principio a fin.",
    labels: {
      what: "Qué ocurre",
      how_long: "Cuánto toma",
      cost: "Cuánto cuesta",
      sign: "Qué firmas",
    },
    steps: [
      {
        n: "01",
        title: "Descubrir",
        what: "Preseleccionamos de 3 a 5 propiedades según tu presupuesto, tus tiempos y tu objetivo.",
        how_long: "1 a 2 semanas.",
        cost: "Sin costo.",
        sign: "No se firma nada.",
      },
      {
        n: "02",
        title: "Verificar",
        what: "Estudio de títulos, trayectoria del constructor, revisión de licencias y permisos, estado de administración e impuestos.",
        how_long: "5 a 10 días hábiles.",
        cost: "Incluido.",
        sign: "Recibes un informe escrito.",
      },
      {
        n: "03",
        title: "Reservar",
        what: "Contrato de reserva con el constructor, normalmente entre el 1 y el 3 por ciento del valor de la unidad, reembolsable dentro del plazo legal de retracto.",
        how_long: "La misma semana.",
        cost: "1 a 3 por ciento del valor de la unidad, reembolsable dentro del plazo legal de retracto.",
        sign: "Contrato de reserva con el constructor.",
      },
      {
        n: "04",
        title: "Fondear",
        what: "Los fondos entran por un canal registrado y la inversión extranjera se declara ante el Banco de la República. Este paso protege tu derecho a sacar el dinero después.",
        how_long: "2 a 4 semanas.",
        cost: "Solo costos bancarios y de registro.",
        sign: "Declaración de inversión extranjera.",
      },
      {
        n: "05",
        title: "Escriturar",
        what: "Promesa de compraventa y luego escritura en notaría. Puedes otorgar un poder y no viajar nunca.",
        how_long: "Varía según la etapa de construcción.",
        cost: "Derechos notariales y de registro.",
        sign: "Promesa de compraventa, escritura y poder si lo deseas.",
      },
      {
        n: "06",
        title: "Administrar",
        what: "Administración de arriendo, declaración de impuestos y remisión de recursos al exterior.",
        how_long: "Permanente.",
        cost: "Honorarios de administración, acordados desde el inicio.",
        sign: "Mandato de administración.",
      },
    ],
  },
  featured: {
    heading: "Propiedades destacadas",
    link: "Ver propiedad",
    properties: [
      {
        city: "Medellín",
        title: "Residencias de ladera en El Poblado",
        area: "96 – 184 m²",
        type: "Apartamento",
        stage: "Sobre planos",
        delivery: "Entrega 2028",
        href: "/properties",
      },
      {
        city: "Cartagena",
        title: "Casona restaurada en la ciudad amurallada",
        area: "240 – 410 m²",
        type: "Casa patrimonial",
        stage: "Lista",
        delivery: "Entrega inmediata",
        href: "/properties",
      },
      {
        city: "Santa Marta",
        title: "Apartamentos frente al mar, Pozos Colorados",
        area: "72 – 138 m²",
        type: "Apartamento",
        stage: "En construcción",
        delivery: "Entrega 2027",
        href: "/properties",
      },
    ],
  },
  collections: {
    heading: "Encuéntrala por el motivo de tu compra.",
    items: [
      { label: "Renta", blurb: "Rentabilidad corta y larga estadía.", href: "/collections/short-term-rental-approved" },
      { label: "Mudanza", blurb: "Para vivir aquí todo el año.", href: "/collections/pre-construction" },
      { label: "Sobre planos", blurb: "Compra temprano, paga por etapas.", href: "/collections/poblado-and-envigado" },
      { label: "Retiro", blurb: "Vida tranquila, clima cálido.", href: "/collections/beachfront-caribbean" },
      { label: "Segunda vivienda", blurb: "Escapadas de costa y campo.", href: "/collections/ready-to-move" },
      { label: "Diversificación", blurb: "Activos reales fuera de tu moneda.", href: "/collections/land-and-lots" },
    ],
  },
  why: {
    heading: "Por qué AVEL",
    columns: [
      {
        n: "01",
        title: "Un equipo bilingüe en terreno",
        body: "Vivimos en las ciudades donde vendemos. Cada visita, cita notarial y recorrido de obra lo hace alguien de aquí y te lo reporta en tu idioma.",
      },
      {
        n: "02",
        title: "Verificación de títulos independiente",
        body: "El estudio de títulos lo hacen abogados que no reciben pago del constructor. Si una propiedad no pasa, te lo decimos antes de que comprometas nada.",
      },
      {
        n: "03",
        title: "Lo que vale, no lo que nos conviene",
        body: "Te decimos cuánto vale una propiedad, no cuánto nos cuesta venderla. Comparables, evidencia de arriendo y supuestos de salida, por escrito.",
      },
    ],
  },
  lead: {
    heading: "Cuéntanos qué estás buscando.",
    body: "Con un resumen corto basta. Respondemos en un día hábil.",
    name: "Nombre completo",
    email: "Correo electrónico",
    country: "País de residencia",
    budget: "Rango de presupuesto",
    timeline: "Plazo",
    budgetOptions: [
      "Menos de USD 150.000",
      "USD 150.000 – 300.000",
      "USD 300.000 – 600.000",
      "USD 600.000 +",
    ],
    timelineOptions: [
      "Próximos 3 meses",
      "3 a 6 meses",
      "6 a 12 meses",
      "Solo estoy investigando",
    ],
    submit: "Enviar consulta",
    success: "Gracias — te contactaremos en un día hábil.",
  },
};

export const HOME: Record<Locale, HomeContent> = { en, es };
