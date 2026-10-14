import { SITE } from "../config/site";
import { getPropertyDetail } from "../content/property-detail";
import { sendTemplateEmail } from "./email-templates/send-email";
import { formatCOP } from "./quote-math";
import type { LeadPayload } from "./lead-schema";
import { EMAIL_RE } from "./lead-schema";


export function validateLead(input: LeadPayload) {
  const errors: Record<string, string> = {};
  if (!input.name?.trim()) errors["name"] = "required";
  if (!input.email?.trim()) errors["email"] = "required";
  else if (!EMAIL_RE.test(input.email.trim())) errors["email"] = "email";
  if (input.form_type === "full") {
    for (const key of ["buyer_type", "purpose", "budget", "timeline"] as const) {
      if (!input[key]) errors[key] = "required";
    }
    if (!input.country?.trim()) errors["country"] = "required";
  }
  if (input.form_type === "desarrollador") {
    if (!input.phone?.trim()) errors["phone"] = "required";
    if (!input.message?.trim()) errors["company"] = "required";
  }
  if (input.form_type === "quote") {
    if (!input.phone?.trim()) errors["phone"] = "required";
    if (!input.habeas_consent) errors["habeas_consent"] = "required";
    if (!input.quote?.place?.trim()) errors["place"] = "required";
  }
  return errors;
}

type PropertyInfo = { title: string; reference: string; url: string } | null;

function propertyInfo(payload: LeadPayload): PropertyInfo {
  if (!payload.property_id) return null;
  const detail = getPropertyDetail(payload.property_id);
  if (!detail) return null;
  const path =
    payload.locale === "es"
      ? `/es/propiedades/${detail.slug}`
      : `/properties/${detail.slug}`;
  return {
    title: detail.record.titleEn,
    reference: detail.reference,
    url: `${SITE.url}${path}`,
  };
}

function notificationRows(payload: LeadPayload, property: PropertyInfo): [string, string][] {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone ?? "—"],
    ["Country", payload.country ?? "—"],
    ["Buyer type", payload.buyer_type ?? "—"],
    ["Purpose", payload.purpose ?? "—"],
    ["Budget", payload.budget ?? "—"],
    ["Timeline", payload.timeline ?? "—"],
    ["Cities", payload.cities?.length ? payload.cities.join(", ") : "—"],
    ["Message", payload.message ?? "—"],
    ["Language", payload.locale === "es" ? "Spanish" : "English"],
    ["Form", payload.form_type],
    ["Source page", payload.source_page ?? "—"],
    ["UTM source", payload.utm_source ?? "—"],
    ["UTM medium", payload.utm_medium ?? "—"],
    ["UTM campaign", payload.utm_campaign ?? "—"],
    ["UTM term", payload.utm_term ?? "—"],
    ["UTM content", payload.utm_content ?? "—"],
    ["Referrer", payload.referrer ?? "—"],
    ["Marketing consent", payload.marketing_consent ? "Yes" : "No"],
  ];

  if (payload.quote) {
    const q = payload.quote;
    rows.push(
      ["Project type", q.project_type],
      ["Has lot", q.has_lot],
      ["Services", q.services.join(", ") || "—"],
      ["Packages", q.packages?.join(", ") || "—"],
      ["Budget range", q.budget || "—"],
      ["Lives in", q.residence || "—"],
      ["Stage", q.stage],
      ["Place", q.place],
      ["Lot area (m²)", q.lot_area_m2 ? String(q.lot_area_m2) : "—"],
      ["Lot type", q.predio],
      ["Floors", q.floors ? String(q.floors) : "—"],
      ["Build area (m²)", q.build_area_m2 ? String(q.build_area_m2) : "—"],
      ["Terrain", q.terrain],
      ["Finishes", q.finishes],
      ["Possible total area", `${q.estimate.total_m2} m²`],
      [
        "Estimated build cost",
        `${formatCOP(q.estimate.min_cop)} – ${formatCOP(q.estimate.max_cop)}`,
      ],
      ["Google click id", q.gclid ?? "—"],
      ["Meta click id", q.fbclid ?? "—"],
    );
  }

  if (property) {
    rows.splice(9, 0, ["Property", property.title], ["Reference", property.reference]);
  }

  return rows;
}


export async function saveLead(payload: LeadPayload) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: inserted, error } = await supabaseAdmin.from("leads").insert({
    form_type: payload.form_type,
    status: "nuevo",
    quote: payload.quote ?? null,
    buyer_type: payload.buyer_type ?? null,
    purpose: payload.purpose ?? null,
    budget: payload.budget ?? null,
    timeline: payload.timeline ?? null,
    cities: payload.cities ?? [],
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone ?? null,
    country: payload.country ?? null,
    message: payload.message ?? null,
    property_id: payload.property_id ?? null,
    locale: payload.locale,
    source_page: payload.source_page ?? null,
    utm_source: payload.utm_source ?? null,
    utm_medium: payload.utm_medium ?? null,
    utm_campaign: payload.utm_campaign ?? null,
    utm_term: payload.utm_term ?? null,
    utm_content: payload.utm_content ?? null,
    referrer: payload.referrer ?? null,
    consent_at: new Date().toISOString(),
    marketing_consent: payload.marketing_consent ?? false,
  }).select("id").maybeSingle();

  if (error) throw new Error(error.message);

  const property = propertyInfo(payload);
  const leadId = inserted?.id ?? crypto.randomUUID();
  const firstName = payload.name.trim().split(" ")[0] ?? payload.name.trim();

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const results = await Promise.allSettled([
    webhook
      ? fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: leadId, created_at: new Date().toISOString(), status: "nuevo", ...payload }),
        })
      : Promise.resolve(null),
    sendTemplateEmail("lead-notification", SITE.notifyEmail, {
      idempotencyKey: `lead-notification-${leadId}`,
      replyTo: payload.email,
      templateData: {
        name: payload.name,
        budget: payload.budget ?? "No budget given",
        country: payload.country ?? "Unknown country",
        rows: notificationRows(payload, property),
        ...(property ? { propertyUrl: property.url } : {}),
      },
    }),
    sendTemplateEmail("lead-confirmation", payload.email, {
      idempotencyKey: `lead-confirmation-${leadId}`,
      templateData: {
        firstName,
        locale: payload.locale,
        advisorName: SITE.advisor.name,
        advisorTitle: payload.locale === "es" ? SITE.advisor.titleEs : SITE.advisor.titleEn,
        ...(property
          ? { propertyTitle: property.title, propertyReference: property.reference }
          : {}),
      },
    }),
  ]);

  // The lead is already stored; a mail failure must not fail the submission.
  for (const result of results) {
    if (result.status === "rejected") console.error("Lead email failed", result.reason);
  }


  return { ok: true as const };
}
