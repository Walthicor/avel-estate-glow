import { useEffect, useRef } from "react";

import { MAIN_NAV } from "../../config/nav";
import { useLocale } from "../../i18n/LocaleProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  open: boolean;
  onClose: () => void;
  activePath: string;
};

export function MobileMenu({ open, onClose, activePath }: Props) {
  const { t, localePath } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const selector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const first = panel.querySelectorAll<HTMLElement>(selector)[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const firstEl = items[0]!;
      const lastEl = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.menu")}
      className="fixed inset-0 z-50 flex flex-col bg-abyss lg:hidden"
    >
      <span aria-hidden="true" className="gold-line-draw h-px w-full bg-gold" />

      <div className="flex h-[84px] items-center justify-end px-6">
        <button
          type="button"
          onClick={onClose}
          className="type-label text-sage transition-colors hover:text-bone"
        >
          {t("nav.close")}
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-6">
        {MAIN_NAV.map((item, i) => {
          const href = localePath(item.path);
          const isActive = activePath === item.path;
          return (
            <a
              key={item.path}
              href={href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`menu-item-in type-h2 hairline-b py-6 text-left transition-colors duration-300 ${
                isActive ? "text-gold" : "text-bone hover:text-gold"
              }`}
            >
              {t(item.key)}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center justify-between px-6 pb-10">
        <LanguageSwitcher />
        <a href={localePath("/contact")} onClick={onClose} className="btn-ghost">
          {t("btn.enquire")}
        </a>
      </div>
    </div>
  );
}
