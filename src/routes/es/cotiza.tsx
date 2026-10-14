import { createFileRoute } from "@tanstack/react-router";

import { QuotePage } from "../../components/quote/QuotePage";
import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { QUOTE } from "../../content/quote";

const copy = QUOTE.es;

export const Route = createFileRoute("/es/cotiza")({
  head: () =>
    seoHead({
      locale: "es",
      path: "/quote",
      title: `${copy.seoTitle} | ${SITE.name}`,
      description: copy.seoDescription,
    }),
  component: QuotePage,
});
