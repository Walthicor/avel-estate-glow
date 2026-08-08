import { createFileRoute } from "@tanstack/react-router";

import { seoHead } from "../components/Seo";
import { SITE } from "../config/site";
import { useLocale } from "../i18n/LocaleProvider";

export const Route = createFileRoute("/")({
  head: () =>
    seoHead({
      locale: "en",
      path: "/",
      title: `${SITE.name} — Luxury Colombian Real Estate`,
      description:
        "Curated luxury homes and investment property in Colombia for international buyers.",
    }),
  component: Index,
});

function Index() {
  const { t, localePath } = useLocale();

  return (
    <section className="min-h-screen bg-background px-6 pt-[140px] pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-5xl text-bone">{SITE.name}</h1>
        <p className="mt-4 text-sage">{t("footer.tagline")}</p>
        <nav className="mt-10 flex flex-wrap gap-4 text-sm">
          <a href={localePath("/properties")} className="text-gold hover:text-gold-deep">
            {t("nav.properties")}
          </a>
          <a href={localePath("/contact")} className="text-gold hover:text-gold-deep">
            {t("nav.contact")}
          </a>
          <a href="/es" className="text-sage hover:text-bone">
            {t("locale.switchToSpanish")}
          </a>
        </nav>
      </div>
    </section>
  );
}
