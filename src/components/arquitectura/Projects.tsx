import { useEffect, useRef, useState } from "react";

import { ARQ_PROJECTS, type ArqProject, type ProjectType } from "../../content/arquitectura";
import { ArqTitle, Rotulo, type GoQuote } from "./shared";

const pad = (n: number) => String(n).padStart(2, "0");
const FILTERS: ("Todos" | ProjectType)[] = ["Todos", "Residencial", "Corporativo", "Comercial"];

export function Projects({ goQuote }: { goQuote: GoQuote }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [view, setView] = useState<"galeria" | "indice">("galeria");
  const [open, setOpen] = useState<ArqProject | null>(null);
  const list = ARQ_PROJECTS.filter((p) => filter === "Todos" || p.types.includes(filter));
  const count = (f: (typeof FILTERS)[number]) => (f === "Todos" ? ARQ_PROJECTS.length : ARQ_PROJECTS.filter((p) => p.types.includes(f)).length);

  return (
    <section id="proyectos" className="bg-hueso px-5 py-20 text-obra md:px-10 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Rotulo light>(05) — Proyectos</Rotulo>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h2 className="arq-display text-[clamp(48px,10vw,140px)]">Proyectos</h2>
          <span className="arq-mono text-[13px] text-oro-ink">({pad(ARQ_PROJECTS.length)})</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-obra/15 py-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">
            {FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 arq-body text-[14px] transition ${filter === f ? "border-obra bg-obra text-hueso" : "border-obra/25 hover:border-obra"}`}>
                {f} <span className="arq-mono ml-1 text-[11px] opacity-70">{pad(count(f))}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2" role="group" aria-label="Vista">
            {(["galeria", "indice"] as const).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}
                className={`arq-mono rounded-full px-4 py-2 text-[11px] ${view === v ? "bg-oro text-obra" : "text-obra/70 hover:text-obra"}`}>
                {v === "galeria" ? "Galería" : "Índice"}
              </button>
            ))}
          </div>
        </div>

        {view === "galeria" ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <li key={p.slug}>
                <button type="button" onClick={() => setOpen(p)} className="group block w-full text-left">
                  <span className="block overflow-hidden rounded-[4px]">
                    <img src={p.photos[0]?.src} alt={p.photos[0]?.alt ?? p.name} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                  </span>
                  <span className="mt-4 block arq-display text-[22px]">{p.name}</span>
                  <span className="arq-mono mt-1 block text-[11px] text-obra/65">
                    {[p.city, p.label, p.m2 ? `${p.m2.toLocaleString("es-CO")} m²` : null].filter(Boolean).join(" · ")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="mt-6">
            {list.map((p, i) => (
              <li key={p.slug} className="border-b border-obra/15">
                <button type="button" onClick={() => setOpen(p)} className="group flex w-full items-baseline gap-4 py-6 text-left md:gap-8">
                  <span className="arq-mono text-[12px] text-oro-ink">{pad(i + 1)}</span>
                  <span className="arq-display flex-1 text-[clamp(28px,6vw,80px)] transition group-hover:text-oro-ink">{p.name}</span>
                  <span className="arq-mono hidden text-[11px] text-obra/65 md:block">{p.label}</span>
                </button>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-12">
          <button type="button" onClick={() => goQuote()} className="inline-flex rounded-full bg-obra px-7 py-4 arq-body text-[15px] font-medium text-hueso hover:bg-carbon">
            Quiero un proyecto así
          </button>
        </div>
      </div>
      {open ? <ProjectModal project={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: ArqProject; onClose: () => void }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const n = project.photos.length;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [n, onClose]);
  const photo = project.photos[i];
  const facts: [string, string][] = [
    ["Tipo", project.label],
    ["Ciudad", project.city ?? "—"],
    ["Área", project.m2 ? `${project.m2.toLocaleString("es-CO")} m²` : "—"],
    ["Año", project.year ? String(project.year) : "—"],
  ];
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-obra/90 p-4" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={project.name} onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-[1100px] overflow-auto rounded-[4px] bg-carbon text-hueso outline-none">
        <div className="relative">
          {photo ? <img src={photo.src} alt={photo.alt} className="aspect-[3/2] w-full object-cover" /> : null}
          {n > 1 ? (
            <>
              <button type="button" aria-label="Foto anterior" onClick={() => setI((x) => (x - 1 + n) % n)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-obra/80 text-oro">‹</button>
              <button type="button" aria-label="Foto siguiente" onClick={() => setI((x) => (x + 1) % n)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-obra/80 text-oro">›</button>
              <span className="arq-mono absolute bottom-3 right-3 rounded-full bg-obra/80 px-3 py-1 text-[10px]">{pad(i + 1)} / {pad(n)}</span>
            </>
          ) : null}
          <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-obra/80 text-hueso">✕</button>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="arq-display text-[clamp(26px,4vw,44px)]">{project.name}</h3>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-hueso/10 pt-6 md:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="arq-mono text-[10px] text-hueso/60">{k}</dt>
                <dd className="arq-mono mt-1 text-[13px] text-oro">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
