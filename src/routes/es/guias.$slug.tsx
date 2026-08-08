import { createFileRoute, notFound } from "@tanstack/react-router";

import { GuideArticlePage } from "../../components/pages/GuideArticlePage";
import { seoHead } from "../../components/Seo";
import { guideBySlug } from "../../content/guides";
import { articleJsonLd } from "../../lib/structured-data";

export const Route = createFileRoute("/es/guias/$slug")({
  loader: ({ params }) => {
    if (!guideBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const guide = guideBySlug(params.slug);
    if (!guide) return { meta: [{ title: "No encontrado" }, { name: "robots", content: "noindex" }] };
    return {
      ...seoHead({
        locale: "es",
        path: `/guides/${guide.slug}`,
        title: guide.es.seoTitle,
        description: guide.es.seoDescription,
        type: "article",
      }),
      scripts: [articleJsonLd(guide, "es")],
    };
  },
  component: GuiaRoute,
});

function GuiaRoute() {
  const { slug } = Route.useParams();
  return <GuideArticlePage slug={slug} />;
}
