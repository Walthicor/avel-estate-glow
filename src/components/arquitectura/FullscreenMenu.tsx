import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type LinkItem = { label: string; href: string };

/** Botón hamburguesa + menú a pantalla completa con enlaces gigantes escalonados. */
export function FullscreenMenu({ links, className = "" }: { links: LinkItem[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      btn.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((o) => !o)}
        className={`relative z-[101] flex h-12 w-12 items-center justify-center rounded-full bg-abyss text-paper ${className}`}
      >
        <span className="relative block h-3 w-5" aria-hidden="true">
          <span className={`absolute left-0 h-px w-5 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 h-px w-5 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-[100] flex flex-col justify-center bg-abyss px-6 text-paper md:px-16"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-display leading-[1] hover:text-gold"
                    style={{ fontSize: "clamp(44px, 9vw, 128px)" }}
                    initial={reduce ? false : { y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
