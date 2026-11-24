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
    seatsLeft: null, // Seat counts are not shown on the site. Keep null.
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
    contactEmail: "mail@leadstrategus.com", // same contact address as leadstrategus.com
    address: "Bizzhub, Brigade Tech Park, near ITPL Main Road, Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066",
    whatsapp: "", // digits incl. country code, e.g. "9198xxxxxxxx". Empty = hidden.
    whatsappMessage: "Hi LeadStrategus, I have a question about the GTM Engineering Workshop.",
    linkedin: "https://www.linkedin.com/company/leadstrategus/",
    instagram: "https://www.instagram.com/leadstrategus/",
    clutchRating: "5.0",
    city: "Bengaluru",
    responseHours: 1,
  },

  site: {
    url: "https://leadstrategus.ai/gtm-workshop", // Served as a page of leadstrategus.ai (used for canonical, OG and JSON-LD)
    name: "GTM Engineering Workshop",
    title: "GTM Engineering Workshop, Bengaluru | LeadStrategus",
    description:
      "5-day in-person GTM engineering workshop in Bengaluru + 4 weeks of guided implementation. Design, build and test your own outbound engine: ICP, signals, scoring, messaging and measurement.",
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
    sub: "In 5 days, build a working outbound engine for your own business: who to target, when to reach out, and what to say. Taught by people who ran marketing at AWS, Gartner and SAP.",
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
    intro: "AI made outbound easy to build and hard to win. Everyone has the same tools. Three things set you apart.",
    cols: [
      { icon: "target", title: "Know who buys, and why now.", text: "Track the signals that predict a purchase in your market." },
      { icon: "shield-check", title: "People decide at three key points.", text: "AI researches and drafts. You choose the segments, the buying criteria and every message." },
      { icon: "refresh-cw", title: "A loop that learns.", text: "Replies and meetings improve your targeting and messages every week." },
    ],
  },

  whyJoin: {
    h2: "Why join?",
    intro: "Learn from a firm that runs outbound for clients every week. Here is what you get.",
    cards: [
      { icon: "rocket", title: "Build your own engine", text: "Built on your real customers and offer. You leave with a tested system, not notes." },
      { icon: "workflow", title: "Learn the system, not a tool", text: "Swap tools any time without starting over." },
      { icon: "user-check", title: "AI does the work, you decide", text: "Know exactly where your judgement matters." },
      { icon: "briefcase", title: "Learn from people who do it", text: "Frameworks and data from our own client campaigns." },
      { icon: "calendar-check", title: "Support after the room", text: "Two live sessions a week while you send, read replies and improve." },
      { icon: "users", title: "A small, focused group", text: "Time on your own engine, plus peers to learn from." },
    ],
  },

  sponsor: {
    h2: "Get your boss to sponsor you.",
    intro: "Most people here are paid for by their company. Use these points, or send the note.",
    pitchTitle: "What your company gets",
    points: [
      { icon: "target", title: "Built for your company", text: "Designed around your customers and offer. Useful from day one." },
      { icon: "file-text", title: "Assets you keep", text: "A ranked account list, tested messages and a 90-day plan." },
      { icon: "receipt", title: "Easy to pay", text: "GST invoice. Pay by Razorpay or bank transfer against a PO." },
      { icon: "users", title: "Cheaper for teams", text: "Teams of 3+ save {teamDiscountPct}% per seat." },
    ],
    emailLabel: "Note to your manager",
    email: [
      "Hi [Name],",
      "",
      "LeadStrategus, a B2B demand-generation firm, is running the first cohort of its GTM Engineering Workshop in Bengaluru, and I'd like to attend. It's hands-on: 5 days in person, then 4 weeks of online support while we put it into practice.",
      "",
      "They teach the methods they use with their own clients, including how to use AI tools for lead generation. I would build our outbound engine on our own customers and offer, so we can get started quickly without buying an expensive tool stack.",
      "",
      "By the end, I'd come back with a working outbound system for us: target accounts, tested messaging, and a plan to keep it running.",
      "",
      "There’s also a {teamDiscountPct}% per-seat discount if three or more of us attend together.",
      "",
      "Could we discuss it this week?",
      "",
      "Thanks,",
      "[Your name]",
    ],
  },

  whyUs: {
    h2: "Why LeadStrategus?",
    intro: "Real experience. Proven results. A smarter way to do outbound.",
    proofs: [
      { icon: "radar", big: "100+", short: "global outbound projects", label: "global outbound projects", title: "Proven global execution", text: "8+ years of real-world B2B demand generation across international markets." },
      { icon: "briefcase", big: "25+", short: "years founder experience at AWS, SAP, Gartner", label: "years of founder experience", title: "Operator-led", text: "B2B marketing, BD and GTM at AWS, SAP, Oracle, IBM and Gartner." },
      { icon: "award", big: "5.0", short: "★★★★★ rated on Clutch", label: "★★★★★ on Clutch", title: "Independently recognised", text: "Commended for ABM precision, research depth and delivery quality.", clutch: true },
      { icon: "chart-line", big: "25K+", short: "personalised messages behind our playbooks", label: "personalised messages sent", title: "Our own campaign data", text: "Shows which messages get replies, and which conversation stages lead to meetings." },
    ],
    banner: ["We don't just teach outbound.", "We do it."],
  },

  programme: {
    h2: "8 stages. 3 human gates. One engine.",
    intro: "Not a course. A build. 30% principles, 70% building on your own business.",
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
    note: "Want full automation? You can switch the gates off. We'll show you what it costs in quality.",
  },

  days: {
    h2: "5 days to build. 1 month to implement.",
    summary: [
      { tag: "IN PERSON · BENGALURU", big: "5", unit: "days", text: "Learn in the morning. Build in the afternoon. Demo day on Friday." },
      { tag: "ONLINE · 2 × 1 HR A WEEK", big: "4", unit: "weeks", text: "First sends, replies and a 90-day plan, with our team reviewing your work." },
    ],
    // From the "From learning to real execution" slide: two phases, then what you get.
    phases: [
      { icon: "calendar", big: "5", unit: "days", title: "Intensive classroom", steps: ["Principles", "Design", "Build"], tag: "IN PERSON · BENGALURU" },
      { icon: "calendar-check", big: "4", unit: "weeks", title: "Guided execution", steps: ["Implement", "Iterate", "Optimise"], tag: "ONLINE · 2 × 1 HR A WEEK" },
    ],
    outcomes: [
      { icon: "layers", title: "Capstone project", text: "Build your own outbound engine." },
      { icon: "target", title: "Time to value", text: "Launch in weeks, not months." },
      { icon: "chart-line", title: "Real outcomes", text: "A working system you can run and scale." },
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
    h2: "Who it's for.",
    cards: [
      { icon: "rocket", title: "Founders who sell B2B", text: "Need a repeatable way to create first meetings." },
      { icon: "user-round", title: "GTM engineers and hires", text: "Know the tools. Want the thinking behind them." },
      { icon: "briefcase", title: "Sales, demand-gen and RevOps leads", text: "Building or fixing outbound." },
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
    sub: "We run everything we teach for clients every week.",
    // "long" paragraphs appear in the "More about" profile window.
    people: [
      {
        name: "Kingshuk Hazra", role: "Founder", photo: "kingshuk-hazra",
        bio: "Former Head of Marketing, AWS India. 20 years at SAP, Oracle, IBM, Gartner and Pluralsight.",
        long: [
          "Kingshuk founded LeadStrategus in 2018 after leading marketing for Amazon Web Services in India and, before that, holding progressively senior roles across marketing, BD analytics and advisory at SAP, Oracle Consulting, IBM, Gartner, Pluralsight (Director, Enterprise Marketing) and IMRB.",
          "A statistics graduate with an MBA from the Indian Institute of Foreign Trade, Kingshuk is the reason every LeadStrategus engagement starts with the numbers and ends with a forecast someone is prepared to defend.",
          "Kingshuk writes and speaks on demand generation, intent data and the practical use of AI agents in B2B go-to-market, and still personally runs the diagnostic phase of most GTM strategy engagements.",
        ],
        linkedin: "https://www.linkedin.com/in/kingshuk/", email: "kingshuk@leadstrategus.com",
      },
      {
        name: "Anindita Hazra", role: "Co-founder", photo: "anindita-hazra",
        bio: "Leads client delivery in demand generation and sales enablement.",
        long: [
          "Anindita co-founded LeadStrategus and leads client delivery: the pods, the programmes and the weekly pipeline reviews that keep the firm accountable for meetings rather than activity.",
          "Anindita's background spans marketing operations, content and programme management for technology companies.",
        ],
        linkedin: "https://www.linkedin.com/in/aninditahazra/", email: "anindita@leadstrategus.com",
      },
      {
        name: "Komala Maran", role: "Head Go-To-Market & Growth", photo: "komala-maran",
        bio: "Leads Go-To-Market and Market Intelligence. Built our research practice. Engineer from IIIT Allahabad.",
        long: [
          "Komala joined LeadStrategus in 2019 and has grown with the firm from Smarketing consultant to Manager of its Market Insights and Open Source Intelligence practice, and now to Head of Go-To-Market. She runs the intelligence engine behind client engagements: the market selection, opportunity assessment, ICP development and account prioritisation that decide who a client should go after, and when. Her work spans international market entry, buyer and competitive intelligence, and intelligence-led demand generation for B2B and technology companies.",
          "An engineer by training, Komala is the reason a LeadStrategus target list comes with a why attached to every account: what changed at that company, why now, and how to start the conversation.",
          "She leads the firm’s use of generative AI and AI agents across research and GTM workflows, and runs LeadStrategus masterclasses on using open-source intelligence to find and research prospects. Outside work, she founded Project Yaadhum and mentors students through the Ministry of Education’s Vidyanjali programme.",
        ],
        linkedin: "https://www.linkedin.com/in/komalamaran/", email: "komala.m@leadstrategus.com",
      },
      {
        name: "Kirubakaran Periyaswamy", role: "Technical Lead", photo: "kirubakaran-periyaswamy", // TODO confirm the role title
        bio: "Builds the AI agents behind our platform, from data pipelines to message writing.",
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
    h2: "Introductory pricing.",
    sub: "First cohort only. Prices go up after Cohort 1.",
  },

  apply: {
    h2: "Apply or ask us. We'll respond within 1 business hour.",
    sub: "Apply for Cohort 1, or ask a question first. No payment until we confirm fit.",
    email: "mail@leadstrategus.com",
    questionSuccess: "Question received. We'll respond within 1 business hour.",
    trust: ["NO PAYMENT TO APPLY", "GST INVOICE"],
    roles: ["Founder", "Sales or demand-gen lead", "RevOps", "First GTM hire", "Other"],
    success: "Application received. We'll respond within 1 business hour.",
  },

  faq: [
    { q: "How is this different from a Clay or n8n course?", a: "Those teach one tool. We teach you to design a system and pick the right tool for each job." },
    { q: "Do I need to code?", a: "No. We use no-code and low-code tools. If you're comfortable with spreadsheets, you're ready." },
    { q: "Will my engine be ready to use after 5 days?", a: "You'll leave with a working, tested engine. In the 4 weeks after, you run real sends and improve it." },
    { q: "Do you guarantee meetings or a job?", a: "No. Results depend on your offer, market and execution. We teach you to build and run the system." },
    { q: "Can my employer pay?", a: "Yes. We give a GST invoice and accept Razorpay or bank transfer against a PO." },
  ],

  finalCta: {
    h2: "One engine that's yours.",
    sub: "We read every email and respond within 1 business hour.",
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
