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
- The architecture quote form (src/components/arquitectura/QuoteForm.tsx) and calculator take their figures from the pure, tested module src/lib/quote-math.ts and measurement events from src/lib/analytics.ts. A submitted quote is stored as a lead with form_type "quote" — keep the calculator free of UI so its numbers stay testable and its factors stay in one place.
