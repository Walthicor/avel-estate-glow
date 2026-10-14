import { seoHead } from "../components/Seo";
import { SITE, type Locale } from "../config/site";
import { DEVELOPERS } from "../content/developers";

export function developersHead(locale: Locale, image: string | null | undefined) {
  const c = DEVELOPERS[locale];
  const base = seoHead({
    locale,
    path: "/developers",
    title: c.seoTitle,
    description: c.seoDescription,
    ...(image ? { image } : {}),
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AVEL Arquitectura — Desarrolladores",
    description: c.seoDescription,
    url: `${SITE.url}${locale === "es" ? "/es/desarrolladores" : "/developers"}`,
    ...(image ? { image } : {}),
    areaServed: { "@type": "Country", name: "Colombia" },
    serviceType: c.deliverables.map((d) => d.title),
    parentOrganization: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
  return { ...base, scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
}
