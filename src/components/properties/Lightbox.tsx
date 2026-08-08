import { useCallback, useEffect, useRef } from "react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  labels,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  labels: { close: string; prev: string; next: string; slide: (i: number, n: number) => string };
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        const nodes = panelRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0]!;
        const last = nodes[nodes.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.slide(index + 1, images.length)}
      className="avel-drawer-backdrop fixed inset-0 z-[100] flex flex-col"
    >
      <div ref={panelRef} className="flex h-full flex-col">
        <div className="flex items-center justify-between px-6 py-5">
          <span className="type-label text-sage">{labels.slide(index + 1, images.length)}</span>
          <button type="button" onClick={onClose} className="btn-ghost">
            {labels.close}
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4 pb-10">
          <button
            type="button"
            aria-label={labels.prev}
            onClick={() => go(-1)}
            className="absolute left-4 z-10 grid h-12 w-12 place-items-center border border-gold/40 bg-abyss/60 text-gold transition-colors hover:border-gold"
          >
            ‹
          </button>
          <img
            src={images[index]}
            alt=""
            className="max-h-full max-w-[92vw] object-contain"
            decoding="async"
          />
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => go(1)}
            className="absolute right-4 z-10 grid h-12 w-12 place-items-center border border-gold/40 bg-abyss/60 text-gold transition-colors hover:border-gold"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
