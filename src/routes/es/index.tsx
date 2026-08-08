import { createFileRoute } from "@tanstack/react-router";

import { organizationJsonLd } from "../../lib/structured-data";
import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { HomePage } from "../../components/home/HomePage";

export const Route = createFileRoute("/es/")({
  head: () => ({
    ...seoHead({
      locale: "es",
      path: "/",
      title: `${SITE.name} — Compra propiedad en Colombia desde el exterior`,
      description:
        "Vivienda de lujo e inversión en Medellín, Cartagena, Santa Marta y Bogotá: estudio de títulos, fondeo y administración para compradores remotos.",
    }),
    scripts: [organizationJsonLd("es")],
  }),
  component: HomePage,
});
