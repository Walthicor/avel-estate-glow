import { SITE } from "../config/site";
import type { Locale } from "../config/site";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CookieRow = {
  name: string;
  purpose: string;
  duration: string;
  category: string;
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies" | "habeas-data";
  seoTitle: string;
  seoDescription: string;
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
  cookieTable?: {
    heading: string;
    columns: [string, string, string, string];
    rows: CookieRow[];
  };
};

export type LegalPack = {
  updatedLabel: string;
  docs: Record<LegalDoc["slug"], LegalDoc>;
};

/** Canonical EN paths. ES routes mirror them under /es. */
export const LEGAL_PATHS: Record<LegalDoc["slug"], string> = {
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
  "habeas-data": "/legal/habeas-data",
};

const CONTROLLER_EN = [
  "Data controller: AVEL Inmobiliaria S.A.S. (AVEL Estates), NIT 901.XXX.XXX-X, registered with the Cámara de Comercio de Medellín para Antioquia, domiciled in Medellín, Antioquia, Colombia.",
  `Channel to exercise your rights and to file enquiries, requests or complaints: ${SITE.publicEmail}. We respond to enquiries within ten (10) business days and to complaints within fifteen (15) business days, as required by Law 1581 of 2012.`,
];

const CONTROLLER_ES = [
  "Responsable del tratamiento: AVEL Inmobiliaria S.A.S. (AVEL Estates), NIT 901.XXX.XXX-X, inscrita en la Cámara de Comercio de Medellín para Antioquia, con domicilio en Medellín, Antioquia, Colombia.",
  `Canal para ejercer sus derechos y radicar consultas, peticiones o reclamos: ${SITE.publicEmail}. Atendemos las consultas en un plazo de diez (10) días hábiles y los reclamos en quince (15) días hábiles, conforme a la Ley 1581 de 2012.`,
];

const COOKIE_ROWS_EN: CookieRow[] = [
  {
    name: "avel_consent",
    purpose: "Stores your cookie choice so the banner is not shown again and no non-essential script loads without permission.",
    duration: "12 months",
    category: "Essential",
  },
  {
    name: "avel_locale",
    purpose: "Remembers whether you chose the English or Spanish version of the site.",
    duration: "12 months",
    category: "Essential",
  },
  {
    name: "avel_session",
    purpose: "Keeps a form submission attached to a single browsing session and prevents duplicate enquiries.",
    duration: "Session (deleted when you close the browser)",
    category: "Essential",
  },
  {
    name: "_ga",
    purpose: "Google Analytics: distinguishes one visitor from another to count sessions and pages viewed.",
    duration: "24 months",
    category: "Analytics",
  },
  {
    name: "_ga_<container-id>",
    purpose: "Google Analytics 4: keeps session state so a visit is not counted twice.",
    duration: "24 months",
    category: "Analytics",
  },
  {
    name: "_fbp",
    purpose: "Meta Pixel: attributes an enquiry to the advertisement that brought you to the site.",
    duration: "3 months",
    category: "Marketing",
  },
  {
    name: "_gcl_au",
    purpose: "Google Ads: measures whether an advertisement led to an enquiry.",
    duration: "3 months",
    category: "Marketing",
  },
];

const COOKIE_ROWS_ES: CookieRow[] = [
  {
    name: "avel_consent",
    purpose: "Guarda su decisión sobre cookies para no volver a mostrar el aviso y no cargar ningún script no esencial sin permiso.",
    duration: "12 meses",
    category: "Esenciales",
  },
  {
    name: "avel_locale",
    purpose: "Recuerda si eligió la versión en inglés o en español del sitio.",
    duration: "12 meses",
    category: "Esenciales",
  },
  {
    name: "avel_session",
    purpose: "Vincula el envío de un formulario a una misma sesión y evita solicitudes duplicadas.",
    duration: "Sesión (se borra al cerrar el navegador)",
    category: "Esenciales",
  },
  {
    name: "_ga",
    purpose: "Google Analytics: distingue un visitante de otro para contar sesiones y páginas vistas.",
    duration: "24 meses",
    category: "Analítica",
  },
  {
    name: "_ga_<id-de-contenedor>",
    purpose: "Google Analytics 4: mantiene el estado de la sesión para no contar dos veces una visita.",
    duration: "24 meses",
    category: "Analítica",
  },
  {
    name: "_fbp",
    purpose: "Meta Pixel: atribuye una solicitud al anuncio que lo trajo al sitio.",
    duration: "3 meses",
    category: "Marketing",
  },
  {
    name: "_gcl_au",
    purpose: "Google Ads: mide si un anuncio derivó en una solicitud.",
    duration: "3 meses",
    category: "Marketing",
  },
];

