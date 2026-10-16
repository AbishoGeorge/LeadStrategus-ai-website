// Renders every known route to static HTML after `vite build` + the SSR build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--seo-start/end--> markers or the empty #root');
}

// Untouched SPA shell, served by the vercel.json catch-all for unknown routes.
fs.writeFileSync(path.join(dist, '_fallback.html'), template);

const { render, getPrerenderRoutes } = await import(pathToFileURL(serverEntry).href);

const routes = getPrerenderRoutes();
for (const route of routes) {
  const { html, head } = await render(route);
  const page = template
    .replace(SEO_BLOCK, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  // "/" -> index.html, "/why" -> why.html (served at /why via cleanUrls)
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
}

// Sitemap generated from the same route list, so new agents/posts/use cases are included automatically.
const SITE = 'https://leadstrategus.ai';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log(`Prerendered ${routes.length} routes.`);
