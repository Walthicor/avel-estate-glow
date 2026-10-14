import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";

import { DIAL_CODES } from "../../content/contact";
import { BUDGETS, HAS_LOT, PACKAGES, PROJECT_TYPES, RESIDENCE, SERVICES, STAGES } from "../../content/arquitectura";
import { EMAIL_RE, readLeadContext } from "../../lib/lead-schema";
import { submitLead } from "../../lib/leads.functions";
import { trackLeadConversion } from "../../lib/analytics";
import { firstFloorMax, investmentRange, totalPossibleArea, type Acabados, type Predio } from "../../lib/quote-math";
import { inputCls, labelCls, Seg } from "./Calculator";
import { btnGold, btnLine, waLink, WaIcon, type Prefill } from "./shared";

const KEY = "avel-arq-quote-v1";
const STEP_NAMES = ["Tipo de proyecto", "Servicios y etapa", "Lugar y área", "Contacto"];

type Form = {
  projectType: string; hasLot: string; services: string[]; packages: string[]; stage: string;
  place: string; lot: string; predio: Predio; floors: string; build: string; terrain: string; finishes: Acabados; budget: string;
  name: string; dial: string; phone: string; email: string; residence: string; consent: boolean;
};
const EMPTY: Form = {
  projectType: "", hasLot: "", services: [], packages: [], stage: "", place: "", lot: "", predio: "urbano", floors: "1", build: "",
  terrain: "Plano", finishes: "medios", budget: "", name: "", dial: "+57", phone: "", email: "", residence: "", consent: false,
};

