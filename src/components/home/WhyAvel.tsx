import type { HomeContent } from "../../content/home";
import { Reveal } from "../Reveal";

export function WhyAvel({ content }: { content: HomeContent["why"] }) {
  return (
    <section className="bg-abyss px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="type-h1 text-bone">{content.heading}</h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-14">
          {content.columns.map((col, i) => (
            <Reveal key={col.n} delay={i * 80}>
              <p className="type-h1 text-gold">{col.n}</p>
              <h3 className="type-h3 mt-5 text-bone">{col.title}</h3>
              <p className="type-body mt-4 text-sage">{col.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
