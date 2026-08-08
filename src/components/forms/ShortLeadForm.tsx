import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";

import { useLocale } from "../../i18n/LocaleProvider";
import { CONTACT } from "../../content/contact";
import { EMAIL_RE, readLeadContext } from "../../lib/lead-schema";
import { submitLead } from "../../lib/leads.functions";
import { Field, ChoiceGroup, fieldClass, type Tone } from "./fields";

type Errors = Record<string, string>;

export function ShortLeadForm({
  tone = "dark",
  propertyId,
  heading,
  body,
  className = "",
}: {
  tone?: Tone;
  propertyId?: string;
  heading?: string | null;
  body?: string | null;
  className?: string;
}) {
  const { locale, localePath } = useLocale();
  const copy = CONTACT[locale];
  const send = useServerFn(submitLead);

  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const title =
    heading === null ? null : (heading ?? (propertyId ? copy.shortPropertyHeading : copy.shortHeading));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();

    const next: Errors = {};
    if (!name) next["name"] = copy.required;
    if (!email) next["email"] = copy.required;
    else if (!EMAIL_RE.test(email)) next["email"] = copy.invalidEmail;
    if (!country) next["country"] = copy.required;
    if (!budget) next["budget"] = copy.selectOne;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      await send({
        data: {
          ...readLeadContext(),
          form_type: "short",
          name,
          email,
          country,
          budget: copy.budgetOptions.find((o) => o.value === budget)?.label ?? budget,
          ...(propertyId ? { property_id: propertyId } : {}),
          locale,
        },
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p
        role="status"
        aria-live="polite"
        className={`type-body ${tone === "dark" ? "text-sage" : "text-abyss/80"} ${className}`}
      >
        {copy.success}
      </p>
    );
  }

  return (
    <form className={`grid gap-5 ${className}`} onSubmit={onSubmit} noValidate>
      {title === null ? null : (
        <div>
          <h3 className={`type-h3 ${tone === "dark" ? "text-bone" : "text-abyss"}`}>{title}</h3>
          {body === null ? null : (
            <p
              className={`type-body mt-3 max-w-[42ch] ${
                tone === "dark" ? "text-sage" : "text-abyss/70"
              }`}
            >
              {body ?? copy.shortBody}
            </p>
          )}
        </div>
      )}

      <Field id="short-name" label={copy.name} error={errors["name"]} tone={tone}>
        {(props) => <input name="name" className={fieldClass(tone, Boolean(errors["name"]))} {...props} />}
      </Field>

      <Field id="short-email" label={copy.email} error={errors["email"]} tone={tone}>
        {(props) => (
          <input
            type="email"
            name="email"
            className={fieldClass(tone, Boolean(errors["email"]))}
            {...props}
          />
        )}
      </Field>

      <Field id="short-country" label={copy.country} error={errors["country"]} tone={tone}>
        {(props) => (
          <input name="country" className={fieldClass(tone, Boolean(errors["country"]))} {...props} />
        )}
      </Field>

      <ChoiceGroup
        name="short-budget"
        legend={copy.budget}
        options={copy.budgetOptions}
        value={budget}
        onChange={setBudget}
        error={errors["budget"]}
        tone={tone}
      />

      <p className={`type-label ${tone === "dark" ? "text-sage/70" : "text-abyss/55"}`}>
        {copy.consent}{" "}
        <a
          href={localePath("/legal/privacy")}
          className={`link-draw ${tone === "dark" ? "text-gold" : "text-gold-ink"}`}
        >
          {copy.consentLinkText}
        </a>
      </p>

      {status === "error" ? (
        <p role="alert" className={`type-label ${tone === "dark" ? "text-[#f2a196]" : "text-[#8a1f11]"}`}>
          {copy.failure}
        </p>
      ) : null}

      <button type="submit" className="btn-gold btn-gold-quiet" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
