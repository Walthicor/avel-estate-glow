import type { Locale } from "../../config/site";
import { cityBySlug } from "../../content/cities";
import { HOME } from "../../content/home";
import { PROPERTIES } from "../../content/properties";
import { useLocale } from "../../i18n/LocaleProvider";
import { AvelImage } from "../AvelImage";
import { Reveal } from "../Reveal";
import { LeadCapture } from "../home/LeadCapture";
import { PropertyGrid } from "../properties/PropertyGrid";

export function CityPage({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const city = cityBySlug(slug);
  if (!city) return null;
  const c = city[locale as Locale];
  const results = city.filterCity ? PROPERTIES.filter((p) => p.city === city.filterCity) : [];

  return (
    <main>
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden bg-abyss">
        <AvelImage
          src={city.image}
          alt={`${c.name}, ${c.region}, Colombia`}
          preset="hero"
          priority
          ratio="16/9"
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,17,15,0.94),rgba(11,17,15,0.35)_55%,rgba(11,17,15,0.6))]"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 md:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <span className="gold-rule mb-6 block" />
            <p className="type-label text-gold">{c.region}</p>
            <h1 className="type-hero mt-3 text-bone">{c.name}</h1>
          </div>
        </div>
      </section>

      <section className="bg-bone px-6 py-20 text-abyss md:px-12 md:py-28">
        <Reveal className="mx-auto max-w-[72ch] space-y-6">
          {c.intro.map((p) => (
            <p key={p} className="type-body text-abyss/80">
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <PropertyGrid properties={results} heading={c.gridHeading} />

      <section className="bg-deep px-6 py-20 md:px-12 md:py-28">
        <Reveal className="mx-auto max-w-[1240px]">
          <h2 className="type-h2 text-bone">{c.zonesHeading}</h2>
          <ul className="mt-10 border-t border-sage/20">
            {c.zones.map((z) => (
              <li
                key={z.name}
                className="grid gap-1 border-b border-sage/20 py-5 sm:grid-cols-[minmax(0,280px)_minmax(0,1fr)] sm:gap-8"
              >
                <span className="type-label text-gold">{z.name}</span>
                <span className="type-body text-bone/75">{z.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <LeadCapture content={HOME[locale].lead} />
    </main>
  );
}
