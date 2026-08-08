import { createFileRoute } from "@tanstack/react-router";

import { GuidesIndexPage } from "../../components/pages/GuidesIndexPage";
import { seoHead } from "../../components/Seo";
import { GUIDES_INDEX } from "../../content/guides";

export const Route = createFileRoute("/es/guias/")({
  head: () =>
    seoHead({
      locale: "es",
      path: "/guides",
      title: GUIDES_INDEX.es.title,
      description: GUIDES_INDEX.es.description,
    }),
  component: GuidesIndexPage,
});
