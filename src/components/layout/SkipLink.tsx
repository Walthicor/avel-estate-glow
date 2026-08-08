import { useLocale } from "../../i18n/LocaleProvider";

/**
 * First focusable element on every page. Hidden until it receives focus,
 * then moves keyboard users straight past the header nav.
 */
export function SkipLink() {
  const { t } = useLocale();

  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main-content");
        if (!main) return;
        main.focus();
        main.scrollIntoView({ block: "start" });
      }}
    >
      {t("nav.skip")}
    </a>
  );
}
