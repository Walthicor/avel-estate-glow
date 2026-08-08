import { useEffect, useState } from "react";

import type { Locale } from "../../config/site";
import { GUIDES_INDEX, guideBySlug, type GuideBlock } from "../../content/guides";
import { HOME } from "../../content/home";
import { PROPERTIES } from "../../content/properties";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { LeadCapture } from "../home/LeadCapture";
import { PropertyGrid } from "../properties/PropertyGrid";

function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[95] h-[2px] bg-transparent">
      <div className="h-full bg-gold transition-[width] duration-100 ease-linear" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Block({ block, first }: { block: GuideBlock; first: boolean }) {
  if (block.k === "h2") return <h2 className="type-h3 mt-14 text-bone">{block.text}</h2>;

  if (block.k === "quote")
    return (
      <blockquote className="my-12 border-l border-gold pl-6">
        <p className="font-display text-[28px] leading-[1.35] text-gold">{block.text}</p>
      </blockquote>
    );

  if (block.k === "ul")
    return (
      <ul className="my-8 space-y-4">
        {block.items.map((item) => (
          <li key={item} className="flex gap-4 text-[19px] leading-[1.75] text-bone/80">
            <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );

  return (
    <p className={`mt-6 text-[19px] leading-[1.75] text-bone/80 ${first ? "guide-dropcap" : ""}`}>{block.text}</p>
  );
}

export function GuideArticlePage({ slug }: { slug: string }) {
  const { locale, localePath } = useLocale();
  const guide = guideBySlug(slug);
  if (!guide) return null;
  const g = guide[locale as Locale];
  const copy = GUIDES_INDEX[locale as Locale];
  const related = PROPERTIES.filter((p) => p.city === guide.relatedCity).slice(0, 3);
  let firstParagraphSeen = false;

  return (
    <main>
      <ReadingProgress />

      <article className="bg-abyss px-6 pt-[168px] pb-20 md:px-12 md:pt-[200px] md:pb-28">
        <div className="mx-auto max-w-[720px]">
          <a href={localePath("/guides")} className="type-label link-draw text-sage">
            {copy.back}
          </a>
          <p className="type-label mt-8 text-gold">{g.category}</p>
          <h1 className="type-h1 mt-4 text-bone">{g.title}</h1>
          <p className="type-label mt-6 text-sage/70">{g.readTime}</p>
          <span className="gold-rule mt-10 block" />

          <div className="mt-10">
            {g.blocks.map((block, i) => {
              const first = block.k === "p" && !firstParagraphSeen;
              if (first) firstParagraphSeen = true;
              return <Block key={i} block={block} first={first} />;
            })}
          </div>
        </div>
      </article>

      <Reveal>
        <PropertyGrid properties={related} heading={copy.related} />
      </Reveal>

      <LeadCapture content={HOME[locale].lead} />
    </main>
  );
}
