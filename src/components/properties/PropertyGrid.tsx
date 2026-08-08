import type { Locale } from "../../config/site";
import type { PropertyRecord } from "../../content/properties";
import { PROPERTIES_COPY } from "../../content/properties-page";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { PropertyCard } from "./PropertyCard";

/** Filtered grid used by city, collection and guide pages. */
export function PropertyGrid({
  properties,
  heading,
  limit,
}: {
  properties: PropertyRecord[];
  heading?: string;
  limit?: number;
}) {
  const { locale, localePath } = useLocale();
  const copy = PROPERTIES_COPY[locale as Locale];
  const visible = typeof limit === "number" ? properties.slice(0, limit) : properties;

  return (
    <section className="bg-abyss px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        {heading ? (
          <Reveal>
            <h2 className="type-h1 text-bone">{heading}</h2>
            <p className="type-label mt-4 text-sage">{copy.count(properties.length)}</p>
          </Reveal>
        ) : null}

        {visible.length === 0 ? (
          <div className="hairline mx-auto mt-12 max-w-[62ch] px-8 py-16 text-center">
            <p className="type-body text-bone">
              {copy.empty.text}{" "}
              <a href={localePath("/contact")} className="link-draw type-body">
                {copy.empty.link}
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.slug}>
                <PropertyCard property={p} locale={locale as Locale} copy={copy} eager={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
