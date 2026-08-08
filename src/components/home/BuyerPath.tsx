import { useState } from "react";

import type { HomeContent } from "../../content/home";
import { Reveal } from "../Reveal";

export function BuyerPath({ content }: { content: HomeContent["path"] }) {
  const [open, setOpen] = useState(0);
  const { labels } = content;

  return (
    <section className="bg-bone px-6 py-24 text-abyss md:px-12 md:py-32">
      <Reveal className="mx-auto max-w-[1240px]">
        <p className="type-label text-gold-deep">{content.intro}</p>
        <h2 className="type-h1 mt-4 max-w-[16ch] text-abyss">{content.heading}</h2>

        {/* Rail */}
        <ul className="mt-14 flex flex-col border-t border-abyss/15 md:flex-row md:border-t-0">
          {content.steps.map((step, i) => {
            const isOpen = open === i;
            return (
              <li key={step.n} className="flex-1 border-b border-abyss/15 md:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`step-panel-${step.n}`}
                  className="group flex w-full flex-col items-start gap-2 px-1 py-5 text-left transition-colors md:border-t md:pt-6"
                  style={{ borderTopColor: isOpen ? "var(--color-gold-deep)" : "rgba(15,22,20,0.15)" }}
                >
                  <span
                    className="type-label transition-colors"
                    style={{ color: isOpen ? "var(--color-gold-deep)" : "rgba(15,22,20,0.45)" }}
                  >
                    {step.n}
                  </span>
                  <span className="type-h3 text-abyss group-hover:text-gold-deep">
                    {step.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Panels */}
        <div className="border-t border-abyss/15">
          {content.steps.map((step, i) => (
            <div
              key={step.n}
              id={`step-panel-${step.n}`}
              className="step-panel"
              data-open={open === i}
              aria-hidden={open !== i}
            >
              <div>
                <div className="grid gap-8 py-10 md:grid-cols-4">
                  <Field label={labels.what} value={step.what} wide />
                  <Field label={labels.how_long} value={step.how_long} />
                  <Field label={labels.cost} value={step.cost} />
                  <Field label={labels.sign} value={step.sign} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "md:col-span-1" : undefined}>
      <p className="type-label text-abyss/50">{label}</p>
      <p className="type-body mt-2 text-abyss/85">{value}</p>
    </div>
  );
}
