import { useLocale } from "../../i18n/LocaleProvider";
import type { Locale } from "../../config/site";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, switchLocale } = useLocale();

  return (
    <div className={`flex items-center ${className}`}>
      {LOCALES.map((item, i) => (
        <span key={item.code} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-2 h-3 w-px bg-sage/40" />}
          <button
            type="button"
            onClick={() => switchLocale(item.code)}
            aria-current={locale === item.code ? "true" : undefined}
            className={`type-label transition-colors duration-300 ${
              locale === item.code ? "text-gold" : "text-sage hover:text-bone"
            }`}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
}
