# LeadStrategus GTM Engineering Workshop: landing page

A single-page, static marketing site. Everything (programme, pricing, application form, checklist capture, FAQ, legal text and the thank-you states) lives on one page. Nav links scroll to sections.

## Edit content

**All variable content lives in [`content.js`](content.js).** The `settings` block at the top holds the placeholders from the reference copy: `dates`, `seatsLeft`, `applicationsCloseDate`, `priceIndividual`, `priceTeam`, `teamDiscountPct`, `fitCallUrl`, `clutchUrl`, `checklistEndpoint`, `checklistPdfUrl`, `showClientLogos`, `showTestimonials`, `contactEmail` and `whatsapp`. Lines marked `TODO` still need confirmed values.

After editing, rebuild (Netlify and Vercel do this automatically on deploy):

```bash
node build.mjs
```

Preview locally at http://localhost:4321:

```bash
npm run preview
```

No dependencies to install. Node 18+ is enough.

## How it works

| Path | What it is |
|---|---|
| `content.js` | The one file editors change |
| `src/render.mjs` | Turns the content into a fully prerendered `index.html` (fast, crawlable, and WhatsApp/LinkedIn link previews work) |
| `build.mjs` | Writes `dist/`, copies `public/`, and **fails the build if banned claims appear in the copy** |
| `public/main.js` | Interactions: announcement bar, scroll-spy, mobile menu, sticky Apply bar, modals, checklist capture, form validation and submission, analytics |
| `public/styles.css` | Mobile-first styles; brand colour tokens on `:root` |
| `public/brand/` | Logo files (shield, horizontal, stacked) as PNG + WebP, @1x/@2x |
| `public/fonts/` | Self-hosted Montserrat, Inter and Cinzel Bold (OFL) |
| `src/icons/` | Lucide icons (ISC), inlined at build time |
| `scripts/make-brand.py` | Rebuilds `public/brand/`, favicons and app icons from the JPGs in `assets-src/brand/` (needs Pillow + numpy) |
| `scripts/make-3d.mjs` | Renders the 3D layers in `public/img/3d/` with three.js (scenes in `scripts/three/scene.html`) and writes `anim.json`, the positions the arrow, stepping-stone and hero animations use. Needs Playwright |
| `scripts/make-og.mjs` | Regenerates the 1200×630 share image from `scripts/og-template.html` (needs Playwright) |

## Forms

**Application form:** set `form.provider` and `form.endpoint` in `content.js`.

- **`n8n` (recommended):** the form POSTs JSON to your n8n webhook. Suggested flow: Webhook → HubSpot create/update contact → Google Sheets append → Slack/WhatsApp/email alert. The webhook must reply 2xx and allow CORS from the site's domain.
- **`formspree`** / **`web3forms`:** POSTs JSON to their endpoint (for Web3Forms put `access_key` in `form.extraFields`).
- **`netlify`:** uses Netlify Forms. The form is already marked `data-netlify` with a honeypot.
- **Empty (current default):** submitting opens the applicant's email app with the application filled in, addressed to `contactEmail`.

The payload includes every field plus `utm_source`, `utm_medium`, `utm_campaign`, `page_url` and `submitted_at`. `?type=team` (or `individual`, `private`) in the URL pre-selects "Coming as".

**Checklist capture:** `checklistEndpoint` receives `{ email, source: "checklist", page_url, utm_*, submitted_at }`. The success state links to `checklistPdfUrl`.

## Analytics

GA4, Meta Pixel and LinkedIn Insight load **only** when their IDs are set in `content.js`. Events: `apply_submit`, `checklist_submit`.

## Still needed from LeadStrategus

- **Official SVG logo files.** The current logos are cut out of the supplied JPGs (see the TODO in `scripts/make-brand.py`)
- Cohort dates, seats left, close date, Cohort 1 prices and team discount
- Fit-call booking link, checklist PDF and capture endpoint
- Kirubakaran Periyaswamy's confirmed role title
- Approved Privacy Notice and Terms/Refund text
