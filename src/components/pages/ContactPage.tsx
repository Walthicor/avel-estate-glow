import { useLocale } from "../../i18n/LocaleProvider";
import { CONTACT } from "../../content/contact";
import { SITE } from "../../config/site";
import { FullLeadForm } from "../forms/FullLeadForm";
import { Reveal } from "../Reveal";

export function ContactPage() {
  const { locale } = useLocale();
  const copy = CONTACT[locale];

  return (
    <div className="pt-[112px]">
      <section className="mx-auto grid max-w-[1240px] gap-14 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <p className="type-label text-gold">{copy.eyebrow}</p>
          <h1 className="type-h1 mt-5 max-w-[16ch] text-bone">{copy.heading}</h1>
          <p className="type-body mt-6 max-w-[40ch] text-sage">{copy.intro}</p>
          <p className="type-body mt-10 text-sage">
            <a href={`mailto:${SITE.publicEmail}`} className="link-draw">
              {SITE.publicEmail}
            </a>
          </p>
        </Reveal>

        <Reveal>
          <FullLeadForm />
        </Reveal>
      </section>
    </div>
  );
}
