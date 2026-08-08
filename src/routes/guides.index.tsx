import { createFileRoute } from "@tanstack/react-router";

import { GuidesIndexPage } from "../components/pages/GuidesIndexPage";
import { seoHead } from "../components/Seo";
import { GUIDES_INDEX } from "../content/guides";

export const Route = createFileRoute("/guides/")({
  head: () =>
    seoHead({
      locale: "en",
      path: "/guides",
      title: GUIDES_INDEX.en.title,
      description: GUIDES_INDEX.en.description,
    }),
  component: GuidesIndexPage,
});
