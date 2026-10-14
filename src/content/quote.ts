import type { Locale } from "../config/site";
import type { Acabados, Predio } from "../lib/quote-math";

export type Option = { value: string; label: string };

const PROJECT_TYPE: Option[] = [
  { value: "casa", label: "Casa o finca" },
  { value: "edificio", label: "Edificio de vivienda" },
  { value: "comercial", label: "Local o edificio comercial" },
  { value: "oficinas", label: "Oficinas" },
  { value: "remodelacion", label: "Remodelación" },
  { value: "otro", label: "Otro" },
];

const HAS_LOT: Option[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "comprando", label: "Lo estoy comprando" },
];

const SERVICES: Option[] = [
  { value: "arquitectonico", label: "Diseño arquitectónico y licencia" },
  { value: "estructural", label: "Diseño estructural" },
  { value: "retie", label: "Diseño eléctrico RETIE" },
  { value: "hidrosanitario", label: "Diseño hidrosanitario" },
  { value: "presupuesto", label: "Presupuesto de obra" },
  { value: "cronograma", label: "Cronograma" },
  { value: "flujo", label: "Flujo de caja" },
  { value: "construccion", label: "Construcción" },
];

const STAGE: Option[] = [
  { value: "idea", label: "Solo tengo la idea" },
  { value: "planos", label: "Tengo planos" },
  { value: "licencia", label: "Ya tengo licencia" },
];

const TERRAIN: Option[] = [
  { value: "plano", label: "Plano" },
  { value: "inclinado", label: "Inclinado" },
];

const FINISHES: { value: Acabados; label: string }[] = [
  { value: "medios", label: "Medios" },
  { value: "alta", label: "Alta gama" },
];

const PREDIO: { value: Predio; label: string }[] = [
  { value: "urbano", label: "Urbano" },
  { value: "rural", label: "Rural" },
];

const BUDGET: Option[] = [
  { value: "hasta500", label: "Hasta $500 millones" },
  { value: "500a1000", label: "$500 a $1.000 millones" },
  { value: "1000a2000", label: "$1.000 a $2.000 millones" },
  { value: "2000a5000", label: "$2.000 a $5.000 millones" },
  { value: "mas5000", label: "Más de $5.000 millones" },
  { value: "pordefini", label: "Prefiero definirlo con AVEL" },
];

const RESIDENCE: Option[] = [
  { value: "colombia", label: "En Colombia" },
  { value: "exterior", label: "En el exterior" },
];

const OPTIONS = {
  projectType: PROJECT_TYPE,
  hasLot: HAS_LOT,
  services: SERVICES,
  stage: STAGE,
  terrain: TERRAIN,
  finishes: FINISHES,
  predio: PREDIO,
  budget: BUDGET,
  residence: RESIDENCE,
};

const es = {
  seoTitle: "Cotiza tu proyecto de arquitectura y obra",
  seoDescription:
    "Cuatro pasos, unos tres minutos. Alcance, tiempos y honorarios para tu proyecto en Colombia.",
  kicker: "Cotización",
  stepLabel: (n: number) => `COTIZACIÓN · PASO ${n} DE 4`,
  titleA: "Cotiza tu",
  titleB: "proyecto",
  intro:
    "Cuatro pasos, unos tres minutos. Con esta información preparamos una propuesta con alcance, tiempos y honorarios.",
  steps: [
    { n: "01", name: "Tipo de proyecto" },
    { n: "02", name: "Servicios y etapa" },
    { n: "03", name: "Lugar, área y presupuesto" },
    { n: "04", name: "Contacto" },
  ],
  stepTitles: ["Tipo de proyecto", "Servicios y etapa", "Lugar, área y presupuesto", "Contacto"],
  step1: {
    typeLegend: "¿Qué quieres construir?",
    lotLegend: "¿Ya tienes el lote?",
  },
  step2: {
    servicesLegend: "¿Qué necesitas?",
    servicesHint: "Puedes marcar varias opciones.",
    stageLegend: "¿En qué etapa estás?",
  },
  step3: {
    place: "Ciudad o municipio",
    placeHint: "Ej. Popayán, Cali, Pereira",
    lotArea: "Área del lote (m²)",
    predio: "Tipo de predio",
    floors: "Número de pisos",
    buildArea: "m² que quieres construir",
    buildAreaHint: "Opcional. Si lo dejas vacío lo calculamos con el lote y los pisos.",
    terrain: "El lote es",
    finishes: "Nivel de acabados",
    budget: "Presupuesto aproximado",
    calcTitle: "Estimado en vivo",
    calcFirstFloor: "Máximo en primer piso",
    calcTotal: "Área total posible",
    calcInvestment: "Inversión estimada en obra",
    calcNote:
      "Estimado de referencia. El dato exacto depende del POT de tu municipio y del diseño.",
    calcEmpty: "Escribe el área del lote para ver el estimado.",
  },
  step4: {
    name: "Nombre",
    whatsapp: "WhatsApp",
    email: "Correo",
    residence: "¿Vives en Colombia o en el exterior?",
    consent: "Acepto la política de tratamiento de datos",
    consentRequired: "Necesitamos tu aceptación para poder contactarte.",
  },
  back: "Atrás",
  next: "Continuar",
  send: "Enviar cotización",
  sending: "Enviando…",
  error:
    "No pudimos enviar tu cotización. Intenta de nuevo o escríbenos a info@avelestates.com.",
  required: "Campo obligatorio",
  invalidEmail: "Revisa el correo",
  invalidNumber: "Escribe un número",
  selectOne: "Elige una opción",
  selectOneOrMore: "Elige al menos una opción",
  successTitle: "Recibimos tu información.",
  successBody: "Te escribimos por WhatsApp en menos de 24 horas hábiles.",
  successWhatsapp: "Escribir por WhatsApp",
  successAnother: "Cotizar otro proyecto",
  whatsappIntro: "Hola AVEL, quiero cotizar mi proyecto:",
  draftRestored: "Retomamos la cotización donde la dejaste.",
};

