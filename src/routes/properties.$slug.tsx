import { createFileRoute, notFound } from "@tanstack/react-router";

import { PropertyDetailPage } from "../components/properties/PropertyDetailPage";
import { propertyHead } from "../lib/property-head";
import { getPropertyDetail } from "../content/property-detail";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const detail = getPropertyDetail(params.slug);
    if (!detail) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => propertyHead(params.slug, "en"),
  component: PropertyRoute,
});

function PropertyRoute() {
  const { slug } = Route.useLoaderData();
  const detail = getPropertyDetail(slug)!;
  return <PropertyDetailPage detail={detail} />;
}
