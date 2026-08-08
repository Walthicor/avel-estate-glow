import { createFileRoute, notFound } from "@tanstack/react-router";

import { CityPage } from "../../components/pages/CityPage";
import { seoHead } from "../../components/Seo";
import { cityBySlug } from "../../content/cities";

export const Route = createFileRoute("/es/ciudades/$slug")({
  loader: ({ params }) => {
    if (!cityBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const city = cityBySlug(params.slug);
    if (!city) return { meta: [{ title: "No encontrado" }, { name: "robots", content: "noindex" }] };
    return seoHead({
      locale: "es",
      path: `/cities/${city.slug}`,
      title: city.es.seoTitle,
      description: city.es.seoDescription,
    });
  },
  component: CiudadRoute,
});

function CiudadRoute() {
  const { slug } = Route.useParams();
  return <CityPage slug={slug} />;
}
