import logo from "../../assets/avel-logo-full.png.asset.json";

export function AvelLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="AVEL Estates"
      className={`h-[120px] w-auto shrink-0 select-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
