import hero from "../assets/arquitectura/casa-rengifo-popayan-obra-entregada.webp";
import heroSm from "../assets/arquitectura/casa-rengifo-popayan-obra-entregada-640.webp";
import render from "../assets/arquitectura/casa-rengifo-render-3d.webp";
import renderSm from "../assets/arquitectura/casa-rengifo-render-3d-640.webp";
import obra from "../assets/arquitectura/casa-rengifo-obra-entregada.webp";
import obraSm from "../assets/arquitectura/casa-rengifo-obra-entregada-640.webp";
import exterior from "../assets/arquitectura/casa-ballesteros-campestre-noche.webp";
import exteriorSm from "../assets/arquitectura/casa-ballesteros-campestre-noche-640.webp";
import popayan from "../assets/arquitectura/popayan-trade-center-ciudad.webp";
import popayanSm from "../assets/arquitectura/popayan-trade-center-ciudad-640.webp";

import ptc1 from "../assets/arquitectura/ptc-1.webp";
import ptc1Sm from "../assets/arquitectura/ptc-1-640.webp";
import ptc2 from "../assets/arquitectura/ptc-2.webp";
import ptc3 from "../assets/arquitectura/ptc-3.webp";
import ptc4 from "../assets/arquitectura/ptc-4.webp";
import ren1 from "../assets/arquitectura/rengifo-1.webp";
import ren1Sm from "../assets/arquitectura/rengifo-1-640.webp";
import ren2 from "../assets/arquitectura/rengifo-2.webp";
import ren3 from "../assets/arquitectura/rengifo-3.webp";
import ren4 from "../assets/arquitectura/rengifo-4.webp";
import ren5 from "../assets/arquitectura/rengifo-5.webp";
import ren6 from "../assets/arquitectura/rengifo-6.webp";
import bal1 from "../assets/arquitectura/ballesteros-1.webp";
import bal1Sm from "../assets/arquitectura/ballesteros-1-640.webp";
import bal2 from "../assets/arquitectura/ballesteros-2.webp";
import bal3 from "../assets/arquitectura/ballesteros-3.webp";
import bal4 from "../assets/arquitectura/ballesteros-4.webp";
import bal5 from "../assets/arquitectura/ballesteros-5.webp";
import ie1 from "../assets/arquitectura/ie-suites-1.webp";
import ie1Sm from "../assets/arquitectura/ie-suites-1-640.webp";
import ie2 from "../assets/arquitectura/ie-suites-2.webp";
import jds1 from "../assets/arquitectura/jds-1.webp";
import jds1Sm from "../assets/arquitectura/jds-1-640.webp";
import jds2 from "../assets/arquitectura/jds-2.webp";
import jds3 from "../assets/arquitectura/jds-3.webp";
import jds4 from "../assets/arquitectura/jds-4.webp";
import jds5 from "../assets/arquitectura/jds-5.webp";
import vel1 from "../assets/arquitectura/velasco-1.webp";
import vel1Sm from "../assets/arquitectura/velasco-1-640.webp";
import vel2 from "../assets/arquitectura/velasco-2.webp";
import vel3 from "../assets/arquitectura/velasco-3.webp";
import vel4 from "../assets/arquitectura/velasco-4.webp";
import vel5 from "../assets/arquitectura/velasco-5.webp";
import bos1 from "../assets/arquitectura/bosques-1.webp";
import bos1Sm from "../assets/arquitectura/bosques-1-640.webp";
import bos2 from "../assets/arquitectura/bosques-2.webp";
import bos3 from "../assets/arquitectura/bosques-3.webp";
import vil1 from "../assets/arquitectura/villegas-1.webp";
import vil1Sm from "../assets/arquitectura/villegas-1-640.webp";
import vil2 from "../assets/arquitectura/villegas-2.webp";
import vil3 from "../assets/arquitectura/villegas-3.webp";
import aria1 from "../assets/arquitectura/aria-1.webp";
import aria1Sm from "../assets/arquitectura/aria-1-640.webp";
import aria2 from "../assets/arquitectura/aria-2.webp";
import aria3 from "../assets/arquitectura/aria-3.webp";
import aria4 from "../assets/arquitectura/aria-4.webp";
import sah1 from "../assets/arquitectura/sahara-1.webp";
import sah1Sm from "../assets/arquitectura/sahara-1-640.webp";
import sah2 from "../assets/arquitectura/sahara-2.webp";
import riu1 from "../assets/arquitectura/riu-1.webp";
import riu1Sm from "../assets/arquitectura/riu-1-640.webp";
import riu2 from "../assets/arquitectura/riu-2.webp";
import riu3 from "../assets/arquitectura/riu-3.webp";

