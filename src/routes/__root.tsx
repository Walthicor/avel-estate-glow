import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SITE } from "../config/site";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LocaleProvider } from "../i18n/LocaleProvider";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { TowerContactButton } from "../components/floating/TowerContactButton";
import { BackToTopButton } from "../components/floating/BackToTopButton";
import { CookieBanner } from "../components/consent/CookieBanner";
import { SkipLink } from "../components/layout/SkipLink";

function NotFoundComponent() {
  const isEs = typeof window !== "undefined" && window.location.pathname.startsWith("/es");

  return (
    <div className="flex min-h-dvh items-center bg-abyss px-6 py-32 md:px-12">
      <div className="mx-auto w-full max-w-[1240px]">
        <span className="gold-rule mb-8 block" />
        <p className="type-label text-sage">404</p>
        <h1 className="type-hero mt-4 max-w-[16ch] text-bone">
          {isEs ? "Esta página siguió su camino." : "This page moved on."}
        </h1>
        <p className="type-body mt-6 max-w-[46ch] text-sage">
          {isEs
            ? "El enlace ya no existe. Las propiedades siguen aquí."
            : "The link no longer exists. The properties are still here."}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={isEs ? "/es/propiedades" : "/properties"} className="btn-gold">
            {isEs ? "Ver propiedades" : "View properties"}
          </a>
          <a href={isEs ? "/es" : "/"} className="btn-ghost">
            {isEs ? "Ir al inicio" : "Go home"}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — Luxury Colombian Real Estate` },
      {
        name: "description",
        content:
          "Curated luxury homes and investment property in Colombia for international buyers.",
      },
      { property: "og:title", content: `${SITE.name} — Luxury Colombian Real Estate` },
      {
        property: "og:description",
        content:
          "Curated luxury homes and investment property in Colombia for international buyers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Bodoni Moda 400 (latin) renders above the fold — preload the exact file.
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
        href: "https://fonts.gstatic.com/s/bodonimoda/v28/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oU7a8Id4tA.woff2",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;600&family=Source+Sans+3:wght@300;400;600&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // The architecture landing is an ad destination with its own minimal chrome.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = pathname.replace(/\/$/, "") === "/es/arquitectura";

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <SkipLink />
        {bare ? null : <Header />}
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        {bare ? null : (
          <>
            <Footer />
            <TowerContactButton />
            <BackToTopButton />
          </>
        )}
        <CookieBanner />
      </LocaleProvider>
    </QueryClientProvider>
  );
}
