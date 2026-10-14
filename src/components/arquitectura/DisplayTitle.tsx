import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Usa "\n" para separar líneas. */
  text: string;
  count?: number | string;
  as?: "h1" | "h2";
  className?: string;
};

/** Título enorme con revelado por máscara línea por línea. */
export function DisplayTitle({ text, count, as = "h2", className = "" }: Props) {
  const reduce = useReducedMotion();
  const Tag = as;
  const lines = text.split("\n");
  const c = count === undefined ? null : typeof count === "number" ? String(count).padStart(2, "0") : count;

  return (
    <motion.span
      className="block"
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
    <Tag
      className={`font-display leading-[0.88] tracking-tight ${className}`}
      style={{ fontSize: "clamp(56px, 11vw, 160px)" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
            {c && i === lines.length - 1 && (
              <sup className="ml-2 align-super font-mono text-[0.14em] font-normal tracking-normal">
                ({c})
              </sup>
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
    </motion.span>
  );
}
