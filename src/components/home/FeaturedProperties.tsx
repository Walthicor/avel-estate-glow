import type { HomeContent } from "../../content/home";
import { PROPERTY_IMAGES } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { AvelImage } from "../AvelImage";

export function FeaturedProperties({ content }: { content: HomeContent["featured"] }) {
  const { localePath } = useLocale();

  return (
    <section className="bg-abyss px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="type-h1 text-bone">{content.heading}</h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 md:gap-32">
          {content.properties.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal as="article" key={p.title}>
                <div
                  className={`grid items-center gap-8 md:grid-cols-12 md:gap-14 ${
                    reversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div
                    className={`md:[direction:ltr] ${
                      reversed ? "md:col-span-7" : "md:col-span-7"
                    }`}
                  >
                    <AvelImage
                      src={PROPERTY_IMAGES[i] ?? ""}
                      alt={`${p.title}, ${p.city}`}
                      preset="card"
                      width={1200}
                      ratio={i === 1 ? "4/3" : "16/10"}
                      sizes="(max-width: 768px) 100vw, 58vw"
                      className="w-full"
                    />

                  </div>

                  <div className="md:col-span-5 md:[direction:ltr]">
                    <p className="type-label text-sage">{p.city}</p>
                    <h3 className="type-h2 mt-3 text-bone">{p.title}</h3>
                    <p className="type-figure mt-4 text-gold">{p.area}</p>

                    <dl className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[rgba(140,164,165,0.18)] py-4">
                      {[p.type, p.stage, p.delivery].map((v) => (
                        <dd key={v} className="type-label text-sage">
                          {v}
                        </dd>
                      ))}
                    </dl>

                    <a href={localePath(p.href)} className="link-draw type-label mt-8">
                      {content.link} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
