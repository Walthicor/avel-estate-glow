import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import type { GoQuote } from "./shared";

/** Desktop-only floating helper: appears after 8 s or 40 % scroll, hides while the quote form is on screen. */
export function Mascot({ goQuote }: { goQuote: GoQuote }) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 8000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.4) setArmed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = document.getElementById("cotizar");
    const io = el ? new IntersectionObserver(([e]) => setQuoteVisible(!!e?.isIntersecting), { threshold: 0.15 }) : null;
    if (el && io) io.observe(el);
    return () => { window.clearTimeout(t); window.removeEventListener("scroll", onScroll); io?.disconnect(); };
  }, []);

  const show = armed && !quoteVisible;

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={() => goQuote()}
          aria-label="Cotiza aquí: ir al cotizador"
          className="fixed bottom-6 right-6 z-[95] hidden flex-col items-end gap-2 md:flex"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="arq-body relative rounded-[14px] bg-hueso px-4 py-2 text-[14px] font-medium text-obra shadow-lg">
            ¡Cotiza aquí!
            <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-hueso" aria-hidden="true" />
          </span>
          <motion.span
            className="relative mr-2 grid h-16 w-16 place-items-center rounded-full bg-oro shadow-lg"
            animate={reduce ? { y: 0 } : { y: [0, -6, 0] }}
            transition={reduce ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <span className="flex gap-3">
              <span className={`block h-3 w-2 rounded-full bg-obra ${reduce ? "" : "arq-blink"}`} />
              <span className={`block h-3 w-2 rounded-full bg-obra ${reduce ? "" : "arq-blink"}`} />
            </span>
          </motion.span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
