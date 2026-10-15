import { createFileRoute } from "@tanstack/react-router";

import { ArqLanding } from "../../components/arquitectura/ArqLanding";
import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { ARQ_IMAGES, FAQS, srcSetFor } from "../../content/arquitectura";
import { faqJsonLd } from "../../lib/faq-jsonld";

const TITLE = "Diseño Arquitectónico, Licencias y Construcción | AVEL Arquitectura";
const DESCRIPTION =
  "Diseño arquitectónico, estructural, eléctrico RETIE e hidrosanitario, licencia en curaduría y presupuesto exacto. Calcula tu proyecto gratis.";

export const Route = createFileRoute("/es/arquitectura")({
  validateSearch: (search: Record<string, unknown>): { servicio?: string } =>
    typeof search["servicio"] === "string" ? { servicio: search["servicio"].slice(0, 40) } : {},
  head: () => {
    const url = `${SITE.url}/es/arquitectura`;
    const image = `${SITE.url}${ARQ_IMAGES.hero}`;
    // El título completo supera el recorte general de 60 caracteres: aquí se usa tal cual.
    const meta = seoHead({ locale: "es", path: "/architecture", title: TITLE, description: DESCRIPTION, image })
      .meta.filter((m) => !("title" in m) && m["name"] !== "description" && m["property"] !== "og:title" && m["property"] !== "og:description" && m["property"] !== "og:url" && m["property"] !== "og:image:alt");
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:url", content: url },
        { property: "og:image:alt", content: "Casa Rengifo en Popayán, obra entregada por AVEL Arquitectura" },
        ...meta,
      ],
      // Página solo en español: sin versiones alternas en inglés.
      links: [
        { rel: "canonical", href: url },
        { rel: "preload", as: "image", href: ARQ_IMAGES.hero, imageSrcSet: srcSetFor(ARQ_IMAGES.hero), imageSizes: "100vw", fetchPriority: "high" },
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
