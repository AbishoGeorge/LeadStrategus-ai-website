{/*
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
import { funnelStages, allAgents } from '../data/agents';
import type { Agent } from '../data/agents';
import { useSeo } from '../lib/useSeo';

const statusFilters = ['All', 'Live', 'Coming Soon'] as const;

export default function Agents() {
  useSeo(
    'AI Sales Agents for Pipeline Growth | LeadStrategus',
    'Explore AI agents that find, qualify, and convert your next best customers automatically.'
  );
  const [activeStage, setActiveStage] = useState('all');
  const [activeStatus, setActiveStatus] = useState<typeof statusFilters[number]>('All');

  const filteredAgents = allAgents.filter((agent) => {
    const stageMatch = activeStage === 'all' || agent.stageSlug === activeStage;
    const statusMatch =
      activeStatus === 'All' ||
      (activeStatus === 'Live' && agent.status === 'live') ||
      (activeStatus === 'Coming Soon' && agent.status === 'coming-soon');
    return stageMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Agent Catalog
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl">
              Every agent in the LeadStrategus.ai Contextual Intelligence system. Pick one, combine many, or deploy the full pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <button
                onClick={() => setActiveStage('all')}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeStage === 'all'
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Stages
              </button>
              {funnelStages.map((stage) => (
                <button
                  key={stage.slug}
                  onClick={() => setActiveStage(stage.slug)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeStage === stage.slug
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {stage.name}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeStatus === status
                      ? 'bg-electric-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No agents match your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link
        to={`/agents/${agent.id}`}
        className="group block p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5 text-navy-700" />
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                agent.status === 'live' ? 'bg-green-500' : 'bg-amber-400'
              }`}
            />
            <span
              className={`text-xs font-medium ${
                agent.status === 'live' ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {agent.status === 'live' ? 'Live' : 'Coming Soon'}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-navy-900 mb-1">{agent.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">{agent.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-electric-500 bg-electric-50 px-2 py-0.5 rounded-md">
            {agent.stage}
          </span>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-electric-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
*/}

