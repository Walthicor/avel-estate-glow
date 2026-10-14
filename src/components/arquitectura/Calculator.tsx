import { useState } from "react";

import { firstFloorMax, formatCOP, formatM2, investmentRange, totalPossibleArea, type Acabados, type Predio } from "../../lib/quote-math";
import { ArqTitle, Rotulo, btnGold, type GoQuote } from "./shared";

export const inputCls =
  "w-full rounded-[4px] border border-hueso/20 bg-obra px-4 py-3 arq-body text-[16px] text-hueso placeholder:text-hueso/40 focus:border-oro focus:outline-none";
export const labelCls = "arq-mono mb-2 block text-[11px] text-hueso/70";

export function Seg<T extends string>({ value, options, onChange, label }: { value: T; options: [T, string][]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-2">
      {options.map(([v, l]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={`flex-1 rounded-full border px-4 py-3 arq-body text-[15px] transition ${value === v ? "border-oro bg-oro text-obra" : "border-hueso/20 text-hueso hover:border-oro"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Calculator({ goQuote }: { goQuote: GoQuote }) {
  const [lot, setLot] = useState("200");
  const [predio, setPredio] = useState<Predio>("urbano");
  const [floors, setFloors] = useState("2");
  const [build, setBuild] = useState("");
  const [finishes, setFinishes] = useState<Acabados>("medios");

  const lotN = Number(lot) || 0;
  const first = firstFloorMax(lotN, predio);
  const total = totalPossibleArea({ lotAreaM2: lotN, predio, floors: Number(floors) || 1, buildAreaM2: Number(build) || undefined });
  const range = investmentRange(total, finishes);

  return (
    <section id="calculadora" className="scroll-mt-16 bg-carbon px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1240px] rounded-[4px] border border-oro/60 p-6 md:p-12">
        <Rotulo>(04) — Calculadora</Rotulo>
        <ArqTitle text="¿Cuánto puedes construir en tu lote?" gold="construir" className="mt-4 text-[clamp(32px,5vw,64px)] text-hueso" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="grid gap-5">
            <div>
              <label htmlFor="calc-lot" className={labelCls}>Área del lote (m²)</label>
              <input id="calc-lot" type="number" inputMode="decimal" min={0} value={lot} onChange={(e) => setLot(e.target.value)} className={inputCls} />
            </div>
            <div>
              <span className={labelCls}>Tipo de predio</span>
              <Seg label="Tipo de predio" value={predio} onChange={setPredio} options={[["urbano", "Urbano"], ["rural", "Rural"]]} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="calc-floors" className={labelCls}>Número de pisos</label>
                <input id="calc-floors" type="number" inputMode="numeric" min={1} max={30} value={floors} onChange={(e) => setFloors(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="calc-build" className={labelCls}>m² a construir (opcional)</label>
                <input id="calc-build" type="number" inputMode="decimal" min={0} value={build} onChange={(e) => setBuild(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <span className={labelCls}>Nivel de acabados</span>
              <Seg label="Nivel de acabados" value={finishes} onChange={setFinishes} options={[["medios", "Medios"], ["alta", "Alta gama"]]} />
            </div>
          </div>
          <div className="grid content-start gap-6" aria-live="polite">
            <Result label="Máximo en primer piso" value={formatM2(first)} />
            <Result label="Área total posible" value={formatM2(total)} />
            <Result label="Inversión estimada en obra" value={total > 0 ? `${formatCOP(range.min)} – ${formatCOP(range.max)}` : "—"} small />
            <p className="arq-body text-[13px] leading-relaxed text-hueso/60">
              Estimado de referencia. El dato exacto depende del POT de tu municipio, del terreno y del diseño. No incluye lote, licencias ni IVA.
            </p>
            <button type="button" className={`${btnGold} justify-self-start`} onClick={() => goQuote({ calc: { lot, predio, floors, build, finishes } })}>
              Recibe el análisis completo de tu lote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Result({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="border-b border-hueso/10 pb-5">
      <p className="arq-mono text-[11px] text-hueso/60">{label}</p>
      <p className={`arq-display mt-2 text-oro ${small ? "text-[clamp(22px,3vw,34px)]" : "text-[clamp(36px,5vw,60px)]"}`}>{value}</p>
    </div>
  );
}
