/**
 * Live estimate shown in step 03 of the quote builder.
 * Factors and prices are the ones AVEL gave; they are a reference, not an offer.
 */
export type Predio = "urbano" | "rural";
export type Acabados = "medios" | "alta";

export const OCCUPANCY: Record<Predio, number> = { urbano: 0.8, rural: 0.35 };

export const PRICE_PER_M2: Record<Acabados, { min: number; max: number }> = {
  medios: { min: 2_500_000, max: 3_500_000 },
  alta: { min: 4_500_000, max: 7_000_000 },
};

/** Buildable footprint on the ground floor: lot area × occupancy factor. */
export function firstFloorMax(lotAreaM2: number, predio: Predio): number {
  const area = Number.isFinite(lotAreaM2) && lotAreaM2 > 0 ? lotAreaM2 : 0;
  return area * OCCUPANCY[predio];
}

/**
 * Total buildable area: the m² the person typed if they gave them,
 * otherwise the ground-floor footprint spread over the requested floors.
 */
export function totalPossibleArea(input: {
  lotAreaM2: number;
  predio: Predio;
  floors: number;
  buildAreaM2?: number | undefined;
}): number {
  const typed = input.buildAreaM2;
  if (typeof typed === "number" && Number.isFinite(typed) && typed > 0) return typed;
  const floors = Number.isFinite(input.floors) && input.floors > 0 ? input.floors : 1;
  return firstFloorMax(input.lotAreaM2, input.predio) * floors;
}

/** Construction budget band in Colombian pesos. */
export function investmentRange(totalAreaM2: number, acabados: Acabados) {
  const area = Number.isFinite(totalAreaM2) && totalAreaM2 > 0 ? totalAreaM2 : 0;
  const price = PRICE_PER_M2[acabados];
  return { min: area * price.min, max: area * price.max };
}

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatCOP(value: number): string {
  return COP.format(Number.isFinite(value) ? value : 0);
}

/** "1.200 m²" — areas with the thousands separator used in Colombia. */
export function formatM2(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "—";
  return `${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value)} m²`;
}
