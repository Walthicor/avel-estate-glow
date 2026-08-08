import { useState } from "react";

import type { Locale } from "../../config/site";
import { CITY_OPTIONS, STAGE_OPTIONS, TYPE_OPTIONS } from "../../content/properties";
import type { PropertiesCopy } from "../../content/properties-page";
import {
  AREA_BOUNDS,
  PAGE_SIZE,
  type PropertySearch,
  type ResolvedSearch,
  type Sort,
} from "../../lib/property-search";

type Patch = Partial<PropertySearch>;

const selectClass =
  "type-label w-full appearance-none border border-[rgba(140,164,165,0.28)] bg-abyss px-3 py-2.5 text-bone outline-none transition-colors duration-300 hover:border-gold focus-visible:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="type-label text-sage">{label}</span>
      {children}
    </label>
  );
}

export function FilterBar({
  search,
  copy,
  locale,
  count,
  onChange,
}: {
  search: ResolvedSearch;
  copy: PropertiesCopy;
  locale: Locale;
  count: number;
  onChange: (patch: Patch) => void;
}) {
  const set = (patch: Patch) => onChange({ ...patch, show: PAGE_SIZE });
  const [open, setOpen] = useState(false);

  return (
    <div className="hairline-b z-30 bg-deep md:sticky md:top-[100px]">
      <div className="mx-auto max-w-[1400px] px-6 py-5 md:px-12">
        <div className="flex items-center justify-between gap-4 md:hidden">
          <p className="type-label text-bone" aria-live="polite">
            {copy.count(count).toUpperCase()}
          </p>
          <button
            type="button"
            className="type-label border border-[rgba(140,164,165,0.28)] px-4 py-2 text-gold"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? copy.filters.any : copy.filters.stage
              ? open
                ? "—"
                : "+"
              : "+"}
            <span className="ml-2">{locale === "es" ? "Filtros" : "Filters"}</span>
          </button>
        </div>

        <div
          className={`${open ? "mt-5 grid" : "hidden"} gap-4 md:mt-0 md:grid md:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto]`}
        >
          <Field label={copy.filters.city}>
            <select
              className={selectClass}
              value={search.city}
              onChange={(e) => set({ city: e.target.value })}
            >
              <option value="">{copy.filters.any}</option>
              {CITY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label={copy.filters.type}>
            <select
              className={selectClass}
              value={search.type}
              onChange={(e) => set({ type: e.target.value })}
            >
              <option value="">{copy.filters.any}</option>
              {TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {locale === "es" ? t.es : t.en}
                </option>
              ))}
            </select>
          </Field>

          <Field label={copy.filters.area}>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={AREA_BOUNDS.min}
                aria-label={`${copy.filters.area} — min`}
                className={selectClass}
                value={search.amin}
                onChange={(e) => set({ amin: Number(e.target.value) || AREA_BOUNDS.min })}
              />
              <span className="type-label shrink-0 text-sage">{copy.filters.to}</span>
              <input
                type="number"
                inputMode="numeric"
                aria-label={`${copy.filters.area} — max`}
                className={selectClass}
                value={search.amax}
                onChange={(e) => set({ amax: Number(e.target.value) || AREA_BOUNDS.max })}
              />
            </div>
          </Field>

          <Field label={copy.filters.bedrooms}>
            <select
              className={selectClass}
              value={String(search.beds)}
              onChange={(e) => set({ beds: Number(e.target.value) })}
            >
              <option value="0">{copy.filters.any}</option>
              {[1, 2, 3, 4].map((b) => (
                <option key={b} value={b}>
                  {b}+
                </option>
              ))}
            </select>
          </Field>

          <Field label={copy.filters.stage}>
            <select
              className={selectClass}
              value={search.stage}
              onChange={(e) => set({ stage: e.target.value })}
            >
              <option value="">{copy.filters.any}</option>
              {STAGE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {locale === "es" ? s.es : s.en}
                </option>
              ))}
            </select>
          </Field>

          <label className="flex cursor-pointer items-center gap-3 self-end pb-2.5">
            <input
              type="checkbox"
              checked={search.str}
              onChange={(e) => set({ str: e.target.checked })}
              className="h-4 w-4 shrink-0 accent-[#f7a73e]"
            />
            <span className="type-label whitespace-nowrap text-sage">{copy.filters.str}</span>
          </label>
        </div>

        <div className="hairline-t mt-5 flex flex-wrap items-center justify-between gap-4 pt-4">
          <p className="type-label text-bone" aria-live="polite">
            {copy.count(count).toUpperCase()}
          </p>

          <label className="flex items-center gap-3">
            <span className="type-label text-sage">{copy.sort.label}</span>
            <select
              className={`${selectClass} w-auto`}
              value={search.sort}
              onChange={(e) => onChange({ sort: e.target.value as Sort })}
            >
              <option value="newest">{copy.sort.newest}</option>
              <option value="area-desc">{copy.sort.largest}</option>
              <option value="area-asc">{copy.sort.smallest}</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
