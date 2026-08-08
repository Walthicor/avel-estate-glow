import type { Locale } from "../config/site";

export type AboutContent = {
  seoTitle: string;
  seoDescription: string;
  hero: { statement: string; sub: string };
  founder: {
    label: string;
    name: string;
    role: string;
    body: string[];
    credentialsLabel: string;
    credentials: string[];
    photoAlt: string;
  };
  how: { label: string; heading: string; body: string[] };
  paid: { label: string; heading: string; sentence: string; body: string[] };
  legal: { label: string; heading: string; rows: { label: string; value: string }[]; note: string };
};

const en: AboutContent = {
  seoTitle: "About AVEL Estates",
  seoDescription:
    "AVEL Estates is a Colombian real estate agency built for buyers who are not in Colombia. Who we are, how we work, and how we are paid.",
  hero: {
    statement:
      "AVEL Estates is a Colombian real estate agency built for buyers who are not in Colombia.",
    sub: "Everything below is a fact you can verify, not a mission statement.",
  },
  founder: {
    label: "Founder",
    name: "Andrés Vélez",
    role: "Founder and principal broker",
    body: [
      "I grew up in Medellín and spent nine years working with developers across Antioquia, Bolívar and Cundinamarca before starting AVEL. Most of that time was spent on the side of the table you never see: reviewing title histories, chasing licences, and explaining to a buyer in another time zone why a delivery date slipped by two quarters.",
      "The reason this agency exists is narrow. A buyer who is physically in Colombia can walk a site, meet a developer and read a room. A buyer who is not needs someone whose job is to tell them what they would have seen. That is the entire product.",
      "I answer enquiries personally. If a property is wrong for you, you will hear that from me before you hear about a reservation fee.",
    ],
    credentialsLabel: "Credentials",
    credentials: [
      "Nine years in Colombian residential and pre-construction sales",
      "Registered real estate agent, Cámara de Comercio de Medellín",
      "Certified in real estate brokerage (Lonja de Propiedad Raíz de Medellín y Antioquia)",
      "Works in Spanish and English",
    ],
    photoAlt: "Andrés Vélez, founder of AVEL Estates, photographed in Medellín",
  },
  how: {
    label: "How we work",
    heading: "We represent selected developments across Colombia.",
    body: [
      "We hold direct agreements with developers and partner firms in Medellín, Cartagena, Bogotá and Santa Marta. Every property on this site comes from one of those agreements — we do not list units we cannot speak to the developer about directly.",
      "Selection is deliberately narrow. Before a development appears here we read the certificado de tradición y libertad, the building licence and the developer's delivery record on prior projects. If any of the three does not hold up, the development does not go on the site, regardless of how well it would sell.",
      "For buyers abroad we handle the parts that require presence in Colombia: site visits on video, document collection, coordination with your lawyer or ours, and the notary and registration steps. You are not asked to fly here to sign anything.",
    ],
  },
  paid: {
    label: "How we are paid",
    heading: "The developer pays the commission. You pay nothing extra.",
    sentence:
      "Our fee is paid by the developer out of the sale price. The price you pay is the same price you would pay walking into the sales room alone.",
    body: [
      "There is no buyer's fee, no retainer and no search fee. Because our fee sits inside the developer's existing sales budget, sending you to a different development does not change what we earn in a way that would justify pointing you at the wrong one.",
      "Where a purchase needs independent legal counsel, a translation, a power of attorney or an apostille, those are third-party costs paid directly by you to the provider. We tell you the amount before it is incurred and we do not mark it up.",
    ],
  },
  legal: {
    label: "Legal identity",
    heading: "Who you are actually contracting with.",
    rows: [
      { label: "Registered company name", value: "AVEL Inmobiliaria S.A.S." },
      { label: "Registered address", value: "Medellín, Antioquia, Colombia" },
    ],
    note:
      "Ask us for the certificado de existencia y representación legal at any point and we will send the current one.",
  },
};

