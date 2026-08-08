import { ABOUT } from "../../content/about";
import { HOME } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { LeadCapture } from "../home/LeadCapture";

export function AboutPage() {
  const { locale } = useLocale();
  const c = ABOUT[locale];

  return (
    <>
      <section className="bg-abyss px-6 pt-[168px] pb-20 md:px-12 md:pt-[200px] md:pb-28">
        <div className="mx-auto max-w-[1240px]">
          <span className="gold-rule mb-8 block" />
          <h1 className="type-hero max-w-[22ch] text-bone">{c.hero.statement}</h1>
          <p className="type-body mt-6 max-w-[52ch] text-sage">{c.hero.sub}</p>
        </div>
      </section>

      <section className="bg-bone px-6 py-24 text-abyss md:px-12 md:py-32">
        <Reveal className="mx-auto max-w-[1240px]">
          <p className="type-label text-abyss/50">{c.founder.credentialsLabel}</p>
          <ul className="mt-8 max-w-[70ch] space-y-3">
            {c.founder.credentials.map((cr) => (
              <li key={cr} className="type-body flex gap-4 text-abyss/80">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-6 shrink-0 bg-gold-deep" />
                <span>{cr}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>


      <section className="bg-abyss px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mx-auto max-w-[1240px]">
          <p className="type-label text-sage">{c.how.label}</p>
          <h2 className="type-h1 mt-3 max-w-[20ch] text-bone">{c.how.heading}</h2>
          <div className="mt-8 max-w-[64ch] space-y-5">
            {c.how.body.map((p) => (
              <p key={p} className="type-body text-bone/70">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-deep px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mx-auto max-w-[1240px]">
          <p className="type-label text-sage">{c.paid.label}</p>
          <h2 className="type-h1 mt-3 max-w-[20ch] text-bone">{c.paid.heading}</h2>
          <p className="type-h3 mt-8 max-w-[46ch] border-l border-gold pl-6 text-gold">
            {c.paid.sentence}
          </p>
          <div className="mt-8 max-w-[64ch] space-y-5">
            {c.paid.body.map((p) => (
              <p key={p} className="type-body text-bone/70">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-abyss px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mx-auto max-w-[1240px]">
          <p className="type-label text-sage">{c.legal.label}</p>
          <h2 className="type-h1 mt-3 max-w-[20ch] text-bone">{c.legal.heading}</h2>
          <dl className="mt-10 max-w-[70ch] border-t border-sage/20">
            {c.legal.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 border-b border-sage/20 py-4 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="type-label text-sage">{row.label}</dt>
                <dd className="type-body text-bone/85">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="type-body mt-6 max-w-[60ch] text-sage">{c.legal.note}</p>
        </Reveal>
      </section>

      <LeadCapture content={HOME[locale].lead} />
    </>
  );
}
