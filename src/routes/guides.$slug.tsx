import { createFileRoute, notFound } from "@tanstack/react-router";

import { GuideArticlePage } from "../components/pages/GuideArticlePage";
import { seoHead } from "../components/Seo";
import { guideBySlug } from "../content/guides";
import { articleJsonLd } from "../lib/structured-data";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    if (!guideBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const guide = guideBySlug(params.slug);
    if (!guide) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return {
      ...seoHead({
        locale: "en",
        path: `/guides/${guide.slug}`,
        title: guide.en.seoTitle,
        description: guide.en.seoDescription,
        type: "article",
      }),
      scripts: [articleJsonLd(guide, "en")],
    };
  },
  component: GuideRoute,
});

function GuideRoute() {
  const { slug } = Route.useParams();
  return <GuideArticlePage slug={slug} />;
}
