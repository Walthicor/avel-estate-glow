import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "../components/pages/AboutPage";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { ABOUT } from "../content/about";

const copy = ABOUT.en;

export const Route = createFileRoute("/about")({
  head: () =>
    seoHead({
      locale: "en",
      path: "/about",
      title: `${copy.seoTitle} | ${SITE.name}`,
      description: copy.seoDescription,
    }),
  component: AboutPage,
});
