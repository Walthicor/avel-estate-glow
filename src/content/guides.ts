import type { Locale } from "../config/site";

export type GuideBlock =
  | { k: "p"; text: string }
  | { k: "h2"; text: string }
  | { k: "quote"; text: string }
  | { k: "ul"; items: string[] };

export type GuideCopy = {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  blocks: GuideBlock[];
};

export type GuideRecord = {
  slug: string;
  /** ISO date of publication; used for Article JSON-LD. */
  published: string;
  /** City slug used to pull related properties. */
  relatedCity: string;
  en: GuideCopy;
  es: GuideCopy;
};

export const GUIDES: GuideRecord[] = [
  {
    slug: "can-a-foreigner-buy-property-in-colombia",
    published: "2026-02-10",
    relatedCity: "medellin",
    en: {
      category: "Legal",
      title: "Can a foreigner buy property in Colombia? Exactly what is required",
      excerpt:
        "No residency, no local partner, no minimum investment. What you do need is a passport, a tax ID, a bank route the regulator can see, and four documents.",
      readTime: "6 min read",
      seoTitle: "Can a foreigner buy property in Colombia?",
      seoDescription: "Yes — foreigners can buy property in Colombia on the same terms as citizens. Passport, tax ID (RUT), registered foreign investment and the four documents you need.",
      blocks: [
        {
          k: "p",
          text: "Yes. Colombian law places no restriction on foreign ownership of urban property. A non-resident foreigner buys on the same legal terms as a Colombian citizen: full freehold title, registered in your own name, with no local partner, no nominee structure and no minimum investment. The restrictions that do exist apply to land in border zones and certain coastal and protected areas, and they apply to Colombians too.",
        },
        { k: "h2", text: "What you actually need" },
        {
          k: "ul",
          items: [
            "A valid passport. That is your identity document for the notary and the registry.",
            "A NIT (tax identification number) issued by the DIAN. You can obtain it without residency; it is required to appear on the deed and to pay property tax.",
            "A Colombian bank route or a registered foreign-exchange operation, so the money entering the country is declared to the Banco de la República.",
            "A power of attorney, apostilled and translated, if you are not flying in to sign.",
          ],
        },
        { k: "h2", text: "Residency is not part of this" },
        {
          k: "p",
          text: "Buying property does not require a visa, and it does not automatically grant one. The two are separate processes that happen to intersect: a property purchase above a threshold set in monthly minimum wages can support an investor visa application, but the purchase itself is valid whether or not you ever apply. Do not let anyone bundle the two into one fee.",
        },
        {
          k: "quote",
          text: "The single step foreigners skip is the foreign-exchange declaration. Skip it and the money is legally in the country but not registered as your investment — which is what makes taking it out again difficult.",
        },
        { k: "h2", text: "The documents to see before you sign" },
        {
          k: "p",
          text: "Ask for the certificado de tradición y libertad, dated within the last thirty days, and read the annotations from the bottom up. It shows every owner, mortgage, embargo and easement recorded against the property. Ask for the paz y salvo of property tax and of the building's administration fees, because unpaid obligations follow the property, not the seller. For a project under construction, ask for the building licence and the fiducia agreement.",
        },
        { k: "h2", text: "How long it takes" },
        {
          k: "p",
          text: "For a completed unit with clean title and funds already in Colombia, four to eight weeks from offer to registration is normal. The variable is almost never the notary; it is the time your bank takes to move money and the time the seller takes to produce paperwork they assumed nobody would read.",
        },
      ],
    },
    es: {
      category: "Legal",
      title: "¿Puede un extranjero comprar propiedad en Colombia? Qué se exige exactamente",
      excerpt:
        "Sin residencia, sin socio local, sin inversión mínima. Lo que sí necesita: pasaporte, NIT, una ruta bancaria visible para el regulador y cuatro documentos.",
      readTime: "6 min de lectura",
      seoTitle: "¿Puede un extranjero comprar propiedad en Colombia?",
      seoDescription: "Sí: un extranjero puede comprar vivienda en Colombia como un nacional. Pasaporte, RUT, registro de inversión extranjera y los documentos que necesita.",
      blocks: [
        {
          k: "p",
          text: "Sí. La ley colombiana no restringe la propiedad extranjera de inmuebles urbanos. Un extranjero no residente compra en las mismas condiciones que un ciudadano colombiano: dominio pleno, registrado a su nombre, sin socio local, sin testaferro y sin inversión mínima. Las restricciones que existen aplican a tierras en zonas de frontera y a ciertas áreas costeras y protegidas, y también aplican a los colombianos.",
        },
        { k: "h2", text: "Lo que realmente necesita" },
        {
          k: "ul",
          items: [
            "Pasaporte vigente. Es su documento de identidad ante la notaría y el registro.",
            "NIT expedido por la DIAN. Se obtiene sin residencia y es necesario para figurar en la escritura y pagar el predial.",
            "Una ruta bancaria colombiana o una operación de cambio registrada, para que el dinero que entra quede declarado ante el Banco de la República.",
            "Un poder, apostillado y traducido, si no viajará a firmar.",
          ],
        },
        { k: "h2", text: "La residencia no entra en esto" },
        {
          k: "p",
          text: "Comprar propiedad no exige visa y tampoco la otorga automáticamente. Son dos procesos distintos que se cruzan: una compra por encima de cierto umbral en salarios mínimos puede sustentar una visa de inversionista, pero la compra es válida aunque nunca la solicite. No permita que le cobren ambos como un solo paquete.",
        },
        {
          k: "quote",
          text: "El paso que más se omite es la declaración de cambio. Si la omite, el dinero está legalmente en el país pero no registrado como su inversión, y eso es lo que dificulta sacarlo después.",
        },
        { k: "h2", text: "Documentos que debe ver antes de firmar" },
        {
          k: "p",
          text: "Pida el certificado de tradición y libertad con menos de treinta días y lea las anotaciones de abajo hacia arriba: muestra cada propietario, hipoteca, embargo y servidumbre inscritos. Pida el paz y salvo de predial y de administración, porque las obligaciones impagas siguen al inmueble y no al vendedor. Si es proyecto en construcción, pida la licencia de construcción y el contrato de fiducia.",
        },
        { k: "h2", text: "Cuánto tarda" },
        {
          k: "p",
          text: "Para una unidad terminada con títulos limpios y fondos ya en Colombia, de cuatro a ocho semanas entre oferta y registro es normal. La variable casi nunca es la notaría: es el tiempo que tarda su banco en mover el dinero y el que tarda el vendedor en producir papeles que asumía que nadie leería.",
        },
      ],
    },
  },
  {
    slug: "getting-rental-income-out-of-colombia",
    published: "2026-02-24",
    relatedCity: "medellin",
    en: {
      category: "Money",
      title: "How to get your rental income out of Colombia legally",
      excerpt:
        "The money leaves easily if the money entered correctly. Registration, withholding, the annual return, and the mistake that traps capital for years.",
      readTime: "7 min read",
      seoTitle: "How to repatriate rental income from Colombia legally",
      seoDescription: "How foreign owners register their investment with Banco de la República, pay withholding tax and send Colombian rental income abroad legally.",
      blocks: [
        {
          k: "p",
          text: "Colombia has no capital controls in the sense that would worry you. Money leaves the country routinely and legally. What determines whether your money leaves easily is a decision you made at the beginning: whether the funds that came in were registered as foreign investment.",
        },
        { k: "h2", text: "Step one happens before you buy" },
        {
          k: "p",
          text: "Funds must enter through the regulated exchange market, converted by an authorised intermediary — a Colombian bank or exchange house — and declared to the Banco de la República on the corresponding foreign-exchange form. That declaration is what registers your investment. Wiring money to a friend's personal account, or arriving with cash, does not register anything and cannot be fixed retroactively without a penalty process.",
        },
        {
          k: "quote",
          text: "Registered investment can be repatriated, including capital gains, with no additional government authorisation. Unregistered investment is a paperwork problem you will pay a lawyer to solve later.",
        },
        { k: "h2", text: "Tax on the income while it is here" },
        {
          k: "ul",
          items: [
            "Rental income sourced in Colombia is taxable in Colombia, regardless of where you live.",
            "A corporate or commercial tenant generally withholds at source and remits it; an individual tenant usually does not.",
            "Non-residents file an annual return on Colombian-source income. Ownership does not make you a tax resident — physical presence over 183 days in a 365-day period does.",
            "Property tax (predial) and, in some municipalities, valorización are separate annual obligations attached to the property.",
          ],
        },
        { k: "h2", text: "Moving the money out" },
        {
          k: "p",
          text: "Net income is transferred abroad through the same regulated channel it came in by. Your bank will ask for the investment registration, evidence that the income is what you say it is, and proof that the tax obligations on it are settled. With those three, the transfer is an ordinary banking operation.",
        },
        { k: "h2", text: "Practical advice" },
        {
          k: "p",
          text: "Keep a Colombian account in your own name, keep every rental contract and receipt, and repatriate on a schedule rather than in one large annual movement, which invites questions. Use a Colombian accountant who has filed for non-residents before — the cost is trivial relative to the cost of an unfiled year.",
        },
      ],
    },
    es: {
      category: "Dinero",
      title: "Cómo sacar legalmente de Colombia la renta de su inmueble",
      excerpt:
        "El dinero sale fácil si entró bien. Registro de inversión, retención, declaración anual y el error que congela capital durante años.",
      readTime: "7 min de lectura",
      seoTitle: "Cómo repatriar la renta de un inmueble en Colombia",
      seoDescription: "Cómo registrar la inversión extranjera ante el Banco de la República, pagar retenciones y girar legalmente al exterior la renta de su inmueble.",
      blocks: [
        {
          k: "p",
          text: "Colombia no tiene controles de capital en el sentido que le preocuparía. El dinero sale del país de forma rutinaria y legal. Lo que determina si sale fácil es una decisión que usted tomó al principio: si los fondos que entraron quedaron registrados como inversión extranjera.",
        },
        { k: "h2", text: "El primer paso ocurre antes de comprar" },
        {
          k: "p",
          text: "Los fondos deben entrar por el mercado cambiario regulado, monetizados por un intermediario autorizado —banco o casa de cambio colombiana— y declarados ante el Banco de la República en el formulario correspondiente. Esa declaración es la que registra su inversión. Girar a la cuenta personal de un conocido, o llegar con efectivo, no registra nada y no se corrige de forma retroactiva sin un proceso sancionatorio.",
        },
        {
          k: "quote",
          text: "La inversión registrada se puede repatriar, incluida la ganancia de capital, sin autorización adicional del Estado. La no registrada es un problema de papeles que después pagará a un abogado para resolver.",
        },
        { k: "h2", text: "Impuestos mientras el dinero está aquí" },
        {
          k: "ul",
          items: [
            "La renta de arrendamiento de fuente colombiana tributa en Colombia, viva usted donde viva.",
            "Un arrendatario empresa suele practicar retención en la fuente y consignarla; un arrendatario persona natural normalmente no.",
            "Los no residentes declaran anualmente su renta de fuente colombiana. Ser propietario no lo hace residente fiscal: lo hace la permanencia superior a 183 días en 365.",
            "El impuesto predial y, en algunos municipios, la valorización son obligaciones anuales separadas ligadas al inmueble.",
          ],
        },
        { k: "h2", text: "Girar el dinero al exterior" },
        {
          k: "p",
          text: "La renta neta se transfiere al exterior por el mismo canal regulado por el que entró. El banco le pedirá el registro de la inversión, soporte del origen de los ingresos y prueba de que las obligaciones tributarias están al día. Con esos tres, el giro es una operación bancaria ordinaria.",
        },
        { k: "h2", text: "Consejo práctico" },
        {
          k: "p",
          text: "Mantenga una cuenta colombiana a su nombre, conserve cada contrato y recibo, y repatrie de forma periódica en vez de en un solo movimiento anual grande, que genera preguntas. Use un contador colombiano con experiencia en no residentes: el costo es trivial frente al de un año sin declarar.",
        },
      ],
    },
  },
  {
    slug: "fiducia-explained-pre-construction",
    published: "2026-03-06",
    relatedCity: "medellin",
    en: {
      category: "Pre-construction",
      title: "Fiducia explained: why pre-construction in Colombia is safer than it looks",
      excerpt:
        "Your instalments do not go to the developer. They sit with a regulated trust that only releases them when legal and commercial conditions are met.",
      readTime: "6 min read",
      seoTitle: "Fiducia in Colombia explained for off-plan buyers",
      seoDescription: "How the fiducia mercantil protects off-plan buyers in Colombia: escrow accounts, punto de equilibrio and when your deposit is refunded.",
      blocks: [
        {
          k: "p",
          text: "Buying an apartment that does not exist yet sounds like the riskiest thing a remote buyer could do. In Colombia it is structurally safer than most foreign buyers expect, and the reason is a legal instrument called the fiducia mercantil.",
        },
        { k: "h2", text: "What a fiducia actually is" },
        {
          k: "p",
          text: "A fiduciaria is a regulated financial institution, supervised by the Superintendencia Financiera. In a pre-construction sale, your instalments are paid into a trust account managed by that institution, not into the developer's operating account. The developer cannot spend the money at will; the fiduciaria releases funds only when the conditions written into the trust agreement are met.",
        },
        { k: "h2", text: "The punto de equilibrio" },
        {
          k: "p",
          text: "The first condition is the break-even point: a defined percentage of units sold, the building licence issued, and construction finance approved. Until it is reached, your money stays in the trust. If the project fails to reach it by the deadline in the contract, the trust returns your money — in many structures with the yield it earned while held.",
        },
        {
          k: "quote",
          text: "The protection is against a project that never starts, and against a developer spending your deposit on something else. It is not a guarantee that construction finishes on time.",
        },
        { k: "h2", text: "What it does not cover" },
        {
          k: "ul",
          items: [
            "Delivery delays. Six months is common; the contract usually allows it explicitly.",
            "Build quality. That is the developer's obligation and your handover inspection.",
            "Changes in area of a few percent, which most contracts permit with a price adjustment.",
            "Payments you make outside the trust. If anyone asks you to transfer to a personal or company account, stop.",
          ],
        },
        { k: "h2", text: "What to verify before you sign" },
        {
          k: "p",
          text: "Get the name of the fiduciaria and confirm it is supervised. Read the encargo fiduciario for the break-even conditions and the deadline. Confirm the account you are paying into belongs to the trust, not the developer. And read the developer's delivery record on its last three projects — the fiducia protects your capital, but only the developer's track record predicts your date.",
        },
      ],
    },
    es: {
      category: "Sobre planos",
      title: "La fiducia explicada: por qué comprar sobre planos en Colombia es más seguro de lo que parece",
      excerpt:
        "Sus cuotas no van al constructor. Quedan en una fiduciaria vigilada que solo libera recursos cuando se cumplen condiciones legales y comerciales.",
      readTime: "6 min de lectura",
      seoTitle: "La fiducia en Colombia al comprar sobre planos",
      seoDescription: "Comprar apartamento sobre planos con fiducia: cómo funciona el encargo fiduciario, el punto de equilibrio y cuándo le devuelven su dinero.",
      blocks: [
        {
          k: "p",
          text: "Comprar un apartamento que todavía no existe suena como lo más riesgoso que puede hacer un comprador remoto. En Colombia es estructuralmente más seguro de lo que la mayoría espera, y la razón es una figura legal: la fiducia mercantil.",
        },
        { k: "h2", text: "Qué es realmente una fiducia" },
        {
          k: "p",
          text: "Una fiduciaria es una entidad financiera vigilada por la Superintendencia Financiera. En una venta sobre planos, sus cuotas se pagan a un encargo fiduciario administrado por esa entidad, no a la cuenta operativa del constructor. El constructor no puede disponer del dinero a voluntad: la fiduciaria libera recursos solo cuando se cumplen las condiciones pactadas en el contrato.",
        },
        { k: "h2", text: "El punto de equilibrio" },
        {
          k: "p",
          text: "La primera condición es el punto de equilibrio: un porcentaje definido de unidades vendidas, la licencia de construcción expedida y el crédito constructor aprobado. Hasta que se alcance, su dinero permanece en el encargo. Si el proyecto no lo logra dentro del plazo del contrato, la fiducia devuelve su dinero, en muchas estructuras con los rendimientos generados.",
        },
        {
          k: "quote",
          text: "La protección es contra un proyecto que nunca arranca y contra un constructor que gaste su cuota inicial en otra cosa. No es una garantía de que la obra termine a tiempo.",
        },
        { k: "h2", text: "Qué no cubre" },
        {
          k: "ul",
          items: [
            "Los retrasos en la entrega. Seis meses es común y el contrato suele permitirlo de forma expresa.",
            "La calidad de la obra: eso es obligación del constructor y de su acta de entrega.",
            "Diferencias de área de pocos puntos porcentuales, que la mayoría de contratos permite con ajuste de precio.",
            "Pagos hechos por fuera del encargo. Si alguien le pide girar a una cuenta personal o corporativa, deténgase.",
          ],
        },
        { k: "h2", text: "Qué verificar antes de firmar" },
        {
          k: "p",
          text: "Pida el nombre de la fiduciaria y confirme que está vigilada. Lea el encargo fiduciario: condiciones de punto de equilibrio y plazo. Confirme que la cuenta a la que paga es del encargo y no del constructor. Y lea el historial de entregas de sus últimos tres proyectos: la fiducia protege su capital, pero solo el historial predice su fecha.",
        },
      ],
    },
  },
  {
    slug: "poblado-vs-envigado-vs-laureles",
    published: "2026-03-18",
    relatedCity: "medellin",
    en: {
      category: "Medellín",
      title: "El Poblado vs Envigado vs Laureles: where foreigners actually buy",
      excerpt:
        "Three zones, three different buyers. Resale liquidity, price per square metre, noise, and which one survives a change in short-term rental rules.",
      readTime: "8 min read",
      seoTitle: "El Poblado vs Envigado vs Laureles: where to buy",
      seoDescription: "Where to buy in Medellín: El Poblado, Envigado and Laureles compared on price per square metre, resale liquidity and short-term rental rules.",
      blocks: [
        {
          k: "p",
          text: "Almost every foreign purchase in Medellín happens in one of three places. They are not interchangeable, and the right answer depends less on taste than on what you intend to do with the property.",
        },
        { k: "h2", text: "El Poblado — liquidity" },
        {
          k: "p",
          text: "El Poblado carries the deepest international demand and therefore the most reliable resale. If you may need to sell in a soft market, this is where a unit still moves. You pay the highest price per square metre in the city for that, and in the Provenza and Manila pockets you also pay in noise: those streets are loud until 3am and the buildings around them fill with short-stay guests. Higher up, in El Tesoro and Los Balsos, it is quiet, cooler and entirely car-dependent.",
        },
        { k: "h2", text: "Laureles — livability and value" },
        {
          k: "p",
          text: "Laureles is flat, gridded and shaded, with the best walkability in Medellín and a genuinely local street life. Price per square metre runs meaningfully below comparable Poblado stock, the building stock is older and lower-rise, and the tenant profile is Colombian professionals rather than tourists. For a buyer who intends to live here, or to rent long-term, it is usually the better purchase.",
        },
        {
          k: "quote",
          text: "Ask yourself one question: if nightly rental were banned in your building tomorrow, would you still want to own it? Laureles and Envigado usually answer yes.",
        },
        { k: "h2", text: "Envigado — space and separation" },
        {
          k: "p",
          text: "Envigado is a separate municipality with its own rules, its own tax and its own attitude to tourist rental. It is calmer, more residential and offers more square metres per peso than Poblado, at the cost of nightlife and of a shorter list of internationally recognisable buildings. The border strip — El Esmeraldal, Zúñiga — behaves almost like Poblado; the further south and east you go, the more local it becomes.",
        },
        { k: "h2", text: "How to decide" },
        {
          k: "ul",
          items: [
            "Short-term rental income as the primary goal: El Poblado, in a building with written approval.",
            "Living here full time: Laureles first, Envigado second.",
            "Family space and quiet at a lower price: Envigado.",
            "Maximum resale certainty: El Poblado.",
            "Lowest exposure to a rule change: Laureles or Envigado, on long-term tenancy.",
          ],
        },
      ],
    },
    es: {
      category: "Medellín",
      title: "El Poblado vs Envigado vs Laureles: dónde compran realmente los extranjeros",
      excerpt:
        "Tres zonas, tres compradores distintos. Liquidez de reventa, precio por metro cuadrado, ruido y cuál resiste un cambio en las reglas de renta corta.",
      readTime: "8 min de lectura",
      seoTitle: "El Poblado vs Envigado vs Laureles para extranjeros",
      seoDescription: "Apartamentos en venta en Medellín: El Poblado, Envigado y Laureles comparados por precio del metro cuadrado, reventa y reglas de renta corta.",
      blocks: [
        {
          k: "p",
          text: "Casi toda compra extranjera en Medellín ocurre en uno de tres lugares. No son intercambiables, y la respuesta correcta depende menos del gusto que de lo que usted piensa hacer con el inmueble.",
        },
        { k: "h2", text: "El Poblado — liquidez" },
        {
          k: "p",
          text: "El Poblado concentra la demanda internacional y por eso tiene la reventa más confiable. Si podría necesitar vender en un mercado lento, aquí una unidad todavía se mueve. Paga por ello el precio por metro cuadrado más alto de la ciudad y, en los bolsillos de Provenza y Manila, también en ruido: esas calles suenan hasta las 3 a. m. y los edificios se llenan de huéspedes de paso. Más arriba, en El Tesoro y Los Balsos, es tranquilo, más fresco y totalmente dependiente del carro.",
        },
        { k: "h2", text: "Laureles — vivibilidad y valor" },
        {
          k: "p",
          text: "Laureles es plano, en cuadrícula y arborizado, con la mejor caminabilidad de Medellín y vida de barrio real. El precio por metro cuadrado está claramente por debajo de producto comparable en El Poblado, los edificios son más antiguos y de menor altura, y el perfil de arrendatario es profesional colombiano y no turista. Para quien viene a vivir, o a arrendar a largo plazo, suele ser la mejor compra.",
        },
        {
          k: "quote",
          text: "Hágase una pregunta: si mañana prohibieran la renta por noches en su edificio, ¿seguiría queriendo ser dueño? Laureles y Envigado suelen responder que sí.",
        },
        { k: "h2", text: "Envigado — espacio y separación" },
        {
          k: "p",
          text: "Envigado es un municipio aparte, con normas propias, impuesto propio y su propia postura frente al alojamiento turístico. Es más calmado, más residencial y ofrece más metros por peso que El Poblado, a cambio de menos vida nocturna y de una lista más corta de edificios reconocibles internacionalmente. La franja fronteriza —El Esmeraldal, Zúñiga— se comporta casi como El Poblado; mientras más al sur y al oriente, más local se vuelve.",
        },
        { k: "h2", text: "Cómo decidir" },
        {
          k: "ul",
          items: [
            "Renta corta como objetivo principal: El Poblado, en edificio con autorización escrita.",
            "Vivir aquí todo el año: Laureles primero, Envigado segundo.",
            "Espacio familiar y tranquilidad a menor precio: Envigado.",
            "Máxima certeza de reventa: El Poblado.",
            "Menor exposición a un cambio normativo: Laureles o Envigado, con arriendo largo.",
          ],
        },
      ],
    },
  },
  {
    slug: "short-term-rental-rules-medellin",
    published: "2026-03-30",
    relatedCity: "medellin",
    en: {
      category: "Regulation",
      title: "Short-term rental rules in Medellín — what changed and what it means",
      excerpt:
        "The constraint is not the city. It is the building's reglamento, the RNT registration and the horizontal-property law that lets owners vote you out.",
      readTime: "7 min read",
      seoTitle: "Short-term rental rules in Medellín for buyers",
      seoDescription: "Medellín Airbnb and short-term rental rules: building bylaws, RNT tourism registration and what investors must check before buying.",
      blocks: [
        {
          k: "p",
          text: "Foreign buyers usually ask whether short-term rental is legal in Medellín. It is the wrong question. Nightly rental is a legal commercial activity in Colombia. What decides whether you can do it in a specific apartment is the building, not the city.",
        },
        { k: "h2", text: "The reglamento decides" },
        {
          k: "p",
          text: "Every building governed by horizontal property law has a reglamento de propiedad horizontal, registered with the deed. It defines whether units are residential, mixed or commercial in use. If it restricts use to housing, nightly rental is a breach — and enforcement is not theoretical: the administration can fine, cut access to common areas and take you to court.",
        },
        {
          k: "quote",
          text: "An owners' assembly can amend the reglamento with the majority set out in Law 675 of 2001. A building that allows short stays today can vote to stop allowing them.",
        },
        { k: "h2", text: "Registration is a separate obligation" },
        {
          k: "ul",
          items: [
            "Operating tourist accommodation requires registration in the Registro Nacional de Turismo (RNT), renewed annually.",
            "Guest data must be reported as required of accommodation providers.",
            "VAT and the tourism contribution may apply depending on how you operate and your revenue.",
            "Platforms increasingly ask for the RNT number before allowing a listing to stay active.",
          ],
        },
        { k: "h2", text: "What has actually shifted" },
        {
          k: "p",
          text: "The visible trend since the tourism boom is not a citywide ban. It is buildings in El Poblado and Laureles amending their reglamentos to prohibit or heavily restrict stays under thirty days, alongside firmer enforcement of RNT requirements and, in neighbouring Envigado, its own municipal position. The practical effect is that approval is becoming scarcer, and buildings that already hold it are worth more.",
        },
        { k: "h2", text: "What to demand before buying" },
        {
          k: "p",
          text: "Ask for the current reglamento in PDF, the minutes of the last two owners' assemblies, and confirmation of any pending vote on use. A sales agent's assurance that everyone in the building rents nightly is not evidence, and it is not a defence.",
        },
      ],
    },
    es: {
      category: "Normativa",
      title: "Reglas de renta corta en Medellín: qué cambió y qué significa",
      excerpt:
        "La restricción no es la ciudad. Es el reglamento del edificio, el RNT y la ley de propiedad horizontal que permite a los copropietarios prohibirla.",
      readTime: "7 min de lectura",
      seoTitle: "Reglas de renta corta en Medellín para compradores",
      seoDescription: "Renta corta y Airbnb en Medellín: reglamento de propiedad horizontal, Registro Nacional de Turismo (RNT) y qué revisar antes de comprar.",
      blocks: [
        {
          k: "p",
          text: "Los compradores extranjeros suelen preguntar si la renta corta es legal en Medellín. Es la pregunta equivocada. El alojamiento por noches es una actividad comercial legal en Colombia. Lo que define si puede hacerlo en un apartamento específico es el edificio, no la ciudad.",
        },
        { k: "h2", text: "El reglamento decide" },
        {
          k: "p",
          text: "Todo edificio sometido a propiedad horizontal tiene un reglamento de propiedad horizontal, registrado junto con la escritura. Ahí se define si las unidades son de uso residencial, mixto o comercial. Si restringe el uso a vivienda, la renta por noches es un incumplimiento, y la sanción no es teórica: la administración puede multar, restringir zonas comunes y demandar.",
        },
        {
          k: "quote",
          text: "Una asamblea de copropietarios puede reformar el reglamento con las mayorías de la Ley 675 de 2001. Un edificio que hoy permite estadías cortas puede votar para dejar de permitirlas.",
        },
        { k: "h2", text: "El registro es una obligación aparte" },
        {
          k: "ul",
          items: [
            "Prestar alojamiento turístico exige inscripción en el Registro Nacional de Turismo (RNT), renovada cada año.",
            "Debe reportar la información de huéspedes exigida a los prestadores de alojamiento.",
            "Pueden aplicar IVA y la contribución parafiscal de turismo según cómo opere y sus ingresos.",
            "Las plataformas piden cada vez más el número de RNT para mantener activo un anuncio.",
          ],
        },
        { k: "h2", text: "Qué cambió realmente" },
        {
          k: "p",
          text: "La tendencia visible desde el auge turístico no es una prohibición general de ciudad. Son edificios de El Poblado y Laureles reformando su reglamento para prohibir o restringir con fuerza las estadías menores a treinta días, junto con una exigencia más firme del RNT y, en Envigado, una postura municipal propia. El efecto práctico: la autorización es más escasa y los edificios que ya la tienen valen más.",
        },
        { k: "h2", text: "Qué exigir antes de comprar" },
        {
          k: "p",
          text: "Pida el reglamento vigente en PDF, las actas de las dos últimas asambleas y confirmación de cualquier votación pendiente sobre el uso. Que un asesor le diga que todo el mundo en el edificio renta por noches no es prueba, y no es defensa.",
        },
      ],
    },
  },
  {
    slug: "seven-documents-before-you-sign",
    published: "2026-04-08",
    relatedCity: "cartagena",
    en: {
      category: "Due diligence",
      title: "The 7 documents to demand before you sign anything",
      excerpt:
        "Every avoidable problem in a Colombian purchase is visible in one of seven documents. Ask for all seven in PDF, before the reservation fee.",
      readTime: "6 min read",
      seoTitle: "7 documents to demand before buying property in Colombia",
      seoDescription: "Certificado de tradición, paz y salvos, escritura and more: the seven documents to demand before signing a property purchase in Colombia.",
      blocks: [
        {
          k: "p",
          text: "Nearly every bad outcome we have seen in a Colombian purchase was visible in a document the buyer never asked for. Request all seven in PDF before you pay a reservation fee. A seller who cannot produce them has told you something.",
        },
        { k: "h2", text: "1. Certificado de tradición y libertad" },
        {
          k: "p",
          text: "Issued by the registry office, dated within thirty days. It lists every transfer, mortgage, embargo, lawsuit and easement recorded against the property. Read the annotations in order. Anything unresolved must be cleared before the deed, not after.",
        },
        { k: "h2", text: "2. The building licence" },
        {
          k: "p",
          text: "For anything under construction: the licencia de construcción issued by the curaduría urbana, with its number, validity and approved number of floors. A project selling more floors than its licence permits is a project that will be redesigned or delayed.",
        },
        { k: "h2", text: "3. The fiducia agreement" },
        {
          k: "p",
          text: "Names the fiduciaria, the trust account and the break-even conditions. Check that the account you are asked to pay into is the trust's, and that the deadline for reaching break-even is a date, not a sentiment.",
        },
        { k: "h2", text: "4. Reglamento de propiedad horizontal" },
        {
          k: "p",
          text: "Defines permitted use, whether short stays are allowed, pet rules, and how common expenses are split. This is the document that decides your rental model.",
        },
        {
          k: "quote",
          text: "If any of these seven takes more than a week to arrive, that delay is your information. Nothing on this list is difficult to produce for a seller who has it.",
        },
        { k: "h2", text: "5, 6 and 7" },
        {
          k: "ul",
          items: [
            "Paz y salvo of property tax and of administration fees — unpaid amounts follow the property, not the seller.",
            "Minutes of the last two owners' assemblies — where you find pending levies, structural repairs and votes on use.",
            "The payment plan and the promesa de compraventa in draft — read the penalty and delay clauses before, not after, signing.",
          ],
        },
      ],
    },
    es: {
      category: "Debida diligencia",
      title: "Los 7 documentos que debe exigir antes de firmar",
      excerpt:
        "Todo problema evitable en una compra en Colombia es visible en alguno de siete documentos. Pídalos los siete en PDF, antes de la cuota de separación.",
      readTime: "6 min de lectura",
      seoTitle: "7 documentos que debe exigir antes de comprar en Colombia",
      seoDescription: "Certificado de tradición y libertad, paz y salvos, escritura y más: los siete documentos que debe exigir antes de comprar inmueble en Colombia.",
      blocks: [
        {
          k: "p",
          text: "Casi todos los malos desenlaces que hemos visto en una compra en Colombia eran visibles en un documento que el comprador nunca pidió. Solicite los siete en PDF antes de pagar cualquier separación. Un vendedor que no puede producirlos ya le dijo algo.",
        },
        { k: "h2", text: "1. Certificado de tradición y libertad" },
        {
          k: "p",
          text: "Lo expide la Oficina de Registro y debe tener menos de treinta días. Lista cada transferencia, hipoteca, embargo, demanda y servidumbre inscritos. Lea las anotaciones en orden. Todo lo pendiente debe sanearse antes de la escritura, no después.",
        },
        { k: "h2", text: "2. La licencia de construcción" },
        {
          k: "p",
          text: "Para obra en construcción: la licencia expedida por la curaduría urbana, con número, vigencia y número de pisos aprobados. Un proyecto que vende más pisos de los que su licencia permite es un proyecto que será rediseñado o retrasado.",
        },
        { k: "h2", text: "3. El contrato de fiducia" },
        {
          k: "p",
          text: "Indica la fiduciaria, la cuenta del encargo y las condiciones de punto de equilibrio. Verifique que la cuenta a la que le piden pagar sea la del encargo y que el plazo para alcanzar el equilibrio sea una fecha, no una intención.",
        },
        { k: "h2", text: "4. Reglamento de propiedad horizontal" },
        {
          k: "p",
          text: "Define el uso permitido, si se admiten estadías cortas, las reglas de mascotas y cómo se reparten las expensas. Este documento decide su modelo de renta.",
        },
        {
          k: "quote",
          text: "Si alguno de estos siete tarda más de una semana en llegar, ese retraso es información. Nada de esta lista es difícil de entregar para un vendedor que lo tiene.",
        },
        { k: "h2", text: "5, 6 y 7" },
        {
          k: "ul",
          items: [
            "Paz y salvo de predial y de administración: lo impago sigue al inmueble, no al vendedor.",
            "Actas de las dos últimas asambleas: allí aparecen cuotas extraordinarias, reparaciones estructurales y votaciones sobre el uso.",
            "El plan de pagos y el borrador de la promesa de compraventa: lea las cláusulas de multa y de retraso antes de firmar, no después.",
          ],
        },
      ],
    },
  },
  {
    slug: "closing-costs-buying-property-colombia",
    published: "2026-10-14",
    relatedCity: "medellin",
    en: {
      category: "Costs",
      title: "Closing costs when buying property in Colombia: who pays what",
      excerpt:
        "Notary, registration, departmental tax and withholding. A clear breakdown of the costs on top of the price, and which side of the deal normally pays each one.",
      readTime: "6 min read",
      seoTitle: "Closing costs when buying property in Colombia",
      seoDescription: "Notary fees, registration, departmental tax and withholding tax: the closing costs of buying property in Colombia and who normally pays each one.",
      blocks: [
        { k: "p", text: "The price on the listing is not the price you pay. In Colombia the transfer is signed before a notary and recorded at the public registry, and each step carries a fee or a tax. Budgeting for them in advance avoids the most common surprise for foreign buyers: a transfer that cannot be completed because the funds for the deed were never wired." },
        { k: "h2", text: "The four costs of the deed" },
        { k: "ul", items: [
          "Notary fees (derechos notariales): a regulated percentage of the deed value plus VAT, usually split 50/50 between buyer and seller.",
          "Registration tax (impuesto de registro or beneficencia): charged by the department, normally paid by the buyer.",
          "Registry fees (derechos de registro): paid to the Oficina de Registro to record the new owner, normally paid by the buyer.",
          "Withholding tax (retención en la fuente): 1% of the sale value, paid by the seller when the seller is an individual.",
        ] },
        { k: "p", text: "As a working rule, set aside roughly 2% to 3% of the price for the buyer's share of closing costs. The exact figures depend on the department, the declared value and the notary, so ask for a written settlement (liquidación) from the notary before you sign." },
        { k: "quote", text: "Ask the notary for the liquidación at least a week before the signing date. It is a single page, and it tells you exactly how much must be in Colombia, and in which account, on the day." },
        { k: "h2", text: "Costs beyond the deed" },
        { k: "ul", items: [
          "Registration of the foreign investment with Banco de la República, through your exchange intermediary — no fee from the bank, but your intermediary may charge one.",
          "Legal review of the title and the promesa de compraventa — a fixed fee agreed with your lawyer.",
          "Property tax (predial) and administration fees from the handover date — prorated between buyer and seller.",
          "For off-plan purchases: the fiducia charges nothing to the buyer, but the deed costs arrive at handover, sometimes years after the reservation.",
        ] },
        { k: "h2", text: "How to avoid surprises" },
        { k: "p", text: "Get the promesa de compraventa to state who pays each item, in writing. Wire the closing costs together with the last instalment, through the same registered channel, so that the money for the deed is also part of your declared investment." },
      ],
    },
    es: {
      category: "Costos",
      title: "Gastos de escrituración en Colombia: quién paga qué",
      excerpt:
        "Notaría, registro, beneficencia y retención en la fuente. Un desglose claro de los costos que se suman al precio y de qué parte suele pagar cada uno.",
      readTime: "6 min de lectura",
      seoTitle: "Gastos de escrituración en Colombia: quién paga qué",
      seoDescription: "Gastos notariales, beneficencia, registro y retención en la fuente: cuánto cuesta escriturar un inmueble en Colombia y quién paga cada concepto.",
      blocks: [
        { k: "p", text: "El precio del aviso no es lo que termina pagando. En Colombia la venta se firma ante notario y se inscribe en la Oficina de Registro, y cada paso tiene un derecho o un impuesto. Calcularlos desde el inicio evita la sorpresa más común: una escritura que no se puede firmar porque el dinero de los gastos nunca llegó." },
        { k: "h2", text: "Los cuatro gastos de la escritura" },
        { k: "ul", items: [
          "Derechos notariales: un porcentaje regulado del valor de la escritura más IVA; por costumbre se pagan por partes iguales entre comprador y vendedor.",
          "Impuesto de registro o beneficencia: lo cobra el departamento y normalmente lo paga el comprador.",
          "Derechos de registro: se pagan a la Oficina de Registro para inscribir al nuevo propietario; normalmente los paga el comprador.",
          "Retención en la fuente: 1 % del valor de venta, a cargo del vendedor cuando es persona natural.",
        ] },
        { k: "p", text: "Como regla práctica, reserve entre el 2 % y el 3 % del precio para la parte del comprador. Las cifras exactas dependen del departamento, del valor declarado y de la notaría; pida la liquidación escrita a la notaría antes de firmar." },
        { k: "quote", text: "Pida la liquidación a la notaría al menos una semana antes de la firma. Es una sola hoja y le dice exactamente cuánto dinero debe estar disponible, y en qué cuenta, ese día." },
        { k: "h2", text: "Costos fuera de la escritura" },
        { k: "ul", items: [
          "Registro de la inversión extranjera ante el Banco de la República a través de su intermediario cambiario, si compra desde el exterior.",
          "Estudio de títulos y revisión de la promesa de compraventa por un abogado, con honorarios acordados.",
          "Predial y administración desde la fecha de entrega, prorrateados entre las partes.",
          "En compras sobre planos, los gastos de escritura llegan a la entrega, a veces años después de la separación.",
        ] },
        { k: "h2", text: "Cómo evitar sorpresas" },
        { k: "p", text: "Deje por escrito en la promesa de compraventa quién paga cada concepto. Y si compra desde el exterior, gire los gastos junto con la última cuota y por el mismo canal registrado, para que también hagan parte de su inversión declarada." },
      ],
    },
  },
  {
    slug: "is-colombian-real-estate-a-good-investment",
    published: "2026-10-14",
    relatedCity: "medellin",
    en: {
      category: "Investment",
      title: "Is Colombian real estate a good investment in 2026? An honest look",
      excerpt:
        "What drives demand in Medellín, Cartagena, Bogotá and Santa Marta, what can go wrong, and the questions to answer before treating a Colombian apartment as an investment.",
      readTime: "7 min read",
      seoTitle: "Is Colombian real estate a good investment in 2026?",
      seoDescription: "Medellín, Cartagena, Bogotá and Santa Marta compared for foreign investors: what drives demand, the real risks, and how to judge a property before buying.",
      blocks: [
        { k: "p", text: "Colombia attracts foreign buyers for clear reasons: prices per square metre well below most of the Americas, a growing flow of visitors, and a legal system that treats foreign owners exactly like locals. None of that makes every apartment a good investment. The right question is not whether Colombia is a good market, but whether this property, in this building, works for your plan." },
        { k: "h2", text: "What drives demand, city by city" },
        { k: "ul", items: [
          "Medellín: remote workers, medical tourism and a strong local middle class. El Poblado, Laureles and Envigado concentrate foreign demand.",
          "Cartagena: tourism-led. The walled city and Bocagrande depend on short stays and on seasonality.",
          "Bogotá: the deepest long-term rental market, driven by corporate and diplomatic tenants rather than tourists.",
          "Santa Marta: second homes and holiday rentals, with newer coastal projects and lower entry prices.",
        ] },
        { k: "h2", text: "The risks nobody puts in the brochure" },
        { k: "ul", items: [
          "Currency: your returns are earned in pesos. A weaker peso can erase rental gains when converted.",
          "Building rules: short-term rentals must be allowed in the reglamento de propiedad horizontal and registered in the RNT.",
          "Liquidity: reselling can take months; well-located, mid-size units resell fastest.",
          "Delivery delays on off-plan projects, which is why the fiducia matters.",
        ] },
        { k: "quote", text: "We never promise returns. We show you the building rules, comparable rents and resale history, and you decide with the numbers in front of you." },
        { k: "h2", text: "Five questions before you buy" },
        { k: "ul", items: [
          "Who will rent this unit, and for how long?",
          "Does the building allow that type of rental, in writing?",
          "What do comparable units actually rent for, net of administration and taxes?",
          "How long did similar units take to resell?",
          "Can you hold it for five years if the plan changes?",
        ] },
      ],
    },
    es: {
      category: "Inversión",
      title: "¿Es buena inversión la finca raíz en Colombia en 2026? Una mirada honesta",
      excerpt:
        "Qué mueve la demanda en Medellín, Cartagena, Bogotá y Santa Marta, qué puede salir mal y qué preguntas responder antes de comprar un apartamento para invertir.",
      readTime: "7 min de lectura",
      seoTitle: "¿Invertir en finca raíz en Colombia en 2026?",
      seoDescription: "Invertir en finca raíz en Colombia: Medellín, Cartagena, Bogotá y Santa Marta comparadas, los riesgos reales y cómo evaluar un inmueble antes de comprar.",
      blocks: [
        { k: "p", text: "Colombia atrae compradores por razones claras: precios por metro cuadrado más bajos que en buena parte del continente, más visitantes cada año y una ley que trata igual al propietario extranjero y al nacional. Eso no convierte cualquier apartamento en una buena inversión. La pregunta correcta no es si Colombia es buen mercado, sino si este inmueble, en este edificio, sirve para su plan." },
        { k: "h2", text: "Qué mueve la demanda en cada ciudad" },
        { k: "ul", items: [
          "Medellín: nómadas digitales, turismo de salud y una clase media local fuerte. El Poblado, Laureles y Envigado concentran la demanda.",
          "Cartagena: depende del turismo. La ciudad amurallada y Bocagrande viven de la renta corta y de la temporada.",
          "Bogotá: el mercado de arriendo de largo plazo más profundo, con inquilinos corporativos y diplomáticos.",
          "Santa Marta: segunda vivienda y renta vacacional, con proyectos nuevos frente al mar y precios de entrada menores.",
        ] },
        { k: "h2", text: "Los riesgos que no salen en el folleto" },
        { k: "ul", items: [
          "Tasa de cambio: la renta llega en pesos; si el peso se debilita, la ganancia en dólares se reduce.",
          "Reglamento del edificio: la renta corta debe estar permitida por escrito y registrada en el RNT.",
          "Liquidez: vender puede tomar meses; las unidades medianas y bien ubicadas se venden más rápido.",
          "Retrasos en proyectos sobre planos; por eso importa la fiducia.",
        ] },
        { k: "quote", text: "Nunca prometemos rentabilidades. Le mostramos el reglamento, los arriendos comparables y el historial de reventa, y usted decide con los números en la mano." },
        { k: "h2", text: "Cinco preguntas antes de comprar" },
        { k: "ul", items: [
          "¿Quién va a arrendar este inmueble y por cuánto tiempo?",
          "¿El edificio permite ese tipo de renta, por escrito?",
          "¿Cuánto rentan de verdad unidades parecidas, después de administración e impuestos?",
          "¿Cuánto tardaron en venderse unidades similares?",
          "¿Puede sostenerlo cinco años si su plan cambia?",
        ] },
      ],
    },
  },
  {
    slug: "mortgage-in-colombia-for-foreigners",
    published: "2026-10-14",
    relatedCity: "bogota",
    en: {
      category: "Financing",
      title: "Can foreigners get a mortgage in Colombia? What banks actually ask for",
      excerpt:
        "Colombian banks do lend to foreigners, but on stricter terms. What they require, how much they usually finance, and the alternatives most buyers end up using.",
      readTime: "6 min read",
      seoTitle: "Mortgage in Colombia for foreigners: requirements",
      seoDescription: "Can foreigners get a mortgage in Colombia? Bank requirements, typical down payment, documents and the financing alternatives most foreign buyers use.",
      blocks: [
        { k: "p", text: "Yes, a foreigner can get a mortgage (crédito hipotecario) in Colombia, but it is slower and stricter than for residents. Most foreign buyers we work with pay in cash or through the developer's instalment plan. Knowing the bank route still helps, because it shapes how much cash you must bring." },
        { k: "h2", text: "What Colombian banks usually require" },
        { k: "ul", items: [
          "A valid passport and, in many banks, a Colombian visa or a cédula de extranjería.",
          "Proof of income for the last two or three years, with tax returns, translated and apostilled if issued abroad.",
          "A Colombian bank account and, often, a local credit history.",
          "A larger down payment than residents: commonly 30% to 50% of the price.",
        ] },
        { k: "p", text: "Terms vary by bank and change with interest-rate cycles, so treat any figure as a starting point and request a written pre-approval before you commit to a purchase." },
        { k: "quote", text: "The cheapest financing for many foreign buyers is the developer's instalment plan on an off-plan project: payments spread over construction, held in fiducia, without a bank." },
        { k: "h2", text: "The alternatives" },
        { k: "ul", items: [
          "Developer instalment plans during construction, with the balance at handover.",
          "Financing in your home country against assets you already own.",
          "Leasing habitacional through Colombian banks, a rent-to-own structure that some lenders offer to foreigners.",
        ] },
        { k: "h2", text: "Before you apply" },
        { k: "p", text: "Open a Colombian bank account early, keep every transfer through a registered channel, and gather your income documents apostilled in advance. Those three steps decide whether a bank reviews your file in weeks or in months." },
      ],
    },
    es: {
      category: "Financiación",
      title: "Crédito hipotecario para extranjeros en Colombia: qué piden los bancos",
      excerpt:
        "Los bancos colombianos sí prestan a extranjeros, pero con más exigencias. Qué requisitos piden, cuánto financian normalmente y qué alternativas usan la mayoría de compradores.",
      readTime: "6 min de lectura",
      seoTitle: "Crédito hipotecario para extranjeros en Colombia",
      seoDescription: "¿Un extranjero puede pedir crédito hipotecario en Colombia? Requisitos de los bancos, cuota inicial habitual, documentos y alternativas de financiación.",
      blocks: [
        { k: "p", text: "Sí, un extranjero puede obtener un crédito hipotecario en Colombia, pero el proceso es más lento y exigente que para un residente. La mayoría de compradores extranjeros con los que trabajamos pagan de contado o con el plan de pagos de la constructora. Conocer la vía bancaria igual ayuda, porque define cuánto dinero propio debe traer." },
        { k: "h2", text: "Lo que suelen pedir los bancos" },
        { k: "ul", items: [
          "Pasaporte vigente y, en muchos bancos, visa colombiana o cédula de extranjería.",
          "Soportes de ingresos de los últimos dos o tres años, con declaraciones de renta, traducidos y apostillados si son del exterior.",
          "Cuenta bancaria en Colombia y, con frecuencia, historial crediticio local.",
          "Una cuota inicial mayor que la de un residente: comúnmente entre el 30 % y el 50 % del precio.",
        ] },
        { k: "p", text: "Las condiciones cambian según el banco y el ciclo de tasas de interés; tome cualquier cifra como punto de partida y pida una preaprobación por escrito antes de comprometerse." },
        { k: "quote", text: "Para muchos compradores extranjeros, la financiación más barata es el plan de pagos de un proyecto sobre planos: cuotas durante la obra, protegidas en fiducia y sin banco." },
        { k: "h2", text: "Las alternativas" },
        { k: "ul", items: [
          "Plan de pagos de la constructora durante la obra, con el saldo a la entrega.",
          "Financiación en su país de origen respaldada por bienes que ya tiene.",
          "Leasing habitacional con bancos colombianos, que algunos ofrecen a extranjeros.",
        ] },
        { k: "h2", text: "Antes de solicitarlo" },
        { k: "p", text: "Abra pronto una cuenta en Colombia, haga todas las transferencias por un canal registrado y tenga apostillados sus soportes de ingresos. Esos tres pasos deciden si el banco estudia su solicitud en semanas o en meses." },
      ],
    },
  },
  {
    slug: "colombia-investor-visa-real-estate",
    published: "2026-10-14",
    relatedCity: "cartagena",
    en: {
      category: "Visas",
      title: "Colombia investor visa through real estate: how buying property can get you residency",
      excerpt:
        "Buying property above a minimum value can qualify you for Colombia's migrant investor visa, and later for residency. How the thresholds work and what Migración Colombia asks for.",
      readTime: "7 min read",
      seoTitle: "Colombia investor visa through real estate",
      seoDescription: "How buying property in Colombia can qualify you for the investor visa (M) and later residency (R): minimum amounts, registered investment and documents.",
      blocks: [
        { k: "p", text: "Colombia links residency to property investment. A foreigner who buys real estate above a minimum value, and registers that investment with Banco de la República, can apply for a migrant visa as an investor. Keep the visa long enough, or invest a higher amount, and you can apply for resident status." },
        { k: "h2", text: "The two thresholds" },
        { k: "ul", items: [
          "Migrant visa (type M) as investor: a registered foreign investment in real estate of at least 350 times the Colombian monthly minimum wage (SMMLV).",
          "Resident visa (type R) as investor: a registered investment of at least 650 times the monthly minimum wage.",
        ] },
        { k: "p", text: "Because the minimum wage changes every January, the amount in pesos changes every year. Rules are set by the Ministry of Foreign Affairs and can be updated, so confirm the current figures on Cancillería's site, or with an immigration lawyer, before you buy with a visa in mind." },
        { k: "quote", text: "The visa depends on the registration, not just on the purchase. Money that did not enter through a registered exchange channel does not count towards the threshold." },
        { k: "h2", text: "What you will need" },
        { k: "ul", items: [
          "The registered deed and a recent certificado de tradición y libertad in your name.",
          "The foreign investment registration with Banco de la República (Form 11 or the exchange declarations from your bank).",
          "Your passport, photos and the online application through Cancillería.",
        ] },
        { k: "h2", text: "Plan the purchase around the visa" },
        { k: "p", text: "If residency is part of your plan, tell your agent and your lawyer before the reservation. The price, the transfer route and the timing of the deed should all be chosen so that the investment is registered correctly from the first wire." },
      ],
    },
    es: {
      category: "Visas",
      title: "Visa de inversionista en Colombia por compra de inmueble: cómo obtener residencia",
      excerpt:
        "Comprar un inmueble por encima de un monto mínimo permite pedir la visa de migrante inversionista y, después, la residencia. Cómo funcionan los montos y qué pide Cancillería.",
      readTime: "7 min de lectura",
      seoTitle: "Visa de inversionista en Colombia por inmueble",
      seoDescription: "Cómo comprar inmueble en Colombia permite pedir la visa de inversionista (M) y luego la residencia (R): montos mínimos, registro de inversión y requisitos.",
      blocks: [
        { k: "p", text: "Colombia vincula la residencia con la inversión en finca raíz. Un extranjero que compra un inmueble por encima de un monto mínimo, y registra esa inversión ante el Banco de la República, puede pedir la visa de migrante como inversionista. Si mantiene la visa el tiempo necesario, o invierte un monto mayor, puede solicitar la residencia." },
        { k: "h2", text: "Los dos montos" },
        { k: "ul", items: [
          "Visa de migrante (tipo M) como inversionista: inversión extranjera registrada en inmuebles de al menos 350 salarios mínimos mensuales (SMMLV).",
          "Visa de residente (tipo R) como inversionista: inversión registrada de al menos 650 salarios mínimos mensuales.",
        ] },
        { k: "p", text: "Como el salario mínimo cambia cada enero, el monto en pesos cambia cada año. Las reglas las fija el Ministerio de Relaciones Exteriores y pueden actualizarse; confirme las cifras vigentes en el sitio de Cancillería o con un abogado de migración antes de comprar pensando en la visa." },
        { k: "quote", text: "La visa depende del registro, no solo de la compra. El dinero que no entró por un canal cambiario registrado no cuenta para el monto mínimo." },
        { k: "h2", text: "Lo que necesitará" },
        { k: "ul", items: [
          "La escritura registrada y un certificado de tradición y libertad reciente a su nombre.",
          "El registro de la inversión extranjera ante el Banco de la República (formulario 11 o las declaraciones de cambio de su banco).",
          "Pasaporte, fotos y la solicitud en línea ante Cancillería.",
        ] },
        { k: "h2", text: "Planee la compra pensando en la visa" },
        { k: "p", text: "Si la residencia hace parte de su plan, dígaselo a su asesor y a su abogado antes de la separación. El precio, la ruta del giro y la fecha de la escritura deben elegirse para que la inversión quede bien registrada desde la primera transferencia." },
      ],
    },
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);

export const GUIDES_INDEX: Record<
  Locale,
  { title: string; description: string; heading: string; intro: string; related: string; back: string }
> = {
  en: {
    title: "Colombia Real Estate Blog — Buying Property from Abroad",
    description:
      "Plain, specific guides for foreign buyers: legal requirements, moving money, fiducia, closing costs, mortgages, investor visas, Medellín zones and short-term rental rules.",
    heading: "Blog",
    intro: "Written for buyers who are not in Colombia. No sales language, no generalities.",
    related: "Related properties",
    back: "All articles",
  },
  es: {
    title: "Blog de bienes raíces en Colombia | AVEL Estates",
    description:
      "Guías claras y concretas para compradores extranjeros: requisitos legales, mover el dinero, fiducia, gastos de escrituración, crédito hipotecario, visa de inversionista y renta corta.",
    heading: "Blog",
    intro: "Escritas para compradores que no están en Colombia. Sin lenguaje comercial ni generalidades.",
    related: "Propiedades relacionadas",
    back: "Todos los artículos",
  },
};
