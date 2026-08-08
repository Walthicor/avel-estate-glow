import type { HomeContent } from "../../content/home";
import { COLLECTION_IMAGES } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";

export function Collections({ content }: { content: HomeContent["collections"] }) {
  const { localePath } = useLocale();

  return (
    <section className="bg-deep px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="type-h1 max-w-[18ch] text-bone">{content.heading}</h2>
        </Reveal>

        <ul className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={(i % 3) * 60}>
              <a
                href={localePath(item.href)}
                className="hairline group relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden bg-deep p-6 transition-colors hover:border-gold"
              >
                <img
                  src={COLLECTION_IMAGES[i]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="relative">
                  <p className="type-label text-gold">{item.label}</p>
                  <p className="type-body mt-2 text-sage">{item.blurb}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
