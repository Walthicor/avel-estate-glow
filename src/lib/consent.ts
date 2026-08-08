/**
 * Cookie consent, stored as a versioned object in localStorage.
 * No analytics or marketing script may load before `analytics` / `marketing`
 * is explicitly true here.
 */
export const CONSENT_KEY = "avel_consent";
export const CONSENT_VERSION = 1;

export type ConsentCategories = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = ConsentCategories & {
  version: number;
  /** ISO timestamp of the decision — evidence the consent existed. */
  decidedAt: string;
};

export const CONSENT_EVENT = "avel:consent-change";
export const CONSENT_OPEN_EVENT = "avel:consent-open";

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      essential: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decidedAt: parsed.decidedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    essential: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* storage blocked — the banner simply reappears next visit */
  }
  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: record }));
  return record;
}

/** Ask the banner to reopen its preferences panel (footer link). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/**
 * Single place where measurement scripts are allowed to attach.
 * Nothing is loaded until consent for that category is granted.
 */
export function applyConsent(record: ConsentRecord) {
  if (typeof window === "undefined") return;
  if (record.analytics) {
    // Load the analytics tag here, e.g. injectScript(GA_URL). Intentionally
    // empty until a measurement ID exists — firing before consent is the breach.
  }
  if (record.marketing) {
    // Load marketing/remarketing tags here, under the same rule.
  }
}
