import { useEffect } from "react";

import { SITE, type Locale } from "../config/site";
import { pathForLocale } from "../i18n/routes";
import logo from "../assets/avel-logo-full.png.asset.json";

export type SeoProps = {
  title: string;
  description: string;
  /** Canonical EN path, e.g. '/properties'. Alternates are derived from it. */
  path: string;
  locale: Locale;
  image?: string;
  type?: string;
  noindex?: boolean;
};

/** Absolute social preview image — the AVEL logo unless a page supplies its own. */
export const SOCIAL_IMAGE = `${SITE.url}${logo.url}`;

/** Trim to a hard character budget on a word boundary, no ellipsis padding. */
export function clamp(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.·—–-]+$/, "");
}

/** SEO budgets: titles 60 chars, descriptions 110 chars. */
export const seoTitle = (t: string) => clamp(t, 60);
export const seoDescription = (d: string) => clamp(d, 110);

/**
 * Head tag descriptors for a page: title, description, canonical and
 * hreflang alternates (en, es, x-default). Use inside a route's head().
 */
export function seoHead({ title, description, path, locale, image, type = "website", noindex }: SeoProps) {
  const enUrl = `${SITE.url}${pathForLocale(path, "en")}`;
  const esUrl = `${SITE.url}${pathForLocale(path, "es")}`;
  const canonical = locale === "es" ? esUrl : enUrl;

  const t = seoTitle(title);
  const d = seoDescription(description);
  const socialImage = image ?? SOCIAL_IMAGE;

  const meta: Array<Record<string, string>> = [
    { title: t },
    { name: "description", content: d },
    { property: "og:title", content: t },
    { property: "og:description", content: d },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: locale === "es" ? "es_CO" : "en_US" },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:image", content: socialImage },
    { property: "og:image:alt", content: `${SITE.name} — Colombian luxury real estate` },
    { name: "twitter:image", content: socialImage },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex" });

  const links = [
    { rel: "canonical", href: canonical },
    { rel: "alternate", hrefLang: "en", href: enUrl },
    { rel: "alternate", hrefLang: "es", href: esUrl },
    { rel: "alternate", hrefLang: "x-default", href: enUrl },
  ];

  return { meta, links };
}


/**
 * Client-side <Seo /> for pages that compute metadata from runtime data.
 * Prefer seoHead() in the route's head() for SSR-visible tags; this keeps
 * the DOM in sync afterwards.
 */
export function Seo(props: SeoProps) {
  const { meta, links } = seoHead(props);

  useEffect(() => {
    document.title = props.title;

    for (const entry of meta) {
      if (entry["title"]) continue;
      const attr = entry["name"] ? "name" : "property";
      const key = entry["name"] ?? entry["property"];
      if (!key) continue;
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", entry["content"] ?? "");
    }

    document.head
      .querySelectorAll('link[rel="canonical"],link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());

    for (const link of links) {
      const el = document.createElement("link");
      el.setAttribute("rel", link.rel);
      if (link["hrefLang"]) el.setAttribute("hreflang", link["hrefLang"]);
      el.setAttribute("href", link.href);
      document.head.appendChild(el);
    }

    document.documentElement.lang = props.locale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title, props.description, props.path, props.locale, props.image, props.noindex]);

  return null;
}
