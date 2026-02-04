# Improvements log & roadmap

Track of past improvements and planned work for the Ummah.build Ideas board.

---

## Completed improvements

### SEO & discoverability
- Canonical URL and all meta tags set for **ideas.ummah.build**
- Open Graph and Twitter Card markup; optional `og.png` for social previews
- JSON-LD: `WebSite`, `BreadcrumbList`, full `ItemList` with `SoftwareApplication`/`ListItem` per idea
- `SearchAction` in WebSite schema for `?q=...` search
- `robots.txt` and `sitemap.xml` for crawlers
- Keyword meta and description tuned for Islamic tech / prayer / mosque / zakat / Quran / Ramadan
- Theme-color and format-detection for mobile

### Board functionality
- **URL state:** Filters (category, status, search, sort) in query params; shareable links and back/forward work
- **Deep links:** `#idea-{slug}` scrolls to card and expands features
- **Sort:** Default, Title A–Z, Quality, Status
- **Counts** on category and status filter pills
- **Copy link** button with toast feedback
- **Related ideas** on each card (by shared categories / similarity)

### Design & UX
- **Notion-like** page style: light background (#f7f6f3), white cards, subtle borders, clean typography (ui-sans-serif), block layout, soft shadows
- **Related ideas** on each card: by `relatedSlugs`, then shared categories, then same status (up to 4)
- **Accessibility:** skip link, ARIA landmarks and labels, `aria-live`/`aria-expanded`, `:focus-visible` on all interactive elements, min 44×44px touch targets, `prefers-reduced-motion`, safe-area insets
- **Mobile:** viewport-fit=cover, breakpoints at 768px and 480px, single-column layout and full-width search on small screens, responsive padding

### Structure & contribution
- **categories.json** with 22 categories for filtering and SEO
- **schema/idea.schema.json** for validating idea structure
- GitHub **issue templates**: Suggest new idea, Edit existing idea
- **GitHub Actions** workflow: validate `ideas.json` and `categories.json` on push/PR; optional issue triage comment
- **CONTRIBUTING.md** with contribution steps and data format

### Documentation & production readiness
- **Templates** ([docs/templates/](docs/templates/)): idea dissection, Islamic authenticity, go-to-market, competitive analysis, market opportunity & research, brand generation, name/idea generation, target personas, messaging for personas, social media marketing
- **Workflows** ([docs/workflows/](docs/workflows/)): idea → MVP and idea → funded launch (step-by-step with template links)
- **Comprehensive idea structure** ([docs/COMPREHENSIVE_IDEA_STRUCTURE.md](docs/COMPREHENSIVE_IDEA_STRUCTURE.md)): suggested fields (problem, persona, relatedSlugs, Islamic authenticity notes, GTM notes) for production-ready ideas
- **README.md** expanded: what’s in the repo, categories, take idea to production, suggest/edit, SEO & AI, links to templates and workflows

### AI engine optimization
- **Meta:** `author`, `summary` (plain-language description for AI/crawlers)
- **JSON-LD:** WebSite, BreadcrumbList, ItemList, plus **FAQPage** (What is this board? How do I take an idea to production?)
- Clear, descriptive page title and meta description for AI summarization
- **About block** on page: “What this is” with links to templates and workflows (visible to crawlers and users)
- Semantic headings and article structure

### Latest (app functionality)
- **Favorites:** Star (☆/★) on each card to save ideas; “⭐ Favorites (N)” pill shows only favorited ideas; stored in `localStorage`
- **Surprise me:** Picks a random idea from the current list, scrolls to it, and expands its features
- **Expand all / Collapse all:** Buttons above the grid to open or close all feature lists at once
- **Export:** Dropdown with **JSON** and **CSV**; CSV includes title, description, status, quality, url, slug, categories, requirements
- **Stats breakdown:** Board stats show “X production · Y in progress · Z ideating”
- **Copy link to idea:** Each card has a “Copy link” button that copies the direct link (e.g. `ideas.ummah.build#idea-praysap`)
- **Dark theme:** Toggle (🌓) cycles light → dark → system; preference in `localStorage`
- **Keyboard:** `/` focuses search; “/ to focus” hint on desktop
- **Clear filters:** Resets category, status, search, sort, and favorites view
- **One markdown file per idea:** [ideas/](ideas/) with `<slug>.md`; generated via `node scripts/generate-idea-pages.mjs`
- **One HTML page per idea (routing):** [idea/](idea/) with `idea/<slug>/index.html` so each idea has its own URL (e.g. ideas.ummah.build/idea/praysap/). Board links and “Copy link” point to these pages. Generated via `node scripts/generate-idea-html.mjs`; script also updates sitemap.xml with all idea URLs
- **Idea page actions:** Each idea page has **Copy link** and **Print** buttons; print CSS hides nav and actions
- **RSS/JSON feed:** [feed.json](feed.json) (JSON Feed 1.1) and [feed.xml](feed.xml) (RSS 2.0); generated via `node scripts/generate-feed.mjs`; board links to both in head and About block
- **Template picker issue:** "Use a doc template" issue template with checklist of all [docs/templates](docs/templates) and links
- **Labels doc:** [docs/labels.md](docs/labels.md) with recommended GitHub labels
- **View modes:** **Grid** (default), **List** (compact rows), **Gallery** (larger cards), **Kanban** (columns by status: Ideating, In progress, Production, Archived). View stored in URL (`?view=`) and `localStorage`; shareable links preserve view.
- **Markdown-based idea pages (Astro):** Idea pages are **no longer generated** as static HTML. Source of truth is [src/content/ideas/*.md](src/content/ideas/) (one markdown file per idea with YAML frontmatter). [Astro](https://astro.build) builds the site: `npm run build` generates `public/ideas.json` from markdown and renders each idea at `/idea/[slug]/`. PRs that edit markdown are validated and built by the **Build and deploy** GitHub Action; deploy to GitHub Pages on push to main.
- **Build script:** `scripts/build-ideas-json.mjs` uses an inline YAML-like frontmatter parser (no `gray-matter` dependency) so the build works with only Astro in dependencies.
- **Board UX:** Sticky filter nav on scroll; **Escape** closes export dropdown and shortcut help modal; no-results state includes a **Suggest an idea** link to the GitHub issue template.

---

## Roadmap / future improvements

- [x] ~~**Individual idea pages** (e.g. `/idea/praysap`) for per-idea SEO and deep linking~~ (done)
- [x] ~~**RSS/JSON feed** of ideas for syndication and AI ingestion~~ (done)
- [x] ~~**Template picker** in GitHub issue forms (e.g. "Use GTM template") with links to docs~~ (done: "Use a doc template" template)
- [x] ~~**Labels** in repo: `category:mosque`, `status:production` for filtering issues~~ (doc added; create labels in GitHub Settings)
- [ ] **Automated “related ideas”** from tags or description similarity (e.g. embed-based)
- [x] ~~**Light/dark theme toggle**~~ (done)
- [x] ~~**Export** filtered list as JSON~~ (done; CSV optional later)
- [ ] **og.png** asset (1200×630) for social sharing
- [ ] **Multilingual** meta (hreflang) if board is translated
- [ ] **Analytics** (privacy-respecting) to see which ideas get the most engagement

---

## How to suggest an improvement

Open an issue with the label `improvement` or comment in discussions. For small fixes, a PR to this file or the relevant doc is welcome.
