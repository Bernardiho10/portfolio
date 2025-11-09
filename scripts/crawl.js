// scripts/crawl.js
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const TARGET_URL = 'https://www.bernardarikuoko.com.ng/projects/';
const MAX_DEPTH = 2;
const OUTPUT_DIR = path.resolve('export');

const visited = new Set();
const sitemap = [];

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function saveJSON(file, data) { ensureDir(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(data, null, 2)); }
function saveText(file, text) { ensureDir(path.dirname(file)); fs.writeFileSync(file, text); }

function isInternal(url) {
  try {
    const u = new URL(url);
    const root = new URL(TARGET_URL);
    return u.host === root.host && (u.protocol === 'https:' || u.protocol === 'http:');
  } catch { return false; }
}

async function extractPageData(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  // Trigger lazy load
  await page.evaluate(async () => {
    const scrollStep = () => new Promise(r => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      let y = 0;
      const id = setInterval(() => {
        y = Math.min(y + 800, max);
        window.scrollTo(0, y);
        if (y >= max) { clearInterval(id); r(); }
      }, 100);
    });
    await scrollStep();
  });
  // Give images a moment
  await page.waitForTimeout(800);

  const meta = await page.evaluate(() => {
    const title = document.title || '';
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const nav = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
      label: a.textContent?.trim() || '',
      url: a.href
    }));
    return { title, metaDescription: metaDesc, navigation: nav };
  });

  const html = await page.content();
  const title = meta.title || (await page.title());
  const headers = await page.evaluate(() => ({
    h1: Array.from(document.querySelectorAll('h1')).map(e => e.textContent?.trim() || ''),
    h2: Array.from(document.querySelectorAll('h2')).map(e => e.textContent?.trim() || '')
  }));

  // Collect assets
  const assets = await page.evaluate(() => {
    const imgs = Array.from(document.images).map(img => ({
      originalUrl: img.currentSrc || img.src,
      alt: img.alt || '',
      type: 'image',
      width: img.naturalWidth || null,
      height: img.naturalHeight || null
    }));
    const links = Array.from(document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"]')).map(a => ({
      originalUrl: a.href,
      alt: a.textContent?.trim() || '',
      type: 'file'
    }));
    return [...imgs, ...links];
  });

  return { title, html, headers, meta, assets };
}

async function crawl(browser, url, depth = 0, maxDepth = 2) {
  if (visited.has(url) || depth > maxDepth) return [];
  visited.add(url);

  const page = await browser.newPage();
  let status = 0, lastModified = null;
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    status = response?.status() || 0;
    lastModified = response?.headers()['last-modified'] || null;
  } catch {}
  // Re-render fully
  const data = await extractPageData(page, url);
  sitemap.push({ url, title: data.title, lastModified, status });

  // Save raw HTML snapshot
  const safe = url.replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
  saveText(path.join(OUTPUT_DIR, 'snapshots', `${safe}.html`), data.html);

  // Queue internal links
  const urls = await page.$$eval('a[href]', as => as.map(a => a.href));
  await page.close();

  const next = urls.filter(isInternal);
  const results = [{ url, data }];
  for (const u of next) {
    if (!visited.has(u)) {
      const sub = await crawl(browser, u, depth + 1, maxDepth);
      results.push(...sub);
    }
  }
  return results;
}

async function downloadAsset(assetUrl, localPath) {
  const res = await fetch(assetUrl);
  if (!res.ok) throw new Error(`Failed ${res.status} ${assetUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  ensureDir(path.dirname(localPath));
  fs.writeFileSync(localPath, buf);
  return { sizeKB: Math.round(buf.length / 1024) };
}

(async () => {
  ensureDir(OUTPUT_DIR);
  const browser = await chromium.launch({ headless: true });
  const results = await crawl(browser, TARGET_URL, 0, MAX_DEPTH);
  await browser.close();

  // Asset download & manifest
  const manifest = [];
  for (const { url, data } of results) {
    for (const a of data.assets) {
      if (!a.originalUrl) continue;
      try {
        const u = new URL(a.originalUrl, url).toString();
        const ext = path.extname(new URL(u).pathname) || '.bin';
        const fname = u.replace(/[^a-z0-9]+/gi, '_').slice(0, 80) + ext;
        const localPath = path.join(OUTPUT_DIR, 'assets', fname);
        const { sizeKB } = await downloadAsset(u, localPath);
        manifest.push({
          originalUrl: u,
          localPath: path.relative(process.cwd(), localPath),
          type: a.type === 'file' ? 'application/octet-stream' : 'image',
          width: a.width || null,
          height: a.height || null,
          sizeKB,
          alt: a.alt || ''
        });
      } catch (e) { /* continue */ }
    }
  }

  // Very basic structured JSON (extend mapping as needed)
  const portfolio = {
    meta: { source: TARGET_URL, crawledAt: new Date().toISOString(), pagesCrawled: results.length },
    sitemap,
    header: {}, about: {}, projects: [], skills: {}, contact: {}, footer: {}, global: {},
    assets: manifest
  };

  saveJSON(path.join(OUTPUT_DIR, 'sitemap.json'), sitemap);
  saveJSON(path.join(OUTPUT_DIR, 'portfolio-data.json'), portfolio);

  // Simple Markdown scaffold
  const md = [
    '# Portfolio Extraction',
    `Source: ${TARGET_URL}`,
    `Crawled: ${results.length} pages`,
    '',
    '## Sitemap',
    ...sitemap.map(s => `- ${s.status} ${s.title || ''} (${s.url})`),
    '',
    '## Header/Hero',
    'TBD from portfolio-data.json',
    '',
    '## About',
    'TBD',
    '',
    '## Projects',
    'TBD',
    '',
    '## Skills',
    'TBD',
    '',
    '## Contact',
    'TBD',
    '',
    '## Footer & Global Styles',
    'TBD',
    '',
    '## Assets Manifest',
    `Total assets: ${manifest.length}`
  ].join('\n');
  saveText(path.join(OUTPUT_DIR, 'portfolio-extract.md'), md);

  console.log(`Done. See ${OUTPUT_DIR}`);
})();