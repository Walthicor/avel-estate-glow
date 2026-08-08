import { useNavigate } from "@tanstack/react-router";

import type { Locale } from "../../config/site";
import { PROPERTIES_COPY } from "../../content/properties-page";
import { useLocale } from "../../i18n/LocaleProvider";
import {
  filterProperties,
  PAGE_SIZE,
  resolveSearch,
  type PropertySearch,
} from "../../lib/property-search";
import { Reveal } from "../Reveal";
import { FilterBar } from "./FilterBar";
import { PropertyCard } from "./PropertyCard";

export function PropertiesPage({ search }: { search: PropertySearch }) {
  const { locale, localePath } = useLocale();
  const navigate = useNavigate();
  const copy = PROPERTIES_COPY[locale as Locale];

  const resolved = resolveSearch(search);
  const results = filterProperties(resolved);
  const visible = results.slice(0, resolved.show);

  const update = (patch: Partial<PropertySearch>) => {
    void navigate({
      to: ".",
      search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }),
      replace: true,
      resetScroll: false,
    });
  };

  return (
    <main>
      <section className="bg-abyss px-6 pb-12 pt-[160px] md:px-12 md:pt-[200px]">
        <div className="mx-auto max-w-[1400px]">
          <span className="gold-rule" />
          <h1 className="type-h1 mt-6 text-bone">{copy.heading}</h1>
          <p className="type-body mt-4 max-w-[62ch] text-sage">{copy.intro}</p>
        </div>
      </section>

      <FilterBar
        search={resolved}
        copy={copy}
        locale={locale as Locale}
        count={results.length}
        onChange={update}
      />

      <section className="bg-abyss px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          {results.length === 0 ? (
            <div className="hairline mx-auto max-w-[62ch] px-8 py-16 text-center">
              <p className="type-body text-bone">
                {copy.empty.text}{" "}
                <a href={localePath("/contact")} className="link-draw type-body">
                  {copy.empty.link}
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((p, i) => (
                  <Reveal key={p.slug}>
                    <PropertyCard property={p} locale={locale as Locale} copy={copy} eager={i < 3} />
                  </Reveal>
                ))}
              </div>

              {results.length > visible.length ? (
                <div className="mt-16 flex justify-center">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => update({ show: resolved.show + PAGE_SIZE })}
                  >
                    {copy.loadMore}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
