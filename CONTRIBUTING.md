# Contributing to Ummah.build Ideas

This repo is the **open source ideas board** for [Ummah.build](https://ummah.build) and Islamic tech. Live at **[ideas.ummah.build](https://ideas.ummah.build)**. You can suggest new ideas, propose edits to existing ideas, or add features to ideas.

## How to contribute

### Suggest a new idea

1. Open a new issue and choose **"Suggest new idea"**.
2. Fill in the template: title, description, slug, category, and optional emoji, status, URL, and features (requirements).
3. Use **categories** from [categories.json](categories.json): Prayer tools, Islamic Finance, Islamic History, Zakat, Mosque, Social, Game, Prayer coordination, Islamic Education, Transparency, Self Reflection, Marriage, Family, Women, Haram Police, Islamic Onboarding, Muslim Media, Ramadan, Tooling, Food, Islamic Legal Tech, Quran.
4. Submit the issue. A maintainer will review and add a new markdown file under [src/content/ideas/](src/content/ideas/) (e.g. `src/content/ideas/my-slug.md`) with the correct frontmatter.

### Edit an existing idea (directly via PR)

1. Edit the idea’s **markdown file**: [src/content/ideas/](src/content/ideas/) — one file per idea, e.g. `src/content/ideas/praysap.md`.
2. Each file has **YAML frontmatter** (title, description, slug, status, emoji, url, quality, categories, requirements) and optional body. See [src/content/config.ts](src/content/config.ts) for the schema.
3. Open a PR. The **Build and deploy** workflow will build the site from markdown and validate frontmatter; idea pages are rendered at build time (no generated HTML to commit).

Alternatively, open an issue **"Edit existing idea"** and a maintainer will update the markdown file.

### Add or change categories

If you want a new category or a change to [categories.json](categories.json), open an issue and describe the category (slug, name, short description). Categories are used for filtering and SEO.

## Data format and build

- **Idea pages are rendered from markdown.** Each idea is a file in [src/content/ideas/](src/content/ideas/) (e.g. `praysap.md`) with YAML frontmatter and optional body. The schema is in [src/content/config.ts](src/content/config.ts).
- **Required frontmatter:** `id`, `title`, `description`, `slug`, `status` (one of: ideating, in-progress, production, archived).
- **Optional:** `url`, `emoji`, `quality`, `categories` (array), `relatedSlugs` (array), `requirements` (array).
- **ideas.json** is generated at **build time** from these markdown files (used by the board and feeds). Do not commit `public/ideas.json`; it is built by `npm run build`.
- **Categories** are in [public/categories.json](public/categories.json) (or [categories.json](categories.json) at repo root). Used for filtering and SEO.
- **Board** lives at [public/index.html](public/index.html); it loads `ideas.json` from the built site.
- **Feeds** (feed.json, feed.xml) can be regenerated with `node scripts/generate-feed.mjs` (reads from built `public/ideas.json` or run after `npm run content:json`).

## Pull requests

1. Fork the repo and create a branch.
2. **To add or edit an idea:** add or edit a markdown file in **src/content/ideas/** (e.g. `src/content/ideas/my-idea.md`). Use the same frontmatter shape as existing files; slug must be URL-safe (lowercase, hyphens).
3. **To change the board or categories:** edit `public/index.html` or `public/categories.json`.
4. Run `npm run build` locally to confirm the site builds (validates markdown frontmatter).
5. Open a PR. The **Build and deploy** workflow will run and validate the build; on merge to main, the site deploys to GitHub Pages (if enabled).

## Code of conduct

Be respectful and constructive. This is a community space for Islamic tech ideas.

## Questions

Open an issue or reach out via [Ummah.build](https://ummah.build).
