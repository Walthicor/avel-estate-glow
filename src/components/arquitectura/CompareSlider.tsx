import { useRef, useState } from "react";

export function CompareSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const modes: [string, number][] = [["Boceto", 100], ["Mitad", 50], ["Foto", 0]];

  return (
    <div>
      <div className="mb-4 flex justify-center gap-2" role="group" aria-label="Vista del comparador">
        {modes.map(([label, v]) => (
          <button
            key={label}
            type="button"
            aria-pressed={Math.round(pos) === v}
            onClick={() => setPos(v)}
            className={`arq-mono rounded-full border px-4 py-2 text-[11px] transition ${
              Math.round(pos) === v ? "border-oro bg-oro text-obra" : "border-hueso/25 text-hueso/80 hover:border-oro"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="relative aspect-[3/2] w-full touch-none select-none overflow-hidden rounded-[4px]"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img src={after} alt={afterAlt} loading="lazy" width={1440} height={960} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <img
          src={before}
          alt={beforeAlt}
          loading="lazy"
          width={1440}
          height={960}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <span className="arq-mono absolute left-3 top-3 rounded-full bg-obra/80 px-3 py-1 text-[10px] text-hueso">Boceto</span>
        <span className="arq-mono absolute right-3 top-3 rounded-full bg-obra/80 px-3 py-1 text-[10px] text-hueso">Obra entregada</span>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-[2px] bg-oro" />
          <div className="absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-oro bg-obra text-oro">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Desliza para comparar boceto y obra entregada"
          className="absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
