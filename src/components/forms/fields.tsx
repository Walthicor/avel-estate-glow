import type { ReactNode } from "react";

export type Tone = "dark" | "light";

export const fieldClass = (tone: Tone, invalid: boolean) =>
  [
    "w-full px-3 py-2.5 text-[15px] bg-transparent border focus:outline-none",
    tone === "dark"
      ? "border-[rgba(140,164,165,0.35)] text-bone placeholder:text-sage focus:border-gold"
      : "border-abyss/20 text-abyss placeholder:text-abyss/45 focus:border-gold-deep",
    invalid ? (tone === "dark" ? "border-[#f2a196]" : "border-[#8a1f11]") : "",
  ].join(" ");

export const labelClass = (tone: Tone) =>
  `type-label ${tone === "dark" ? "text-sage" : "text-abyss/60"}`;

export const errorClass = (tone: Tone) =>
  `type-label ${tone === "dark" ? "text-[#f2a196]" : "text-[#8a1f11]"} empty:hidden`;

export function Field({
  id,
  label,
  error,
  tone,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  tone: Tone;
  hint?: string;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string;
  }) => ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={labelClass(tone)}>
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className={`type-label ${tone === "dark" ? "text-sage/70" : "text-abyss/45"}`}>
          {hint}
        </p>
      ) : null}
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": `${id}-error${hint ? ` ${id}-hint` : ""}`,
      })}
      <p id={`${id}-error`} aria-live="polite" className={errorClass(tone)}>
        {error ?? ""}
      </p>
    </div>
  );
}

/** Radio group rendered as selectable chips, with inline validation. */
export function ChoiceGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  tone,
  multiple = false,
  values = [],
  onToggle,
  hint,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string | undefined;
  tone: Tone;
  multiple?: boolean;
  values?: string[];
  onToggle?: (value: string) => void;
  hint?: string;
}) {
  const base =
    "type-label border px-4 py-2.5 text-left transition-colors cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-offset-2";
  const idle =
    tone === "dark"
      ? "border-[rgba(140,164,165,0.35)] text-sage hover:border-gold hover:text-bone"
      : "border-abyss/20 text-abyss/70 hover:border-gold-deep hover:text-abyss";
  const active =
    tone === "dark"
      ? "border-gold text-bone bg-[rgba(198,160,90,0.10)]"
      : "border-gold-deep text-abyss bg-[rgba(198,160,90,0.14)]";

  return (
    <fieldset
      className="flex flex-col gap-3"
      aria-invalid={Boolean(error)}
      aria-describedby={`${name}-error`}
    >
      <legend className={labelClass(tone)}>{legend}</legend>
      {hint ? (
        <p className={`type-label ${tone === "dark" ? "text-sage/70" : "text-abyss/45"}`}>{hint}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = multiple ? values.includes(option.value) : value === option.value;
          return (
            <label key={option.value} className={`${base} ${selected ? active : idle}`}>
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option.value}
                checked={selected}
                onChange={() =>
                  multiple ? onToggle?.(option.value) : onChange?.(option.value)
                }
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      <p id={`${name}-error`} aria-live="polite" className={errorClass(tone)}>
        {error ?? ""}
      </p>
    </fieldset>
  );
}