const en: LegalPack = {
  updatedLabel: "Last updated",
  docs: {
    privacy: {
      slug: "privacy",
      seoTitle: "Privacy policy",
      seoDescription:
        "How AVEL Estates collects, uses and protects personal data, under Colombian Law 1581 of 2012, Decree 1377 of 2013 and the GDPR.",
      title: "Privacy policy",
      updated: "1 August 2026",
      intro: [
        "This policy explains what personal data AVEL Estates collects, why, how long we keep it, and what you can require of us. It is written to comply with Colombian Law 1581 of 2012 and Decree 1377 of 2013, and, for data subjects in the European Economic Area and the United Kingdom, with Regulation (EU) 2016/679 (GDPR).",
        ...CONTROLLER_EN,
      ],
      sections: [
        {
          heading: "1. Data we collect",
          bullets: [
            "Identification and contact data: name, email address, telephone number, country of residence, preferred language.",
            "Enquiry data: the properties you asked about, budget range, intended use, timeline, and the content of your messages to us.",
            "Technical data: IP address, browser and device type, referring page and pages viewed. Analytics data is collected only after you consent.",
            "Transaction data, where a purchase proceeds: the identity and documentation required by the notary, the developer and applicable anti-money-laundering rules.",
          ],
        },
        {
          heading: "2. Purposes of processing",
          bullets: [
            "Answering your enquiry and sending you property information you requested.",
            "Coordinating viewings, video tours, reservations, legal review, notary and registration steps.",
            "Sending market updates and new listings, only where you have opted in.",
            "Measuring how the site is used, only where you have accepted analytics cookies.",
            "Meeting legal, tax, accounting and anti-money-laundering obligations in Colombia.",
          ],
        },
        {
          heading: "3. Legal basis",
          paragraphs: [
            "Under Colombian law, processing is based on your prior, express and informed authorization (Law 1581 of 2012, article 9), except where a legal duty or a court order applies.",
            "Under the GDPR, we rely on: your consent (article 6.1.a) for marketing and analytics; the performance of a contract or steps taken at your request (article 6.1.b) for handling your enquiry and any purchase; our legitimate interest (article 6.1.f) in operating and securing the site; and legal obligation (article 6.1.c) for record-keeping and anti-money-laundering duties.",
          ],
        },
        {
          heading: "4. Who we share data with",
          paragraphs: [
            "We share only what is necessary, and only with: the developer or partner firm holding the property you enquired about; lawyers, notaries and translators involved in your transaction; and technical providers who host the site, send our email and, where consented, measure traffic.",
            "We do not sell personal data and we do not share it with data brokers.",
          ],
        },
        {
          heading: "5. International transfers",
          paragraphs: [
            "Our hosting, email and analytics providers process data outside Colombia, including in the United States and the European Union. Where data leaves Colombia we rely on your authorization or on the standards required by article 26 of Law 1581 of 2012. Where personal data of EEA or UK residents leaves that area, we rely on the European Commission's Standard Contractual Clauses or an adequacy decision.",
          ],
        },
        {
          heading: "6. Your rights as a data subject",
          paragraphs: [
            "Under Law 1581 of 2012 you have the right to: know what data we hold about you and how it is used; update it; rectify it when it is incomplete, partial, misleading or inaccurate; revoke the authorization you gave us; request deletion when processing is not required by a legal or contractual duty; access it free of charge at least once each calendar month; and file a complaint with the Superintendencia de Industria y Comercio once you have exhausted our internal channel.",
            "If the GDPR applies to you, you additionally have the rights of access, rectification, erasure, restriction of processing, data portability, objection to processing based on legitimate interest or direct marketing, and the right not to be subject to solely automated decisions. You may complain to your national supervisory authority.",
          ],
        },
        {
          heading: "7. How to exercise them",
          paragraphs: [
            `Write to ${SITE.publicEmail} from the email address you gave us, stating your name, what you are asking for, and the facts that support the request. We may ask for proof of identity. Consultations are answered within ten (10) business days and complaints within fifteen (15) business days; where we cannot meet the term we tell you why and give a new date, as Law 1581 requires.`,
            "Withdrawing consent does not affect processing carried out before the withdrawal, nor processing we are legally required to continue.",
          ],
        },
        {
          heading: "8. Retention period",
          bullets: [
            "Enquiries that do not lead to a transaction: 24 months from your last contact with us, then deleted.",
            "Marketing consent records and the mailing list: until you unsubscribe or revoke your authorization, plus 12 months to evidence that the consent existed.",
            "Transaction and accounting records: 10 years, the term required by Colombian commercial and tax law.",
            "Cookie consent records: 12 months, matching the life of the consent cookie.",
          ],
        },
        {
          heading: "9. Security",
          paragraphs: [
            "Access to personal data is restricted to the people who need it to do the work described above. Data is transmitted over TLS and stored with providers that offer encryption at rest. No system is perfect; if a breach affects your data and creates a risk to you, we notify you and the competent authority within the terms the law sets.",
          ],
        },
        {
          heading: "10. Children",
          paragraphs: [
            "The site is not directed at children. We do not knowingly process the personal data of minors, other than data provided by a parent in the context of a family purchase, which is handled in the child's best interest under article 7 of Law 1581 of 2012.",
          ],
        },
        {
          heading: "11. Changes",
          paragraphs: [
            "If we change this policy we publish the new version here with a new date, and where the change is material we tell you by email before it takes effect.",
          ],
        },
      ],
    },

    terms: {
      slug: "terms",
      seoTitle: "Terms of use",
      seoDescription:
        "The terms governing the use of the AVEL Estates website, including how property information is sourced and why it is not a contractual offer.",
      title: "Terms of use",
      updated: "1 August 2026",
      intro: [
        `These terms govern your use of ${SITE.domain}, operated by AVEL Inmobiliaria S.A.S. (AVEL Estates). Using the site means you accept them.`,
      ],
      sections: [
        {
          heading: "1. What this site is",
          paragraphs: [
            "This site presents residential and investment properties in Colombia and explains how the purchase process works for buyers located outside the country. It is an information and introduction service.",
          ],
        },
        {
          heading: "2. Property information is provided by developers",
          paragraphs: [
            "Property information published on this site — including descriptions, images, renders, floor plans, areas, specifications, finishes, amenities, unit availability, construction stage and delivery dates — is provided to us by the developers, owners and partner firms that hold each property.",
            "That information is subject to change without notice, may reflect a stage of the project that has since advanced, and does not constitute a contractual offer, a commercial offer under article 845 of the Colombian Commercial Code, or a promise of sale. Renders and images are illustrative. Areas may be quoted as built area, private area or a range across unit types, and the figure that binds anyone is the one recorded in the promesa de compraventa and the escritura pública.",
            "Nothing on this site creates rights over a specific unit. Rights arise only from a written contract signed with the owner or developer.",
          ],
        },
        {
          heading: "3. Prices",
          paragraphs: [
            "Properties are listed at price on request. Any price we give you is the price quoted by the developer at that moment, in the currency stated, and is valid only for the period the developer states. Prices, payment schedules and discounts change, and currency movements affect what a purchase costs in your home currency.",
          ],
        },
        {
          heading: "4. No legal, tax or investment advice",
          paragraphs: [
            "We are a real estate agency, not a law firm, a tax adviser or an investment adviser. Guides and articles on this site are general information about the Colombian market and are not advice on your situation. Rental yields, appreciation figures and occupancy rates are estimates and are not guaranteed. Obtain independent legal and tax advice before you commit money.",
          ],
        },
        {
          heading: "5. Your obligations",
          bullets: [
            "Give accurate information when you contact us; we act on what you tell us.",
            "Do not use the site to send unlawful, misleading or abusive content.",
            "Do not scrape, copy or republish listings, images or text without written permission.",
          ],
        },
        {
          heading: "6. Third-party links",
          paragraphs: [
            "The site links to developer sites, maps, video platforms and public registries. We do not control that content and are not responsible for it.",
          ],
        },
        {
          heading: "7. Intellectual property",
          paragraphs: [
            "The AVEL Estates name, logo, site design and original text are our property. Images and renders belong to the respective developers and are used with permission.",
          ],
        },
        {
          heading: "8. Limitation of liability",
          paragraphs: [
            "To the extent permitted by Colombian law, we are not liable for indirect or consequential loss arising from the use of this site or from reliance on information supplied to us by third parties and reproduced in good faith. Nothing in these terms limits liability for wilful misconduct or gross negligence.",
          ],
        },
        {
          heading: "9. Governing law",
          paragraphs: [
            "These terms are governed by the laws of the Republic of Colombia. Disputes are subject to the courts of Medellín, Antioquia, unless a mandatory rule of consumer law gives you another forum.",
          ],
        },
        {
          heading: "10. Contact",
          paragraphs: [`Questions about these terms: ${SITE.publicEmail}.`],
        },
      ],
    },

    cookies: {
      slug: "cookies",
      seoTitle: "Cookie policy",
      seoDescription:
        `Every cookie used on ${SITE.domain}: name, purpose, duration and category, and how to change your choice at any time.`,
      title: "Cookie policy",
      updated: "1 August 2026",
      intro: [
        "A cookie is a small file a site stores in your browser. This page lists every cookie this site can set, what it does, how long it lasts and which category it belongs to.",
        "Only essential cookies are set when you arrive. Analytics and marketing cookies load only after you accept them, and you can change or withdraw that choice at any time using the “Cookie preferences” link in the footer.",
      ],
      sections: [
        {
          heading: "Categories",
          bullets: [
            "Essential — required for the site to work and to remember your cookie choice. These cannot be switched off.",
            "Analytics — tells us which pages are read and where visitors leave. Aggregated, never used to contact you.",
            "Marketing — measures whether an advertisement led to an enquiry, and allows retargeting.",
          ],
        },
        {
          heading: "Managing cookies in your browser",
          paragraphs: [
            "Beyond the controls on this site, every major browser lets you block or delete cookies in its settings. Blocking essential cookies may stop forms and language preferences from working.",
          ],
        },
      ],
      cookieTable: {
        heading: "Cookies used on this site",
        columns: ["Name", "Purpose", "Duration", "Category"],
        rows: COOKIE_ROWS_EN,
      },
    },

    "habeas-data": {
      slug: "habeas-data",
      seoTitle: "Habeas Data authorization",
      seoDescription:
        "Authorization for the processing of personal data by AVEL Inmobiliaria S.A.S. under Law 1581 of 2012 and Decree 1377 of 2013.",
      title: "Habeas Data authorization",
      updated: "1 August 2026",
      intro: [
        "Authorization for the processing of personal data — Law 1581 of 2012, Decree 1377 of 2013.",
        ...CONTROLLER_EN,
      ],
      sections: [
        {
          heading: "Authorization",
          paragraphs: [
            "By submitting a form, writing to us or accepting this notice, I expressly, previously and informedly authorize AVEL Inmobiliaria S.A.S., identified with NIT 901.XXX.XXX-X, to collect, store, use, circulate, update, process, transfer and transmit my personal data for the purposes described below, in accordance with its Personal Data Processing Policy.",
          ],
        },
        {
          heading: "Purposes",
          bullets: [
            "Attending and answering my enquiry about one or more properties.",
            "Sending me property information, availability and prices at my request.",
            "Coordinating viewings, video tours, reservations and the purchase process, including with developers, lawyers, notaries and translators.",
            "Sending commercial information about new developments, where I have separately opted in.",
            "Complying with legal, accounting, tax and anti-money-laundering obligations.",
          ],
        },
        {
          heading: "Sensitive data",
          paragraphs: [
            "We do not request sensitive data as defined in article 5 of Law 1581 of 2012. Answering questions about sensitive data or the data of children is optional, and refusing to answer carries no consequence for the service.",
          ],
        },
        {
          heading: "Rights of the data subject",
          paragraphs: [
            "As the data subject I know that I have the right to know, update and rectify my personal data; to request proof of the authorization granted; to be informed on request about the use given to my data; to file complaints with the Superintendencia de Industria y Comercio for breaches of Law 1581 of 2012; to access my data free of charge; and to revoke this authorization or request deletion where no legal or contractual duty requires its retention.",
          ],
        },
        {
          heading: "Channel",
          paragraphs: [
            `Rights are exercised by writing to ${SITE.publicEmail}, or in writing to our registered address in Medellín, Antioquia. Consultations are answered within ten (10) business days and complaints within fifteen (15) business days.`,
          ],
        },
        {
          heading: "Validity",
          paragraphs: [
            "This authorization remains in force for the duration of the commercial relationship and for the retention periods stated in the privacy policy, unless revoked earlier.",
          ],
        },
      ],
    },
  },
};

