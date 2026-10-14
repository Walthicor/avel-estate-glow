/** "AVEL" ocupando todo el ancho, en color de texto con baja opacidad. */
export function GiantWordmark({ word = "AVEL" }: { word?: string }) {
  return (
    <div aria-hidden="true" className="w-full select-none overflow-hidden">
      <p className="text-center font-display leading-[0.8] tracking-tight opacity-10" style={{ fontSize: "31vw" }}>
        {word}
      </p>
    </div>
  );
}
