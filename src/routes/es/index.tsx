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
      title: `Inmobiliaria de lujo en Colombia | ${SITE.name}`,
      description:
        "Propiedad de lujo en Medellín, Cartagena, Santa Marta, Bogotá, Cali, Popayán y el Eje Cafetero: gestión para compradores remotos.",
    }),
    scripts: [organizationJsonLd("es")],
  }),
  component: HomePage,
});