export const ARQ_IMAGES = { hero, render, obra, exterior, popayan };

/** srcset por imagen: versión de 640 px para celular y la grande para escritorio. */
export const ARQ_SRCSET: Record<string, string> = {
  [hero]: `${heroSm} 640w, ${hero} 1290w`,
  [render]: `${renderSm} 640w, ${render} 864w`,
  [obra]: `${obraSm} 640w, ${obra} 1280w`,
  [exterior]: `${exteriorSm} 640w, ${exterior} 1280w`,
  [popayan]: `${popayanSm} 640w, ${popayan} 1402w`,
  [ptc1]: `${ptc1Sm} 640w, ${ptc1} 1280w`,
  [ren1]: `${ren1Sm} 640w, ${ren1} 1280w`,
  [bal1]: `${bal1Sm} 640w, ${bal1} 1280w`,
  [ie1]: `${ie1Sm} 640w, ${ie1} 1091w`,
  [jds1]: `${jds1Sm} 640w, ${jds1} 1280w`,
  [vel1]: `${vel1Sm} 640w, ${vel1} 1280w`,
  [bos1]: `${bos1Sm} 640w, ${bos1} 1080w`,
  [vil1]: `${vil1Sm} 640w, ${vil1} 1280w`,
  [aria1]: `${aria1Sm} 640w, ${aria1} 1254w`,
  [sah1]: `${sah1Sm} 640w, ${sah1} 1106w`,
  [riu1]: `${riu1Sm} 640w, ${riu1} 1280w`,
};
export const srcSetFor = (src: string) => ARQ_SRCSET[src];

export const STATS: { num: number; prefix?: string; suffix?: string; plain?: boolean; fixed?: boolean; label: string }[] = [
  { num: 12, label: "Obras entregadas" },
  { num: 13063, suffix: " m²", label: "Construidos y entregados" },
  { num: 17, label: "Diseños arquitectónicos" },
  { num: 2014, plain: true, fixed: true, label: "Construyendo desde" },
];
export const CITIES_LINE = "POPAYÁN · CALI · EJE CAFETERO · MEDELLÍN";

export const PROBLEMS = [
  { t: "Empezaste con una cifra y a mitad de obra la plata ya no alcanza.", d: "El presupuesto se hizo “a ojo”, sin cantidades reales, y cada semana aparece algo que nadie calculó." },
  { t: "La obra que iba a durar unos meses ya lleva años.", d: "Sin cronograma, cada atraso arrastra al siguiente. Mientras tanto sigues pagando arriendo, intereses y mano de obra." },
  { t: "La curaduría te devolvió los planos. Otra vez.", d: "Cada corrección son semanas perdidas. Y construir sin licencia puede terminar en multas, sellamiento de la obra o hasta orden de demolición." },
  { t: "Las decisiones se toman en obra, al ojo.", d: "Sin planos completos, los errores quedan enterrados en el concreto y los descubres cuando ya no tienen arreglo barato." },
  { t: "Tú pones la plata, pero no tienes el control.", d: "No sabes cuánto se ha gastado, cuánto falta ni cuándo vas a recibir las llaves." },
];

export const IMAGINE = [
  "Saber hoy cuánto vas a pagar en el mes siete de tu obra.",
  "Recorrer tu casa en 3D antes de comprar el primer bulto de cemento.",
  "Recibir las llaves en la fecha que te dijeron.",
];

export type ServiceTab = "Diseñar" | "Planear" | "Controlar";
export type Service = { id: string; tab: ServiceTab; name: string; hook: string; without: string; withUs: string; get: string; icon: string };

