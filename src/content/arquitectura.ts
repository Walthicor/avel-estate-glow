import hero from "../assets/arquitectura/obra-construccion-avel-arquitectura.webp";
import ptcFoto from "../assets/arquitectura/popayan-trade-center-obra-entregada.webp";
import ptcBoceto from "../assets/arquitectura/popayan-trade-center-boceto.webp";
import casaPiedra from "../assets/arquitectura/casa-piedra-y-madera.webp";
import torre from "../assets/arquitectura/torre-residencial.webp";
import casaJardin from "../assets/arquitectura/casa-del-jardin.webp";
import jds from "../assets/arquitectura/jds-factory-popayan.webp";
import cordillera from "../assets/arquitectura/casa-cordillera.webp";
import exterior from "../assets/arquitectura/construir-en-colombia-desde-el-exterior.webp";

export const ARQ_IMAGES = { hero, ptcFoto, ptcBoceto, exterior };

export const STATS = [
  { value: "12", label: "Obras entregadas" },
  { value: "13.063 m²", label: "Construidos" },
  { value: "17", label: "Diseños arquitectónicos" },
  { value: "Desde 2014", label: "Diseñando y construyendo" },
];
export const CITIES_LINE = "POPAYÁN · CALI · EJE CAFETERO · MEDELLÍN";

export const PROBLEMS = [
  { t: "La curaduría devuelve los planos.", d: "Cada corrección son semanas perdidas y la obra no arranca." },
  { t: "El presupuesto “a ojo” se queda corto.", d: "A mitad de obra aparecen costos que nadie calculó y la plata no alcanza." },
  { t: "Cada profesional va por su lado.", d: "Arquitecto, ingeniero y electricista no se coordinan, y los errores los pagas tú en obra." },
];

export type ServiceTab = "Diseñar" | "Planear" | "Controlar";
export type Service = { id: string; tab: ServiceTab; name: string; what: string; get: string; why: string; icon: string };

