import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PROJECT_SERVICES, PROJECT_STATUSES, PROJECT_TYPES, projectPath, type Project } from "../../lib/projects";

export const Route = createFileRoute("/_authenticated/admin/proyectos")({
  head: () => ({
    meta: [
      { title: "Panel de proyectos | AVEL Arquitectura" },
      { name: "description", content: "Panel privado para crear y editar proyectos de AVEL Arquitectura." },
      { property: "og:title", content: "Panel de proyectos | AVEL Arquitectura" },
      { property: "og:description", content: "Panel privado de proyectos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminProyectos,
});

type Draft = Omit<Project, "id"> & { id?: string };

const EMPTY: Draft = {
  slug: "", name: "", city: "", department: "", type: "Residencial", area_m2: null, year: null,
  team_role: "", status: "En desarrollo", tagline: "", description: "", main_photo: null, sketch: null,
  gallery: [], services: [], lat: null, lng: null, sort_order: 0, published: true,
};

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Uploads to the private bucket and returns a long-lived signed URL (10 years) usable in <img>. */
async function upload(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("project-media").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("project-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2 || !data) throw e2 ?? new Error("URL");
  return data.signedUrl;
}

const field = "mt-1 w-full border border-abyss/30 bg-paper px-3 py-2";
const lab = "font-mono text-[11px] uppercase tracking-[0.2em] text-abyss/70";

function AdminProyectos() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [list, setList] = useState<Project[]>([]);
  const [d, setD] = useState<Draft | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.from("projects").select("*").order("sort_order").order("created_at");
    setList((data ?? []) as Project[]);
  }

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin");
      const ok = (data?.length ?? 0) > 0;
      setIsAdmin(ok);
      if (ok) load();
    })();
  }, []);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => (x ? { ...x, [k]: v } : x));

  async function onFile(k: "main_photo" | "sketch", f?: File) {
    if (!f) return;
    setBusy(true);
    try { set(k, await upload(f)); } catch { setMsg("No se pudo subir la imagen."); }
    setBusy(false);
  }
  async function onGallery(files: FileList | null) {
    if (!files?.length || !d) return;
    setBusy(true);
    try {
      const urls = await Promise.all(Array.from(files).map(upload));
      set("gallery", [...d.gallery, ...urls]);
    } catch { setMsg("No se pudo subir alguna imagen."); }
    setBusy(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!d) return;
    setBusy(true);
    setMsg(null);
    const { id, ...rest } = d;
    const row = { ...rest, slug: slugify(rest.slug || rest.name) };
    const { error } = id
      ? await supabase.from("projects").update(row).eq("id", id)
      : await supabase.from("projects").insert(row);
    setBusy(false);
    if (error) return setMsg(error.message.includes("duplicate") ? "Ya existe un proyecto con esa dirección (slug)." : "No se pudo guardar.");
    setMsg("Proyecto guardado.");
    setD(null);
    load();
  }

  async function remove() {
    if (!d?.id || !confirm(`¿Borrar "${d.name}"? No se puede deshacer.`)) return;
    await supabase.from("projects").delete().eq("id", d.id);
    setD(null);
    load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) return <main className="min-h-screen bg-paper pt-40 text-center text-abyss">Cargando…</main>;
  if (!isAdmin)
    return (
      <main className="min-h-screen bg-paper px-4 pt-40 text-center text-abyss">
        <p>Tu cuenta no tiene permiso para editar proyectos.</p>
        <button onClick={signOut} className="mt-4 underline">Cerrar sesión</button>
      </main>
    );

  return (
    <main id="main" className="min-h-screen bg-paper px-4 pb-24 pt-36 text-abyss md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-5xl">Proyectos</h1>
          <div className="flex gap-3">
            <button onClick={() => { setD({ ...EMPTY, sort_order: list.length + 1 }); setMsg(null); }} className="btn-gold">+ Nuevo proyecto</button>
            <button onClick={signOut} className="btn-ghost">Salir</button>
          </div>
        </div>
        {msg && <p role="status" className="mt-4 text-sm">{msg}</p>}

        {!d && (
          <ul className="mt-10 divide-y divide-abyss/15 border-y border-abyss/15">
            {list.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                {p.main_photo && <img src={p.main_photo} alt="" className="h-14 w-20 object-cover" />}
                <div className="flex-1">
                  <p className="font-display text-2xl">{p.name}{!p.published && <span className="ml-2 font-mono text-xs">(oculto)</span>}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-abyss/60">{p.city} · {p.type} · {p.status}</p>
                </div>
                <a href={projectPath(p.slug, "es")} target="_blank" rel="noreferrer" className="text-sm underline">Ver</a>
                <button onClick={() => { setD(p); setMsg(null); }} className="btn-ghost">Editar</button>
              </li>
            ))}
          </ul>
        )}

        {d && (
          <form onSubmit={save} className="mt-10 grid gap-5 md:grid-cols-2">
            <label className="block"><span className={lab}>Nombre *</span><input required className={field} value={d.name} onChange={(e) => set("name", e.target.value)} /></label>
            <label className="block"><span className={lab}>Dirección web (slug)</span><input className={field} placeholder={slugify(d.name)} value={d.slug} onChange={(e) => set("slug", e.target.value)} /></label>
            <label className="block"><span className={lab}>Ciudad</span><input className={field} value={d.city} onChange={(e) => set("city", e.target.value)} /></label>
            <label className="block"><span className={lab}>Departamento</span><input className={field} value={d.department} onChange={(e) => set("department", e.target.value)} /></label>
            <label className="block"><span className={lab}>Tipo</span>
              <select className={field} value={d.type} onChange={(e) => set("type", e.target.value)}>{PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
            <label className="block"><span className={lab}>Estado</span>
              <select className={field} value={d.status} onChange={(e) => set("status", e.target.value)}>{PROJECT_STATUSES.map((t) => <option key={t}>{t}</option>)}</select></label>
            <label className="block"><span className={lab}>Área (m²)</span><input type="number" className={field} value={d.area_m2 ?? ""} onChange={(e) => set("area_m2", e.target.value ? Number(e.target.value) : null)} /></label>
            <label className="block"><span className={lab}>Año</span><input type="number" className={field} value={d.year ?? ""} onChange={(e) => set("year", e.target.value ? Number(e.target.value) : null)} /></label>
            <label className="block md:col-span-2"><span className={lab}>Rol del equipo</span><input className={field} value={d.team_role} onChange={(e) => set("team_role", e.target.value)} /></label>
            <label className="block md:col-span-2"><span className={lab}>Frase principal</span><input className={field} value={d.tagline} onChange={(e) => set("tagline", e.target.value)} /></label>
            <label className="block md:col-span-2"><span className={lab}>Descripción</span><textarea rows={5} className={field} value={d.description} onChange={(e) => set("description", e.target.value)} /></label>
            <label className="block"><span className={lab}>Latitud (mapa)</span><input type="number" step="any" className={field} value={d.lat ?? ""} onChange={(e) => set("lat", e.target.value ? Number(e.target.value) : null)} /></label>
            <label className="block"><span className={lab}>Longitud (mapa)</span><input type="number" step="any" className={field} value={d.lng ?? ""} onChange={(e) => set("lng", e.target.value ? Number(e.target.value) : null)} /></label>
            <label className="block"><span className={lab}>Orden</span><input type="number" className={field} value={d.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} /></label>
            <label className="flex items-center gap-2 pt-6"><input type="checkbox" checked={d.published} onChange={(e) => set("published", e.target.checked)} /> Visible en el sitio</label>

            <fieldset className="md:col-span-2"><legend className={lab}>Lo que hicimos</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {PROJECT_SERVICES.map((s) => (
                  <label key={s} className="flex items-center gap-2 border border-abyss/20 px-3 py-1.5 text-sm">
                    <input type="checkbox" checked={d.services.includes(s)} onChange={(e) => set("services", e.target.checked ? [...d.services, s] : d.services.filter((x) => x !== s))} />{s}
                  </label>
                ))}
              </div>
            </fieldset>

            {(["main_photo", "sketch"] as const).map((k) => (
              <div key={k}>
                <span className={lab}>{k === "main_photo" ? "Foto principal" : "Boceto"}</span>
                {d[k] && <img src={d[k]!} alt="" className="mt-2 aspect-video w-full object-cover" />}
                <input type="file" accept="image/*" className="mt-2 block text-sm" onChange={(e) => onFile(k, e.target.files?.[0])} />
              </div>
            ))}

            <div className="md:col-span-2">
              <span className={lab}>Galería</span>
              <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-5">
                {d.gallery.map((g, i) => (
                  <div key={g + i} className="relative">
                    <img src={g} alt="" className="aspect-square w-full object-cover" />
                    <button type="button" aria-label="Quitar foto" onClick={() => set("gallery", d.gallery.filter((_, j) => j !== i))} className="absolute right-1 top-1 bg-abyss px-2 text-paper">×</button>
                  </div>
                ))}
              </div>
              <input type="file" accept="image/*" multiple className="mt-2 block text-sm" onChange={(e) => onGallery(e.target.files)} />
            </div>

            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button disabled={busy} className="btn-gold">{busy ? "Guardando…" : "Guardar"}</button>
              <button type="button" onClick={() => setD(null)} className="btn-ghost">Cancelar</button>
              {d.id && <button type="button" onClick={remove} className="ml-auto text-sm text-destructive underline">Borrar proyecto</button>}
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
