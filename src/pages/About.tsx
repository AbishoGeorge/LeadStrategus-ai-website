import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, Linkedin, Mail, Target, Cpu, Layers, Zap, X,
} from 'lucide-react';
import { useSeo } from '../lib/useSeo';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const values = [
  { icon: Target, title: 'Context before copy', description: 'We obsess over the input before the LLM writes a word. Context is the differentiator. Everything else is downstream.' },
  { icon: Cpu, title: 'Signal depth is the moat', description: 'Naukri, Monster, and Indian tenders are invisible to every US-built tool. That structural advantage compounds every month we run.' },
  { icon: Layers, title: 'The operator is the product', description: '8 years of consulting. 27 years of the founder running this exact motion at AWS, SAP, Oracle, Gartner, and Pluralsight. That pattern recognition is not in the software alone, it is in the weekly calibration.' },
  { icon: Zap, title: 'No autonomous spray', description: 'Every outreach draft queues for human approval. No burned domains. No 11x-style churn. The watching is automated. The sending is intentional.' },
];

const teamMembers = [
  {
    name: 'Kingshuk Hazra', role: 'Founder & CEO',
    description: 'Built demand gen engines at AWS, SAP, Oracle, Gartner, and Pluralsight before founding LeadStrategus in 2018.',
    fullBio: 'Kingshuk has spent 25 years building B2B pipeline programmes from the ground up, as the first marketing hire at AWS India, SAP, Oracle Consulting, Gartner, and Pluralsight. He founded LeadStrategus in 2018 to bring that same signal-led, research-backed motion to other B2B teams. Eight years later, LeadStrategus.ai is the automated version of everything the agency learned. Stats graduate and MBA from IIFT.',
    image: 'https://github.com/AbishoGeorge/LeadStrategus-ai-website/blob/main/public/profile.png?raw=true',
    linkedin: 'https://www.linkedin.com/in/kingshuk/',
    email: 'kingshuk@leadstrategus.com',
  },
  {
    name: 'Anindita Hazra', role: 'Co-Founder',
    description: 'Turned eight years of agency operations into process, playbooks, and now - agent logic.',
    fullBio: 'Anindita co-founded LeadStrategus and has led its operations since 2018. Her background in HR, OD consulting, and sales and marketing transformation shaped how the firm captures and systematises what works. She ensures that the patterns proven across 30+ client engagements are reflected in how LeadStrategus.ai agents are built, trained, and improved. MBA from XISS.',
    image: 'https://github.com/AbishoGeorge/LeadStrategus-ai-website/blob/main/public/profile.png?raw=true',
    linkedin: 'https://www.linkedin.com/in/aninditahazra/',
    email: 'anindita@leadstrategus.com',
  },
  {
    name: 'Komala Maran', role: 'Head Go-To-Market & Growth',
    description: 'Has run the LeadStrategus GTM motion for 7+ years, and now leads it for the AI platform.',
    fullBio: 'Komala has been with LeadStrategus for over seven years, running account-based marketing programmes, SaaS product launches, and go-to-market strategy for clients across industries. She has done the work the platform now automates, building account lists, running research briefs, designing outreach sequences by hand. As Head of GTM and Growth for LeadStrategus.ai, she leads how the platform reaches and serves solo operators and growth teams. B.Tech from IIIT.',
    image: 'https://github.com/AbishoGeorge/LeadStrategus-ai-website/blob/main/public/profile.png?raw=true',
    linkedin: 'https://www.linkedin.com/in/komalamaran/',
    email: 'komala.m@leadstrategus.com',
  },
  {
    name: 'Kiruba Karan', role: 'AI/ML ENGINEER',
    description: 'Builds and deploys the AI systems that power LeadStrategus.ai monitoring and outreach agents.',
    fullBio: 'Kiruba builds the agents that run the platform, from data pipelines scraping 10+ signal sources to LLMs fine-tuned for context-grounded message generation. His work covers the full AI lifecycle: data engineering, model training, RAG pipelines, and production deployment using LangGraph, PyTorch, HuggingFace, and FastAPI. At LeadStrategus, he has automated internal workflows, built NLP pipelines, and integrated OpenAI and Anthropic Claude APIs into live systems.',
    image: 'https://github.com/AbishoGeorge/LeadStrategus-ai-website/blob/main/public/profile.png?raw=true',
    linkedin: 'https://www.linkedin.com/in/kirubakaranperiyasamy/',
    email: 'kirubakaran.p@leadstrategus.com',
  },
  {
    name: 'Abisho George', role: 'Strategy Consultant',
    description: 'Works on market intelligence, helping teams understand where to play and who to target before outreach begins.',
    fullBio: "Abisho works on the layer that determines whether the entire outbound motion points in the right direction. He runs market mapping, ICP definition, and account targeting research, the inputs that shape which companies the agents monitor and how they are scored. He works across the GTM and engineering teams to keep that strategic intelligence current as markets and client targets evolve.",
    image: 'https://github.com/AbishoGeorge/LeadStrategus-ai-website/blob/main/public/profile.png?raw=true',
    linkedin: 'https://www.linkedin.com/in/abishogeorge/',
    email: 'abisho.g@leadstrategus.com',
  },
];