export const SERVICES: Service[] = [
  { id: "arquitectonico", tab: "Diseñar", icon: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6", name: "Diseño arquitectónico completo", what: "Del esquema básico hasta la licencia aprobada en curaduría.", get: "Fachadas e interiores con modelado 3D y renders de alta calidad.", why: "Ves tu proyecto terminado antes de construir y los planos salen preparados según la norma de tu municipio." },
  { id: "estructural", tab: "Diseñar", icon: "M4 20V4h16v16M4 12h16M12 4v16M4 4l16 16", name: "Diseño y cálculo estructural", what: "Cálculos, despieces, modelo 3D estructural y simulación de sismos.", get: "Estructura según la norma sismorresistente NSR-10, hasta la aprobación en curaduría.", why: "Tu familia y tu inversión protegidas, sin acero ni concreto de más." },
  { id: "electrico", tab: "Diseñar", icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8z", name: "Diseño eléctrico RETIE", what: "Diseño eléctrico y cantidades de obra.", get: "Planos listos para obtener el certificado RETIE.", why: "Sin certificado RETIE no hay conexión definitiva de energía." },
  { id: "hidrosanitario", tab: "Diseñar", icon: "M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z", name: "Diseño hidrosanitario", what: "Redes de agua potable, aguas residuales y aguas lluvias.", get: "Diseño según la norma para la conexión de servicios.", why: "Evitas filtraciones, malos olores y romper pisos después." },
  { id: "presupuesto", tab: "Planear", icon: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5", name: "Presupuesto de obra WBS", what: "Desglosamos cada actividad de la obra.", get: "El valor exacto de la construcción, proyectado en el tiempo y con las alzas de precios.", why: "Sabes cuánto cuesta antes de empezar, no a mitad de camino." },
  { id: "cronograma", tab: "Planear", icon: "M3 6h8M7 12h10M13 18h8M3 6v0M11 6l2 6M17 12l-2 6", name: "Cronograma con ruta crítica", what: "Programamos la obra con el método CPM.", get: "Las actividades que no pueden retrasarse, identificadas y optimizadas.", why: "Menos meses de obra son menos gastos." },
  { id: "flujo", tab: "Planear", icon: "M3 20h18M6 16v-4M10 16V8M14 16v-6M18 16V5", name: "Flujo de caja mes a mes", what: "Calculamos el dinero que necesita tu proyecto.", get: "Exactamente cuánto necesitas cada mes de obra.", why: "Planeas tu crédito o tus ahorros sin quedarte sin plata a mitad de la obra." },
  { id: "lean", tab: "Controlar", icon: "M4 4h10l6 6v10H4zM14 4v6h6M8 14l2 2 4-4", name: "Revisión de planos y Lean Construction", what: "Revisamos y coordinamos todos los planos entre sí antes de construir.", get: "Planos coordinados con metodología Lean Construction.", why: "Los errores se corrigen en el papel, que es donde son baratos." },
];

export type Package = { id: string; name: string; for: string; includes: string; note?: string; cta: string; recommended?: boolean; developer?: boolean };
export const PACKAGES: Package[] = [
  { id: "licencia", name: "Licencia Lista", for: "Para quien tiene lote y quiere su licencia.", includes: "Diseño arquitectónico con renders 3D, estructural NSR-10, eléctrico RETIE, hidrosanitario y trámite hasta aprobación en curaduría.", cta: "Cotizar este paquete" },
  { id: "llave", name: "Llave en Mano", for: "Todo lo de Licencia Lista, y además:", includes: "Presupuesto WBS, cronograma con ruta crítica y flujo de caja mes a mes.", note: "Para saber cuánto cuesta, cuánto tarda y cuánto pagas cada mes.", cta: "Cotizar este paquete", recommended: true },
  { id: "desarrolladores", name: "Desarrolladores", for: "Para constructoras e inversionistas.", includes: "Análisis de cabida del lote, todos los diseños, presupuesto, cronograma, flujo de caja y coordinación Lean Construction.", cta: "Agendar reunión", developer: true },
];

export type ProjectType = "Residencial" | "Corporativo" | "Comercial";
export type ArqProject = { slug: string; name: string; city?: string; label: string; types: ProjectType[]; m2?: number; year?: number; photos: { src: string; alt: string }[] };

/** Fotos de marcador: se reemplazan por las reales del proyecto. */
export const ARQ_PROJECTS: ArqProject[] = [
  { slug: "popayan-trade-center", name: "Popayán Trade Center", city: "Popayán", label: "Corporativo y comercial", types: ["Corporativo", "Comercial"], photos: [{ src: ptcFoto, alt: "Popayán Trade Center, edificio corporativo y comercial en Popayán" }, { src: ptcBoceto, alt: "Boceto a mano del Popayán Trade Center" }] },
  { slug: "casa-piedra-y-madera", name: "Casa Piedra y Madera", label: "Residencial", types: ["Residencial"], photos: [{ src: casaPiedra, alt: "Casa Piedra y Madera, vivienda en piedra y madera en la montaña" }] },
  { slug: "torre-residencial", name: "Torre Residencial", label: "Residencial", types: ["Residencial"], photos: [{ src: torre, alt: "Torre Residencial, edificio de apartamentos con balcones" }] },
  { slug: "casa-del-jardin", name: "Casa del Jardín", label: "Residencial", types: ["Residencial"], photos: [{ src: casaJardin, alt: "Casa del Jardín, vivienda de un piso con jardín interior" }] },
  { slug: "jds-factory", name: "JD's Factory", city: "Popayán", label: "Comercial", types: ["Comercial"], photos: [{ src: jds, alt: "JD's Factory, bodega y fábrica en Popayán" }] },
  { slug: "casa-cordillera", name: "Casa Cordillera", label: "Residencial", types: ["Residencial"], photos: [{ src: cordillera, alt: "Casa Cordillera, casa campestre con terraza en voladizo" }] },
];

export const REASONS = [
  { t: "Un solo equipo", d: "Arquitectura, estructura, eléctrico, hidrosanitario y presupuesto coordinados entre sí." },
  { t: "Números antes que ladrillos", d: "Presupuesto WBS, cronograma con ruta crítica y flujo de caja desde el inicio." },
  { t: "Obra real, no solo planos", d: "12 obras entregadas y más de 13.000 m² construidos." },
  { t: "Gerencia de proyectos", d: "Dirección con formación en gerencia de la construcción y MBA." },
  { t: "Norma al día", d: "NSR-10, RETIE y requisitos de curaduría." },
  { t: "Cerca, aunque estés lejos", d: "Reuniones por videollamada y avances en video si vives fuera." },
];

export const COMPARISON = [
  ["Coordinación entre profesionales", "Tú la haces", "La hacemos nosotros"],
  ["Presupuesto", "Aproximado", "Exacto por actividad"],
  ["Tiempos de obra", "Inciertos", "Ruta crítica definida"],
  ["Plata mes a mes", "Sorpresas", "Flujo de caja claro"],
  ["Responsable", "Varios", "Un solo equipo"],
] as const;

export const STEPS = [
  { t: "Analizamos tu lote", d: "Área, norma y lo que puedes construir." },
  { t: "Esquema básico", d: "La primera idea de tu proyecto." },
  { t: "Diseño y renders 3D", d: "Ves tu proyecto terminado." },
  { t: "Ingenierías y presupuesto", d: "Estructura, redes, costo exacto y cronograma." },
  { t: "Licencia aprobada", d: "Listo para construir." },
];

/** Vacío a propósito: se muestra el bloque solo cuando haya testimonios reales. */
export const TESTIMONIALS: { quote: string; author: string; project: string }[] = [];

export const FAQS = [
  { q: "¿Cómo se cobra?", a: "Por metro cuadrado, según el paquete y si el lote es plano o inclinado. Te enviamos una propuesta con el valor total y los pagos por etapa." },
  { q: "¿Cuánto tarda el diseño?", a: "Depende del tamaño del proyecto y de la curaduría de tu municipio. En la primera reunión te entregamos un cronograma con fechas." },
  { q: "¿Puedo contratar un solo servicio?", a: "Sí. Puedes tomar solo el diseño estructural, el eléctrico o el presupuesto, por ejemplo." },
  { q: "¿Ustedes tramitan la licencia?", a: "Sí. Acompañamos el proyecto hasta su aprobación en curaduría." },
  { q: "¿Qué necesito para empezar?", a: "Ubicación y área del lote, y si lo tienes, el certificado de tradición. Si no lo tienes, te guiamos." },
  { q: "¿Trabajan en mi ciudad?", a: "Atendemos Popayán, Cali, el Eje Cafetero y Medellín. Si tu lote está en otra ciudad, escríbenos." },
  { q: "¿Y si vivo fuera de Colombia?", a: "Hacemos todo por videollamada, te enviamos avances en video y firmas digitalmente." },
];

export const PROJECT_TYPES = ["Casa o finca", "Edificio de vivienda", "Local o edificio comercial", "Oficinas", "Remodelación", "Otro"];
export const HAS_LOT = ["Sí", "No", "Lo estoy comprando"];
export const STAGES = ["Solo tengo la idea", "Tengo planos", "Ya tengo licencia"];
export const BUDGETS = ["Menos de $200 millones", "$200 a $500 millones", "$500 a $1.000 millones", "Más de $1.000 millones", "Aún no lo sé"];
export const RESIDENCE = ["Vivo en Colombia", "Vivo en el exterior"];
