import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import type { Locale } from "../../config/site";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { SectionLabel } from "./SectionLabel";
import { DisplayTitle } from "./DisplayTitle";
import { Lightbox } from "../properties/Lightbox";
import { PROJECT_COPY, projectPath, tr, type Project, type ProjectNeighbor } from "../../lib/projects";

type Props = { project: Project; prev: ProjectNeighbor | null; next: ProjectNeighbor | null; locale: Locale };

// Repeating size pattern for the mixed-size gallery grid.
const SPANS = ["md:col-span-2 md:row-span-2", "", "md:row-span-2", "", "md:col-span-2", ""];

export function ProjectPage({ project: p, prev, next, locale }: Props) {
  const c = PROJECT_COPY[locale];
  const reduce = useReducedMotion();
  const [lb, setLb] = useState<number | null>(null);
  const photo = p.main_photo ?? p.gallery[0] ?? "";
  const sketch = p.sketch ?? photo;
  const listHref = locale === "es" ? "/es/arquitectura/proyectos" : "/architecture/projects";
  const quoteHref = locale === "es" ? "/es/cotiza" : "/quote";
  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } };

  const specs = [
    [c.type, tr(p.type, locale)],
    [c.city, p.city],
    [c.area, p.area_m2 ? new Intl.NumberFormat("es-CO").format(p.area_m2) : "—"],
    [c.year, p.year ? String(p.year) : "—"],
    [c.status, tr(p.status, locale)],
  ];

  return (
    <main id="main" className="bg-paper text-abyss">
      {/* 1. Hero */}
      <section className="relative h-[100svh] min-h-[560px] bg-abyss text-paper">
        <BeforeAfterSlider
          photo={photo}
          sketch={sketch}
          alt={p.name}
          className="h-full"
          frameClassName="h-full"
          controlsClassName="right-4 top-44 md:right-8 md:top-28"
        />
        <a
          href={listHref}
          className="absolute left-4 top-28 z-10 rounded-full bg-abyss/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-paper backdrop-blur hover:bg-abyss md:left-8"
        >
          ← {c.all}
        </a>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/90 via-abyss/40 to-transparent px-4 pb-10 pt-32 md:px-8">
          <DisplayTitle as="h1" text={p.name} className="text-paper" />
          <p className="mt-4 text-lg text-bone">
            {[p.city, p.department].filter(Boolean).join(", ")} — {tr(p.type, locale)}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{c.hint}</p>
        </div>
      </section>

      {/* 2. Specs */}
      <section className="border-b border-abyss/15">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-10 font-mono md:grid-cols-5 md:px-8">
          {specs.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-abyss/60">{k}</dt>
              <dd className="mt-2 text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. About */}
      <motion.section {...fade} className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionLabel number={1} text={c.about} className="mb-8 text-gold-ink" />
        <p className="max-w-5xl font-display text-4xl leading-tight md:text-6xl">{p.tagline}</p>
        <p className="mt-10 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-abyss/80">{p.description}</p>
      </motion.section>

      {/* 4. Gallery */}
      {p.gallery.length > 0 && (
        <motion.section {...fade} className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
          <SectionLabel number={2} text={c.gallery} className="mb-8 text-gold-ink" />
          <div className="grid auto-rows-[220px] grid-cols-1 gap-3 md:grid-cols-3 md:auto-rows-[260px]">
            {p.gallery.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setLb(i)}
                aria-label={c.lb.slide(i + 1, p.gallery.length)}
                className={`group relative overflow-hidden bg-bone focus-visible:outline-2 focus-visible:outline-gold-ink ${SPANS[i % SPANS.length]}`}
              >
                <img
                  src={src}
                  alt={`${p.name} — ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. Services */}
      {p.services.length > 0 && (
        <motion.section {...fade} className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
          <SectionLabel number={3} text={c.did} className="mb-8 text-gold-ink" />
          <ul className="border-t border-abyss/15">
            {p.services.map((s, i) => (
              <li key={s} className="flex items-baseline gap-6 border-b border-abyss/15 py-5">
                <span className="font-mono text-xs text-abyss/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl md:text-4xl">{tr(s, locale)}</span>
              </li>
            ))}
          </ul>
          {p.team_role && (
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-abyss/60">
              {c.role}: {p.team_role}
            </p>
          )}
        </motion.section>
      )}

      {/* 6. Prev / Next */}
      {(prev || next) && (
        <nav aria-label={`${c.prev} / ${c.next}`} className="grid border-y border-abyss/15 md:grid-cols-2">
          {[
            { n: prev, label: c.prev, align: "md:text-left" },
            { n: next, label: c.next, align: "md:text-right md:border-l border-abyss/15" },
          ].map(({ n, label, align }) =>
            n ? (
              <a key={label} href={projectPath(n.slug, locale)} className={`group relative block overflow-hidden px-4 py-12 md:px-8 ${align}`}>
                {n.main_photo && (
                  <img
                    src={n.main_photo}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-1/2 hidden h-32 w-48 -translate-y-1/2 scale-95 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 md:block"
                  />
                )}
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-abyss/60">{label}</p>
                <p className="relative mt-3 font-display text-4xl md:text-6xl">{n.name}</p>
              </a>
            ) : (
              <span key={label} />
            ),
          )}
        </nav>
      )}

      {/* 7. CTA */}
      <section className="bg-abyss px-4 py-28 text-center text-paper md:px-8">
        <DisplayTitle text={c.cta} className="mx-auto max-w-6xl text-paper" />
        <a href={quoteHref} className="btn-gold mt-12 inline-flex">
          {c.ctaBtn}
        </a>
      </section>

      {lb !== null && (
        <Lightbox images={p.gallery} index={lb} onClose={() => setLb(null)} onIndexChange={setLb} labels={c.lb} alt={p.name} />
      )}
    </main>
  );
}