const achievements = [
  { value: '8+', label: 'Years running pipeline programmes' },
  { value: '30K+', label: 'Enterprise and mid-market clients served' },
  { value: '100K+', label: 'Outbound messages, signals, and campaigns processed' },
  { value: '5.0', label: 'Stars on Clutch' },
];

const howWeWork = [
  { title: 'From manual research to always-on monitoring', body: "We used to do this by hand, scanning Naukri, reading tenders, tracking news. Now agents do it continuously, across seven signal sources, without an analyst sitting at a desk. The watching never stops. Neither does the pipeline." },
  { title: 'From campaign thinking to compounding intelligence', body: "Manual outbound runs in batches. Campaigns start, end, and decay. The agent model runs differently, every signal logged makes the next decision sharper. The ICP model improves. The timing gets more precise. Intelligence compounds instead of resetting." },
  { title: 'From human approval bottlenecks to human judgment at the right moment', body: 'We did not remove humans from the loop, we moved them to where they matter. Agents do the watching, the interpreting, the drafting. You approve the send. The grind is automated. The judgment stays yours.' },
];

/* ─── Animation variants ────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

/* ─── Team modal ────────────────────────────────────────────────────────────── */

type TeamMember = typeof teamMembers[number];

function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 14 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 shrink-0 bg-gradient-to-br from-slate-50 to-blue-50/60 flex items-center justify-center py-10 px-6">
            <img
              src={member.image} alt={member.name}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
          </div>
          <div className="flex-1 p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-electric-500 mb-1">{member.role}</p>
            <h3 className="text-2xl font-bold text-navy-900 leading-tight">{member.name}</h3>
            <div className="w-8 h-0.5 bg-electric-200 my-4" />
            <p className="text-sm text-gray-500 leading-[1.85]">{member.fullBio}</p>
            <div className="flex flex-col gap-2.5 mt-6">
              <a
                href={member.linkedin}
                className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-electric-500 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 shrink-0" /> Connect on LinkedIn
              </a>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-electric-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" /> {member.email}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function About() {
  useSeo('About LeadStrategus | AI Revenue Systems', 'We build AI systems, not services. Learn how LeadStrategus helps B2B teams generate pipeline.');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#team') {
      const el = document.getElementById('team');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 sm:pt-28 pb-24 sm:pb-32 overflow-hidden bg-white">

        {/* ── Background layer ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* Left-side warm glow behind text */}
          <div className="absolute top-[-60px] left-[-80px] w-[500px] h-[500px] rounded-full bg-electric-50 opacity-70 blur-[80px]" />
          {/* Full-page subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.4" fill="#1B5FAA" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot)" />
          </svg>
        </div>

        {/* ── Right-side decorative panel ── */}
        <div className="absolute right-0 top-0 bottom-0 w-[46%] pointer-events-none hidden lg:block" aria-hidden>
          {/* Base gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/0 via-electric-50/40 to-blue-100/50" />
          <div className="absolute inset-0 bg-gradient-to-tl from-navy-50/30 via-transparent to-transparent" />

          {/* Large soft orb — top right */}
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-electric-100/60 to-blue-100/40 blur-[60px]" />
          {/* Mid orb */}
          <div className="absolute top-1/2 -translate-y-1/2 right-12 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-blue-100/50 to-electric-50/30 blur-[50px]" />
          {/* Bottom orb */}
          <div className="absolute -bottom-16 right-1/3 w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-slate-100/60 to-electric-100/30 blur-[45px]" />

          {/* SVG abstract composition */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Fine grid overlay */}
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B5FAA" strokeWidth="0.4" strokeOpacity="0.07" />
              </pattern>
              <radialGradient id="fadeCenter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.65" />
              </radialGradient>
            </defs>
            <rect width="600" height="600" fill="url(#grid)" />
            {/* Fade edges of grid */}
            <rect width="600" height="600" fill="url(#fadeCenter)" />

            {/* Large arc sweep — top right */}
            <path
              d="M 520 -20 Q 700 200 560 420"
              stroke="#1B5FAA" strokeWidth="1.2" strokeOpacity="0.12"
              fill="none" strokeLinecap="round"
            />
            <path
              d="M 570 -40 Q 760 220 610 460"
              stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.07"
              fill="none" strokeLinecap="round"
            />

            {/* Concentric partial rings — bottom right */}
            <circle cx="520" cy="500" r="100" stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.08" fill="none" />
            <circle cx="520" cy="500" r="150" stroke="#1B5FAA" strokeWidth="0.6" strokeOpacity="0.06" fill="none" />
            <circle cx="520" cy="500" r="200" stroke="#1B5FAA" strokeWidth="0.5" strokeOpacity="0.04" fill="none" />

            {/* Floating geometric shapes */}
            {/* Rounded square — top area */}
            <rect x="360" y="60" width="60" height="60" rx="14"
              fill="none" stroke="#1B5FAA" strokeWidth="1" strokeOpacity="0.1"
              transform="rotate(15 390 90)"
            />
            {/* Smaller square */}
            <rect x="460" y="140" width="36" height="36" rx="8"
              fill="#EEF5FF" fillOpacity="0.7" stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.12"
              transform="rotate(-8 478 158)"
            />
            {/* Diamond */}
            <rect x="280" y="200" width="28" height="28" rx="4"
              fill="none" stroke="#1B5FAA" strokeWidth="0.9" strokeOpacity="0.1"
              transform="rotate(45 294 214)"
            />
            {/* Small circle cluster */}
            <circle cx="420" cy="320" r="5" fill="#1B5FAA" fillOpacity="0.07" />
            <circle cx="436" cy="308" r="3.5" fill="#1B5FAA" fillOpacity="0.05" />
            <circle cx="408" cy="335" r="3" fill="#1B5FAA" fillOpacity="0.06" />

            {/* Horizontal dashed line */}
            <line x1="310" y1="260" x2="540" y2="260"
              stroke="#1B5FAA" strokeWidth="0.7" strokeOpacity="0.08"
              strokeDasharray="4 8"
            />
            {/* Vertical dashed line */}
            <line x1="480" y1="80" x2="480" y2="380"
              stroke="#1B5FAA" strokeWidth="0.7" strokeOpacity="0.06"
              strokeDasharray="4 10"
            />

            {/* Diagonal connector lines — data/network feel */}
            <line x1="340" y1="150" x2="420" y2="210"
              stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.09" strokeLinecap="round"
            />
            <line x1="420" y1="210" x2="510" y2="180"
              stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.09" strokeLinecap="round"
            />
            <circle cx="340" cy="150" r="3.5" fill="#1B5FAA" fillOpacity="0.14" />
            <circle cx="420" cy="210" r="4" fill="#1B5FAA" fillOpacity="0.12" />
            <circle cx="510" cy="180" r="3.5" fill="#1B5FAA" fillOpacity="0.14" />

            {/* Second node cluster — lower mid */}
            <line x1="350" y1="390" x2="440" y2="360"
              stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.08" strokeLinecap="round"
            />
            <line x1="440" y1="360" x2="490" y2="410"
              stroke="#1B5FAA" strokeWidth="0.8" strokeOpacity="0.08" strokeLinecap="round"
            />
            <circle cx="350" cy="390" r="3" fill="#1B5FAA" fillOpacity="0.11" />
            <circle cx="440" cy="360" r="4" fill="#1B5FAA" fillOpacity="0.10" />
            <circle cx="490" cy="410" r="3" fill="#1B5FAA" fillOpacity="0.11" />

            {/* Pill / bar shapes — data bar chart feel */}
            <rect x="320" y="460" width="50" height="7" rx="3.5" fill="#1B5FAA" fillOpacity="0.06" />
            <rect x="320" y="474" width="80" height="7" rx="3.5" fill="#1B5FAA" fillOpacity="0.08" />
            <rect x="320" y="488" width="38" height="7" rx="3.5" fill="#1B5FAA" fillOpacity="0.05" />
          </svg>

          {/* Frosted left-edge fade so it blends into text area */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
        </div>

        {/* ── Content ── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-50 border border-electric-100 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-500 animate-pulse" />
              <span className="text-xs font-semibold text-electric-600 tracking-widest uppercase">About LeadStrategus</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-900 tracking-tight leading-[1.05]">
              We build systems,{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-electric-500 to-electric-700 bg-clip-text text-transparent">
                  not services.
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-400/60 to-transparent rounded-full" />
              </span>
            </h1>
            <p className="mt-7 text-xl text-gray-400 leading-[1.8] max-w-2xl">
              LeadStrategus exists because B2B revenue teams deserve better tools. Not more consultants. Not more dashboards. Better systems that do the work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef5fb 50%, #f4f7fb 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-electric-500 mb-4">Our Story</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-[1.1] mb-8">Where it all started</h2>

              <div className="space-y-5">
                <p className="text-gray-500 leading-[1.9] text-base">
                  For eight years, LeadStrategus ran as a meeting-generating agency. Humans doing the work - reading Naukri every morning, tracking tender portals, pulling annual reports, mapping hiring patterns to purchase timelines.
                </p>
                <p className="text-gray-500 leading-[1.9] text-base">
                  It worked. 5.0 on Clutch. Meetings with Fortune 50s. Pipeline for enterprise clients across India and globally.
                </p>
                <p className="text-gray-500 leading-[1.9] text-base">
                  But every insight lived inside a person. Every signal required someone to spot it. Every campaign started from scratch. The motion was proven, it just couldn't scale beyond the hours in a human day.
                </p>
                <p className="text-gray-500 leading-[1.9] text-base">So we asked the obvious question: what if we encoded everything we'd learned into agents that never sleep?
                </p>
              </div>

              <ul className="mt-6 space-y-3.5">
                {[
                  'Eight years of signal patterns, now running continuously',
                  'Every campaign insight, now informing the next one automatically',
                  'The same motion that booked Fortune 50 meetings, now available without a full agency retainer',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-electric-100 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-500" />
                    </div>
                    <span className="text-gray-500 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: visual */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaborating on data systems"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 via-transparent to-electric-500/10" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4">
                <p className="text-2xl font-bold text-navy-900">8+</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">years of pipeline intelligence<br />now encoded
                </p>
              </div>
              {/* Decorative blob */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-electric-100/40 rounded-full blur-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR PURPOSE ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(160deg, #e8f2fc 0%, #f0f7ff 35%, #f8fbff 70%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-electric-500 mb-4">Our Purpose</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-[1.1] mb-8">Why we built the agents</h2>

              <div className="space-y-5">
                <p className="text-gray-500 leading-[1.9] text-base">
                  The manual motion worked. But it had a ceiling.
                </p>
                <p className="text-gray-500 leading-[1.9] text-base">
                  A human analyst can watch 20 accounts a day. An agent watches 2,000. A researcher reads one tender portal. The engine reads twelve simultaneously. An SDR rewrites the same opening line for every prospect. The agent writes from the specific signal that triggered that account, this morning.
                </p>
                <p className="text-gray-500 leading-[1.9] text-base">
                  We didn't build LeadStrategus.ai to replace what we were doing. We built it to do what we were doing, at a scale no human team ever could.
                </p>
                <p className="text-gray-500 leading-[1.9] text-base">The result:</p>
              </div>

              <ul className="mt-6 space-y-3.5">
                {[
                  'Always-on monitoring across LinkedIn, Naukri, Monster, tenders, news, and tech-stack sources',
                  'Signal interpretation that runs while you sleep, not while your analyst is at their desk',
                  'Outreach drafted from real context, not recycled templates',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-electric-100 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-500" />
                    </div>
                    <span className="text-gray-500 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: visual */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Strategic planning and AI systems"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 via-transparent to-electric-500/10" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4">
                <p className="text-2xl font-bold text-navy-900">3x</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">avg. pipeline velocity<br />vs. manual outbound</p>
              </div>
              {/* Decorative blob */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-electric-100/40 rounded-full blur-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT DRIVES US ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            className="mb-12"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-electric-500 mb-4">Our Values</span>
            <h2 className="text-4xl font-bold text-navy-900">What drives us</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp} initial="hidden" whileInView="show"
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.09 }}
                  className="group p-7 rounded-3xl bg-gray-50/80 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-2xl bg-electric-50 group-hover:bg-electric-100 flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-electric-500" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mb-2.5">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-[1.8]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── METRICS ───────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1A32 0%, #142647 50%, #0d3870 100%)' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-electric-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot2" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot2)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-electric-300 mb-4">By the numbers</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">What We've Built</h2>
            <p className="mt-4 text-blue-200/70 text-base max-w-md mx-auto leading-relaxed">
              Numbers from real pipeline work, not marketing projections.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative p-8 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{item.value}</p>
                <div className="w-6 h-0.5 bg-electric-400/60 mx-auto my-3 rounded-full" />
                <p className="text-xs font-semibold text-blue-200/70 uppercase tracking-wider leading-snug">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-electric-500 mb-4">Our Process</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-tight">How We Work</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-7">
            {howWeWork.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-[1.85]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section id="team" className="py-20 sm:py-28" style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #eef5fb 60%, #f4f7fb 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background glow */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electric-100/30 rounded-full blur-3xl pointer-events-none" aria-hidden />

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-50 border border-electric-100 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-500" />
              <span className="text-xs font-semibold text-electric-600 tracking-widest uppercase">Built by GTM + AI Experts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.15]">
              <div>
                Not another AI startup.
              </div>
              <div className="mt-1 text-navy-700 font-semibold">
                A consulting firm that productised itself.
              </div>
            </h2>
            <p className="text-gray-400 leading-[1.8] text-base">
              Meet the operators, GTM practitioners, and engineers behind LeadStrategus.ai. Eight years of consulting. Twenty-seven years of the founder building this exact motion at AWS, SAP, Oracle, Gartner, and Pluralsight.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-7">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-18.7px)] max-w-sm bg-white border border-gray-100/80 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                {/* Top accent line */}
                <div className="h-0.5 bg-gradient-to-r from-electric-400/0 via-electric-400 to-electric-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-7">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="relative shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={member.image} alt={member.name}
                        className="w-16 h-16 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="text-base font-bold text-navy-900 leading-tight">{member.name}</h3>
                      <p className="text-xs font-semibold text-electric-500 mt-1 uppercase tracking-wide">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
                      <a
                        href={member.linkedin}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label={`${member.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-4 h-4 text-gray-400 hover:text-navy-900 transition-colors" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label={`Email ${member.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-4 h-4 text-gray-400 hover:text-electric-500 transition-colors" />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-[1.85]">{member.description}</p>

                  <div className="mt-5 pt-5 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-electric-500 group-hover:text-electric-600 transition-colors">
                      Read more
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-electric-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative text-center p-12 sm:p-16 rounded-4xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f2fc 50%, #f4f9ff 100%)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 leading-tight mb-5">
                Want to see what 27 years of demand-gen, encoded into an engine, looks like for your pipeline?
              </h2>
              <p className="text-gray-500 leading-[1.8] mb-10 max-w-xl mx-auto text-base">
                Talk to us about your growth goals. We will show you exactly how we'd automate your pipeline from discovery to booked meetings.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20"
                >
                  Book a Call with Kingshuk <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/agents"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-gray-200 bg-white text-navy-900 text-sm font-semibold hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  Explore Agents
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedMember && <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </div>
  );
}