export const SERVICES: Service[] = [
  { id: "arquitectonico", tab: "Diseñar", icon: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6", name: "Diseño arquitectónico completo",
    hook: "Tu casa, pensada para tu forma de vivir y lista para curaduría.",
    without: "Espacios que no funcionan, fachadas sin carácter y planos que la curaduría devuelve.",
    withUs: "Diseñamos desde el esquema básico hasta la licencia aprobada. Ves tu proyecto en renders 3D de alta calidad y lo ajustas en papel, donde cambiar no cuesta obra.",
    get: "Planos arquitectónicos · fachadas · interiores · modelo 3D · renders · radicación y seguimiento en curaduría" },
  { id: "estructural", tab: "Diseñar", icon: "M4 20V4h16v16M4 12h16M12 4v16M4 4l16 16", name: "Diseño y cálculo estructural",
    hook: "Lo que no se ve es lo que sostiene a tu familia.",
    without: "Estructuras que botan plata en acero y concreto de más o, peor, que no están preparadas para un sismo.",
    withUs: "Cálculo bajo la norma sismorresistente NSR-10, modelo 3D estructural y simulación de sismos. Venimos de Popayán: sabemos por qué esta norma no es un trámite.",
    get: "Memorias de cálculo · planos estructurales · despieces · cantidades · aprobación en curaduría" },
  { id: "electrico", tab: "Diseñar", icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8z", name: "Diseño eléctrico RETIE",
    hook: "Que la luz llegue el día que te mudas.",
    without: "Sin certificado RETIE el operador de red no hace la conexión definitiva, y una instalación mal diseñada es un riesgo de incendio.",
    withUs: "Diseño completo, cuadros de carga y cantidades hasta obtener el certificado.",
    get: "Planos eléctricos · memorias · cantidades · acompañamiento hasta el certificado RETIE" },
  { id: "hidrosanitario", tab: "Diseñar", icon: "M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z", name: "Diseño hidrosanitario",
    hook: "Cero humedades, cero olores, cero pisos rotos.",
    without: "Filtraciones y malos olores que aparecen al año y se arreglan rompiendo acabados.",
    withUs: "Redes de agua potable, aguas residuales y aguas lluvias según la norma, listas para la conexión de servicios.",
    get: "Planos hidrosanitarios · memorias · cantidades" },
  { id: "presupuesto", tab: "Planear", icon: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5", name: "Presupuesto de obra WBS",
    hook: "El precio real de tu obra, antes de empezarla.",
    without: "El presupuesto “a ojo” que se queda corto a mitad de camino.",
    withUs: "Desglosamos tu obra actividad por actividad con metodología WBS y proyectamos las alzas de precios en el tiempo.",
    get: "Presupuesto detallado con cantidades y precios unitarios" },
  { id: "cronograma", tab: "Planear", icon: "M3 6h8M7 12h10M13 18h8M3 6v0M11 6l2 6M17 12l-2 6", name: "Cronograma con ruta crítica",
    hook: "La fecha de entrega deja de ser un “más o menos”.",
    without: "Atrasos encadenados y meses extra de arriendo, intereses y mano de obra.",
    withUs: "Programamos con el método de ruta crítica (CPM). Sabemos qué actividades no pueden retrasarse y las cuidamos.",
    get: "Cronograma semana a semana con su ruta crítica" },
  { id: "flujo", tab: "Planear", icon: "M3 20h18M6 16v-4M10 16V8M14 16v-6M18 16V5", name: "Flujo de caja mes a mes",
    hook: "Sabrás cuánto pagar cada mes. Sin sustos.",
    without: "Obras paradas porque la plata se acabó antes de tiempo.",
    withUs: "Te decimos exactamente cuánto necesita tu proyecto cada mes, de principio a fin, para que planees tu crédito o tus ahorros con certeza.",
    get: "Flujo de caja mensual del proyecto" },
  { id: "lean", tab: "Controlar", icon: "M4 4h10l6 6v10H4zM14 4v6h6M8 14l2 2 4-4", name: "Revisión de planos y Lean Construction",
    hook: "Los errores se pagan en papel, no en obra.",
    without: "Planos que no coinciden entre sí y que se descubren cuando ya está fundido el concreto.",
    withUs: "Revisamos y coordinamos todos los diseños entre sí antes de construir, y aplicamos Lean Construction para eliminar desperdicios de tiempo y material.",
    get: "Informe de revisión · plan de trabajo coordinado" },
];

