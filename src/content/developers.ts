import type { Locale } from "../config/site";

export const DOSSIER_URL = "/downloads/avel-dossier-desarrolladores.pdf";
export const HERO_SLUG = "popayan-trade-center";
export const CASE_SLUGS = ["popayan-trade-center", "edificio-ie-suites", "torre-residencial"] as const;

type Stat = { prefix: string; value: number; suffix: string; label: string };
type Case = { slug: string; name: string; challenge: string; done: string; result: string };

const es = {
  seoTitle: "Diseño y Gerencia de Proyectos para Desarrolladores | AVEL",
  seoDescription:
    "Diseño, ingenierías, presupuesto WBS, ruta crítica y flujo de caja para constructoras, inversionistas y dueños de lotes en Colombia.",
  eyebrow: "AVEL · Desarrolladores",
  heroAlt: "Popayán Trade Center, proyecto gestionado por AVEL",
  title: "Proyectos que no se salen \n del presupuesto.",
  subtitle:
    "Diseño, ingenierías, presupuesto WBS, ruta crítica y flujo de caja para edificios, comercio y vivienda en altura.",
  ctaDossier: "Descargar dossier",
  ctaMeeting: "Agenda una reunión de 30 minutos",
  stats: [
    { prefix: "+$", value: 84000, suffix: " M", label: "en proyectos gestionados (millones COP)" },
    { prefix: "+", value: 26000, suffix: " m²", label: "gestionados" },
    { prefix: "+", value: 13000, suffix: " m²", label: "entregados" },
    { prefix: "", value: 17, suffix: "", label: "diseños arquitectónicos" },
  ] as Stat[],
  statsNote: "Incluye proyectos entregados, en obra y en desarrollo.",
  teamLabel: "Nuestro equipo",
  team: "Dirigido por un arquitecto especialista en Gerencia de la Construcción y MBA, con experiencia como promotor y gerente de proyectos desde 2014.",
  deliverLabel: "Qué entregamos",
  deliverables: [
    { title: "Análisis de cabida normativa", benefit: "Sabe cuánto puede construir en su lote antes de invertir un peso en diseño." },
    { title: "Diseño arquitectónico y técnico", benefit: "Planos e ingenierías coordinados hasta obtener la licencia de construcción." },
    { title: "Presupuesto con metodología WBS", benefit: "Cada actividad costeada y trazable, sin partidas ocultas ni sorpresas." },
    { title: "Cronograma con ruta crítica (CPM)", benefit: "Identifica las tareas que no pueden atrasarse y protege la fecha de entrega." },
    { title: "Flujo de caja mensual", benefit: "Planee la financiación y las preventas con cifras mes a mes." },
    { title: "Revisión de planos con Lean Construction", benefit: "Detecta interferencias en papel, no en obra, y reduce desperdicios." },
  ],
  casesLabel: "Casos",
  challenge: "El reto",
  done: "Lo que hicimos",
  result: "El resultado",
  seeProject: "Ver proyecto",
  cases: [
    {
      slug: "popayan-trade-center",
      name: "Popayán Trade Center",
      challenge: "Un edificio corporativo y comercial de gran escala que debía cerrar sus números antes de salir a ventas.",
      done: "Diseño arquitectónico, presupuesto WBS, cronograma con ruta crítica y flujo de caja para la preventa.",
      result: "Un proyecto con costos y plazos definidos desde el inicio, listo para presentar a inversionistas.",
    },
    {
      slug: "edificio-ie-suites",
      name: "Edificio IE Suites",
      challenge: "Vivienda en altura en un lote con normativa exigente y un margen estrecho.",
      done: "Análisis de cabida, diseño hasta licencia y revisión de planos con Lean Construction.",
      result: "Máximo aprovechamiento del lote y planos coordinados antes de iniciar obra.",
    },
    {
      slug: "torre-residencial",
      name: "Torre Residencial",
      challenge: "Una torre de vivienda que necesitaba control de costos durante toda la construcción.",
      done: "Presupuesto WBS, programación CPM y gerencia de obra con seguimiento mensual.",
      result: "Obra avanzando según el cronograma y dentro del presupuesto aprobado.",
    },
  ] as Case[],
  dossierLabel: "Descarga nuestro dossier",
  dossierTitle: "Metodología, casos y cifras en un solo documento.",
  dossierBody: "Déjenos sus datos y descargue el dossier en PDF. Un miembro del equipo le escribirá para entender su proyecto.",
  finalTitle: "Hablemos de su proyecto antes de que empiece a costar.",
  form: {
    labels: { name: "Nombre", company: "Empresa", role: "Cargo", email: "Correo", phone: "WhatsApp" },
    error: "Revise este campo.",
    consent: "Autorizo el tratamiento de mis datos según la",
    consentLink: "política de Habeas Data",
    consentError: "Necesitamos su autorización para continuar.",
    sendError: "No pudimos enviar el formulario. Intente de nuevo en un momento.",
    submit: "Descargar el dossier",
    sending: "Enviando…",
    doneTitle: "Gracias. Su dossier se está descargando.",
    doneBody: "Si la descarga no inicia, use el botón. Le escribiremos pronto.",
    download: "Descargar PDF",
  },
};

