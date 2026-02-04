# Islamic Tech & Ummah.build Ideas Board

**Open source ideas board** for [Ummah.build](https://ummah.build) and Islamic tech. Browse 30+ ideas, suggest new ones, edit existing ones, and use **templates and workflows** to take ideas from the board into production.

**Live board:** [ideas.ummah.build](https://ideas.ummah.build)

---

## What’s in this repo

| Resource | Description |
|----------|-------------|
| [**Ideas board**](public/index.html) | Notion-style board at [ideas.ummah.build](https://ideas.ummah.build): filter by category/status, sort, search, shareable URLs, deep links, **related ideas** per card. |
| [**src/content/ideas/**](src/content/ideas/) | **Source of truth:** one **markdown** file per idea (e.g. `praysap.md`) with YAML frontmatter. Edit these files and open a PR; no generated HTML to commit. |
| **Build** | [Astro](https://astro.build) builds the site: `ideas.json` is generated from markdown; idea pages are rendered at **/idea/[slug]/**. Run `npm run build`. CI runs on every PR/push. |
| [categories.json](categories.json) / [public/categories.json](public/categories.json) | 22 categories (Prayer tools, Mosque, Zakat, Quran, Ramadan, etc.) for filtering and SEO. |
| [schema/idea.schema.json](schema/idea.schema.json) | JSON schema for validating idea structure. |
| [**Templates**](docs/templates/README.md) | Idea dissection, Islamic authenticity, go-to-market, competitive analysis, market research, brand/naming, personas, messaging, social media. |
| [**Workflows**](docs/workflows/README.md) | Step-by-step: idea → MVP and idea → funded launch (with links to templates). |
| [**Comprehensive idea structure**](docs/COMPREHENSIVE_IDEA_STRUCTURE.md) | Suggested fields and practices to make ideas production-ready (problem, persona, related ideas, etc.). |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | Log of past improvements and roadmap. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to suggest new ideas, edit ideas, and contribute. |

---

## Categories

Prayer tools · Islamic Finance · Islamic History · Zakat · Mosque · Social · Game · Prayer coordination · Islamic Education · Transparency · Self Reflection · Marriage · Family · Women · Haram Police · Islamic Onboarding · Muslim Media · Ramadan · Tooling · Food · Islamic Legal Tech · Quran

---

## Take an idea into production

1. **Pick an idea** from the [board](https://ideas.ummah.build) (or [suggest one](https://github.com/ummahbuild/ideas/issues/new/choose)).
2. **Dissect it** with the [Idea dissection](docs/templates/idea-dissection.md) template (problem, solution, users, MVP scope).
3. **Check Islamic authenticity** if it touches worship, finance, or content: [Islamic authenticity](docs/templates/islamic-authenticity.md).
4. **Research market & competition:** [Market opportunity](docs/templates/market-opportunity-research.md), [Competitive analysis](docs/templates/competitive-analysis.md).
5. **Define brand & messaging:** [Brand](docs/templates/brand-generation.md), [Name/idea](docs/templates/name-idea-generation.md), [Personas](docs/templates/target-personas.md), [Messaging](docs/templates/messaging-for-personas.md).
6. **Plan launch:** [Go to market](docs/templates/go-to-market.md), [Social media](docs/templates/social-media-marketing.md).

Full flow: [Workflows: Idea → production](docs/workflows/README.md).

---

## Suggest or edit an idea

- **New idea:** [Open an issue](https://github.com/ummahbuild/ideas/issues/new/choose) → choose **Suggest new idea**.
- **Edit idea:** [Open an issue](https://github.com/ummahbuild/ideas/issues/new/choose) → choose **Edit existing idea**.

You can also open a PR that **edits or adds markdown** in [src/content/ideas/](src/content/ideas/) (and optionally [public/categories.json](public/categories.json)); the **Build and deploy** workflow validates and builds the site. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## SEO & AI engine optimization

- **Canonical URL:** [ideas.ummah.build](https://ideas.ummah.build). [robots.txt](robots.txt), [sitemap.xml](sitemap.xml).
- **Meta:** Title, description, keywords, Open Graph, Twitter Card, theme-color.
- **JSON-LD:** `WebSite`, `BreadcrumbList`, full `ItemList` of ideas as `SoftwareApplication`/`ListItem`, plus `SearchAction` for `?q=...`.
- **Structure:** Semantic headings and article layout so search and AI crawlers can parse the board and each idea.
- **Improvements log:** [IMPROVEMENTS.md](IMPROVEMENTS.md).

---

## Local development and build

- **Prerequisites:** Node.js 20+
- **Install:** `npm install`
- **Build:** `npm run build` — generates `public/ideas.json` from `src/content/ideas/*.md`, then builds the Astro site (board in `public/` is copied to `dist/`; idea pages are rendered to `dist/idea/[slug]/`).
- **Preview:** `npm run preview` — serves `dist/` locally.
- **Dev:** `npm run dev` — builds ideas.json and runs Astro dev server (board and idea pages).

To deploy via GitHub Pages: in the repo **Settings → Pages**, set **Source** to **GitHub Actions**. The **Build and deploy** workflow will build and deploy on every push to `main`.

---

## License

This ideas list and board are open source. See [LICENSE](LICENSE) if present; otherwise use and contribute in good faith.

---

[Ummah.build](https://ummah.build) · [Board](https://ideas.ummah.build) · [Contribute](CONTRIBUTING.md) · [Docs](docs/README.md) · [Templates](docs/templates/README.md) · [Workflows](docs/workflows/README.md) · [Improvements](IMPROVEMENTS.md)
