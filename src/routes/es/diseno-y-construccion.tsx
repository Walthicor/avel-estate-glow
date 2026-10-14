import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/es/diseno-y-construccion")({
  beforeLoad: () => {
    throw redirect({ to: "/es/arquitectura", statusCode: 301 });
  },
});
