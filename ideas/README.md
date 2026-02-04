# Idea pages (one file per idea)

Each idea from [ideas.json](../ideas.json) has a **markdown file** in this folder for:

- **Documentation** – human-readable pages you can open in GitHub or any Markdown viewer
- **Structured data** – YAML frontmatter (id, title, description, status, url, emoji, slug, quality, categories, requirements) for tooling and static site generators
- **Linking** – each file is named by `slug` (e.g. `praysap.md`, `mosque-database.md`) so you can link to `ideas/praysap.md`

## Structure

| File        | Source field | Example    |
|------------|--------------|------------|
| `<slug>.md`| `slug`       | `praysap.md` |

**Frontmatter (YAML):** `id`, `title`, `description`, `status`, `url` (optional), `emoji`, `slug`, `quality` (optional), `categories` (optional), `requirements` (optional).

**Body:** Title (with emoji), status/quality, link to live URL (if any), Description, Categories (if any), Features/Requirements, and a footer link to the [ideas board](https://ideas.ummah.build) and the [Edit idea](https://github.com/ummahbuild/ideas/issues/new?template=edit_idea.md) issue template.

## Regenerating from ideas.json

After editing [ideas.json](../ideas.json), regenerate all markdown files:

```bash
node scripts/generate-idea-pages.mjs
```

This overwrites existing `ideas/*.md` files with the current content of ideas.json. To add or change **only** the body text (below the frontmatter), edit the `.md` file by hand and avoid re-running the script, or add your content in a section the script doesn’t touch (e.g. “## Notes”).

## Index

| Slug | Title |
|------|--------|
| [praysap](praysap.md) | PRAYSAP |
| [sunnahsleep](sunnahsleep.md) | SunnahSleep |
| [jummahdao](jummahdao.md) | JummahDAO |
| [mosque-database](mosque-database.md) | Mosque Database |
| [mosquetv](mosquetv.md) | MosqueTV |
| … | *(run the script to see all; or browse [ideas.ummah.build](https://ideas.ummah.build))* |

Full list: [ideas.ummah.build](https://ideas.ummah.build) or open any `ideas/<slug>.md` in this folder.
