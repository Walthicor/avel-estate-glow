import { createFileRoute, Link } from "@tanstack/react-router";

import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";
import { useLocale } from "../../i18n/LocaleProvider";

export const Route = createFileRoute("/es/")({
  head: () =>
    seoHead({
      locale: "es",
      path: "/",
      title: `${SITE.name} — Bienes Raíces de Lujo en Colombia`,
      description:
        "Casas de lujo y propiedades de inversión en Colombia para compradores internacionales.",
    }),
  component: IndexEs;
});

function IndexEs() {
  const { t, localePath } = useLocale();

  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-5xl text-bone">{SITE.name}</h1>
        <p className="mt-4 text-sage">{t("footer.tagline")}</p>
        <nav className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link to={localePath("/properties") as never} className="text-gold hover:text-gold-deep">
            {t("nav.properties")}
          </Link>
          <Link to={localePath("/contact") as never} className="text-gold hover:text-gold-deep">
            {t("nav.contact")}
          </Link>
          <Link to="/" className="text-sage hover:text-bone">
            {t("locale.switchToEnglish")}
          </Link>
        </nav>
      </div>
    </main>
  );
}
