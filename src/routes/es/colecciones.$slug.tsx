import { createFileRoute, notFound } from "@tanstack/react-router";

import { CollectionPage } from "../../components/pages/CollectionPage";
import { seoHead } from "../../components/Seo";
import { collectionBySlug } from "../../content/collections";

export const Route = createFileRoute("/es/colecciones/$slug")({
  loader: ({ params }) => {
    if (!collectionBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const item = collectionBySlug(params.slug);
    if (!item) return { meta: [{ title: "No encontrado" }, { name: "robots", content: "noindex" }] };
    return seoHead({
      locale: "es",
      path: `/collections/${item.slug}`,
      title: item.es.seoTitle,
      description: item.es.seoDescription,
    });
  },
  component: ColeccionRoute,
});

function ColeccionRoute() {
  const { slug } = Route.useParams();
  return <CollectionPage slug={slug} />;
}
