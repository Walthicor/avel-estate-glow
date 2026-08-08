import { createFileRoute } from "@tanstack/react-router";

import { organizationJsonLd } from "../lib/structured-data";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { HomePage } from "../components/home/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seoHead({
      locale: "en",
      path: "/",
      title: `${SITE.name} — Buy Property in Colombia from Abroad`,
      description:
        "Luxury homes and investment property in Medellín, Cartagena, Santa Marta and Bogotá — title verification, funding and management handled for remote buyers.",
    }),
    scripts: [organizationJsonLd("en")],
  }),
  component: HomePage,
});
