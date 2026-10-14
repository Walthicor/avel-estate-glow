import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, FileText, Layers, LineChart, Network, Ruler, Wallet, ScanSearch } from "lucide-react";

import type { Locale } from "../../config/site";
import { SectionLabel } from "../arquitectura/SectionLabel";
import { DisplayTitle } from "../arquitectura/DisplayTitle";
import { CountUp } from "../arquitectura/CountUp";
import { AvelImage } from "../AvelImage";
import { projectPath } from "../../lib/projects";
import { submitLead } from "../../lib/leads.functions";
import { EMAIL_RE, readLeadContext } from "../../lib/lead-schema";
import { DEVELOPERS, DOSSIER_URL } from "../../content/developers";

export type CaseImages = Record<string, { photo: string | null; exists: boolean }>;

type Props = { locale: Locale; heroPhoto: string | null; cases: CaseImages };

const ICONS = [Ruler, Layers, Wallet, Network, LineChart, ScanSearch];

export function DevelopersPage({ locale, heroPhoto, cases }: Props) {
  const c = DEVELOPERS[locale];
  const reduce = useReducedMotion();
  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } };
  const meetingHref = locale === "es" ? "/es/contacto" : "/contact";
  const projectsHref = locale === "es" ? "/es/arquitectura/proyectos" : "/architecture/projects";

  return (
    <main id="main" className="bg-paper text-abyss">
      {/* 1. Hero */}
      <section className="relative flex min-h-[100svh] items-end bg-abyss text-paper">
        {heroPhoto && (
          <img src={heroPhoto} alt={c.heroAlt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-abyss/20" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-8 md:pb-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{c.eyebrow}</p>
          <DisplayTitle as="h1" text={c.title} className="mt-6 max-w-5xl text-paper" />
          <p className="mt-6 max-w-2xl text-lg text-bone">{c.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#dossier" className="btn-gold">{c.ctaDossier}</a>
            <a href={meetingHref} className="btn-ghost">{c.ctaMeeting}</a>
          </div>
        </div>
      </section>

      {/* 2. Figures */}
      <section className="border-b border-abyss/15">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {c.stats.map((s) => (
              <motion.div key={s.label} {...fade}>
                <dd className="font-display text-4xl md:text-5xl">
                  {s.prefix}
                  <CountUp value={s.value} />
                  {s.suffix}
                </dd>
                <dt className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-slate">{s.label}</dt>
              </motion.div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-slate">{c.statsNote}</p>
        </div>
      </section>

      {/* 3. Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionLabel number={1} text={c.teamLabel} className="text-gold-ink" />
        <motion.p {...fade} className="mt-8 max-w-4xl font-display text-3xl leading-tight md:text-5xl">
          {c.team}
        </motion.p>
      </section>

      {/* 4. Deliverables */}
      <section className="bg-abyss text-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <SectionLabel number={2} text={c.deliverLabel} className="text-gold" />
          <ul className="mt-12 grid gap-px bg-paper/10 md:grid-cols-2 lg:grid-cols-3">
            {c.deliverables.map((d, i) => {
              const Icon = ICONS[i] ?? FileText;
              return (
                <motion.li key={d.title} {...fade} className="bg-abyss p-8">
                  <Icon aria-hidden className="h-8 w-8 text-gold" strokeWidth={1.25} />
                  <h3 className="mt-6 font-display text-2xl">{d.title}</h3>
                  <p className="mt-3 text-bone">{d.benefit}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. Cases */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionLabel number={3} text={c.casesLabel} className="text-gold-ink" />
        <div className="mt-12 space-y-16">
          {c.cases.map((k, i) => {
            const info = cases[k.slug];
            const href = info?.exists ? projectPath(k.slug, locale) : projectsHref;
            return (
              <motion.article key={k.slug} {...fade} className={`grid gap-8 md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <a href={href} className="block aspect-[4/3] overflow-hidden bg-abyss">
                  {info?.photo ? (
                    <AvelImage src={info.photo} alt={k.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-3xl text-gold">{k.name}</div>
                  )}
                </a>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl">{k.name}</h3>
                  <dl className="mt-6 space-y-5">
                    {([[c.challenge, k.challenge], [c.done, k.done], [c.result, k.result]] as const).map(([t, v]) => (
                      <div key={t}>
                        <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold-ink">{t}</dt>
                        <dd className="mt-1 text-slate">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href={href} className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:text-gold-ink">
                    {c.seeProject} →
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 6. Dossier */}
      <section id="dossier" className="scroll-mt-24 bg-bone">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <SectionLabel number={4} text={c.dossierLabel} className="text-gold-ink" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl">{c.dossierTitle}</h2>
            <p className="mt-4 text-slate">{c.dossierBody}</p>
          </div>
          <DossierForm locale={locale} />
        </div>
      </section>

      {/* 7. Meeting */}
      <section className="bg-abyss text-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8">
          <h2 className="mx-auto max-w-3xl font-display text-3xl md:text-5xl">{c.finalTitle}</h2>
          <a href={meetingHref} className="btn-gold mt-10 inline-flex items-center gap-2">
            <Calendar aria-hidden className="h-4 w-4" /> {c.ctaMeeting}
          </a>
        </div>
      </section>
    </main>
  );
}

function DossierForm({ locale }: { locale: Locale }) {
  const c = DEVELOPERS[locale].form;
  const [v, setV] = useState({ name: "", company: "", role: "", email: "", phone: "", consent: false });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!v.name.trim()) err["name"] = true;
    if (!v.company.trim()) err["company"] = true;
    if (!v.role.trim()) err["role"] = true;
    if (!EMAIL_RE.test(v.email.trim())) err["email"] = true;
    if (v.phone.replace(/\D/g, "").length < 7) err["phone"] = true;
    if (!v.consent) err["consent"] = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("sending");
    try {
      await submitLead({
        data: {
          ...readLeadContext(),
          form_type: "desarrollador",
          name: v.name.trim(),
          email: v.email.trim(),
          phone: v.phone.trim(),
          message: `Empresa: ${v.company.trim()} · Cargo: ${v.role.trim()} · Solicitó el dossier para desarrolladores`,
          locale,
          habeas_consent: true,
        },
      });
      setState("done");
      const a = document.createElement("a");
      a.href = DOSSIER_URL;
      a.download = "AVEL-dossier-desarrolladores.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div role="status" className="border border-abyss/15 bg-paper p-8">
        <h3 className="font-display text-2xl">{c.doneTitle}</h3>
        <p className="mt-3 text-slate">{c.doneBody}</p>
        <a href={DOSSIER_URL} download="AVEL-dossier-desarrolladores.pdf" className="btn-gold mt-6 inline-flex">
          {c.download}
        </a>
      </div>
    );
  }

  const field = (key: "name" | "company" | "role" | "email" | "phone", type = "text", auto?: string) => (
    <div>
      <label htmlFor={`dev-${key}`} className="block font-mono text-xs uppercase tracking-[0.2em]">{c.labels[key]}</label>
      <input
        id={`dev-${key}`}
        type={type}
        autoComplete={auto}
        value={v[key]}
        onChange={(e) => setV({ ...v, [key]: e.target.value })}
        aria-invalid={errors[key] || undefined}
        aria-describedby={errors[key] ? `dev-${key}-err` : undefined}
        className="mt-2 w-full border border-abyss/25 bg-paper px-4 py-3 outline-none focus:border-gold-ink"
      />
      {errors[key] && <p id={`dev-${key}-err`} className="mt-1 text-sm text-destructive">{c.error}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 border border-abyss/15 bg-paper p-6 md:p-8">
      {field("name", "text", "name")}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("company", "text", "organization")}
        {field("role", "text", "organization-title")}
      </div>
      {field("email", "email", "email")}
      {field("phone", "tel", "tel")}
      <label className="flex items-start gap-3 text-sm text-slate">
        <input type="checkbox" checked={v.consent} onChange={(e) => setV({ ...v, consent: e.target.checked })} className="mt-1" aria-invalid={errors["consent"] || undefined} />
        <span>
          {c.consent}{" "}
          <a href={locale === "es" ? "/es/legal/habeas-data" : "/legal/habeas-data"} className="underline">{c.consentLink}</a>
        </span>
      </label>
      {errors["consent"] && <p className="text-sm text-destructive">{c.consentError}</p>}
      <div aria-live="polite">{state === "error" && <p className="text-sm text-destructive">{c.sendError}</p>}</div>
      <button type="submit" disabled={state === "sending"} className="btn-gold w-full justify-center disabled:opacity-60">
        {state === "sending" ? c.sending : c.submit}
      </button>
    </form>
  );
}
