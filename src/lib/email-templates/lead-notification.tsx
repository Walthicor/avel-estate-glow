import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { TemplateEntry } from "./registry";

export interface LeadNotificationProps {
  rows?: Array<[string, string]>;
  propertyUrl?: string;
  name?: string;
  /** "arquitectura" para cotizaciones de la landing AVEL Arquitectura. */
  kind?: "inmobiliaria" | "arquitectura";
}

const main = { backgroundColor: "#ffffff", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { padding: "24px", maxWidth: "600px" };
const heading = { fontSize: "20px", color: "#0f1614", margin: "0 0 4px" };
const sub = { fontSize: "13px", color: "#6b6b6b", margin: "0 0 20px" };
const label = { fontSize: "12px", color: "#7a7a7a", margin: "0" };
const value = { fontSize: "15px", color: "#141414", margin: "0 0 12px" };
const rule = { height: "3px", backgroundColor: "#c9832b", width: "48px", margin: "0 0 16px" };

const Email = ({ rows = [], propertyUrl, name, kind = "inmobiliaria" }: LeadNotificationProps) => {
  const title = kind === "arquitectura" ? "Nueva cotización de arquitectura" : "Nuevo contacto";
  return (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>{`${title}${name ? `: ${name}` : ""} — AVEL`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={rule} />
        <Heading style={heading}>{title}</Heading>
        <Text style={sub}>Enviado desde avelestates.com. Responde a este correo para escribirle directo al cliente.</Text>
        {rows.map(([k, v]) => (
          <Section key={k}>
            <Text style={label}>{k}</Text>
            <Text style={value}>{v}</Text>
          </Section>
        ))}
        {propertyUrl ? (
          <Text style={value}>
            <Link href={propertyUrl}>{propertyUrl}</Link>
          </Text>
        ) : null}
      </Container>
    </Body>
  </Html>
  );
};

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    data["kind"] === "arquitectura"
      ? `Nueva cotización de arquitectura: ${data["name"] ?? "Sin nombre"} · ${data["place"] ?? "Sin ciudad"}`
      : `Nuevo contacto: ${data["name"] ?? "Sin nombre"} · ${data["budget"] ?? "Sin presupuesto"} · ${
          data["country"] ?? "Sin país"
        }`,
  displayName: "Lead notification (internal)",
  previewData: {
    name: "Ana Pérez",
    kind: "arquitectura",
    place: "Popayán",
    rows: [
      ["Nombre", "Ana Pérez"],
      ["Correo", "ana@example.com"],
      ["Ciudad del lote", "Popayán"],
      ["Presupuesto aproximado", "$200 a $500 millones"],
    ],
    propertyUrl: "https://avelestates.com/properties/example",
  },
} satisfies TemplateEntry;
