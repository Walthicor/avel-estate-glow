import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "../../components/pages/LegalPage";
import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { LEGAL, LEGAL_PATHS } from "../../content/legal";

const doc = LEGAL.es.docs["cookies"];

export const Route = createFileRoute("/es/legal/cookies")({
  head: () =>
    seoHead({
      locale: "es",
      path: LEGAL_PATHS["cookies"],
      title: `${doc.seoTitle} | ${SITE.name}`,
      description: doc.seoDescription,
      type: "article",
    }),
  component: () => <LegalPage slug="cookies" />,
});
