import { createFileRoute, notFound } from "@tanstack/react-router";

import { CollectionPage } from "../components/pages/CollectionPage";
import { seoHead } from "../components/Seo";
import { collectionBySlug } from "../content/collections";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    if (!collectionBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const item = collectionBySlug(params.slug);
    if (!item) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return seoHead({
      locale: "en",
      path: `/collections/${item.slug}`,
      title: item.en.seoTitle,
      description: item.en.seoDescription,
    });
  },
  component: CollectionRoute,
});

function CollectionRoute() {
  const { slug } = Route.useParams();
  return <CollectionPage slug={slug} />;
}
