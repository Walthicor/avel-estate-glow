import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { SITE, type Locale } from "../config/site";
import { en, type UIKey } from "./en";
import { es } from "./es";
import { localeFromPath, pathForLocale, toEnglishPath } from "./routes";

const DICTS: Record<Locale, Record<string, string>> = { en, es };

type LocaleContextValue = {
  locale: Locale;
  t: (key: UIKey) => string;
  switchLocale: (next: Locale) => void;
  localePath: (enPath: string, locale?: Locale) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const locale = localeFromPath(pathname);

  const value = useMemo<LocaleContextValue>(() => {
    const t = (key: UIKey) => DICTS[locale][key] ?? DICTS[SITE.defaultLocale][key] ?? key;
    const localePath = (enPath: string, target: Locale = locale) =>
      pathForLocale(enPath, target);
    const switchLocale = (next: Locale) => {
      const target = pathForLocale(toEnglishPath(pathname), next);
      navigate({ to: target as never, search: ((prev: unknown) => prev) as never });
    };
    return { locale, t, switchLocale, localePath };
  }, [locale, pathname, navigate]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Locale-agnostic helper for non-React contexts (route head(), loaders). */
export function translate(locale: Locale, key: UIKey) {
  return DICTS[locale][key] ?? en[key];
}

export { pathForLocale, toEnglishPath, localeFromPath };
export const useLocalePath = () => useLocale().localePath;
export const useT = () => useLocale().t;
export const noop = undefined;
