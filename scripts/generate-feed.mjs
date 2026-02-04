#!/usr/bin/env node
/**
 * Generate feed.json (JSON Feed 1.1) and feed.xml (RSS 2.0) for the ideas board.
 * Run: node scripts/generate-feed.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IDEAS_JSON = join(ROOT, 'ideas.json');
const BASE_URL = 'https://ideas.ummah.build';

function escapeXml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function main() {
  const ideas = JSON.parse(readFileSync(IDEAS_JSON, 'utf8'));
  const list = Array.isArray(ideas) ? ideas : [];
  const now = new Date().toISOString();

  const items = list.map((idea) => {
    const slug = (idea.slug || idea.id || 'unknown').toString();
    const url = `${BASE_URL}/idea/${slug}/`;
    const title = idea.title || 'Untitled';
    const desc = idea.description || '';
    const content = [desc, ...(idea.requirements || []).slice(0, 5)].join('\n• ');
    const date = idea.updated || idea.date_added;
    return {
      id: url,
      url,
      title: `${idea.emoji || '💡'} ${title}`,
      content_text: content,
      date_published: date || null,
      _slug: slug,
      _status: idea.status,
    };
  });

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Ummah.build Islamic Tech Ideas',
    home_page_url: BASE_URL + '/',
    feed_url: BASE_URL + '/feed.json',
    description: 'Open source Islamic tech ideas: prayer tools, mosque apps, zakat, Quran, Ramadan, Islamic finance. Filter and contribute at ideas.ummah.build.',
    items: items.map(({ id, url, title, content_text, date_published }) => ({
      id,
      url,
      title,
      content_text,
      ...(date_published && { date_published }),
    })),
  };

  writeFileSync(join(ROOT, 'feed.json'), JSON.stringify(jsonFeed, null, 2), 'utf8');
  console.log('Wrote feed.json');

  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.content_text)}</description>
      ${item.date_published ? `<pubDate>${new Date(item.date_published).toUTCString()}</pubDate>` : ''}
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ummah.build Islamic Tech Ideas</title>
    <link>${BASE_URL}/</link>
    <description>Open source Islamic tech ideas: prayer tools, mosque apps, zakat, Quran, Ramadan, Islamic finance.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;
  writeFileSync(join(ROOT, 'feed.xml'), rss, 'utf8');
  console.log('Wrote feed.xml');
}

main();
