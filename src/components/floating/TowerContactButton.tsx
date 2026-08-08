import { useState } from "react";

import { useLocale } from "../../i18n/LocaleProvider";
import { ContactDrawer } from "./ContactDrawer";

export function TowerContactButton() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="avel-tower avel-float avel-float--right"
        aria-label={locale === "es" ? "Abrir formulario de contacto" : "Open contact form"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="avel-tower__glow" aria-hidden="true" />
        <span className="avel-tower__body">
          <span className="avel-tower__sheen" aria-hidden="true" />
          <svg
            className="avel-tower__icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2.5" y="5" width="19" height="14" />
            <path d="m2.5 6.5 9.5 7 9.5-7" />
          </svg>
        </span>
        <span className="avel-tower__label">{locale === "es" ? "Contacto" : "Contact"}</span>
      </button>

      <ContactDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
