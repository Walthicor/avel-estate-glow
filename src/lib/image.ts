export type ImagePreset = "card" | "hero" | "thumbnail" | "lightbox";

/** Base render width per context. 2x variants are served through srcset. */
export const PRESET_WIDTH: Record<ImagePreset, number> = {
  thumbnail: 320,
  card: 800,
  hero: 1920,
  lightbox: 2000,
};

const RENDER_PATH = "/storage/v1/render/image/public/";
const OBJECT_PATH = "/storage/v1/object/public/";

/** Supabase Storage object URLs can be transformed on the fly. Others cannot. */
export function isTransformable(src: string): boolean {
  return src.includes(OBJECT_PATH) || src.includes(RENDER_PATH);
}

/**
 * Ask Supabase Storage for an image at a specific width.
 * Non-Supabase sources (bundled assets, data URLs) are returned untouched.
 */
export function transformedSrc(
  src: string,
  width: number,
  opts: { height?: number; quality?: number; resize?: "cover" | "contain" } = {},
): string {
  if (!isTransformable(src)) return src;

  const [base, query = ""] = src.replace(OBJECT_PATH, RENDER_PATH).split("?");
  const params = new URLSearchParams(query);
  params.set("width", String(Math.round(width)));
  if (opts.height) params.set("height", String(Math.round(opts.height)));
  params.set("resize", opts.resize ?? "cover");
  params.set("quality", String(opts.quality ?? 75));
  return `${base}?${params.toString()}`;
}

/** "1x, 2x" srcset. Returns undefined when the source cannot be resized. */
export function buildSrcSet(
  src: string,
  width: number,
  opts: { height?: number; quality?: number; resize?: "cover" | "contain" } = {},
): string | undefined {
  if (!isTransformable(src)) return undefined;
  const x2: { height?: number; quality?: number; resize?: "cover" | "contain" } = {
    ...opts,
    quality: (opts.quality ?? 75) - 10,
  };
  if (opts.height) x2.height = opts.height * 2;
  return [
    `${transformedSrc(src, width, opts)} 1x`,
    `${transformedSrc(src, width * 2, x2)} 2x`,
  ].join(", ");
}

/** Parse "4/3", "16:10" or a number into a ratio value. */
export function parseRatio(ratio?: string | number): number | undefined {
  if (ratio === undefined) return undefined;
  if (typeof ratio === "number") return ratio;
  const [w, h] = ratio.split(/[/:]/).map((n) => Number(n.trim()));
  if (!w || !h) return undefined;
  return w / h;
}
