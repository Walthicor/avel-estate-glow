import { SITE, type Locale } from "../config/site";
import { pathForLocale } from "../i18n/routes";
import logo from "../assets/avel-logo-full.png.asset.json";

/** Organization JSON-LD for the homepage. */
export function organizationJsonLd(locale: Locale) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      legalName: "AVEL Inmobiliaria S.A.S.",
      url: `${SITE.url}${pathForLocale("/", locale)}`,
      logo: `${SITE.url}${logo.url}`,
      description:
        locale === "es"
          ? "Agencia inmobiliaria colombiana para compradores que no están en Colombia."
          : "Colombian real estate agency built for buyers who are not in Colombia.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE.publicEmail,
          availableLanguage: ["en", "es"],
          areaServed: "Worldwide",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "Colombia" },
        { "@type": "City", name: "Medellín" },
        { "@type": "City", name: "Cartagena" },
        { "@type": "City", name: "Bogotá" },
        { "@type": "City", name: "Santa Marta" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Medellín",
        addressRegion: "Antioquia",
        addressCountry: "CO",
      },
      sameAs: [
        `https://www.instagram.com/${SITE.domain.split(".")[0]}`,
        `https://www.linkedin.com/company/${SITE.domain.split(".")[0]}`,
        `https://www.youtube.com/@${SITE.domain.split(".")[0]}`,
      ],
    }),
  };
}

/** BreadcrumbList JSON-LD from canonical EN paths plus localized labels. */
export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${SITE.url}${pathForLocale(crumb.path, locale)}`,
      })),
    }),
  };
}
