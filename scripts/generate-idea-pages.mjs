#!/usr/bin/env node
/**
 * Generate one markdown file per idea from ideas.json.
 * Output: ideas/<slug>.md
 * Run: node scripts/generate-idea-pages.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IDEAS_JSON = join(ROOT, 'ideas.json');
const OUT_DIR = join(ROOT, 'ideas');

function escapeYamlString(s) {
  if (s == null) return '';
  const str = String(s);
  if (str.includes('\n') || str.includes(':') || str.includes('"') || str.includes("'")) return JSON.stringify(str);
  return str;
}

function ideaToMarkdown(idea) {
  const slug = idea.slug || idea.id || 'unknown';
  const title = idea.title || 'Untitled';
  const emoji = idea.emoji || '💡';
  const statusLabel = (idea.status || 'ideating').replace(/-/g, ' ');
  const lines = [
    '---',
    `id: ${JSON.stringify(idea.id)}`,
    `title: ${escapeYamlString(idea.title)}`,
    `description: ${escapeYamlString(idea.description)}`,
    `status: ${idea.status || 'ideating'}`,
  ];
  if (idea.url) lines.push(`url: ${escapeYamlString(idea.url)}`);
  lines.push(`emoji: ${escapeYamlString(idea.emoji || '💡')}`);
  lines.push(`slug: ${slug}`);
  if (idea.quality) lines.push(`quality: ${idea.quality}`);
  if (idea.categories && idea.categories.length) lines.push(`categories:\n${idea.categories.map(c => `  - ${c}`).join('\n')}`);
  if (idea.requirements && idea.requirements.length) {
    lines.push('requirements:');
    idea.requirements.forEach(r => lines.push(`  - ${escapeYamlString(r)}`));
  }
  lines.push('---', '');

  lines.push(`# ${emoji} ${title}`, '');
  lines.push(`**Status:** ${statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}`);
  if (idea.quality) lines.push(` · **Quality:** ${String(idea.quality).charAt(0).toUpperCase() + String(idea.quality).slice(1)}`);
  lines.push('', '');

  if (idea.url) {
    lines.push(`[Visit →](${idea.url})`, '', '');
  }

  lines.push('## Description', '', idea.description || '', '', '');

  if (idea.categories && idea.categories.length) {
    lines.push('## Categories', '', idea.categories.join(', '), '', '');
  }

  if (idea.requirements && idea.requirements.length) {
    lines.push('## Features / Requirements', '');
    idea.requirements.forEach(r => lines.push(`- ${r}`));
    lines.push('');
  }

  lines.push('---', '');
  const boardLink = `https://ideas.ummah.build/#idea-${slug}`;
  const editLink = 'https://github.com/ummahbuild/ideas/issues/new?template=edit_idea.md';
  lines.push(`*Idea: [${slug}](${boardLink}) · [Edit](${editLink})*`);
  return lines.join('\n');
}

function main() {
  const data = JSON.parse(readFileSync(IDEAS_JSON, 'utf8'));
  const ideas = Array.isArray(data) ? data : [];
  mkdirSync(OUT_DIR, { recursive: true });

  let count = 0;
  for (const idea of ideas) {
    const slug = (idea.slug || idea.id || 'unknown').toString();
    const safeSlug = slug.replace(/[^a-z0-9-]/gi, '-');
    const path = join(OUT_DIR, `${safeSlug}.md`);
    writeFileSync(path, ideaToMarkdown(idea), 'utf8');
    count++;
  }
  console.log(`Wrote ${count} idea files to ideas/`);
}

main();
