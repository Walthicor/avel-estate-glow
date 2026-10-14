import { createFileRoute } from "@tanstack/react-router";

import { ArqLanding } from "../../components/arquitectura/ArqLanding";
import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { FAQS } from "../../content/arquitectura";
import { faqJsonLd } from "../../lib/faq-jsonld";

const TITLE = "Diseño arquitectónico y construcción | AVEL Arquitectura";
const DESCRIPTION =
  "Diseño arquitectónico, ingenierías, licencia en curaduría, presupuesto exacto y cronograma de obra en Popayán, Cali, Eje Cafetero y Medellín. Cotiza gratis.";

export const Route = createFileRoute("/es/arquitectura")({
  head: () => {
    const base = seoHead({ locale: "es", path: "/architecture", title: TITLE, description: DESCRIPTION });
    const url = `${SITE.url}/es/arquitectura`;
    return {
      meta: base.meta,
      // Página solo en español: sin versiones alternas en inglés.
      links: [
        { rel: "canonical", href: url },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,800&family=Instrument+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap",
        },
      ],
      scripts: [
        faqJsonLd(FAQS),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "AVEL Arquitectura",
            url,
            email: SITE.publicEmail,
            parentOrganization: { "@type": "Organization", name: SITE.name, url: SITE.url },
            areaServed: ["Popayán", "Cali", "Eje Cafetero", "Medellín"].map((name) => ({ "@type": "Place", name })),
            serviceType: ["Diseño arquitectónico", "Diseño estructural", "Diseño eléctrico RETIE", "Diseño hidrosanitario", "Presupuesto de obra", "Cronograma de obra"],
          }),
        },
      ],
    };
  },
  component: ArqLanding,
});
