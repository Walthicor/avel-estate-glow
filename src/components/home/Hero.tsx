import { useEffect, useState } from "react";

import type { HomeContent } from "../../content/home";
import { HERO_MEDIA } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";

export function Hero({ content }: { content: HomeContent["hero"] }) {
  const { localePath } = useLocale();
  // The hero video is ~19 MB: only load it on wider screens, when motion is
  // allowed and the connection is not metered/slow. Everyone else gets the poster.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const apply = () => {
      const slow =
        Boolean(conn?.saveData) ||
        (conn?.effectiveType ? /2g|3g/.test(conn.effectiveType) : false);
      setShowVideo(!mq.matches && !slow && window.innerWidth >= 768);
    };
    apply();
    mq.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden bg-abyss">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_MEDIA.poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_MEDIA.video}
          poster={HERO_MEDIA.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}
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
