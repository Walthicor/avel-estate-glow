import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

import { SITE } from "../../config/site";

/** Burbuja fija "¡Cotiza aquí!" con personaje que parpadea y flota. */
export function QuoteMascot() {
  const reduce = useReducedMotion();
  const wa = SITE.whatsapp;
  return (
    <div
      className="fixed right-4 z-[95] flex flex-col items-end gap-2"
      style={{ bottom: "calc(16px + env(safe-area-inset-bottom))" }}
    >
      <Link to="/es/cotiza" aria-label="Cotiza tu proyecto" className="group flex flex-col items-end gap-2">
        <span className="relative rounded-2xl bg-paper px-3 py-1.5 text-sm font-semibold text-abyss shadow-lg">
          ¡Cotiza aquí!
          <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-paper" aria-hidden="true" />
        </span>
        <motion.span
          className="mr-2 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-gold shadow-lg"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="block h-3 w-2 rounded-full bg-abyss"
              animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 4, times: [0, 0.94, 0.97, 1], repeat: Infinity }}
            />
          ))}
        </motion.span>
      </Link>
      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className="mr-2 rounded-full bg-deep px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper"
        >
          WhatsApp
        </a>
      )}
    </div>
  );
}
