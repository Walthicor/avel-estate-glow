import type { Locale } from "../../config/site";
import { DisplayTitle } from "./DisplayTitle";
import { PROJECT_COPY, projectPath, tr, type Project } from "../../lib/projects";

export function ProjectsIndexPage({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const c = PROJECT_COPY[locale];
  return (
    <main id="main" className="bg-paper text-abyss">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-36 md:px-8">
        <DisplayTitle as="h1" text={c.listTitle} count={projects.length} />
        <p className="mt-6 max-w-2xl text-lg text-abyss/80">{c.listIntro}</p>
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id}>
              <a href={projectPath(p.slug, locale)} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-bone">
                  {p.main_photo && (
                    <img src={p.main_photo} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
                  )}
                </div>
                <p className="mt-4 font-display text-3xl">{p.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-abyss/60">
                  {p.city} · {tr(p.type, locale)}
                  {p.area_m2 ? ` · ${new Intl.NumberFormat("es-CO").format(p.area_m2)} m²` : ""}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
