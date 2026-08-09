import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";

import { useLocale } from "../../i18n/LocaleProvider";
import { CONTACT, DIAL_CODES } from "../../content/contact";
import { EMAIL_RE, readLeadContext } from "../../lib/lead-schema";
import { submitLead } from "../../lib/leads.functions";
import { Field, ChoiceGroup, fieldClass, labelClass, errorClass } from "./fields";

type Errors = Record<string, string>;

const TONE = "light" as const;

export function FullLeadForm({
  propertyId,
  className = "",
}: {
  propertyId?: string;
  className?: string;
} = {}) {
  const { locale, localePath } = useLocale();
  const copy = CONTACT[locale];
  const send = useServerFn(submitLead);

  const [step, setStep] = useState<1 | 2>(1);
  const [buyerType, setBuyerType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [dial, setDial] = useState("+1");
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const labelOf = (options: { value: string; label: string }[], value: string) =>
    options.find((o) => o.value === value)?.label ?? value;

  const goNext = () => {
    const next: Errors = {};
    if (!buyerType) next["buyer_type"] = copy.selectOne;
    if (!purpose) next["purpose"] = copy.selectOne;
    if (!budget) next["budget"] = copy.selectOne;
    if (!timeline) next["timeline"] = copy.selectOne;
    setErrors(next);
    if (Object.keys(next).length === 0) setStep(2);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next["name"] = copy.required;
    if (!email) next["email"] = copy.required;
    else if (!EMAIL_RE.test(email)) next["email"] = copy.invalidEmail;
    if (!country) next["country"] = copy.required;
    if (!consent) next["consent"] = copy.consentRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      await send({
        data: {
          ...readLeadContext(),
          form_type: "full",
          ...(propertyId ? { property_id: propertyId } : {}),
          buyer_type: labelOf(copy.buyerTypeOptions, buyerType),
          purpose: labelOf(copy.purposeOptions, purpose),
          budget: labelOf(copy.budgetOptions, budget),
          timeline: labelOf(copy.timelineOptions, timeline),
          cities: cities.map((c) => labelOf(copy.cityOptions, c)),
          name,
          email,
          ...(phone ? { phone: `${dial} ${phone}` } : {}),
          country,
          ...(message ? { message } : {}),
          locale,
          marketing_consent: marketing,
        },
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={`hairline bg-bone/95 p-8 text-abyss md:p-10 ${className}`}>
        <p role="status" aria-live="polite" className="type-h3 max-w-[30ch]">
          {copy.success}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-bone p-7 text-abyss md:p-10 ${className}`}>
      {/* Progress: two segments, active filled gold. */}
      <div className="flex items-center gap-3" aria-hidden="true">
        {[1, 2].map((n) => (
          <span
            key={n}
            className={`h-[3px] flex-1 ${step >= n ? "bg-gold-deep" : "bg-abyss/15"}`}
          />
        ))}
      </div>
      <p className="type-label mt-3 text-abyss/55">{copy.stepOf(step)}</p>
      <h2 className="type-h2 mt-4">{step === 1 ? copy.step1 : copy.step2}</h2>

      {step === 1 ? (
        <div className="mt-8 grid gap-8">
          <ChoiceGroup
            name="buyer_type"
            legend={copy.buyerType}
            options={copy.buyerTypeOptions}
            value={buyerType}
            onChange={setBuyerType}
            error={errors["buyer_type"]}
            tone={TONE}
          />
          <ChoiceGroup
            name="purpose"
            legend={copy.purpose}
            options={copy.purposeOptions}
            value={purpose}
            onChange={setPurpose}
            error={errors["purpose"]}
            tone={TONE}
          />
          <ChoiceGroup
            name="budget"
            legend={copy.budget}
            options={copy.budgetOptions}
            value={budget}
            onChange={setBudget}
            error={errors["budget"]}
            tone={TONE}
          />
          <ChoiceGroup
            name="timeline"
            legend={copy.timeline}
            options={copy.timelineOptions}
            value={timeline}
            onChange={setTimeline}
            error={errors["timeline"]}
            tone={TONE}
          />
          <ChoiceGroup
            name="cities"
            legend={copy.cities}
            hint={copy.citiesHint}
            options={copy.cityOptions}
            multiple
            values={cities}
            onToggle={(value) =>
              setCities((current) =>
                current.includes(value)
                  ? current.filter((c) => c !== value)
                  : [...current, value],
              )
            }
            tone={TONE}
          />

          <button type="button" className="btn-gold justify-self-start" onClick={goNext}>
            {copy.next}
          </button>
        </div>
      ) : (
        <form className="mt-8 grid gap-6 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
          <Field
            id="lead-name"
            label={copy.name}
            error={errors["name"]}
            tone={TONE}
            className="sm:col-span-2"
          >
            {(props) => (
              <input name="name" className={fieldClass(TONE, Boolean(errors["name"]))} {...props} />
            )}
          </Field>

          <Field id="lead-email" label={copy.email} error={errors["email"]} tone={TONE}>
            {(props) => (
              <input
                type="email"
                name="email"
                className={fieldClass(TONE, Boolean(errors["email"]))}
                {...props}
              />
            )}
          </Field>

          <div className="flex flex-col gap-2">
            <label htmlFor="lead-phone" className={labelClass(TONE)}>
              {copy.phone}
            </label>
            <div className="flex gap-2">
              <select
                aria-label={copy.dialCode}
                value={dial}
                onChange={(e) => setDial(e.target.value)}
                className={`${fieldClass(TONE, false)} w-[124px] shrink-0`}
              >
                {DIAL_CODES.map((c) => (
                  <option key={c.label} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                className={fieldClass(TONE, false)}
              />
            </div>
          </div>

          <Field
            id="lead-country"
            label={copy.country}
            error={errors["country"]}
            tone={TONE}
            className="sm:col-span-2"
          >
            {(props) => (
              <input
                name="country"
                className={fieldClass(TONE, Boolean(errors["country"]))}
                {...props}
              />
            )}
          </Field>

          <Field
            id="lead-message"
            label={copy.message}
            hint={copy.messageHint}
            tone={TONE}
            className="sm:col-span-2"
          >
            {(props) => (
              <textarea name="message" rows={4} className={fieldClass(TONE, false)} {...props} />
            )}
          </Field>

          <div className="sm:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 text-[14px] leading-relaxed text-abyss/80">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  aria-invalid={Boolean(errors["consent"])}
                  aria-describedby="lead-consent-error"
                  className="mt-1 h-4 w-4 accent-[#7a4e12]"
                />
                <span>
                  {copy.consent}{" "}
                  <a href={localePath("/legal/privacy")} className="link-draw text-gold-ink">
                    {copy.consentLinkText}
                  </a>
                </span>
              </label>
              <p id="lead-consent-error" aria-live="polite" className={`${errorClass(TONE)} pl-7`}>
                {errors["consent"] ?? ""}
              </p>
            </div>

            <label className="flex items-start gap-3 text-[14px] leading-relaxed text-abyss/80">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#7a4e12]"
              />
              <span>{copy.marketing}</span>
            </label>
          </div>

          {status === "error" ? (
            <p role="alert" className="type-label sm:col-span-2 text-[#8a1f11]">
              {copy.failure}
            </p>
          ) : null}

          <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-gold" disabled={status === "sending"}>
              {status === "sending" ? copy.sending : copy.submit}
            </button>
            <button
              type="button"
              className="type-label text-abyss/60 underline underline-offset-4"
              onClick={() => setStep(1)}
            >
              {copy.back}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
