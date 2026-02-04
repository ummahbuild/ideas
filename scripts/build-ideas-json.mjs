#!/usr/bin/env node
/**
 * Build ideas.json from src/content/ideas/*.md (markdown frontmatter).
 * Writes to public/ideas.json so the board and feeds can use it.
 * Run before Astro build: npm run build
 * No external deps: parses YAML-like frontmatter inline.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'ideas');
const OUT_FILE = join(ROOT, 'public', 'ideas.json');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const data = {};
  let listKey = null;
  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listItem = line.match(/^\s+-\s+(.*)$/);
    if (listItem) {
      if (listKey) data[listKey].push(listItem[1].replace(/^["']|["']$/g, ''));
      continue;
    }
    listKey = null;
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\"/g, '"');
      else if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
      if (kv[1] === 'requirements' || kv[1] === 'categories' || kv[1] === 'relatedSlugs') {
        data[kv[1]] = v ? [v] : [];
        listKey = kv[1];
      } else {
        data[kv[1]] = v;
      }
    }
  }
  return data;
}

function buildIdeasJson() {
  let files = [];
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  } catch (e) {
    console.warn('src/content/ideas not found or empty. Run migration to copy ideas/*.md to src/content/ideas/');
    return;
  }

  const ideas = [];
  for (const file of files.sort()) {
    const path = join(CONTENT_DIR, file);
    const raw = readFileSync(path, 'utf8');
    const data = parseFrontmatter(raw);
    const slug = data.slug || data.id || file.replace(/\.md$/, '');
    ideas.push({
      id: String(data.id ?? slug),
      title: data.title ?? 'Untitled',
      description: data.description ?? '',
      slug,
      status: data.status ?? 'ideating',
      emoji: data.emoji ?? '💡',
      url: data.url || undefined,
      quality: data.quality || undefined,
      categories: Array.isArray(data.categories) ? data.categories : undefined,
      relatedSlugs: Array.isArray(data.relatedSlugs) ? data.relatedSlugs : undefined,
      requirements: Array.isArray(data.requirements) ? data.requirements : undefined,
    });
  }

  writeFileSync(OUT_FILE, JSON.stringify(ideas, null, 2), 'utf8');
  console.log(`Wrote public/ideas.json (${ideas.length} ideas from src/content/ideas)`);
}

buildIdeasJson();
