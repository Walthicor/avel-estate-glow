import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Item = { id: string; name: string; image: string; href?: string };

/** Lista numerada con nombres enormes y miniatura que sigue al cursor (escritorio). */
export function ProjectIndexList({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const current = items.find((i) => i.id === hover);

  return (
    <div className="relative" onMouseMove={(e) => setPt({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setHover(null)}>
      <ol>
        {items.map((it, i) => (
          <li key={it.id} className="border-b border-current/20">
            <a
              href={it.href ?? "#"}
              onMouseEnter={() => setHover(it.id)}
              onFocus={() => setHover(null)}
              className="group flex items-baseline gap-6 py-5 md:py-7"
            >
              <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`font-display leading-none md:transition-transform md:duration-300 ${reduce ? "" : "md:group-hover:translate-x-3"}`}
                style={{ fontSize: "clamp(36px, 7vw, 104px)" }}
              >
                {it.name}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <AnimatePresence>
        {current && (
          <motion.img
            key={current.id}
            src={current.image}
            alt=""
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-50 hidden h-48 w-64 object-cover md:block"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, x: pt.x + 24, y: pt.y - 96 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.9 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
