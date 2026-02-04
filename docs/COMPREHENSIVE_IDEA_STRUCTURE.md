# Comprehensive idea structure

What makes an idea on the board **comprehensive** and ready for someone to take into production: suggested fields, templates, and related ideas.

---

## Current idea shape (ideas.json)

Each idea today has:

- **id, title, description, slug, status** (required)
- **url, emoji, quality, requirements, categories, tags** (optional)

That’s enough to browse, filter, and link. To go **from idea to production**, the following additions help.

---

## Suggested fields for richer ideas

These can be added to the [schema](https://github.com/ummahbuild/ideas/blob/main/schema/idea.schema.json) and `ideas.json` over time. All optional.

| Field | Type | Purpose |
|-------|------|--------|
| **problem** | string | One-sentence problem statement (for dissection & GTM). |
| **targetPersona** | string | e.g. "Busy Muslim professional", "Revert", "Mosque admin". |
| **valueProposition** | string | One-line value prop for messaging. |
| **relatedSlugs** | string[] | Slugs of related ideas (e.g. same category, complements). |
| **islamicAuthenticityNotes** | string | Short note: fiqh considerations, sources, or "Needs scholar review". |
| **goToMarketNotes** | string | e.g. "Launch via Muslim tech Twitter + one mosque pilot". |
| **competitors** | string[] | Names of direct or indirect competitors. |
| **marketSizeNote** | string | e.g. "TAM: Muslims who pray daily; SAM: English-speaking". |
| **mvpScope** | string[] | 3–5 must-have features for v1 (can mirror first 5 of `requirements`). |
| **resources** | object[] | Links: `{ label, url }` — e.g. "Template: GTM", "Similar: App X". |
| **updated** | string (ISO date) | Last time the idea was updated. |

**Example (minimal addition):**

```json
{
  "id": "1",
  "title": "PRAYSAP",
  "description": "The only app to connect with Muslims to prayers...",
  "slug": "praysap",
  "status": "in-progress",
  "url": "https://praysap.com",
  "categories": ["prayer-tools", "prayer-coordination", "social"],
  "problem": "Muslims struggle to pray on time and lack accountability.",
  "targetPersona": "Busy professionals who want to pray in congregation.",
  "valueProposition": "Pray on time, together with the Ummah.",
  "relatedSlugs": ["mosque-database", "prayercalendarsync", "jummahdao"],
  "islamicAuthenticityNotes": "Prayer times: standard calculation methods; no fatwa content.",
  "requirements": [...]
}
```

---

## How “related ideas” work on the board

- **By category:** Ideas that share at least one `category` are related.
- **By relatedSlugs:** If you add `relatedSlugs`, the board can show “Related: X, Y, Z” with links.
- **By keyword overlap:** Fallback: ideas whose title/description/requirements share important words (e.g. “prayer”, “mosque”).

The board already shows **Related** on each card using shared categories; when `relatedSlugs` exists, it can prefer those for a tighter, curated list.

---

## Making ideas more comprehensive (checklist)

When adding or editing an idea, consider:

1. **One-line problem** — So builders know what pain they’re solving.
2. **Clear categories** — So the idea appears in the right filters and related ideas.
3. **Requirements = features** — Bullet list that can double as MVP scope or roadmap.
4. **Related ideas** — Either via categories or explicit `relatedSlugs`.
5. **Islamic authenticity** — If the idea touches worship, money, or content: one sentence on sources or scholar input.
6. **Link to templates** — In the repo, point to [docs/templates](templates/) for dissection, GTM, personas, etc., so anyone can go from idea → production using the same workflows.

---

## Templates and workflows

- **Dissecting an idea:** [Idea dissection](templates/idea-dissection.md)
- **Islamic alignment:** [Islamic authenticity](templates/islamic-authenticity.md)
- **Launching:** [Go to market](templates/go-to-market.md), [Social media](templates/social-media-marketing.md)
- **Full flow:** [Workflows: Idea → production](workflows/README.md)

Adding these fields and linking to these docs from the board (and from GitHub issue templates) makes each idea a better starting point for production.
