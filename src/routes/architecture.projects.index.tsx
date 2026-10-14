import { createFileRoute } from "@tanstack/react-router";

import { ProjectsIndexPage } from "../components/arquitectura/ProjectsIndexPage";
import { listProjects } from "../lib/projects.functions";
import { projectsIndexHead } from "../lib/project-head";

export const Route = createFileRoute("/architecture/projects/")({
  loader: () => listProjects(),
  head: () => projectsIndexHead("en"),
  component: () => <ProjectsIndexPage projects={Route.useLoaderData()} locale="en" />,
});
