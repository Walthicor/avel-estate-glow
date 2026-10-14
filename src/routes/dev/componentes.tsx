import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SectionLabel } from "../../components/arquitectura/SectionLabel";
import { DisplayTitle } from "../../components/arquitectura/DisplayTitle";
import { BeforeAfterSlider } from "../../components/arquitectura/BeforeAfterSlider";
import { FilterPills } from "../../components/arquitectura/FilterPills";
import { ViewToggle, type ViewMode } from "../../components/arquitectura/ViewToggle";
import { ProjectIndexList } from "../../components/arquitectura/ProjectIndexList";
import { QuoteMascot } from "../../components/arquitectura/QuoteMascot";
import { FullscreenMenu } from "../../components/arquitectura/FullscreenMenu";
import { GiantWordmark } from "../../components/arquitectura/GiantWordmark";
import { CountUp } from "../../components/arquitectura/CountUp";

export const Route = createFileRoute("/dev/componentes")({
  head: () => ({
    meta: [
      { title: "Componentes AVEL Arquitectura (interno)" },
      { name: "description", content: "Página interna de prueba de los componentes de AVEL Arquitectura." },
      { property: "og:title", content: "Componentes AVEL Arquitectura (interno)" },
      { property: "og:description", content: "Página interna de prueba de componentes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DevComponentes,
});

const img = (seed: string, gray = false) => `https://picsum.photos/seed/${seed}/1600/1000${gray ? "?grayscale" : ""}`;

const PROJECTS = [
  { id: "1", name: "Casa Laureles", image: img("avel1") },
  { id: "2", name: "Torre Provenza", image: img("avel2") },
  { id: "3", name: "Villa Llanogrande", image: img("avel3") },
  { id: "4", name: "Loft Manila", image: img("avel4") },
];

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-current/15 py-16">
      <SectionLabel number={n} text={title} className="mb-8 text-gold-ink" />
      {children}
    </section>
  );
}

function DevComponentes() {
  const [filter, setFilter] = useState("todos");
  const [view, setView] = useState<ViewMode>("galeria");

  return (
    <main id="main" className="bg-paper text-abyss">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-32">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.25em]">Página interna · /dev/componentes</p>
          <FullscreenMenu
            links={[
              { label: "Proyectos", href: "#" },
              { label: "Nosotros", href: "#" },
              { label: "Proceso", href: "#" },
              { label: "Cotiza", href: "/es/cotiza" },
            ]}
          />
        </div>

        <Block n={1} title="Rótulo de sección">
          <SectionLabel number={1} text="Sobre el proyecto" />
        </Block>

        <Block n={2} title="Título enorme">
          <DisplayTitle text={"Proyectos"} count={6} />
          <DisplayTitle text={"Diseñamos\ny construimos"} className="mt-10" />
        </Block>

        <Block n={3} title="Comparador foto / boceto">
          <BeforeAfterSlider photo={img("avelbefore")} sketch={img("avelbefore", true)} alt="Casa Laureles" />
        </Block>

        <Block n={4} title="Filtros">
          <FilterPills
            active={filter}
            onChange={setFilter}
            items={[
              { id: "todos", label: "Todos", count: 12 },
              { id: "residencial", label: "Residencial", count: 4 },
              { id: "comercial", label: "Comercial", count: 3 },
              { id: "interiores", label: "Interiores", count: 5 },
            ]}
          />
        </Block>

        <Block n={5} title="Selector de vista">
          <ViewToggle value={view} onChange={setView} />
        </Block>

        <Block n={6} title="Índice de proyectos">
          <ProjectIndexList items={PROJECTS} />
        </Block>

        <Block n={10} title="Contadores">
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { v: 13063, l: "m² construidos" },
              { v: 48, l: "proyectos entregados" },
              { v: 12, l: "años de experiencia" },
            ].map((s) => (
              <div key={s.l}>
                <CountUp value={s.v} className="font-display text-6xl" />
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em]">{s.l}</p>
              </div>
            ))}
          </div>
        </Block>
      </div>

      <footer className="bg-abyss pt-16 text-paper">
        <SectionLabel number={9} text="Marca gigante en el pie" className="mx-auto mb-6 max-w-7xl px-6 text-gold" />
        <GiantWordmark />
      </footer>

      <QuoteMascot />
    </main>
  );
}
