import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Project, ProjectNeighbor } from "./projects";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order")
    .order("created_at");
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
});

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => ({ slug: String(d.slug).slice(0, 200) }))
  .handler(async ({ data }) => {
    const { data: rows, error } = await publicClient()
      .from("projects")
      .select("slug,name,main_photo,sort_order,created_at")
      .eq("published", true)
      .order("sort_order")
      .order("created_at");
    if (error) throw new Error(error.message);
    const list = rows ?? [];
    const i = list.findIndex((r) => r.slug === data.slug);
    if (i < 0) return null;
    const { data: project, error: e2 } = await publicClient()
      .from("projects")
      .select("*")
      .eq("slug", data.slug)
      .single();
    if (e2 || !project) return null;
    const pick = (r: (typeof list)[number]): ProjectNeighbor => ({ slug: r.slug, name: r.name, main_photo: r.main_photo });
    return {
      project: project as Project,
      prev: list.length > 1 ? pick(list[(i - 1 + list.length) % list.length]!) : null,
      next: list.length > 1 ? pick(list[(i + 1) % list.length]!) : null,
    };
  });
