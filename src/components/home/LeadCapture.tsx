import type { HomeContent } from "../../content/home";
import { ShortLeadForm } from "../forms/ShortLeadForm";
import { Reveal } from "../Reveal";

export function LeadCapture({ content }: { content: HomeContent["lead"] }) {
  return (
    <section id="enquire" className="bg-bone px-6 py-24 text-abyss md:px-12 md:py-32 lg:pr-28">
      <Reveal className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="type-h1 max-w-[14ch] text-abyss">{content.heading}</h2>
          <p className="type-body mt-5 max-w-[40ch] text-abyss/70">{content.body}</p>
        </div>

        <ShortLeadForm tone="light" heading={null} />
      </Reveal>
    </section>
  );
}
