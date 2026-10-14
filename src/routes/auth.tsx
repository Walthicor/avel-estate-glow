import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s["redirect"] === "string" && s["redirect"].startsWith("/") && !s["redirect"].startsWith("//") ? s["redirect"] : "/admin/proyectos",
  }),
  head: () => ({
    meta: [
      { title: "Ingresar | AVEL Arquitectura" },
      { name: "description", content: "Acceso privado al panel de proyectos de AVEL Arquitectura." },
      { property: "og:title", content: "Ingresar | AVEL Arquitectura" },
      { property: "og:description", content: "Acceso privado al panel de proyectos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg("Correo o contraseña incorrectos.");
      navigate({ to: redirect, replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      setBusy(false);
      setMsg(error ? error.message : "Te enviamos un correo para confirmar tu cuenta. Ábrelo y luego ingresa aquí.");
    }
  }

  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-paper px-4 pt-28 text-abyss">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5">
        <h1 className="font-display text-4xl">{mode === "in" ? "Ingresar" : "Crear cuenta"}</h1>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em]">Correo</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-abyss/30 bg-paper px-3 py-2" />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em]">Contraseña</span>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border border-abyss/30 bg-paper px-3 py-2" />
        </label>
        {msg && <p role="status" className="text-sm">{msg}</p>}
        <button disabled={busy} className="btn-gold w-full justify-center">{busy ? "…" : mode === "in" ? "Ingresar" : "Crear cuenta"}</button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm underline">
          {mode === "in" ? "¿Primera vez? Crea tu cuenta" : "Ya tengo cuenta"}
        </button>
      </form>
    </main>
  );
}
