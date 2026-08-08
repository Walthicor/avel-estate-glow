import { LEGAL, LEGAL_PATHS, type LegalDoc } from "../../content/legal";
import { useLocale } from "../../i18n/LocaleProvider";
import { openCookiePreferences } from "../../lib/consent";
import { Reveal } from "../Reveal";

const ORDER: LegalDoc["slug"][] = ["privacy", "terms", "cookies", "habeas-data"];

export function LegalPage({ slug }: { slug: LegalDoc["slug"] }) {
  const { locale, t, localePath } = useLocale();
  const pack = LEGAL[locale];
  const doc = pack.docs[slug];

  return (
    <section className="bg-abyss px-6 pt-[168px] pb-24 md:px-12 md:pt-[200px] md:pb-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-20">
        <nav aria-label={t("nav.legal")} className="lg:sticky lg:top-[160px] lg:self-start">
          <p className="type-label text-sage">{t("nav.legal")}</p>
          <ul className="mt-5 space-y-3">
            {ORDER.map((s) => (
              <li key={s}>
                <a
                  href={localePath(LEGAL_PATHS[s])}
                  aria-current={s === slug ? "page" : undefined}
                  className={`type-body transition-colors duration-300 ${
                    s === slug ? "text-gold" : "text-sage hover:text-bone"
                  }`}
                >
                  {pack.docs[s].title}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="type-body text-sage transition-colors duration-300 hover:text-bone"
              >
                {t("footer.cookiePreferences")}
              </button>
            </li>
          </ul>
        </nav>

        <Reveal>
          <span className="gold-rule mb-8 block" />
          <h1 className="type-h1 max-w-[20ch] text-bone">{doc.title}</h1>
          <p className="type-label mt-4 text-sage">
            {pack.updatedLabel}: {doc.updated}
          </p>

          <div className="mt-8 max-w-[70ch] space-y-5">
            {doc.intro.map((p) => (
              <p key={p} className="type-body text-bone/75">
                {p}
              </p>
            ))}
          </div>

          {doc.sections.map((section) => (
            <div key={section.heading} className="mt-12 max-w-[70ch]">
              <h2 className="type-h3 text-bone">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="type-body mt-4 text-bone/75">
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((b) => (
                    <li key={b} className="type-body flex gap-4 text-bone/75">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-6 shrink-0 bg-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {doc.cookieTable ? (
            <div className="mt-14">
              <h2 className="type-h3 text-bone">{doc.cookieTable.heading}</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-sage/30">
                      {doc.cookieTable.columns.map((col) => (
                        <th key={col} scope="col" className="type-label py-3 pr-6 text-sage">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {doc.cookieTable.rows.map((row) => (
                      <tr key={row.name} className="border-b border-sage/15 align-top">
                        <td className="type-body py-4 pr-6 whitespace-nowrap text-gold">{row.name}</td>
                        <td className="type-body max-w-[46ch] py-4 pr-6 text-bone/75">{row.purpose}</td>
                        <td className="type-body py-4 pr-6 text-bone/75">{row.duration}</td>
                        <td className="type-label py-4 text-sage">{row.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <button type="button" className="btn-ghost" onClick={openCookiePreferences}>
                  {t("footer.cookiePreferences")}
                </button>
              </div>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
