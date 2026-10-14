import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Words of a title, each rising from behind a mask. `gold` words are tinted. */
export function MaskWords({ text, gold, goldCls, delay = 0, onMount = false, duration = 0.8 }: {
  text: string; gold: string; goldCls: string; delay?: number; onMount?: boolean; duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = onMount || inView;
  const gi = text.indexOf(gold);
  const parts = gi < 0
    ? [{ t: text, g: false }]
    : [{ t: text.slice(0, gi), g: false }, { t: gold, g: true }, { t: text.slice(gi + gold.length), g: false }];
  const words = parts.flatMap((p) => p.t.split(/(\s+)/).filter(Boolean).map((w) => ({ w, g: p.g })));
  let n = 0;
  return (
    <span ref={ref}>
      {words.map((x, i) => {
        if (/^\s+$/.test(x.w)) return <span key={i}> </span>;
        const k = n++;
        const cls = x.g ? goldCls : "";
        if (reduce) return <span key={i} className={cls}>{x.w}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${cls}`}
              initial={{ y: "110%" }}
              animate={show ? { y: "0%" } : { y: "110%" }}
              transition={{ duration, ease: EASE, delay: delay + k * 0.06 }}
            >
              {x.w}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/** Fade + lift, once on mount (hero buttons). */
export function RiseIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

const fmt = (n: number, plain?: boolean | undefined) => (plain ? String(Math.round(n)) : Math.round(n).toLocaleString("es-CO"));

/** Counts from 0 to `to` when it enters the screen, Colombian format. */
export function CountUp({ to, prefix = "", suffix = "", plain }: { to: number; prefix?: string | undefined; suffix?: string | undefined; plain?: boolean | undefined }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [v, setV] = useState(to);
  useEffect(() => {
    if (reduce || !inView) return;
    const c = animate(plain ? Math.max(0, to - 40) : 0, to, { duration: 1.6, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, reduce, to, plain]);
  // Before entering view (after hydration) show 0 so the count is visible.
  const shown = !reduce && !inView ? (plain ? to - 40 : 0) : v;
  return <span ref={ref}>{prefix}{fmt(shown, plain)}{suffix}</span>;
}

/** Rolls a number to its new value whenever it changes. */
export function useRolling(target: number) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(target);
  const last = useRef(target);
  useEffect(() => {
    if (reduce) { setV(target); last.current = target; return; }
    const c = animate(last.current, target, { duration: 0.6, ease: EASE, onUpdate: (x) => { last.current = x; setV(x); } });
    return () => c.stop();
  }, [target, reduce]);
  return v;
}

/** Line icon whose stroke draws in when it appears. */
export function DrawIcon({ d, className = "h-7 w-7" }: { d: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {reduce ? <path d={d} /> : (
        <motion.path d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.15 }} />
      )}
    </svg>
  );
}
