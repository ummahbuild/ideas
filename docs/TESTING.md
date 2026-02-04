# Mobile responsiveness & accessibility testing

Quick reference for testing the Ideas board ([ideas.ummah.build](https://ideas.ummah.build)) on mobile and with assistive tech.

---

## Mobile responsiveness

### What was implemented

- **Viewport:** `width=device-width, initial-scale=1.0, viewport-fit=cover` for notched devices
- **Breakpoints:**
  - **≤768px:** Single-column layout, full-width search, stacked filters, 1-column idea grid, reduced padding
  - **≤480px:** Smaller heading, count numbers hidden on pills to save space, toast full-width with safe area
- **Touch targets:** Buttons, pills, search input, and sort select have **min 44×44px** (WCAG 2.5.5)
- **Safe area:** Toast and bottom UI respect `env(safe-area-inset-bottom)` on notched phones

### How to test

1. **Chrome DevTools:** F12 → Toggle device toolbar (Ctrl+Shift+M) → pick iPhone SE, Pixel 5, iPad, or custom width. Resize to 320px, 375px, 768px.
2. **Safari (iOS):** Develop → Enter Responsive Design Mode, or test on a real device.
3. **Check:** No horizontal scroll; filters wrap; search full-width on small screens; cards readable; buttons easy to tap.

---

## Accessibility

### What was implemented

- **Skip link:** “Skip to main content” appears on focus (keyboard Tab); moves focus to `#main`
- **Landmarks:** `<header>`, `<nav aria-label="Filter ideas">`, `<main id="main" aria-label="Ideas list">`, `<footer>`
- **Focus visible:** All interactive elements (pills, search, select, share button, feature toggle, links) have `:focus-visible` outline (2px accent color, offset where needed)
- **ARIA:** `aria-live="polite"` on stats and toast; `aria-expanded` on feature toggles; `aria-label` on icon-only or ambiguous controls; `aria-hidden="true"` on decorative emoji
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables transitions
- **Contrast:** Text and borders use Notion-like palette; links underlined in about-block for visibility
- **Semantic HTML:** Headings (h1, h2), articles, buttons, labeled form controls

### How to test

1. **Keyboard only:** Tab through the page. Skip link → nav (category, status, sort, search, copy link) → main (cards, feature toggles, links). No focus trap; Esc doesn’t need to do anything special.
2. **Screen reader:** NVDA (Windows), VoiceOver (macOS/iOS), or TalkBack (Android). Check: page title, landmarks, “Filter ideas”, “Ideas list”, card titles and links, “X features” button and “Related” links.
3. **Automated:** Run [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (Accessibility) or [axe DevTools](https://www.deque.com/axe/devtools/) on the board page. Fix any reported issues.
4. **Reduced motion:** In OS settings enable “Reduce motion”, then reload; transitions should be effectively off.

### Optional: CLI a11y check

From the repo root (with Node installed):

```bash
npx pa11y https://ideas.ummah.build/
```

Or against a local file (no JS execution):

```bash
npx pa11y index.html
```

Fix any critical or serious issues pa11y reports.

---

## Checklist (quick pass)

- [ ] 320px width: no horizontal scroll, content readable
- [ ] 375px width: filters and search usable
- [ ] 768px width: layout adapts, grid single column
- [ ] All interactive elements ≥44×44px and tappable
- [ ] Keyboard: full tab order, visible focus, skip link works
- [ ] Screen reader: landmarks and labels make sense
- [ ] Reduced motion: no distracting animation when enabled
