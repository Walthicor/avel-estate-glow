import type { Locale } from "../config/site";

import { CITY_PHOTOS } from "./photos";
const { medellin: medellinImg, cartagena: cartagenaImg, santaMarta: santaMartaImg, bogota: bogotaImg, envigado: envigadoImg, rionegro: rionegroImg } = CITY_PHOTOS;

export type CityCopy = {
  name: string;
  region: string;
  seoTitle: string;
  seoDescription: string;
  /** Original editorial introduction, 300–400 words. */
  intro: string[];
  zonesHeading: string;
  zones: { name: string; note: string }[];
  gridHeading: string;
};

export type CityRecord = {
  slug: string;
  /** Matches PropertyRecord.city so the grid can be filtered. */
  filterCity: string | null;
  image: string;
  en: CityCopy;
  es: CityCopy;
};

export const CITY_SLUGS = [
  "medellin",
  "cartagena",
  "santa-marta",
  "bogota",
  "envigado",
  "rionegro",
] as const;

export const CITIES: CityRecord[] = [
  {
    slug: "medellin",
    filterCity: "medellin",
    image: medellinImg,
    en: {
      name: "Medellín",
      region: "Antioquia",
      seoTitle: "Buying property in Medellín as a foreigner — AVEL Estates",
      seoDescription: "Zones, altitude, rental rules and how foreign buyers purchase in Medellín remotely. Price on request.",
      intro: [
        "Medellín sits at 1,495 metres in a narrow valley, which is the single fact that explains most of the property market here. The climate does not change through the year — days sit around 22–28°C, nights are cool, and nothing needs heating or air conditioning. Buildings are therefore cheap to run, balconies are used year-round, and the ones with a valley view command a premium that never really softens.",
        "The valley is narrow, so the city grows upward and sideways along the hills. Flat, walkable land is scarce and expensive; the steep land above it is cheaper but you will be dependent on a car or on a long walk uphill. When a listing sounds unusually good for its zone, the reason is almost always slope, noise from a main avenue, or a building with no lift redundancy.",
        "The zones that matter to foreign buyers are a short list. El Poblado is where most international demand lands: embassy-adjacent restaurants, the largest concentration of newer buildings, and the deepest resale market. Within it, Provenza and Manila are dense and noisy, El Tesoro and Los Balsos are quieter, higher and car-dependent. Laureles is flat, gridded and residential, with far more local life and better value per square metre, and it has become the second landing zone for buyers who want to live here rather than rent nightly. Envigado and Sabaneta, immediately south, are separate municipalities with their own rules and their own price levels.",
        "Two things to know before buying. First, short-term rental is not a city-wide right: it depends on the building's reglamento de propiedad horizontal and on the municipality's rules, and both have tightened. Ask for the reglamento in writing, not for a promise from a sales agent. Second, most new inventory here is pre-construction sold on a payment plan against a fiducia. That structure is safer than it sounds, but delivery dates move — read the developer's record on previous projects before you read the brochure.",
      ],
      zonesHeading: "Zones we cover",
      zones: [
        { name: "El Poblado", note: "Deepest international demand and resale market." },
        { name: "Provenza & Manila", note: "Walkable, dense, loud at night." },
        { name: "El Tesoro & Los Balsos", note: "Higher, quieter, car-dependent." },
        { name: "Laureles", note: "Flat, gridded, residential, better value per m²." },
        { name: "Envigado", note: "Separate municipality, calmer, family-oriented." },
        { name: "Sabaneta", note: "Southern edge, newer stock, lower entry prices." },
      ],
      gridHeading: "Properties in Medellín",
    },
    es: {
      name: "Medellín",
      region: "Antioquia",
      seoTitle: "Comprar propiedad en Medellín | AVEL Estates",
      seoDescription: "Zonas, clima, reglas de renta y cómo compran los extranjeros en Medellín a distancia.",
      intro: [
        "Medellín está a 1.495 metros en un valle estrecho, y ese dato explica casi todo el mercado inmobiliario local. El clima no cambia durante el año: entre 22 y 28°C de día, noches frescas, y nada necesita calefacción ni aire acondicionado. Los edificios son baratos de operar, los balcones se usan todo el año y los que tienen vista al valle mantienen un sobreprecio que casi nunca cede.",
        "Como el valle es angosto, la ciudad crece hacia arriba y hacia las laderas. La tierra plana y caminable es escasa y cara; la de ladera es más barata, pero dependerá del carro o de una subida larga. Cuando una oferta parece demasiado buena para su zona, la razón suele ser la pendiente, el ruido de una avenida o un edificio sin redundancia de ascensores.",
        "Las zonas que importan al comprador extranjero son pocas. El Poblado concentra la demanda internacional: restaurantes, la mayor oferta de edificios nuevos y el mercado de reventa más profundo. Dentro de él, Provenza y Manila son densos y ruidosos; El Tesoro y Los Balsos son más altos, tranquilos y dependientes del carro. Laureles es plano, en cuadrícula y residencial, con mucha más vida local y mejor precio por metro cuadrado, y se volvió la segunda opción de quien viene a vivir y no a rentar por noches. Envigado y Sabaneta, al sur, son municipios aparte con reglas y precios propios.",
        "Dos cosas antes de comprar. Primero: la renta corta no es un derecho de toda la ciudad; depende del reglamento de propiedad horizontal del edificio y de las normas del municipio, y ambos se han endurecido. Pida el reglamento por escrito, no la promesa de un asesor. Segundo: la mayoría del inventario nuevo se vende sobre planos con plan de pagos y fiducia. Esa estructura es más segura de lo que parece, pero las fechas de entrega se mueven: lea el historial del constructor antes que el folleto.",
      ],
      zonesHeading: "Zonas que cubrimos",
      zones: [
        { name: "El Poblado", note: "Mayor demanda internacional y reventa." },
        { name: "Provenza y Manila", note: "Caminable, denso, ruidoso de noche." },
        { name: "El Tesoro y Los Balsos", note: "Más alto, tranquilo, requiere carro." },
        { name: "Laureles", note: "Plano, en cuadrícula, mejor precio por m²." },
        { name: "Envigado", note: "Municipio aparte, más calmado y familiar." },
        { name: "Sabaneta", note: "Borde sur, obra nueva, entrada más baja." },
      ],
      gridHeading: "Propiedades en Medellín",
    },
  },
  {
    slug: "cartagena",
    filterCity: "cartagena",
    image: cartagenaImg,
    en: {
      name: "Cartagena",
      region: "Bolívar",
      seoTitle: "Buying property in Cartagena as a foreigner — AVEL Estates",
      seoDescription: "Walled city, Bocagrande or the northern beaches: what Cartagena means for a remote foreign buyer.",
      intro: [
        "Cartagena is a Caribbean port with a UNESCO-listed walled city attached to a modern beach strip, and those two halves behave like different markets. Inside the walls you are buying a restored colonial house or a converted apartment, usually with a heritage restriction on what you can change and an owners' community that is small and opinionated. Outside, in Bocagrande and Castillogrande, you are buying a tower: newer, easier to maintain, and far more liquid when you sell.",
        "Heat and salt are the real variables here. It is hot and humid all year, so air conditioning runs constantly and electricity is a genuine monthly cost, not a rounding error. Salt air attacks metal, glass fittings and façades; a building that skips maintenance shows it within five years. Before you commit, ask for the administration fee, the last two years of extraordinary levies, and whether the façade has been treated. A cheap tower with a deferred maintenance backlog is not cheap.",
        "The tourist calendar shapes rental income more than the property does. December to January, Easter and long weekends are close to full; September and October are thin. Anyone modelling occupancy on a flat annual figure has not run a season here. Short-term rental also depends on the building — several towers on the beach front have banned nightly stays outright, and the walled city has been the most restrictive of all.",
        "Zones worth knowing: the Centro Histórico and Getsemaní for character, lower liquidity and the strictest rules; Bocagrande for the deepest inventory and the most predictable resale; Castillogrande for quieter, larger family units; Manga for local life at a much lower price per square metre; and the northern corridor toward La Boquilla, Manzanillo and Barú for newer beachfront projects where the trade-off is distance from the city and reliance on the developer's own amenities. Check beach access rights in writing — in Colombia the beach itself is public.",
      ],
      zonesHeading: "Zones we cover",
      zones: [
        { name: "Centro Histórico", note: "Heritage rules, character, thinner resale." },
        { name: "Getsemaní", note: "Walkable, nightlife, restoration projects." },
        { name: "Bocagrande", note: "Deepest tower inventory, most liquid resale." },
        { name: "Castillogrande", note: "Quieter, larger family apartments." },
        { name: "Manga", note: "Local, residential, lower price per m²." },
        { name: "La Boquilla & Manzanillo", note: "Newer beachfront, developer amenities." },
      ],
      gridHeading: "Properties in Cartagena",
    },
    es: {
      name: "Cartagena",
      region: "Bolívar",
      seoTitle: "Comprar propiedad en Cartagena | AVEL Estates",
      seoDescription: "Ciudad amurallada, Bocagrande o playas del norte: qué significa Cartagena para un comprador remoto.",
      intro: [
        "Cartagena es un puerto caribeño con una ciudad amurallada declarada por la UNESCO pegada a una franja de playa moderna, y esas dos mitades se comportan como mercados distintos. Dentro de las murallas usted compra una casa colonial restaurada o un apartamento adaptado, casi siempre con restricción patrimonial sobre lo que puede modificar y una copropiedad pequeña y muy opinada. Afuera, en Bocagrande y Castillogrande, compra una torre: más nueva, más fácil de mantener y mucho más líquida al vender.",
        "El calor y la sal son las variables reales. Hace calor y humedad todo el año, el aire acondicionado funciona sin parar y la energía es un costo mensual serio, no un detalle. El salitre ataca metales, herrajes y fachadas; un edificio que descuida el mantenimiento lo muestra en cinco años. Antes de comprometerse pida la cuota de administración, las cuotas extraordinarias de los últimos dos años y si la fachada tiene tratamiento. Una torre barata con mantenimiento aplazado no es barata.",
        "El calendario turístico define la renta más que la propiedad misma. Diciembre y enero, Semana Santa y los puentes van casi llenos; septiembre y octubre son flojos. Quien proyecte ocupación con un promedio anual plano no ha vivido una temporada aquí. La renta corta además depende del edificio: varias torres del frente de playa la prohibieron por completo, y el centro histórico es el más restrictivo.",
        "Zonas para tener presentes: Centro Histórico y Getsemaní por carácter, con menor liquidez y las reglas más estrictas; Bocagrande por inventario y reventa predecible; Castillogrande por unidades familiares más grandes y tranquilas; Manga por vida local y menor precio por metro; y el corredor norte hacia La Boquilla, Manzanillo y Barú por proyectos nuevos frente al mar, donde el costo es la distancia y la dependencia de las amenidades del proyecto. Verifique por escrito el acceso a la playa: en Colombia la playa es pública.",
      ],
      zonesHeading: "Zonas que cubrimos",
      zones: [
        { name: "Centro Histórico", note: "Norma patrimonial, carácter, reventa lenta." },
        { name: "Getsemaní", note: "Caminable, vida nocturna, restauraciones." },
        { name: "Bocagrande", note: "Mayor inventario en torre y reventa líquida." },
        { name: "Castillogrande", note: "Más tranquilo, apartamentos familiares." },
        { name: "Manga", note: "Residencial local, menor precio por m²." },
        { name: "La Boquilla y Manzanillo", note: "Frente de playa nuevo con amenidades." },
      ],
      gridHeading: "Propiedades en Cartagena",
    },
  },
  {
    slug: "santa-marta",
    filterCity: "santa-marta",
    image: santaMartaImg,
    en: {
      name: "Santa Marta",
      region: "Magdalena",
      seoTitle: "Buying property in Santa Marta as a foreigner — AVEL Estates",
      seoDescription: "Rodadero, Pozos Colorados and Bello Horizonte compared for foreign buyers in Santa Marta.",
      intro: [
        "Santa Marta is the oldest surviving city in Colombia and, for a buyer, the cheapest way into the Caribbean coast. Entry prices per square metre sit well below Cartagena for comparable sea-view stock, which is the main reason foreign interest has moved here. The trade-off is a smaller, less international rental market and a shorter list of buildings that are genuinely well run.",
        "The city is squeezed between the Sierra Nevada and the sea, so the coastline breaks into distinct pockets rather than one continuous strip. El Rodadero is the established tourist bay: dense, busy, and where nightly rental demand actually exists. South of it, Bello Horizonte and Pozos Colorados are newer condominium corridors with better beaches, resort-style amenities and more space per peso, but you are car-dependent and dining options are inside the complexes. The Centro Histórico has been steadily restored and is the most interesting place to actually live; Taganga, over the hill, is beautiful and stubbornly informal.",
        "Two practical realities that catch buyers out. Water and power infrastructure is weaker than in Medellín or Bogotá, so ask specifically about the building's water storage, pumps and generator — good projects have all three and say so in the technical specification. And the dry season wind between December and March is strong enough to matter on high floors and exposed terraces; it is worth visiting, or asking for video, in that window rather than in September.",
        "Rental income here is seasonal and domestic. The bulk of visitors are Colombian families, concentrated in December–January, Easter and mid-year holidays, with Tayrona National Park driving weekend traffic year-round. That profile favours two- and three-bedroom units with a pool, not studios optimised for solo travellers. As everywhere on the coast, confirm the reglamento de propiedad horizontal allows short stays before you assume the income model, and confirm the project has its licences before you assume the delivery date.",
      ],
      zonesHeading: "Zones we cover",
      zones: [
        { name: "El Rodadero", note: "Established tourist bay, real nightly demand." },
        { name: "Bello Horizonte", note: "Newer condominiums, better beach, car-dependent." },
        { name: "Pozos Colorados", note: "Resort-style projects, space per peso." },
        { name: "Playa Salguero", note: "Low-density beachfront corridor." },
        { name: "Centro Histórico", note: "Restored colonial core, best to live in." },
        { name: "Taganga", note: "Fishing bay, informal, scenic." },
      ],
      gridHeading: "Properties in Santa Marta",
    },
    es: {
      name: "Santa Marta",
      region: "Magdalena",
      seoTitle: "Comprar propiedad en Santa Marta | AVEL Estates",
      seoDescription: "Rodadero, Pozos Colorados y Bello Horizonte comparados para el comprador extranjero.",
      intro: [
        "Santa Marta es la ciudad más antigua del país que sigue en pie y, para un comprador, la entrada más económica al Caribe colombiano. El precio por metro cuadrado está bastante por debajo de Cartagena para producto comparable con vista al mar, y esa es la razón principal del interés extranjero. El costo: un mercado de renta más pequeño y menos internacional, y una lista corta de edificios realmente bien administrados.",
        "La ciudad está apretada entre la Sierra Nevada y el mar, así que la costa se rompe en bolsillos y no en una franja continua. El Rodadero es la bahía turística consolidada: densa, movida y donde sí existe demanda de renta por noches. Al sur, Bello Horizonte y Pozos Colorados son corredores de condominios nuevos con mejores playas, amenidades tipo resort y más espacio por peso, pero dependen del carro y la oferta gastronómica está dentro de los conjuntos. El Centro Histórico se ha restaurado de forma sostenida y es el lugar más interesante para vivir; Taganga, cruzando la loma, es hermosa y tercamente informal.",
        "Dos realidades que sorprenden a los compradores. La infraestructura de agua y energía es más débil que en Medellín o Bogotá: pregunte puntualmente por tanques, bombas y planta eléctrica del edificio; los buenos proyectos tienen los tres y lo dicen en la ficha técnica. Y el viento de la temporada seca, entre diciembre y marzo, es fuerte de verdad en pisos altos y terrazas expuestas; conviene visitar, o pedir video, en esa ventana y no en septiembre.",
        "La renta aquí es estacional y doméstica. La mayoría de visitantes son familias colombianas concentradas en diciembre-enero, Semana Santa y mitad de año, con el Parque Tayrona moviendo fines de semana todo el año. Ese perfil favorece unidades de dos y tres habitaciones con piscina, no estudios pensados para viajeros solos. Como en toda la costa, confirme que el reglamento permite estadías cortas antes de asumir el modelo de ingresos, y que el proyecto tiene licencias antes de asumir la fecha de entrega.",
      ],
      zonesHeading: "Zonas que cubrimos",
      zones: [
        { name: "El Rodadero", note: "Bahía turística consolidada, demanda real." },
        { name: "Bello Horizonte", note: "Condominios nuevos, mejor playa, requiere carro." },
        { name: "Pozos Colorados", note: "Proyectos tipo resort, más espacio por peso." },
        { name: "Playa Salguero", note: "Frente de playa de baja densidad." },
        { name: "Centro Histórico", note: "Centro colonial restaurado, para vivir." },
        { name: "Taganga", note: "Bahía pesquera, informal, escénica." },
      ],
      gridHeading: "Propiedades en Santa Marta",
    },
  },
  {
    slug: "bogota",
    filterCity: "bogota",
    image: bogotaImg,
    en: {
      name: "Bogotá",
      region: "Cundinamarca",
      seoTitle: "Buying property in Bogotá as a foreigner — AVEL Estates",
      seoDescription: "Bogotá for foreign buyers: the northern corridor, long-term tenants and what the market rewards.",
      intro: [
        "Bogotá is the country's economic centre and behaves like one: nine million people, corporate tenants, and a property market driven by long-term leases rather than tourism. If your plan is nightly rental income, this is the wrong city. If your plan is a stable tenant on a one- or two-year contract, indexed annually, this is the most predictable market in Colombia.",
        "The city sits at 2,640 metres. It is cool year-round — roughly 8–19°C — and the altitude is a real consideration for older buyers and anyone with a cardiac or respiratory condition. Buildings are built for cold and damp, not heat: look at insulation, window quality and whether the apartment gets afternoon sun, because a north-facing flat in Bogotá is genuinely colder to live in.",
        "Value concentrates along a narrow northern corridor between the eastern hills and Carrera 15. Rosales and Chicó are the traditional high end, close to the hills, with older but generously sized apartments. Chapinero Alto and Quinta Camacho mix restored houses with new mid-rise and have the best walkability. Parque de la 93 and Usaquén are where most international executives rent, which makes them the safest bet for a lease-driven purchase. Cedritos and Santa Bárbara offer newer stock and more space per peso, further from the office corridor.",
        "The thing that quietly determines quality of life is traffic. Distances that look trivial on a map take forty minutes at 7am, so proximity to a tenant's actual workplace is priced into rent far more than a view is. Before buying, check the building's parking ratio — one space per unit is not guaranteed in older buildings and is a hard constraint for tenants here. Also check the estrato: it drives utility tariffs and property tax, and it is a number every local tenant will ask you for.",
      ],
      zonesHeading: "Zones we cover",
      zones: [
        { name: "Rosales", note: "Traditional high end, against the hills." },
        { name: "Chicó", note: "Large older apartments, embassy district." },
        { name: "Chapinero Alto", note: "Best walkability, restored houses and mid-rise." },
        { name: "Parque de la 93", note: "Where international executives rent." },
        { name: "Usaquén", note: "Colonial core, restaurants, family demand." },
        { name: "Cedritos & Santa Bárbara", note: "Newer stock, more space per peso." },
      ],
      gridHeading: "Properties in Bogotá",
    },
    es: {
      name: "Bogotá",
      region: "Cundinamarca",
      seoTitle: "Comprar propiedad en Bogotá siendo extranjero — AVEL Estates",
      seoDescription: "Bogotá para compradores extranjeros: corredor norte, arriendo largo y qué premia el mercado.",
      intro: [
        "Bogotá es el centro económico del país y se comporta como tal: nueve millones de habitantes, arrendatarios corporativos y un mercado movido por contratos de largo plazo, no por turismo. Si su plan es renta por noches, esta es la ciudad equivocada. Si su plan es un arrendatario estable con contrato a uno o dos años, indexado cada año, este es el mercado más predecible de Colombia.",
        "La ciudad está a 2.640 metros. El clima es frío todo el año —entre 8 y 19°C— y la altura es una consideración real para compradores mayores o con condiciones cardíacas o respiratorias. Los edificios están hechos para frío y humedad, no para calor: revise aislamiento, calidad de ventanas y si el apartamento recibe sol de la tarde, porque un apartamento hacia el norte se vive notablemente más frío.",
        "El valor se concentra en un corredor norte angosto entre los cerros orientales y la Carrera 15. Rosales y Chicó son la gama alta tradicional, cerca de los cerros, con apartamentos antiguos pero amplios. Chapinero Alto y Quinta Camacho mezclan casas restauradas con edificios nuevos de mediana altura y ofrecen la mejor caminabilidad. Parque de la 93 y Usaquén concentran a los ejecutivos internacionales que arriendan, lo que los hace la apuesta más segura para una compra orientada a arriendo. Cedritos y Santa Bárbara ofrecen obra más nueva y más espacio por peso, lejos del corredor de oficinas.",
        "Lo que define la calidad de vida en silencio es el tráfico. Distancias que parecen mínimas en el mapa toman cuarenta minutos a las 7 a. m., así que la cercanía al trabajo del arrendatario pesa en el canon mucho más que una vista. Antes de comprar revise la relación de parqueaderos: un cupo por unidad no está garantizado en edificios antiguos y es una restricción dura aquí. Revise también el estrato: define tarifas de servicios e impuesto predial, y es el primer número que le preguntará cualquier arrendatario local.",
      ],
      zonesHeading: "Zonas que cubrimos",
      zones: [
        { name: "Rosales", note: "Gama alta tradicional, contra los cerros." },
        { name: "Chicó", note: "Apartamentos amplios, zona de embajadas." },
        { name: "Chapinero Alto", note: "Mejor caminabilidad, casas restauradas." },
        { name: "Parque de la 93", note: "Donde arriendan los ejecutivos extranjeros." },
        { name: "Usaquén", note: "Centro colonial, restaurantes, demanda familiar." },
        { name: "Cedritos y Santa Bárbara", note: "Obra nueva, más espacio por peso." },
      ],
      gridHeading: "Propiedades en Bogotá",
    },
  },
  {
    slug: "envigado",
    filterCity: null,
    image: envigadoImg,
    en: {
      name: "Envigado",
      region: "Antioquia",
      seoTitle: "Buying property in Envigado as a foreigner — AVEL Estates",
      seoDescription: "Envigado for foreign buyers: a separate municipality south of Medellín, calmer and with its own rules.",
      intro: [
        "Envigado is not a neighbourhood of Medellín. It is a separate municipality with its own mayor, its own building rules and its own property tax, and that distinction matters more than the ten minutes it takes to drive between them. Decisions about density, licences and short-term rental are taken in Envigado, not in Medellín, so a rule you read about El Poblado may simply not apply here.",
        "Physically it feels like the quieter version of the south of the valley. Streets are narrower and more residential, the parque principal still functions as an actual town square on Sundays, and the population skews towards families and long-term residents rather than short-stay visitors. For a buyer choosing between here and El Poblado, the practical difference is noise, price per square metre and how far you are from a restaurant at 11pm.",
        "The areas worth knowing are few. El Esmeraldal and Zúñiga sit closest to the Poblado border and carry the highest prices, with newer towers and good access to the Avenida Las Vegas corridor. La Magnolia and El Chinguí are flatter and more local. Loma del Escobero climbs east towards the university corridor: larger units, more space, complete dependence on a car. Otraparte and the area around the parque principal are where you get genuine town life, older buildings and the strongest sense that you are living somewhere rather than staying somewhere.",
        "Two points before you buy. First, Envigado has been actively regulating tourist rental in residential buildings; if your model depends on nightly stays, treat approval as something to verify in the building's reglamento and with the municipality, not as an assumption. Second, much of the new supply is on the hillside, where the constraints are access roads, water pressure on upper floors and travel time during peak hours. Visit — or have us walk the route on video — at 7.30am rather than at midday, because that is when the difference shows.",
      ],
      zonesHeading: "Zones we cover",
      zones: [
        { name: "El Esmeraldal", note: "Closest to El Poblado, newer towers, top prices." },
        { name: "Zúñiga", note: "Fast access to Las Vegas corridor." },
        { name: "La Magnolia", note: "Flat, local, residential." },
        { name: "Loma del Escobero", note: "Larger units, car-dependent hillside." },
        { name: "Otraparte", note: "Cultural core near the parque principal." },
        { name: "El Chinguí", note: "Everyday Envigado, lower entry prices." },
      ],
      gridHeading: "Properties in Envigado",
    },
    es: {
      name: "Envigado",
      region: "Antioquia",
      seoTitle: "Comprar propiedad en Envigado | AVEL Estates",
      seoDescription: "Envigado: municipio aparte al sur de Medellín, más tranquilo y con reglas propias de renta.",
      intro: [
        "Envigado no es un barrio de Medellín. Es un municipio aparte, con alcalde propio, normativa urbana propia e impuesto predial propio, y esa diferencia pesa más que los diez minutos que separan a uno del otro. Las decisiones sobre densidad, licencias y renta corta se toman en Envigado, no en Medellín, así que una regla que leyó sobre El Poblado puede sencillamente no aplicar aquí.",
        "En la práctica se siente como la versión tranquila del sur del valle. Las calles son más angostas y residenciales, el parque principal todavía funciona como plaza de pueblo los domingos, y la población es de familias y residentes de largo plazo más que de visitantes de paso. Para quien elige entre esto y El Poblado, la diferencia real es ruido, precio por metro cuadrado y qué tan lejos queda un restaurante a las 11 de la noche.",
        "Las zonas relevantes son pocas. El Esmeraldal y Zúñiga están pegados al límite con El Poblado y tienen los precios más altos, con torres nuevas y buen acceso al corredor de Las Vegas. La Magnolia y El Chinguí son más planas y locales. La Loma del Escobero sube hacia el corredor universitario: unidades grandes, más espacio y dependencia total del carro. Otraparte y el entorno del parque principal concentran la vida de pueblo, edificios más antiguos y la sensación clara de estar viviendo en un lugar y no alojándose en él.",
        "Dos puntos antes de comprar. Primero, Envigado viene regulando activamente el alojamiento turístico en edificios residenciales; si su modelo depende de estadías cortas, verifique la autorización en el reglamento del edificio y con el municipio, no la asuma. Segundo, buena parte de la oferta nueva está en ladera, donde las restricciones son las vías de acceso, la presión de agua en pisos altos y el tiempo de desplazamiento en hora pico. Visite —o pídanos recorrer la ruta en video— a las 7:30 a. m. y no al mediodía: ahí se nota la diferencia.",
      ],
      zonesHeading: "Zonas que cubrimos",
      zones: [
        { name: "El Esmeraldal", note: "Pegado a El Poblado, torres nuevas, precio alto." },
        { name: "Zúñiga", note: "Acceso rápido al corredor de Las Vegas." },
        { name: "La Magnolia", note: "Plano, local, residencial." },
        { name: "Loma del Escobero", note: "Unidades grandes en ladera, requiere carro." },
        { name: "Otraparte", note: "Núcleo cultural junto al parque principal." },
        { name: "El Chinguí", note: "Envigado cotidiano, entrada más baja." },
      ],
      gridHeading: "Propiedades en Envigado",
    },
  },
  {
    slug: "rionegro",
    filterCity: null,
    image: rionegroImg,
    en: {
      name: "Rionegro",
      region: "Antioquia",
      seoTitle: "Buying property in Rionegro and Llanogrande — AVEL Estates",
      seoDescription: "Rionegro and Llanogrande: country houses, lots and condominiums near Medellín's airport.",
      intro: [
        "Rionegro sits forty-five minutes east of Medellín on the high plateau, at around 2,100 metres, and it is where the valley goes when it wants space. This is the country market: houses on plots, gated condominium communities, and serviced lots sold for self-build. The international airport is here, which means a buyer landing from Miami or Madrid is already in Rionegro before they are in Medellín — a fact that has driven a decade of construction along the airport corridor.",
        "The climate is cooler than Medellín and greener, with real rain. Mornings are misty, afternoons are bright, and gardens grow without effort. The trade-off is distance. Everything is a drive: the school, the supermarket, the restaurant. Households here typically run two cars, and the road into Medellín via Las Palmas or the tunnel is fast outside peak hours and slow inside them.",
        "Llanogrande is the established high-end corridor — large plots, mature condominiums, private schools and the clubs. San Antonio de Pereira is a small town centre with a genuine main square and a food culture of its own. The urban core of Rionegro itself is a working Colombian town with apartments at a fraction of Poblado prices, and it is where long-term rental demand actually lives. El Tablazo and the airport perimeter are where newer, lower-priced projects are concentrated.",
        "If you buy land here, three checks are not optional. Confirm the plot's permitted use and the minimum subdivision size under the municipality's Plan de Ordenamiento Territorial — plateau land is heavily regulated and not every hectare can be built on. Confirm water: many plots depend on a private aqueduct or a well, and the right to connect is a document, not a courtesy. And confirm access is a registered road or an easement recorded on the title, not a track the neighbour has always allowed. All three appear in writing or they do not exist.",
      ],
      zonesHeading: "Zones we cover",
      zones: [
        { name: "Llanogrande", note: "Established high end, large plots, clubs." },
        { name: "San Antonio de Pereira", note: "Small-town centre, food culture." },
        { name: "Rionegro urban core", note: "Apartments, real long-term rental demand." },
        { name: "El Tablazo", note: "Newer, lower-priced projects." },
        { name: "Airport corridor", note: "Condominiums with fast airport access." },
        { name: "Vía Las Palmas", note: "Route back to Medellín, view lots." },
      ],
      gridHeading: "Properties in Rionegro",
    },
    es: {
      name: "Rionegro",
      region: "Antioquia",
      seoTitle: "Comprar propiedad en Rionegro y Llanogrande — AVEL Estates",
      seoDescription: "Rionegro y Llanogrande: casas campestres, lotes y condominios cerca del aeropuerto.",
      intro: [
        "Rionegro queda cuarenta y cinco minutos al oriente de Medellín, en el altiplano, a unos 2.100 metros, y es a donde va el valle cuando quiere espacio. Este es el mercado campestre: casas con lote, condominios cerrados y lotes urbanizados para construir. El aeropuerto internacional está aquí, así que un comprador que aterriza desde Miami o Madrid ya está en Rionegro antes de estar en Medellín, un hecho que impulsó una década de construcción sobre el corredor del aeropuerto.",
        "El clima es más frío y más verde que el de Medellín, con lluvia de verdad. Las mañanas son de neblina, las tardes despejadas y los jardines crecen solos. El costo es la distancia: todo implica manejar —el colegio, el supermercado, el restaurante—. Los hogares suelen tener dos carros, y la vía a Medellín por Las Palmas o por el túnel es rápida fuera de hora pico y lenta dentro de ella.",
        "Llanogrande es el corredor alto consolidado: lotes grandes, condominios maduros, colegios privados y clubes. San Antonio de Pereira es un centro de pueblo con plaza real y cultura gastronómica propia. El casco urbano de Rionegro es una ciudad colombiana funcional con apartamentos a una fracción de los precios de El Poblado, y ahí vive la demanda real de arriendo largo. El Tablazo y el perímetro del aeropuerto concentran los proyectos nuevos de menor precio.",
        "Si compra lote, tres verificaciones no son opcionales. Confirme el uso permitido y el área mínima de subdivisión según el Plan de Ordenamiento Territorial del municipio: el altiplano está muy regulado y no toda hectárea es construible. Confirme el agua: muchos predios dependen de un acueducto veredal o de un pozo, y el derecho de conexión es un documento, no un favor. Y confirme que el acceso es vía registrada o servidumbre inscrita en el folio, no un camino que el vecino siempre ha permitido. Los tres constan por escrito o no existen.",
      ],
      zonesHeading: "Zonas que cubrimos",
      zones: [
        { name: "Llanogrande", note: "Gama alta consolidada, lotes grandes, clubes." },
        { name: "San Antonio de Pereira", note: "Centro de pueblo, cultura gastronómica." },
        { name: "Casco urbano de Rionegro", note: "Apartamentos y arriendo largo real." },
        { name: "El Tablazo", note: "Proyectos nuevos de menor precio." },
        { name: "Corredor del aeropuerto", note: "Condominios con acceso rápido al JMC." },
        { name: "Vía Las Palmas", note: "Ruta a Medellín, lotes con vista." },
      ],
      gridHeading: "Propiedades en Rionegro",
    },
  },
];

export const cityBySlug = (slug: string) => CITIES.find((c) => c.slug === slug);
