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
  /** "arquitectura": cotización de la landing AVEL Arquitectura. */
  variant?: "inmobiliaria" | "arquitectura";
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
  variant = "inmobiliaria",
}: LeadConfirmationProps) => {
  const es = locale === "es";
  if (variant === "arquitectura") return <ArqEmail firstName={firstName} />;
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

/** Confirmación para quien pidió cotización en AVEL Arquitectura. */
const ArqEmail = ({ firstName }: { firstName?: string | undefined }) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Recibimos tu solicitud de cotización — AVEL Arquitectura</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={rule} />
        <Heading style={heading}>Recibimos tu solicitud de cotización</Heading>
        <Text style={body}>{`Hola ${firstName ?? ""}`.trim() + ","}</Text>
        <Text style={body}>
          Gracias por contarnos de tu proyecto. Nuestro equipo revisa la información que nos enviaste y te contacta por teléfono o correo en menos de 24 horas hábiles.
        </Text>
        <Text style={body}>
          En esa primera conversación revisamos tu lote, lo que la norma te permite construir y te enviamos una propuesta con alcance, tiempos y valor.
        </Text>
        <Text style={body}>
          Para avanzar más rápido, ten a mano la ubicación y el área de tu lote y, si lo tienes, el certificado de tradición. Si quieres agregar algo, responde a este correo.
        </Text>
        <Text style={sign}>
          Equipo AVEL Arquitectura
          <br />
          Una división de AVEL Estates
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    data["variant"] === "arquitectura"
      ? "Recibimos tu solicitud de cotización — AVEL Arquitectura"
      : data["locale"] === "es"
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
