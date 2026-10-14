import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = { photo: string; sketch: string; alt: string; className?: string };

const MODES = [
  { label: "Foto", value: 100 },
  { label: "Mitad", value: 50 },
  { label: "Boceto", value: 0 },
] as const;

/** Comparador foto / boceto. `pos` = % de foto visible desde la izquierda. */
export function BeforeAfterSlider({ photo, sketch, alt, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [animate, setAnimate] = useState(false);
  const reduce = useReducedMotion();

  const fromClientX = useCallback((x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setAnimate(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) fromClientX(e.clientX);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    let v: number | null = null;
    if (e.key === "ArrowLeft") v = pos - step;
    if (e.key === "ArrowRight") v = pos + step;
    if (e.key === "Home") v = 0;
    if (e.key === "End") v = 100;
    if (v !== null) {
      e.preventDefault();
      setAnimate(false);
      setPos(Math.min(100, Math.max(0, v)));
    }
  };

  const t = animate && !reduce ? "transition-all duration-500 ease-out" : "";

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden bg-deep"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <img src={sketch} alt={`${alt} — boceto`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <img
          src={photo}
          alt={`${alt} — fotografía`}
          className={`absolute inset-0 h-full w-full object-cover ${t}`}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <div className={`absolute inset-y-0 w-px bg-paper ${t}`} style={{ left: `${pos}%` }}>
          <button
            type="button"
            role="slider"
            aria-label="Comparar fotografía y boceto"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)} % fotografía`}
            onKeyDown={onKey}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-paper font-mono text-sm text-abyss shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {"< >"}
          </button>
        </div>
        <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
          Fotografía ←
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
          → Boceto
        </span>
      </div>
      <div className="absolute right-3 top-3 flex gap-1 rounded-full bg-abyss/70 p-1 backdrop-blur">
        {MODES.map((m) => (
          <button
            key={m.label}
            type="button"
            aria-pressed={Math.round(pos) === m.value}
            onClick={() => {
              setAnimate(true);
              setPos(m.value);
            }}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              Math.round(pos) === m.value ? "bg-paper text-abyss" : "text-paper hover:bg-paper/15"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
