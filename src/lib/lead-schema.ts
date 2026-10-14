import type { Locale } from "../config/site";

/** Everything the 4-step quote builder collects, in the shape it is stored. */
export type QuoteData = {
  project_type: string;
  has_lot: string;
  services: string[];
  packages?: string[] | undefined;
  stage: string;
  place: string;
  lot_area_m2: number | null;
  predio: string;
  floors: number | null;
  build_area_m2: number | null;
  terrain: string;
  finishes: string;
  budget: string;
  residence: string;
  estimate: {
    first_floor_m2: number;
    total_m2: number;
    min_cop: number;
    max_cop: number;
  };
  gclid?: string | undefined;
  fbclid?: string | undefined;
  servicio?: string | undefined;
  landing_url?: string | undefined;
};

export type LeadPayload = {
  form_type: "short" | "full" | "quote" | "desarrollador";
  buyer_type?: string | undefined;
  purpose?: string | undefined;
  budget?: string | undefined;
  timeline?: string | undefined;
  cities?: string[] | undefined;
  name: string;
  email: string;
  phone?: string | undefined;
  country?: string | undefined;
  message?: string | undefined;
  property_id?: string | undefined;
  locale: Locale;
  source_page?: string | undefined;
  utm_source?: string | undefined;
  utm_medium?: string | undefined;
  utm_campaign?: string | undefined;
  utm_term?: string | undefined;
  utm_content?: string | undefined;
  referrer?: string | undefined;
  marketing_consent?: boolean | undefined;
  habeas_consent?: boolean | undefined;
  gclid?: string | undefined;
  fbclid?: string | undefined;
  quote?: QuoteData | undefined;
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Reads source page, UTM params and referrer from the current URL. Browser only. */
export function readLeadContext(): Partial<LeadPayload> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k) ?? undefined;
  return {
    source_page: window.location.pathname,
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
    referrer: document.referrer || undefined,
    ...(get("gclid") ? { gclid: get("gclid") } : {}),
    ...(get("fbclid") ? { fbclid: get("fbclid") } : {}),
  };
}
