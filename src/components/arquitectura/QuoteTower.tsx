import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import type { GoQuote } from "./shared";

/** Fixed tower-shaped quote button, bottom-right on every screen size.
 *  Appears after 6 s or 25 % scroll; hides while the quote form is on screen. */
export function QuoteTower({ goQuote }: { goQuote: GoQuote }) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 6000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.25) setArmed(true);
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
          aria-label="Cotizar: ir al cotizador"
          className="arq-quote-tower"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="arq-quote-tower__bubble">¿Cuánto cuesta?</span>
          <span className="arq-quote-tower__body avel-pulse">
            <span className="arq-quote-tower__sheen" aria-hidden="true" />
            <span className="arq-quote-tower__win" aria-hidden="true" />
            <span className="arq-quote-tower__win" aria-hidden="true" />
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
