import { SITE } from "../config/site";
import { getPropertyDetail } from "../content/property-detail";
import { sendTemplateEmail } from "./email-templates/send-email";
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

  if (property) {
    rows.splice(9, 0, ["Property", property.title], ["Reference", property.reference]);
  }

  return rows;
}


export async function saveLead(payload: LeadPayload) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { error } = await supabaseAdmin.from("leads").insert({
    form_type: payload.form_type,
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
  });

  if (error) throw new Error(error.message);

  const property = propertyInfo(payload);
  const leadId = inserted?.id ?? crypto.randomUUID();
  const firstName = payload.name.trim().split(" ")[0] ?? payload.name.trim();

  const results = await Promise.allSettled([
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
