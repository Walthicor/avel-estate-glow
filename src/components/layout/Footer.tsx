import { FOOTER_CITIES, FOOTER_COMPANY, FOOTER_LEGAL } from "../../config/nav";
import { SITE } from "../../config/site";
import { useLocale } from "../../i18n/LocaleProvider";
import { AvelLogo } from "../brand/AvelLogo";

export function Footer() {
  const { t, localePath } = useLocale();
  const year = new Date().getFullYear();

  const linkClass = "type-body text-sage transition-colors duration-300 hover:text-bone";
  const headingClass = "type-label text-bone";

  return (
    <footer className="hairline-t bg-abyss">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-bone">
            <AvelLogo />
          </span>
          <p className="type-body mt-5 max-w-xs text-sage">{t("footer.tagline")}</p>
        </div>

        <div>
          <h2 className={headingClass}>{t("nav.cities")}</h2>
          <ul className="mt-5 space-y-3">
            {FOOTER_CITIES.map((city) => (
              <li key={city.path}>
                <a href={localePath(city.path)} className={linkClass}>
                  {city.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t("footer.company")}</h2>
          <ul className="mt-5 space-y-3">
            {FOOTER_COMPANY.map((item) => (
              <li key={item.path}>
                <a href={localePath(item.path)} className={linkClass}>
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t("nav.legal")}</h2>
          <ul className="mt-5 space-y-3">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.path}>
                <a href={localePath(item.path)} className={linkClass}>
                  {t(item.key)}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.publicEmail}`} className={linkClass}>
                {SITE.publicEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="triangle-band h-[120px] w-full" />

      <div className="hairline-t">
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          <p className="type-label text-sage">
            © {year} {SITE.name} · Medellín, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
