import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { TemplateEntry } from "./registry";

export interface LeadConfirmationProps {
  firstName?: string;
  locale?: "en" | "es";
  propertyTitle?: string;
  propertyReference?: string;
  advisorName?: string;
  advisorTitle?: string;
}

const main = { backgroundColor: "#ffffff", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { padding: "28px 24px", maxWidth: "560px" };
const rule = { height: "3px", backgroundColor: "#c9832b", width: "48px", margin: "0 0 20px" };
const heading = { fontSize: "22px", color: "#0f1614", margin: "0 0 16px" };
const body = { fontSize: "15px", lineHeight: "24px", color: "#3a3a3a", margin: "0 0 16px" };
const sign = { fontSize: "14px", color: "#0f1614", margin: "24px 0 0" };

const Email = ({
  firstName,
  locale = "en",
  propertyTitle,
  propertyReference,
  advisorName = "Valentina Restrepo",
  advisorTitle,
}: LeadConfirmationProps) => {
  const es = locale === "es";
  const greeting = es
    ? `Hola ${firstName ?? ""}`.trim() + ","
    : `Hi ${firstName ?? "there"},`;
  const propertyLine = propertyTitle
    ? es
      ? `Tu consulta se refiere a ${propertyTitle}${
          propertyReference ? ` (ref. ${propertyReference})` : ""
        }.`
      : `Your enquiry refers to ${propertyTitle}${
          propertyReference ? ` (ref. ${propertyReference})` : ""
        }.`
    : null;

  return (
    <Html lang={es ? "es" : "en"} dir="ltr">
      <Head />
      <Preview>
        {es ? "Recibimos tu solicitud — AVEL Estates" : "We received your request — AVEL Estates"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={rule} />
          <Heading style={heading}>
            {es ? "Recibimos tu solicitud" : "We received your request"}
          </Heading>
          <Text style={body}>{greeting}</Text>
          <Text style={body}>
            {es
              ? "Un asesor la revisa personalmente y te responde dentro de un día hábil con las opciones que encajan con tu presupuesto y tu plazo, además de los siguientes pasos para comprar desde el exterior."
              : "An advisor reviews it personally and will write back within one business day with the options that match your budget and timeline, along with the next steps for buying from abroad."}
          </Text>
          {propertyLine ? <Text style={body}>{propertyLine}</Text> : null}
          <Text style={body}>
            {es
              ? "Si necesitas algo antes, responde a este correo directamente."
              : "If you need anything sooner, just reply to this email."}
          </Text>
          <Text style={sign}>
            {advisorName}
            <br />
            {advisorTitle ?? (es ? "Asesora de clientes" : "Client Advisor")} · AVEL Estates
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    data["locale"] === "es"
      ? "Recibimos tu solicitud — AVEL Estates"
      : "We received your request — AVEL Estates",
  displayName: "Lead confirmation (client)",
  previewData: {
    firstName: "Jane",
    locale: "en",
    propertyTitle: "Casa del Bosque",
    propertyReference: "AVL-MED-1234",
  },
} satisfies TemplateEntry;