export type Package = { id: string; name: string; for: string; includes: string; note?: string; cta: string; recommended?: boolean; developer?: boolean };
export const PACKAGES: Package[] = [
  { id: "licencia", name: "Licencia Lista", for: "Para quien necesita su licencia y planos completos para construir.", includes: "Diseño arquitectónico con renders 3D, estructural NSR-10, eléctrico RETIE, hidrosanitario y trámite hasta aprobación en curaduría.", cta: "Cotizar este paquete" },
  { id: "llave", name: "Llave en Mano", for: "Para quien no quiere sorpresas: todo lo de Licencia Lista, y además:", includes: "Presupuesto WBS, cronograma con ruta crítica y flujo de caja mes a mes.", note: "Si vas a invertir el ahorro de muchos años, este es el tuyo.", cta: "Cotizar este paquete", recommended: true },
  { id: "desarrolladores", name: "Desarrolladores", for: "Para constructoras e inversionistas que necesitan que los números cuadren.", includes: "Análisis de cabida del lote, todos los diseños, presupuesto, cronograma, flujo de caja y coordinación Lean Construction.", cta: "Agendar reunión", developer: true },
];

export type ProjectType = "Residencial" | "Corporativo" | "Comercial" | "Remodelación";
export type ProjectStatus = "Entregado" | "En obra" | "Diseño";
export type ArqProject = { slug: string; name: string; city?: string; label: string; types: ProjectType[]; status: ProjectStatus; m2?: number; year?: string; photos: { src: string; alt: string }[] };

