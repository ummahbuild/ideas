# Idea pages (HTML)

Each idea has a **dedicated HTML page** at `idea/<slug>/index.html`, so URLs like:

- https://ideas.ummah.build/idea/praysap/
- https://ideas.ummah.build/idea/mosque-database/

route to a full page for that idea (description, status, quality, categories, requirements, related ideas, link back to the board).

## Regenerating

After editing [ideas.json](../ideas.json), regenerate all idea pages and the sitemap:

```bash
node scripts/generate-idea-html.mjs
```

This overwrites:

- `idea/<slug>/index.html` for each idea
- `sitemap.xml` (homepage + all idea URLs)

## Board links

The main [Ideas board](https://ideas.ummah.build) links each idea title and “Copy link” to these pages (e.g. `/idea/praysap/`) instead of hash anchors.
