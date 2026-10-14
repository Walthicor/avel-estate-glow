type Item = { id: string; label: string; count: number };
type Props = { items: Item[]; active: string; onChange: (id: string) => void; className?: string };

/** Pastillas de filtro con contador ("Residencial 04"). */
export function FilterPills({ items, active, onChange, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group" aria-label="Filtrar proyectos">
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(it.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              on ? "border-foreground bg-foreground text-background" : "border-foreground/30 hover:border-foreground"
            }`}
          >
            {it.label}{" "}
            <span className="ml-1 font-mono text-[10px] opacity-70">{String(it.count).padStart(2, "0")}</span>
          </button>
        );
      })}
    </div>
  );
}
