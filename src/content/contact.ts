import type { Locale } from "../config/site";

export type Option = { value: string; label: string };

export type ContactCopy = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  step1: string;
  step2: string;
  stepOf: (n: number) => string;
  buyerType: string;
  buyerTypeOptions: Option[];
  purpose: string;
  purposeOptions: Option[];
  budget: string;
  budgetOptions: Option[];
  timeline: string;
  timelineOptions: Option[];
  cities: string;
  citiesHint: string;
  cityOptions: Option[];
  name: string;
  email: string;
  phone: string;
  dialCode: string;
  country: string;
  message: string;
  messageHint: string;
  consent: string;
  consentLinkText: string;
  marketing: string;
  next: string;
  back: string;
  submit: string;
  sending: string;
  success: string;
  failure: string;
  required: string;
  invalidEmail: string;
  consentRequired: string;
  selectOne: string;
  shortHeading: string;
  shortPropertyHeading: string;
  shortBody: string;
};

const EN: ContactCopy = {
  seoTitle: "Contact",
  seoDescription:
    "Tell us what you are looking for in Colombia. An advisor replies within one business day.",
  eyebrow: "Contact",
  heading: "Start with what you want to own.",
  intro:
    "Two short steps. The first tells us what fits you, the second tells us how to reach you.",
  step1: "What are you looking for?",
  step2: "How do we reach you?",
  stepOf: (n) => `Step ${n} of 2`,
  buyerType: "Where are you based?",
  buyerTypeOptions: [
    { value: "outside-colombia", label: "I live outside Colombia" },
    { value: "colombian-abroad", label: "I am Colombian living abroad" },
    { value: "in-colombia", label: "I live in Colombia" },
  ],
  purpose: "What is the property for?",
  purposeOptions: [
    { value: "investment", label: "Investment" },
    { value: "residence", label: "Residence" },
    { value: "both", label: "Both" },
  ],
  budget: "Budget in USD",
  budgetOptions: [
    { value: "under-300k", label: "Under USD 300,000" },
    { value: "300-600k", label: "USD 300,000 – 600,000" },
    { value: "600k-1m", label: "USD 600,000 – 1,000,000" },
    { value: "over-1m", label: "Over USD 1,000,000" },
  ],
  timeline: "Timeline",
  timelineOptions: [
    { value: "ready-now", label: "Ready now" },
    { value: "3-months", label: "Within 3 months" },
    { value: "6-12-months", label: "6 to 12 months" },
    { value: "exploring", label: "Just exploring" },
  ],
  cities: "Cities of interest",
  citiesHint: "Select as many as you like.",
  cityOptions: [
    { value: "medellin", label: "Medellín" },
    { value: "cartagena", label: "Cartagena" },
    { value: "santa-marta", label: "Santa Marta" },
    { value: "bogota", label: "Bogotá" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  name: "Full name",
  email: "Email address",
  phone: "Phone",
  dialCode: "Country code",
  country: "Country of residence",
  message: "Message",
  messageHint: "Optional.",
  consent:
    "I authorize AVEL to process my personal data in accordance with the Privacy Policy (Colombian Law 1581 of 2012).",
  consentLinkText: "Privacy Policy",
  marketing: "Send me new listings and market notes. I can unsubscribe at any time.",
  next: "Next",
  back: "Back",
  submit: "Send request",
  sending: "Sending…",
  success: "Received. You will hear from us within one business day.",
  failure: "We could not send your request. Please try again.",
  required: "This field is required",
  invalidEmail: "Please enter a valid email address",
  consentRequired: "We need your authorization to process your data",
  selectOne: "Please choose one option",
  shortHeading: "Tell us what you're looking for.",
  shortPropertyHeading: "Request price and availability",
  shortBody: "A short brief is enough. We reply within one business day.",
};

const ES: ContactCopy = {
  seoTitle: "Contacto",
  seoDescription:
    "Cuéntanos qué buscas en Colombia. Un asesor te responde dentro de un día hábil.",
  eyebrow: "Contacto",
  heading: "Empieza por lo que quieres tener.",
  intro:
    "Dos pasos cortos. El primero nos dice qué te sirve, el segundo cómo contactarte.",
  step1: "¿Qué estás buscando?",
  step2: "¿Cómo te contactamos?",
  stepOf: (n) => `Paso ${n} de 2`,
  buyerType: "¿Dónde vives?",
  buyerTypeOptions: [
    { value: "outside-colombia", label: "Vivo fuera de Colombia" },
    { value: "colombian-abroad", label: "Soy colombiano y vivo en el exterior" },
    { value: "in-colombia", label: "Vivo en Colombia" },
  ],
  purpose: "¿Para qué es la propiedad?",
  purposeOptions: [
    { value: "investment", label: "Inversión" },
    { value: "residence", label: "Residencia" },
    { value: "both", label: "Ambas" },
  ],
  budget: "Presupuesto en USD",
  budgetOptions: [
    { value: "under-300k", label: "Menos de USD 300.000" },
    { value: "300-600k", label: "USD 300.000 – 600.000" },
    { value: "600k-1m", label: "USD 600.000 – 1.000.000" },
    { value: "over-1m", label: "Más de USD 1.000.000" },
  ],
  timeline: "Plazo",
  timelineOptions: [
    { value: "ready-now", label: "Listo ahora" },
    { value: "3-months", label: "En los próximos 3 meses" },
    { value: "6-12-months", label: "De 6 a 12 meses" },
    { value: "exploring", label: "Solo explorando" },
  ],
  cities: "Ciudades de interés",
  citiesHint: "Puedes elegir varias.",
  cityOptions: [
    { value: "medellin", label: "Medellín" },
    { value: "cartagena", label: "Cartagena" },
    { value: "santa-marta", label: "Santa Marta" },
    { value: "bogota", label: "Bogotá" },
    { value: "not-sure", label: "Aún no lo sé" },
  ],
  name: "Nombre completo",
  email: "Correo electrónico",
  phone: "Teléfono",
  dialCode: "Indicativo",
  country: "País de residencia",
  message: "Mensaje",
  messageHint: "Opcional.",
  consent:
    "Autorizo a AVEL a tratar mis datos personales conforme a la Política de Privacidad (Ley 1581 de 2012).",
  consentLinkText: "Política de Privacidad",
  marketing:
    "Quiero recibir nuevas propiedades y notas de mercado. Puedo darme de baja cuando quiera.",
  next: "Continuar",
  back: "Volver",
  submit: "Enviar solicitud",
  sending: "Enviando…",
  success: "Recibido. Tendrás noticias nuestras dentro de un día hábil.",
  failure: "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
  required: "Este campo es obligatorio",
  invalidEmail: "Ingresa un correo electrónico válido",
  consentRequired: "Necesitamos tu autorización para tratar tus datos",
  selectOne: "Elige una opción",
  shortHeading: "Cuéntanos qué estás buscando.",
  shortPropertyHeading: "Solicita precio y disponibilidad",
  shortBody: "Con un resumen corto basta. Respondemos en un día hábil.",
};

export const CONTACT: Record<Locale, ContactCopy> = { en: EN, es: ES };

/** Short dial-code list covering the markets AVEL sells to. */
export const DIAL_CODES = [
  { code: "+1", label: "US / CA +1" },
  { code: "+44", label: "UK +44" },
  { code: "+61", label: "AU +61" },
  { code: "+57", label: "CO +57" },
  { code: "+34", label: "ES +34" },
  { code: "+33", label: "FR +33" },
  { code: "+49", label: "DE +49" },
  { code: "+39", label: "IT +39" },
  { code: "+31", label: "NL +31" },
  { code: "+41", label: "CH +41" },
  { code: "+46", label: "SE +46" },
  { code: "+351", label: "PT +351" },
  { code: "+353", label: "IE +353" },
  { code: "+52", label: "MX +52" },
  { code: "+55", label: "BR +55" },
  { code: "+54", label: "AR +54" },
  { code: "+56", label: "CL +56" },
  { code: "+507", label: "PA +507" },
  { code: "+971", label: "AE +971" },
  { code: "+972", label: "IL +972" },
  { code: "+65", label: "SG +65" },
] as const;
