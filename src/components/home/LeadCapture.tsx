import { useId, useState, type FormEvent } from "react";

import type { HomeContent } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { Reveal } from "../Reveal";

type Errors = Record<string, string>;

export function LeadCapture({ content }: { content: HomeContent["lead"] }) {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const uid = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};

    for (const key of ["name", "email", "country", "budget", "timeline"]) {
      if (!String(data.get(key) ?? "").trim()) next[key] = t("form.required");
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next["email"] = t("form.invalidEmail");
    }

    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const field =
    "w-full border border-abyss/20 bg-transparent px-3 py-2.5 text-[15px] text-abyss focus:border-gold-deep aria-[invalid=true]:border-[#8a1f11]";

  const errorSummary = Object.values(errors);

  return (
    <section id="enquire" className="bg-bone px-6 py-24 text-abyss md:px-12 md:py-32 lg:pr-28">
      <Reveal className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="type-h1 max-w-[14ch] text-abyss">{content.heading}</h2>
          <p className="type-body mt-5 max-w-[40ch] text-abyss/70">{content.body}</p>
        </div>

        {sent ? (
          <p className="type-body self-center text-abyss/80" role="status" aria-live="polite">
            {content.success}
          </p>
        ) : (
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
            {/* Errors are announced without stealing focus. */}
            <p
              aria-live="polite"
              className={`type-label sm:col-span-2 text-[#8a1f11] ${
                errorSummary.length > 0 ? "" : "sr-only"
              }`}
            >
              {errorSummary.length > 0 ? t("form.error") : ""}
            </p>

            <Field
              id={`${uid}-name`}
              text={content.name}
              error={errors["name"]}
              className="sm:col-span-2"
            >
              {(props) => <input name="name" className={field} {...props} />}
            </Field>

            <Field
              id={`${uid}-email`}
              text={content.email}
              error={errors["email"]}
              className="sm:col-span-2"
            >
              {(props) => <input type="email" name="email" className={field} {...props} />}
            </Field>

            <Field id={`${uid}-country`} text={content.country} error={errors["country"]}>
              {(props) => <input name="country" className={field} {...props} />}
            </Field>

            <Field id={`${uid}-budget`} text={content.budget} error={errors["budget"]}>
              {(props) => (
                <select name="budget" defaultValue="" className={field} {...props}>
                  <option value="" disabled />
                  {content.budgetOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              id={`${uid}-timeline`}
              text={content.timeline}
              error={errors["timeline"]}
              className="sm:col-span-2"
            >
              {(props) => (
                <select name="timeline" defaultValue="" className={field} {...props}>
                  <option value="" disabled />
                  {content.timelineOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-gold">
                {content.submit}
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}

type ControlProps = {
  id: string;
  required: true;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

function Field({
  id,
  text,
  error,
  className = "",
  children,
}: {
  id: string;
  text: string;
  error?: string | undefined;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="type-label text-abyss/70">
        {text}
      </label>
      {children({
        id,
        required: true,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      <p id={errorId} aria-live="polite" className="type-label text-[#8a1f11] empty:hidden">
        {error ?? ""}
      </p>
    </div>
  );
}
