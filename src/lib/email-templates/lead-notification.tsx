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
}

const main = { backgroundColor: "#ffffff", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { padding: "24px", maxWidth: "600px" };
const heading = { fontSize: "20px", color: "#0f1614", margin: "0 0 4px" };
const sub = { fontSize: "13px", color: "#6b6b6b", margin: "0 0 20px" };
const label = { fontSize: "12px", color: "#7a7a7a", margin: "0" };
const value = { fontSize: "15px", color: "#141414", margin: "0 0 12px" };
const rule = { height: "3px", backgroundColor: "#c9832b", width: "48px", margin: "0 0 16px" };

const Email = ({ rows = [], propertyUrl, name }: LeadNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New lead${name ? `: ${name}` : ""} — AVEL Estates`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={rule} />
        <Heading style={heading}>New lead</Heading>
        <Text style={sub}>Submitted through avelestates.com</Text>
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

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New lead: ${data["name"] ?? "Unknown"} · ${data["budget"] ?? "No budget given"} · ${
      data["country"] ?? "Unknown country"
    }`,
  displayName: "Lead notification (internal)",
  previewData: {
    name: "Jane Doe",
    budget: "600k–1M",
    country: "United States",
    rows: [
      ["Name", "Jane Doe"],
      ["Email", "jane@example.com"],
      ["Country", "United States"],
      ["Budget", "600k–1M"],
    ],
    propertyUrl: "https://avelestates.com/properties/example",
  },
} satisfies TemplateEntry;
