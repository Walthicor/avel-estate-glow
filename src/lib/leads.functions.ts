import { createServerFn } from "@tanstack/react-start";

import type { LeadPayload } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: LeadPayload) => data)
  .handler(async ({ data }) => {
    const { validateLead, saveLead } = await import("./leads.server");
    const errors = validateLead(data);
    if (Object.keys(errors).length > 0) {
      throw new Error("invalid_input");
    }
    return saveLead(data);
  });
