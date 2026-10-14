/**
 * Unique photo library: one cover per property (file named after the
 * property, SEO-friendly), interior sets per property type, and covers for
 * cities, collections and blog posts. All files are WebP, 100–200 KB.
 */
const FILES = import.meta.glob("../assets/fotos/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byName = (name: string): string => {
  const src = FILES[`../assets/fotos/${name}.webp`];
  if (!src) throw new Error(`Missing photo: ${name}`);
  return src;
};

/** Legacy slugs whose accented letters were dropped → clean file names. */
const SLUG_ALIAS: Record<string, string> = {
  "-tica-bogota": "casa-optica-bogota",
  "bah-a-blanca-bogota": "casa-bahia-blanca-bogota",
  "casa-ndigo-cartagena": "casa-indigo-cartagena",
  "mirador-del-r-o-bogota": "casa-mirador-del-rio-bogota",
  "n-mada-medellin": "nomada-medellin",
  "r-o-claro-cartagena": "rio-claro-cartagena",
  "vista-bah-a-santa-marta": "vista-bahia-santa-marta",
};

export const propertyCover = (slug: string): string => byName(SLUG_ALIAS[slug] ?? slug);

export const interiorsFor = (type: string): string[] => {
  const t = ["apartment", "aparthotel", "house", "penthouse"].includes(type) ? type : "apartment";
  return [1, 2, 3].map((i) => byName(`int-${t}-${i}`));
};

export const CITY_PHOTOS = {
  medellin: byName("medellin-colombia-bienes-raices"),
  cartagena: byName("cartagena-ciudad-amurallada-bienes-raices"),
  santaMarta: byName("santa-marta-bahia-sierra-nevada"),
  bogota: byName("bogota-skyline-monserrate"),
  envigado: byName("envigado-barrio-residencial"),
  rionegro: byName("rionegro-llanogrande-casa-campestre"),
};

export const COLLECTION_PHOTOS = {
  str: byName("apartamento-renta-corta-medellin"),
  pre: byName("torre-en-construccion-sobre-planos"),
  poblado: byName("calle-el-poblado-medellin"),
  beach: byName("villas-frente-al-mar-caribe-colombia"),
  ready: byName("apartamento-listo-para-entregar"),
  land: byName("lote-campestre-antioquia"),
};

export const BLOG_PHOTOS: Record<string, string> = {
  "can-a-foreigner-buy-property-in-colombia": byName("extranjero-comprar-propiedad-colombia"),
  "getting-rental-income-out-of-colombia": byName("sacar-rentas-colombia-divisas"),
  "fiducia-explained-pre-construction": byName("fiducia-proyecto-sobre-planos"),
  "poblado-vs-envigado-vs-laureles": byName("barrio-laureles-medellin"),
  "short-term-rental-rules-medellin": byName("renta-corta-medellin-normas"),
  "seven-documents-before-you-sign": byName("documentos-compra-inmueble-colombia"),
};
