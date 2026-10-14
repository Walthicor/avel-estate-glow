type Props = { number: number | string; text: string; className?: string };

/** Rótulo "(01) — SOBRE EL PROYECTO". */
export function SectionLabel({ number, text, className = "" }: Props) {
  const n = typeof number === "number" ? String(number).padStart(2, "0") : number;
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.25em] ${className}`}>
      ({n}) — {text}
    </p>
  );
}
