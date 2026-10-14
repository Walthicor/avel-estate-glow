import { createFileRoute } from "@tanstack/react-router";

import { QuotePage } from "../components/quote/QuotePage";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { QUOTE } from "../content/quote";

const copy = QUOTE.en;

export const Route = createFileRoute("/quote")({
  head: () =>
    seoHead({
      locale: "en",
      path: "/quote",
      title: `${copy.seoTitle} | ${SITE.name}`,
      description: copy.seoDescription,
    }),
  component: QuotePage,
});
