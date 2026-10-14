import type { Locale } from "../../config/site";
import { GUIDES, GUIDES_INDEX } from "../../content/guides";
import { HOME } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";
import { AvelImage } from "../AvelImage";
import { BLOG_PHOTOS } from "../../content/photos";
import { LeadCapture } from "../home/LeadCapture";

export function GuidesIndexPage() {
  const { locale, localePath } = useLocale();
  const copy = GUIDES_INDEX[locale as Locale];

  return (
    <div>
      <section className="bg-abyss px-6 pt-[168px] pb-14 md:px-12 md:pt-[200px] md:pb-16">
        <div className="mx-auto max-w-[1240px]">
          <span className="gold-rule mb-8 block" />
          <h1 className="type-hero text-bone">{copy.heading}</h1>
          <p className="type-body mt-6 max-w-[56ch] text-sage">{copy.intro}</p>
        </div>
      </section>

      <section className="bg-abyss px-6 pb-24 md:px-12 md:pb-32">
        <ul className="mx-auto max-w-[900px] border-t border-sage/20">
          {GUIDES.map((guide) => {
            const g = guide[locale as Locale];
            return (
              <Reveal as="li" key={guide.slug} className="border-b border-sage/20">
                <a href={localePath(`/guides/${guide.slug}`)} className="group grid gap-6 py-10 md:grid-cols-[280px_1fr] md:gap-10">
                  {BLOG_PHOTOS[guide.slug] ? (
                    <AvelImage
                      src={BLOG_PHOTOS[guide.slug]!}
                      alt={g.title}
                      preset="card"
                      ratio="3/2"
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="w-full"
                    />
                  ) : null}
                  <div>
                  <p className="type-label text-gold">{g.category}</p>
                  <h2 className="type-h2 mt-4 max-w-[26ch] text-bone transition-transform duration-200 ease-out group-hover:translate-x-2">
                    {g.title}
                  </h2>
                  <p className="type-body mt-4 max-w-[64ch] text-sage">{g.excerpt}</p>
                  <p className="type-label mt-5 text-sage">{g.readTime}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <LeadCapture content={HOME[locale].lead} />
    </div>
  );
}
