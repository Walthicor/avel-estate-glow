import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProjectPage } from "../components/arquitectura/ProjectPage";
import { getProject } from "../lib/projects.functions";
import { projectHead } from "../lib/project-head";

export const Route = createFileRoute("/architecture/projects/$slug")({
  loader: async ({ params }) => {
    const data = await getProject({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => projectHead(loaderData?.project, params.slug, "en"),
  component: ProjectRoute,
});

function ProjectRoute() {
  const d = Route.useLoaderData();
  return <ProjectPage {...d} locale="en" />;
}
