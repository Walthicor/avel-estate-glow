export type ViewMode = "galeria" | "indice";
type Props = { value: ViewMode; onChange: (v: ViewMode) => void };

/** Selector Galería / Índice. */
export function ViewToggle({ value, onChange }: Props) {
  const opt = (v: ViewMode, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      aria-pressed={value === v}
      onClick={() => onChange(v)}
      className={`flex items-center gap-2 border-b pb-1 text-sm transition-colors ${
        value === v ? "border-current" : "border-transparent opacity-60 hover:opacity-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
  return (
    <div className="flex gap-6" role="group" aria-label="Tipo de vista">
      {opt(
        "galeria",
        "Galería",
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <rect width="6" height="6" /><rect x="8" width="6" height="6" /><rect y="8" width="6" height="6" /><rect x="8" y="8" width="6" height="6" />
        </svg>,
      )}
      {opt(
        "indice",
        "Índice",
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <rect y="1" width="14" height="1.5" /><rect y="6" width="14" height="1.5" /><rect y="11" width="14" height="1.5" />
        </svg>,
      )}
    </div>
  );
}
