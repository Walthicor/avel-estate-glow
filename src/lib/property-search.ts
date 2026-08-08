import { PROPERTIES, type PropertyRecord } from "../content/properties";

export const PAGE_SIZE = 12;
export const SORTS = ["newest", "area-desc", "area-asc"] as const;
export type Sort = (typeof SORTS)[number];

/** URL shape: defaults are omitted so shared links stay clean. */
export type PropertySearch = {
  city?: string;
  type?: string;
  amin?: number;
  amax?: number;
  beds?: number;
  stage?: string;
  str?: boolean;
  sort?: Sort;
  show?: number;
};

export type ResolvedSearch = Required<PropertySearch>;

export const AREA_BOUNDS = { min: 40, max: 260 };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown, fallback: number) => {
  const n = typeof v === "number" ? v : Number.parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
};

/** URL query params → typed, shareable search state. */
export function validatePropertySearch(raw: Record<string, unknown>): PropertySearch {
  const out: PropertySearch = {};
  const sort = str(raw["sort"]) as Sort;

  if (str(raw["city"])) out.city = str(raw["city"]);
  if (str(raw["type"])) out.type = str(raw["type"]);
  if (str(raw["stage"])) out.stage = str(raw["stage"]);
  const amin = num(raw["amin"], AREA_BOUNDS.min);
  if (amin !== AREA_BOUNDS.min) out.amin = amin;
  const amax = num(raw["amax"], AREA_BOUNDS.max);
  if (amax !== AREA_BOUNDS.max) out.amax = amax;
  const beds = num(raw["beds"], 0);
  if (beds) out.beds = beds;
  if (raw["str"] === true || raw["str"] === "true") out.str = true;
  if (SORTS.includes(sort) && sort !== "newest") out.sort = sort;
  const show = Math.max(PAGE_SIZE, num(raw["show"], PAGE_SIZE));
  if (show !== PAGE_SIZE) out.show = show;

  return out;
}

export const DEFAULT_SEARCH: ResolvedSearch = {
  city: "",
  type: "",
  amin: AREA_BOUNDS.min,
  amax: AREA_BOUNDS.max,
  beds: 0,
  stage: "",
  str: false,
  sort: "newest",
  show: PAGE_SIZE,
};

/** Fill in defaults for rendering. */
export const resolveSearch = (s: PropertySearch): ResolvedSearch => ({ ...DEFAULT_SEARCH, ...s });

export function filterProperties(s: ResolvedSearch): PropertyRecord[] {
  const amin = Math.min(s.amin, s.amax);
  const amax = Math.max(s.amin, s.amax);

  const rows = PROPERTIES.filter((p) => {
    if (s.city && p.city !== s.city) return false;
    if (s.type && p.type !== s.type) return false;
    if (s.stage && p.stage !== s.stage) return false;
    if (s.str && !p.str) return false;
    if (s.beds && p.bedroomsMax < s.beds) return false;
    // overlap between the property's area range and the requested range
    if (p.areaMax < amin || p.areaMin > amax) return false;
    return true;
  });

  const sorted = [...rows];
  if (s.sort === "area-desc") sorted.sort((a, b) => b.areaMax - a.areaMax);
  else if (s.sort === "area-asc") sorted.sort((a, b) => a.areaMin - b.areaMin);
  else sorted.sort((a, b) => b.order - a.order);

  return sorted;
}
