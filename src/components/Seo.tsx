import { useEffect } from "react";

import { SITE, type Locale } from "../config/site";
import { pathForLocale } from "../i18n/routes";

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

/**
 * Head tag descriptors for a page: title, description, canonical and
 * hreflang alternates (en, es, x-default). Use inside a route's head().
 */
export function seoHead({ title, description, path, locale, image, type = "website", noindex }: SeoProps) {
  const enUrl = `${SITE.url}${pathForLocale(path, "en")}`;
  const esUrl = `${SITE.url}${pathForLocale(path, "es")}`;
  const canonical = locale === "es" ? esUrl : enUrl;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: locale === "es" ? "es_CO" : "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex" });

  const links = [
    { rel: "canonical", href: canonical },
    { rel: "alternate", hreflang: "en", href: enUrl },
    { rel: "alternate", hreflang: "es", href: esUrl },
    { rel: "alternate", hreflang: "x-default", href: enUrl },
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
      if (link["hreflang"]) el.setAttribute("hreflang", link["hreflang"]);
      el.setAttribute("href", link.href);
      document.head.appendChild(el);
    }

    document.documentElement.lang = props.locale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title, props.description, props.path, props.locale, props.image, props.noindex]);

  return null;
}
