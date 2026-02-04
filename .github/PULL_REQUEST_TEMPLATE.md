## What this PR does

- [ ] **Edits idea content** in `src/content/ideas/*.md` (frontmatter or body)
- [ ] **Edits the board** (`public/index.html`) or categories (`public/categories.json`)
- [ ] **Other** (describe below)

## Checklist

- [ ] If you edited **idea content**: the file is in `src/content/ideas/<slug>.md` with valid YAML frontmatter (`id`, `title`, `description`, `slug`, `status`). See [CONTRIBUTING.md](https://github.com/ummahbuild/ideas/blob/main/CONTRIBUTING.md).
- [ ] **Build** will run in CI; merge only when the "Build from markdown" job passes.

## Notes

Merging to `main` deploys to [ideas.ummah.build](https://ideas.ummah.build). To **edit an idea** after merge: go to [src/content/ideas/](https://github.com/ummahbuild/ideas/tree/main/src/content/ideas) or use "Edit" on the idea page on the live site.
