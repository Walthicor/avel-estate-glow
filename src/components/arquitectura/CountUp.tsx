import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const fmt = new Intl.NumberFormat("es-CO");

/** Cuenta de 0 al valor al entrar en pantalla, formato colombiano (13.063). */
export function CountUp({ value, duration = 1.8, className = "" }: { value: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const c = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={fmt.format(value)}>
      {fmt.format(n)}
    </span>
  );
}
