import type { HomeContent } from "../../content/home";
import { HERO_MEDIA } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";

export function Hero({ content }: { content: HomeContent["hero"] }) {
  const { localePath } = useLocale();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-abyss">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_MEDIA.video}
        poster={HERO_MEDIA.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,22,20,0.32) 0%, rgba(15,22,20,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full px-6 pb-20 md:px-12 md:pb-28">
        <div className="max-w-[780px]">
          <span className="gold-rule" aria-hidden="true" />
          <p className="type-label mt-6 text-sage">{content.label}</p>
          <h1 className="type-hero mt-5 text-bone">{content.headline}</h1>
          <p className="type-body mt-6 max-w-[620px] text-sage">{content.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={localePath("/properties")} className="btn-gold">
              {content.primary}
            </a>
            <a href={localePath("/buying-from-abroad")} className="btn-ghost">
              {content.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
