import { createServerFn } from "@tanstack/react-start";

import { CASE_SLUGS, HERO_SLUG } from "../content/developers";
import { listProjects } from "./projects.functions";

/** Hero photo + case-study photos for the developers page, from the projects table. */
export const getDevelopersMedia = createServerFn({ method: "GET" }).handler(async () => {
  const projects = await listProjects();
  const cases: Record<string, { photo: string | null; exists: boolean }> = {};
  for (const slug of CASE_SLUGS) {
    const p = projects.find((x) => x.slug === slug);
    cases[slug] = { photo: p?.main_photo ?? p?.gallery[0] ?? null, exists: !!p };
  }
  const hero = projects.find((x) => x.slug === HERO_SLUG);
  return { heroPhoto: hero?.main_photo ?? null, cases };
});
