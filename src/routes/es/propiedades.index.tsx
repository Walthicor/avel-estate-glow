import { createFileRoute } from "@tanstack/react-router";

import { PropertiesPage } from "../../components/properties/PropertiesPage";
import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { PROPERTIES_COPY } from "../../content/properties-page";
import { validatePropertySearch } from "../../lib/property-search";

export const Route = createFileRoute("/es/propiedades/")({
  validateSearch: validatePropertySearch,
  head: () =>
    seoHead({
      locale: "es",
      path: "/properties",
      title: `${PROPERTIES_COPY.es.title} | ${SITE.name}`,
      description: PROPERTIES_COPY.es.description,
    }),
  component: PropiedadesRoute,
});

function PropiedadesRoute() {
  const search = Route.useSearch();
  return <PropertiesPage search={search} />;
}