const en: typeof es = {
  ...es,
  seoTitle: "Project Design & Management for Developers | AVEL",
  seoDescription:
    "Design, engineering, WBS budgets, critical path and cash flow for builders, investors and large-lot owners in Colombia.",
  eyebrow: "AVEL · Developers",
  heroAlt: "Popayán Trade Center, a project managed by AVEL",
  title: "Projects that stay \n on budget.",
  subtitle: "Design, engineering, WBS budgeting, critical path and cash flow for towers, retail and high-rise housing.",
  ctaDossier: "Download dossier",
  ctaMeeting: "Book a 30-minute meeting",
  stats: [
    { prefix: "+$", value: 84000, suffix: " M", label: "in managed projects (COP millions)" },
    { prefix: "+", value: 26000, suffix: " m²", label: "managed" },
    { prefix: "+", value: 13000, suffix: " m²", label: "delivered" },
    { prefix: "", value: 17, suffix: "", label: "architectural designs" },
  ],
  statsNote: "Includes delivered, under-construction and in-development projects.",
  teamLabel: "Our team",
  team: "Led by an architect specialised in Construction Management with an MBA, working as developer and project manager since 2014.",
  deliverLabel: "What we deliver",
  deliverables: [
    { title: "Zoning capacity analysis", benefit: "Know how much you can build on your lot before spending on design." },
    { title: "Architectural & technical design", benefit: "Coordinated drawings and engineering all the way to the building permit." },
    { title: "WBS budget", benefit: "Every activity costed and traceable — no hidden items, no surprises." },
    { title: "Critical path schedule (CPM)", benefit: "Spot the tasks that cannot slip and protect the handover date." },
    { title: "Monthly cash flow", benefit: "Plan financing and pre-sales with month-by-month figures." },
    { title: "Lean Construction plan review", benefit: "Catch clashes on paper, not on site, and cut waste." },
  ],
  casesLabel: "Cases",
  challenge: "The challenge",
  done: "What we did",
  result: "The result",
  seeProject: "See project",
  cases: [
    {
      slug: "popayan-trade-center",
      name: "Popayán Trade Center",
      challenge: "A large corporate and retail building that had to close its numbers before going to market.",
      done: "Architectural design, WBS budget, critical-path schedule and pre-sale cash flow.",
      result: "Costs and timelines defined from day one, ready to present to investors.",
    },
    {
      slug: "edificio-ie-suites",
      name: "Edificio IE Suites",
      challenge: "High-rise housing on a lot with demanding zoning and a tight margin.",
      done: "Capacity analysis, design to permit and Lean Construction plan review.",
      result: "Maximum lot yield and coordinated drawings before breaking ground.",
    },
    {
      slug: "torre-residencial",
      name: "Torre Residencial",
      challenge: "A residential tower that needed cost control throughout construction.",
      done: "WBS budget, CPM scheduling and site management with monthly tracking.",
      result: "Works progressing on schedule and within the approved budget.",
    },
  ],
  dossierLabel: "Download our dossier",
  dossierTitle: "Method, cases and figures in one document.",
  dossierBody: "Leave your details and download the PDF dossier. A team member will reach out to understand your project.",
  finalTitle: "Let's talk about your project before it starts costing you.",
  form: {
    labels: { name: "Name", company: "Company", role: "Job title", email: "Email", phone: "WhatsApp" },
    error: "Please check this field.",
    consent: "I authorise the processing of my data under the",
    consentLink: "data protection policy",
    consentError: "We need your consent to continue.",
    sendError: "We couldn't send the form. Please try again shortly.",
    submit: "Download the dossier",
    sending: "Sending…",
    doneTitle: "Thank you. Your dossier is downloading.",
    doneBody: "If the download doesn't start, use the button. We'll be in touch soon.",
    download: "Download PDF",
  },
};

export const DEVELOPERS: Record<Locale, typeof es> = { es, en };
