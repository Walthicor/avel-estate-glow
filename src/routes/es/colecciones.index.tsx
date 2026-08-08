import { createFileRoute } from "@tanstack/react-router";

import { CollectionsIndexPage } from "../../components/pages/CollectionPage";
import { seoHead } from "../../components/Seo";
import { COLLECTIONS_INDEX } from "../../content/collections";

export const Route = createFileRoute("/es/colecciones/")({
  head: () =>
    seoHead({
      locale: "es",
      path: "/collections",
      title: COLLECTIONS_INDEX.es.title,
      description: COLLECTIONS_INDEX.es.description,
    }),
  component: CollectionsIndexPage,
});
