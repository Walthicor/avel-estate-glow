/**
 * Captures ad attribution the moment someone lands, so it survives navigation
 * inside the site. First touch wins within the browser session.
 */
const KEY = "avel-attribution-v1";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "servicio"] as const;

export type Attribution = Partial<Record<(typeof FIELDS)[number], string>> & { landing_url?: string };

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const existing = readAttribution();
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const f of FIELDS) {
    const v = params.get(f);
    if (v) fresh[f] = v.slice(0, 200);
  }
  // A new ad click replaces the old one; a plain visit keeps what we had.
  if (existing.landing_url && Object.keys(fresh).length === 0) return existing;
  const next: Attribution = { ...fresh, landing_url: window.location.href.slice(0, 500) };
  try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode */ }
  return next;
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution; } catch { return {}; }
}
