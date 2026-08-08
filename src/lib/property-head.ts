import { seoHead } from "../components/Seo";
import { SITE, type Locale } from "../config/site";
import { areaLabel } from "../content/properties";
import { DETAIL_COPY, descriptionFor, getPropertyDetail } from "../content/property-detail";

/** Head descriptors (SEO meta + RealEstateListing JSON-LD) for a property page. */
export function propertyHead(slug: string, locale: Locale) {
  const detail = getPropertyDetail(slug);
  if (!detail) {
    return { meta: [{ title: SITE.name }, { name: "robots", content: "noindex" }] };
  }
  const p = detail.record;
  const copy = DETAIL_COPY[locale];
  const { title, description } = copy.meta(p);
  const image = `${SITE.url}${detail.heroImage}`;

  const base = seoHead({
    locale,
    path: `/properties/${slug}`,
    title: `${title} | ${SITE.name}`,
    description,
    image,
    type: "article",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.titleEn,
    description: descriptionFor(detail, locale)[0],
    image: [image],
    url: `${SITE.url}${locale === "es" ? `/es/propiedades/${slug}` : `/properties/${slug}`}`,
    floorSize: {
      "@type": "QuantitativeValue",
      minValue: p.areaMin,
      maxValue: p.areaMax,
      unitCode: "MTK",
      name: areaLabel(p),
    },
    numberOfRooms: {
      "@type": "QuantitativeValue",
      minValue: p.bedroomsMin,
      maxValue: p.bedroomsMax,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: p.cityLabel,
      addressRegion: p.zone,
      addressCountry: "CO",
    },
    // No offers block: this listing is price on request.
  };

  return {
    ...base,
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}