const es: LegalPack = {
  updatedLabel: "Última actualización",
  docs: {
    privacy: {
      slug: "privacy",
      seoTitle: "Política de privacidad",
      seoDescription:
        "Cómo AVEL Estates recolecta, usa y protege los datos personales, conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y el RGPD.",
      title: "Política de privacidad",
      updated: "1 de agosto de 2026",
      intro: [
        "Esta política explica qué datos personales recolecta AVEL Estates, para qué, cuánto tiempo los conserva y qué puede exigirnos. Está redactada para cumplir la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia y, para titulares en el Espacio Económico Europeo y el Reino Unido, el Reglamento (UE) 2016/679 (RGPD).",
        ...CONTROLLER_ES,
      ],
      sections: [
        {
          heading: "1. Datos que recolectamos",
          bullets: [
            "Datos de identificación y contacto: nombre, correo electrónico, teléfono, país de residencia, idioma preferido.",
            "Datos de la solicitud: propiedades consultadas, rango de presupuesto, uso previsto, plazos y el contenido de sus mensajes.",
            "Datos técnicos: dirección IP, navegador y dispositivo, página de referencia y páginas vistas. Los datos de analítica se recolectan solo tras su consentimiento.",
            "Datos de la transacción, si la compra avanza: identidad y documentación exigidas por la notaría, la constructora y las normas de prevención de lavado de activos.",
          ],
        },
        {
          heading: "2. Finalidades del tratamiento",
          bullets: [
            "Atender su solicitud y enviarle la información de propiedades que pidió.",
            "Coordinar visitas, recorridos en video, separaciones, revisión legal, notaría y registro.",
            "Enviar novedades del mercado y nuevos proyectos, solo si lo autorizó expresamente.",
            "Medir el uso del sitio, solo si aceptó las cookies de analítica.",
            "Cumplir obligaciones legales, tributarias, contables y de prevención de lavado de activos en Colombia.",
          ],
        },
        {
          heading: "3. Base legal",
          paragraphs: [
            "En Colombia el tratamiento se basa en su autorización previa, expresa e informada (Ley 1581 de 2012, artículo 9), salvo cuando medie un deber legal u orden judicial.",
            "Bajo el RGPD nos apoyamos en: su consentimiento (art. 6.1.a) para marketing y analítica; la ejecución de un contrato o medidas precontractuales a su solicitud (art. 6.1.b) para atender su solicitud y la compra; nuestro interés legítimo (art. 6.1.f) en operar y asegurar el sitio; y la obligación legal (art. 6.1.c) para conservación de registros y prevención de lavado de activos.",
          ],
        },
        {
          heading: "4. Con quién compartimos datos",
          paragraphs: [
            "Compartimos solo lo necesario y únicamente con: la constructora o firma aliada titular de la propiedad consultada; abogados, notarios y traductores que intervienen en su transacción; y proveedores técnicos que alojan el sitio, envían nuestros correos y, si lo consintió, miden el tráfico.",
            "No vendemos datos personales ni los compartimos con corredores de datos.",
          ],
        },
        {
          heading: "5. Transferencias internacionales",
          paragraphs: [
            "Nuestros proveedores de alojamiento, correo y analítica tratan datos fuera de Colombia, incluidos Estados Unidos y la Unión Europea. Cuando los datos salen de Colombia nos amparamos en su autorización o en los estándares del artículo 26 de la Ley 1581 de 2012. Cuando salen del EEE o el Reino Unido, aplicamos las Cláusulas Contractuales Tipo de la Comisión Europea o una decisión de adecuación.",
          ],
        },
        {
          heading: "6. Sus derechos como titular",
          paragraphs: [
            "Conforme a la Ley 1581 de 2012 usted tiene derecho a: conocer qué datos tenemos y cómo se usan; actualizarlos; rectificarlos cuando sean parciales, incompletos, fraccionados, inexactos o induzcan a error; revocar la autorización otorgada; solicitar la supresión cuando no exista un deber legal o contractual de conservarlos; acceder gratuitamente a ellos al menos una vez al mes calendario; y presentar quejas ante la Superintendencia de Industria y Comercio una vez agotado nuestro trámite interno.",
            "Si le aplica el RGPD, tiene además derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad, oposición al tratamiento basado en interés legítimo o mercadeo directo, y a no ser objeto de decisiones exclusivamente automatizadas. Puede reclamar ante su autoridad nacional de control.",
          ],
        },
        {
          heading: "7. Cómo ejercerlos",
          paragraphs: [
            `Escriba a ${SITE.publicEmail} desde el correo que nos suministró, indicando su nombre, lo que solicita y los hechos que lo sustentan. Podemos pedirle prueba de identidad. Las consultas se atienden en diez (10) días hábiles y los reclamos en quince (15) días hábiles; si no podemos cumplir el término, le explicamos por qué y le informamos la nueva fecha, como exige la Ley 1581.`,
            "Revocar el consentimiento no afecta el tratamiento realizado antes de la revocatoria ni el que estemos obligados a continuar por ley.",
          ],
        },
        {
          heading: "8. Periodo de conservación",
          bullets: [
            "Solicitudes que no derivan en transacción: 24 meses desde su último contacto y luego se eliminan.",
            "Registros de consentimiento de marketing y base de correo: hasta que se dé de baja o revoque, más 12 meses para acreditar que el consentimiento existió.",
            "Registros de transacción y contables: 10 años, término exigido por la ley comercial y tributaria colombiana.",
            "Registros de consentimiento de cookies: 12 meses, igual a la vigencia de la cookie de consentimiento.",
          ],
        },
        {
          heading: "9. Seguridad",
          paragraphs: [
            "El acceso a datos personales se limita a quienes lo requieren para las finalidades descritas. Los datos se transmiten por TLS y se almacenan con proveedores que ofrecen cifrado en reposo. Ningún sistema es perfecto; si una violación afecta sus datos y genera un riesgo, se lo notificamos a usted y a la autoridad competente en los términos de ley.",
          ],
        },
        {
          heading: "10. Menores de edad",
          paragraphs: [
            "El sitio no está dirigido a menores. No tratamos conscientemente datos de menores, salvo los aportados por un padre o madre en el marco de una compra familiar, que se manejan atendiendo el interés superior del menor conforme al artículo 7 de la Ley 1581 de 2012.",
          ],
        },
        {
          heading: "11. Cambios",
          paragraphs: [
            "Si modificamos esta política publicamos la nueva versión aquí con nueva fecha y, cuando el cambio es sustancial, se lo informamos por correo antes de que entre en vigor.",
          ],
        },
      ],
    },

    terms: {
      slug: "terms",
      seoTitle: "Términos de uso",
      seoDescription:
        "Términos que rigen el uso del sitio de AVEL Estates, incluida la procedencia de la información de las propiedades y por qué no constituye oferta contractual.",
      title: "Términos de uso",
      updated: "1 de agosto de 2026",
      intro: [
        `Estos términos rigen el uso de ${SITE.domain}, operado por AVEL Inmobiliaria S.A.S. (AVEL Estates). Usar el sitio implica aceptarlos.`,
      ],
      sections: [
        {
          heading: "1. Qué es este sitio",
          paragraphs: [
            "Este sitio presenta propiedades residenciales y de inversión en Colombia y explica cómo funciona el proceso de compra para compradores ubicados fuera del país. Es un servicio de información e intermediación.",
          ],
        },
        {
          heading: "2. La información de las propiedades la suministran las constructoras",
          paragraphs: [
            "La información publicada —descripciones, imágenes, renders, planos, áreas, especificaciones, acabados, amenidades, disponibilidad de unidades, etapa de construcción y fechas de entrega— es suministrada por las constructoras, propietarios y firmas aliadas titulares de cada propiedad.",
            "Dicha información está sujeta a cambios sin previo aviso, puede corresponder a una etapa del proyecto ya superada, y no constituye oferta contractual, oferta mercantil en los términos del artículo 845 del Código de Comercio, ni promesa de compraventa. Los renders e imágenes son ilustrativos. Las áreas pueden expresarse como área construida, área privada o un rango entre tipologías, y la cifra vinculante es la que consta en la promesa de compraventa y en la escritura pública.",
            "Nada en este sitio genera derechos sobre una unidad determinada. Los derechos nacen únicamente de un contrato escrito firmado con el propietario o la constructora.",
          ],
        },
        {
          heading: "3. Precios",
          paragraphs: [
            "Las propiedades se publican con precio bajo solicitud. Cualquier precio que le entreguemos es el cotizado por la constructora en ese momento, en la moneda indicada, y es válido solo por el plazo que ella señale. Precios, planes de pago y descuentos cambian, y la tasa de cambio afecta lo que la compra cuesta en su moneda.",
          ],
        },
        {
          heading: "4. No es asesoría legal, tributaria ni de inversión",
          paragraphs: [
            "Somos una agencia inmobiliaria, no una firma de abogados, un asesor tributario ni un asesor de inversiones. Las guías y artículos del sitio son información general sobre el mercado colombiano y no asesoría sobre su caso. Las rentabilidades, valorizaciones y ocupaciones son estimaciones y no están garantizadas. Obtenga asesoría legal y tributaria independiente antes de comprometer dinero.",
          ],
        },
        {
          heading: "5. Sus obligaciones",
          bullets: [
            "Entregar información veraz al contactarnos; actuamos con base en lo que nos informa.",
            "No usar el sitio para enviar contenido ilícito, engañoso o abusivo.",
            "No extraer, copiar ni republicar listados, imágenes o textos sin autorización escrita.",
          ],
        },
        {
          heading: "6. Enlaces de terceros",
          paragraphs: [
            "El sitio enlaza a sitios de constructoras, mapas, plataformas de video y registros públicos. No controlamos ese contenido ni respondemos por él.",
          ],
        },
        {
          heading: "7. Propiedad intelectual",
          paragraphs: [
            "El nombre AVEL Estates, el logo, el diseño del sitio y los textos originales son de nuestra propiedad. Las imágenes y renders pertenecen a las respectivas constructoras y se usan con autorización.",
          ],
        },
        {
          heading: "8. Limitación de responsabilidad",
          paragraphs: [
            "En la medida permitida por la ley colombiana, no respondemos por perjuicios indirectos o consecuenciales derivados del uso del sitio o de la confianza en información suministrada por terceros y reproducida de buena fe. Nada limita la responsabilidad por dolo o culpa grave.",
          ],
        },
        {
          heading: "9. Ley aplicable",
          paragraphs: [
            "Estos términos se rigen por las leyes de la República de Colombia. Las controversias se someten a los jueces de Medellín, Antioquia, salvo norma imperativa de protección al consumidor que disponga otro foro.",
          ],
        },
        {
          heading: "10. Contacto",
          paragraphs: [`Preguntas sobre estos términos: ${SITE.publicEmail}.`],
        },
      ],
    },

    cookies: {
      slug: "cookies",
      seoTitle: "Política de cookies",
      seoDescription:
        `Todas las cookies de ${SITE.domain}: nombre, finalidad, duración y categoría, y cómo cambiar su decisión en cualquier momento.`,
      title: "Política de cookies",
      updated: "1 de agosto de 2026",
      intro: [
        "Una cookie es un archivo pequeño que un sitio guarda en su navegador. Esta página lista todas las cookies que este sitio puede instalar, qué hacen, cuánto duran y a qué categoría pertenecen.",
        "Al llegar solo se instalan las cookies esenciales. Las de analítica y marketing se cargan únicamente si usted las acepta, y puede cambiar o retirar esa decisión cuando quiera con el enlace “Preferencias de cookies” del pie de página.",
      ],
      sections: [
        {
          heading: "Categorías",
          bullets: [
            "Esenciales — necesarias para que el sitio funcione y para recordar su decisión sobre cookies. No se pueden desactivar.",
            "Analítica — nos indica qué páginas se leen y dónde se van los visitantes. Es agregada y nunca se usa para contactarlo.",
            "Marketing — mide si un anuncio derivó en una solicitud y permite remarketing.",
          ],
        },
        {
          heading: "Gestión desde su navegador",
          paragraphs: [
            "Además de los controles de este sitio, todos los navegadores permiten bloquear o eliminar cookies desde sus ajustes. Bloquear las esenciales puede impedir que funcionen los formularios y la preferencia de idioma.",
          ],
        },
      ],
      cookieTable: {
        heading: "Cookies utilizadas en este sitio",
        columns: ["Nombre", "Finalidad", "Duración", "Categoría"],
        rows: COOKIE_ROWS_ES,
      },
    },

    "habeas-data": {
      slug: "habeas-data",
      seoTitle: "Autorización de Habeas Data",
      seoDescription:
        "Autorización para el tratamiento de datos personales por AVEL Inmobiliaria S.A.S. conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.",
      title: "Autorización de Habeas Data",
      updated: "1 de agosto de 2026",
      intro: [
        "Autorización para el tratamiento de datos personales — Ley 1581 de 2012, Decreto 1377 de 2013.",
        ...CONTROLLER_ES,
      ],
      sections: [
        {
          heading: "Autorización",
          paragraphs: [
            "Al enviar un formulario, escribirnos o aceptar este aviso, autorizo de manera previa, expresa e informada a AVEL Inmobiliaria S.A.S., identificada con NIT 901.XXX.XXX-X, para recolectar, almacenar, usar, circular, actualizar, procesar, transferir y transmitir mis datos personales con las finalidades descritas a continuación, conforme a su Política de Tratamiento de Datos Personales.",
          ],
        },
        {
          heading: "Finalidades",
          bullets: [
            "Atender y responder mi solicitud sobre una o más propiedades.",
            "Enviarme información de propiedades, disponibilidad y precios cuando lo solicite.",
            "Coordinar visitas, recorridos en video, separaciones y el proceso de compra, incluso con constructoras, abogados, notarios y traductores.",
            "Enviarme información comercial sobre nuevos proyectos, cuando lo haya autorizado de forma separada.",
            "Cumplir obligaciones legales, contables, tributarias y de prevención de lavado de activos.",
          ],
        },
        {
          heading: "Datos sensibles",
          paragraphs: [
            "No solicitamos datos sensibles en los términos del artículo 5 de la Ley 1581 de 2012. Responder preguntas sobre datos sensibles o sobre datos de menores es facultativo y negarse no acarrea consecuencia alguna para el servicio.",
          ],
        },
        {
          heading: "Derechos del titular",
          paragraphs: [
            "Como titular conozco que tengo derecho a conocer, actualizar y rectificar mis datos personales; solicitar prueba de la autorización otorgada; ser informado, previa solicitud, sobre el uso dado a mis datos; presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la Ley 1581 de 2012; acceder gratuitamente a mis datos; y revocar esta autorización o solicitar la supresión cuando no exista deber legal o contractual de conservarlos.",
          ],
        },
        {
          heading: "Canal",
          paragraphs: [
            `Los derechos se ejercen escribiendo a ${SITE.publicEmail} o por escrito a nuestro domicilio en Medellín, Antioquia. Las consultas se atienden en diez (10) días hábiles y los reclamos en quince (15) días hábiles.`,
          ],
        },
        {
          heading: "Vigencia",
          paragraphs: [
            "Esta autorización permanece vigente durante la relación comercial y por los periodos de conservación indicados en la política de privacidad, salvo revocatoria anterior.",
          ],
        },
      ],
    },
  },
};

export const LEGAL: Record<Locale, LegalPack> = { en, es };
