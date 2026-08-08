import { SITE } from "../config/site";
import { getPropertyDetail } from "../content/property-detail";
import type { LeadPayload } from "./lead-schema";
import { EMAIL_RE } from "./lead-schema";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

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

function notificationHtml(payload: LeadPayload, property: PropertyInfo) {
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
    rows.splice(
      9,
      0,
      ["Property", property.title],
      ["Reference", property.reference],
      ["Link", `<a href="${property.url}">${property.url}</a>`],
    );
  }

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#7a7a7a;font-size:13px;vertical-align:top">${esc(
          label,
        )}</td><td style="padding:6px 0;color:#141414;font-size:14px">${
          label === "Link" ? value : esc(value)
        }</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Helvetica,Arial,sans-serif"><h2 style="font-size:18px;color:#141414">New lead</h2><table>${body}</table></div>`;
}

function confirmationHtml(payload: LeadPayload, property: PropertyInfo) {
  const es = payload.locale === "es";
  const name = esc(payload.name.split(" ")[0] ?? payload.name);
  const propertyLine = property
    ? es
      ? `<p style="font-size:15px;color:#3a3a3a">Tu consulta se refiere a <strong>${esc(
          property.title,
        )}</strong> (ref. ${esc(property.reference)}).</p>`
      : `<p style="font-size:15px;color:#3a3a3a">Your enquiry refers to <strong>${esc(
          property.title,
        )}</strong> (ref. ${esc(property.reference)}).</p>`
    : "";

  const body = es
    ? `<p style="font-size:15px;color:#3a3a3a">Hola ${name},</p>
       <p style="font-size:15px;color:#3a3a3a">Recibimos tu solicitud. Un asesor la revisa personalmente y te responde dentro de un día hábil con las opciones que encajan con tu presupuesto y tu plazo, además de los siguientes pasos para comprar desde el exterior.</p>
       ${propertyLine}
       <p style="font-size:15px;color:#3a3a3a">Si necesitas algo antes, responde a este correo directamente.</p>
       <p style="font-size:15px;color:#3a3a3a">${esc(SITE.advisor.name)}<br/>${esc(
         SITE.advisor.titleEs,
       )} · ${esc(SITE.name)}</p>`
    : `<p style="font-size:15px;color:#3a3a3a">Hi ${name},</p>
       <p style="font-size:15px;color:#3a3a3a">We received your request. An advisor reviews it personally and will write back within one business day with the options that match your budget and timeline, along with the next steps for buying from abroad.</p>
       ${propertyLine}
       <p style="font-size:15px;color:#3a3a3a">If you need anything sooner, just reply to this email.</p>
       <p style="font-size:15px;color:#3a3a3a">${esc(SITE.advisor.name)}<br/>${esc(
         SITE.advisor.titleEn,
       )} · ${esc(SITE.name)}</p>`;

  return `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px">${body}</div>`;
}

async function sendResend(input: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — email not sent");
    return;
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `${SITE.name} <${SITE.fromEmail}>`,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error(`Resend request failed [${response.status}]: ${text}`);
  }
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

  await Promise.all([
    sendResend({
      to: SITE.notifyEmail,
      subject: `New lead: ${payload.name} · ${payload.budget ?? "No budget given"} · ${
        payload.country ?? "Unknown country"
      }`,
      html: notificationHtml(payload, property),
      replyTo: payload.email,
    }),
    sendResend({
      to: payload.email,
      subject:
        payload.locale === "es"
          ? "Recibimos tu solicitud — AVEL Estates"
          : "We received your request — AVEL Estates",
      html: confirmationHtml(payload, property),
    }),
  ]);

  return { ok: true as const };
}
