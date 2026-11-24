// Builds the standalone GTM Bootcamp landing page (gtm-bootcamp/) and copies it
// into public/ so it is served at https://leadstrategus.ai/gtm-bootcamp.
// Run after editing gtm-bootcamp/content.js:  node scripts/build-gtm-bootcamp.mjs
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'gtm-bootcamp');
const built = path.join(src, 'dist');
const BASE = '/gtm-bootcamp';
const outDir = path.join(root, 'public', 'gtm-bootcamp');
const outPage = path.join(root, 'public', 'gtm-bootcamp.html');

execFileSync(process.execPath, ['build.mjs'], { cwd: src, stdio: 'inherit' });

// The page was written for a site root; move its root-relative asset paths under /gtm-bootcamp.
const prefix = (text) =>
  text
    .replace(/(["'(\s,])\/(img|brand|fonts)\//g, `$1${BASE}/$2/`)
    .replace(/(["'])\/(styles\.css|main\.js|site\.webmanifest)/g, `$1${BASE}/$2`);

fs.rmSync(outDir, { recursive: true, force: true });
fs.cpSync(built, outDir, { recursive: true });
fs.rmSync(path.join(outDir, 'index.html'));
fs.rmSync(path.join(outDir, 'robots.txt'), { force: true }); // the main site's robots.txt applies

// The main site serves pages without a trailing slash, so the canonical/og:url must match.
const page = prefix(fs.readFileSync(path.join(built, 'index.html'), 'utf8')).replaceAll(
  'https://leadstrategus.ai/gtm-bootcamp/"',
  'https://leadstrategus.ai/gtm-bootcamp"'
);
fs.writeFileSync(outPage, page);
for (const file of ['styles.css', 'main.js']) {
  const p = path.join(outDir, file);
  fs.writeFileSync(p, prefix(fs.readFileSync(p, 'utf8')));
}
const manifest = path.join(outDir, 'site.webmanifest');
const m = JSON.parse(fs.readFileSync(manifest, 'utf8'));
m.start_url = BASE;
m.icons = m.icons.map((i) => ({ ...i, src: BASE + i.src }));
fs.writeFileSync(manifest, JSON.stringify(m, null, 2) + '\n');

fs.rmSync(built, { recursive: true, force: true });
console.log(`✔ GTM Bootcamp page written to public/gtm-bootcamp.html (+ public/gtm-bootcamp/)`);