/** Proyectos reales del equipo. Los que están en diseño o en obra muestran renders. */
export const ARQ_PROJECTS: ArqProject[] = [
  { slug: "popayan-trade-center", name: "Popayán Trade Center", city: "Popayán", label: "Corporativo y comercial", types: ["Corporativo", "Comercial"], status: "Entregado", m2: 8696, year: "2024", photos: [
    { src: ptc1, alt: "Popayán Trade Center, edificio corporativo con fachada de vidrio en Popayán" },
    { src: ptc2, alt: "Fachada de vidrio y paneles del Popayán Trade Center" },
    { src: ptc3, alt: "Acceso del Popayán Trade Center con su logo y jardín vertical" },
    { src: ptc4, alt: "Lobby del Popayán Trade Center con jardines verticales" },
  ] },
  { slug: "casa-rengifo", name: "Casa Rengifo", city: "Popayán", label: "Residencial", types: ["Residencial"], status: "Entregado", m2: 644, year: "2023", photos: [
    { src: ren1, alt: "Casa Rengifo terminada, fachada principal en Popayán" },
    { src: ren2, alt: "Doble altura con escalera de vidrio en la Casa Rengifo" },
    { src: ren3, alt: "Cocina con isla y ventanales en la Casa Rengifo" },
    { src: ren4, alt: "Habitación principal con vista a la montaña en la Casa Rengifo" },
    { src: ren5, alt: "Render 3D de la fachada de la Casa Rengifo" },
    { src: ren6, alt: "Render 3D de la sala de la Casa Rengifo" },
  ] },
  { slug: "casa-ballesteros", name: "Casa Ballesteros", city: "Popayán", label: "Residencial campestre", types: ["Residencial"], status: "Entregado", m2: 543, year: "2020", photos: [
    { src: bal1, alt: "Casa campestre Ballesteros iluminada al atardecer" },
    { src: bal2, alt: "Casa campestre Ballesteros con corredor y jardín" },
    { src: bal3, alt: "Fachada lateral de la Casa Ballesteros en piedra y madera" },
    { src: bal4, alt: "Sala y comedor de la Casa Ballesteros" },
    { src: bal5, alt: "Patio interior con jardín en la Casa Ballesteros" },
  ] },
  { slug: "edificio-ie-suites", name: "Edificio IE Suites", city: "Popayán", label: "Vivienda multifamiliar", types: ["Residencial"], status: "Entregado", m2: 560, year: "2016", photos: [
    { src: ie1, alt: "Edificio IE Suites con jardines verticales en Popayán" },
    { src: ie2, alt: "Detalle de jardín iluminado y cocina de un apartamento en IE Suites" },
  ] },
  { slug: "jds-factory", name: "JD's Factory", city: "Popayán", label: "Comercial · restaurante", types: ["Comercial"], status: "Entregado", m2: 381, year: "2021", photos: [
    { src: jds1, alt: "Restaurante JD's Factory en Popayán, fachada en forma de botella" },
    { src: jds2, alt: "Fachada iluminada de noche del restaurante JD's Factory" },
    { src: jds3, alt: "Interior del JD's Factory con barriles y logo iluminado" },
    { src: jds4, alt: "Jardín vertical en el acceso del JD's Factory" },
    { src: jds5, alt: "Baños con lavamanos en barril en el JD's Factory" },
  ] },
  { slug: "remodelacion-casa-velasco", name: "Remodelación Casa Velasco", city: "Popayán", label: "Remodelación de vivienda", types: ["Remodelación", "Residencial"], status: "Entregado", m2: 162, year: "2025", photos: [
    { src: vel1, alt: "Muro verde y consola en la remodelación de la Casa Velasco" },
    { src: vel2, alt: "Cocina remodelada con barra en la Casa Velasco" },
    { src: vel3, alt: "Comedor con lámpara de cristal en la Casa Velasco" },
    { src: vel4, alt: "Sala remodelada de la Casa Velasco" },
    { src: vel5, alt: "Cocina con cielo raso en madera en la Casa Velasco" },
  ] },
  { slug: "fachadas-bosques-del-campestre", name: "Fachadas Bosques del Campestre", city: "Popayán", label: "Remodelación de fachadas", types: ["Remodelación"], status: "Entregado", m2: 777, year: "2025", photos: [
    { src: bos1, alt: "Antes y después de las fachadas del conjunto Bosques del Campestre" },
    { src: bos2, alt: "Antes y después de la zona común del conjunto Bosques del Campestre" },
    { src: bos3, alt: "Fachada remodelada en el conjunto Bosques del Campestre" },
  ] },
  { slug: "casa-villegas", name: "Casa Villegas", city: "Popayán", label: "Residencial", types: ["Residencial"], status: "En obra", m2: 280, year: "2026", photos: [
    { src: vil1, alt: "Render 3D de la fachada de la Casa Villegas" },
    { src: vil2, alt: "Render 3D de la sala y cocina de la Casa Villegas" },
    { src: vil3, alt: "Avance de obra de la Casa Villegas: columnas y cimentación" },
  ] },
  { slug: "aria-condominio", name: "ARIA Condominio", city: "Popayán", label: "Vivienda en altura", types: ["Residencial"], status: "Diseño", m2: 12753, photos: [
    { src: aria1, alt: "Render 3D de la torre de ARIA Condominio al atardecer" },
    { src: aria2, alt: "Render 3D de la fachada de ARIA Condominio" },
    { src: aria3, alt: "Render 3D del lobby de ARIA Condominio" },
    { src: aria4, alt: "Render 3D de la piscina en la terraza de ARIA Condominio" },
  ] },
  { slug: "edificio-sahara", name: "Edificio Sahara", city: "Popayán", label: "Vivienda en altura", types: ["Residencial"], status: "Diseño", photos: [
    { src: sah1, alt: "Render 3D del Edificio Sahara con fachada orgánica" },
    { src: sah2, alt: "Render 3D nocturno del Edificio Sahara" },
  ] },
  { slug: "casa-riu", name: "Casa RIU", city: "Popayán", label: "Residencial", types: ["Residencial"], status: "Diseño", photos: [
    { src: riu1, alt: "Render 3D del acceso y garaje de la Casa RIU" },
    { src: riu2, alt: "Render 3D de la piscina de la Casa RIU" },
    { src: riu3, alt: "Render 3D de la sala comedor de la Casa RIU" },
  ] },
];

