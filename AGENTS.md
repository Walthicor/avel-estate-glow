<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The AVEL Arquitectura landing (/es/arquitectura) lives in src/components/arquitectura/ with copy in src/content/arquitectura.ts and its own tokens/utilities (arq-*) in styles.css; __root hides the site chrome on that path — it is an ad destination with a single goal.
- Architecture projects live in the public.projects table (public read, admin-only write via has_role); public pages read through server functions in src/lib/projects.functions.ts, the /admin/proyectos panel writes from the browser under RLS. Images go to the private project-media bucket as long-lived signed URLs because public buckets are blocked.
- The quote builder lives in src/components/quote/; its area and price figures come from the pure, tested module src/lib/quote-math.ts and measurement events from src/lib/analytics.ts. A submitted quote is stored as a lead with form_type "quote" — keep the calculator free of UI so its numbers stay testable and its factors stay in one place.
