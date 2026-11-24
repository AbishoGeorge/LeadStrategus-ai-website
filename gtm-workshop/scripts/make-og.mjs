// Regenerates public/img/og-image.png (1200×630). Favicons come from scripts/make-brand.py. Needs Playwright with Chromium.
// Edit scripts/og-template.html if dates/weeks/seats change, then: node scripts/make-og.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const r = (p) => fileURLToPath(new URL(p, import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto("file://" + r("./og-template.html"));
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: r("../public/img/og-image.png") });
await b.close();
console.log("✔ og-image.png");
