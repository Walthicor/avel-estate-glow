import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { MAIN_NAV } from "../../config/nav";
import { useLocale } from "../../i18n/LocaleProvider";
import { toEnglishPath } from "../../i18n/routes";
import { AvelLogo } from "../brand/AvelLogo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t, localePath } = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activePath = toEnglishPath(pathname);
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out ${
          condensed ? "hairline-b bg-deep" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-300 ease-out ${
            condensed ? "h-[100px]" : "h-[112px]"
          }`}
        >
          <a
            href={localePath("/")}
            aria-label={t("footer.tagline")}
            className="text-bone transition-colors duration-300 hover:text-gold"
          >
            <AvelLogo />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {MAIN_NAV.map((item) => {
              const isActive =
                activePath === item.path || activePath.startsWith(`${item.path}/`);
              return (
                <a
                  key={item.path}
                  href={localePath(item.path)}
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-underline type-label transition-colors duration-300 ${
                    isActive ? "text-bone" : "text-sage hover:text-bone"
                  }`}
                >
                  {t(item.key)}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            
            <a href={localePath("/contact")} className="btn-ghost hidden sm:inline-flex">
              {t("btn.enquire")}
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              className="type-label text-sage transition-colors hover:text-bone lg:hidden"
            >
              {t("nav.menu")}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activePath={activePath} />
    </>
  );
}
