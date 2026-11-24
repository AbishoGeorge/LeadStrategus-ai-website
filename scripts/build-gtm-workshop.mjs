// Builds the GTM Workshop page from gtm-workshop/ (its own source, edit content.js there)
// into the main site, where it renders at /gtm-workshop inside the normal navbar and footer.
//   node scripts/build-gtm-workshop.mjs
// Outputs:
//   src/pages/gtm-workshop/content.html  page body, rendered by src/pages/GtmWorkshop.tsx
//   src/pages/gtm-workshop/apply.json    copy for the apply / ask-a-question form the site renders
//   public/gtm-workshop/                 its images, fonts, script and scoped stylesheet
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import postcss from 'postcss';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'gtm-workshop');
const built = path.join(src, 'dist');
const BASE = '/gtm-workshop';
const SCOPE = '.gtm-root';
const assetsOut = path.join(root, 'public', 'gtm-workshop');
const htmlOut = path.join(root, 'src', 'pages', 'gtm-workshop', 'content.html');

execFileSync(process.execPath, ['build.mjs'], { cwd: src, stdio: 'inherit' });

// The page was written for a site root; move its root-relative asset paths under /gtm-workshop.
const prefixPaths = (text) =>
  text
    .replace(/(["'(\s,])\/(img|brand|fonts)\//g, `$1${BASE}/$2/`)
    .replace(/(["'])\/(styles\.css|main\.js|site\.webmanifest)/g, `$1${BASE}/$2`);

fs.rmSync(assetsOut, { recursive: true, force: true });
fs.cpSync(built, assetsOut, { recursive: true });
for (const f of ['index.html', 'robots.txt', 'site.webmanifest']) fs.rmSync(path.join(assetsOut, f), { force: true });
// The script was written for a standalone page. Inside the single-page site it must stop its
// timers when the visitor navigates away, so route them through window.__gtmTimers.
const timerShim =
  '"use strict";\n  const setInterval = (f, t) => { const id = window.setInterval(f, t); (window.__gtmTimers = window.__gtmTimers || []).push(id); return id; };\n' +
  '  const setTimeout = (f, t) => { const id = window.setTimeout(f, t); (window.__gtmTimers = window.__gtmTimers || []).push(id); return id; };';
const mainJs = fs.readFileSync(path.join(assetsOut, 'main.js'), 'utf8');
if (!mainJs.includes('"use strict";')) throw new Error('main.js layout changed: cannot add the timer shim');
const patchedJs = mainJs
  .replace('"use strict";', timerShim)
  // An animation frame can finish after the page is gone; skip the card if its container is gone.
  .replace("$('cards').appendChild(g);", "if(!$('cards'))return;$('cards').appendChild(g);");
if (!patchedJs.includes("if(!$('cards'))return;")) throw new Error('main.js layout changed: cannot guard the cards animation');
fs.writeFileSync(path.join(assetsOut, 'main.js'), prefixPaths(patchedJs));

// Scope every rule under .gtm-root so the page's styles cannot touch the rest of the site.
const scopeSelector = (sel) => {
  sel = sel.trim();
  if (/^body\.modal-open\b/.test(sel)) return sel; // set on <body> by the page's modals
  if (sel === 'html') return `html:has(${SCOPE})`;
  if (sel === ':root' || sel === 'body') return SCOPE;
  return `${SCOPE} ${sel}`;
};
const css = postcss.parse(fs.readFileSync(path.join(built, 'styles.css'), 'utf8'));
css.walkRules((rule) => {
  if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
  rule.selectors = rule.selectors.map(scopeSelector);
});
css.append(`
/* Inside leadstrategus.ai the site's own navbar and footer replace the page's header and footer. */
${SCOPE} { --nav-h: 104px; }
html:has(${SCOPE}) { scroll-padding-top: 116px; }
${SCOPE} .skip, ${SCOPE} .site-header, ${SCOPE} .site-footer { display: none !important; }
`);
fs.writeFileSync(path.join(assetsOut, 'styles.css'), prefixPaths(css.toString()));

// Page body without its <script src> tag (the component loads main.js after mount).
const page = fs.readFileSync(path.join(built, 'index.html'), 'utf8');
let body = page.slice(page.indexOf('<body>') + '<body>'.length, page.lastIndexOf('</body>'));
body = body
  .replace(/<script src="[^"]*main\.js[^"]*"[^>]*><\/script>\s*/, '')
  // Drop the <main> wrapper: the site's layout already has one, and the page is split
  // into sibling fragments around the form, so no element may stay open across the split.
  .replace('<main id="main">', '')
  .replace(/<\/main>/, '');
fs.mkdirSync(path.dirname(htmlOut), { recursive: true });
fs.writeFileSync(htmlOut, prefixPaths(body).trim() + '\n');

// Copy for the apply / ask-a-question form, which the site renders itself (src/pages/GtmWorkshop.tsx).
const { default: content } = await import(pathToFileURL(path.join(src, 'content.js')).href);
const { h2, sub, trust, email, roles, success, questionSuccess } = content.apply;
fs.writeFileSync(
  path.join(path.dirname(htmlOut), 'apply.json'),
  JSON.stringify({ h2, sub, trust, email, roles, success, questionSuccess, city: content.settings.city }, null, 2) + '\n'
);

fs.rmSync(built, { recursive: true, force: true });
console.log('✔ GTM Workshop page built into src/pages/gtm-workshop/ and public/gtm-workshop/');
