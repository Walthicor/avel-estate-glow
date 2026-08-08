import { useEffect, useRef } from "react";

import { useLocale } from "../../i18n/LocaleProvider";
import { ShortLeadForm } from "../forms/ShortLeadForm";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ContactDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="avel-drawer-backdrop absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={locale === "es" ? "Formulario de contacto" : "Contact form"}
        className="avel-drawer absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto border-l border-[rgba(140,164,165,0.18)] bg-deep sm:w-[420px]"
      >
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <p className="type-label text-gold">{t("nav.contact")}</p>
            <h2 className="type-h2 mt-2 text-bone">
              {locale === "es" ? "Hablemos" : "Let's talk"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("nav.close")}
            className="type-label text-sage transition-colors hover:text-gold"
          >
            {t("nav.close")}
          </button>
        </div>

        <div className="px-6 pb-10">
          <ShortLeadForm tone="dark" heading={null} />
        </div>
      </div>
    </div>
  );
}
