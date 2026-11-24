/* LeadStrategus GTM Engineering Workshop: page interactions (no dependencies) */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const cfg = JSON.parse($("#site-config").textContent);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const escHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const store = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch (_) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (_) {} },
  };

  /* ---------- analytics (off unless IDs are set in content.js) ---------- */
  const A = cfg.analytics || {};
  const loadScript = (src) => { const s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); };
  if (A.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", A.ga4Id);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(A.ga4Id));
  }
  if (A.metaPixelId) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", A.metaPixelId);
    window.fbq("track", "PageView");
  }
  if (A.linkedinPartnerId) {
    window._linkedin_partner_id = A.linkedinPartnerId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(A.linkedinPartnerId);
    loadScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
  const track = (name, params = {}) => {
    try {
      if (window.gtag) window.gtag("event", name, params);
      if (window.fbq) window.fbq("trackCustom", name, params);
      if (window.lintrk) window.lintrk("track", params);
      window.dataLayer && window.dataLayer.push({ event: name, ...params });
    } catch (_) { /* never break the page for analytics */ }
  };

  /* ---------- UTM capture (shared by both forms) ---------- */
  const qs = new URLSearchParams(location.search);
  const utm = {};
  ["utm_source", "utm_medium", "utm_campaign"].forEach((k) => {
    let v = qs.get(k);
    if (v) store.set(k, v); else v = store.get(k);
    if (v) utm[k] = v.slice(0, 200);
  });


  /* ---------- header: shadow on scroll, mobile menu, scroll-spy ---------- */
  const header = $("#site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav-toggle");
  const setMenu = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("#site-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("nav-open")) { setMenu(false); toggle.focus(); } });

  const navLinks = new Map($$("#site-nav a").map((a) => [a.getAttribute("href").slice(1), a]));
  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      let best = null, ratio = 0;
      visible.forEach((r, id) => { if (r > ratio) { ratio = r; best = id; } });
      navLinks.forEach((a, id) => {
        const on = id === best;
        a.classList.toggle("active", on);
        on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] });
    navLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- sticky mobile Apply bar: hidden while another Apply button is on screen ---------- */
  const bar = $("#mobile-bar");
  if (bar && "IntersectionObserver" in window) {
    const hideFor = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? hideFor.add(e.target) : hideFor.delete(e.target)));
      bar.classList.toggle("hide", hideFor.size > 0);
    }, { threshold: 0.05 });
    [$("#apply"), $("#join"), $(".site-footer"), $(".hero .cta-row")].forEach((el) => el && io.observe(el));
  }

  /* ---------- modals (native <dialog>: focus-trapped, Esc closes) ---------- */
  let lastFocus = null;
  $$("[data-modal]").forEach((b) => b.addEventListener("click", () => {
    const d = document.getElementById("modal-" + b.dataset.modal);
    if (!d) return;
    lastFocus = b;
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    document.body.classList.add("modal-open");
    const x = $(".modal-x", d); x && x.focus();
  }));
  // Team cards: a click anywhere on the card opens the profile, except on its own links and buttons.
  $$("[data-open]").forEach((card) => card.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;
    const btn = $(`[data-modal="${card.dataset.open}"]`, card);
    if (btn) btn.click();
  }));
  $$("dialog.modal").forEach((d) => {
    d.addEventListener("close", () => { document.body.classList.remove("modal-open"); lastFocus && lastFocus.focus(); });
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
    $$("[data-close]", d).forEach((b) => b.addEventListener("click", () => d.close()));
  });

  /* ---------- hero: workshop room illustration (people, walk-in, output cards) ---------- */
  (() => {
const NS='http://www.w3.org/2000/svg',$=i=>document.getElementById(i);if(!$('rm'))return;
const OUT=["ICP approved","A-tier: 212 accounts","Signal: new CRO hired","Workflow live","Sequence approved","Reply rate 11.4%","Meeting booked","Deliverability 98%","CRM sync on","Buying committee mapped"];
const P=[{s:"#C58C5C",h:"#1F2937",c:"#0B1F4D",t:"short",a:"look",d:0},{s:"#E3B592",h:"#6B3A1E",c:"#E2E8F0",t:"long",a:"nod",d:-2},{s:"#8A5A3A",h:"#111827",c:"#475569",t:"short",a:"look",d:-6,lean:1},{s:"#EBC49F",h:"#57534E",c:"#1F2937",t:"bun",a:"look",d:-9},{s:"#B57B4E",h:"#111827",c:"#334155",t:"short",a:"nod",d:-7},{s:"#E3B592",h:"#292524",c:"#7F1D1D",t:"long",a:"look",d:-4},{s:"#8A5A3A",h:"#1F2937",c:"#475569",t:"short",a:"look",d:-11,hand:1},{s:"#C58C5C",h:"#3F2A1D",c:"#0B1F4D",t:"bun",a:"nod",d:-4,lean:1}];
function arm(p){return '<g class="rz"><rect x="25.5" y="-34" width="10" height="42" rx="5" fill="'+p.c+'"/><rect x="25.5" y="-38" width="10" height="5" fill="#F1F5F9"/><rect x="27" y="-41" width="7" height="2.8" fill="#0F172A"/>'+
'<rect x="25.7" y="-52" width="9.6" height="12" rx="3.2" fill="'+p.s+'"/>'+[25.7,28.2,30.7,33.2].map((x,i)=>'<rect x="'+x+'" y="'+(-63+[2,0,.6,3][i])+'" width="2.2" height="'+(13-[2,0,.6,3][i])+'" rx="1.1" fill="'+p.s+'"/>').join('')+
'<rect x="22.2" y="-51" width="3" height="8.5" rx="1.5" fill="'+p.s+'" transform="rotate(-24 23.7 -44)"/></g>'}
function body(p){
const hl='<path d="M-9 -42 Q0 -47 9 -42" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity=".14"/>';
const hair=p.t=="long"?'<path d="M-15 -30 C-15 -50 15 -50 15 -30 L17 -5 C8 0 -8 0 -17 -5Z" fill="'+p.h+'"/>'+hl:'<circle cx="-13" cy="-28" r="3" fill="'+p.s+'"/><circle cx="13" cy="-28" r="3" fill="'+p.s+'"/><ellipse cx="0" cy="-31" rx="13.2" ry="15" fill="'+p.h+'"/>'+hl+(p.t=="bun"?'<circle cx="0" cy="-48" r="6.5" fill="'+p.h+'"/>':'<path d="M-9 -18 Q0 -14 9 -18 L9 -21 L-9 -21Z" fill="'+p.s+'"/>');
return '<rect x="-32" y="-54" width="64" height="42" rx="3" fill="#07163A"/><rect x="-28" y="-50" width="56" height="34" rx="2" fill="#2563EB"/><rect x="-23" y="-44" width="14" height="3" rx="1.5" fill="#DBEAFE"/><rect x="14" y="-44" width="9" height="3" rx="1.5" fill="#E11D2E"/>'+
'<g class="'+(p.lean?'lean':'')+'" style="animation-delay:'+p.d+'s">'+(p.hand?arm(p):'')+'<rect x="-5" y="-21" width="10" height="13" fill="'+p.s+'"/>'+
'<path d="M-37 74 L-37 14 C-37 -2 -22 -8 -8 -11 L8 -11 C22 -8 37 -2 37 14 L37 74Z" fill="'+p.c+'"/>'+
'<path d="M0 -11 L8 -11 C22 -8 37 -2 37 14 L37 74 L0 74Z" fill="#000000" opacity=".1"/>'+
'<path d="M-9 -11 Q0 -5 9 -11 L8 -13 Q0 -8 -8 -13Z" fill="#FFFFFF" opacity=".35"/><line x1="0" y1="-5" x2="0" y2="74" stroke="#000000" opacity=".12"/>'+
'<g class="hd '+p.a+'" style="animation-delay:'+p.d+'s">'+hair+'</g></g>'+
'<rect x="-31" y="24" width="62" height="52" rx="13" fill="#111827" opacity=".93"/><rect x="-22" y="34" width="44" height="3" rx="1.5" fill="#374151"/><rect x="-22" y="42" width="44" height="3" rx="1.5" fill="#374151"/><rect x="-22" y="50" width="44" height="3" rx="1.5" fill="#374151"/>'}
const seats=[];let oi=0,last=-1;
function add(par,x,y,sc,p){const g=document.createElementNS(NS,'g');g.setAttribute('class','seat');g.setAttribute('transform','translate('+x+','+y+') scale('+sc+')');g.innerHTML=body(p);
par.appendChild(g);const s={e:g,x,y:y-66*sc};seats.push(s);
g.addEventListener('mouseenter',()=>{if(g.style.opacity!=='0')card(s,OUT[oi++%OUT.length])})}
[170,270,370,470].forEach((x,i)=>add($('far'),x,296,.72,P[i]));
[130,250,370,490].forEach((x,i)=>add($('near'),x,372,1,P[i+4]));
const me=seats[0];
function card(s,txt){const w=txt.length*6.2+30,x=s.x-w/2,g=document.createElementNS(NS,'g');g.setAttribute('class','rise');const red=/approved|booked|live|seat/.test(txt);
g.innerHTML='<rect x="'+(x+1)+'" y="'+(s.y-23)+'" width="'+w+'" height="26" rx="13" fill="#0B1F4D" opacity=".08"/><rect x="'+x+'" y="'+(s.y-26)+'" width="'+w+'" height="26" rx="13" fill="#FFFFFF" stroke="#D5DDEA"/><circle cx="'+(x+13)+'" cy="'+(s.y-13)+'" r="4" fill="'+(red?'#E11D2E':'#2563EB')+'"/><text x="'+(x+23)+'" y="'+(s.y-9)+'" font-size="11" fill="#0B1F4D">'+txt+'</text>';
$('cards').appendChild(g);setTimeout(()=>g.remove(),4700)}
function emit(){const pool=seats.map((s,i)=>i).filter(i=>i!==last&&i!==6&&seats[i].e.style.opacity!=='0');const i=pool[Math.floor(Math.random()*pool.length)];last=i;card(seats[i],OUT[oi++%OUT.length])}
const anim=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(anim){setInterval(()=>{if(!document.hidden)emit()},2400);setTimeout(emit,700);}
const wk=$('wk'),X0=-50,X1=112,HY=257,STEP=58,SPD=82;
function pose(f,a){const s=Math.sin(f),c=Math.cos(f);
$('tA').setAttribute('transform','rotate('+(-25*s*a)+')');$('sA').setAttribute('transform','translate(0,36) rotate('+((4+40*Math.max(0,c))*a)+')');
$('tB').setAttribute('transform','rotate('+(25*s*a)+')');$('sB').setAttribute('transform','translate(0,36) rotate('+((4+40*Math.max(0,-c))*a)+')');
$('aA').setAttribute('transform','translate(1,-49) rotate('+(22*s*a)+')');$('eA').setAttribute('transform','translate(0,24) rotate('+(-(8+16*Math.max(0,-s))*a-4)+')');
$('aB').setAttribute('transform','translate(1,-49) rotate('+(-22*s*a)+')');$('eB').setAttribute('transform','translate(0,24) rotate('+(-(8+16*Math.max(0,s))*a-4)+')');
$('wb').setAttribute('transform','translate(0,'+(-1.8*Math.cos(2*f)*a)+') rotate('+(2*a)+')')}
const ez=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function enter(){me.e.style.opacity='0';let x=X0,prev=null,stopT=null;wk.style.opacity='1';
function fr(t){const dt=prev?Math.min(40,t-prev):16;prev=t;
if(x<X1){const rem=X1-x;x=Math.min(X1,x+SPD*Math.min(1,.25+rem/40)*dt/1000);pose((x-X0)/STEP*Math.PI,Math.min(1,rem/26));wk.setAttribute('transform','translate('+x+','+HY+')');requestAnimationFrame(fr)}
else{if(!stopT){stopT=t;pose(0,0)}const k=(t-stopT-450)/1100;
if(k<0){requestAnimationFrame(fr);return}
const e=ez(Math.min(1,k));if(k>.25)me.e.style.opacity='1';
wk.setAttribute('transform','translate('+(X1+(170-X1)*e)+','+(HY+26*e)+') scale('+(1-.22*e)+')');wk.style.opacity=String(1-e);
if(k<1)requestAnimationFrame(fr);else setTimeout(()=>card(me,'Your seat · Cohort 1'),300)}}
requestAnimationFrame(fr)}
if(anim){me.e.style.opacity='0';setTimeout(enter,900);setInterval(()=>{if(!document.hidden)enter()},30000);}
})();

  /* ---------- 3D scenes: start animating when they scroll into view ---------- */
  const scenes = $$(".anim-target, .anim-stones");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting)), { threshold: 0.35 });
    scenes.forEach((el) => so.observe(el));
  } else scenes.forEach((el) => el.classList.add("in-view"));

  /* ---------- review slider: centred card, endless loop both ways, dots, swipe, autoplay ---------- */
  $$("[data-slider]").forEach((root) => {
    const view = $(".slider-view", root), track = $(".slider-track", root);
    const slides = $$(".slide", root), dots = $$(".dot", root);
    const n = dots.length; // slides holds 3 copies: [clones][real][clones]
    let idx = n, timer = null, hover = false, visible = false;
    const place = (animate = true) => {
      const s = slides[idx];
      track.style.transition = animate ? "" : "none";
      slides.forEach((el) => (el.style.transition = animate ? "" : "none"));
      track.style.transform = `translateX(${view.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2)}px)`;
      if (!animate) { void track.offsetWidth; track.style.transition = ""; slides.forEach((el) => (el.style.transition = "")); }
    };
    const mark = () => {
      slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));
      const real = ((idx % n) + n) % n;
      dots.forEach((d, k) => { d.classList.toggle("on", k === real); k === real ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current"); });
    };
    const go = (i, animate = true) => { idx = i; mark(); place(animate && !reduceMotion); if (reduceMotion) settle(); };
    // after a move into the clones, jump silently to the same review in the middle copy
    const settle = () => {
      if (idx < n || idx >= 2 * n) { idx = n + (((idx % n) + n) % n); mark(); place(false); }
    };
    track.addEventListener("transitionend", (e) => { if (e.target === track) settle(); });
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { stop(); if (!reduceMotion && visible && !hover) timer = setInterval(() => go(idx + 1), 6000); };
    $$(".car-btn", root).forEach((b) => b.addEventListener("click", () => { go(idx + +b.dataset.dir); start(); }));
    dots.forEach((d) => d.addEventListener("click", () => { go(n + +d.dataset.i); start(); }));
    slides.forEach((s, k) => s.addEventListener("click", () => { if (k !== idx) { go(k); start(); } }));
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); start(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); start(); }
    });
    let x0 = null;
    view.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    view.addEventListener("pointerup", (e) => { if (x0 != null && Math.abs(e.clientX - x0) > 40) { go(idx + (e.clientX < x0 ? 1 : -1)); start(); } x0 = null; });
    root.addEventListener("mouseenter", () => { hover = true; stop(); });
    root.addEventListener("mouseleave", () => { hover = false; start(); });
    root.addEventListener("focusin", () => { hover = true; stop(); });
    root.addEventListener("focusout", () => { hover = false; start(); });
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0.3 }).observe(root);
    window.addEventListener("resize", () => place(false));
    go(n, false);
  });

  /* ---------- shared POST helper ---------- */
  const postJSON = async (url, payload) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
    } finally { clearTimeout(timer); }
  };
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  /* ---------- lead magnet: checklist email capture ---------- */
  const clOpen = $("#cl-open"), clForm = $("#cl-form"), clDone = $("#cl-done");
  if (clOpen && clForm) {
    const clEmail = $("#cl-email"), clErr = $("#cl-err");
    const finish = () => {
      clForm.hidden = true;
      clOpen.hidden = true;
      clDone.hidden = false;
      clDone.innerHTML = cfg.checklistPdfUrl
        ? `Thanks. <a href="${escHtml(cfg.checklistPdfUrl)}" target="_blank" rel="noopener">Download the checklist (PDF)</a>`
        : "Thanks. We'll email the checklist to you shortly.";
      track("checklist_submit");
    };
    clOpen.addEventListener("click", () => {
      if (!cfg.checklistEndpoint && cfg.checklistPdfUrl) { finish(); return; } // nothing to capture: give the PDF
      clForm.hidden = false;
      clOpen.setAttribute("aria-expanded", "true");
      clOpen.hidden = true;
      clEmail.focus();
    });
    clForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!emailOk(clEmail.value)) { clErr.textContent = "Please enter a valid work email."; clEmail.setAttribute("aria-invalid", "true"); clEmail.focus(); return; }
      clErr.textContent = ""; clEmail.setAttribute("aria-invalid", "false");
      const btn = $("button[type=submit]", clForm); btn.disabled = true;
      try {
        if (cfg.checklistEndpoint) await postJSON(cfg.checklistEndpoint, { email: clEmail.value.trim(), source: "checklist", page_url: location.href.split("#")[0], ...utm, submitted_at: new Date().toISOString() });
        finish();
      } catch (_) {
        clErr.innerHTML = `Couldn't send that. Please try again, or email <a href="mailto:${escHtml(cfg.email)}">${escHtml(cfg.email)}</a>.`;
      } finally { btn.disabled = false; }
    });
  }

  /* ---------- application form ---------- */
  const form = $("#apply-form");
  if (!form) return;
  const status = $("#form-status");
  const submitBtn = $("#submit-btn");
  const sell = $("#f-sell");
  const counter = $("#sell-count");

  Object.entries(utm).forEach(([k, v]) => (form.elements[k].value = v));
  form.elements.page_url.value = location.href.split("#")[0];

  // "Coming as": pre-selected from the pricing cards or ?type=
  const typeMap = { individual: "individual", team: "team", cohort: "team", private: "private" };
  const setType = (t) => {
    const v = typeMap[t];
    if (!v) return;
    if (v === "private") $(".seg-private").hidden = false;
    const r = form.querySelector(`input[name="coming_as"][value="${v}"]`);
    if (r) r.checked = true;
  };
  if (qs.get("type")) setType(qs.get("type").toLowerCase());
  $$("[data-apply-type]").forEach((a) => a.addEventListener("click", () => setType(a.dataset.applyType)));

  const updateCount = () => (counter.textContent = `${sell.value.length} / 600`);
  sell.addEventListener("input", updateCount);
  updateCount();

  const rules = {
    full_name: { el: "#f-name", err: "#e-name", test: (v) => v.trim().length >= 2, msg: "Please enter your full name." },
    work_email: { el: "#f-email", err: "#e-email", test: emailOk, msg: "Please enter a valid work email." },
    company: { el: "#f-company", err: "#e-company", test: (v) => v.trim().length >= 2, msg: "Please enter your company and website." },
    what_you_sell: { el: "#f-sell", err: "#e-sell", test: (v) => v.trim().length >= 10 && v.length <= 600, msg: "Tell us a little more: what you sell, and to whom (10–600 characters)." },
  };
  const checks = {
    can_attend: { err: "#e-attend", msg: "The workshop is in person, so we need you there all 5 days." },
    consent: { err: "#e-consent", msg: "Please agree so we can contact you about your application." },
  };
  const setErr = (errSel, el, msg) => { $(errSel).textContent = msg || ""; el.setAttribute("aria-invalid", msg ? "true" : "false"); };
  function validateField(name) {
    if (rules[name]) {
      const r = rules[name], el = $(r.el), ok = r.test(el.value);
      setErr(r.err, el, ok ? "" : r.msg);
      return ok ? null : el;
    }
    const el = form.elements[name], ok = el.checked;
    setErr(checks[name].err, el, ok ? "" : checks[name].msg);
    return ok ? null : el;
  }
  Object.keys(rules).forEach((n) => {
    const el = $(rules[n].el);
    el.addEventListener("blur", () => { if (el.value || el.getAttribute("aria-invalid") === "true") validateField(n); });
    el.addEventListener("input", () => { if (el.getAttribute("aria-invalid") === "true") validateField(n); });
  });
  Object.keys(checks).forEach((n) => form.elements[n].addEventListener("change", () => validateField(n)));

  const showStatus = (html) => { status.innerHTML = html; status.hidden = !html; };

  const collect = () => {
    const fd = new FormData(form);
    const data = {};
    fd.forEach((v, k) => { if (k !== "company_url_confirm" && k !== "form-name") data[k] = typeof v === "string" ? v.trim() : v; });
    data.can_attend = !!form.elements.can_attend.checked;
    data.consent = !!form.elements.consent.checked;
    data.submitted_at = new Date().toISOString();
    data.source = "gtm-workshop-landing";
    return data;
  };

  const send = async (data) => {
    const f = cfg.form || {};
    const provider = (f.provider || "").toLowerCase();
    if (provider === "netlify") {
      const body = new URLSearchParams({ "form-name": "workshop-apply", ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) });
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return;
    }
    if (provider && f.endpoint) {
      const payload = { ...(f.extraFields || {}), ...data };
      if (provider === "web3forms") payload.subject = payload.subject || "New GTM Workshop application";
      await postJSON(f.endpoint, payload);
      return;
    }
    // No backend configured yet: hand the application to the applicant's email app.
    const lines = Object.entries(data).map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`).join("\n");
    location.href = `mailto:${cfg.email}?subject=${encodeURIComponent("GTM Workshop application: " + data.full_name)}&body=${encodeURIComponent(lines)}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showStatus("");
    if (form.elements.company_url_confirm.value) return; // honeypot: silently drop bots

    let firstBad = null;
    ["full_name", "work_email", "company", "what_you_sell", "can_attend", "consent"].forEach((n) => { const bad = validateField(n); if (bad && !firstBad) firstBad = bad; });
    if (firstBad) { showStatus("Please fix the highlighted fields and try again."); firstBad.focus(); return; }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    const lbl = $(".lbl", submitBtn), orig = lbl.textContent;
    lbl.textContent = "Submitting…";
    try {
      const data = collect();
      await send(data);
      track("apply_submit", { coming_as: data.coming_as, role: data.role });
      form.hidden = true;
      const thanks = $("#thanks");
      thanks.hidden = false;
      thanks.focus();
      thanks.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    } catch (err) {
      showStatus(`Sorry, your application didn't go through. Please try again, or <a href="mailto:${escHtml(cfg.email)}">email us at ${escHtml(cfg.email)}</a>${cfg.whatsapp ? ` or <a href="${escHtml(cfg.whatsapp)}" target="_blank" rel="noopener">message us on WhatsApp</a>` : ""}.`);
      status.setAttribute("tabindex", "-1");
      status.focus();
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
      lbl.textContent = orig;
    }
  });
})();
