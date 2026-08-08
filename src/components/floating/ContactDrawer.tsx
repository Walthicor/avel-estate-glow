import { useEffect, useRef, useState, type FormEvent } from "react";

import { useLocale } from "../../i18n/LocaleProvider";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ContactDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  };

  const inputClass =
    "w-full bg-transparent hairline px-3 py-2.5 text-[15px] text-bone placeholder:text-slate focus:border-gold focus:outline-none";

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

        {status === "sent" ? (
          <p className="type-body px-6 pb-8 text-sage">{t("form.success")}</p>
        ) : (
          <form className="flex flex-col gap-4 px-6 pb-10" onSubmit={onSubmit}>
            <label className="flex flex-col gap-2">
              <span className="type-label text-sage">{t("form.name")}</span>
              <input required name="name" className={inputClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="type-label text-sage">{t("form.email")}</span>
              <input required type="email" name="email" className={inputClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="type-label text-sage">{t("form.message")}</span>
              <textarea name="message" rows={4} className={inputClass} />
            </label>
            <button type="submit" className="btn-gold mt-2" disabled={status === "sending"}>
              {status === "sending" ? t("form.sending") : t("btn.sendEnquiry")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
