# Contributing to Ummah.build Ideas

This repo is the **open source ideas board** for [Ummah.build](https://ummah.build) and Islamic tech. Live at **[ideas.ummah.build](https://ideas.ummah.build)**. You can suggest new ideas, propose edits to existing ideas, or add features to ideas.

## How to contribute

### Suggest a new idea

1. Open a new issue and choose **"Suggest new idea"**.
2. Fill in the template: title, description, slug, category, and optional emoji, status, URL, and features (requirements).
3. Use **categories** from [categories.json](categories.json): Prayer tools, Islamic Finance, Islamic History, Zakat, Mosque, Social, Game, Prayer coordination, Islamic Education, Transparency, Self Reflection, Marriage, Family, Women, Haram Police, Islamic Onboarding, Muslim Media, Ramadan, Tooling, Food, Islamic Legal Tech, Quran.
4. Submit the issue. A maintainer will review and add the idea to [ideas.json](ideas.json) in the correct format.

### Edit an existing idea

1. Open a new issue and choose **"Edit existing idea"**.
2. Say which idea (by slug or title from the [ideas board](https://ummah.build/ideas/) or [ideas.json](ideas.json)).
3. Describe what to change: description, categories, add/remove features, status, URL, etc.
4. Submit the issue. A maintainer will update the idea in [ideas.json](ideas.json).

### Add or change categories

If you want a new category or a change to [categories.json](categories.json), open an issue and describe the category (slug, name, short description). Categories are used for filtering and SEO.

## Data format

- **Ideas** live in [ideas.json](ideas.json). Each idea has:
  - **Required:** `id`, `title`, `description`, `slug`, `status`
  - **Optional:** `url`, `emoji`, `quality`, `categories`, `requirements`, `tags`, `repository`, `updated`
- **Schema** is in [schema/idea.schema.json](schema/idea.schema.json) for validation and tooling.
- **Categories** are in [categories.json](categories.json) with `slug`, `name`, and `description`.

## Pull requests

If you prefer to submit a PR:

1. Fork the repo and create a branch.
2. Edit [ideas.json](ideas.json) (and optionally [categories.json](categories.json)) following the schema.
3. Ensure IDs are unique and slugs are URL-safe (lowercase, hyphens).
4. Run the validation that runs in CI: the GitHub Action checks that `ideas.json` is a valid array with required fields and valid `slug`/`status` values.
5. Open a PR with a short description of the change.

## Code of conduct

Be respectful and constructive. This is a community space for Islamic tech ideas.

## Questions

Open an issue or reach out via [Ummah.build](https://ummah.build).
