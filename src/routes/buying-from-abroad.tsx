import { createFileRoute } from "@tanstack/react-router";

import { BuyingAbroadPage } from "../components/pages/BuyingAbroadPage";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { BUYING_ABROAD } from "../content/buying-abroad";
import { faqJsonLd } from "../lib/faq-jsonld";

const copy = BUYING_ABROAD.en;

export const Route = createFileRoute("/buying-from-abroad")({
  head: () => {
    const head = seoHead({
      locale: "en",
      path: "/buying-from-abroad",
      title: `${copy.seoTitle} | ${SITE.name}`,
      description: copy.seoDescription,
      type: "article",
    });
    return { ...head, scripts: [faqJsonLd(copy.faqs)] };
  },
  component: BuyingAbroadPage,
});
