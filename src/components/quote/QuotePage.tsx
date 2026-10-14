import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SITE } from "../../config/site";
import { QUOTE, QUOTE_OPTIONS, type Option } from "../../content/quote";
import { DIAL_CODES } from "../../content/contact";
import { useLocale } from "../../i18n/LocaleProvider";
import { EMAIL_RE, readLeadContext, type QuoteData } from "../../lib/lead-schema";
import { submitLead } from "../../lib/leads.functions";
import { trackLeadConversion } from "../../lib/analytics";
import {
  firstFloorMax,
  formatCOP,
  formatM2,
  investmentRange,
  totalPossibleArea,
  type Acabados,
  type Predio,
} from "../../lib/quote-math";
import { ChoiceGroup, Field, fieldClass } from "../forms/fields";

const DRAFT_KEY = "avel-quote-draft-v1";
const TONE = "dark" as const;

type Form = {
  projectType: string;
  hasLot: string;
  services: string[];
  stage: string;
  place: string;
  lotArea: string;
  predio: Predio;
  floors: string;
  buildArea: string;
  terrain: string;
  finishes: Acabados;
  budget: string;
  name: string;
  dial: string;
  phone: string;
  email: string;
  residence: string;
  consent: boolean;
};

const EMPTY: Form = {
  projectType: "",
  hasLot: "",
  services: [],
  stage: "",
  place: "",
  lotArea: "",
  predio: "urbano",
  floors: "",
  buildArea: "",
  terrain: "",
  finishes: "medios",
  budget: "",
  name: "",
  dial: "+57",
  phone: "",
  email: "",
  residence: "",
  consent: false,
};

