import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "../components/pages/LegalPage";
import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { LEGAL, LEGAL_PATHS } from "../content/legal";

const doc = LEGAL.en.docs["habeas-data"];

export const Route = createFileRoute("/legal/habeas-data")({
  head: () =>
    seoHead({
      locale: "en",
      path: LEGAL_PATHS["habeas-data"],
      title: `${doc.seoTitle} | ${SITE.name}`,
      description: doc.seoDescription,
      type: "article",
    }),
  component: () => <LegalPage slug="habeas-data" />,
});
