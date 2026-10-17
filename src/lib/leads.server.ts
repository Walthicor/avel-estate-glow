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
  const yesNo = (v: boolean | undefined) => (v ? "Sí" : "No");
  if (payload.quote) {
    const q = payload.quote;
    // Cotización de AVEL Arquitectura: primero lo que sirve para llamar al cliente.
    return [
      ["Nombre", payload.name],
      ["Celular", payload.phone ?? "—"],
      ["Correo", payload.email],
      ["Ciudad del lote", q.place],
      ["Vive en", q.residence || "—"],
      ["Tipo de proyecto", q.project_type],
      ["¿Tiene lote?", q.has_lot],
      ["Etapa", q.stage],
      ["Paquetes", q.packages?.join(", ") || "—"],
      ["Servicios", q.services.join(", ") || "—"],
      ["Presupuesto aproximado", q.budget || "—"],
      ["Área del lote (m²)", q.lot_area_m2 ? String(q.lot_area_m2) : "—"],
      ["Tipo de predio", q.predio],
      ["Pisos", q.floors ? String(q.floors) : "—"],
      ["Área a construir (m²)", q.build_area_m2 ? String(q.build_area_m2) : "—"],
      ["Terreno", q.terrain],
      ["Acabados", q.finishes],
      ["Área total posible", `${q.estimate.total_m2} m²`],
      ["Inversión estimada en obra", `${formatCOP(q.estimate.min_cop)} – ${formatCOP(q.estimate.max_cop)}`],
      ["Mensaje", payload.message ?? "—"],
      ["Anuncio (?servicio=)", q.servicio ?? "—"],
      ["Fuente (utm_source)", payload.utm_source ?? "—"],
      ["Campaña (utm_campaign)", payload.utm_campaign ?? "—"],
      ["Palabra clave (utm_term)", payload.utm_term ?? "—"],
      ["Clic de Google (gclid)", q.gclid ?? "—"],
      ["Clic de Meta (fbclid)", q.fbclid ?? "—"],
      ["Página de llegada", q.landing_url ?? "—"],
      ["Acepta mensajes comerciales", yesNo(payload.marketing_consent)],
    ];
  }

  const rows: [string, string][] = [
    ["Nombre", payload.name],
    ["Correo", payload.email],
    ["Teléfono", payload.phone ?? "—"],
    ["País", payload.country ?? "—"],
    ["Tipo de comprador", payload.buyer_type ?? "—"],
    ["Propósito", payload.purpose ?? "—"],
    ["Presupuesto", payload.budget ?? "—"],
    ["Plazo", payload.timeline ?? "—"],
    ["Ciudades", payload.cities?.length ? payload.cities.join(", ") : "—"],
    ["Mensaje", payload.message ?? "—"],
    ["Idioma", payload.locale === "es" ? "Español" : "Inglés"],
    ["Formulario", payload.form_type],
    ["Página de origen", payload.source_page ?? "—"],
    ["Fuente (utm_source)", payload.utm_source ?? "—"],
    ["Medio (utm_medium)", payload.utm_medium ?? "—"],
    ["Campaña (utm_campaign)", payload.utm_campaign ?? "—"],
    ["Palabra clave (utm_term)", payload.utm_term ?? "—"],
    ["Contenido (utm_content)", payload.utm_content ?? "—"],
    ["Referido desde", payload.referrer ?? "—"],
    ["Acepta mensajes comerciales", yesNo(payload.marketing_consent)],
  ];

  if (property) {
    rows.splice(9, 0, ["Propiedad", property.title], ["Referencia", property.reference]);
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

  const webhook = process.env["LEAD_WEBHOOK_URL"];
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
        budget: payload.budget ?? "Sin presupuesto",
        country: payload.country ?? "Sin país",
        ...(payload.quote ? { kind: "arquitectura", place: payload.quote.place } : {}),
        rows: notificationRows(payload, property),
        ...(property ? { propertyUrl: property.url } : {}),
      },
    }),
    sendTemplateEmail("lead-confirmation", payload.email, {
      idempotencyKey: `lead-confirmation-${leadId}`,
      // Las respuestas del cliente llegan al correo del equipo, no a noreply.
      replyTo: SITE.notifyEmail,
      templateData: {
        firstName,
        ...(payload.form_type === "quote" ? { variant: "arquitectura" } : {}),
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