export const REASONS = [
  { t: "Un solo responsable", d: "Si algo falla no hay a quién echarle la culpa: respondemos nosotros. Tú no tienes que coordinar a cinco profesionales." },
  { t: "Números antes que ladrillos", d: "Presupuesto, cronograma y flujo de caja antes de empezar. Sabes exactamente en qué te metes." },
  { t: "Construimos, no solo dibujamos", d: "12 obras entregadas y 13.063 m² construidos. Sabemos lo que pasa en obra porque estamos en obra." },
  { t: "Gerencia de nivel inversionista", d: "Formación en arquitectura, gerencia de la construcción y MBA. Tu obra se maneja como un proyecto de inversión." },
  { t: "La norma, de memoria", d: "NSR-10, RETIE y curaduría, desde la ciudad donde nació la norma sismorresistente del país." },
  { t: "Cerca, aunque estés lejos", d: "Videollamadas, avances en video y firma digital." },
];

export const COMPARISON = [
  ["Presupuesto", "Aproximado; la plata se acaba a mitad", "Exacto, actividad por actividad"],
  ["Tiempo", "“Más o menos unos meses”", "Ruta crítica con fechas"],
  ["Plata mes a mes", "Sorpresas", "Flujo de caja claro"],
  ["Coordinación", "Tú, entre varios profesionales", "Un solo equipo"],
  ["Licencia", "Idas y vueltas a la curaduría", "Radicamos y hacemos seguimiento"],
  ["Si algo falla", "Cada uno culpa al otro", "Respondemos nosotros"],
] as const;

export const STEPS = [
  { t: "Analizamos tu lote", d: "Tú recibes: lo que la norma te permite construir y una primera idea de inversión." },
  { t: "Esquema básico", d: "Tú recibes: la primera idea de tu proyecto para aprobar o ajustar." },
  { t: "Diseño y renders 3D", d: "Tú recibes: tu proyecto terminado en imágenes, antes de construir." },
  { t: "Ingenierías y números", d: "Tú recibes: estructura, redes, presupuesto exacto, cronograma y flujo de caja." },
  { t: "Licencia aprobada", d: "Tú recibes: todo listo para empezar a construir." },
];

export const COMMITMENTS = [
  { t: "Precio claro antes de empezar.", d: "Tu propuesta trae el valor total y los pagos por etapa." },
  { t: "Fechas en un cronograma.", d: "Nada de “más o menos”." },
  { t: "Un solo responsable.", d: "Un equipo que responde por todo el proyecto." },
  { t: "Tu primer análisis del lote, sin costo.", d: "Conoces lo que puedes construir antes de pagar nada." },
];

/** Vacío a propósito: se muestra el bloque solo cuando haya testimonios reales. */
export const TESTIMONIALS: { quote: string; author: string; project: string }[] = [];

export const FAQS = [
  { q: "¿No sale más barato contratar solo un maestro de obra?", a: "Al principio parece más barato. Pero sin planos completos, presupuesto ni cronograma, los sobrecostos y los arreglos suelen costar mucho más que el diseño. El maestro de obra es clave para construir; nosotros nos aseguramos de que construya sobre un plan." },
  { q: "¿Cuánto cuesta?", a: "Cobramos por metro cuadrado según el paquete y si el lote es plano o inclinado. Te enviamos una propuesta con el valor total y los pagos por etapa. La calculadora te da una primera idea en 60 segundos." },
  { q: "¿Cuánto tarda el diseño?", a: "Depende del tamaño del proyecto y de la curaduría de tu municipio. En la primera reunión te entregamos un cronograma con fechas." },
  { q: "Ya tengo planos, ¿me sirven?", a: "Los revisamos. Si están completos, arrancamos con presupuesto, cronograma y flujo de caja. Si les falta algo, te decimos exactamente qué." },
  { q: "¿Puedo contratar un solo servicio?", a: "Sí. Puedes tomar, por ejemplo, solo el diseño estructural, el eléctrico o el presupuesto." },
  { q: "¿Ustedes tramitan la licencia?", a: "Sí. Radicamos y hacemos seguimiento hasta la aprobación en curaduría." },
  { q: "¿Qué necesito para empezar?", a: "La ubicación y el área de tu lote, y si lo tienes, el certificado de tradición. Si no lo tienes, te guiamos." },
  { q: "¿Trabajan en mi ciudad?", a: "Atendemos Popayán, Cali, el Eje Cafetero y Medellín. Si tu lote está en otra ciudad, escríbenos." },
  { q: "Vivo fuera de Colombia, ¿cómo controlo todo?", a: "Con presupuesto exacto antes de girar, avances en video cada semana, reuniones por videollamada y firma digital." },
];

