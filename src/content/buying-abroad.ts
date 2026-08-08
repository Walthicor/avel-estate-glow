import type { Locale } from "../config/site";

export type AbroadStep = {
  n: string;
  title: string;
  timeline: string;
  cost: string;
  sign: string;
  body: string[];
  risk: string;
};

export type AbroadFaq = { q: string; a: string };

export type AbroadContent = {
  seoTitle: string;
  seoDescription: string;
  hero: { heading: string; subhead: string };
  labels: { timeline: string; cost: string; sign: string; risk: string; step: string };
  steps: AbroadStep[];
  faqHeading: string;
  faqs: AbroadFaq[];
};

const en: AbroadContent = {
  seoTitle: "How a foreigner actually buys property in Colombia",
  seoDescription:
    "Every step of buying Colombian property as a foreigner: what it costs, how long it takes, what you sign, and what can go wrong.",
  hero: {
    heading: "How a foreigner actually buys property in Colombia.",
    subhead: "Every step, what it costs, how long it takes, and what can go wrong.",
  },
  labels: {
    timeline: "Timeline",
    cost: "Cost",
    sign: "What you sign",
    risk: "What can go wrong",
    step: "Step",
  },
  steps: [
    {
      n: "01",
      title: "Discover",
      timeline: "1 to 2 weeks.",
      cost: "No cost.",
      sign: "Nothing.",
      body: [
        "You tell us the budget, the purpose and the date you need the money working. We shortlist three to five properties that fit, and we tell you which ones we would not buy ourselves.",
        "Foreigners can own property in Colombia on the same terms as Colombians. There is no residency requirement, no minimum investment, and no restriction on urban property. Coastal and border-zone land can carry limits, and we flag those before you look further.",
      ],
      risk: "Most bad purchases are decided here, not at the notary. Buying a unit because it photographs well, in a zone you have never seen at night, with a rental assumption copied from a developer brochure. If a projection has no comparable behind it, treat it as marketing.",
    },
    {
      n: "02",
      title: "Verify",
      timeline: "5 to 10 business days.",
      cost: "Included in our fee. An independent lawyer costs COP 1.5M to 4M if you hire your own.",
      sign: "Nothing. You receive a written report.",
      body: [
        "A title study reads the certificado de tradición y libertad — the property's full ownership history — and checks for mortgages, liens, embargoes, inheritance disputes and unpaid taxes or HOA fees. For pre-construction we also check the developer's licence, the building permit, prior deliveries and the trust that will hold your money.",
        "The lawyers who run the study are not paid by the developer. If a property does not pass, you hear it before you commit anything.",
      ],
      risk: "Debt travels with the property in Colombia, not with the seller. Unpaid administration fees, property tax arrears and unregistered extensions become yours at the deed. A property with a clean-looking listing and a twelve-page tradición is a warning, not a detail.",
    },
    {
      n: "03",
      title: "Reserve",
      timeline: "Same week you decide.",
      cost: "Typically 1 to 3 percent of the unit price.",
      sign: "Reservation agreement with the developer or seller.",
      body: [
        "The reservation takes the unit off the market at an agreed price while the paperwork is prepared. Read the refund clause before you send anything: what is refundable, under what conditions, and within how many days.",
        "We negotiate the reservation so that it is refundable if title verification fails. That is not automatic and it is not standard.",
      ],
      risk: "Signing a reservation before the title study is finished. If the study then finds a problem, a non-refundable deposit turns a legal issue into a financial loss. Never wire a reservation to a personal account — it goes to the company or the trust, never to an individual.",
    },
    {
      n: "04",
      title: "Fund",
      timeline: "2 to 4 weeks.",
      cost: "Bank transfer and FX spread, plus registration fees. No tax on the inbound transfer.",
      sign: "Foreign investment declaration (Formulario 4, Banco de la República).",
      body: [
        "Money must enter Colombia through a registered exchange-market intermediary and be declared as foreign investment to Banco de la República. This is the single most important administrative step in the whole process.",
        "The declaration is what later gives you the legal right to repatriate the sale proceeds and the rental income at the official rate. It is done at the moment the funds arrive.",
      ],
      risk: "Bringing cash in informally, or through a friend's account, or without the declaration. The property is still yours — but you may not be able to legally take the capital back out, and you will be quoted a large fee by someone who claims they can fix it retroactively. Sometimes they cannot.",
    },
    {
      n: "05",
      title: "Title",
      timeline: "2 to 6 weeks for a ready property. For pre-construction, at delivery.",
      cost: "Notary fees around 0.3 percent, registration around 1.67 percent, plus a beneficencia charge in some departments. Buyer and seller usually split notary costs.",
      sign: "Promise of sale, then the escritura pública, then registration.",
      body: [
        "The promise of sale fixes price, dates and penalties. The deed is signed before a notary and only becomes effective once it is registered at the Oficina de Registro de Instrumentos Públicos and a new certificado de tradición is issued in your name.",
        "You do not need to be in Colombia. A power of attorney, signed at a Colombian consulate or apostilled abroad, lets someone you name sign for you.",
      ],
      risk: "Treating the notary appointment as the finish line. Until registration comes back in your name, you are not the owner of record. Also: a power of attorney written too broadly. Limit it to this transaction, this property, and a date it expires.",
    },
    {
      n: "06",
      title: "Manage",
      timeline: "Ongoing. First tax filing the year after purchase.",
      cost: "Management 8 to 15 percent of rent for long stay, 18 to 25 percent for short stay. Property tax 0.4 to 1.2 percent of cadastral value a year.",
      sign: "Management mandate. Annual tax filings.",
      body: [
        "Someone has to hold keys, chase the tenant, pay the administration fee, file the tax return and move the money. If you are not in the country, you are paying for that whether or not you plan for it.",
        "Rental income earned in Colombia is taxed in Colombia. With the foreign investment registered, net proceeds can be remitted abroad legally.",
      ],
      risk: "Short-term rental restrictions. Many buildings' HOA rules ban stays under 30 days regardless of what the sales office implied, and enforcement has tightened. If the yield case depends on nightly rental, the HOA bylaws must say so in writing before you reserve.",
    },
  ],
  faqHeading: "Questions we get asked",
  faqs: [
    {
      q: "Do I need a visa to buy?",
      a: "No. Foreigners buy property in Colombia on the same legal footing as citizens. You need a passport and a Colombian tax ID (NIT/RUT), which we arrange. Buying property does not by itself grant residency, though a qualifying investment can support a migrant investor visa application — that is a separate process with its own thresholds.",
    },
    {
      q: "Can I buy without traveling to Colombia?",
      a: "Yes, with a power of attorney. You sign it at a Colombian consulate in your country, or sign it locally and have it apostilled and translated by an official translator. Your attorney-in-fact then signs the promise of sale and the deed. We recommend limiting the power to the specific property and giving it an expiry date.",
    },
    {
      q: "How do I get rental income out of Colombia?",
      a: "Through the same registered channel your investment came in on. Because the purchase was declared as foreign investment to Banco de la República, income and eventual sale proceeds can be converted and remitted abroad at the official market rate, after Colombian tax and withholding. If the original investment was never registered, this is where the problem shows up.",
    },
    {
      q: "What taxes will I pay?",
      a: "At purchase: registration duty around 1.67 percent and notary fees around 0.3 percent. Annually: predial (property tax) of roughly 0.4 to 1.2 percent of cadastral value, depending on the municipality and stratum. On rental income: Colombian income tax, with withholding applied at source for non-residents. On sale: capital gains tax, currently 15 percent on the gain, with the inflation-adjusted cost base. You may also owe tax at home — check your own treaty position.",
    },
    {
      q: "What is a fiducia and why does it matter in pre-construction?",
      a: "A fiducia is a trust administered by a regulated fiduciary company. In a properly structured pre-construction project, your payments go into the trust and not to the developer directly. The trust releases funds against construction milestones, and if the project does not reach its launch conditions the money is returned to buyers. Before you pay anything, confirm which fiduciary holds the trust and that your payment instructions name the trust account. A project without one is not automatically fraudulent, but it puts your money on the developer's balance sheet.",
    },
    {
      q: "What happens if the developer does not deliver?",
      a: "It depends on what you signed and where your money sat. With a fiducia and a project that never reached its launch point, funds are returned. With delivery delays after launch, the promise of sale governs — a well-drafted one sets a delivery date, a grace period and a penalty. Beyond that you are into litigation, which in Colombia is slow. This is why the developer's completed-project history matters more than the renders, and why we will tell you when a developer has a thin track record.",
    },
    {
      q: "Why are prices not listed on the site?",
      a: "Pricing on the projects we represent moves with construction stage, unit availability and launch windows. We quote the current figure directly so you never work from a number that is already out of date.",
    },
  ],
};

