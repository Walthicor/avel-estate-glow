import { useEffect, useRef, useState } from "react";

import { useLocale } from "../../i18n/LocaleProvider";
import {
  applyConsent,
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentRecord,
} from "../../lib/consent";
import { LEGAL_PATHS } from "../../content/legal";

export function CookieBanner() {
  const { t, localePath } = useLocale();
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      applyConsent(existing);
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    } else {
      setVisible(true);
      // 1.2s delay so the bar does not compete with the hero.
      timers.current.push(window.setTimeout(() => setEntered(true), 1200));
    }

    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setVisible(true);
      setPanelOpen(true);
      timers.current.push(window.setTimeout(() => setEntered(true), 20));
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);

    const sync = (e: Event) => {
      const detail = (e as CustomEvent<ConsentRecord>).detail;
      if (detail) applyConsent(detail);
    };
    window.addEventListener(CONSENT_EVENT, sync);

    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
      window.removeEventListener(CONSENT_EVENT, sync);
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (visible) document.body.dataset["cookiebar"] = "open";
    else delete document.body.dataset["cookiebar"];
    return () => {
      delete document.body.dataset["cookiebar"];
    };
  }, [visible]);

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    writeConsent(choice);
    setEntered(false);
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        setPanelOpen(false);
      }, 480),
    );
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t("cookie.regionLabel")}
      className={`avel-cookiebar fixed inset-x-0 bottom-0 z-[95] border-t border-sage/25 bg-deep/90 backdrop-blur-lg ${
        entered ? "is-in" : ""
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-5 md:px-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="type-body max-w-[62ch] text-bone/85">
            {t("cookie.text")}{" "}
            <a
              href={localePath(LEGAL_PATHS.cookies)}
              className="text-gold underline-offset-4 hover:underline"
            >
              {t("cookie.readPolicy")}
            </a>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="btn-gold"
              onClick={() => decide({ analytics: true, marketing: true })}
            >
              {t("cookie.acceptAll")}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => decide({ analytics: false, marketing: false })}
            >
              {t("cookie.essentialOnly")}
            </button>
            <button
              type="button"
              className="type-label text-sage underline-offset-4 transition-colors duration-300 hover:text-bone hover:underline"
              aria-expanded={panelOpen}
              onClick={() => setPanelOpen((v) => !v)}
            >
              {t("cookie.manage")}
            </button>
          </div>
        </div>

        {panelOpen ? (
          <div className="mt-6 border-t border-sage/20 pt-6">
            <h2 className="type-label text-bone">{t("cookie.panelTitle")}</h2>
            <div className="mt-5 grid gap-px sm:grid-cols-3">
              <Toggle
                title={t("cookie.essential")}
                description={t("cookie.essentialDesc")}
                checked
                locked
                lockedLabel={t("cookie.alwaysOn")}
              />
              <Toggle
                title={t("cookie.analytics")}
                description={t("cookie.analyticsDesc")}
                checked={analytics}
                onChange={setAnalytics}
              />
              <Toggle
                title={t("cookie.marketing")}
                description={t("cookie.marketingDesc")}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => decide({ analytics, marketing })}
              >
                {t("cookie.save")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Toggle({
  title,
  description,
  checked,
  onChange,
  locked,
  lockedLabel,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (next: boolean) => void;
  locked?: boolean;
  lockedLabel?: string;
}) {
  return (
    <div className="border border-sage/20 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="type-label text-bone">{title}</p>
        {locked ? (
          <span className="type-label text-gold">{lockedLabel}</span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={title}
            onClick={() => onChange?.(!checked)}
            className={`relative h-[22px] w-[42px] shrink-0 border transition-colors duration-300 ${
              checked ? "border-gold bg-gold/25" : "border-sage/40 bg-abyss"
            }`}
          >
            <span
              className={`absolute top-[2px] block h-[16px] w-[16px] transition-all duration-300 ${
                checked ? "left-[22px] bg-gold" : "left-[2px] bg-sage"
              }`}
            />
          </button>
        )}
      </div>
      <p className="type-body mt-3 text-sage">{description}</p>
    </div>
  );
}
