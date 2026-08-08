import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "../components/pages/ContactPage";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { CONTACT } from "../content/contact";

const copy = CONTACT.en;

export const Route = createFileRoute("/contact")({
  head: () =>
    seoHead({
      locale: "en",
      path: "/contact",
      title: `${copy.seoTitle} | ${SITE.name}`,
      description: copy.seoDescription,
    }),
  component: ContactPage,
});