import {
  Search,
  Globe,
  Building2,
  Briefcase,
  FileSearch,
  Zap,
  Layers,
  Newspaper,
  FileText,
  BarChart2,
  Brain,
  Star,
  ArrowUpCircle,
  AlignJustify,
  MessageSquare,
  Send,
  Bell,
  Eye,
  RefreshCw,
  Activity,
  MailOpen,
  Mic,
  BookOpen,
  TableProperties,
  Database,
  Files,
  CheckSquare,
  UploadCloud,
  PieChart,
  ImageIcon,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AgentStatus = 'live' | 'coming-soon';

export interface Agent {
  id: string;
  name: string;
  description: string;
  details: string;
  stage: string;
  stageSlug: string;
  status: AgentStatus;
  icon: LucideIcon;
  whatItIs: string;
  howItWorks: string;
  pipelineRole: string;
}

export const funnelStages = [
  { name: 'Account Discovery', slug: 'discovery' },
  { name: 'Buying Intent', slug: 'intent' },
  { name: 'Account Prioritization', slug: 'prioritization' },
  { name: 'Messaging & Outreach', slug: 'outreach' },
  { name: 'Monitoring & Reactivation', slug: 'monitoring' },
  { name: 'Meeting Conversion', slug: 'meeting' },
  { name: 'Ops', slug: 'ops' },
];

export const allAgents: Agent[] = [
  // ─── ACCOUNT DISCOVERY ───────────────────────────────────────────────────────
  {
    id: 'linkedin-sales-nav-scraper',
    name: 'LinkedIn Sales Nav Scraper',
    description:
      'Pulls targeted company lists from LinkedIn Sales Navigator using geo, revenue, industry, and headcount filters.',
    details:
      'Applies layered Sales Navigator filters to extract high-precision company lists, feeding them directly into your enrichment and intent pipeline.',
    stage: 'Account Discovery',
    stageSlug: 'discovery',
    status: 'live',
    icon: Users,
    whatItIs:
      'Most sales teams waste 40% of their prospecting time chasing accounts that were never a fit. The LinkedIn Sales Nav Scraper eliminates that waste. It connects to LinkedIn Sales Navigator and systematically extracts company lists that match your Ideal Customer Profile — filtered by geography, headcount band, revenue range, and industry vertical. The result is a structured, deduplicated account universe you can act on immediately, without manual browsing or copy-paste workflows.',
    howItWorks:
      'You define your ICP parameters — geography, company size, revenue band, and industry codes — and the agent applies them as compound filters inside Sales Navigator. It then traverses the result set page by page, extracting company name, domain, headcount, location, and LinkedIn URL. Duplicate detection runs in real time, and the cleaned output is streamed into a normalized schema ready for downstream enrichment. The entire run is logged with filter configurations so every list is reproducible.',
    pipelineRole:
      'This agent sits at the very top of the funnel — the raw universe builder. It feeds directly into the Firmographic Enricher, which adds financial and operational depth to each company record. Nothing downstream runs until this agent has produced a clean, in-scope account list. Think of it as the gate: only accounts that clear ICP filters ever enter the LeadStrategus pipeline.',
  },
  {
    id: 'google-scraper-lead-gen',
    name: 'Google Scraper Lead Gen',
    description:
      'Finds companies from web queries and directories when Sales Navigator coverage falls short.',
    details:
      'Executes structured Google search queries against industry directories, news sources, and company listings to surface accounts that Sales Nav misses.',
    stage: 'Account Discovery',
    stageSlug: 'discovery',
    status: 'live',
    icon: Globe,
    whatItIs:
      "LinkedIn covers the enterprise well, but mid-market and emerging companies often have thin or outdated Sales Navigator profiles. The Google Scraper Lead Gen agent fills that gap by treating the open web as a lead source. It runs structured search queries against industry directories, trade publications, government registries, and chamber of commerce listings to surface companies that match your ICP but don't appear in standard database tools. It's not a generic web crawler — it's a precision instrument tuned to B2B discovery logic.",
    howItWorks:
      'The agent accepts a set of ICP descriptors — target industry, product category, geography, and company type — and converts them into a bank of structured Google search queries (e.g., "logistics SaaS companies Bangalore headcount 200–500"). It fetches results, parses organic listings, and applies entity extraction to identify company names, domains, and relevant metadata. Each result is scored for ICP relevance using a lightweight LLM pass before being written to the output schema. Duplicate resolution is run against the existing account universe before final output.',
    pipelineRole:
      'This agent runs in parallel with the LinkedIn Sales Nav Scraper, acting as a complementary discovery source. Its output is merged and deduplicated into the master account list before flowing into the Firmographic Enricher. It ensures the pipeline never has blind spots caused by Sales Nav coverage gaps — especially for fast-growing startups, regional companies, and niche verticals that live primarily on the open web.',
  },
  {
    id: 'firmographic-enricher',
    name: 'Firmographic Enricher',
    description:
      'Adds structured company data — website, HQ, employee band, revenue indicators, and funding stage — to every account.',
    details:
      'Resolves company identity and appends verified firmographic attributes, giving every account a structured data profile for downstream scoring and personalization.',
    stage: 'Account Discovery',
    stageSlug: 'discovery',
    status: 'coming-soon',
    icon: Building2,
    whatItIs:
      'A raw account list is just a set of names. The Firmographic Enricher turns each name into a structured, intelligence-ready company record. It resolves company identity across data sources and appends verified attributes: official website, HQ location, employee headcount band, estimated annual revenue, funding stage and latest round, and founding year. This enrichment layer is what makes downstream scoring, segmentation, and personalization possible — without it, the pipeline is operating on incomplete information.',
    howItWorks:
      'Each company name and domain from the discovery layer is passed through a multi-source resolution pipeline. The agent queries business intelligence APIs, cross-references public funding databases, and validates domain ownership. An LLM layer reconciles conflicting data points and fills gaps using web inference when structured sources are incomplete. The final output is a normalized firmographic record appended to each account, with source attribution and a confidence score for key fields like revenue and headcount.',
    pipelineRole:
      'Firmographic Enricher is the last step in the discovery layer before accounts enter the intent and scoring pipeline. It receives raw account lists from the LinkedIn Sales Nav Scraper and Google Scraper Lead Gen agents and produces enriched records that the Intent Signal Aggregator, Predictive Account Scoring, and Hiring Intent Interpreter can process. Without this enrichment, the scoring model would have insufficient signal density to produce reliable tier assignments.',
  },

  // ─── BUYING INTENT ────────────────────────────────────────────────────────────
  {
    id: 'linkedin-job-scraper',
    name: 'LinkedIn Job Scraper',
    description:
      'Collects active job postings by title, function, and description to surface real-time organizational demand signals.',
    details:
      'Monitors LinkedIn job listings to extract hiring patterns that indicate technology investment, team expansion, and strategic initiative changes.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'live',
    icon: Briefcase,
    whatItIs:
      "Hiring is the most publicly visible signal of a company's internal priorities. When a company posts for a VP of Data Engineering, a Salesforce Admin, or a Director of Digital Transformation, they are declaring — in plain text — where they are investing budget. The LinkedIn Job Scraper systematically captures these signals at scale, converting the LinkedIn jobs graph into a structured intent feed. It's the intelligence layer that turns publicly available hiring data into a competitive advantage for your sales team.",
    howItWorks:
      'The agent monitors LinkedIn job listings across your target account universe using role titles, seniority levels, functions, and keyword filters defined by your ICP configuration. For each matching posting, it extracts the job title, team function, seniority level, full description text, posting date, and location. The raw job data is normalized and timestamped, then handed off to the Hiring Intent Interpreter for semantic classification. Volume spikes — multiple postings from one account in a short window — are flagged automatically as surge events.',
    pipelineRole:
      "This agent sits at the entry point of the intent layer, feeding the Hiring Intent Interpreter with raw job data. It runs on a continuous cadence against the enriched account universe produced by the discovery agents. Its output determines which accounts receive elevated intent scores in the scoring layer, and which ones trigger immediate outreach sequences. Without this agent's job feed, the intent pipeline would lose its highest-fidelity signal source.",
  },
  {
    id: 'naukri-job-scraper',
    name: 'Naukri Job Scraper',
    description:
      'Captures job postings and hiring metadata from Naukri for India-market intent coverage.',
    details:
      'Monitors Naukri listings to surface India-specific hiring signals, particularly for IT, engineering, and operations roles that indicate technology buying decisions.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'live',
    icon: FileSearch,
    whatItIs:
      "For B2B sellers targeting the Indian market, LinkedIn captures only a fraction of active hiring activity. Naukri is where India's technology, operations, and mid-market companies post the majority of their open roles — and where the richest hiring intent signals live. The Naukri Job Scraper closes this coverage gap, ensuring your intent pipeline reflects the full hiring picture of Indian companies rather than just the subset with active LinkedIn presence. It's India-native intent intelligence, built for the realities of the subcontinent's job market.",
    howItWorks:
      "The agent connects to Naukri's job listings and applies role-based, industry-based, and company-based filters aligned to your ICP configuration. It extracts job title, required skills, team function, experience band, and description text for each matching posting. Company-level posting metadata — total open roles, hiring velocity, and functional distribution — is computed and appended. The output is schema-normalized to match the LinkedIn job feed, so both sources flow into the Hiring Intent Interpreter through the same processing pipeline without structural divergence.",
    pipelineRole:
      'The Naukri Job Scraper runs alongside the LinkedIn Job Scraper as a parallel intent data source, specifically scoped to the India market. Both feeds converge at the Hiring Intent Interpreter, which classifies signals regardless of their source. For India-focused GTM motions, this agent often surfaces intent signals 2–4 weeks earlier than LinkedIn — making it a time-advantage asset in the intent layer.',
  },
  {
    id: 'hiring-intent-interpreter',
    name: 'Hiring Intent Interpreter',
    description:
      'Converts raw hiring data into structured intent signals — DX, ERP, cloud, security, and more.',
    details:
      'Applies semantic classification to job description text to infer technology investment themes, team build-out priorities, and strategic initiative signals.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'live',
    icon: Brain,
    whatItIs:
      "Job postings contain far more signal than their titles suggest. A 'Senior Platform Engineer' posting that requires Kubernetes, Terraform, and AWS signals cloud infrastructure investment. A 'Business Analyst – SAP S/4HANA' posting signals ERP modernization. The Hiring Intent Interpreter reads between the lines of job descriptions at scale, classifying each posting into structured intent categories — digital transformation, ERP, cloud, cybersecurity, data & analytics, AI/ML, and more. It transforms noisy hiring data into precise, actionable intelligence that your sales team can act on confidently.",
    howItWorks:
      'Raw job records from the LinkedIn and Naukri scrapers are passed to the LLM classification layer. The agent reads each job description and extracts three layers of signal: technology mentions (specific tools, platforms, and vendors), functional intent categories (what capability the company is building), and seniority pattern (whether they are building a team or replacing a role). Multiple postings from the same company are aggregated into a company-level intent profile, with a dominant signal and supporting signals ranked by recurrence. The output is a structured intent tag set per company, timestamped and confidence-scored.',
    pipelineRole:
      "This agent is the analytical core of the intent layer. It receives raw job feeds from the LinkedIn and Naukri scrapers and produces classified intent signals that flow into the Intent Signal Aggregator. The aggregator combines these signals with tech stack detection, news events, and annual report insights to produce a composite intent vector. The Hiring Intent Interpreter's output also directly influences the messaging personalization layer — informing the Multi-Channel Outreach Agent about which technology themes to reference in outreach.",
  },
  {
    id: 'tech-stack-detector',
    name: 'Tech Stack Detector',
    description:
      'Detects the ERP, CRM, cloud, data, and AI stack each account runs from website signals, job tags, and technology metadata.',
    details:
      'Cross-references website technology tags, job posting requirements, and third-party data signals to build an accurate technology inventory for each target account.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'coming-soon',
    icon: Layers,
    whatItIs:
      "Knowing what technology a company runs today tells you what they are likely to buy — or replace — tomorrow. The Tech Stack Detector builds a verified technology inventory for every account in your pipeline by reading the signals companies broadcast publicly: the tools embedded in their website, the systems mentioned in their job descriptions, and the platform partnerships listed in their press releases. This isn't guesswork — it's systematic inference from observable evidence, giving your sales team the intelligence to lead with relevance instead of cold opens.",
    howItWorks:
      "The agent runs a multi-source detection protocol for each account. First, it fingerprints the company's website using technology detection patterns (JS libraries, tracking pixels, analytics tags, infrastructure headers). Second, it scans job descriptions for tool-specific mentions — Salesforce, SAP, Snowflake, Azure, and hundreds of other identifiers. Third, it cross-references technology partnership pages and case study listings. All signals are merged, deduplicated, and classified into a structured stack taxonomy: CRM, ERP, cloud infrastructure, data warehouse, marketing automation, and AI/ML tools. A confidence score is assigned to each detected technology.",
    pipelineRole:
      "Tech Stack Detector feeds the Intent Signal Aggregator with vendor-specific context that hiring data alone cannot provide. It also directly informs the Ranking & Explainability Layer — when an account uses a competitor's platform or a complementary tool, that stack context becomes a scoring factor. In the outreach layer, detected technologies enable the Multi-Channel Outreach Agent to personalize messaging with specific integration hooks and competitive displacement angles.",
  },
  {
    id: 'company-news-events-miner',
    name: 'Company News & Events Miner',
    description:
      'Extracts expansion announcements, product launches, partnership deals, and compliance events from news sources.',
    details:
      'Monitors news feeds, press releases, and business media to surface company-level events that indicate active buying cycles or strategic inflection points.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'coming-soon',
    icon: Newspaper,
    whatItIs:
      "A company that just raised a Series B, announced a new market entry, or appointed a new CTO is in a fundamentally different buying posture than one in steady-state operations. The Company News & Events Miner tracks these inflection points in real time, scanning business news, press releases, regulatory filings, and industry publications to surface events that correlate with active procurement activity. It converts the noise of daily business news into a curated stream of high-relevance triggers for your target accounts.",
    howItWorks:
      'The agent maintains a continuous news monitoring pipeline against your target account universe. It queries business news APIs, company press release feeds, and industry publication sources using company name and domain as anchors. Each article is passed through an event extraction model that identifies the event type (funding, expansion, leadership change, product launch, partnership, regulatory action), the entities involved, and the strategic implication. Events are classified by trigger strength — how directly they indicate a buying cycle — and surfaced to the Intent Signal Aggregator with a structured event record and source URL.',
    pipelineRole:
      "News events are the timing signal layer of the intent engine. While job postings tell you where a company is heading, news events tell you when they are moving. This agent's output feeds the Intent Signal Aggregator and also triggers the Market Signal Monitor in the reactivation layer when a cold account suddenly generates high-relevance news. It's also a primary input to the Reactivation Message Builder, which uses specific event details to craft contextually precise re-engagement messages.",
  },
  {
    id: 'tender-procurement-tracker',
    name: 'Tender / Procurement Tracker',
    description:
      'Tracks public tenders, RFPs, and procurement notices that align with your ICP.',
    details:
      'Monitors government and enterprise procurement portals for RFPs and tenders that indicate active buying intent from in-scope accounts.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'coming-soon',
    icon: FileText,
    whatItIs:
      "A published tender or RFP is the most explicit possible buying signal — a company declaring, in a formal document, that they intend to spend budget on a defined category. The Tender / Procurement Tracker monitors government portals, enterprise procurement platforms, and industry-specific bidding systems to surface these high-certainty opportunities before your competitors do. For vendors serving public sector, infrastructure, healthcare, or large enterprise segments, this agent is the difference between reactive bidding and strategic pipeline positioning.",
    howItWorks:
      'The agent connects to a network of procurement data sources — central government eProcurement portals, state-level tender boards, GEM (Government e-Marketplace for India), and enterprise procurement platforms. It applies ICP-aligned keyword filters and category codes to identify relevant tenders. Each matching notice is parsed to extract: issuing organization, procurement category, estimated value, submission deadline, and requirement description. An LLM summarization pass converts dense procurement language into a concise opportunity brief. Alerts are generated for tenders crossing a configurable relevance threshold.',
    pipelineRole:
      'Tender signals represent the highest-certainty intent category in the pipeline — these accounts are not just considering a purchase, they have formalized their intent. This agent feeds the Intent Signal Aggregator with procurement-grade signals that push accounts to the top of the scoring queue. It also triggers direct escalation paths to the Account Prioritization Agent, bypassing standard scoring cycles for time-sensitive tender opportunities with hard submission deadlines.',
  },
  {
    id: 'annual-report-filings-extractor',
    name: 'Annual Report / Filings Extractor',
    description:
      'Pulls capex, digital transformation, and operational priorities from annual reports and regulatory filings.',
    details:
      'Processes PDF annual reports and regulatory filings to extract forward-looking strategic priorities, technology investment commitments, and capital allocation signals.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'coming-soon',
    icon: BookOpen,
    whatItIs:
      "Annual reports and regulatory filings are the most authoritative source of a company's strategic intent — written by leadership, approved by the board, and structured to communicate where capital will flow. The Annual Report / Filings Extractor processes these documents at scale, extracting capex commitments, digital initiative mentions, technology investment themes, and risk factor disclosures that signal where the company is spending and why. It converts dense financial prose into structured intelligence that your sales team can act on.",
    howItWorks:
      "The agent retrieves annual reports, 10-K filings, and earnings call transcripts from regulatory databases and company investor relations pages. Documents are parsed using PDF extraction and OCR where necessary, then segmented into thematic sections (management discussion, capex breakdown, risk factors, strategic initiatives). A Claude Opus reasoning pass extracts: total technology capex mentioned, specific initiative names, vendor mentions, and forward-looking budget signals. Each extraction is tied to a page reference for source verification. Output is a structured intelligence brief per company, tagged by investment theme.",
    pipelineRole:
      "Annual report intelligence provides the deepest, most authoritative intent signal in the pipeline — operating on a slower cadence than news or hiring data but with the highest strategic confidence. This agent's output feeds the Intent Signal Aggregator as a high-weight signal category and is particularly valuable for the Deep Research Agent, which uses filing extracts to build comprehensive account intelligence briefs. It also informs the Meeting Prep Agent, which surfaces relevant filing data as part of pre-call briefings.",
  },
  {
    id: 'deep-research-agent',
    name: 'Deep Research Agent (Intent Layer)',
    description:
      'Converts multi-source research into structured intent triggers with rationale.',
    details:
      'Synthesizes signals from news, filings, hiring, and web research into a coherent account intelligence brief with scored triggers and recommended actions.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'live',
    icon: Search,
    whatItIs:
      "Point-in-time signals are useful. Synthesized intelligence is powerful. The Deep Research Agent is the analytical layer that connects the dots across all intent sources — hiring patterns, news events, filing disclosures, tech stack data, and procurement signals — producing a unified intelligence brief for each high-priority account. It doesn't just aggregate; it reasons. It identifies why an account is showing elevated intent, what the most relevant trigger is, and what action your team should take next. It's the closest thing to a dedicated research analyst that scales infinitely.",
    howItWorks:
      'The agent ingests all available signal data for a target account — structured outputs from the hiring interpreter, news miner, tech stack detector, filings extractor, and tender tracker. It constructs a multi-source evidence set and passes it to Claude Opus with a structured reasoning prompt that asks: what is this company trying to accomplish, why now, and what is the most relevant hook for outreach? The output is a narrative intelligence brief with a headline trigger, supporting evidence, recommended outreach angle, and a confidence-weighted intent score. Briefs are generated on a per-account basis and updated on signal change events.',
    pipelineRole:
      "The Deep Research Agent is the capstone of the intent layer. It receives outputs from every other intent sub-agent and synthesizes them into the account intelligence brief that feeds both the Intent Signal Aggregator (for scoring) and the Multi-Channel Outreach Agent (for personalization). It also populates the Meeting Prep Agent's account snapshot section, ensuring reps enter every call with a full strategic picture of the account's current posture.",
  },
  {
    id: 'intent-signal-aggregator',
    name: 'Intent Signal Aggregator',
    description:
      'Normalizes all intent signals into a weighted intent vector and composite score per account.',
    details:
      'Applies configurable weighting logic to merge hiring, news, tech stack, filing, and tender signals into a single normalized intent score ready for the scoring layer.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'coming-soon',
    icon: Zap,
    whatItIs:
      "Having multiple intent signals is not the same as having a clear picture. Five weak signals in the same direction matter differently than one strong signal alone — and timing determines whether a signal is actionable or stale. The Intent Signal Aggregator is the normalization engine that takes every signal produced by the intent layer and converts them into a single, weighted intent vector per account. It applies decay functions to time-sensitive signals, amplifies corroborating evidence, and produces a composite intent score that the prioritization layer can act on with confidence.",
    howItWorks:
      "All structured signal outputs — hiring classifications, news event records, tech stack detections, procurement notices, filing extracts, and Deep Research briefs — are ingested by the aggregator. Each signal type is assigned a base weight derived from its historical correlation with closed deals in your CRM. Recency decay is applied: a hiring spike from 6 weeks ago contributes less than one from last week. When multiple signal types align on the same account (e.g., hiring + funding + tender), a corroboration multiplier amplifies the composite score. The final output is a normalized 0–100 intent score with a signal breakdown table per account.",
    pipelineRole:
      'The Intent Signal Aggregator is the bridge between the intent layer and the prioritization layer. Its output — the composite intent score — is the primary input to the Predictive Account Scoring model, which combines intent with firmographic fit to produce final account tiers. It is also consumed by the Delta Scorer in the reactivation layer, which tracks how a given account\'s intent vector has shifted since the last sales touch.',
  },

  // ─── ACCOUNT PRIORITIZATION ───────────────────────────────────────────────────
  {
    id: 'predictive-account-scoring',
    name: 'Predictive Account Scoring',
    description:
      'Produces a hybrid account score combining intent signals, firmographic fit, and LLM reasoning.',
    details:
      'Runs a trained XGBoost model augmented with LLM-based reasoning to score and rank accounts by their probability of entering an active buying cycle.',
    stage: 'Account Prioritization',
    stageSlug: 'prioritization',
    status: 'coming-soon',
    icon: BarChart2,
    whatItIs:
      "Not all high-intent accounts are worth pursuing equally — and not all high-fit accounts are showing intent. The Predictive Account Scoring engine resolves this tension by combining two independently valuable signals into a single, calibrated score. It runs a trained gradient boosting model over firmographic fit dimensions and fuses the output with the composite intent vector from the aggregator, then applies an LLM reasoning pass to surface contextual nuances the statistical model may miss. The result is a score that reflects both structural fit and real-time buying posture simultaneously.",
    howItWorks:
      "Enriched account records and intent vectors are passed to an XGBoost classifier trained on your historical CRM data — win/loss patterns, deal velocity, and stage progression rates. The model produces a fit-probability score. This is then fused with the intent score from the aggregator using a configurable weighting formula (default: 60% intent, 40% fit). An LLM reasoning layer reviews edge cases — accounts near the threshold — and applies qualitative adjustments based on contextual signals the model doesn't capture. The final score is normalized, confidence-bounded, and written to the account record.",
    pipelineRole:
      "Predictive Account Scoring is the decision engine of the prioritization layer. It consumes firmographic records from the discovery layer and intent scores from the aggregator, and produces the ranked account list that feeds the Ranking & Explainability Layer and the Account Prioritization Agent. It is also the primary signal consumed by the Prospecting Agent in the reactivation layer to determine when a previously cold account has crossed the threshold for re-engagement.",
  },
  {
    id: 'ranking-explainability-layer',
    name: 'Ranking & Explainability Layer',
    description:
      'Produces human-readable explanations for why each account ranks where it does.',
    details:
      'Translates scoring model outputs into natural language rationale cards showing fit, timing, and urgency drivers behind each account\'s rank.',
    stage: 'Account Prioritization',
    stageSlug: 'prioritization',
    status: 'coming-soon',
    icon: Star,
    whatItIs:
      "A score without an explanation is a number without trust. Sales reps and revenue leaders need to understand why an account is ranked where it is — not just that it scored 84. The Ranking & Explainability Layer converts the mathematical output of the scoring model into plain-language rationale cards that articulate the specific combination of fit, timing, and urgency factors driving each account's position. It's the layer that makes the AI pipeline legible to the humans who have to act on it — and the one that builds lasting trust in AI-assisted prioritization.",
    howItWorks:
      "The agent takes the scored account list and the underlying signal data for each account. For every account, it constructs a structured reasoning prompt that includes the score components, the dominant intent signals, the firmographic fit profile, and the recency of each signal. Claude Opus generates a 3–5 sentence rationale covering: the primary reason for the rank (fit vs. intent-led), the specific trigger that elevated urgency, and any risk or caveat factors that could qualify the score. Rationale cards are attached to each account record and surfaced in the CRM as a custom property or note.",
    pipelineRole:
      "The Ranking & Explainability Layer sits between Predictive Account Scoring and the Account Prioritization Agent, adding the interpretability layer that makes the final tier assignment credible and actionable. Its output is also consumed by the Meeting Prep Agent, which uses the rationale card to help reps understand the strategic context of each account before a call. It feeds directly into rep training and pipeline review workflows.",
  },
  {
    id: 'account-prioritization-agent',
    name: 'Account Prioritization Agent',
    description:
      'Applies final tier assignment (T1/T2/T3) and ordering to the scored account list.',
    details:
      'Converts ranked scores into actionable account tiers, applies business rules, and pushes segmented lists to CRM sequences and outreach workflows.',
    stage: 'Account Prioritization',
    stageSlug: 'prioritization',
    status: 'coming-soon',
    icon: ArrowUpCircle,
    whatItIs:
      "Scores are a continuum; sales execution requires categories. The Account Prioritization Agent converts the ranked, explained account list into three clear tiers — T1 (immediate pursuit), T2 (active nurture), T3 (monitor and hold) — and applies any business rules your team has defined: account ownership caps, geographic routing, product-line alignment, and capacity constraints. It ensures the pipeline your team works from is not just data-accurate but operationally executable — the right accounts in the right hands at the right volume.",
    howItWorks:
      "The agent ingests the ranked, explained account list and applies a configurable tiering logic: T1 accounts are those above a composite score threshold with at least two corroborating intent signals; T2 accounts meet fit criteria but have lower intent recency; T3 accounts are in-ICP but show no current buying signals. Business rules are then applied as a post-processing pass: territory assignments, rep capacity limits, existing opportunity exclusions, and suppression lists. The final tiered list is written to your CRM with tier labels, recommended sequence enrollment, and a routing assignment for each account.",
    pipelineRole:
      "The Account Prioritization Agent is the final step in the prioritization layer and the primary handoff point to the outreach layer. Its T1 output triggers immediate enrollment in the Multi-Channel Outreach Agent's sequence generation workflow. T2 accounts are routed to the Follow-Up Intelligence Agent for nurture cadence management. T3 accounts are handed to the Market Signal Monitor for passive monitoring until intent signals strengthen.",
  },

  // ─── MESSAGING & OUTREACH ────────────────────────────────────────────────────
  {
    id: 'linkedin-msg-generator',
    name: 'LinkedIn Msg Generator',
    description:
      'Writes personalized LinkedIn connection requests and messages using account intelligence.',
    details:
      'Generates high-relevance LinkedIn messages by drawing on intent signals, firmographic context, and contact role to produce outreach that doesn\'t feel automated.',
    stage: 'Messaging & Outreach',
    stageSlug: 'outreach',
    status: 'live',
    icon: MessageSquare,
    whatItIs:
      "Generic outreach is the fastest way to damage your brand with a high-value prospect. The LinkedIn Msg Generator produces personalized, research-grounded messages that reference real signals — a recent funding announcement, a specific technology the company is adopting, or a role they are actively hiring for. Each message is written to the contact's role and seniority level, with a clear hook and a low-friction CTA. It's the difference between a message that gets deleted and one that starts a conversation.",
    howItWorks:
      "The agent receives a contact record with role, seniority, and company context, along with the account's intent signal summary and the Deep Research brief. It constructs a personalization prompt that instructs the LLM to write a LinkedIn message under 300 characters for connection requests (or under 700 for InMails) that leads with the most relevant signal for that specific contact's function. The message avoids product pitches in the first touch, focusing instead on insight or relevance. Tone is calibrated to seniority: direct and peer-level for C-suite, value-led for director-level, problem-led for manager-level.",
    pipelineRole:
      "The LinkedIn Msg Generator is the first outreach execution agent in the pipeline, activated for T1 accounts as soon as the Account Prioritization Agent assigns them. It operates alongside the Multi-Channel Outreach Agent, handling the LinkedIn channel specifically. Its output feeds into the outreach sequence management layer and is tracked for reply rate to continuously improve message templates against real engagement data.",
  },
  {
    id: 'multi-channel-outreach-agent',
    name: 'Multi-Channel Outreach Agent',
    description:
      'Generates coordinated email and LinkedIn message variants with CTA options for each account.',
    details:
      'Produces a complete, multi-touch outreach sequence — email body, LinkedIn message, and follow-up variants — grounded in account-specific intelligence.',
    stage: 'Messaging & Outreach',
    stageSlug: 'outreach',
    status: 'coming-soon',
    icon: Send,
    whatItIs:
      "Single-channel outreach underperforms multi-touch sequences by a wide margin — but producing personalized, non-repetitive messages across email and LinkedIn for dozens of accounts is beyond any human rep's capacity. The Multi-Channel Outreach Agent solves this by generating a complete, coordinated sequence for each account: a cold email with a subject line and three body variants, a LinkedIn connection message, a follow-up email for no-reply scenarios, and a bump message for the third touch. Every piece is anchored in the account's specific intent context.",
    howItWorks:
      "The agent receives the account intelligence brief, the contact's role and function, the tier assignment, and the dominant intent signal category. It generates a sequence plan — touch 1 (LinkedIn connection), touch 2 (email), touch 3 (follow-up email), touch 4 (LinkedIn InMail) — with recommended send intervals. Each message is written with a unique hook drawn from the intent signal set: a news event for touch 1, a hiring pattern for touch 2, a technology displacement angle for touch 3. CTA options are generated at two levels: low-friction (share a resource) and high-intent (book a call).",
    pipelineRole:
      "The Multi-Channel Outreach Agent is the primary content engine for the outreach layer. It operates on T1 and T2 accounts produced by the Account Prioritization Agent, generating the full sequence that reps review, approve, and send. Its output integrates with CRM sales engagement features and email sequencing tools. Engagement metrics from deployed sequences feed back into the scoring model to improve intent-to-message correlation over time.",
  },
  {
    id: 'follow-up-intelligence-agent',
    name: 'Follow-Up Intelligence Agent',
    description:
      'Recommends optimal next-touch timing and next-best message based on engagement signals.',
    details:
      'Analyzes engagement patterns, open and click signals, and account activity to determine when and how to follow up for maximum response probability.',
    stage: 'Messaging & Outreach',
    stageSlug: 'outreach',
    status: 'coming-soon',
    icon: Bell,
    whatItIs:
      "Following up too soon signals desperation. Following up too late loses momentum. Following up with the wrong message at the wrong time wastes both. The Follow-Up Intelligence Agent removes this guesswork by analyzing engagement signals — email opens, link clicks, LinkedIn profile views, and account-level news events — to determine the optimal moment and the most contextually relevant message for each next touch. It turns follow-up from a calendar-driven routine into a signal-driven conversation strategy.",
    howItWorks:
      "The agent monitors engagement events from deployed outreach sequences in real time. When a contact opens an email without replying, it triggers a scoring pass: how long since the open, what did they click on (if anything), and has any new account signal emerged since the last touch? Based on this scoring, it calculates a recommended follow-up window (e.g., 48 hours) and generates a follow-up message variant that references the most recent relevant account signal. For accounts where engagement has dropped to zero, it escalates to the Delta Scorer for signal refresh before recommending the next action.",
    pipelineRole:
      "The Follow-Up Intelligence Agent operates within the active outreach phase, sitting between initial sequence deployment and meeting booking. It receives engagement telemetry from the outreach layer and account signal updates from the monitoring layer. Its recommendations are surfaced as tasks in the rep's CRM workflow and as Slack notifications when time-sensitivity is high. It feeds response data back to the Multi-Channel Outreach Agent for continuous message optimization.",
  },

  // ─── MONITORING & REACTIVATION ───────────────────────────────────────────────
  {
    id: 'market-signal-monitor',
    name: 'Market Signal Monitor',
    description:
      'Continuously watches for news events, hiring spikes, funding announcements, and leadership changes across your account universe.',
    details:
      'Maintains always-on surveillance of account-level market signals, alerting the pipeline when a previously quiet account enters a high-intent state.',
    stage: 'Monitoring & Reactivation',
    stageSlug: 'monitoring',
    status: 'coming-soon',
    icon: Eye,
    whatItIs:
      "Timing is the most undervalued dimension in B2B sales. The right message delivered to an account in steady-state performs a fraction as well as the same message delivered during an organizational inflection point. The Market Signal Monitor runs continuously against your full account universe — not just active pipeline — watching for the triggers that indicate a previously cold account has entered a buying window: a new funding round, a leadership appointment, a major hiring surge, or a strategic news event. It's the always-on intelligence layer that ensures you are never late to a conversation that matters.",
    howItWorks:
      "The agent maintains a persistent monitoring subscription for every account in your universe, regardless of their current pipeline status. It queries news APIs, job boards, funding databases, and company announcement feeds on a rolling cadence. Signal events are classified by type and strength, then compared against each account's historical signal baseline to detect anomalies — a company that normally posts 2 roles per month suddenly posting 15 triggers a surge alert. High-strength signals generate immediate notifications; moderate signals are batched into a daily digest.",
    pipelineRole:
      "The Market Signal Monitor is the always-on layer that activates the reactivation pipeline. When it detects a significant signal change in a T3 (cold) account, it triggers the Prospecting Agent to re-evaluate that account for pipeline re-entry and the Delta Scorer to compute what has changed since the last touch. It also feeds the Company News & Events Miner's historical signal log, creating a complete timeline of every meaningful event for each account.",
  },
  {
    id: 'prospecting-agent',
    name: 'Prospecting Agent',
    description:
      'Automatically adds or re-adds accounts to the active pipeline when intent signals cross a defined threshold.',
    details:
      'Evaluates signal strength against configurable thresholds and triggers CRM account creation, list membership updates, and sequence enrollment for accounts that qualify for re-entry.',
    stage: 'Monitoring & Reactivation',
    stageSlug: 'monitoring',
    status: 'coming-soon',
    icon: RefreshCw,
    whatItIs:
      "Manual list management is the hidden bottleneck of most SDR operations. Accounts fall out of active sequences, signal changes go unnoticed, and the pipeline misses reactivation opportunities that were hiding in plain sight. The Prospecting Agent automates the re-entry decision. When a monitored account crosses a configurable signal threshold — whether it's a funding event, a hiring surge, or a procurement notice — the agent evaluates the account against current ICP criteria and, if it qualifies, automatically re-adds it to the active pipeline with the appropriate tier assignment and sequence trigger.",
    howItWorks:
      "The agent subscribes to alert events from the Market Signal Monitor and the Intent Signal Aggregator. When a signal event arrives, it retrieves the account's current firmographic record, last-touch history, and current intent score. It runs a qualification check against ICP criteria and pipeline policy rules (e.g., minimum days since last touch, no existing open opportunity). If the account passes qualification, it generates a CRM update — creating or re-activating the account record, assigning a tier, and enrolling in the appropriate outreach sequence. A re-entry rationale is logged to the account timeline for rep context.",
    pipelineRole:
      "The Prospecting Agent is the gateway between the monitoring layer and the active pipeline. Its output — re-activated account records with tier assignments — feeds directly into the Account Prioritization Agent for final ordering and into the Multi-Channel Outreach Agent for sequence generation. It closes the loop on accounts that were previously touched but not converted, ensuring no high-quality opportunity ages out of the pipeline permanently.",
  },
  {
    id: 'delta-scorer',
    name: 'Delta Scorer',
    description:
      'Detects what has changed in an account\'s signal profile since the last sales touch and quantifies urgency.',
    details:
      'Computes the signal delta between two points in time for each account, surfacing which specific changes increased or decreased buying intent since last contact.',
    stage: 'Monitoring & Reactivation',
    stageSlug: 'monitoring',
    status: 'coming-soon',
    icon: Activity,
    whatItIs:
      "\"Checking back in\" is the weakest possible follow-up message — and the most common one. It happens when reps don't know what has changed since their last touch. The Delta Scorer answers the question every rep needs before they re-engage: what specifically has changed at this account since we last spoke? It computes the difference between an account's current signal profile and its state at the last touch point, quantifies the urgency created by those changes, and surfaces a structured delta summary that makes follow-up messages specific, relevant, and impossible to ignore.",
    howItWorks:
      "The agent stores a snapshot of each account's signal state at the time of every sales touch — intent score, dominant signals, active job postings, recent news events. When re-engagement is triggered, it retrieves the historical snapshot and runs a diff against the current signal state. Changes are categorized: new signals added (positive delta), signals expired (negative delta), and signal category shifts (e.g., from hiring intent to procurement intent). The output is a structured delta record: a headline change statement, a list of specific signal changes with timestamps, and an urgency score derived from the magnitude and recency of the delta.",
    pipelineRole:
      "The Delta Scorer operates in the monitoring layer and feeds two downstream agents. The Reactivation Message Builder uses the delta record as the core input for crafting re-engagement messages that reference specific, real changes at the account. The Follow-Up Intelligence Agent uses the urgency score to determine optimal re-engagement timing. Together, these three agents form the reactivation engine that converts cold pipeline into active opportunity.",
  },
  {
    id: 'reactivation-message-builder',
    name: 'Reactivation Message Builder',
    description:
      'Generates re-engagement messages anchored in the specific changes detected at a previously cold account.',
    details:
      'Uses the Delta Scorer\'s output to craft personalized reactivation messages that reference what has changed, why it\'s relevant, and why now is the right moment to reconnect.',
    stage: 'Monitoring & Reactivation',
    stageSlug: 'monitoring',
    status: 'coming-soon',
    icon: MailOpen,
    whatItIs:
      'Most reactivation attempts fail because they are generic — a "touching base" note that gives the prospect no reason to respond differently than they did the first time. The Reactivation Message Builder makes this failure impossible by grounding every re-engagement message in specific, observable changes at the account. It uses the Delta Scorer\'s record of what changed — a new funding round, a leadership appointment, a shift in hiring patterns — to construct a message that demonstrates real awareness of the account\'s current situation. The result is outreach that feels like a timely, informed call rather than a recycled sequence.',
    howItWorks:
      "The agent receives the delta record from the Delta Scorer, the account's historical touch log, and the contact's current role. It constructs a message brief: lead with the most significant change detected, connect it to the value your product delivers in that context, and propose a specific and low-friction next step. Messages are written at two lengths — short-form for LinkedIn (under 500 characters) and long-form for email — with subject line variants for A/B testing. The tone is calibrated to avoid sounding presumptuous about the contact's situation while still demonstrating specific knowledge of it.",
    pipelineRole:
      "The Reactivation Message Builder is the final step in the reactivation pipeline, operating after the Market Signal Monitor has detected a signal change, the Delta Scorer has quantified it, and the Prospecting Agent has re-activated the account. Its output flows directly into the rep's task queue or outreach sequence as a ready-to-send message, requiring only review and approval before deployment. Engagement with reactivation messages is tracked as a high-quality signal by the Follow-Up Intelligence Agent.",
  },

  // ─── MEETING CONVERSION ───────────────────────────────────────────────────────
  {
    id: 'meeting-prep-agent',
    name: 'Meeting Prep Agent',
    description:
      'Generates comprehensive pre-call briefings with account snapshot, agenda, and tailored talking points.',
    details:
      'Synthesizes account intelligence, intent signals, CRM history, and contact profiles into a structured call brief that prepares reps for high-quality discovery conversations.',
    stage: 'Meeting Conversion',
    stageSlug: 'meeting',
    status: 'coming-soon',
    icon: FileText,
    whatItIs:
      "Walking into a meeting unprepared in a competitive deal is not a risk — it's a concession. The Meeting Prep Agent ensures every rep enters every call fully briefed: a structured account snapshot, the specific intent signals that created the meeting, a suggested agenda, tailored talking points for each decision-maker on the call, and open questions designed to advance discovery. It compresses what used to take 45 minutes of manual research into a clean, actionable brief delivered before the calendar invite fires.",
    howItWorks:
      "When a meeting is logged or calendar event detected for a target account, the agent retrieves all available intelligence: the Deep Research brief, the account's scoring rationale card, CRM interaction history, and the contact profiles of meeting attendees. It generates a structured brief with five sections: company snapshot (key firmographics + recent changes), intent context (why they are likely in the market now), contact profiles (role, background, likely priorities), suggested agenda (3–5 points with time allocation), and talking points (one per agenda item, grounded in the account's specific context). The brief is delivered as a formatted document and as a CRM note.",
    pipelineRole:
      "The Meeting Prep Agent is the first agent in the meeting conversion layer, sitting downstream of the prioritization and outreach layers. It consumes outputs from the Deep Research Agent, Ranking & Explainability Layer, and Firmographic Enricher to produce the briefing. After the meeting, it passes the agenda structure to the Conversation Intelligence Agent, which uses it to align transcript extraction against the planned discussion points.",
  },
  {
    id: 'conversation-intelligence-agent',
    name: 'Conversation Intelligence Agent',
    description:
      'Transcribes calls and extracts structured insights — objections, commitments, next steps, and sentiment.',
    details:
      'Processes call recordings through transcription and LLM-based analysis to surface what was said, what was agreed, and what the rep should do next.',
    stage: 'Meeting Conversion',
    stageSlug: 'meeting',
    status: 'coming-soon',
    icon: Mic,
    whatItIs:
      "Critical information from sales calls — buyer objections, verbal commitments, pain points, and next steps — routinely disappears between the call and the CRM update. The Conversation Intelligence Agent makes this loss impossible. It transcribes every call, aligns the transcript to the meeting agenda, and extracts structured insights: what objections were raised and how they were handled, what commitments were made by both sides, what the agreed next step is, and the overall buyer sentiment profile. It turns every conversation into a structured data asset the entire revenue team can act on.",
    howItWorks:
      "Call audio is processed through a high-accuracy transcription pipeline. The transcript is segmented by speaker and aligned against the meeting agenda from the Meeting Prep Agent. An LLM extraction pass runs four parallel analyses: objection detection (identifying resistance signals and the context around them), commitment extraction (identifying explicit agreements and their conditions), next-step identification (pinpointing the specific action and owner agreed at close), and sentiment scoring (mapping emotional tone across the call arc). All extractions are structured and written to the account record in the CRM within minutes of call completion.",
    pipelineRole:
      "The Conversation Intelligence Agent sits at the center of the meeting conversion layer, receiving input from the Meeting Prep Agent's agenda and producing structured outputs for the Knowledge Extraction Agent. Its commitment and next-step extractions trigger CRM task creation and follow-up sequence enrollment automatically. Objection patterns are aggregated across accounts and fed back to the Multi-Channel Outreach Agent to improve pre-call messaging.",
  },
  {
    id: 'knowledge-extraction-agent',
    name: 'Knowledge Extraction Agent',
    description:
      'Converts call notes and transcripts into structured CRM records, learnings, and follow-up actions.',
    details:
      'Transforms raw call intelligence into organized CRM data: updated contact properties, deal stage notes, strategic learnings, and automated follow-up task creation.',
    stage: 'Meeting Conversion',
    stageSlug: 'meeting',
    status: 'coming-soon',
    icon: Database,
    whatItIs:
      "The information captured in a sales conversation has a very short half-life if it's not structured and stored immediately. The Knowledge Extraction Agent is the post-call processing layer that converts the Conversation Intelligence Agent's raw extractions into permanent, structured CRM assets. It updates contact and deal records, creates follow-up tasks with due dates, logs strategic learnings to the account timeline, and generates a post-call summary that is automatically shared with the account owner. It closes the gap between what was learned in the call and what the organization actually retains.",
    howItWorks:
      "The agent receives the structured extractions from the Conversation Intelligence Agent — commitments, objections, next steps, and sentiment data. It maps each extraction to the appropriate CRM object: contact property updates (role clarity, tech stack confirmed), deal notes (stage-relevant observations), activity log entries (what was discussed, what was decided), and task creation (next-step owner, due date, description). Strategic learnings — insights about the buyer's process, budget cycle, or competitive situation — are tagged and added to the account's intelligence layer, where they can inform future Deep Research briefs.",
    pipelineRole:
      "The Knowledge Extraction Agent is the final step in the meeting conversion layer and the primary feedback loop back into the intelligence layer. Its CRM updates ensure the account's profile reflects the most current qualitative intelligence. Its strategic learnings feed back into the Deep Research Agent's context set, improving the quality of future account briefs. It also triggers the Follow-Up Intelligence Agent to begin monitoring for post-call engagement signals.",
  },

  // ─── OPS ─────────────────────────────────────────────────────────────────────
  {
    id: 'sheet-formatter-agent',
    name: 'Sheet Formatter Agent',
    description:
      'Cleans, restructures, and standardizes spreadsheet data for downstream pipeline consumption.',
    details:
      'Applies intelligent formatting rules to raw sheets — fixing headers, normalizing values, removing junk rows, and ensuring structural consistency for data processing.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: TableProperties,
    whatItIs:
      "Every pipeline breaks on bad data eventually. The Sheet Formatter Agent is the structural integrity check that ensures every spreadsheet entering the LeadStrategus pipeline meets the schema requirements of downstream agents. It handles the messiness of real-world data: inconsistent column naming, mixed date formats, trailing whitespace, merged cells, and rogue header rows. It's not just a cleaner — it's a schema enforcer that makes every file downstream-ready before it touches a processing agent.",
    howItWorks:
      "The agent ingests the raw sheet and runs a structural analysis pass: detecting header rows, identifying column semantics from content patterns, flagging anomalies (empty columns, all-null rows, inconsistent value formats). It then applies a transformation plan: renaming columns to match the canonical schema, converting date formats, stripping whitespace, removing formula artifacts, and reordering columns. A validation report is generated listing every transformation applied and every anomaly flagged for human review. The cleaned sheet is written to a new output file alongside the transformation log.",
    pipelineRole:
      "The Sheet Formatter Agent operates at the entry point of the Ops layer, processing any externally sourced data before it enters the pipeline. It feeds cleaned, schema-compliant data to the Data Normalisation Agent and the Deduplication Agent. It also acts as a pre-processing step for the CRM Update Agent, ensuring that bulk CRM uploads don't fail on formatting inconsistencies.",
  },
  {
    id: 'data-normalisation-agent',
    name: 'Data Normalisation Agent',
    description:
      'Standardizes company names, contact fields, domains, and identifiers across all data sources.',
    details:
      'Resolves naming variations, normalizes jurisdictional formats, and applies canonical identifiers to ensure data consistency across the pipeline.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: AlignJustify,
    whatItIs:
      "\"Accenture\", \"Accenture PLC\", \"Accenture India Pvt Ltd\", and \"accenture.com\" are the same company — but a naive database treats them as four distinct records. The Data Normalisation Agent resolves these fragmentation issues at scale, applying intelligent entity resolution to standardize company names, domains, contact name formats, phone number structures, and geographic identifiers across every data source in the pipeline. It's the invisible layer that makes deduplication, enrichment, and CRM sync reliable.",
    howItWorks:
      "Each record is passed through a multi-step normalization pipeline. Company names are resolved against a canonical entity graph using fuzzy matching and domain anchoring — the domain is the primary identifier when available. Contact names are parsed into structured components (first, last, suffix). Phone numbers are normalized to E.164 format with country code inference from geographic fields. Geographic data is standardized to ISO country and state codes. Industry classifications are mapped to a canonical taxonomy. The normalized record is written with a normalization confidence score and a list of transformations applied.",
    pipelineRole:
      "The Data Normalisation Agent runs after the Sheet Formatter Agent and before the Deduplication Agent. Without normalization, deduplication produces false negatives — treating the same company as multiple records because their names differ by a word. Normalized records also improve Firmographic Enricher match rates significantly. The agent's output feeds every downstream system: the CRM Update Agent, the Intent Signal Aggregator, and the scoring model.",
  },
  {
    id: 'deduplication-agent',
    name: 'Deduplication Agent',
    description:
      'Identifies and merges duplicate company and contact records across all pipeline data sources.',
    details:
      'Applies multi-signal entity matching to detect duplicates — including near-matches — and produces a deduplicated master record set.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'live',
    icon: Files,
    whatItIs:
      "Duplicates in a B2B pipeline are not just a data quality problem — they're a revenue problem. A rep who works two records of the same company wastes capacity. A scoring model that sees the same company twice inflates that company's apparent signal density. The Deduplication Agent uses multi-signal entity matching to identify duplicates across all sources — including near-duplicates that differ only in name variant, subsidiary naming, or domain suffix — and produces a clean master record set that every downstream agent can trust.",
    howItWorks:
      "The agent applies a three-pass matching strategy. First, exact domain matching identifies records that clearly represent the same entity. Second, fuzzy name matching with Levenshtein distance and token overlap catches name variants (\"IBM\" vs \"International Business Machines\"). Third, LLM-assisted disambiguation resolves edge cases: subsidiaries, acquired companies, and regional entities that share a parent domain but are operationally distinct. For each detected duplicate cluster, a master record is elected based on data completeness, and the duplicate records are merged into it with a full provenance log. Merge decisions are surfaced for human review above a configurable confidence threshold.",
    pipelineRole:
      "The Deduplication Agent runs after data normalization and before any enrichment or scoring step. It ensures the Firmographic Enricher processes unique entities, the intent scoring model doesn't double-count signals, and the CRM Update Agent doesn't create duplicate records. It is the data integrity foundation that every other agent in the pipeline depends on implicitly.",
  },
  {
    id: 'list-quality-checker-agent',
    name: 'List Quality Checker Agent',
    description:
      'Flags missing required fields, low-confidence values, and structural inconsistencies in account lists.',
    details:
      'Runs a systematic quality audit against every account list, producing a field-level quality report and a pass/fail assessment for downstream processing.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: CheckSquare,
    whatItIs:
      "A list that reaches the scoring model missing half its required fields will produce unreliable scores — and the problem won't be obvious until a rep calls an account that was never a real prospect. The List Quality Checker Agent catches these issues before they propagate. It audits every account list against a configurable quality schema, flagging records with missing required fields, suspiciously uniform values, invalid formats, and low-confidence enrichment scores. It produces a field-level quality report that tells you exactly where the data is weak and whether the list is ready for downstream processing.",
    howItWorks:
      "The agent loads the account list and runs a four-layer quality audit. Layer 1: completeness check — every required field is present and non-null. Layer 2: validity check — values conform to expected formats (valid domain, valid phone format, recognized country code). Layer 3: consistency check — cross-field logic holds (e.g., headcount band matches revenue range). Layer 4: confidence check — enriched fields from external sources meet a minimum confidence score threshold. Each failing record is annotated with the specific quality issues detected. The output includes an overall quality score for the list, a row-level annotation file, and a summary report by field and issue type.",
    pipelineRole:
      "The List Quality Checker Agent is the quality gate that sits between the normalization/enrichment steps and the scoring and outreach layers. Lists that fail the quality check are returned to the Sheet Formatter or Data Normalisation Agent for remediation. Only lists that pass the quality gate are forwarded to the Firmographic Enricher and Intent Signal Aggregator. It prevents low-quality data from contaminating the scoring model and producing misleading tier assignments.",
  },
  {
    id: 'crm-update-agent',
    name: 'CRM Update Agent',
    description:
      'Pushes structured pipeline outputs — account records, scores, notes, and tasks — to your CRM.',
    details:
      'Maps pipeline agent outputs to CRM objects and field schemas, performing creates, updates, and merges with full conflict resolution logic.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: UploadCloud,
    whatItIs:
      "Intelligence that stays in the pipeline and never reaches the CRM has zero value to the sales team. The CRM Update Agent is the integration layer that ensures every output from the LeadStrategus pipeline — enriched account records, intent scores, tier assignments, rationale cards, meeting notes, and follow-up tasks — is written to your CRM in the right object, the right field, and the right format. It handles the full complexity of CRM data management: creates vs. updates, merge conflict resolution, field mapping, and custom property management.",
    howItWorks:
      "The agent receives structured output records from upstream agents and maps them to the target CRM's object schema — companies, contacts, deals, activities, tasks, and custom objects. For each record, it performs a lookup to determine whether to create, update, or merge. Conflict resolution logic handles cases where the CRM already contains a value that differs from the pipeline output: it applies a priority rule (pipeline data wins for intent fields; CRM wins for manually entered fields) and logs all overrides. API calls are batched for efficiency and rate-limit compliance. A write log is generated for every operation.",
    pipelineRole:
      "The CRM Update Agent is the final delivery mechanism for every agent in the pipeline that produces structured account or contact data. It sits at the output end of the Ops layer and serves as the integration bridge to HubSpot, Salesforce, or any other CRM in your stack. Its success rate and write log are monitored to detect upstream data quality issues, making it an indirect quality signal for the entire pipeline.",
  },
  {
    id: 'report-generator-agent',
    name: 'Report Generator Agent',
    description:
      'Converts pipeline sheets and CRM data into executive-ready insights summaries.',
    details:
      'Processes pipeline performance data, account activity logs, and intent signal trends to produce structured reports with narrative summaries and key metrics.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: PieChart,
    whatItIs:
      "Pipeline data that lives in spreadsheets and CRM dashboards doesn't communicate — it waits. The Report Generator Agent converts raw pipeline data into executive-ready intelligence reports: account coverage summaries, intent signal trend analyses, tier distribution breakdowns, and outreach performance reviews. It's the layer that makes the LeadStrategus pipeline legible to revenue leaders, board members, and GTM strategy teams who need insight, not raw data.",
    howItWorks:
      "The agent ingests pipeline data from specified sources — account lists, scoring outputs, outreach engagement logs, and CRM activity records — and applies a configurable report template. A Claude Opus synthesis pass reads the structured data and generates a narrative summary section that interprets the key metrics in plain language: what changed this week, what the top accounts have in common, and where the pipeline has gaps. Charts and tables are generated from the raw data and embedded in the report. Output formats include a Slack-ready digest, a formatted Google Doc, and a structured JSON payload for CRM embedding.",
    pipelineRole:
      "The Report Generator Agent is the observability layer of the entire LeadStrategus pipeline. It consumes outputs from every other layer — discovery throughput, intent signal volumes, scoring distributions, outreach performance, and meeting conversion rates — and surfaces the patterns that inform GTM strategy decisions. It runs on a configurable cadence (daily, weekly, monthly) and is the primary interface between the AI pipeline and the revenue leadership team.",
  },
  {
    id: 'image-text-extractor',
    name: 'Image Text Extractor',
    description:
      'Extracts structured data from screenshots, images, and scanned documents into row-based records.',
    details:
      'Uses vision models to interpret image content — tables, business cards, screenshots — and converts them into structured, pipeline-ready data rows.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'live',
    icon: ImageIcon,
    whatItIs:
      "Valuable prospect data doesn't always arrive in structured formats. Conference attendee lists come as PDFs. Org charts are shared as screenshots. Business card photos sit in a sales rep's camera roll. The Image Text Extractor handles all of these cases, using vision AI to interpret image content and convert it into clean, structured data rows. It bridges the gap between the analog world where prospect data often lives and the digital pipeline where it needs to operate.",
    howItWorks:
      "The agent accepts image inputs — PNG, JPEG, PDF page renders, and screenshots — and passes them to a vision model with a structured extraction prompt. The model identifies the content type (table, list, form, business card, document) and applies the appropriate extraction schema. For tabular data, it reconstructs column headers and row values. For business cards, it extracts name, title, company, email, and phone. For documents, it extracts relevant fields per a configurable template. Output is written as structured rows to a spreadsheet or JSON, with a confidence score per extracted field and a flagging system for low-confidence extractions requiring human review.",
    pipelineRole:
      "The Image Text Extractor feeds the Ops layer's normalization and quality pipeline. Extracted records flow into the Data Normalisation Agent and Deduplication Agent before entering the main pipeline as account or contact records. It is particularly valuable in field sales and event-driven prospecting contexts, where prospect data is captured informally and needs to be converted into pipeline-ready records rapidly.",
  },
];

export function getAgentById(id: string): Agent | undefined {
  return allAgents.find((a) => a.id === id);
}

export function getAgentsByStage(stageSlug: string): Agent[] {
  return allAgents.filter((a) => a.stageSlug === stageSlug);
}
