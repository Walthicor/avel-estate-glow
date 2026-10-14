import { seoHead } from "../components/Seo";
import { SITE, type Locale } from "../config/site";
import type { Project } from "./projects";
import { projectPath, PROJECT_COPY } from "./projects";

/** SEO meta + CreativeWork JSON-LD for a project page. */
export function projectHead(project: Project | undefined, slug: string, locale: Locale) {
  if (!project) {
    return { meta: [{ title: "AVEL Arquitectura" }, { name: "robots", content: "noindex" }] };
  }
  const title = `${project.name} en ${project.city} | AVEL Arquitectura`;
  const image = project.main_photo ?? undefined;
  const base = seoHead({
    locale,
    path: `/architecture/projects/${slug}`,
    title: locale === "en" ? `${project.name} in ${project.city} | AVEL Arquitectura` : title,
    description: project.tagline || project.description,
    image,
    type: "article",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.tagline,
    description: project.description,
    image: [project.main_photo, ...project.gallery].filter(Boolean),
    url: `${SITE.url}${projectPath(slug, locale)}`,
    dateCreated: project.year ? String(project.year) : undefined,
    genre: project.type,
    inLanguage: locale === "es" ? "es-CO" : "en",
    creator: { "@type": "Organization", name: "AVEL Arquitectura", url: SITE.url },
    locationCreated: {
      "@type": "Place",
      name: project.city,
      address: { "@type": "PostalAddress", addressLocality: project.city, addressRegion: project.department, addressCountry: "CO" },
      ...(project.lat != null && project.lng != null
        ? { geo: { "@type": "GeoCoordinates", latitude: project.lat, longitude: project.lng } }
        : {}),
    },
  };
  return {
    ...base,
    scripts: [...((base as { scripts?: unknown[] }).scripts ?? []), { type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}

export function projectsIndexHead(locale: Locale) {
  const c = PROJECT_COPY[locale];
  return seoHead({
    locale,
    path: "/architecture/projects",
    title: `${c.listTitle} | AVEL Arquitectura`,
    description: c.listIntro,
  });
}
