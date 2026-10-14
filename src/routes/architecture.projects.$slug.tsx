import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/architecture/projects/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/es/arquitectura", statusCode: 301 });
  },
});
