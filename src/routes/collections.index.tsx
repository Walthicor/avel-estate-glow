import { createFileRoute } from "@tanstack/react-router";

import { CollectionsIndexPage } from "../components/pages/CollectionPage";
import { seoHead } from "../components/Seo";
import { COLLECTIONS_INDEX } from "../content/collections";

export const Route = createFileRoute("/collections/")({
  head: () =>
    seoHead({
      locale: "en",
      path: "/collections",
      title: COLLECTIONS_INDEX.en.title,
      description: COLLECTIONS_INDEX.en.description,
    }),
  component: CollectionsIndexPage,
});
