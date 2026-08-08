import { useEffect, useState } from "react";

import { useLocale } from "../i18n/LocaleProvider";
import { toEnglishPath } from "../i18n/routes";
import { useRouterState } from "@tanstack/react-router";

const STORAGE_KEY = "avel:lang-hint-dismissed";

/**
 * Offers the Spanish version to Spanish-speaking browsers on first visit only.
 * Never redirects automatically — crawlers must see the URL they requested.
 */
export function LanguageSuggestionBar() {
  const { locale, t, switchLocale } = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (locale !== "en") return;
    if (toEnglishPath(pathname) !== "/") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const prefersSpanish = navigator.languages?.some((l) => l.toLowerCase().startsWith("es"));
    if (prefersSpanish) setVisible(true);
  }, [locale, pathname]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center gap-4 border-b border-border bg-deep px-4 py-2 text-sm text-bone">
      <span>{t("locale.suggestion")}</span>
      <button
        type="button"
        onClick={() => {
          dismiss();
          switchLocale("es");
        }}
        className="rounded border border-gold px-3 py-1 text-gold transition-colors hover:bg-gold hover:text-abyss"
      >
        {t("locale.switchToSpanish")}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("btn.dismiss")}
        className="text-sage transition-colors hover:text-bone"
      >
        ✕
      </button>
    </div>
  );
}