const es: AbroadContent = {
  seoTitle: "Cómo compra realmente un extranjero una propiedad en Colombia",
  seoDescription:
    "Cada paso para comprar propiedad en Colombia siendo extranjero: cuánto cuesta, cuánto tarda, qué firmas y qué puede salir mal.",
  hero: {
    heading: "Cómo compra realmente un extranjero una propiedad en Colombia.",
    subhead: "Cada paso, cuánto cuesta, cuánto tarda y qué puede salir mal.",
  },
  labels: {
    timeline: "Tiempo",
    cost: "Costo",
    sign: "Qué firmas",
    risk: "Qué puede salir mal",
    step: "Paso",
  },
  steps: [
    {
      n: "01",
      title: "Descubrir",
      timeline: "1 a 2 semanas.",
      cost: "Sin costo.",
      sign: "Nada.",
      body: [
        "Nos dices el presupuesto, el propósito y la fecha en que necesitas el dinero trabajando. Preseleccionamos tres a cinco propiedades que encajan, y te decimos cuáles no compraríamos nosotros.",
        "Un extranjero puede ser propietario en Colombia en las mismas condiciones que un colombiano. No se exige residencia, ni inversión mínima, ni hay restricción sobre inmuebles urbanos. Los predios en zona costera o de frontera pueden tener límites, y te lo advertimos antes de seguir.",
      ],
      risk: "La mayoría de las malas compras se deciden aquí, no en la notaría. Comprar una unidad porque se ve bien en fotos, en una zona que nunca has visto de noche, con un supuesto de arriendo copiado del folleto del constructor. Si una proyección no tiene comparables detrás, es publicidad.",
    },
    {
      n: "02",
      title: "Verificar",
      timeline: "5 a 10 días hábiles.",
      cost: "Incluido en nuestro servicio. Un abogado independiente cuesta entre COP 1,5 y 4 millones.",
      sign: "Nada. Recibes un informe escrito.",
      body: [
        "El estudio de títulos revisa el certificado de tradición y libertad —la historia completa del inmueble— y busca hipotecas, gravámenes, embargos, sucesiones y deudas de impuesto predial o administración. En proyectos sobre planos revisamos además la licencia del constructor, el permiso de construcción, las entregas anteriores y la fiducia que recibirá tu dinero.",
        "Los abogados que hacen el estudio no reciben pago del constructor. Si la propiedad no pasa, te enteras antes de comprometer nada.",
      ],
      risk: "En Colombia la deuda viaja con el inmueble, no con el vendedor. Administración en mora, predial atrasado y ampliaciones sin registrar quedan a tu nombre en la escritura. Un aviso impecable con un certificado de tradición de doce páginas es una alerta, no un detalle.",
    },
    {
      n: "03",
      title: "Reservar",
      timeline: "La misma semana en que decides.",
      cost: "Normalmente 1 a 3 por ciento del valor de la unidad.",
      sign: "Contrato de reserva con el constructor o vendedor.",
      body: [
        "La reserva saca la unidad del mercado a un precio acordado mientras se prepara la documentación. Lee la cláusula de devolución antes de transferir: qué es reembolsable, bajo qué condiciones y en cuántos días.",
        "Negociamos que la reserva sea reembolsable si el estudio de títulos falla. Eso no es automático ni es estándar.",
      ],
      risk: "Firmar la reserva antes de terminar el estudio de títulos. Si después aparece un problema, un depósito no reembolsable convierte un asunto legal en una pérdida. Nunca transfieras una reserva a una cuenta personal: va a la empresa o a la fiducia, nunca a una persona.",
    },
    {
      n: "04",
      title: "Ingresar los fondos",
      timeline: "2 a 4 semanas.",
      cost: "Transferencia bancaria y spread cambiario, más gastos de registro. La entrada de divisas no paga impuesto.",
      sign: "Declaración de inversión extranjera (Formulario 4, Banco de la República).",
      body: [
        "El dinero debe entrar por un intermediario del mercado cambiario y declararse como inversión extranjera ante el Banco de la República. Es el paso administrativo más importante de todo el proceso.",
        "Esa declaración es la que te da después el derecho legal a repatriar el producto de la venta y las rentas a la tasa oficial. Se hace en el momento en que llegan los fondos.",
      ],
      risk: "Ingresar el dinero de manera informal, por la cuenta de un conocido o sin declararlo. La propiedad sigue siendo tuya, pero puede que no puedas sacar el capital legalmente, y alguien te cobrará caro por prometer arreglarlo de forma retroactiva. A veces no se puede.",
    },
    {
      n: "05",
      title: "Escriturar",
      timeline: "2 a 6 semanas en propiedad lista. Sobre planos, en la entrega.",
      cost: "Notaría alrededor de 0,3 por ciento, registro cerca de 1,67 por ciento, más beneficencia en algunos departamentos. Comprador y vendedor suelen dividir la notaría.",
      sign: "Promesa de compraventa, luego escritura pública y registro.",
      body: [
        "La promesa fija precio, fechas y sanciones. La escritura se firma ante notario y solo surte efecto cuando se registra en la Oficina de Registro de Instrumentos Públicos y sale un nuevo certificado de tradición a tu nombre.",
        "No necesitas estar en Colombia. Un poder firmado en un consulado colombiano o apostillado en el exterior permite que alguien firme por ti.",
      ],
      risk: "Creer que la firma en la notaría es la meta. Hasta que el registro salga a tu nombre no eres el propietario inscrito. Y otro riesgo: un poder redactado demasiado amplio. Limítalo a esta operación, a este inmueble y con fecha de vencimiento.",
    },
    {
      n: "06",
      title: "Administrar",
      timeline: "Permanente. La primera declaración de renta, el año siguiente a la compra.",
      cost: "Administración de 8 a 15 por ciento del canon en larga estadía, 18 a 25 por ciento en corta. Predial de 0,4 a 1,2 por ciento del avalúo al año.",
      sign: "Mandato de administración. Declaraciones anuales.",
      body: [
        "Alguien tiene que tener las llaves, hacer seguimiento al arrendatario, pagar la administración, presentar la declaración y mover el dinero. Si no estás en el país, eso se paga, lo hayas presupuestado o no.",
        "La renta generada en Colombia tributa en Colombia. Con la inversión extranjera registrada, el neto puede remitirse al exterior de forma legal.",
      ],
      risk: "Las restricciones al alquiler de corta estadía. Muchos reglamentos de propiedad horizontal prohíben estadías menores a 30 días, sin importar lo que insinúe la sala de ventas, y el control se ha endurecido. Si tu rentabilidad depende del alquiler por noches, el reglamento debe permitirlo por escrito antes de reservar.",
    },
  ],
  faqHeading: "Preguntas que nos hacen",
  faqs: [
    {
      q: "¿Necesito visa para comprar?",
      a: "No. Los extranjeros compran en Colombia en igualdad de condiciones legales con los nacionales. Necesitas pasaporte y un identificador tributario colombiano (NIT/RUT), que gestionamos nosotros. Comprar no otorga residencia por sí mismo, aunque una inversión que cumpla el umbral puede sustentar una visa de inversionista: ese es un trámite aparte.",
    },
    {
      q: "¿Puedo comprar sin viajar a Colombia?",
      a: "Sí, con un poder. Lo firmas en un consulado colombiano en tu país, o lo firmas localmente y lo haces apostillar y traducir por traductor oficial. Tu apoderado firma la promesa y la escritura. Recomendamos limitar el poder al inmueble específico y ponerle fecha de vencimiento.",
    },
    {
      q: "¿Cómo saco las rentas de Colombia?",
      a: "Por el mismo canal registrado por el que entró tu inversión. Como la compra se declaró como inversión extranjera ante el Banco de la República, las rentas y el producto de una venta futura pueden convertirse y remitirse al exterior a la tasa oficial, después de impuestos y retenciones. Si la inversión original nunca se registró, el problema aparece justo aquí.",
    },
    {
      q: "¿Qué impuestos voy a pagar?",
      a: "En la compra: registro cerca de 1,67 por ciento y notaría alrededor de 0,3 por ciento. Cada año: predial de aproximadamente 0,4 a 1,2 por ciento del avalúo catastral, según municipio y estrato. Sobre la renta: impuesto de renta colombiano, con retención en la fuente para no residentes. En la venta: ganancia ocasional, hoy 15 por ciento sobre la utilidad, con costo fiscal ajustado. También puedes deber impuestos en tu país: revisa tu tratado.",
    },
    {
      q: "¿Qué es una fiducia y por qué importa sobre planos?",
      a: "Una fiducia es un patrimonio administrado por una sociedad fiduciaria vigilada. En un proyecto bien estructurado, tus pagos entran a la fiducia y no directamente al constructor. La fiducia libera recursos contra hitos de obra y, si el proyecto no alcanza el punto de equilibrio, devuelve el dinero a los compradores. Antes de pagar, confirma qué fiduciaria administra el encargo y que las instrucciones de pago señalen esa cuenta. Un proyecto sin fiducia no es automáticamente un fraude, pero pone tu dinero en el balance del constructor.",
    },
    {
      q: "¿Qué pasa si el constructor no entrega?",
      a: "Depende de lo que firmaste y de dónde estuvo tu dinero. Con fiducia y un proyecto que nunca alcanzó el punto de equilibrio, los fondos se devuelven. Con retrasos después del inicio de obra manda la promesa: una bien redactada fija fecha de entrega, plazo de gracia y sanción. Más allá de eso queda el litigio, que en Colombia es lento. Por eso el historial de proyectos entregados pesa más que los renders, y por eso te avisamos cuando un constructor tiene poca trayectoria.",
    },
    {
      q: "¿Por qué no hay precios publicados en el sitio?",
      a: "El precio de los proyectos que representamos se mueve con la etapa de construcción, la disponibilidad de unidades y las ventanas de lanzamiento. Cotizamos la cifra vigente de forma directa para que nunca trabajes con un número que ya quedó desactualizado.",
    },
  ],
};

export const BUYING_ABROAD: Record<Locale, AbroadContent> = { en, es };
