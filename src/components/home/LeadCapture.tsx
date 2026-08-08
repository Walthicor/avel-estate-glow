import { useState, type FormEvent } from "react";

import type { HomeContent } from "../../content/home";
import { Reveal } from "../Reveal";

export function LeadCapture({ content }: { content: HomeContent["lead"] }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field =
    "w-full border border-abyss/20 bg-transparent px-3 py-2.5 text-[15px] text-abyss focus:border-gold-deep focus:outline-none";

  return (
    <section id="enquire" className="bg-bone px-6 py-24 text-abyss md:px-12 md:py-32">
      <Reveal className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="type-h1 max-w-[14ch] text-abyss">{content.heading}</h2>
          <p className="type-body mt-5 max-w-[40ch] text-abyss/70">{content.body}</p>
        </div>

        {sent ? (
          <p className="type-body self-center text-abyss/80">{content.success}</p>
        ) : (
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
            <Label text={content.name} className="sm:col-span-2">
              <input required name="name" className={field} />
            </Label>
            <Label text={content.email} className="sm:col-span-2">
              <input required type="email" name="email" className={field} />
            </Label>
            <Label text={content.country}>
              <input required name="country" className={field} />
            </Label>
            <Label text={content.budget}>
              <select required name="budget" defaultValue="" className={field}>
                <option value="" disabled />
                {content.budgetOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Label>
            <Label text={content.timeline} className="sm:col-span-2">
              <select required name="timeline" defaultValue="" className={field}>
                <option value="" disabled />
                {content.timelineOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Label>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-gold">
                {content.submit}
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}

function Label({
  text,
  children,
  className = "",
}: {
  text: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="type-label text-abyss/55">{text}</span>
      {children}
    </label>
  );
}
