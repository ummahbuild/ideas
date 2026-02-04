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

### Latest (app improvements)
- **Dark theme:** Toggle (🌓) cycles light → dark → system; preference stored in `localStorage`; respects `prefers-color-scheme` when set to system
- **Export:** “Export JSON” downloads the currently filtered + sorted ideas as a JSON file
- **Keyboard:** Press `/` to focus search (when not in an input); “/ to focus” hint next to search on desktop
- **Clear filters:** When no results, “Clear filters” button resets category, status, search, and sort

---

## Roadmap / future improvements

- [ ] **Individual idea pages** (e.g. `/idea/praysap`) for per-idea SEO and deep linking
- [ ] **RSS/JSON feed** of ideas for syndication and AI ingestion
- [ ] **Template picker** in GitHub issue forms (e.g. “Use GTM template”) with links to docs
- [ ] **Labels** in repo: `category:mosque`, `status:production` for filtering issues
- [ ] **Automated “related ideas”** from tags or description similarity (e.g. embed-based)
- [x] ~~**Light/dark theme toggle**~~ (done)
- [x] ~~**Export** filtered list as JSON~~ (done; CSV optional later)
- [ ] **og.png** asset (1200×630) for social sharing
- [ ] **Multilingual** meta (hreflang) if board is translated
- [ ] **Analytics** (privacy-respecting) to see which ideas get the most engagement

---

## How to suggest an improvement

Open an issue with the label `improvement` or comment in discussions. For small fixes, a PR to this file or the relevant doc is welcome.
