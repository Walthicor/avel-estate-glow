import { useState } from "react";

import logo from "../assets/avel-logo-full.png.asset.json";
import { PRESET_WIDTH, buildSrcSet, parseRatio, transformedSrc, type ImagePreset } from "../lib/image";

export type AvelImageProps = {
  src: string;
  alt: string;
  /** "4/3", "16:10" or a number. Drives the intrinsic width/height attributes. */
  ratio?: string | number;
  /** Above-the-fold images: eager, high priority, no lazy-loading. */
  priority?: boolean;
  preset?: ImagePreset;
  /** Override the requested 1x width. Defaults to the preset width. */
  width?: number;
  sizes?: string;
  fit?: "cover" | "contain";
  quality?: number;
  /** Classes on the wrapper (which carries the placeholder). */
  className?: string;
  /** Classes on the <img> itself. */
  imgClassName?: string;
  ariaHidden?: boolean;
};

export function AvelImage({
  src,
  alt,
  ratio,
  priority = false,
  preset = "card",
  width,
  sizes,
  fit = "cover",
  quality,
  className = "",
  imgClassName = "",
  ariaHidden,
}: AvelImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // An image cached or server-rendered before hydration never fires onLoad.
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete) setState(el.naturalWidth > 0 ? "loaded" : "error");
  }, [finalSrcKey]);

  const w = width ?? PRESET_WIDTH[preset];
  const r = parseRatio(ratio);
  const h = r ? Math.round(w / r) : undefined;

  const opts = { quality: quality ?? 75, resize: fit, ...(h ? { height: h } : {}) };
  const finalSrc = transformedSrc(src, w, opts);
  const srcSet = buildSrcSet(src, w, opts);

  return (
    <span
      className={`avel-img relative block overflow-hidden bg-deep ${className}`}
      data-state={state}
      style={r ? { aspectRatio: String(r) } : undefined}
    >
      <span aria-hidden="true" className="avel-img__shimmer" />

      {state === "error" ? (
        <img
          src={logo.url}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[42%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
        />
      ) : null}

      <img
        src={finalSrc}
        {...(srcSet ? { srcSet } : {})}
        {...(sizes ? { sizes } : {})}
        alt={alt}
        {...(ariaHidden ? { "aria-hidden": true } : {})}
        width={w}
        {...(h ? { height: h } : {})}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        className={`avel-img__el h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
      />
    </span>
  );
}
