import { createFileRoute } from "@tanstack/react-router";

import { seoHead } from "../../components/Seo";
import { SITE } from "../../config/site";

export const Route = createFileRoute("/es/arquitectura")({
  head: () =>
    seoHead({
      locale: "es",
      path: "/architecture",
      title: `Arquitectura — Próximamente | ${SITE.name}`,
      description: "AVEL Arquitectura: diseño y gerencia de proyectos en Colombia. Muy pronto.",
      noindex: true,
    }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <main
      id="main"
      className="flex min-h-[70vh] items-center justify-center bg-abyss px-6 pt-32 pb-24"
    >
      <h1 className="type-hero text-bone">Próximamente</h1>
    </main>
  );
}
