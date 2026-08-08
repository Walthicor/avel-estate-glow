import { PROPERTIES, type PropertyRecord } from "../content/properties";

export const PAGE_SIZE = 12;
export const SORTS = ["newest", "area-desc", "area-asc"] as const;
export type Sort = (typeof SORTS)[number];

export type PropertySearch = {
  city: string;
  type: string;
  amin: number;
  amax: number;
  beds: number;
  stage: string;
  str: boolean;
  sort: Sort;
  show: number;
};

export const AREA_BOUNDS = { min: 40, max: 260 };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown, fallback: number) => {
  const n = typeof v === "number" ? v : Number.parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
};

/** URL query params → typed, shareable search state. */
export function validatePropertySearch(raw: Record<string, unknown>): PropertySearch {
  const sort = str(raw["sort"]) as Sort;
  return {
    city: str(raw["city"]),
    type: str(raw["type"]),
    amin: num(raw["amin"], AREA_BOUNDS.min),
    amax: num(raw["amax"], AREA_BOUNDS.max),
    beds: num(raw["beds"], 0),
    stage: str(raw["stage"]),
    str: raw["str"] === true || raw["str"] === "true",
    sort: SORTS.includes(sort) ? sort : "newest",
    show: Math.max(PAGE_SIZE, num(raw["show"], PAGE_SIZE)),
  };
}

export const DEFAULT_SEARCH: PropertySearch = {
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

export function filterProperties(s: PropertySearch): PropertyRecord[] {
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
