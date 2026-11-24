/**
 * ============================================================================
 *  LeadStrategus GTM Engineering Workshop: SITE CONTENT & SETTINGS
 * ============================================================================
 *  Edit this one file to change dates, seats, prices, links, faculty, FAQ,
 *  testimonials and the form endpoints. Then rebuild:
 *
 *      node build.mjs        (Netlify / Vercel run this for you on deploy)
 *
 *  - Text is plain text unless the field name ends in "Html".
 *  - "" (empty) or null hides the thing it controls, where noted.
 *  - Lines marked TODO still need a confirmed value from LeadStrategus.
 *  - CLAIMS RULE: never add copy that promises leads, meetings, revenue,
 *    pipeline, jobs/placement, vendor certification, autonomous outbound or
 *    production deployment in 5 days. LinkedIn is always human-led.
 * ============================================================================
 */

export default {
  // ---------------------------------------------------------------------------
  // 1. SETTINGS: the placeholders from the reference copy live here
  // ---------------------------------------------------------------------------
  settings: {
    dates: "Dates TBC", // TODO [DATES], e.g. "8–12 Feb 2027"
    startDate: "", // ISO date for search engines, e.g. "2027-02-08". Empty = left out of JSON-LD.
    endDate: "", //   e.g. "2027-02-12"
    seatsLeft: null, // TODO [X] e.g. 7 → "7 OF 12 SEATS LEFT". null = that part is hidden.
    totalSeats: 12,
    applicationsCloseDate: "", // TODO [date] e.g. "30 Jan 2027". Empty = sentence left out.
    priceIndividual: "₹70,000", // TODO [₹ price] confirm Cohort 1 introductory price (carried over from the earlier pricing)
    priceTeam: "₹60,000", //       TODO [₹ price] per person for a team of 3+ (carried over)
    teamDiscountPct: 14, //        TODO [X]% saving per seat for teams
    fitCallUrl: "", // TODO booking link for the 15-min fit call (Calendly etc.). Empty = opens an email to contactEmail.
    clutchUrl: "https://clutch.co/profile/leadstrategus",
    checklistEndpoint: "", // where the checklist email-capture POSTs JSON {email}. Empty = no capture, link shown straight away.
    checklistPdfUrl: "", // TODO URL of the "8 questions" PDF. Empty = "we'll email it to you".
    showClientLogos: true, // "Trusted by" strip, same logos as leadstrategus.com
    showTestimonials: true, // Clutch reviews, as published on leadstrategus.ai
    contactEmail: "kingshuk@leadstrategus.com", // same contact address as leadstrategus.com
    address: "Bizzhub, Brigade Tech Park, near ITPL Main Road, Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066",
    whatsapp: "", // digits incl. country code, e.g. "9198xxxxxxxx". Empty = hidden.
    whatsappMessage: "Hi LeadStrategus, I have a question about the GTM Engineering Workshop.",
    linkedin: "https://www.linkedin.com/company/leadstrategus/",
    instagram: "https://www.instagram.com/leadstrategus/",
    clutchRating: "5.0",
    city: "Bengaluru",
    responseHours: 48,
  },

  site: {
    url: "https://leadstrategus.ai/gtm-workshop", // Served as a page of leadstrategus.ai (used for canonical, OG and JSON-LD)
    name: "GTM Engineering Workshop",
    title: "GTM Engineering Workshop, Bengaluru | LeadStrategus",
    description:
      "5-day in-person GTM engineering workshop in Bengaluru + 4 weeks of guided implementation. Design, build and test your own outbound engine: ICP, signals, scoring, messaging and measurement. 12 seats.",
    ogImage: "/img/og-image.png",
  },

  // ---------------------------------------------------------------------------
  // 2. APPLICATION FORM BACKEND
  // ---------------------------------------------------------------------------
  form: {
    // "n8n" | "formspree" | "web3forms" | "netlify" | "" (no backend: opens the
    // applicant's email app with the application filled in)
    provider: "",
    endpoint: "",
    extraFields: {},
  },

  analytics: { ga4Id: "", metaPixelId: "", linkedinPartnerId: "" }, // all off until set

  // ---------------------------------------------------------------------------
  // 3. PAGE COPY (from the GTM Workshop look-and-feel snapshot)
  // ---------------------------------------------------------------------------
  hero: {
    h1Before: "Outbound, ",
    h1Gradient: "engineered.",
    sub: "Beyond the AI hype. Design, build and test a complete outbound prospecting engine for your own business: target logic, signals, scoring, messaging and measurement. Taught by operators who ran marketing at AWS, Gartner and SAP.",
    buildLog: [
      { when: "DAY 1", text: "ICP + segments chosen", gate: "gate 1" },
      { when: "DAY 2", text: "Signal model set; accounts ranked A/B/C", gate: "gate 2" },
      { when: "DAY 3", text: "Contacts verified; n8n workflow running" },
      { when: "DAY 4", text: "Sequences approved", gate: "gate 3" },
      { when: "DAY 5", text: "QA, deliverability, demo day" },
      { when: "WK 1–4", text: "First sends · replies · refine · 90-day plan" },
    ],
    steps: ["Define the market", "Score on buying signals", "Launch, measure, improve"],
  },

  // "Trusted by" strip (logos as shown on leadstrategus.com). h = display height in px, tuned for equal visual weight.
  clients: [
    { name: "EY", logo: "ey", h: 40, ratio: 0.975 },
    { name: "Stibo Systems", logo: "stibo", h: 30, ratio: 7.6 },
    { name: "Alibaba Cloud", logo: "alibaba-cloud", h: 28, ratio: 7.8 },
    { name: "Dover", logo: "dover", h: 36, ratio: 2.925 },
    { name: "Indus Net Technologies", logo: "int", h: 42, ratio: 1.0 },
    { name: "Speridian Technologies", logo: "speridian", h: 36, ratio: 4.075 },
    { name: "SOAIS", logo: "soais", h: 24, ratio: 5.85 },
    { name: "AskMeIdentity", logo: "askmeidentity", h: 32, ratio: 5.675 },
    { name: "Schrocken", logo: "schrocken", h: 42, ratio: 1.05 },
    { name: "Retigence", logo: "retigence", h: 32, ratio: 3.525 },
  ],

  why: {
    h2: "Same tools. Different system.",
    intro: "AI made outbound easier to assemble, not easier to win. When everyone uses the same models, data and prompts, outbound converges. Three things decide who books the meeting.",
    cols: [
      { icon: "target", title: "A sharper view of who buys, and why now.", text: "Signals that predict a purchase in your market, not just signals that are interesting." },
      { icon: "shield-check", title: "Human judgement at three gates.", text: "AI does research, data and drafting. You decide segments, buying criteria and every message." },
      { icon: "refresh-cw", title: "A loop that learns.", text: "Replies and meetings feed back into targeting, scoring and messaging every cycle." },
    ],
  },

  whyJoin: {
    h2: "Why join.",
    intro: "Five days in a room, four weeks of guided practice, and a system you keep running after we leave.",
    cards: [
      { icon: "rocket", title: "Leave with your own engine", text: "You build on your real ICP, accounts and offer, so you leave with a documented, tested outbound system, not notes from a demo." },
      { icon: "workflow", title: "Learn the system, not one tool", text: "Choose tools by the job they do. When a tool changes or gets expensive, you swap it without rebuilding everything." },
      { icon: "user-check", title: "Keep humans where it counts", text: "AI handles research, data and drafts. You learn exactly where your judgement goes: segments, buying criteria and every message." },
      { icon: "briefcase", title: "Taught by working operators", text: "Frameworks come from campaigns we run for clients every week, with people who led marketing at AWS, Gartner and SAP." },
      { icon: "calendar-check", title: "Four weeks of guided practice", text: "Two live sessions a week while you run real sends, read the replies and tune targeting, scoring and messaging." },
      { icon: "users", title: "A small room of 12", text: "Every participant gets review time on their own engine, and you learn from peers solving the same problem in other markets." },
    ],
  },

  sponsor: {
    h2: "Get your boss to sponsor you.",
    intro: "Most participants are funded by their company. Here is what to tell your manager, and a note you can send today.",
    points: [
      { icon: "target", title: "Built on the company's market", text: "The engine is designed around your ICP, accounts and offer, so the work is useful on day one back at the desk." },
      { icon: "file-text", title: "Assets the company keeps", text: "A scored account list, signal tracking, messaging, a measurement plan and a 90-day plan to run it." },
      { icon: "receipt", title: "Easy to pay for", text: "GST invoice, payment by Razorpay link or bank transfer against a PO. Registered businesses may be able to claim GST credit." },
      { icon: "users", title: "Cheaper as a team", text: "Teams of 3 or more save {teamDiscountPct}% per seat and share one workspace, so the whole function learns the same system." },
    ],
    emailLabel: "A note to send your manager",
    email: [
      "Subject: Request to attend the GTM Engineering Workshop",
      "",
      "Hi [Manager's name],",
      "",
      "I'd like to attend LeadStrategus's GTM Engineering Workshop in Bengaluru: 5 days in person, then 4 weeks of guided implementation.",
      "",
      "During the workshop I'd build our own outbound engine on our real ICP, accounts and offer. We would come away with a scored target account list, signal tracking, tested messaging, a measurement plan and a 90-day plan to run it.",
      "",
      "The fee is {priceIndividual} + GST per seat, with a GST invoice and payment against a PO. Teams of 3 or more save {teamDiscountPct}% per seat.",
      "",
      "Could we discuss this week?",
      "",
      "Thanks,",
      "[Your name]",
    ],
  },

  programme: {
    h2: "8 stages. 3 human gates. One engine.",
    intro: "This isn't a course. It's a build. About 30% principles, 70% building on your own business. You leave with a working, documented engine and a plan to run it.",
    stages: [
      { n: "01", stage: "Client discovery", build: "Questionnaire, interviews, Claude to organise", leave: "Business brief: what you sell, who buys, why, what success looks like", control: "ai" },
      { n: "02", stage: "ICP and segments", build: "Claude proposes 6–8 segments; you pick 2–3", leave: "ICP, buying committee, disqualifiers; 2–3 segments chosen from 6–8", control: "human" },
      { n: "03", stage: "Signal-led account scoring", build: "Claude research agents, Apollo, n8n", leave: "Your buying-intent criteria and a ranked account list", control: "human" },
      { n: "04", stage: "Contact discovery", build: "Apollo, Claude agents, verification", leave: "Verified decision-makers in priority accounts", control: "ai" },
      { n: "05", stage: "Prioritisation and campaign plan", build: "Scoring model, tiers A / B / C", leave: "Tiers A / B / C, waves, channels, cadence", control: "ai" },
      { n: "06", stage: "Messaging architecture", build: "Frameworks from our campaign data; you approve", leave: "Connect → engage → explore → convert sequences", control: "human" },
      { n: "07", stage: "Launch", build: "Instantly, human-led LinkedIn, HubSpot", leave: "Email and human-led LinkedIn, tracked in your CRM", control: "ai" },
      { n: "08", stage: "Review and improve", build: "HubSpot, n8n logs, weekly review", leave: "Weekly review; results feed targeting and messages", control: "ai" },
    ],
    note: "Prefer full automation? You can switch the gates off. We'll show you what that costs in quality.",
  },

  days: {
    h2: "5 days to build. 1 month to implement.",
    summary: [
      { tag: "IN PERSON · BENGALURU", big: "5", unit: "days", text: "Principles in the morning. Building on your own business in the afternoon. Demo day on Friday." },
      { tag: "ONLINE · 2 × 1 HR A WEEK", big: "4", unit: "weeks", text: "First sends, replies, refinement and a 90-day plan, with our team reviewing your engine." },
    ],
    subhead: "The 5 days. Something built every day.",
    list: [
      { label: "DAY 1 · STAGES 1–2", title: "Foundations and discovery", text: "Brief, ICP, chosen segments, signal thesis, success metrics" },
      { label: "DAY 2 · STAGE 3", title: "Signals and account scoring", text: "Your scoring model and a ranked account list" },
      { label: "DAY 3 · STAGES 4–5", title: "Contacts and orchestration", text: "Contact database, tiers, campaign plan, n8n workflow running" },
      { label: "DAY 4 · STAGE 6", title: "Messaging and AI agents", text: "Approved message library; Clay and Claude Code demo" },
      { label: "DAY 5 · STAGES 7–8", title: "Launch readiness and demo day", text: "Deliverability, QA, dashboard, live demo to the cohort" },
    ],
  },

  who: {
    h2: "For serious practitioners who own pipeline.",
    cards: [
      { icon: "rocket", title: "Founders who sell B2B", text: "Need a repeatable way to create first meetings." },
      { icon: "user-round", title: "GTM engineers and other GTM hires", text: "Know the tools; want the judgement behind them." },
      { icon: "briefcase", title: "Sales, demand-gen and RevOps leads", text: "Building or fixing an outbound motion." },
      { icon: "users", title: "Teams of 3+", text: "Best results. Save {teamDiscountPct}% per seat.", link: "#pricing" },
    ],
    note: "Not a tool certification. Not a placement programme.",
  },

  proof: {
    badge: "5-star rated on Clutch",
    h2: "Here's what our customers say about us",
    // Clutch reviews, shown as the quote with a light "Role, Company" line under it.
    testimonials: [
      { quote: "LeadStrategus's commitment to in-depth understanding exceeded initial project goals.", role: "CEO", company: "Indus Net Technologies Limited" },
      { quote: "They were flexible enough to make any last-minute changes.", role: "Head of Strategic Initiatives", company: "Stibo Systems" },
      { quote: "I liked the deep interest with which they worked on different aspects.", role: "Founder & CEO", company: "Retigence" },
      { quote: "Their expertise in digging out information through secondary research at every stage was very impressive.", role: "Director", company: "Ernst & Young" },
      { quote: "LeadStrategus’ ABM model is extremely well-researched.", role: "Head of Marketing", company: "Speridian" },
      { quote: "They delivered on time and were dedicated to their work.", role: "Director of Technology", company: "AskMeIdentity" },
      { quote: "We had a good time working with LeadStrategus across multiple instances.", role: "Former VP", company: "SOA IT Solutions" },
    ],
  },

  faculty: {
    h2: "An operating firm that trains.",
    sub: "Everything we teach, we run for clients every week.",
    // "long" paragraphs appear in the "More about" profile window.
    people: [
      {
        name: "Kingshuk Hazra", role: "Founder", photo: "kingshuk-hazra",
        bio: "Former Head of Marketing, Amazon Web Services India. Two decades across marketing, business-development analytics and advisory at SAP, Oracle, IBM, Gartner, Pluralsight and IMRB.",
        long: [
          "Kingshuk founded LeadStrategus in 2018 after leading marketing for Amazon Web Services in India and, before that, holding progressively senior roles across marketing, BD analytics and advisory at SAP, Oracle Consulting, IBM, Gartner, Pluralsight (Director, Enterprise Marketing) and IMRB.",
          "A statistics graduate with an MBA from the Indian Institute of Foreign Trade, Kingshuk is the reason every LeadStrategus engagement starts with the numbers and ends with a forecast someone is prepared to defend.",
          "Kingshuk writes and speaks on demand generation, intent data and the practical use of AI agents in B2B go-to-market, and still personally runs the diagnostic phase of most GTM strategy engagements.",
        ],
        linkedin: "https://www.linkedin.com/in/kingshuk/", email: "kingshuk@leadstrategus.com",
      },
      {
        name: "Anindita Hazra", role: "Co-founder", photo: "anindita-hazra",
        bio: "Co-founder of LeadStrategus. Leads client delivery across demand generation and sales enablement.",
        long: [
          "Anindita co-founded LeadStrategus and leads client delivery: the pods, the programmes and the weekly pipeline reviews that keep the firm accountable for meetings rather than activity.",
          "Anindita's background spans marketing operations, content and programme management for technology companies.",
        ],
        linkedin: "https://www.linkedin.com/in/aninditahazra/", email: "anindita@leadstrategus.com",
      },
      {
        name: "Komala Maran", role: "Head Go-To-Market & Growth", photo: "komala-maran",
        bio: "Leads Go-To-Market and Market Intelligence at LeadStrategus. Built the firm’s Market Insights and Open Source Intelligence practice. An IT engineer from IIIT Allahabad.",
        long: [
          "Komala joined LeadStrategus in 2019 and has grown with the firm from Smarketing consultant to Manager of its Market Insights and Open Source Intelligence practice, and now to Head of Go-To-Market. She runs the intelligence engine behind client engagements: the market selection, opportunity assessment, ICP development and account prioritisation that decide who a client should go after, and when. Her work spans international market entry, buyer and competitive intelligence, and intelligence-led demand generation for B2B and technology companies.",
          "An engineer by training, Komala is the reason a LeadStrategus target list comes with a why attached to every account: what changed at that company, why now, and how to start the conversation.",
          "She leads the firm’s use of generative AI and AI agents across research and GTM workflows, and runs LeadStrategus masterclasses on using open-source intelligence to find and research prospects. Outside work, she founded Project Yaadhum and mentors students through the Ministry of Education’s Vidyanjali programme.",
        ],
        linkedin: "https://www.linkedin.com/in/komalamaran/", email: "komala.m@leadstrategus.com",
      },
      {
        name: "Kirubakaran Periyaswamy", role: "Technical Lead", photo: "kirubakaran-periyaswamy", // TODO confirm the role title
        bio: "Builds the agents that run the platform, from data pipelines scraping 10+ signal sources to LLMs fine-tuned for context-grounded message generation.",
        long: [
          "Kiruba builds the agents that run the platform, from data pipelines scraping 10+ signal sources to LLMs fine-tuned for context-grounded message generation. His work covers the full AI lifecycle: data engineering, model training, RAG pipelines, and production deployment using LangGraph, PyTorch, HuggingFace, and FastAPI. At LeadStrategus, he has automated internal workflows, built NLP pipelines, and integrated OpenAI and Anthropic Claude APIs into live systems.",
        ],
        linkedin: "https://www.linkedin.com/in/kirubakaranperiyasamy/", email: "kirubakaran.p@leadstrategus.com",
      },
    ],
  },

  footer: {
    sites: [
      { name: "LeadStrategus.ai", url: "https://leadstrategus.ai/", text: "AI revenue agents for B2B pipeline automation." },
      { name: "LeadStrategus.com", url: "https://www.leadstrategus.com/", text: "B2B GTM strategy, demand generation and AI agents." },
      { name: "ExpoToFunnel", url: "https://expotofunnel.com/", text: "Trade shows ranked by how many of your ideal buyers attend, then meetings booked for you." },
    ],
  },

  checklist: {
    tag: "FREE · PDF",
    title: "8 questions to answer before you deploy an outbound engine.",
    cta: "Get the checklist →",
  },

  pricing: {
    h2: "12 seats. Introductory pricing.",
    sub: "First cohort only. Price rises after Cohort 1.",
  },

  apply: {
    h2: "Tell us what you sell. We'll call within 48 hours.",
    sub: "Two minutes. We check fit before anyone pays.",
    trust: ["NO PAYMENT TO APPLY", "GST INVOICE"],
    roles: ["Founder", "Sales or demand-gen lead", "RevOps", "First GTM hire", "Other"],
    success: "Application received. We'll call you within 48 hours to check fit.",
  },

  faq: [
    { q: "How is this different from a Clay or n8n course?", a: "Those teach a tool. We teach you to design a system and choose tools by job, with frameworks from our own client campaigns." },
    { q: "Do I need to code?", a: "No. You'll work with no-code and low-code tools; we show basic expressions where useful. Comfort with spreadsheets and browser tools is enough." },
    { q: "Will my engine be production-ready after 5 days?", a: "You'll leave with a working, documented and tested engine. The 4-week implementation is where you run real sends and refine it; hardening it for full production use in your company is separate work." },
    { q: "Do you guarantee meetings or a job?", a: "No. Results depend on your offer, market, data and execution. This is not a placement programme. We teach you to build and run the system that creates meetings." },
    { q: "Can my employer pay?", a: "Yes. We issue a GST invoice and accept payment by Razorpay link or bank transfer against a PO. Registered businesses may be able to claim GST credit; please check with your CA." },
  ],

  finalCta: {
    h2: "12 seats. One engine that's yours.",
    sub: "We read every one and call you within 48 hours to check fit.",
  },

  // ---------------------------------------------------------------------------
  // 4. LEGAL (placeholder text: replace with the approved versions)
  // ---------------------------------------------------------------------------
  legal: {
    privacyHtml: `
      <p><strong>Placeholder. Replace with the approved LeadStrategus Privacy Notice before launch.</strong></p>
      <p>When you apply, we collect the details you enter in the form (name, work email, company and website, role, what you sell, how you're coming) plus the campaign tags in the page link (UTM parameters). If you request the checklist, we collect your email address.</p>
      <p>We use these details only to review your application, contact you about this workshop and send you what you asked for. We do not sell your data.</p>
      <p>Your data is stored in our CRM and internal tools with access limited to the programme team. To access, correct or delete it, write to the contact email on this page.</p>`,
    termsHtml: `
      <p><strong>Placeholder. Replace with the approved Terms, Cancellation, Refund and Substitution policy before launch.</strong></p>
      <p>There is no payment to apply. A seat is confirmed after a fit call, written confirmation from LeadStrategus and receipt of payment (Razorpay link, or bank transfer against a purchase order). A GST invoice is provided.</p>
      <p>The workshop builds practical capability. It does not guarantee leads, meetings, pipeline, revenue, jobs or placement, and it is not a tool or vendor certification.</p>
      <p>Travel and accommodation are not included.</p>`,
  },
};