export function QuoteForm({ prefill }: { prefill: Prefill | null }) {
  const send = useServerFn(submitLead);
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { f: Form; step: number };
        setF({ ...EMPTY, ...saved.f, consent: false });
        setStep(Math.min(3, Math.max(0, saved.step ?? 0)));
      }
    } catch { /* borrador dañado: se ignora */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded && status !== "sent") localStorage.setItem(KEY, JSON.stringify({ f, step }));
  }, [f, step, loaded, status]);

  useEffect(() => {
    if (!prefill) return;
    setF((cur) => {
      const next = { ...cur };
      if (prefill.services) next.services = Array.from(new Set([...cur.services, ...prefill.services]));
      if (prefill.packages) next.packages = Array.from(new Set([...cur.packages, ...prefill.packages]));
      if (prefill.projectType) next.projectType = prefill.projectType;
      if (prefill.calc) Object.assign(next, { lot: prefill.calc.lot, predio: prefill.calc.predio, floors: prefill.calc.floors, build: prefill.calc.build, finishes: prefill.calc.finishes });
      return next;
    });
    if (prefill.services || prefill.packages) setStep(1);
    else if (prefill.calc) setStep(0);
  }, [prefill]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((c) => ({ ...c, [k]: v }));
  const toggle = (k: "services" | "packages", v: string) =>
    setF((c) => ({ ...c, [k]: c[k].includes(v) ? c[k].filter((x) => x !== v) : [...c[k], v] }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    const req = "Este dato es necesario";
    if (s === 0) { if (!f.projectType) e.projectType = req; if (!f.hasLot) e.hasLot = req; }
    if (s === 1) { if (!f.services.length && !f.packages.length) e.services = "Elige al menos un servicio o paquete"; if (!f.stage) e.stage = req; }
    if (s === 2) { if (!f.place.trim()) e.place = req; }
    if (s === 3) {
      if (!f.name.trim()) e.name = req;
      if (!f.phone.trim()) e.phone = req;
      if (!EMAIL_RE.test(f.email.trim())) e.email = "Escribe un correo válido";
      if (!f.residence) e.residence = req;
      if (!f.consent) e.consent = "Debes aceptar la política para continuar";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const lotN = Number(f.lot) || 0;
  const total = totalPossibleArea({ lotAreaM2: lotN, predio: f.predio, floors: Number(f.floors) || 1, buildAreaM2: Number(f.build) || undefined });
  const range = investmentRange(total, f.finishes);

  const submit = async () => {
    if (!validate(3)) return;
    setStatus("sending");
    const ctx = readLeadContext();
    try {
      await send({
        data: {
          ...ctx,
          form_type: "quote",
          name: f.name.trim(),
          email: f.email.trim(),
          phone: `${f.dial} ${f.phone.trim()}`,
          country: f.residence,
          budget: f.budget || undefined,
          locale: "es",
          habeas_consent: true,
          quote: {
            project_type: f.projectType, has_lot: f.hasLot,
            services: f.services.map((id) => SERVICES.find((s) => s.id === id)?.name ?? id),
            packages: f.packages.map((id) => PACKAGES.find((p) => p.id === id)?.name ?? id),
            stage: f.stage, place: f.place.trim(), lot_area_m2: lotN || null, predio: f.predio,
            floors: Number(f.floors) || null, build_area_m2: Number(f.build) || null, terrain: f.terrain,
            finishes: f.finishes, budget: f.budget, residence: f.residence,
            estimate: { first_floor_m2: firstFloorMax(lotN, f.predio), total_m2: total, min_cop: range.min, max_cop: range.max },
            gclid: ctx.gclid, fbclid: ctx.fbclid,
          },
        },
      });
      trackLeadConversion();
      localStorage.removeItem(KEY);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const summary = `Hola AVEL Arquitectura, soy ${f.name.trim()}. Quiero cotizar: ${f.projectType} en ${f.place.trim()}${lotN ? `, lote de ${lotN} m²` : ""}${f.floors ? `, ${f.floors} piso(s)` : ""}. Servicios: ${[
    ...f.packages.map((id) => PACKAGES.find((p) => p.id === id)?.name ?? id),
    ...f.services.map((id) => SERVICES.find((s) => s.id === id)?.name ?? id),
  ].join(", ")}.`;

  return (
    <section id="cotizar" className="scroll-mt-16 bg-obra px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="arq-mono text-[12px] text-oro">(11) — Cotización · Paso {step + 1} de 4</p>
          <h2 className="arq-display mt-4 text-[clamp(40px,7vw,96px)] text-hueso">Cotiza tu <span className="text-oro">proyecto</span></h2>
          <p className="arq-body mt-6 max-w-[42ch] text-[17px] leading-relaxed text-hueso/75">
            Cuatro pasos, unos tres minutos. Con esta información preparamos una propuesta con alcance, tiempos y honorarios.
          </p>
          <div className="mt-8 h-[2px] w-full bg-hueso/10" aria-hidden="true">
            <div className="h-full bg-oro transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${status === "sent" ? 100 : ((step + 1) / 4) * 100}%` }} />
          </div>
          <ol className="mt-6 grid gap-3">
            {STEP_NAMES.map((s, i) => (
              <li key={s} className={`arq-mono text-[12px] ${i === step ? "text-hueso" : "text-hueso/45"}`}>0{i + 1} · {s}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-[4px] border border-hueso/10 bg-carbon p-6 md:p-10">
          {status === "sent" ? (
            <div role="status" aria-live="polite">
              <p className="arq-display text-[clamp(26px,3.5vw,40px)] text-hueso">Recibimos tu información.</p>
              <p className="arq-body mt-4 text-[17px] text-hueso/80">Te escribimos por WhatsApp en menos de 24 horas hábiles.</p>
              {waLink() ? (
                <a href={waLink(summary)} target="_blank" rel="noreferrer" className={`${btnGold} mt-8`}><WaIcon /> Escribir por WhatsApp</a>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-7">
              {step === 0 ? (
                <>
                  <Choices label="Tipo de proyecto" options={PROJECT_TYPES} value={f.projectType} onPick={(v) => set("projectType", v)} error={errors.projectType} />
                  <Choices label="¿Ya tienes el lote?" options={HAS_LOT} value={f.hasLot} onPick={(v) => set("hasLot", v)} error={errors.hasLot} />
                </>
              ) : null}
              {step === 1 ? (
                <>
                  <fieldset>
                    <legend className={labelCls}>Paquetes</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {PACKAGES.map((p) => <Check key={p.id} on={f.packages.includes(p.id)} onClick={() => toggle("packages", p.id)}>{p.name}</Check>)}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className={labelCls}>Servicios</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SERVICES.map((s) => <Check key={s.id} on={f.services.includes(s.id)} onClick={() => toggle("services", s.id)}>{s.name}</Check>)}
                    </div>
                    <Err msg={errors.services} />
                  </fieldset>
                  <Choices label="Etapa" options={STAGES} value={f.stage} onPick={(v) => set("stage", v)} error={errors.stage} />
                </>
              ) : null}
              {step === 2 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="q-place" className={labelCls}>Ciudad o municipio</label>
                    <input id="q-place" value={f.place} onChange={(e) => set("place", e.target.value)} className={inputCls} aria-invalid={!!errors.place} />
                    <Err msg={errors.place} />
                  </div>
                  <div>
                    <label htmlFor="q-lot" className={labelCls}>Área del lote (m²)</label>
                    <input id="q-lot" type="number" inputMode="decimal" value={f.lot} onChange={(e) => set("lot", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="q-floors" className={labelCls}>Pisos</label>
                    <input id="q-floors" type="number" inputMode="numeric" min={1} value={f.floors} onChange={(e) => set("floors", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <span className={labelCls}>Tipo de predio</span>
                    <Seg label="Tipo de predio" value={f.predio} onChange={(v) => set("predio", v)} options={[["urbano", "Urbano"], ["rural", "Rural"]]} />
                  </div>
                  <div>
                    <span className={labelCls}>Terreno</span>
                    <Seg label="Terreno" value={f.terrain as "Plano" | "Inclinado"} onChange={(v) => set("terrain", v)} options={[["Plano", "Plano"], ["Inclinado", "Inclinado"]]} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="q-budget" className={labelCls}>Presupuesto aproximado</label>
                    <select id="q-budget" value={f.budget} onChange={(e) => set("budget", e.target.value)} className={inputCls}>
                      <option value="">Selecciona un rango</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              ) : null}
              {step === 3 ? (
                <div className="grid gap-5">
                  <div>
                    <label htmlFor="q-name" className={labelCls}>Nombre</label>
                    <input id="q-name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} className={inputCls} aria-invalid={!!errors.name} />
                    <Err msg={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="q-phone" className={labelCls}>WhatsApp</label>
                    <div className="flex gap-2">
                      <select aria-label="Indicativo de país" value={f.dial} onChange={(e) => set("dial", e.target.value)} className={`${inputCls} w-[130px] shrink-0`}>
                        {DIAL_CODES.map((c) => <option key={c.label} value={c.code}>{c.label}</option>)}
                      </select>
                      <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel-national" value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} aria-invalid={!!errors.phone} />
                    </div>
                    <Err msg={errors.phone} />
                  </div>
                  <div>
                    <label htmlFor="q-email" className={labelCls}>Correo</label>
                    <input id="q-email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} className={inputCls} aria-invalid={!!errors.email} />
                    <Err msg={errors.email} />
                  </div>
                  <Choices label="¿Vives en Colombia o en el exterior?" options={RESIDENCE} value={f.residence} onPick={(v) => set("residence", v)} error={errors.residence} />
                  <div>
                    <label className="flex items-start gap-3 arq-body text-[14px] leading-relaxed text-hueso/80">
                      <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[#c8a465]" aria-invalid={!!errors.consent} />
                      <span>Acepto la <a href="/es/legal/habeas-data" target="_blank" className="text-gold underline underline-offset-4">política de tratamiento de datos</a>.</span>
                    </label>
                    <Err msg={errors.consent} />
                  </div>
                  <div className="border-t border-hueso/10 pt-5 arq-body text-[14px] leading-relaxed text-hueso/70">
                    <p className="text-oro">Tu primer análisis del lote no tiene costo.</p>
                    <p className="mt-1">Cada mes tomamos un número limitado de proyectos nuevos para cumplir los tiempos que prometemos.</p>
                  </div>
                </div>
              ) : null}

              {status === "error" ? <p role="alert" className="arq-body text-[14px] text-[#ff8a7a]">No pudimos enviar tu información. Revisa tu conexión e inténtalo de nuevo.</p> : null}

              <div className="flex flex-wrap items-center gap-3">
                {step < 3 ? (
                  <button type="button" className={btnGold} onClick={() => validate(step) && setStep(step + 1)}>Continuar</button>
                ) : (
                  <button type="button" className={btnGold} disabled={status === "sending"} onClick={submit}>
                    {status === "sending" ? "Enviando…" : "Recibir mi cotización"}
                  </button>
                )}
                {step > 0 ? <button type="button" className={btnLine} onClick={() => setStep(step - 1)}>Atrás</button> : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Err({ msg }: { msg?: string | undefined }) {
  return <p aria-live="polite" className="arq-body mt-2 min-h-[1em] text-[13px] text-[#ff8a7a]">{msg ?? ""}</p>;
}

function Check({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" role="checkbox" aria-checked={on} onClick={onClick}
      className={`flex items-center gap-3 rounded-[4px] border px-4 py-3 text-left arq-body text-[15px] transition ${on ? "border-oro bg-oro/10 text-hueso" : "border-hueso/15 text-hueso/85 hover:border-oro/60"}`}>
      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border ${on ? "border-oro bg-oro text-obra" : "border-hueso/40"}`} aria-hidden="true">{on ? "✓" : ""}</span>
      {children}
    </button>
  );
}

function Choices({ label, options, value, onPick, error }: { label: string; options: string[]; value: string; onPick: (v: string) => void; error?: string | undefined }) {
  return (
    <fieldset>
      <legend className={labelCls}>{label}</legend>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onPick(o)}
            className={`rounded-full border px-4 py-2.5 arq-body text-[15px] transition ${value === o ? "border-oro bg-oro text-obra" : "border-hueso/20 text-hueso hover:border-oro"}`}>
            {o}
          </button>
        ))}
      </div>
      <Err msg={error} />
    </fieldset>
  );
}