export const PROJECT_TYPES = ["Casa o finca", "Edificio de vivienda", "Local o edificio comercial", "Oficinas", "Remodelación", "Desarrollador", "Otro"];
export const HAS_LOT = ["Sí", "No", "Lo estoy comprando"];
export const STAGES = ["Solo tengo la idea", "Tengo planos", "Ya tengo licencia"];
export const BUDGETS = ["Menos de $200 millones", "$200 a $500 millones", "$500 a $1.000 millones", "Más de $1.000 millones", "Aún no lo sé"];
export const RESIDENCE = ["Vivo en Colombia", "Vivo en el exterior"];

/** Mensaje del héroe según el anuncio (?servicio=). */
export type HeroMsg = { h1: string; gold: string; sub: string };
export const HERO_DEFAULT: HeroMsg = {
  h1: "La casa que sueñas, sin la pesadilla de construirla.", gold: "sin la pesadilla",
  sub: "Diseñamos, licenciamos, presupuestamos y dirigimos tu proyecto con un solo equipo. Antes de poner el primer ladrillo sabrás cuánto cuesta, cuánto tarda y cuánto vas a pagar cada mes.",
};
export const HERO_BY_SERVICE: Record<string, HeroMsg & { prefill: { services?: string[]; packages?: string[]; projectType?: string; residence?: string } }> = {
  licencia: { h1: "Planos listos para la curaduría, sin vueltas.", gold: "sin vueltas.", sub: "Diseño arquitectónico e ingenierías hasta la licencia aprobada.", prefill: { packages: ["licencia"] } },
  campestre: { h1: "La casa de campo que imaginas, con el costo exacto.", gold: "costo exacto.", sub: "Diseño, licencia y presupuesto antes de poner un ladrillo.", prefill: { projectType: "Casa o finca", services: ["arquitectonico"] } },
  estructural: { h1: "Diseño estructural NSR-10 con simulación de sismos.", gold: "NSR-10", sub: "Cálculos, despieces y modelo 3D hasta la aprobación en curaduría.", prefill: { services: ["estructural"] } },
  electrico: { h1: "Diseño eléctrico hasta tu certificado RETIE.", gold: "RETIE.", sub: "Diseño y cantidades listos para conectar tu proyecto.", prefill: { services: ["electrico"] } },
  presupuesto: { h1: "Sabe cuánto cuesta tu obra antes de empezar.", gold: "antes de empezar.", sub: "Presupuesto WBS, cronograma con ruta crítica y flujo de caja mes a mes.", prefill: { services: ["presupuesto"] } },
  exterior: { h1: "Construye en Colombia sin estar allá.", gold: "sin estar allá.", sub: "Diseño, licencia y obra con reuniones por videollamada y avances en video.", prefill: { residence: "Vivo en el exterior" } },
  desarrolladores: { h1: "Proyectos que no se salen del presupuesto.", gold: "presupuesto.", sub: "Diseño, ingenierías y planeación para vivienda en altura, comercio y oficinas.", prefill: { packages: ["desarrolladores"], projectType: "Desarrollador" } },
};
export const heroFor = (servicio?: string) => (servicio && HERO_BY_SERVICE[servicio]) || HERO_DEFAULT;
