import type { Locale } from "../../config/site";
import { COLLECTIONS, COLLECTIONS_INDEX, collectionBySlug } from "../../content/collections";
import { HOME } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { filterProperties, resolveSearch } from "../../lib/property-search";
import { AvelImage } from "../AvelImage";
import { Reveal } from "../Reveal";
import { LeadCapture } from "../home/LeadCapture";
import { PropertyGrid } from "../properties/PropertyGrid";

export function CollectionPage({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const collection = collectionBySlug(slug);
  if (!collection) return null;
  const c = collection[locale as Locale];

  let results = filterProperties(resolveSearch(collection.filter));
  if (collection.zones) {
    const zones = collection.zones;
    results = results.filter((p) => zones.includes(p.zone));
  }

  return (
    <div>
      <section className="bg-abyss px-6 pt-[168px] pb-16 md:px-12 md:pt-[200px] md:pb-20">
        <div className="mx-auto max-w-[1240px]">
          <span className="gold-rule mb-8 block" />
          <p className="type-label text-gold">{COLLECTIONS_INDEX[locale as Locale].heading}</p>
          <h1 className="type-hero mt-3 max-w-[18ch] text-bone">{c.name}</h1>
          <p className="type-body mt-8 max-w-[68ch] text-sage">{c.thesis}</p>
        </div>
      </section>

      <PropertyGrid properties={results} heading={c.gridHeading} />

      <LeadCapture content={HOME[locale].lead} />
    </div>
  );
}

export function CollectionsIndexPage() {
  const { locale, localePath } = useLocale();
  const copy = COLLECTIONS_INDEX[locale as Locale];

  return (
    <div>
      <section className="bg-abyss px-6 pt-[168px] pb-14 md:px-12 md:pt-[200px] md:pb-16">
        <div className="mx-auto max-w-[1240px]">
          <span className="gold-rule mb-8 block" />
          <h1 className="type-hero text-bone">{copy.heading}</h1>
          <p className="type-body mt-6 max-w-[56ch] text-sage">{copy.intro}</p>
        </div>
      </section>

      <section className="bg-deep px-6 pb-24 pt-10 md:px-12 md:pb-32">
        <ul className="mx-auto grid max-w-[1240px] gap-px sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((item, i) => {
            const c = item[locale as Locale];
            return (
              <Reveal as="li" key={item.slug} delay={(i % 3) * 60}>
                <a
                  href={localePath(`/collections/${item.slug}`)}
                  className="hairline group relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden bg-deep p-6 transition-colors hover:border-gold"
                >
                  <AvelImage
                    src={item.image}
                    alt=""
                    ariaHidden
                    preset="card"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="absolute inset-0 h-full w-full opacity-30"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="relative">
                    <p className="type-label text-gold">{c.name}</p>
                    <p className="type-body mt-3 line-clamp-3 text-sage">{c.thesis}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <LeadCapture content={HOME[locale].lead} />
    </div>
  );
}
