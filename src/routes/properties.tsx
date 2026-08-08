import { createFileRoute } from "@tanstack/react-router";

import { PropertiesPage } from "../components/properties/PropertiesPage";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { PROPERTIES_COPY } from "../content/properties-page";
import { validatePropertySearch } from "../lib/property-search";

export const Route = createFileRoute("/properties")({
  validateSearch: validatePropertySearch,
  head: () =>
    seoHead({
      locale: "en",
      path: "/properties",
      title: `${PROPERTIES_COPY.en.title} | ${SITE.name}`,
      description: PROPERTIES_COPY.en.description,
    }),
  component: PropertiesRoute,
});

function PropertiesRoute() {
  const search = Route.useSearch();
  return <PropertiesPage search={search} />;
}
