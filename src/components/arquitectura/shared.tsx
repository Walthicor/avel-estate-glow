import type { ReactNode } from "react";

import { SITE } from "../../config/site";
import { trackEvent } from "../../lib/analytics";
import { MaskWords } from "./motion";

export type Prefill = {
  nonce: number;
  services?: string[];
  packages?: string[];
  projectType?: string;
  residence?: string;
  /** Marca opciones sin mover el cotizador de paso (anuncio ?servicio=). */
  keepStep?: boolean;
  calc?: { lot: string; predio: "urbano" | "rural"; floors: string; build: string; finishes: "medios" | "alta" };
};

export type GoQuote = (p?: Omit<Prefill, "nonce">) => void;

export const waLink = (text?: string) =>
  SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : "";

/** Rótulo tipo plano: "(01) — EL PROBLEMA". */
export function Rotulo({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`arq-mono text-[12px] ${light ? "text-oro-ink" : "text-oro"}`}>{children}</p>
  );
}

/** Título con una palabra clave en dorado: pasa el título y la palabra a resaltar. */
export function ArqTitle({
  text,
  gold,
  light = false,
  as: Tag = "h2",
  className = "",
}: {
  text: string;
  gold: string;
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  const goldCls = light ? "text-oro-ink" : "text-oro";
  return (
    <Tag className={`arq-display ${className}`}>
      <MaskWords text={text} gold={gold} goldCls={goldCls} />
    </Tag>
  );
}

/** WhatsApp click: reports "Contact" to the measurement tags. */
export const onWaClick = () => trackEvent("Contact", { canal: "whatsapp" });

export const btnGold =
  "avel-pulse inline-flex items-center justify-center gap-2 rounded-full bg-oro px-7 py-4 arq-body text-[15px] font-medium text-obra transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oro";
export const btnLine =
  "inline-flex items-center justify-center gap-2 rounded-full border border-hueso/40 px-7 py-4 arq-body text-[15px] font-medium text-hueso transition hover:border-oro hover:text-oro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oro";

export function LineIcon({ d, className = "h-7 w-7" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function WaIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
    </svg>
  );
}