const en: typeof es = {
  seoTitle: "Get a quote for your build in Colombia",
  seoDescription:
    "Four steps, about three minutes. Scope, timeline and fees for your project in Colombia.",
  kicker: "Quote",
  stepLabel: (n: number) => `QUOTE · STEP ${n} OF 4`,
  titleA: "Price your",
  titleB: "project",
  intro:
    "Four steps, about three minutes. With this information we prepare a proposal with scope, timeline and fees.",
  steps: [
    { n: "01", name: "Project type" },
    { n: "02", name: "Services and stage" },
    { n: "03", name: "Location, area and budget" },
    { n: "04", name: "Contact" },
  ],
  stepTitles: ["Project type", "Services and stage", "Location, area and budget", "Contact"],
  step1: {
    typeLegend: "What do you want to build?",
    lotLegend: "Do you already have the lot?",
  },
  step2: {
    servicesLegend: "What do you need?",
    servicesHint: "You can pick more than one.",
    stageLegend: "Which stage are you in?",
  },
  step3: {
    place: "City or municipality",
    placeHint: "E.g. Popayán, Cali, Pereira",
    lotArea: "Lot area (m²)",
    predio: "Lot type",
    floors: "Number of floors",
    buildArea: "m² you want to build",
    buildAreaHint: "Optional. Leave it empty and we calculate it from the lot and floors.",
    terrain: "The lot is",
    finishes: "Finish level",
    budget: "Approximate budget",
    calcTitle: "Live estimate",
    calcFirstFloor: "Maximum on the ground floor",
    calcTotal: "Possible total area",
    calcInvestment: "Estimated build cost",
    calcNote: "Reference estimate. The exact figure depends on your municipality's POT and the design.",
    calcEmpty: "Type the lot area to see the estimate.",
  },
  step4: {
    name: "Name",
    whatsapp: "WhatsApp",
    email: "Email",
    residence: "Do you live in Colombia or abroad?",
    consent: "I accept the data protection policy",
    consentRequired: "We need your acceptance before we can contact you.",
  },
  back: "Back",
  next: "Continue",
  send: "Send quote",
  sending: "Sending…",
  error: "We couldn't send your quote. Try again or write to info@avelestates.com.",
  required: "Required",
  invalidEmail: "Check the email",
  invalidNumber: "Enter a number",
  selectOne: "Pick one option",
  selectOneOrMore: "Pick at least one option",
  successTitle: "We received your information.",
  successBody: "We will write to you on WhatsApp within 24 working hours.",
  successWhatsapp: "Write on WhatsApp",
  successAnother: "Quote another project",
  whatsappIntro: "Hello AVEL, I want a quote for my project:",
  draftRestored: "We picked your quote up where you left it.",
};

export const QUOTE = { en, es } as const;

export const QUOTE_OPTIONS = OPTIONS;

/** Human-readable summary of the quote, used in the WhatsApp message and the email. */
export function quoteSummary(
  rows: [string, string][],
  copy: typeof es,
): string {
  return rows.map(([k, v]) => `${k}: ${v}`).join(" · ") + ` — ${copy.whatsappIntro}`;
}
