import type { Locale } from "../../config/site";
import {
  areaLabel,
  bedroomsLabel,
  deliveryLabel,
  imageFor,
  stageLabel,
  typeLabel,
  type PropertyRecord,
} from "../../content/properties";
import type { PropertiesCopy } from "../../content/properties-page";
import { useLocale } from "../../i18n/LocaleProvider";

export function PropertyCard({
  property,
  locale,
  copy,
  eager,
}: {
  property: PropertyRecord;
  locale: Locale;
  copy: PropertiesCopy;
  eager?: boolean;
}) {
  const { localePath } = useLocale();
  const facts = [
    typeLabel(property, locale),
    bedroomsLabel(property, locale),
    deliveryLabel(property, locale),
  ].filter(Boolean);

  return (
    <article className="group">
      <a href={localePath(`/properties/${property.slug}`)} className="block">
        <div className="prop-media relative aspect-4/3 overflow-hidden bg-deep">
          <img
            src={imageFor(property)}
            alt={`${property.titleEn}, ${property.zone}, ${property.cityLabel}`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="type-label absolute left-4 top-4 border border-gold bg-[rgba(15,22,20,0.7)] px-3 py-1.5 text-bone backdrop-blur-[4px]">
            {stageLabel(property.stage, locale)}
          </span>
        </div>

        <div className="pt-5">
          <p className="type-label text-sage">
            {property.cityLabel} · {property.zone}
          </p>
          <h3 className="type-h3 mt-2 line-clamp-2 text-bone transition-colors duration-300 group-hover:text-gold">
            {property.titleEn}
          </h3>
          <p className="type-figure mt-3 text-gold">{areaLabel(property)}</p>

          <div className="hairline-t mt-4 pt-4">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {facts.map((f, i) => (
                <li key={f} className="type-label flex items-center gap-3 text-sage">
                  {i > 0 ? <span aria-hidden="true" className="h-3 w-px bg-[rgba(140,164,165,0.35)]" /> : null}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="type-label text-gold">{copy.card.priceOnRequest}</span>
            {property.str ? (
              <span className="type-label flex items-center gap-2 text-sage">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                {copy.card.str}
              </span>
            ) : null}
          </div>
        </div>
      </a>
    </article>
  );
}
