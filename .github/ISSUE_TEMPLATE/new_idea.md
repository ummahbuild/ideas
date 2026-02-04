---
name: Suggest new idea
about: Propose a new Islamic tech idea for the ideas board
title: "[New Idea] "
labels: new-idea, triage
assignees: ''
---

## New idea (structured)

Use the format below so we can add the idea to `ideas.json` with consistent structure.

### Required

- **Title** (short, clear name):
- **Description** (1–2 sentences):
- **Slug** (lowercase, hyphenated, e.g. `mosque-database`):
- **Category** (one or more from [categories.json](https://github.com/ummahbuild/ideas/blob/main/categories.json)):
  - [ ] Prayer tools
  - [ ] Islamic Finance
  - [ ] Islamic History
  - [ ] Zakat
  - [ ] Mosque
  - [ ] Social
  - [ ] Game
  - [ ] Prayer coordination
  - [ ] Islamic Education
  - [ ] Transparency
  - [ ] Self Reflection
  - [ ] Marriage
  - [ ] Family
  - [ ] Women
  - [ ] Haram Police
  - [ ] Islamic Onboarding
  - [ ] Muslim Media
  - [ ] Ramadan
  - [ ] Tooling
  - [ ] Food
  - [ ] Islamic Legal Tech
  - [ ] Quran

### Optional

- **Emoji** (one emoji, e.g. 🕌):
- **Status**: ideating (default) | in-progress | production | archived
- **URL** (if live):
- **Quality** (for prioritization): okay | good | amazing

### Features / requirements (bullet list)

List features or requirements for this idea. One per line.

- 
- 
- 

### Raw JSON (for maintainers)

If you’re comfortable with JSON, you can paste a single idea object here so we can merge it directly. Schema: [schema/idea.schema.json](https://github.com/ummahbuild/ideas/blob/main/schema/idea.schema.json)

```json
{
  "id": "",
  "title": "",
  "description": "",
  "slug": "",
  "status": "ideating",
  "emoji": "💡",
  "categories": [],
  "requirements": []
}
```

---

**Workflow:** After submitting, see [Idea → MVP workflow](https://github.com/ummahbuild/ideas/tree/main/docs/workflows#workflow-1-idea--mvp-solo-or-small-team) or [Quick start](https://github.com/ummahbuild/ideas/blob/main/docs/workflows/quick-start.md) to take the idea to production.

- [ ] I have read [CONTRIBUTING.md](https://github.com/ummahbuild/ideas/blob/main/CONTRIBUTING.md).
