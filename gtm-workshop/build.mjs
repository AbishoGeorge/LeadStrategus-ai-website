// Build: node build.mjs  →  dist/index.html (+ static assets)
// No dependencies. Reads content.js, prerenders the page, copies /public.

import { mkdirSync, rmSync, cpSync, writeFileSync } from "node:fs";
import content from "./content.js";
import { renderPage } from "./src/render.mjs";

const banned = [
  /guarantee(d|s)? (leads|meetings|revenue|pipeline|placement|jobs)/i,
  /phantombuster/i,
  /linkedin (automation|scraping) (is|are) (taught|included)/i,
  /production[- ]ready in 5 days/i,
];

const out = new URL("./dist/", import.meta.url);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(new URL("./public/", import.meta.url), out, { recursive: true });

const html = renderPage(content).replaceAll("__BUILD__", Date.now().toString(36));

// Claims guard (§1.3): fail the build if risky phrasing slips into the copy.
const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
for (const re of banned) for (const m of text.matchAll(new RegExp(re.source, re.flags + "g"))) {
  // Questions ("Do you guarantee meetings or a job?") and disclaimers ("not a guarantee of meetings") are allowed.
  const end = text.slice(m.index).search(/[.?!]/);
  if (end >= 0 && text[m.index + end] === "?") continue;
  if (!/\b(not|no|doesn't|does not|never|expect|want)\b[^.]{0,40}$/i.test(text.slice(Math.max(0, m.index - 60), m.index))) {
    console.error(`✖ Claims guard: "${m[0]}" appears in the copy. See §1.3 of the brief.`);
    process.exit(1);
  }
}

// House style: no em dashes in the copy.
const dash = text.indexOf("—");
if (dash >= 0) {
  console.error(`✖ Em dash found in the copy: "…${text.slice(Math.max(0, dash - 40), dash + 20).trim()}…". Use a comma, period, parentheses or semicolon.`);
  process.exit(1);
}

writeFileSync(new URL("index.html", out), html);
console.log(`✔ Built dist/index.html (${(html.length / 1024).toFixed(1)} KB)`);
