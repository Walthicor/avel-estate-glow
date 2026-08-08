import { useEffect, useState } from "react";

import type { Locale } from "../../config/site";
import {
  areaLabel,
  bedroomsLabel,
  propertyAlt,
  stageLabel,
  typeLabel,
} from "../../content/properties";
import { PROPERTIES_COPY } from "../../content/properties-page";
import {
  DETAIL_COPY,
  descriptionFor,
  featuresFor,
  similarProperties,
  zoneParagraph,
  type PropertyDetail,
} from "../../content/property-detail";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { AvelImage } from "../AvelImage";
import { Lightbox } from "./Lightbox";
import { Gallery } from "./Gallery";
import { PropertyCard } from "./PropertyCard";

export function PropertyDetailPage({ detail }: { detail: PropertyDetail }) {
  const { locale, localePath } = useLocale();
  const copy = DETAIL_COPY[locale as Locale];
  const listCopy = PROPERTIES_COPY[locale as Locale];
  const p = detail.record;
  const [planIndex, setPlanIndex] = useState<number | null>(null);

  const specs: Array<{ label: string; value: string }> = [
    { label: copy.specs.area, value: areaLabel(p) },
    { label: copy.specs.bedrooms, value: bedroomsLabel(p, locale) },
    {
      label: copy.specs.bathrooms,
      value:
        detail.bathroomsMin === detail.bathroomsMax
          ? `${detail.bathroomsMin}`
          : `${detail.bathroomsMin}–${detail.bathroomsMax}`,
    },
    { label: copy.specs.parking, value: `${detail.parking}` },
    { label: copy.specs.floors, value: `${detail.floors}` },
    { label: copy.specs.delivery, value: p.delivery ?? "" },
    { label: copy.specs.developer, value: detail.developer },
    { label: copy.specs.stage, value: stageLabel(p.stage, locale) },
    { label: copy.specs.reference, value: detail.reference },
  ].filter((row) => row.value.trim() !== "");

  const features = featuresFor(detail, locale);
  const similar = similarProperties(detail);
  const contactHref = localePath("/contact");

  // Tell the floating buttons to sit above the sticky mobile bar.
  useEffect(() => {
    document.body.dataset["stickybar"] = "open";
    return () => {
      delete document.body.dataset["stickybar"];
    };
  }, []);

  return (
    <div className="pb-24 pt-[112px] md:pb-0">
      <Gallery
        images={detail.gallery}
        videoYoutubeId={detail.videoYoutubeId}
        alt={propertyAlt(p, locale)}
        copy={copy}
      />

      {/* HEADER BLOCK */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <p className="type-label text-sage">
            {p.cityLabel} · {p.zone}
          </p>
          <h1 className="type-h1 mt-4 text-bone">{p.titleEn}</h1>
          <div className="mt-8 space-y-5">
            {descriptionFor(detail, locale).map((para) => (
              <p key={para.slice(0, 24)} className="type-body max-w-[62ch] text-sage">
                {para}
              </p>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-[128px] lg:self-start">
          <div className="hairline bg-deep p-7">
            <p className="type-label text-gold">{copy.priceOnRequest}</p>
            <span aria-hidden="true" className="mt-4 block h-px w-full bg-gold" />

            <dl className="mt-6">
              {specs.map((row) => (
                <div
                  key={row.label}
                  className="hairline-b flex items-baseline justify-between gap-6 py-3"
                >
                  <dt className="type-label text-sage">{row.label}</dt>
                  <dd className="type-body text-bone">{row.value}</dd>
                </div>
              ))}
            </dl>

            <a href={contactHref} className="btn-gold mt-7 w-full">
              {copy.requestPrice}
            </a>
            <a href={contactHref} className="btn-ghost mt-3 w-full">
              {copy.videoTour}
            </a>
          </div>
        </aside>
      </section>

      {/* AMENITIES */}
      {features.length > 0 ? (
        <section className="hairline-t bg-abyss">
          <Reveal className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
            <h2 className="type-h2 text-bone">{copy.amenities}</h2>
            <ul className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="type-body flex items-start gap-4 text-sage">
                  <span aria-hidden="true" className="mt-3 block h-px w-4 shrink-0 bg-gold" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      {/* LOCATION */}
      <section className="hairline-t bg-abyss">
        <Reveal className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="type-h2 text-bone">{copy.location}</h2>
            <p className="type-body mt-6 max-w-[54ch] text-sage">{zoneParagraph(detail, locale)}</p>
          </div>
          {detail.lat !== null && detail.lng !== null ? (
            <figure className="hairline overflow-hidden bg-deep">
              {/* Self-contained approximate map: no third-party request, no exact address. */}
              <div
                role="img"
                aria-label={`${copy.approximate} — ${p.zone}, ${p.cityLabel}`}
                className="avel-map relative h-[320px] w-full"
              >
                <span aria-hidden="true" className="avel-map__pin" />
                <span className="type-label absolute bottom-4 left-4 text-sage">
                  {p.zone} · {p.cityLabel}
                </span>
              </div>
              <figcaption className="type-label hairline-t px-4 py-3 text-sage">
                {copy.approximate}
              </figcaption>
            </figure>
          ) : null}
        </Reveal>
      </section>

      {/* FLOORPLANS */}
      {detail.floorplans.length > 0 ? (
        <section className="hairline-t bg-abyss">
          <Reveal className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
            <h2 className="type-h2 text-bone">{copy.floorplans}</h2>
            <ul className="mt-8 flex flex-wrap gap-4">
              {detail.floorplans.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setPlanIndex(i)}
                    aria-label={`${copy.floorplans} ${i + 1}`}
                    className="block h-32 w-44 overflow-hidden border border-sage/30 transition-colors hover:border-gold"
                  >
                    <AvelImage
                      src={src}
                      alt={`${copy.floorplans} ${i + 1} — ${p.titleEn}`}
                      preset="thumbnail"
                      ratio="11/8"
                      className="h-full w-full"
                    />

                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          {planIndex !== null ? (
            <Lightbox
              images={detail.floorplans}
              index={planIndex}
              onIndexChange={setPlanIndex}
              onClose={() => setPlanIndex(null)}
              labels={copy.gallery}
              alt={`${copy.floorplans} — ${p.titleEn}`}
            />
          ) : null}
        </section>
      ) : null}

      {/* REMOTE BUYER PATH (collapsed) */}
      <section className="hairline-t bg-deep">
        <Reveal className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="type-h2 text-bone">{copy.pathHeading}</h2>
            <p className="type-body mt-3 max-w-[52ch] text-sage">{copy.pathBody}</p>
          </div>
          <a href={localePath("/buying-from-abroad")} className="link-draw type-label">
            {copy.pathLink}
          </a>
        </Reveal>
      </section>

      {/* SIMILAR */}
      {similar.length > 0 ? (
        <section className="hairline-t bg-abyss">
          <Reveal className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
            <h2 className="type-h2 text-bone">{copy.similar}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.slug} property={item} locale={locale} copy={listCopy} />
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* STICKY MOBILE BAR */}
      <div className="hairline-t fixed inset-x-0 bottom-0 z-[95] flex h-[72px] items-center justify-between gap-4 bg-deep px-5 md:hidden">
        <span className="type-label text-gold">{copy.priceOnRequest}</span>
        <a href={contactHref} className="btn-gold btn-gold-quiet">
          {copy.requestDetails}
        </a>
      </div>
    </div>
  );
}
