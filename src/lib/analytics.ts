/**
 * Measurement layer. Nothing loads or fires until the person has accepted
 * the matching consent category and the IDs exist in the environment:
 *   VITE_GA_MEASUREMENT_ID  — GA4, e.g. G-XXXXXXXXXX
 *   VITE_GOOGLE_ADS_ID      — Google Ads, e.g. AW-XXXXXXXXXX
 *   VITE_META_PIXEL_ID      — Meta Pixel, numeric ID
 * With no ID the functions are silent no-ops, so the form never breaks.
 */
import { readConsent } from "./consent";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
};

type TaggedWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Fbq;
  _fbq?: unknown;
};

export const TAG_IDS = {
  ga: (import.meta.env["VITE_GA4_ID"] ?? import.meta.env["VITE_GA_MEASUREMENT_ID"]) as string | undefined,
  ads: import.meta.env["VITE_GOOGLE_ADS_ID"] as string | undefined,
  adsLabel: import.meta.env["VITE_GOOGLE_ADS_LEAD_LABEL"] as string | undefined,
  pixel: import.meta.env["VITE_META_PIXEL_ID"] as string | undefined,
};

let loaded = false;

const env = (id: string | undefined) => (id && id.trim() ? id.trim() : "");

function inject(src: string) {
  if (document.querySelector(`script[data-avel-tag="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.dataset["avelTag"] = src;
  document.head.appendChild(script);
}

/** Attach the tags the person has consented to. Safe to call on every consent change. */
export function loadMeasurementTags() {
  if (typeof window === "undefined" || loaded) return;
  const consent = readConsent();
  if (!consent) return;
  const w = window as TaggedWindow;
  const ga = env(TAG_IDS.ga);
  const ads = env(TAG_IDS.ads);
  const pixel = env(TAG_IDS.pixel);

  if (consent.analytics && (ga || ads)) {
    w.dataLayer = w.dataLayer || [];
    const dataLayer = w.dataLayer;
    w.gtag =
      w.gtag ??
      function gtag() {
        dataLayer.push(arguments);
      };
    w.gtag("js", new Date());
    if (ga) w.gtag("config", ga);
    if (ads) w.gtag("config", ads);
    inject(`https://www.googletagmanager.com/gtag/js?id=${ga || ads}`);
  }

  if (consent.marketing && pixel) {
    w.dataLayer = w.dataLayer || [];
    const dataLayer = w.dataLayer;
    const queue = ((...args: unknown[]) => dataLayer.push(args)) as unknown as Fbq;
    const fbq: Fbq = (...args: unknown[]) => {
      if (w.fbq?.callMethod) w.fbq.callMethod(...args);
      else queue(args);
    };
    w.fbq = w.fbq ?? fbq;
    w._fbq = w._fbq ?? w.fbq;
    w.fbq("init", pixel);
    w.fbq("track", "PageView");
    inject("https://connect.facebook.net/en_US/fbevents.js");
  }

  loaded = true;
}

/** Report the completed quote: GA4 generate_lead, Meta Lead and the Google Ads conversion. */
export function trackLeadConversion() {
  if (typeof window === "undefined") return;
  const consent = readConsent();
  if (!consent) return;
  const w = window as TaggedWindow;
  const ga = env(TAG_IDS.ga);
  const ads = env(TAG_IDS.ads);
  const label = env(TAG_IDS.adsLabel) || "lead";
  const pixel = env(TAG_IDS.pixel);

  if (consent.analytics && w.gtag) {
    if (ga) w.gtag("event", "generate_lead", { send_to: ga, currency: "COP" });
    if (ads) w.gtag("event", "conversion", { send_to: `${ads}/${label}`, currency: "COP" });
  }
  if (consent.marketing && pixel && w.fbq) w.fbq("track", "Lead");
}

const META_STANDARD = new Set(["Lead", "Contact"]);

/** Any other landing event (Contact, calculadora_usada, cotizador_paso_N, servicio_elegido). */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const consent = readConsent();
  if (!consent) return;
  const w = window as TaggedWindow;
  if (consent.analytics && w.gtag && env(TAG_IDS.ga)) w.gtag("event", name, { send_to: env(TAG_IDS.ga), ...params });
  if (consent.marketing && w.fbq && env(TAG_IDS.pixel)) w.fbq(META_STANDARD.has(name) ? "track" : "trackCustom", name, params);
}
