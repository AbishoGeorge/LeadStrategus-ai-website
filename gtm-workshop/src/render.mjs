// Renders the whole single page from content.js into one static HTML string.
// Prerendering keeps the page fast, crawlable and shareable (WhatsApp/LinkedIn
// previews don't run JavaScript). main.js only adds interactivity on top.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const iconCache = new Map();

export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Inline Lucide icon (ISC licence), decorative. */
export function icon(name, cls = "") {
  if (!iconCache.has(name)) {
    const raw = readFileSync(join(here, "icons", `${name}.svg`), "utf8");
    const inner = raw.slice(raw.indexOf(">", raw.indexOf("<svg")) + 1, raw.lastIndexOf("</svg>"));
    iconCache.set(name, inner.replace(/\s*\n\s*/g, ""));
  }
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconCache.get(name)}</svg>`;
}

/** Logo image: WebP with PNG fallback, @1x/@2x. */
const logo = (name, w, h, alt, cls = "", eager = false) => `<picture class="${cls}">
      <source type="image/webp" srcset="/brand/${name}@1x.webp 1x, /brand/${name}@2x.webp 2x">
      <img src="/brand/${name}@1x.png" srcset="/brand/${name}@1x.png 1x, /brand/${name}@2x.png 2x" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">
    </picture>`;

/** Decorative 3D illustration (rendered by scripts/make-3d.mjs). */
const art = (name, w, h) => `<picture class="sec-art art-${name}">
      <source type="image/webp" srcset="/img/3d/${name}@1x.webp 1x, /img/3d/${name}@2x.webp 2x">
      <img src="/img/3d/${name}@1x.png" srcset="/img/3d/${name}@1x.png 1x, /img/3d/${name}@2x.png 2x" width="${w}" height="${h}" alt="" loading="lazy" decoding="async">
    </picture>`;

/** Any image under /img: WebP + PNG/JPG fallback at @1x/@2x. */
const pic = (base, ext, w, h, alt = "", cls = "", eager = false) => `<picture${cls ? ` class="${cls}"` : ""}>
      <source type="image/webp" srcset="${base}@1x.webp 1x, ${base}@2x.webp 2x">
      <img src="${base}@1x.${ext}" srcset="${base}@1x.${ext} 1x, ${base}@2x.${ext} 2x" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? "" : ' loading="lazy"'} decoding="async">
    </picture>`;

/** Hero illustration: the animated workshop room (src/workshop-room.svg). */
const ROOM = readFileSync(join(here, "workshop-room.svg"), "utf8");

/** Positions for the 3D animations, written by scripts/make-3d.mjs. */
const animPath = join(here, "..", "public", "img", "3d", "anim.json");
const ANIM = existsSync(animPath) ? JSON.parse(readFileSync(animPath, "utf8")) : null;

/** CSS keyframes for the stepping-stone hop and the gate pulses, built from the stone positions. */
function stonesCss(st) {
  const [x0, y0] = st.tops[0];
  const T = 9; // seconds per loop
  const land = (i) => 8 + i * 9; // % of the loop at which the ball lands on stone i (stone 7 at 71%)
  const lift = 9; // hop height, % of the box
  const pct = (v) => +v.toFixed(2);
  const pos = (x, y) => `translate(${pct(x - x0)}%, ${pct(y - y0)}%)`;
  // Sample each hop as a real arc (straight across, parabola up and down) so the
  // ball travels smoothly instead of jumping between a few keyframes.
  const frames = [];
  const add = (at, transform, opacity) => frames.push(`${pct(at)}%{transform:${transform}${opacity == null ? "" : `;opacity:${opacity}`}}`);
  const arc = (from, to, x1, y1, x2, y2, h, steps = 12) => {
    for (let k = 1; k <= steps; k++) {
      const t = k / steps;
      add(from + (to - from) * t, pos(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t - 4 * h * t * (1 - t)));
    }
  };
  const [sx, sy] = st.tops[0];
  // Drop in from above the first stone, accelerating like it is falling.
  add(0, pos(sx, sy - lift * 2), 0);
  add(3, pos(sx, sy - lift * 2), 1);
  for (let k = 1; k <= 6; k++) { const t = k / 6; add(3 + (land(0) - 3) * t, pos(sx, sy - lift * 2 * (1 - t * t))); }
  for (let i = 1; i < 8; i++) arc(land(i - 1), land(i), ...st.tops[i - 1], ...st.tops[i], lift);
  // Settle on the last stone with two shrinking bounces, rest, then drift up and fade out gently.
  const [ex, ey] = st.tops[7];
  arc(land(7), land(7) + 4, ex, ey, ex, ey, lift * 0.3, 8);
  arc(land(7) + 4, land(7) + 7, ex, ey, ex, ey, lift * 0.1, 6);
  add(83, pos(ex, ey), 1);
  for (let k = 1; k <= 8; k++) { const t = k / 8, e = t * t * (3 - 2 * t); add(83 + 14 * t, pos(ex, ey - 6 * e), pct(1 - e)); }
  add(100, pos(ex, ey - 6), 0);
  let css = `@keyframes hop{${frames.join("")}}.anim-stones.in-view .ball img{animation:hop ${T}s linear .9s infinite}`;
  css += `@media (prefers-reduced-motion: reduce){.anim-stones .ball img{opacity:1;transform:${pos(ex, ey)}}}`;
  for (const g of st.gates) {
    const l = land(g);
    css += `@keyframes gate${g}{0%,${l - 1}%{transform:none;filter:none}${l + 1}%{transform:translateY(2.5%);filter:brightness(1.25) drop-shadow(0 0 10px rgba(225,6,0,.55))}${l + 6}%{transform:none;filter:brightness(1.1) drop-shadow(0 0 6px rgba(225,6,0,.35))}${l + 14}%,100%{transform:none;filter:none}}`;
    css += `.anim-stones.in-view .s${g} img{animation:gate${g} ${T}s linear .9s infinite}`;
  }
  return css;
}

const initials = (name) => name.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const digits = (s) => String(s || "").replace(/[^\d]/g, "");

export function renderPage(c) {
  const S = c.settings;
  const seats = S.totalSeats;
  const fill = (s) => String(s).replaceAll("{teamDiscountPct}", S.teamDiscountPct).replaceAll("{priceIndividual}", S.priceIndividual);
  const wa = S.whatsapp ? `https://wa.me/${encodeURIComponent(S.whatsapp)}?text=${encodeURIComponent(S.whatsappMessage)}` : "";
  const applyBtn = (label = "Apply for Cohort 1", extra = "", type = "") =>
    `<a class="btn btn-primary ${extra}" href="#apply"${type ? ` data-apply-type="${type}"` : ""}>${label} ${icon("arrow-right")}</a>`;

  const ogUrl = c.site.url.replace(/\/$/, "");
  const ogImg = ogUrl + c.site.ogImage;
  const metaDesc = c.site.description;

  // ---------- JSON-LD ----------
  const org = {
    "@type": "Organization",
    "@id": ogUrl + "#org",
    name: "LeadStrategus",
    url: "https://leadstrategus.com",
    logo: ogUrl + "/brand/leadstrategus-logo-stacked.png",
    image: ogUrl + "/brand/leadstrategus-shield.png",
    slogan: "Superpower your sales!",
    sameAs: ["https://leadstrategus.com", "https://leadstrategus.ai", "https://expotofunnel.com", S.linkedin, S.instagram].filter(Boolean),
  };
  const offers = [
    digits(S.priceIndividual) && { "@type": "Offer", name: "Individual", price: digits(S.priceIndividual), priceCurrency: "INR", url: ogUrl + "/#pricing", category: "Paid", description: "Price before GST" },
    digits(S.priceTeam) && { "@type": "Offer", name: "Team of 3+, per person", price: digits(S.priceTeam), priceCurrency: "INR", url: ogUrl + "/#pricing", category: "Paid", description: "Price per person before GST" },
  ].filter(Boolean);
  const place = {
    "@type": "Place",
    name: `LeadStrategus GTM Engineering Workshop, ${S.city}`,
    address: { "@type": "PostalAddress", addressLocality: S.city, addressRegion: "Karnataka", addressCountry: "IN" },
  };
  const dates = S.startDate ? { startDate: S.startDate, endDate: S.endDate || S.startDate } : {};
  const course = {
    "@type": "Course",
    name: c.site.name,
    description: metaDesc,
    provider: { "@id": ogUrl + "#org" },
    offers,
    hasCourseInstance: [
      { "@type": "CourseInstance", name: "5-day in-person workshop", courseMode: "Onsite", courseWorkload: "P5D", location: place, ...dates },
      { "@type": "CourseInstance", name: "4 weeks of guided implementation (2 × 1 hr live sessions a week)", courseMode: "Online", courseWorkload: "P4W" },
    ],
  };
  const graph = [org, course];
  if (S.startDate) {
    graph.push({
      "@type": "EducationEvent",
      name: `${c.site.name}: Bengaluru Cohort 1`,
      ...dates,
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: place,
      organizer: { "@id": ogUrl + "#org" },
      offers: offers.map((o) => ({ ...o, availability: "https://schema.org/InStock" })),
      image: ogImg,
      description: metaDesc,
    });
  }
  graph.push({ "@type": "FAQPage", mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  const runtime = JSON.stringify({
    form: c.form,
    analytics: c.analytics,
    email: S.contactEmail,
    whatsapp: wa,
    checklistEndpoint: S.checklistEndpoint,
    checklistPdfUrl: S.checklistPdfUrl,
  }).replace(/</g, "\\u003c");

  // ---------- sections (each returns "" when hidden) ----------

  const people = c.faculty.people;
  const hero = `
<section class="hero" id="top">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="hero-eyebrow"><span class="live-dot" aria-hidden="true"></span>${esc(c.hero.eyebrow)}</p>
      <h1>${esc(c.hero.h1Before)}<span class="grad">${esc(c.hero.h1Gradient)}</span></h1>
      <p class="lead">${esc(c.hero.sub)}</p>
      <ul class="hero-promises">${c.hero.promises.map((t) => `<li>${icon("check")}<span>${esc(t)}</span></li>`).join("")}</ul>
      <ul class="hero-facts">${c.hero.facts.map((t) => `<li>${esc(fill(t))}</li>`).join("")}</ul>
      <div class="cta-row">${applyBtn("Apply for Cohort 1", "btn-lg")}<a class="btn btn-ghost btn-lg" href="#apply" data-apply-type="private">Ask a question</a></div>
      <p class="hero-trust">${c.hero.trust.map(esc).join(' <span aria-hidden="true">·</span> ')}</p>
    </div>
    <div class="hero-visual room"><div class="room-frame">${ROOM}</div>
    </div>
  </div>
</section>`;

  const logoItems = (hidden) =>
    c.clients
      .map((cl) => `<li>${pic("/img/clients/" + cl.logo, "png", Math.round(cl.h * (cl.ratio || 3)), cl.h, hidden ? "" : cl.name)}</li>`)
      .join("");
  const trusted = S.showClientLogos
    ? {
        id: "trusted",
        cls: "trusted",
        wide: true,
        html: `<p class="trusted-h">Trusted by B2B teams at</p>
    <div class="marquee"><div class="marquee-track"><ul>${logoItems(false)}</ul><ul aria-hidden="true">${logoItems(true)}</ul></div></div>`,
      }
    : null;

  const T3 = ANIM && ANIM.target;
  const targetArt = T3
    ? `<div class="anim-target" aria-hidden="true" style="--bx:${T3.bull[0]}%;--by:${T3.bull[1]}%;--fx:${((T3.tail[0] - T3.bull[0]) * 1.1).toFixed(2)}%;--fy:${((T3.tail[1] - T3.bull[1]) * 1.1).toFixed(2)}%">
        <div class="board">${pic("/img/3d/target-board", "png", T3.w, T3.h)}</div>
        <span class="ripple"></span><span class="ripple r2"></span>
        <div class="arrow">${pic("/img/3d/target-arrow", "png", T3.w, T3.h)}</div>
      </div>`
    : "";
  const ST = ANIM && ANIM.stones;
  const stonesArt = ST
    ? `<div class="anim-stones" aria-hidden="true">${[...Array(8)]
        .map((_, i) => `<div class="stone s${i}${ST.gates.includes(i) ? " gate" : ""}" style="--d:${i * 70}ms">${pic("/img/3d/stones-stone" + i, "png", ST.w, ST.h)}</div>`)
        .join("")}<div class="ball">${pic("/img/3d/stones-ball", "png", ST.w, ST.h)}</div></div>`
    : "";
  const why = {
    id: "why",
    html: `
    <div class="sec-head with-art"><div><h2>${esc(c.why.h2)}</h2><p class="sec-sub">${esc(c.why.intro)}</p></div>${targetArt}</div>
    <div class="cols-3">${c.why.cols.map((k) => `<article class="card why-card">${icon(k.icon, "ic-lg")}<h3>${esc(k.title)}</h3><p>${esc(k.text)}</p></article>`).join("")}</div>`,
  };

  const WJ = c.whyJoin;
  const whyJoin = {
    id: "why-join",
    cls: "band band-glow",
    html: `
    <div class="sec-head"><h2>${esc(WJ.h2)}</h2><p class="sec-sub">${esc(WJ.intro)}</p></div>
    <div class="wj-grid">
      <div>
        <p class="wj-label">What you get</p>
        <ul class="wj-list">${WJ.cards.map((k) => `<li><h3>${esc(k.title)}</h3><p>${esc(k.text)}</p></li>`).join("")}</ul>
      </div>
      <aside class="wj-proof">
        <p class="wj-label">Why LeadStrategus</p>
        <ul class="wj-stats">${c.whyUs.proofs
          .map((p) => `<li><span class="ps-num">${esc(p.big)}</span><span class="ps-label">${p.clutch ? `<a href="${esc(S.clutchUrl)}" target="_blank" rel="noopener">${esc(p.short)}</a>` : esc(p.short)}</span></li>`)
          .join("")}</ul>
        <p class="we-do-it">${esc(c.whyUs.banner[0])} <strong>${esc(c.whyUs.banner[1])}</strong></p>
      </aside>
    </div>`,
  };

  const SP = c.sponsor;
  const sponsor = {
    id: "sponsor",
    html: `
    <div class="sec-head"><h2>${esc(SP.h2)}</h2><p class="sec-sub">${esc(SP.intro)}</p></div>
    <div class="sponsor-grid">
      <div class="card pitch-card">
        <p class="tag-line">${esc(SP.pitchTitle)}</p>
        <ul class="pitch-list">${SP.points.map((k) => `<li><span class="pitch-ic">${icon(k.icon)}</span><div><h3>${esc(k.title)}</h3><p>${esc(fill(k.text))}</p></div></li>`).join("")}</ul>
      </div>
      <figure class="letter">
        <div class="letter-head"><figcaption class="tag-line">${esc(SP.emailLabel)}</figcaption><button type="button" class="btn btn-ghost btn-sm" data-copy-target="sponsor-note">Copy note</button></div>
        <pre id="sponsor-note">${esc(SP.email.map(fill).join("\n"))}</pre>
      </figure>
    </div>`,
  };

  const WU = c.whyUs;
  const whyUs = {
    id: "why-us",
    cls: "band band-glow",
    html: `
    <div class="sec-head"><h2>${esc(WU.h2)}</h2><p class="sec-sub">${esc(WU.intro)}</p></div>
    <div class="proofs">${WU.proofs
      .map(
        (p, i) => `<article class="proof-card" style="--i:${i}">
        <span class="proof-ic">${icon(p.icon, "ic-lg")}</span>
        <p class="proof-title">${esc(p.title)}</p>
        <p class="proof-big"><span class="proof-num">${esc(p.big)}</span> <span class="proof-label">${esc(p.label)}</span></p>
        <p class="proof-text">${esc(p.text)}</p>
        ${p.clutch ? `<a class="proof-link" href="${esc(S.clutchUrl)}" target="_blank" rel="noopener">Read the reviews on Clutch ${icon("arrow-up-right", "ic-sm")}</a>` : ""}
      </article>`
      )
      .join("")}</div>
    <p class="we-do-it">${esc(WU.banner[0])} <strong>${esc(WU.banner[1])}</strong></p>`,
  };

  const pill = (ctl) => (ctl === "human" ? `<span class="pill pill-human">HUMAN GATE</span>` : `<span class="pill pill-ai">AI-ASSISTED</span>`);
  const programme = {
    id: "programme",
    html: `
    <div class="sec-head with-art wide-art"><div><h2>${esc(c.programme.h2)}</h2><p class="sec-sub">${esc(c.programme.intro)}</p></div>${stonesArt}</div>
    <div class="phases">${c.days.phases
      .map(
        (d, i) => `${i ? `<span class="phase-arrow" aria-hidden="true">${icon("arrow-right", "ic-lg")}</span>` : ""}<article class="phase phase-${i ? "b" : "a"}">
        <p class="phase-tag">${esc(d.tag)}</p>
        <p class="phase-big"><span class="phase-num">${esc(d.big)}</span><span class="phase-unit">${esc(d.unit)}</span></p>
        <h3>${esc(d.title)}</h3>
        <p class="phase-steps">${d.steps.map(esc).join(" <span aria-hidden=\"true\">·</span> ")}</p>
      </article>`
      )
      .join("")}</div>
    <ul class="outcomes">${c.days.outcomes.map((o) => `<li>${icon(o.icon, "ic-lg")}<h3>${esc(o.title)}</h3><p>${esc(o.text)}</p></li>`).join("")}</ul>`,
  };

  const days = {
    id: "days",
    html: `
    <div class="sec-head"><h2>${esc(c.days.h2)}</h2></div>
    <div class="phases">${c.days.phases
      .map(
        (d, i) => `${i ? `<span class="phase-arrow" aria-hidden="true">${icon("arrow-right", "ic-lg")}</span>` : ""}<article class="phase phase-${i ? "b" : "a"}">
        <p class="phase-tag">${esc(d.tag)}</p>
        <p class="phase-big"><span class="phase-num">${esc(d.big)}</span><span class="phase-unit">${esc(d.unit)}</span></p>
        <h3>${esc(d.title)}</h3>
        <p class="phase-steps">${d.steps.map(esc).join(" <span aria-hidden=\"true\">·</span> ")}</p>
      </article>`
      )
      .join("")}</div>
    <ul class="outcomes">${c.days.outcomes.map((o) => `<li>${icon(o.icon, "ic-lg")}<h3>${esc(o.title)}</h3><p>${esc(o.text)}</p></li>`).join("")}</ul>
    <h3 class="subhead">${esc(c.days.subhead)}</h3>
    <ol class="day-cards">${c.days.list
      .map((d) => `<li class="card day-card"><p class="tag-line">${esc(d.label)}</p><h4>${esc(d.title)}</h4><p>${esc(d.text)}</p></li>`)
      .join("")}</ol>`,
  };


  const who = {
    id: "who",
    html: `
    <div class="sec-head"><h2>${esc(c.who.h2)}</h2></div>
    <div class="cols-4">${c.who.cards
      .map(
        (k) => `<article class="card who-card">${icon(k.icon, "ic-lg")}<h3>${esc(k.title)}</h3><p>${
          k.link ? `<a href="${k.link}">${esc(fill(k.text))}&nbsp;→</a>` : esc(fill(k.text))
        }</p></article>`
      )
      .join("")}</div>
    <p class="note note-strong">${esc(c.who.note)}</p>`,
  };

  const stars = `<span class="stars" aria-hidden="true">★★★★★</span>`;
  const T = c.proof.testimonials;
  const proof = {
    id: "proof",
    cls: S.showTestimonials ? "proof" : "proof-slim",
    html: S.showTestimonials
      ? `
    <div class="proof-head">
      <h2>${esc(c.proof.h2)}</h2>
      <a class="clutch-line" href="${esc(S.clutchUrl)}" target="_blank" rel="noopener">${stars} ${esc(c.proof.badge)} ${icon("arrow-up-right", "ic-sm")}</a>
    </div>
    <div class="slider" data-slider role="region" aria-roledescription="carousel" aria-label="Client reviews from Clutch">
      <div class="slider-view">
        <div class="slider-track">${[0, 1, 2]
          .map((copy) =>
            T.map(
              (t, i) => `<div class="slide card${copy === 1 && i === 0 ? " is-active" : ""}"${copy === 1 ? ` role="group" aria-roledescription="slide" aria-label="${i + 1} of ${T.length}"` : ' aria-hidden="true" data-clone'}>${stars}<blockquote><p>“${esc(t.quote)}”</p></blockquote><p class="q-by">${esc(t.role)}, ${esc(t.company)}</p></div>`
            ).join("")
          )
          .join("")}</div>
      </div>
      <div class="slider-ctrl">
        <button type="button" class="car-btn" data-dir="-1" aria-label="Previous review">${icon("arrow-right", "flip")}</button>
        <div class="dots">${T.map((_, i) => `<button type="button" class="dot${i === 0 ? " on" : ""}" data-i="${i}" aria-label="Show review ${i + 1}"${i === 0 ? ' aria-current="true"' : ""}></button>`).join("")}</div>
        <button type="button" class="car-btn" data-dir="1" aria-label="Next review">${icon("arrow-right")}</button>
      </div>
    </div>`
      : `<div class="proof-head"><a class="clutch-line" href="${esc(S.clutchUrl)}" target="_blank" rel="noopener">${stars} ${esc(c.proof.badge)} ${icon("arrow-up-right", "ic-sm")}</a></div>`,
  };

  const photo = (f, size = 88) =>
    f.photo
      ? pic("/img/people/" + f.photo, "jpg", size, size, f.name, "avatar-wrap").replace("<img ", '<img class="avatar" ')
      : `<span class="avatar avatar-ph" aria-hidden="true">${initials(f.name)}</span>`;
  const first = (f) => f.name.split(" ")[0];
  const faculty = {
    id: "faculty",
    html: `
    <div class="sec-head"><h2>${esc(c.faculty.h2)}</h2><p class="sec-sub">${esc(c.faculty.sub)}</p></div>
    <div class="team">${people
      .map(
        (f, k) => `<article class="card person"${f.long && f.long.length ? ` data-open="person-${k}"` : ""}>
          <div class="person-top">${photo(f)}<p class="person-role">${esc(f.role)}</p></div>
          <h3>${esc(f.name)}</h3>
          <p class="person-bio">${esc(f.bio)}</p>
          ${f.long && f.long.length ? `<button type="button" class="more" data-modal="person-${k}">More about ${esc(first(f))} ${icon("arrow-up-right", "ic-sm")}</button>` : ""}
          ${f.linkedin || f.email ? `<div class="person-links">${f.linkedin ? `<a class="icon-btn" href="${esc(f.linkedin)}" target="_blank" rel="noopener" aria-label="${esc(f.name)} on LinkedIn">${icon("linkedin")}</a>` : ""}${
            f.email ? `<a class="icon-btn" href="mailto:${esc(f.email)}" aria-label="Email ${esc(f.name)}">${icon("mail")}</a>` : ""
          }</div>` : ""}
        </article>`
      )
      .join("")}</div>`,
  };
  const personDialogs = people
    .map((f, k) =>
      f.long && f.long.length
        ? `<dialog class="modal person-modal" id="modal-person-${k}" aria-labelledby="pm-${k}">
  <button type="button" class="modal-x floating" data-close aria-label="Close">${icon("x")}</button>
  <div class="pm-head">${photo(f, 104)}<div><p class="person-role">${esc(f.role)}</p><h2 id="pm-${k}">${esc(f.name)}</h2></div></div>
  <p class="pm-lead">${esc(f.bio)}</p>
  <div class="pm-body">${f.long.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
  <ul class="pm-links">${f.linkedin ? `<li><a href="${esc(f.linkedin)}" target="_blank" rel="noopener">${icon("linkedin")} Connect on LinkedIn</a></li>` : ""}${
            f.email ? `<li><a href="mailto:${esc(f.email)}">${icon("mail")} ${esc(f.email)}</a></li>` : ""
          }</ul>
</dialog>`
        : ""
    )
    .join("\n");

  const checklist = {
    id: "checklist",
    cls: "checklist-sec",
    html: `
    <div class="checklist card">
      ${icon("file-text", "ic-lg")}
      <div class="cl-copy"><p class="tag-line">${esc(c.checklist.tag)}</p><p class="cl-title">${esc(c.checklist.title)}</p></div>
      <div class="cl-action">
        <button type="button" class="btn btn-ghost" id="cl-open" aria-expanded="false" aria-controls="cl-form">${esc(c.checklist.cta)}</button>
        <form class="cl-form" id="cl-form" hidden novalidate>
          <label for="cl-email">Work email</label>
          <div class="cl-row"><input id="cl-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="cl-err"><button class="btn btn-primary" type="submit">Send</button></div>
          <p class="err" id="cl-err" role="alert"></p>
        </form>
        <div class="cl-done" id="cl-done" hidden role="status"></div>
      </div>
    </div>`,
  };

  const P = c.pricing;
  const pricing = {
    id: "pricing",
    html: `
    <div class="sec-head"><h2>${esc(P.h2)}</h2><p class="sec-sub">${esc(P.sub)}</p></div>
    <div class="prices">
      <article class="card price">
        <p class="tag-line">INDIVIDUAL</p>
        <p class="price-val">${esc(S.priceIndividual)} <span>+ GST</span></p>
        <ul class="ticks"><li>${icon("check")}5-day workshop, ${esc(S.city)}</li><li>${icon("check")}4 weeks guided implementation</li><li>${icon("check")}Cloud workspace, 2 months</li><li>${icon("check")}1 private review slot</li></ul>
        ${applyBtn("Apply", "btn-block", "individual")}
      </article>
      <article class="card price featured">
        <span class="badge">RECOMMENDED</span>
        <p class="tag-line">TEAM OF 3+</p>
        <p class="price-val">${esc(S.priceTeam)} <span>per person + GST</span></p>
        <ul class="ticks"><li>${icon("check")}Everything in Individual</li><li>${icon("check")}Save ${esc(S.teamDiscountPct)}% per seat</li><li>${icon("check")}Shared workspace for the team</li><li>${icon("check")}2 private review slots</li></ul>
        ${applyBtn("Apply as a team", "btn-block", "team")}
      </article>
      <article class="card price">
        <p class="tag-line">PRIVATE COHORT</p>
        <p class="price-val price-req">On request</p>
        <ul class="ticks"><li>${icon("check")}At your office or ours</li><li>${icon("check")}Built around your stack</li><li>${icon("check")}Unlimited review slots</li></ul>
        <a class="btn btn-ghost btn-block" href="#apply" data-apply-type="private">Talk to us ${icon("arrow-right")}</a>
      </article>
    </div>`,
  };

  const A = c.apply;
  const apply = {
    id: "apply",
    html: `
    <div class="apply-grid">
      <div class="apply-copy">
        <h2 class="h2-bar">${esc(A.h2)}</h2>
        <p class="sec-sub">${esc(A.sub)}</p>
        <ul class="trust">${A.trust.map((t) => `<li>${icon("check")}${esc(t)}</li>`).join("")}</ul>
      </div>
      <div class="card form-card" id="form-card">
        <form id="apply-form" name="workshop-apply" method="POST" data-netlify="true" netlify-honeypot="company_url_confirm" novalidate>
          <input type="hidden" name="form-name" value="workshop-apply">
          <input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign">
          <input type="hidden" name="page_url">
          <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="company_url_confirm" tabindex="-1" autocomplete="off"></label></div>

          <div class="fgrid">
            <div class="field"><label for="f-name">Full name <span class="req" aria-hidden="true">*</span></label><input id="f-name" name="full_name" type="text" autocomplete="name" required maxlength="120" aria-describedby="e-name"><p class="err" id="e-name"></p></div>
            <div class="field"><label for="f-email">Work email <span class="req" aria-hidden="true">*</span></label><input id="f-email" name="work_email" type="email" autocomplete="email" inputmode="email" required maxlength="160" aria-describedby="e-email"><p class="err" id="e-email"></p></div>
            <div class="field"><label for="f-company">Company and website <span class="req" aria-hidden="true">*</span></label><input id="f-company" name="company" type="text" autocomplete="organization" required maxlength="200" placeholder="Acme Ltd · acme.com" aria-describedby="e-company"><p class="err" id="e-company"></p></div>
            <div class="field"><label for="f-role">Your role</label>
              <select id="f-role" name="role">${A.roles.map((r, i) => `<option${i === 0 ? " selected" : ""}>${esc(r)}</option>`).join("")}</select></div>
          </div>

          <div class="field"><label for="f-sell">What do you sell, and to whom? <span class="req" aria-hidden="true">*</span></label>
            <textarea id="f-sell" name="what_you_sell" rows="4" maxlength="600" required aria-describedby="sell-count e-sell"></textarea>
            <p class="counter" id="sell-count" aria-live="polite">0 / 600</p><p class="err" id="e-sell"></p></div>

          <fieldset class="field coming" aria-describedby="e-type">
            <legend>Coming as <span class="req" aria-hidden="true">*</span></legend>
            <div class="seg">
              <label><input type="radio" name="coming_as" value="individual" checked><span>Individual</span></label>
              <label><input type="radio" name="coming_as" value="team"><span>Team of 3+</span></label>
              <label class="seg-private" hidden><input type="radio" name="coming_as" value="private"><span>Private cohort</span></label>
            </div>
            <p class="err" id="e-type"></p>
          </fieldset>

          <div class="field checks">
            <label class="check"><input type="checkbox" name="can_attend" value="yes" required aria-describedby="e-attend"><span>I can attend all 5 days in ${esc(S.city)}. <span class="req" aria-hidden="true">*</span></span></label>
            <p class="err" id="e-attend"></p>
            <label class="check"><input type="checkbox" name="consent" value="yes" required aria-describedby="e-consent"><span>I agree to be contacted about this workshop and accept the <button type="button" class="linkish" data-modal="privacy">Privacy Notice</button>. <span class="req" aria-hidden="true">*</span></span></label>
            <p class="err" id="e-consent"></p>
          </div>

          <div class="form-status" id="form-status" role="alert" hidden></div>
          <button class="btn btn-primary btn-block btn-lg" type="submit" id="submit-btn"><span class="lbl">Submit application</span> ${icon("arrow-right")}</button>
          <p class="req-note"><span class="req">*</span> Required</p>
        </form>
        <div class="thanks" id="thanks" hidden tabindex="-1">
          ${icon("badge-check", "ic-xl")}
          <h3>${esc(A.success)}</h3>
          ${wa ? `<a class="btn btn-ghost btn-sm" href="${esc(wa)}" target="_blank" rel="noopener">${icon("message-circle")} WhatsApp us</a>` : ""}
        </div>
      </div>
    </div>`,
  };

  const faq = {
    id: "faq",
    narrow: true,
    html: `
    <div class="sec-head"><h2>Questions, answered plainly.</h2></div>
    <div class="faq">${c.faq
      .map((f, i) => `<details class="faq-item"${i === 0 ? " open" : ""}><summary><span>${esc(f.q)}</span>${icon("plus", "faq-ic")}</summary><div class="faq-a"><p>${esc(f.a)}</p></div></details>`)
      .join("")}</div>`,
  };

  // The application form is rendered by the leadstrategus.ai site (it posts to the site's
  // contact endpoint); the build splits the page at this marker.
  const applySlot = { id: "apply", slot: true, html: "" };

  // Alternate white / silver backgrounds across whichever sections are shown.
  const sections = [whyJoin, programme, faculty, sponsor, pricing, applySlot, faq].filter(Boolean);
  const body = sections
    .map((s, i) =>
      s.slot
        ? `\n<!--GTM_APPLY_SLOT:${i % 2 ? "alt" : ""}-->\n`
        : `
<!-- ${s.id} -->
<section class="section ${i % 2 ? "alt" : ""} ${s.cls || ""}" id="${s.id}">
  <div class="wrap${s.narrow ? " wrap-narrow" : ""}">${s.html}
  </div>
</section>`
    )
    .join("\n");

  const nav = [
    ["top", "Home"],
    ["programme", "Programme"],
    ["who", "Who it's for"],
    ["faculty", "Meet our team"],
    ["sponsor", "Sponsorship"],
    ["pricing", "Pricing"],
  ];

  // ---------- page ----------
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.site.title)}</title>
<meta name="description" content="${esc(metaDesc)}">
<link rel="canonical" href="${esc(ogUrl)}/">
<meta name="theme-color" content="#FFFFFF">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:site_name" content="LeadStrategus">
<meta property="og:title" content="${esc(`${c.site.name} · ${S.city} Cohort 1`)}">
<meta property="og:description" content="${esc(metaDesc)}">
<meta property="og:url" content="${esc(ogUrl)}/">
<meta property="og:image" content="${esc(ogImg)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="LeadStrategus GTM Engineering Workshop · Bengaluru · Cohort 1">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(c.site.name)}">
<meta name="twitter:description" content="${esc(metaDesc)}">
<meta name="twitter:image" content="${esc(ogImg)}">
<link rel="icon" href="/img/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="icon" href="/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/montserrat.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css?v=__BUILD__">
${ST ? `<style>${stonesCss(ST)}</style>` : ""}
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>


