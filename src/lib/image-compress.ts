/**
 * Browser-only: resizes a photo to max 1920px and re-encodes it as WebP,
 * searching the quality so the file lands at or below MAX_BYTES (target 100–200 KB).
 */
export const MAX_BYTES = 200_000;
const MAX_WIDTH = 1920;

export async function compressImage(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  let w = Math.min(MAX_WIDTH, bmp.width);
  let blob: Blob | null = null;
  for (let attempt = 0; attempt < 4; attempt++) {
    const h = Math.round((bmp.height * w) / bmp.width);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
    for (let q = 0.92; q >= 0.4; q -= 0.06) {
      blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", q));
      if (blob && blob.size <= MAX_BYTES) return blob;
    }
    w = Math.round(w * 0.8);
  }
  return blob!;
}

export const seoSlug = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
