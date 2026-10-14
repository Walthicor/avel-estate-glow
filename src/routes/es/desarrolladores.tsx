import { createFileRoute } from "@tanstack/react-router";

import { DevelopersPage } from "../../components/developers/DevelopersPage";
import { getDevelopersMedia } from "../../lib/developers.functions";
import { developersHead } from "../../lib/developers-head";

export const Route = createFileRoute("/es/desarrolladores")({
  loader: () => getDevelopersMedia(),
  head: ({ loaderData }) => developersHead("es", loaderData?.heroPhoto),
  component: () => {
    const d = Route.useLoaderData();
    return <DevelopersPage locale="es" {...d} />;
  },
});
