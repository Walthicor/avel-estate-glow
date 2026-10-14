import { createFileRoute } from "@tanstack/react-router";

import { DevelopersPage } from "../components/developers/DevelopersPage";
import { getDevelopersMedia } from "../lib/developers.functions";
import { developersHead } from "../lib/developers-head";

export const Route = createFileRoute("/developers")({
  loader: () => getDevelopersMedia(),
  head: ({ loaderData }) => developersHead("en", loaderData?.heroPhoto),
  component: () => {
    const d = Route.useLoaderData();
    return <DevelopersPage locale="en" {...d} />;
  },
});
