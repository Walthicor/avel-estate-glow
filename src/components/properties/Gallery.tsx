import { useState } from "react";

import type { DetailCopy } from "../../content/property-detail";
import { Lightbox } from "./Lightbox";
import { AvelImage } from "../AvelImage";

export function Gallery({
  images,
  videoYoutubeId,
  alt,
  copy,
}: {
  images: string[];
  videoYoutubeId: string | null;
  alt: string;
  copy: DetailCopy;
}) {
  const slides: Array<{ kind: "video" | "image"; src: string }> = [
    ...(videoYoutubeId ? [{ kind: "video" as const, src: videoYoutubeId }] : []),
    ...images.map((src) => ({ kind: "image" as const, src })),
  ];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const current = slides[active]!;

  return (
    <section className="bg-abyss">
      <div className="relative h-[70vh] w-full overflow-hidden bg-deep">
        {current.kind === "video" ? (
          <iframe
            title={alt}
            src={`https://www.youtube.com/embed/${current.src}?autoplay=1&mute=1&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLightbox(images.indexOf(current.src))}
            aria-label={copy.gallery.open}
            className="group h-full w-full"
          >
            <AvelImage
              src={current.src}
              alt={alt}
              preset="hero"
              priority
              sizes="100vw"
              className="h-full w-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

          </button>
        )}
      </div>

      <div className="hairline-b bg-deep">
        <ul className="mx-auto flex max-w-[1400px] gap-3 overflow-x-auto px-6 py-4">
          {slides.map((slide, i) => (
            <li key={`${slide.kind}-${slide.src}-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={active === i ? "true" : undefined}
                aria-label={
                  slide.kind === "video"
                    ? copy.gallery.videoThumb
                    : copy.gallery.slide(i + 1, slides.length)
                }
                className={`block h-16 w-24 overflow-hidden border transition-colors ${
                  active === i ? "border-gold" : "border-transparent hover:border-sage/50"
                }`}
              >
                {slide.kind === "video" ? (
                  <span className="type-label grid h-full w-full place-items-center bg-abyss text-gold">
                    ▶
                  </span>
                ) : (
                  <AvelImage
                    src={slide.src}
                    alt=""
                    ariaHidden
                    preset="thumbnail"
                    ratio="3/2"
                    className="h-full w-full"
                  />

                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {lightbox !== null ? (
        <Lightbox
          images={images}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
          labels={copy.gallery}
          alt={alt}
        />
      ) : null}
    </section>
  );
}
