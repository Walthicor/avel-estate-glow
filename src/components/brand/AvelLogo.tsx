/** Placeholder AVEL isotype + wordmark. Swap the SVG when the final logo lands. */
export function AvelLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="26"
        height="24"
        viewBox="0 0 26 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M13 2 24.5 22H1.5L13 2Z" stroke="currentColor" strokeWidth="1" />
        <path d="M13 22 1.5 6h23L13 22Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
      <span className="font-display text-[18px] tracking-[0.22em] uppercase">AVEL</span>
    </span>
  );
}
