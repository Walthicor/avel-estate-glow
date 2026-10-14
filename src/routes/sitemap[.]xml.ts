import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE } from "../config/site";
import { PROPERTIES } from "../content/properties";
import { CITIES } from "../content/cities";
import { COLLECTIONS } from "../content/collections";
import { GUIDES } from "../content/guides";
import { LEGAL_PATHS } from "../content/legal";
import { pathForLocale } from "../i18n/routes";

type Entry = {
  /** Canonical EN path; the ES URL is derived from it. */
  path: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
};

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildEntries(): Entry[] {
  const staticPages: Entry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/properties", changefreq: "daily", priority: "0.9" },
    { path: "/buying-from-abroad", changefreq: "monthly", priority: "0.9" },
    { path: "/quote", changefreq: "monthly", priority: "0.9" },
    { path: "/developers", changefreq: "monthly", priority: "0.8" },
    { path: "/about", changefreq: "yearly", priority: "0.5" },
    { path: "/collections", changefreq: "weekly", priority: "0.7" },
    { path: "/guides", changefreq: "weekly", priority: "0.7" },
    { path: LEGAL_PATHS.privacy, changefreq: "yearly", priority: "0.2" },
    { path: LEGAL_PATHS.terms, changefreq: "yearly", priority: "0.2" },
    { path: LEGAL_PATHS.cookies, changefreq: "yearly", priority: "0.2" },
    { path: LEGAL_PATHS["habeas-data"], changefreq: "yearly", priority: "0.2" },
  ];

  // One entry per published listing; mirrors the /properties/$slug loader source.
  const properties: Entry[] = PROPERTIES.map((p) => ({
    path: `/properties/${p.slug}`,
    changefreq: "weekly" as const,
    priority: "0.8",
  }));

  const cities: Entry[] = CITIES.map((c) => ({
    path: `/cities/${c.slug}`,
    changefreq: "weekly" as const,
    priority: "0.8",
  }));

  const collections: Entry[] = COLLECTIONS.map((c) => ({
    path: `/collections/${c.slug}`,
    changefreq: "weekly" as const,
    priority: "0.7",
  }));

  const guides: Entry[] = GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  }));

  return [...staticPages, ...cities, ...collections, ...guides, ...properties];
}

/** Each URL is emitted once per locale, each carrying both hreflang alternates. */
function urlBlock(entry: Entry, locale: "en" | "es") {
  const enUrl = escapeXml(`${SITE.url}${pathForLocale(entry.path, "en")}`);
  const esUrl = escapeXml(`${SITE.url}${pathForLocale(entry.path, "es")}`);
  const loc = locale === "es" ? esUrl : enUrl;

  return [
    `  <url>`,
    `    <loc>${loc}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
    entry.priority ? `    <priority>${entry.priority}</priority>` : null,
    `  </url>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = buildEntries();
        const urls = entries.flatMap((entry) => [urlBlock(entry, "en"), urlBlock(entry, "es")]);

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
