# Recommended GitHub labels

Suggested labels for the [ideas](https://github.com/ummahbuild/ideas) repo. Create these in **Settings → Labels** to filter issues and PRs.

## Usage

- **Triaging:** `triage` for new issues that need review.
- **Idea lifecycle:** `new-idea`, `edit-idea`, `template` for issue types.
- **Category/status:** Optionally add `category:mosque`, `status:production` when closing issues or organizing work.

## Labels to add

| Label | Color | Description |
|-------|--------|-------------|
| `triage` | `#d4c5f9` | Needs maintainer review |
| `new-idea` | `#0e8a16` | Suggest new idea (from template) |
| `edit-idea` | `#fbca04` | Edit existing idea (from template) |
| `template` | `#c5def5` | Use a doc template / GTM, dissection, etc. |
| `improvement` | `#a2eeef` | Improvement to board, docs, or workflows |
| `category:mosque` | `#fef2c0` | Relates to mosque category |
| `category:zakat` | `#fef2c0` | Relates to zakat category |
| `category:prayer` | `#fef2c0` | Relates to prayer tools |
| `status:production` | `#0f7b6c` | Idea is in production |
| `status:in-progress` | `#9a6700` | Idea being built |
| `status:ideating` | `#6b6b6b` | Idea in ideation |

Categories can be added per [categories.json](https://github.com/ummahbuild/ideas/blob/main/categories.json) as needed. Same for status values.

## Creating labels in bulk

In the repo: **Issues → Labels → New label**. Create each from the table above, or use the GitHub API / `gh` CLI if you prefer automation.