const num = (value: string) => {
  const parsed = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

export function QuotePage() {
  const { locale, localePath } = useLocale();
  const c = QUOTE[locale];
  const o = QUOTE_OPTIONS;
  const reduce = useReducedMotion();
  const send = useServerFn(submitLead);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [restored, setRestored] = useState(false);

  // Pick the person's answers back up if they closed the page mid-quote.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<Form>;
      setForm({ ...EMPTY, ...saved, consent: false });
      setRestored(true);
    } catch {
      /* a broken draft is simply ignored */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* private mode — the draft is just not kept */
    }
  }, [form]);

  const firstPaint = useRef(true);
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const labelOf = (options: Option[], value: string) =>
    options.find((x) => x.value === value)?.label ?? value;

  const estimate = useMemo(() => {
    const lotArea = num(form.lotArea);
    const first = firstFloorMax(lotArea, form.predio);
    const total = totalPossibleArea({
      lotAreaM2: lotArea,
      predio: form.predio,
      floors: num(form.floors),
      buildAreaM2: form.buildArea ? num(form.buildArea) : undefined,
    });
    return { first, total, ...investmentRange(total, form.finishes) };
  }, [form.lotArea, form.predio, form.floors, form.buildArea, form.finishes]);

  const toggleService = (value: string) =>
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value],
    }));

  const validate = (target: number) => {
    const next: Record<string, string> = {};
    if (target > 1 && !form.projectType) next.projectType = c.selectOne;
    if (target > 1 && !form.hasLot) next.hasLot = c.selectOne;
    if (target > 2 && form.services.length === 0) next.services = c.selectOneOrMore;
    if (target > 2 && !form.stage) next.stage = c.selectOne;
    if (target > 3) {
      if (!form.place.trim()) next.place = c.required;
      if (!form.lotArea.trim()) next.lotArea = c.required;
      else if (!num(form.lotArea)) next.lotArea = c.invalidNumber;
      if (!form.terrain) next.terrain = c.selectOne;
      if (!form.budget) next.budget = c.selectOne;
    }
    if (target > 4) {
      if (!form.name.trim()) next.name = c.required;
      if (!form.phone.trim()) next.phone = c.required;
      if (!form.email.trim()) next.email = c.required;
      else if (!EMAIL_RE.test(form.email.trim())) next.email = c.invalidEmail;
      if (!form.residence) next.residence = c.selectOne;
      if (!form.consent) next.consent = c.step4.consentRequired;
    }
    return next;
  };

  const goTo = (target: number) => {
    if (target < step) {
      setDir(-1);
      setErrors({});
      setStep(target);
      return;
    }
    const next = validate(target);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setDir(1);
      setStep(target);
    }
  };

  const summaryRows = (): [string, string][] => [
    [c.steps[0].name, labelOf(o.projectType, form.projectType)],
    [c.step1.lotLegend, labelOf(o.hasLot, form.hasLot)],
    [c.step2.servicesLegend, form.services.map((s) => labelOf(o.services, s)).join(", ")],
    [c.step2.stageLegend, labelOf(o.stage, form.stage)],
    [c.step3.place, form.place],
    [c.step3.lotArea, formatM2(num(form.lotArea))],
    [c.step3.predio, labelOf(o.predio, form.predio)],
    [c.step3.floors, form.floors || "—"],
    [c.step3.terrain, labelOf(o.terrain, form.terrain)],
    [c.step3.finishes, labelOf(o.finishes, form.finishes)],
    [c.step3.budget, labelOf(o.budget, form.budget)],
    [c.step3.calcInvestment, `${formatCOP(estimate.min)} – ${formatCOP(estimate.max)}`],
  ];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(5);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const quote: QuoteData = {
      project_type: labelOf(o.projectType, form.projectType),
      has_lot: labelOf(o.hasLot, form.hasLot),
      services: form.services.map((s) => labelOf(o.services, s)),
      stage: labelOf(o.stage, form.stage),
      place: form.place.trim(),
      lot_area_m2: num(form.lotArea) || null,
      predio: labelOf(o.predio, form.predio),
      floors: num(form.floors) || null,
      build_area_m2: num(form.buildArea) || null,
      terrain: labelOf(o.terrain, form.terrain),
      finishes: labelOf(o.finishes, form.finishes),
      budget: labelOf(o.budget, form.budget),
      residence: labelOf(o.residence, form.residence),
      estimate: {
        first_floor_m2: Math.round(estimate.first),
        total_m2: Math.round(estimate.total),
        min_cop: Math.round(estimate.min),
        max_cop: Math.round(estimate.max),
      },
    };

    setStatus("sending");
    try {
      const context = readLeadContext();
      await send({
        data: {
          ...context,
          form_type: "quote",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `${form.dial} ${form.phone.trim()}`,
          country: form.residence,
          locale,
          budget: quote.budget,
          cities: [quote.place],
          message: summaryRows()
            .map(([k, v]) => `${k}: ${v}`)
            .join(" · "),
          habeas_consent: true,
          quote: {
            ...quote,
            ...(context.gclid ? { gclid: context.gclid } : {}),
            ...(context.fbclid ? { fbclid: context.fbclid } : {}),
          },
        },
      });
      trackLeadConversion();
      setStatus("sent");
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* nothing to clean up */
      }
    } catch {
      setStatus("error");
    }
  };

  const whatsappHref = () => {
    const number = SITE.whatsapp.replace(/\D/g, "");
    if (!number) return "";
    const text = `${c.whatsappIntro}\n${summaryRows()
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  if (status === "sent") {
    const href = whatsappHref();
    return (
      <main id="main" className="min-h-svh bg-abyss px-6 py-28 text-bone md:px-10">
        <div className="mx-auto max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            {c.stepLabel(4)}
          </p>
          <h1 className="type-h1 mt-6 text-bone">{c.successTitle}</h1>
          <p className="type-body mt-4 text-sage">{c.successBody}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex"
              >
                {c.successWhatsapp}
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setForm(EMPTY);
                setStep(1);
                setStatus("idle");
                setRestored(false);
              }}
              className="btn-ghost inline-flex"
            >
              {c.successAnother}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const slide = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 28 * dir },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -28 * dir },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      };

  return (
    <main id="main" className="min-h-svh bg-abyss text-bone">
      <form
        onSubmit={onSubmit}
        className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:py-32"
        noValidate
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            {c.stepLabel(step)}
          </p>
          <h1 className="type-h1 mt-5 text-bone">
            {c.titleA} <span className="text-gold">{c.titleB}</span>
          </h1>
          <p className="type-body mt-5 max-w-md text-sage">{c.intro}</p>

          <div className="mt-8 h-px w-full max-w-md bg-sage/20">
            <div
              className="h-px bg-gold transition-[width] duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <ol className="mt-6 space-y-3">
            {c.steps.map((s, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => done && goTo(n)}
                    disabled={!done}
                    aria-current={active ? "step" : undefined}
                    className={`flex w-full max-w-md items-baseline gap-4 text-left transition-colors ${
                      active ? "text-bone" : done ? "text-sage hover:text-bone" : "text-sage/40"
                    } ${done ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <span className="font-mono text-xs tracking-[0.2em]">{s.n}</span>
                    <span className="type-label">{s.name}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {restored ? (
            <p className="type-label mt-8 text-sage/70">{c.draftRestored}</p>
          ) : null}
        </div>

        <div className="min-w-0">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="type-h3 focus:outline-none"
            aria-live="polite"
          >
            {c.stepTitles[step - 1]}
          </h2>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} {...slide}>
              {step === 1 ? (
                <div className="mt-8 flex flex-col gap-10">
                  <ChoiceGroup
                    name="projectType"
                    legend={c.step1.typeLegend}
                    options={o.projectType}
                    value={form.projectType}
                    onChange={(v) => set("projectType", v)}
                    error={errors.projectType}
                    tone={TONE}
                  />
                  <ChoiceGroup
                    name="hasLot"
                    legend={c.step1.lotLegend}
                    options={o.hasLot}
                    value={form.hasLot}
                    onChange={(v) => set("hasLot", v)}
                    error={errors.hasLot}
                    tone={TONE}
                  />
                </div>
              ) : null}

              {step === 2 ? (
                <div className="mt-8 flex flex-col gap-10">
                  <ChoiceGroup
                    name="services"
                    legend={c.step2.servicesLegend}
                    hint={c.step2.servicesHint}
                    options={o.services}
                    multiple
                    values={form.services}
                    onToggle={toggleService}
                    error={errors.services}
                    tone={TONE}
                  />
                  <ChoiceGroup
                    name="stage"
                    legend={c.step2.stageLegend}
                    options={o.stage}
                    value={form.stage}
                    onChange={(v) => set("stage", v)}
                    error={errors.stage}
                    tone={TONE}
                  />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,260px)]">
                  <div className="flex flex-col gap-8">
                    <Field
                      id="place"
                      label={c.step3.place}
                      hint={c.step3.placeHint}
                      error={errors.place}
                      tone={TONE}
                    >
                      {(p) => (
                        <input
                          {...p}
                          type="text"
                          autoComplete="address-level2"
                          value={form.place}
                          onChange={(e) => set("place", e.target.value)}
                          className={fieldClass(TONE, Boolean(errors.place))}
                        />
                      )}
                    </Field>

                    <div className="grid gap-8 sm:grid-cols-2">
                      <Field
                        id="lotArea"
                        label={c.step3.lotArea}
                        error={errors.lotArea}
                        tone={TONE}
                      >
                        {(p) => (
                          <input
                            {...p}
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step="0.01"
                            value={form.lotArea}
                            onChange={(e) => set("lotArea", e.target.value)}
                            className={fieldClass(TONE, Boolean(errors.lotArea))}
                          />
                        )}
                      </Field>
                      <Field id="floors" label={c.step3.floors} tone={TONE}>
                        {(p) => (
                          <input
                            {...p}
                            type="number"
                            inputMode="numeric"
                            min={1}
                            value={form.floors}
                            onChange={(e) => set("floors", e.target.value)}
                            className={fieldClass(TONE, false)}
                          />
                        )}
                      </Field>
                    </div>

                    <Field
                      id="buildArea"
                      label={c.step3.buildArea}
                      hint={c.step3.buildAreaHint}
                      tone={TONE}
                    >
                      {(p) => (
                        <input
                          {...p}
                          type="number"
                          inputMode="numeric"
                          min={0}
                          step="0.01"
                          value={form.buildArea}
                          onChange={(e) => set("buildArea", e.target.value)}
                          className={fieldClass(TONE, false)}
                        />
                      )}
                    </Field>

                    <ChoiceGroup
                      name="predio"
                      legend={c.step3.predio}
                      options={o.predio}
                      value={form.predio}
                      onChange={(v) => set("predio", v as Predio)}
                      tone={TONE}
                    />
                    <ChoiceGroup
                      name="terrain"
                      legend={c.step3.terrain}
                      options={o.terrain}
                      value={form.terrain}
                      onChange={(v) => set("terrain", v)}
                      error={errors.terrain}
                      tone={TONE}
                    />
                    <ChoiceGroup
                      name="finishes"
                      legend={c.step3.finishes}
                      options={o.finishes}
                      value={form.finishes}
                      onChange={(v) => set("finishes", v as Acabados)}
                      tone={TONE}
                    />
                    <ChoiceGroup
                      name="budget"
                      legend={c.step3.budget}
                      options={o.budget}
                      value={form.budget}
                      onChange={(v) => set("budget", v)}
                      error={errors.budget}
                      tone={TONE}
                    />
                  </div>

                  <aside
                    aria-label={c.step3.calcTitle}
                    className="h-fit border border-[rgba(140,164,165,0.25)] bg-deep/60 p-6 xl:sticky xl:top-28"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                      {c.step3.calcTitle}
                    </p>
                    {estimate.total > 0 ? (
                      <dl className="mt-6 space-y-5">
                        <div>
                          <dt className="type-label text-sage">{c.step3.calcFirstFloor}</dt>
                          <dd className="type-h3 mt-1 text-bone">{formatM2(estimate.first)}</dd>
                        </div>
                        <div>
                          <dt className="type-label text-sage">{c.step3.calcTotal}</dt>
                          <dd className="type-h3 mt-1 text-bone">{formatM2(estimate.total)}</dd>
                        </div>
                        <div>
                          <dt className="type-label text-sage">{c.step3.calcInvestment}</dt>
                          <dd className="type-h3 mt-1 text-bone">
                            {formatCOP(estimate.min)}
                            <span className="text-sage"> – </span>
                            {formatCOP(estimate.max)}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="type-body mt-6 text-sage">{c.step3.calcEmpty}</p>
                    )}
                    <p className="type-label mt-6 text-sage/60">{c.step3.calcNote}</p>
                  </aside>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="mt-8 flex flex-col gap-8">
                  <Field id="name" label={c.step4.name} error={errors.name} tone={TONE}>
                    {(p) => (
                      <input
                        {...p}
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={fieldClass(TONE, Boolean(errors.name))}
                      />
                    )}
                  </Field>

                  <Field id="phone" label={c.step4.whatsapp} error={errors.phone} tone={TONE}>
                    {(p) => (
                      <div className="flex gap-3">
                        <select
                          {...p}
                          aria-label={c.step4.whatsapp}
                          value={form.dial}
                          onChange={(e) => set("dial", e.target.value)}
                          className={`${fieldClass(TONE, false)} w-32 shrink-0`}
                        >
                          {DIAL_CODES.map((d) => (
                            <option key={d.code} value={d.code} className="bg-abyss text-bone">
                              {d.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className={fieldClass(TONE, Boolean(errors.phone))}
                        />
                      </div>
                    )}
                  </Field>

                  <Field id="email" label={c.step4.email} error={errors.email} tone={TONE}>
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={fieldClass(TONE, Boolean(errors.email))}
                      />
                    )}
                  </Field>

                  <ChoiceGroup
                    name="residence"
                    legend={c.step4.residence}
                    options={o.residence}
                    value={form.residence}
                    onChange={(v) => set("residence", v)}
                    error={errors.residence}
                    tone={TONE}
                  />

                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 accent-gold"
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby="consent-error"
                      />
                      <span className="type-body text-sage">
                        {c.step4.consent}
                        <a
                          href={localePath("/legal/habeas-data")}
                          className="text-gold underline underline-offset-4"
                        >
                          {locale === "es" ? "Habeas Data" : "Habeas Data"}
                        </a>
                      </span>
                    </label>
                    <p
                      id="consent-error"
                      aria-live="polite"
                      className="type-label mt-2 text-[#f2a196] empty:hidden"
                    >
                      {errors.consent ?? ""}
                    </p>
                  </div>

                  {status === "error" ? (
                    <p aria-live="assertive" className="type-body text-[#f2a196]">
                      {c.error}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="btn-ghost inline-flex"
              >
                {c.back}
              </button>
            ) : null}
            {step < 4 ? (
              <button type="button" onClick={() => goTo(step + 1)} className="btn-gold inline-flex">
                {c.next}
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold inline-flex disabled:opacity-60"
              >
                {status === "sending" ? c.sending : c.send}
              </button>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
