import type { Locale } from "../config/site";

export type LeadPayload = {
  form_type: "short" | "full";
  buyer_type?: string;
  purpose?: string;
  budget?: string;
  timeline?: string;
  cities?: string[];
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
  property_id?: string;
  locale: Locale;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  marketing_consent?: boolean;
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
  };
}