const es: AboutContent = {
  seoTitle: "Sobre AVEL Estates",
  seoDescription:
    "AVEL Estates es una agencia inmobiliaria colombiana creada para compradores que no están en Colombia. Quiénes somos, cómo trabajamos y cómo nos pagan.",
  hero: {
    statement:
      "AVEL Estates es una agencia inmobiliaria colombiana creada para compradores que no están en Colombia.",
    sub: "Todo lo que sigue es un dato verificable, no una declaración de misión.",
  },
  founder: {
    label: "Fundador",
    name: "Andrés Vélez",
    role: "Fundador y corredor principal",
    body: [
      "Crecí en Medellín y trabajé nueve años con constructoras en Antioquia, Bolívar y Cundinamarca antes de crear AVEL. La mayor parte de ese tiempo transcurrió del lado que nunca se ve: revisando tradiciones, persiguiendo licencias y explicándole a un comprador en otro huso horario por qué la entrega se corrió dos trimestres.",
      "La razón de existir de esta agencia es estrecha. Quien está físicamente en Colombia puede recorrer la obra, conocer al constructor y leer el ambiente. Quien no está necesita a alguien cuyo trabajo sea contarle lo que habría visto. Eso es todo el producto.",
      "Respondo las solicitudes personalmente. Si una propiedad no le sirve, se lo diré antes de hablarle de una cuota de separación.",
    ],
    credentialsLabel: "Credenciales",
    credentials: [
      "Nueve años en venta residencial y sobre planos en Colombia",
      "Agente inmobiliario registrado, Cámara de Comercio de Medellín",
      "Certificado en corretaje inmobiliario (Lonja de Propiedad Raíz de Medellín y Antioquia)",
      "Trabaja en español e inglés",
    ],
    photoAlt: "Andrés Vélez, fundador de AVEL Estates, fotografiado en Medellín",
  },
  how: {
    label: "Cómo trabajamos",
    heading: "Representamos proyectos seleccionados en toda Colombia.",
    body: [
      "Tenemos acuerdos directos con constructoras y firmas aliadas en Medellín, Cartagena, Bogotá y Santa Marta. Cada propiedad de este sitio proviene de uno de esos acuerdos: no publicamos unidades cuyo constructor no podamos consultar directamente.",
      "La selección es deliberadamente estrecha. Antes de publicar un proyecto leemos el certificado de tradición y libertad, la licencia de construcción y el historial de entregas del constructor. Si alguno de los tres no se sostiene, el proyecto no entra al sitio, por bien que se vendiera.",
      "Para compradores en el exterior asumimos lo que exige presencia en Colombia: visitas en video, recolección de documentos, coordinación con su abogado o el nuestro, y los pasos de notaría y registro. No le pedimos viajar para firmar.",
    ],
  },
  paid: {
    label: "Cómo nos pagan",
    heading: "La comisión la paga la constructora. Usted no paga nada adicional.",
    sentence:
      "Nuestros honorarios los paga la constructora dentro del precio de venta. El precio que usted paga es el mismo que pagaría entrando solo a la sala de ventas.",
    body: [
      "No hay comisión de comprador, ni anticipo, ni cuota de búsqueda. Como nuestros honorarios están dentro del presupuesto comercial que la constructora ya tiene, llevarlo a otro proyecto no cambia lo que ganamos de una forma que justifique enviarlo al proyecto equivocado.",
      "Cuando la compra requiere abogado independiente, traducción, poder o apostilla, esos son costos de terceros que usted paga directamente al proveedor. Le informamos el monto antes de causarlo y no lo recargamos.",
    ],
  },
  legal: {
    label: "Identidad legal",
    heading: "Con quién está contratando realmente.",
    rows: [
      { label: "Razón social", value: "AVEL Inmobiliaria S.A.S." },
      { label: "Domicilio", value: "Medellín, Antioquia, Colombia" },
    ],
    note:
      "Pídanos el certificado de existencia y representación legal cuando quiera y le enviamos el vigente.",
  },
};

export const ABOUT: Record<Locale, AboutContent> = { en, es };
