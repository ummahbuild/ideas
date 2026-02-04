#!/usr/bin/env node
/**
 * Generate one HTML page per idea: idea/<slug>/index.html
 * Run: node scripts/generate-idea-html.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IDEAS_JSON = join(ROOT, 'ideas.json');
const CATEGORIES_JSON = join(ROOT, 'categories.json');
const BASE_URL = 'https://ideas.ummah.build';

function escapeHtml(s) {
  if (s == null) return '';
  const str = String(s);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getRelatedIdeas(idea, allIdeas, categories, limit) {
  const related = [];
  const ids = new Set([idea.id]);
  const slug = (idea.slug || idea.id || '').toString();

  if (idea.relatedSlugs && idea.relatedSlugs.length) {
    for (const s of idea.relatedSlugs) {
      if (related.length >= limit) break;
      const other = allIdeas.find((i) => (i.slug || i.id) === s);
      if (other && !ids.has(other.id)) {
        related.push(other);
        ids.add(other.id);
      }
    }
  }
  const cats = idea.categories || [];
  if (cats.length && related.length < limit) {
    for (const i of allIdeas) {
      if (related.length >= limit || ids.has(i.id)) continue;
      const shared = (i.categories || []).filter((c) => cats.includes(c));
      if (shared.length) {
        related.push(i);
        ids.add(i.id);
      }
    }
  }
  if (related.length < limit) {
    for (const i of allIdeas) {
      if (related.length >= limit || ids.has(i.id)) continue;
      if (i.status === idea.status) {
        related.push(i);
        ids.add(i.id);
      }
    }
  }
  return related.slice(0, limit);
}

function categorySlugToName(slug, categories) {
  const cat = (categories.categories || []).find((c) => c.slug === slug);
  return cat ? cat.name : slug;
}

function truncateDesc(desc, maxLen = 155) {
  if (!desc) return '';
  const s = String(desc).trim();
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return lastSpace > maxLen * 0.7 ? cut.slice(0, lastSpace) : cut;
}

function ideaToHtml(idea, allIdeas, categories) {
  const slug = (idea.slug || idea.id || 'unknown').toString();
  const title = idea.title || 'Untitled';
  const emoji = idea.emoji || '💡';
  const status = idea.status || 'ideating';
  const statusLabel = status.replace(/-/g, ' ');
  const qualityLabel = idea.quality ? String(idea.quality).charAt(0).toUpperCase() + String(idea.quality).slice(1) : '';
  const pageUrl = `${BASE_URL}/idea/${slug}/`;
  const related = getRelatedIdeas(idea, allIdeas, categories, 6);
  const catNames = (idea.categories || []).map((s) => categorySlugToName(s, categories));
  const metaDesc = truncateDesc(idea.description, 155);
  const keywords = ['Islamic tech', 'ummah build', title, ...catNames].filter(Boolean).join(', ');

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#app`,
    name: title,
    description: idea.description || '',
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'Islamic tech',
    url: pageUrl,
    operatingSystem: 'Web',
    ...(idea.url && { sameAs: idea.url }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ummah.build', item: 'https://ummah.build' },
      { '@type': 'ListItem', position: 2, name: 'Ideas board', item: BASE_URL + '/' },
      { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
    ],
  };

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: `${title} | Islamic Tech Idea | Ummah.build`,
    description: metaDesc,
    url: pageUrl,
    mainEntity: { '@id': `${pageUrl}#app` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };

  const breadcrumbLdWithId = { ...breadcrumbLd, '@id': `${pageUrl}#breadcrumb` };

  const relatedLinks = related
    .map((r) => {
      const s = (r.slug || r.id || '').toString();
      const t = escapeHtml(r.title || 'Untitled');
      return `<li><a href="${BASE_URL}/idea/${s}/">${t}</a></li>`;
    })
    .join('');

  const requirementsList =
    (idea.requirements || []).length > 0
      ? `<section class="section">
  <h2>Features / Requirements</h2>
  <ul>${(idea.requirements || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
</section>`
      : '';

  const categoriesBlock =
    catNames.length > 0
      ? `<section class="section">
  <h2>Categories</h2>
  <p>${escapeHtml(catNames.join(', '))}</p>
</section>`
      : '';

  const relatedBlock =
    related.length > 0
      ? `<section class="section" aria-label="Related ideas">
  <h2>Related ideas</h2>
  <ul class="related-links">${relatedLinks}</ul>
</section>`
      : '';

  const pageTitle = `${title} – Islamic Tech Idea | Ummah.build`;
  const ogDesc = truncateDesc(idea.description, 200);

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}" />
  <meta name="keywords" content="${escapeHtml(keywords)}" />
  <meta name="author" content="Ummah.build" />
  <link rel="canonical" href="${pageUrl}" />
  <link rel="dns-prefetch" href="https://ummah.build" />
  <link rel="dns-prefetch" href="https://github.com" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Ummah.build Ideas" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDesc)}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content="${BASE_URL}/og.png" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)} – Islamic tech idea" />
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />
  <meta name="theme-color" content="#f7f6f3" />
  <style>
    :root { --bg: #f7f6f3; --surface: #fff; --border: rgba(55,53,47,0.16); --text: #37352f; --text-muted: #6b6b6b; --accent: #0b6bcb; --radius: 6px; --font: ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.6; min-height: 100vh; }
    .wrap { max-width: 720px; margin: 0 auto; padding: 1.5rem; }
    .back { display: inline-block; margin-bottom: 1rem; color: var(--accent); text-decoration: none; font-size: 0.9rem; }
    .back:hover { text-decoration: underline; }
    .page-title { margin: 0 0 0.5rem; font-size: 1.75rem; font-weight: 700; }
    .badges { margin: 0.5rem 0 1rem; }
    .badge { display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 500; margin-right: 0.35rem; }
    .badge-status-ideating { background: #f1f1ef; color: var(--text-muted); }
    .badge-status-in-progress { background: rgba(154,103,0,0.1); color: #9a6700; }
    .badge-status-production { background: rgba(15,123,108,0.1); color: #0f7b6c; }
    .badge-status-archived { background: rgba(235,87,87,0.1); color: #eb5757; }
    .badge-quality { background: rgba(11,107,203,0.08); color: var(--accent); }
    .visit-link { display: inline-block; margin-bottom: 1.5rem; color: var(--accent); font-weight: 500; }
    .section { margin: 1.5rem 0; padding-top: 1rem; border-top: 1px solid var(--border); }
    .section h2 { margin: 0 0 0.5rem; font-size: 1rem; color: var(--text-muted); font-weight: 600; }
    .section ul { margin: 0; padding-left: 1.25rem; color: var(--text-muted); }
    .related-links { list-style: none; padding: 0; margin: 0; }
    .related-links li { margin: 0.35rem 0; }
    .related-links a { margin-right: 0.5rem; }
    footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.875rem; color: var(--text-muted); }
    footer a { color: var(--accent); }
    .skip-link { position: absolute; top: -100px; left: 0; padding: 0.5rem 1rem; background: var(--accent); color: #fff; z-index: 100; border-radius: var(--radius); text-decoration: none; font-size: 0.9rem; }
    .skip-link:focus { top: 0; left: 0; }
    .page-actions { margin: 0.5rem 0 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .page-actions button { padding: 0.35rem 0.65rem; font-size: 0.875rem; border: 1px solid var(--border); background: var(--surface); color: var(--text); border-radius: var(--radius); cursor: pointer; font-family: var(--font); }
    .page-actions button:hover { background: var(--surface-hover, #f1f1ef); }
    .page-actions button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    @media print { .skip-link, .back, .visit-link, .page-actions, footer a[href*="edit"], .related-links { display: none !important; } }
  </style>
  <script type="application/ld+json">${JSON.stringify(softwareLd)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbLdWithId)}</script>
  <script type="application/ld+json">${JSON.stringify(webPageLd)}</script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <div class="wrap">
    <nav aria-label="Breadcrumb">
      <a href="${BASE_URL}/" class="back">← Back to Islamic Tech Ideas board</a>
    </nav>
    <main id="main">
      <article itemscope itemtype="https://schema.org/SoftwareApplication" itemid="${pageUrl}#app">
        <h1 class="page-title">${emoji} <span itemprop="name">${escapeHtml(title)}</span></h1>
    <div class="badges">
      <span class="badge badge-status-${status}">${escapeHtml(statusLabel)}</span>${idea.quality ? ` <span class="badge badge-quality">${escapeHtml(qualityLabel)}</span>` : ''}
    </div>
    ${idea.url ? `<a href="${escapeHtml(idea.url)}" class="visit-link" rel="noopener noreferrer">Visit live site →</a>` : ''}
    <div class="page-actions" aria-label="Page actions">
      <button type="button" id="copy-link-btn">Copy link</button>
      <button type="button" id="print-btn">Print</button>
    </div>
    <section class="section" aria-labelledby="desc-heading">
      <h2 id="desc-heading">Description</h2>
      <p itemprop="description">${escapeHtml(idea.description || '')}</p>
    </section>
    ${categoriesBlock}
    ${requirementsList}
    ${relatedBlock}
      </article>
    </main>
    <footer role="contentinfo">
      <a href="${BASE_URL}/">Browse all Islamic tech ideas</a> · <a href="https://github.com/ummahbuild/ideas/issues/new?template=edit_idea.md">Suggest edits</a> · <a href="https://ummah.build">Ummah.build</a>
    </footer>
  </div>
  <script>
    (function(){var key='ideas-recent',slug=${JSON.stringify(slug)},max=5;try{var raw=localStorage.getItem(key),list=raw?JSON.parse(raw):[];list=list.filter(function(s){return s!==slug;});list.unshift(slug);localStorage.setItem(key,JSON.stringify(list.slice(0,max)));}catch(e){}})();
    (function(){var url=${JSON.stringify(pageUrl)};var copyBtn=document.getElementById('copy-link-btn');var printBtn=document.getElementById('print-btn');if(copyBtn){copyBtn.addEventListener('click',function(){navigator.clipboard.writeText(url).then(function(){copyBtn.textContent='Copied!';setTimeout(function(){copyBtn.textContent='Copy link';},1500);});});}if(printBtn){printBtn.addEventListener('click',function(){window.print();});}})();
  </script>
</body>
</html>
`;
}

function main() {
  const ideas = JSON.parse(readFileSync(IDEAS_JSON, 'utf8'));
  const categories = JSON.parse(readFileSync(CATEGORIES_JSON, 'utf8'));
  const list = Array.isArray(ideas) ? ideas : [];

  const today = new Date().toISOString().slice(0, 10);
  const sitemapUrls = [
    `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
  ];

  let count = 0;
  for (const idea of list) {
    const slug = (idea.slug || idea.id || 'unknown').toString().replace(/[^a-z0-9-]/gi, '-');
    const dir = join(ROOT, 'idea', slug);
    mkdirSync(dir, { recursive: true });
    const html = ideaToHtml(idea, list, categories);
    writeFileSync(join(dir, 'index.html'), html, 'utf8');
    sitemapUrls.push(
      `  <url>\n    <loc>${BASE_URL}/idea/${slug}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    );
    count++;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>
`;
  writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

  console.log(`Wrote ${count} idea pages to idea/<slug>/index.html`);
  console.log('Updated sitemap.xml with homepage + idea URLs');
}

main();
