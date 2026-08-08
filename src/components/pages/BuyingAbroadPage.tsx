import { useState } from "react";

import { HOME } from "../../content/home";
import { BUYING_ABROAD, type AbroadStep } from "../../content/buying-abroad";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { LeadCapture } from "../home/LeadCapture";

export function BuyingAbroadPage() {
  const { locale } = useLocale();
  const content = BUYING_ABROAD[locale];

  return (
    <>
      <section className="bg-bone px-6 pt-[168px] pb-24 text-abyss md:px-12 md:pt-[200px] md:pb-32">
        <div className="mx-auto max-w-[1240px]">
          <span className="gold-rule mb-8 block" />
          <h1 className="type-hero max-w-[18ch] text-abyss">{content.hero.heading}</h1>
          <p className="type-body mt-6 max-w-[52ch] text-abyss/70">{content.hero.subhead}</p>
        </div>
      </section>

      {content.steps.map((step, i) => (
        <StepSection key={step.n} step={step} labels={content.labels} dark={i % 2 === 0} />
      ))}

      <Faq heading={content.faqHeading} items={content.faqs} />

      <LeadCapture content={HOME[locale].lead} />
    </>
  );
}

function StepSection({
  step,
  labels,
  dark,
}: {
  step: AbroadStep;
  labels: { timeline: string; cost: string; sign: string; risk: string; step: string };
  dark: boolean;
}) {
  const tone = dark
    ? { bg: "bg-abyss text-bone", heading: "text-bone", body: "text-bone/70", border: "border-sage/25", label: "text-sage" }
    : { bg: "bg-bone text-abyss", heading: "text-abyss", body: "text-abyss/70", border: "border-abyss/15", label: "text-abyss/70" };

  return (
    <section className={`${tone.bg} px-6 py-24 md:px-12 md:py-32 lg:pr-28`}>
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 -left-2 font-serif text-[120px] leading-none text-gold/20 select-none md:-top-16"
          >
            {step.n}
          </span>
          <p className={`type-label relative ${tone.label}`}>
            {labels.step} {step.n}
          </p>
          <h2 className={`type-h1 relative mt-3 max-w-[16ch] ${tone.heading}`}>{step.title}</h2>
        </div>

        <div className="mt-10 grid gap-px sm:grid-cols-3">
          {[
            { label: labels.timeline, value: step.timeline },
            { label: labels.cost, value: step.cost },
            { label: labels.sign, value: step.sign },
          ].map((block) => (
            <div key={block.label} className={`border ${tone.border} p-6`}>
              <p className={`type-label ${tone.label}`}>{block.label}</p>
              <p className={`type-body mt-3 ${dark ? "text-bone/85" : "text-abyss/80"}`}>{block.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-[62ch] space-y-5">
          {step.body.map((p) => (
            <p key={p} className={`type-body ${tone.body}`}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 max-w-[68ch] border-l border-gold bg-deep px-6 py-5">
          <p className="type-label text-gold">{labels.risk}</p>
          <p className="type-body mt-3 text-bone/80">{step.risk}</p>
        </div>
      </Reveal>
    </section>
  );
}

function Faq({ heading, items }: { heading: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-abyss px-6 py-24 text-bone md:px-12 md:py-32 lg:pr-28">
      <Reveal className="mx-auto max-w-[900px]">
        <h2 className="type-h1 text-bone">{heading}</h2>
        <ul className="mt-12 border-t border-sage/20">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-sage/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="type-h3 text-bone">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-gold transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <p className="type-body max-w-[68ch] pb-7 text-bone/70">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