<header class="site-header" id="site-header">
  <div class="wrap nav-row">
    <a class="brand" href="#top">
      ${logo("leadstrategus-shield", 30, 36, "", "brand-shield", true)}
      <span class="brand-name">LEADSTRATEGUS</span>
      <span class="brand-div" aria-hidden="true"></span>
      <span class="brand-sub">GTM ENGINEERING WORKSHOP</span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Primary">
      <ul>${nav.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join("")}</ul>
    </nav>
    ${applyBtn("Apply for Cohort 1", "btn-sm nav-cta")}
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon("menu", "ic-open")}${icon("x", "ic-close")}</button>
  </div>
</header>

<main id="main">
${hero}
${trusted ? `<section class="trusted" id="trusted" aria-label="Clients">${trusted.html}</section>` : ""}
${body}
</main>

<footer class="site-footer">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <a class="foot-logo" href="#top">${logo("leadstrategus-logo-horizontal", 227, 56, "LeadStrategus logo")}</a>
      <ul class="foot-sites">${c.footer.sites
        .map((x) => `<li><a class="site-pill" href="${esc(x.url)}" target="_blank" rel="noopener"><span class="fs-name">${esc(x.name)} ${icon("arrow-up-right", "ic-sm")}</span><span class="fs-text">${esc(x.text)}</span></a></li>`)
        .join("")}</ul>
    </div>
    <div class="foot-col foot-contact">
      <h2 class="foot-h">Contact</h2>
      <a class="foot-mail" href="mailto:${esc(S.contactEmail)}">${esc(S.contactEmail)}</a>
      ${S.address ? `<address>${esc(S.address)}</address>` : ""}
      <div class="socials">
        ${S.linkedin ? `<a class="icon-btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener" aria-label="LeadStrategus on LinkedIn">${icon("linkedin")}</a>` : ""}
        ${S.instagram ? `<a class="icon-btn" href="${esc(S.instagram)}" target="_blank" rel="noopener" aria-label="LeadStrategus on Instagram">${icon("instagram")}</a>` : ""}
        <a class="clutch-pill" href="${esc(S.clutchUrl)}" target="_blank" rel="noopener">${icon("star", "star-ic")} ${esc(S.clutchRating)} on Clutch</a>
      </div>
    </div>
  </div>
  <div class="wrap foot-base">
    <p>© 2026 LeadStrategus Private Limited · ${esc(S.city)}, India</p>
    <ul class="foot-legal"><li><button type="button" class="linkish" data-modal="privacy">Privacy</button></li><li><button type="button" class="linkish" data-modal="terms">Terms</button></li></ul>
  </div>
</footer>
${personDialogs}

<div class="mobile-bar" id="mobile-bar">${applyBtn(`Apply for Cohort 1 <span class="mb-sub">· Seats filling fast</span>`, "btn-block")}</div>

<dialog class="modal" id="modal-privacy" aria-labelledby="mp-h">
  <div class="modal-head"><h2 id="mp-h">Privacy Notice</h2><button type="button" class="modal-x" data-close aria-label="Close">${icon("x")}</button></div>
  <div class="modal-body">${c.legal.privacyHtml}</div>
</dialog>
<dialog class="modal" id="modal-terms" aria-labelledby="mt-h">
  <div class="modal-head"><h2 id="mt-h">Terms &amp; Refund</h2><button type="button" class="modal-x" data-close aria-label="Close">${icon("x")}</button></div>
  <div class="modal-body">${c.legal.termsHtml}</div>
</dialog>

<script type="application/json" id="site-config">${runtime}</script>
<script src="/main.js?v=__BUILD__" defer></script>
</body>
</html>
`;
}
