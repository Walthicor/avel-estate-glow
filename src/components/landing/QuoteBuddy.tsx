import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Botón flotante "¡Cotiza aquí!" para las landings de anuncios (no para las
 * páginas oficiales del sitio): globo blanco y personaje amarillo con ojos que
 * parpadean. Aparece a los 6 s o al 25 % de la página y se oculta mientras el
 * bloque del cotizador (por defecto #cotizar) está en pantalla.
 */
export function QuoteBuddy({
  onClick,
  label = "¡Cotiza aquí!",
  targetId = "cotizar",
}: {
  onClick: () => void;
  label?: string;
  targetId?: string;
}) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 6000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.25) setArmed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = document.getElementById(targetId);
    const io = el ? new IntersectionObserver(([e]) => setTargetVisible(!!e?.isIntersecting), { threshold: 0.15 }) : null;
    if (el && io) io.observe(el);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [targetId]);

  const show = armed && !targetVisible;

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={onClick}
          aria-label={`${label} Ir al cotizador`}
          className="lp-buddy"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="lp-buddy__bubble">{label}</span>
          <span className="lp-buddy__face" aria-hidden="true">
            <span className="lp-buddy__eye" />
            <span className="lp-buddy__eye" />
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
