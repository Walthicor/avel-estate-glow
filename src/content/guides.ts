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
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);

export const GUIDES_INDEX: Record<
  Locale,
  { title: string; description: string; heading: string; intro: string; related: string; back: string }
> = {
  en: {
    title: "Colombia Real Estate Blog — Buying Property from Abroad",
    description:
      "Plain, specific guides for foreign buyers: legal requirements, moving money, fiducia, Medellín zones, short-term rental rules and due diligence.",
    heading: "Blog",
    intro: "Written for buyers who are not in Colombia. No sales language, no generalities.",
    related: "Related properties",
    back: "All articles",
  },
  es: {
    title: "Blog de bienes raíces en Colombia | AVEL Estates",
    description:
      "Guías claras y concretas para compradores extranjeros: requisitos legales, mover el dinero, fiducia, zonas de Medellín, renta corta y debida diligencia.",
    heading: "Blog",
    intro: "Escritas para compradores que no están en Colombia. Sin lenguaje comercial ni generalidades.",
    related: "Propiedades relacionadas",
    back: "Todos los artículos",
  },
};
