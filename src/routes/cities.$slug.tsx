import { createFileRoute, notFound } from "@tanstack/react-router";

import { CityPage } from "../components/pages/CityPage";
import { seoHead } from "../components/Seo";
import { cityBySlug } from "../content/cities";

export const Route = createFileRoute("/cities/$slug")({
  loader: ({ params }) => {
    if (!cityBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const city = cityBySlug(params.slug);
    if (!city) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return seoHead({
      locale: "en",
      path: `/cities/${city.slug}`,
      title: city.en.seoTitle,
      description: city.en.seoDescription,
    });
  },
  component: CityRoute,
});

function CityRoute() {
  const { slug } = Route.useParams();
  return <CityPage slug={slug} />;
}
