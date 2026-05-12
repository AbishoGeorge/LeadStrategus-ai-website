{/*
import {
  Search, Globe, Building2, Briefcase, Users, Brain, Cpu,
  Newspaper, FileText, TrendingUp, BarChart3, Target,
  MessageSquare, Mail, RefreshCw, Eye, Activity, Zap,
  Calendar, Headphones, BookOpen, Table, Database, Copy,
  CheckCircle, RotateCcw, Send, Image, ClipboardList, Shield
} from 'lucide-react';
import type { ComponentType } from 'react';

export type AgentStatus = 'live' | 'coming-soon';

export interface Agent {
  id: string;
  name: string;
  description: string;
  stage: string;
  stageSlug: string;
  status: AgentStatus;
  icon: ComponentType<{ className?: string }>;
  details: string;
}

export interface FunnelStage {
  name: string;
  slug: string;
  agents: Agent[];
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const funnelStages: FunnelStage[] = [
  {
    name: 'Account Discovery & List Building',
    slug: 'account-discovery',
    agents: [
      { id: slug('LinkedIn Sales Nav Scraper'), name: 'LinkedIn Sales Nav Scraper', description: 'Extract targeted lead lists from LinkedIn Sales Navigator with precision filters.', stage: 'Account Discovery & List Building', stageSlug: 'account-discovery', status: 'live', icon: Search, details: 'Automatically scrape and structure lead data from LinkedIn Sales Navigator. Filter by industry, company size, geography, seniority, and more. Get clean, enriched contact lists ready for outreach.' },
      { id: slug('Google Scraper Lead Gen'), name: 'Google Scraper Lead Gen', description: 'Discover prospects through intelligent Google search patterns and data extraction.', stage: 'Account Discovery & List Building', stageSlug: 'account-discovery', status: 'live', icon: Globe, details: 'Leverage advanced Google search operators to find companies, decision-makers, and contact information. Combines search intelligence with data enrichment for comprehensive lead generation.' },
      { id: slug('Firmographic Enricher'), name: 'Firmographic Enricher', description: 'Enrich company data with firmographic details: size, revenue, tech stack, and more.', stage: 'Account Discovery & List Building', stageSlug: 'account-discovery', status: 'coming-soon', icon: Building2, details: 'Automatically enrich your account lists with detailed firmographic data including employee count, annual revenue, industry classification, headquarters location, and technology stack.' },
    ],
  },
  {
    name: 'Buying Intent Build',
    slug: 'buying-intent',
    agents: [
      { id: slug('LinkedIn Job Scraper'), name: 'LinkedIn Job Scraper', description: 'Track hiring signals that indicate buying intent from LinkedIn job postings.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'live', icon: Briefcase, details: 'Monitor LinkedIn job postings in real-time to identify companies hiring for roles that signal buying intent. Detect expansion, new initiatives, and technology adoption through hiring patterns.' },
      { id: slug('Naukri Job Scraper'), name: 'Naukri Job Scraper', description: 'Monitor Indian market hiring signals from Naukri, the signal every international tool misses.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'live', icon: Users, details: 'Track hiring activity on Naukri to identify Indian companies with active expansion plans. Perfect for B2B teams targeting the Indian market with precision timing.' },
      { id: slug('Hiring Intent Interpreter'), name: 'Hiring Intent Interpreter', description: 'Analyse hiring patterns to score and interpret buying signals across 12 validated intent categories.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'coming-soon', icon: Brain, details: 'AI-powered analysis of hiring data to interpret what job postings reveal about a company\'s buying intent, budget allocation, and strategic priorities.' },
      { id: slug('Tech Stack Detector'), name: 'Tech Stack Detector', description: 'Identify the technology stack of target companies for sharper, context-specific targeting.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'coming-soon', icon: Cpu, details: 'Detect technologies used by prospect companies through website analysis, job postings, and public data. Know exactly what tools they use to position your product effectively.' },
      { id: slug('Company News & Events Miner'), name: 'Company News & Events Miner', description: 'Surface company news, funding rounds, leadership changes, and events that signal opportunity.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'coming-soon', icon: Newspaper, details: 'Continuously monitor news sources, press releases, and event listings to identify trigger events like funding rounds, executive changes, partnerships, and market expansion.' },
      { id: slug('Tender Procurement Tracker'), name: 'Tender / Procurement Tracker', description: 'Track government and enterprise tenders across GeM, CPPP, state portals, and PSU boards.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'coming-soon', icon: FileText, details: 'Monitor tender portals and procurement announcements to find active buying opportunities. Get alerts when relevant RFPs and tenders are published.' },
      { id: slug('Annual Report Extractor'), name: 'Annual Report Extractor', description: 'Extract strategic priorities and budget signals from annual reports.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'coming-soon', icon: ClipboardList, details: 'AI-powered extraction of key insights from annual reports including strategic initiatives, budget allocations, technology investments, and growth plans.' },
      { id: slug('Deep Research Agent'), name: 'Deep Research Agent', description: 'Conduct deep research on target accounts using multiple real-market data sources.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'live', icon: Search, details: 'Comprehensive account research combining web data, news, financials, and social signals. Get a 360-degree view of any target account in minutes instead of hours.' },
      { id: slug('Intent Signal Aggregator'), name: 'Intent Signal Aggregator', description: 'Combine all intent signals into a unified buying readiness score per account.', stage: 'Buying Intent Build', stageSlug: 'buying-intent', status: 'coming-soon', icon: TrendingUp, details: 'Aggregate signals from hiring, news, technology adoption, and engagement data into a single intent score. Prioritize accounts most likely to buy right now.' },
    ],
  },
  {
    name: 'Account Prioritization',
    slug: 'account-prioritization',
    agents: [
      { id: slug('Predictive Account Scoring'), name: 'Predictive Account Scoring', description: 'Score accounts based on fit, intent, and likelihood to convert, with explainable logic.', stage: 'Account Prioritization', stageSlug: 'account-prioritization', status: 'coming-soon', icon: BarChart3, details: 'Machine learning models that score accounts based on ideal customer profile fit, intent signals, engagement history, and conversion probability.' },
      { id: slug('Ranking & Explainability'), name: 'Ranking & Explainability', description: 'Rank accounts with transparent, explainable scoring logic your team can act on.', stage: 'Account Prioritization', stageSlug: 'account-prioritization', status: 'coming-soon', icon: Target, details: 'Not just scores but explanations. Understand exactly why an account is ranked high or low, which signals contributed, and what actions to take next.' },
      { id: slug('Account Prioritization Agent'), name: 'Account Prioritization Agent', description: 'Automatically surface the 50 accounts worth working this week, based on real-time signals.', stage: 'Account Prioritization', stageSlug: 'account-prioritization', status: 'coming-soon', icon: TrendingUp, details: 'End-to-end account prioritization that combines scoring, ranking, and real-time signal updates to keep your pipeline always sorted by opportunity.' },
    ],
  },
  {
    name: 'Messaging & Outreach',
    slug: 'messaging-outreach',
    agents: [
      { id: slug('LinkedIn Message Generator'), name: 'LinkedIn Message Generator', description: 'Generate personalised LinkedIn messages grounded in the specific signal that triggered the account.', stage: 'Messaging & Outreach', stageSlug: 'messaging-outreach', status: 'live', icon: MessageSquare, details: 'AI-generated LinkedIn messages tailored to each prospect based on their profile, company, and intent signals. Achieve higher response rates with hyper-personalization.' },
      { id: slug('Multi-Channel Outreach Agent'), name: 'Multi-Channel Outreach Agent', description: 'Orchestrate outreach across email, LinkedIn, and other channels, from one connected queue.', stage: 'Messaging & Outreach', stageSlug: 'messaging-outreach', status: 'coming-soon', icon: Mail, details: 'Coordinate messaging across multiple channels with optimal timing and sequencing. Manage multi-touch campaigns that feel personal at scale.' },
      { id: slug('Follow-Up Intelligence Agent'), name: 'Follow-Up Intelligence Agent', description: 'Smart follow-ups based on prospect engagement signals and optimal timing.', stage: 'Messaging & Outreach', stageSlug: 'messaging-outreach', status: 'coming-soon', icon: RefreshCw, details: 'Intelligent follow-up scheduling based on prospect behavior, email opens, LinkedIn activity, and optimal timing windows. Never miss the right moment to re-engage.' },
    ],
  },
  {
    name: 'Monitoring & Reactivation',
    slug: 'monitoring-reactivation',
    agents: [
      { id: slug('Market Signal Monitor'), name: 'Market Signal Monitor', description: 'Continuously monitor your target market for buying signals as they emerge.', stage: 'Monitoring & Reactivation', stageSlug: 'monitoring-reactivation', status: 'coming-soon', icon: Eye, details: 'Always-on monitoring of market signals, competitor moves, and industry trends. Get alerted when conditions change for your target accounts.' },
      { id: slug('Prospecting Agent'), name: 'Prospecting Agent', description: 'Identify and qualify new opportunities from fresh signals, without manual searching.', stage: 'Monitoring & Reactivation', stageSlug: 'monitoring-reactivation', status: 'coming-soon', icon: Activity, details: 'Continuous prospecting agent that identifies new accounts matching your ICP, qualifies them against intent signals, and adds them to your pipeline automatically.' },
      { id: slug('Delta Scorer'), name: 'Delta Scorer', description: 'Track score changes over time to spot accounts heating up before your competitors do.', stage: 'Monitoring & Reactivation', stageSlug: 'monitoring-reactivation', status: 'coming-soon', icon: Zap, details: 'Monitor how account scores change over time. Identify accounts that are rapidly heating up or cooling down so you can adjust your approach accordingly.' },
      { id: slug('Reactivation Message Builder'), name: 'Reactivation Message Builder', description: 'Re-engage dormant accounts with context-aware messaging tied to new signals.', stage: 'Monitoring & Reactivation', stageSlug: 'monitoring-reactivation', status: 'coming-soon', icon: Send, details: 'Generate reactivation messages for dormant accounts based on new trigger events, updated intent signals, or changed circumstances. Bring cold accounts back to life.' },
    ],
  },
  {
    name: 'Meeting Conversion',
    slug: 'meeting-conversion',
    agents: [
      { id: slug('Meeting Prep Agent'), name: 'Meeting Prep Agent', description: 'Comprehensive meeting briefs with account context, signal history, and talking points.', stage: 'Meeting Conversion', stageSlug: 'meeting-conversion', status: 'coming-soon', icon: Calendar, details: 'Auto-generate detailed meeting briefs including account background, recent signals, mutual connections, competitive landscape, and recommended talking points.' },
      { id: slug('Conversation Intelligence Agent'), name: 'Conversation Intelligence Agent', description: 'Analyse meeting conversations for insights, objections, and next steps.', stage: 'Meeting Conversion', stageSlug: 'meeting-conversion', status: 'coming-soon', icon: Headphones, details: 'AI analysis of meeting transcripts to extract key insights, action items, objections, and buying signals. Improve your conversion rate with data-driven conversation optimization.' },
      { id: slug('Knowledge Extraction Agent'), name: 'Knowledge Extraction Agent', description: 'Extract and structure intelligence from meetings, calls, and documents.', stage: 'Meeting Conversion', stageSlug: 'meeting-conversion', status: 'coming-soon', icon: BookOpen, details: 'Automatically extract, categorize, and store insights from meetings, calls, and documents. Build a growing knowledge base that makes your team smarter over time.' },
    ],
  },
  {
    name: 'Data & Ops',
    slug: 'data-ops',
    agents: [
      { id: slug('Sheet Formatter Agent'), name: 'Sheet Formatter Agent', description: 'Auto-format and standardize messy spreadsheet data.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'coming-soon', icon: Table, details: 'Clean up messy spreadsheets automatically. Standardize formats, fix inconsistencies, and structure data for easy import into your CRM or outreach tools.' },
      { id: slug('Data Normalisation Agent'), name: 'Data Normalisation Agent', description: 'Normalize data formats across different sources and systems.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'coming-soon', icon: Database, details: 'Unify data from multiple sources into consistent formats. Handle company name variations, address standardization, phone number formatting, and more.' },
      { id: slug('Deduplication Agent'), name: 'Deduplication Agent', description: 'Find and merge duplicate records across your data.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'live', icon: Copy, details: 'Intelligent deduplication that identifies duplicate records using fuzzy matching and merge logic. Keep your database clean without losing important data.' },
      { id: slug('List Quality Checker'), name: 'List Quality Checker', description: 'Validate and score the quality of your lead lists.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'coming-soon', icon: CheckCircle, details: 'Comprehensive quality checks for your lead lists including email validation, data completeness scoring, freshness assessment, and enrichment recommendations.' },
      { id: slug('CRM Update Agent'), name: 'CRM Update Agent', description: 'Keep your CRM updated with the latest account intelligence and signal data.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'coming-soon', icon: RotateCcw, details: 'Automatically push enriched data, intent signals, and account updates back to your CRM. Keep your source of truth always current without manual data entry.' },
      { id: slug('Report Generator Agent'), name: 'Report Generator Agent', description: 'Generate pipeline and performance reports automatically.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'coming-soon', icon: Shield, details: 'Automated reporting on pipeline health, agent performance, signal trends, and outreach effectiveness. Get insights without building dashboards.' },
      { id: slug('Image Text Extractor'), name: 'Image Text Extractor', description: 'Extract text and data from images and screenshots.', stage: 'Data & Ops', stageSlug: 'data-ops', status: 'live', icon: Image, details: 'OCR-powered extraction of text, tables, and data from images, screenshots, and scanned documents. Convert visual information into structured, usable data.' },
    ],
  },
];

export const allAgents: Agent[] = funnelStages.flatMap((stage) => stage.agents);

export function getAgentById(id: string): Agent | undefined {
  return allAgents.find((a) => a.id === id);
}

export function getAgentsByStage(stageSlug: string): Agent[] {
  const stage = funnelStages.find((s) => s.slug === stageSlug);
  return stage ? stage.agents : [];
}

export function getLiveAgents(): Agent[] {
  return allAgents.filter((a) => a.status === 'live');
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
  marketplaceUrl?: string;
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
  // ACCOUNT DISCOVERY
  {
    id: 'linkedin-sales-nav-scraper',
    name: 'LinkedIn Sales Nav Scraper',
    description:
      'Pulls targeted company lists from LinkedIn Sales Navigator using geo, revenue, industry, and headcount filters.',
    details:
      'Applies layered Sales Navigator filters to extract high-precision company lists, feeding them directly into your enrichment and intent pipeline.',
    stage: 'Account Discovery',
    stageSlug: 'discovery',
    status: 'coming-soon',
    icon: Users,
    whatItIs:
      'Most prospecting time is wasted on accounts that were never a fit. This agent connects to LinkedIn Sales Navigator and extracts company lists that match your ICP precisely, filtered by geography, headcount, revenue, and industry. No manual browsing. No copy-paste.',
    howItWorks:
      'You define ICP parameters. The agent applies them as compound filters inside Sales Navigator. It traverses results page by page, extracting company name, domain, headcount, location, and LinkedIn URL. Duplicates are removed in real time. Output is a normalized, schema-ready account list. Every run is logged with its filter config so lists are fully reproducible.',
    pipelineRole:
      'Sits at the top of the funnel as the raw universe builder. Feeds directly into the Firmographic Enricher. Nothing downstream runs until this agent produces a clean, in-scope account list.',
  },
  {
    id: 'google-scraper-lead-gen',
    name: 'Google Map Scraper Lead Gen',
    description:
      'Finds companies from web queries and directories when Sales Navigator coverage falls short.',
    details:
      'Executes structured Google Map search queries against industry directories, news sources, and company listings to surface accounts that Sales Nav misses.',
    stage: 'Account Discovery',
    stageSlug: 'discovery',
    status: 'live',
    marketplaceUrl: 'https://console.apify.com/actors/tZLuX3GXDQz1wzdod',
    icon: Globe,
    whatItIs:
      'LinkedIn misses mid-market and emerging companies with thin profiles. This agent treats the open web as a lead source, querying directories, trade publications, and government registries to surface ICP-matched accounts that standard database tools overlook.',
    howItWorks:
      'ICP descriptors are converted into structured Google Map search queries. The agent fetches results, parses organic listings, and runs entity extraction to pull company names, domains, and metadata. Each result is scored for ICP relevance before being written to the output schema. Duplicates are resolved against the existing account universe.',
    pipelineRole:
      'Runs in parallel with the LinkedIn Sales Nav Scraper as a complementary discovery source. Output is merged and deduplicated into the master account list before flowing into the Firmographic Enricher. Closes blind spots caused by Sales Nav coverage gaps.',
  },
  {
    id: 'firmographic-enricher',
    name: 'Firmographic Enricher',
    description:
      'Adds structured company data -- website, HQ, employee band, revenue indicators, and funding stage -- to every account.',
    details:
      'Resolves company identity and appends verified firmographic attributes, giving every account a structured data profile for downstream scoring and personalization.',
    stage: 'Account Discovery',
    stageSlug: 'discovery',
    status: 'live',
    marketplaceUrl: 'https://console.apify.com/actors/0QK7Upg2NolQspHEm',
    icon: Building2,
    whatItIs:
      'A raw account list is just names. This agent turns each name into a structured, intelligence-ready company record by appending verified firmographic data: website, HQ, headcount band, estimated revenue, funding stage, and founding year.',
    howItWorks:
      'Each company name and domain is passed through a multi-source resolution pipeline. The agent queries business intelligence APIs, cross-references funding databases, and validates domain ownership. An LLM layer reconciles conflicting data and fills gaps using web inference. Output is a normalized firmographic record with source attribution and confidence scores for key fields.',
    pipelineRole:
      'Final step in the discovery layer before accounts enter intent and scoring. Receives raw lists from discovery agents and produces enriched records that the Intent Signal Aggregator and Predictive Account Scoring model can process.',
  },

  // BUYING INTENT
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
    marketplaceUrl: 'https://console.apify.com/actors/mJdJpUBS9HpU29Zeh',
    icon: Briefcase,
    whatItIs:
      'Hiring is a public declaration of where a company is spending budget. This agent captures those signals at scale by systematically extracting LinkedIn job postings across your target account universe and converting them into a structured intent feed.',
    howItWorks:
      'The agent monitors LinkedIn listings using role titles, seniority levels, and keyword filters aligned to your ICP. For each match, it extracts job title, function, seniority, full description, posting date, and location. Data is normalized and timestamped. Volume spikes from a single account within a short window are flagged automatically as surge events.',
    pipelineRole:
      'Entry point of the intent layer. Feeds raw job data to the Hiring Intent Interpreter. Runs continuously against the enriched account universe from discovery. Output determines which accounts receive elevated intent scores and which trigger immediate outreach.',
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
    marketplaceUrl: 'https://console.apify.com/actors/DuwxLSRuZgkyBKu0k/input',
    icon: FileSearch,
    whatItIs:
      'LinkedIn covers only a fraction of active hiring in India. Naukri is where mid-market and technology companies post most of their open roles. This agent closes that coverage gap, ensuring your intent pipeline reflects the full hiring picture of Indian companies.',
    howItWorks:
      'The agent applies role-based, industry-based, and company-based filters to Naukri listings. It extracts job title, required skills, function, experience band, and description. Company-level metrics like total open roles and hiring velocity are computed and appended. Output is schema-normalized to match the LinkedIn job feed so both sources flow through the same pipeline.',
    pipelineRole:
      'Runs alongside the LinkedIn Job Scraper as a parallel intent source scoped to India. Both feeds converge at the Hiring Intent Interpreter. For India-focused GTM motions, this agent frequently surfaces intent signals 2 to 4 weeks ahead of LinkedIn.',
  },
  {
    id: 'hiring-intent-interpreter',
    name: 'Hiring Intent Interpreter',
    description:
      'Converts raw hiring data into structured intent signals -- DX, ERP, cloud, security, and more.',
    details:
      'Applies semantic classification to job description text to infer technology investment themes, team build-out priorities, and strategic initiative signals.',
    stage: 'Buying Intent',
    stageSlug: 'intent',
    status: 'live',
    marketplaceUrl: 'https://console.apify.com/actors/tHZegqCdCz4pOuN9X',
    icon: Brain,
    whatItIs:
      'Job titles are the surface. Descriptions are the signal. This agent reads between the lines of job postings at scale, classifying each one into structured intent categories like cloud infrastructure, ERP modernization, cybersecurity, or AI/ML buildout.',
    howItWorks:
      'Raw job records from LinkedIn and Naukri scrapers are passed to an LLM classification layer. The agent extracts technology mentions, functional intent categories, and seniority patterns from each description. Multiple postings from the same company are aggregated into a company-level intent profile. Output is a ranked, confidence-scored intent tag set per company, timestamped for recency tracking.',
    pipelineRole:
      'Analytical core of the intent layer. Receives raw job feeds from both scrapers and produces classified signals for the Intent Signal Aggregator. Output also feeds the Multi-Channel Outreach Agent directly, informing which technology themes to reference in messaging.',
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
      'What a company runs today signals what they will buy or replace tomorrow. This agent builds a verified technology inventory for every account by reading publicly observable signals: website tooling, job description requirements, and partnership announcements.',
    howItWorks:
      'The agent runs a multi-source detection pass per account. It fingerprints the website for JS libraries, tracking pixels, and infrastructure headers. It scans job descriptions for tool-specific mentions like Salesforce, SAP, or Snowflake. It cross-references technology partnership pages and case study listings. All signals are merged, deduplicated, and classified into a stack taxonomy with a confidence score per detected technology.',
    pipelineRole:
      'Feeds the Intent Signal Aggregator with vendor-specific context that hiring data alone cannot provide. Also informs the Ranking and Explainability Layer and enables the Multi-Channel Outreach Agent to personalize messaging with integration hooks and competitive displacement angles.',
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
      'A company that just raised a funding round, appointed a new CTO, or entered a new market is in a different buying posture than one in steady-state. This agent tracks those inflection points in real time and converts daily business news into a curated stream of high-relevance triggers.',
    howItWorks:
      'The agent runs a continuous monitoring pipeline across news APIs, press release feeds, and industry publications using company name and domain as anchors. Each article passes through an event extraction model that identifies event type, entities involved, and strategic implication. Events are classified by trigger strength and surfaced to the Intent Signal Aggregator with a structured record and source URL.',
    pipelineRole:
      'Provides the timing signal layer of the intent engine. Feeds the Intent Signal Aggregator and triggers the Market Signal Monitor when a cold account generates high-relevance news. Also a primary input to the Reactivation Message Builder.',
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
      'A published tender is the most explicit buying signal that exists. This agent monitors government portals, enterprise procurement platforms, and bidding systems to surface these high-certainty opportunities before competitors act on them.',
    howItWorks:
      'The agent connects to procurement data sources including central government portals, state tender boards, GEM, and enterprise platforms. It applies ICP-aligned keyword filters and category codes to identify relevant notices. Each match is parsed for issuing organization, procurement category, estimated value, submission deadline, and requirement summary. An LLM pass converts dense procurement language into a concise opportunity brief.',
    pipelineRole:
      'Feeds the Intent Signal Aggregator with procurement-grade signals that push accounts to the top of the scoring queue. Also triggers direct escalation to the Account Prioritization Agent for time-sensitive opportunities with hard deadlines.',
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
      'Annual reports and filings are the most authoritative source of a company\'s spending intent, written by leadership and structured to communicate where capital flows. This agent processes those documents at scale and converts dense financial prose into structured, actionable intelligence.',
    howItWorks:
      'The agent retrieves annual reports, 10-K filings, and earnings transcripts from regulatory databases and investor relations pages. Documents are parsed and segmented into thematic sections. A reasoning pass extracts technology capex, initiative names, vendor mentions, and forward-looking budget signals. Each extraction is tied to a page reference. Output is a structured intelligence brief per company, tagged by investment theme.',
    pipelineRole:
      'Provides the deepest, most authoritative intent signal in the pipeline. Feeds the Intent Signal Aggregator as a high-weight signal and is a key input to the Deep Research Agent and Meeting Prep Agent.',
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
    status: 'coming-soon',
    icon: Search,
    whatItIs:
      'Individual signals are useful. Connected intelligence is what drives action. This agent synthesizes hiring patterns, news events, filing disclosures, and tech stack data into a unified account brief that explains why an account is showing intent and what to do next.',
    howItWorks:
      'The agent ingests structured signal outputs from every intent sub-agent. It builds a multi-source evidence set and runs a reasoning pass that asks: what is this company trying to accomplish, why now, and what is the most relevant hook for outreach? Output is a narrative brief with a headline trigger, supporting evidence, recommended outreach angle, and a confidence-weighted intent score. Briefs are updated on signal change events.',
    pipelineRole:
      'Capstone of the intent layer. Receives outputs from every intent sub-agent and produces the account intelligence brief that feeds both the Intent Signal Aggregator and the Multi-Channel Outreach Agent. Also populates the Meeting Prep Agent\'s account snapshot.',
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
      'Multiple signals pointing in the same direction mean something. This agent is the normalization engine that converts every signal from the intent layer into a single weighted intent vector per account, accounting for recency, signal type, and corroboration.',
    howItWorks:
      'All structured signal outputs are ingested. Each signal type is assigned a base weight derived from historical correlation with closed deals. Recency decay is applied so older signals contribute less. When multiple signal types align on the same account, a corroboration multiplier amplifies the composite score. Output is a normalized 0 to 100 intent score with a signal breakdown table per account.',
    pipelineRole:
      'Bridge between the intent layer and the prioritization layer. Its composite intent score is the primary input to the Predictive Account Scoring model. Also consumed by the Delta Scorer to track how an account\'s intent vector has shifted since the last sales touch.',
  },

  // ACCOUNT PRIORITIZATION
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
      'High fit and high intent rarely peak at the same time. This agent fuses both into a single calibrated score by combining a trained gradient boosting model over firmographic fit with the composite intent vector from the aggregator.',
    howItWorks:
      'Enriched account records and intent vectors are passed to an XGBoost classifier trained on historical CRM data. The model produces a fit-probability score, which is fused with the intent score using a configurable weighting formula. An LLM reasoning layer reviews edge cases near scoring thresholds and applies qualitative adjustments the statistical model cannot capture. The final score is normalized, confidence-bounded, and written to the account record.',
    pipelineRole:
      'Decision engine of the prioritization layer. Consumes firmographic records and intent scores, and produces the ranked account list that feeds the Ranking and Explainability Layer and the Account Prioritization Agent.',
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
      'A score without context is a number reps won\'t trust. This agent converts scoring model outputs into plain-language rationale cards that explain the specific fit, timing, and urgency factors behind each account\'s position.',
    howItWorks:
      'The agent takes the scored account list and the underlying signal data per account. For each account, it constructs a reasoning prompt with score components, dominant intent signals, firmographic fit profile, and signal recency. Output is a 3 to 5 sentence rationale covering the primary rank driver, the specific trigger that elevated urgency, and any qualifying caveats. Rationale cards are attached to each account record in the CRM.',
    pipelineRole:
      'Sits between Predictive Account Scoring and the Account Prioritization Agent. Its output is also consumed by the Meeting Prep Agent to give reps strategic context before a call.',
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
      'Scores are a continuum. Sales execution requires clear categories. This agent converts the ranked account list into three tiers, applies routing rules, and ensures the pipeline your team works from is operationally executable, not just data-accurate.',
    howItWorks:
      'The agent ingests the ranked, explained account list and applies tiering logic. T1 accounts exceed a composite score threshold with at least two corroborating intent signals. T2 accounts meet fit criteria with lower intent recency. T3 accounts are in-ICP with no active signals. Business rules are applied as a post-processing pass covering territory assignments, rep capacity limits, existing opportunity exclusions, and suppression lists. The final tiered list is written to your CRM with tier labels and routing assignments.',
    pipelineRole:
      'Final step in the prioritization layer and the primary handoff to the outreach layer. T1 output triggers the Multi-Channel Outreach Agent. T2 accounts go to the Follow-Up Intelligence Agent. T3 accounts are handed to the Market Signal Monitor for passive monitoring.',
  },

  // MESSAGING & OUTREACH
  {
    id: 'linkedin-msg-generator',
    name: 'LinkedIn Msg Generator',
    description:
      'Writes personalized LinkedIn connection requests and messages using account intelligence.',
    details:
      'Generates high-relevance LinkedIn messages by drawing on intent signals, firmographic context, and contact role to produce outreach that doesn\'t feel automated.',
    stage: 'Messaging & Outreach',
    stageSlug: 'outreach',
    status: 'coming-soon',
    icon: MessageSquare,
    whatItIs:
      'Generic outreach damages your brand with high-value prospects. This agent writes personalized LinkedIn messages grounded in real signals, a recent funding event, a specific technology being adopted, or an active hiring pattern, matched to the contact\'s role and seniority.',
    howItWorks:
      'The agent receives a contact record and the account\'s intent signal summary. It constructs a personalization prompt that instructs the LLM to write a message under 300 characters for connection requests or under 700 for InMails, leading with the most relevant signal for that contact\'s function. The first touch avoids product pitches. Tone is calibrated by seniority: direct for C-suite, value-led for directors, problem-led for managers.',
    pipelineRole:
      'First outreach execution agent in the pipeline, activated for T1 accounts after tier assignment. Operates alongside the Multi-Channel Outreach Agent, handling the LinkedIn channel specifically. Reply rates feed back into template optimization.',
  },
  {
    id: 'multi-channel-outreach-agent',
    name: 'Multi-Channel Outreach Agent',
    description:
      'Generates coordinated email and LinkedIn message variants with CTA options for each account.',
    details:
      'Produces a complete, multi-touch outreach sequence -- email body, LinkedIn message, and follow-up variants -- grounded in account-specific intelligence.',
    stage: 'Messaging & Outreach',
    stageSlug: 'outreach',
    status: 'coming-soon',
    icon: Send,
    whatItIs:
      'Producing personalized, non-repetitive messages across email and LinkedIn for dozens of accounts exceeds any rep\'s capacity. This agent generates a complete, coordinated sequence per account: cold email with subject line, LinkedIn connection message, follow-up for no-reply, and a third-touch bump, all anchored in account-specific intent.',
    howItWorks:
      'The agent receives the account intelligence brief, contact role and function, tier assignment, and dominant intent signal. It generates a four-touch sequence with recommended send intervals. Each message uses a unique hook drawn from the signal set: a news event, a hiring pattern, a technology angle. CTA options are generated at two levels: low-friction (share a resource) and high-intent (book a call).',
    pipelineRole:
      'Primary content engine for the outreach layer. Operates on T1 and T2 accounts from the Account Prioritization Agent. Output integrates with CRM sales engagement features. Engagement metrics from deployed sequences feed back into the scoring model.',
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
      'Following up too soon signals desperation. Following up too late loses momentum. This agent removes that guesswork by analyzing email opens, link clicks, and account-level signals to determine the right moment and the most contextually relevant next message.',
    howItWorks:
      'The agent monitors engagement events from deployed sequences in real time. When a contact opens an email without replying, it scores recency, click behavior, and any new account signals. It calculates a recommended follow-up window and generates a message variant that references the most recent relevant account signal. For zero-engagement accounts, it escalates to the Delta Scorer for a signal refresh before recommending the next action.',
    pipelineRole:
      'Operates within the active outreach phase, between sequence deployment and meeting booking. Receives engagement telemetry from the outreach layer and signal updates from the monitoring layer. Surfaces recommendations as CRM tasks and Slack notifications. Feeds response data back to the Multi-Channel Outreach Agent.',
  },

  // MONITORING & REACTIVATION
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
      'The right message to an account in steady-state performs a fraction as well as the same message during an organizational shift. This agent watches your full account universe continuously and surfaces the triggers that indicate a previously cold account has entered a buying window.',
    howItWorks:
      'The agent maintains a persistent monitoring subscription for every account regardless of pipeline status. It queries news APIs, job boards, funding databases, and company announcement feeds on a rolling cadence. Signal events are classified by type and strength, then compared against each account\'s historical baseline to detect anomalies. High-strength signals generate immediate notifications. Moderate signals are batched into a daily digest.',
    pipelineRole:
      'Always-on layer that activates the reactivation pipeline. When a significant signal change is detected in a T3 account, it triggers the Prospecting Agent for re-evaluation and the Delta Scorer to quantify what has changed since the last touch.',
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
      'Accounts fall out of active sequences and signal changes go unnoticed. This agent automates the re-entry decision. When a monitored account crosses a configurable signal threshold, it evaluates ICP fit and pipeline policy, then re-adds it with the appropriate tier and sequence trigger.',
    howItWorks:
      'The agent subscribes to alert events from the Market Signal Monitor and Intent Signal Aggregator. On a signal event, it retrieves the account\'s firmographic record, last-touch history, and current intent score. It runs a qualification check against ICP criteria and pipeline rules like minimum days since last touch and no existing open opportunity. If the account passes, it creates or re-activates the CRM record, assigns a tier, and enrolls it in the appropriate sequence. A re-entry rationale is logged for rep context.',
    pipelineRole:
      'Gateway between the monitoring layer and the active pipeline. Re-activated account records feed directly into the Account Prioritization Agent for final ordering and into the Multi-Channel Outreach Agent for sequence generation.',
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
      '"Checking back in" fails because reps have nothing specific to say. This agent answers the question every rep needs before re-engaging: what exactly has changed at this account since the last touch, and how urgent is it?',
    howItWorks:
      'The agent stores a snapshot of each account\'s signal state at every sales touch. When re-engagement is triggered, it retrieves the historical snapshot and runs a diff against the current state. Changes are categorized as new signals added, signals expired, or category shifts. Output is a structured delta record with a headline change statement, a list of specific signal changes with timestamps, and an urgency score derived from the magnitude and recency of the delta.',
    pipelineRole:
      'Operates in the monitoring layer and feeds two downstream agents. The Reactivation Message Builder uses the delta record to craft re-engagement messages. The Follow-Up Intelligence Agent uses the urgency score to determine optimal re-engagement timing.',
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
      'Most reactivation attempts fail because they are generic. This agent makes that failure impossible by grounding every re-engagement message in specific, observable changes at the account, a new funding round, a leadership hire, a shift in hiring patterns.',
    howItWorks:
      'The agent receives the delta record from the Delta Scorer, the account\'s historical touch log, and the contact\'s current role. It constructs a message brief: lead with the most significant detected change, connect it to the value your product delivers in that context, and propose a specific low-friction next step. Messages are written at two lengths, short-form for LinkedIn under 500 characters and long-form for email, with subject line variants for A/B testing.',
    pipelineRole:
      'Final step in the reactivation pipeline, operating after the Market Signal Monitor detects a change, the Delta Scorer quantifies it, and the Prospecting Agent re-activates the account. Output flows directly into the rep\'s task queue as a ready-to-send message.',
  },

  // MEETING CONVERSION
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
      'Walking into a competitive meeting without preparation is a concession. This agent compresses 45 minutes of manual research into a clean, actionable brief: account snapshot, intent context, contact profiles, suggested agenda, and talking points, delivered before the calendar invite fires.',
    howItWorks:
      'When a meeting is logged or a calendar event detected, the agent retrieves the Deep Research brief, scoring rationale card, CRM interaction history, and attendee contact profiles. It generates a structured five-section brief: company snapshot, intent context, contact profiles, suggested agenda with time allocation, and one talking point per agenda item grounded in the account\'s specific context. Delivered as a formatted document and a CRM note.',
    pipelineRole:
      'First agent in the meeting conversion layer. Consumes outputs from the Deep Research Agent, Ranking and Explainability Layer, and Firmographic Enricher. Passes the agenda structure to the Conversation Intelligence Agent after the meeting.',
  },
  {
    id: 'conversation-intelligence-agent',
    name: 'Conversation Intelligence Agent',
    description:
      'Transcribes calls and extracts structured insights -- objections, commitments, next steps, and sentiment.',
    details:
      'Processes call recordings through transcription and LLM-based analysis to surface what was said, what was agreed, and what the rep should do next.',
    stage: 'Meeting Conversion',
    stageSlug: 'meeting',
    status: 'coming-soon',
    icon: Mic,
    whatItIs:
      'Critical information from sales calls disappears between the conversation and the CRM update. This agent transcribes every call, aligns it to the meeting agenda, and extracts structured insights: objections raised, commitments made, agreed next steps, and buyer sentiment.',
    howItWorks:
      'Call audio is processed through a high-accuracy transcription pipeline. The transcript is segmented by speaker and aligned against the Meeting Prep Agent\'s agenda. Four parallel LLM extraction passes run: objection detection, commitment extraction, next-step identification, and sentiment scoring across the call arc. All extractions are structured and written to the account record in the CRM within minutes of call completion.',
    pipelineRole:
      'Central agent in the meeting conversion layer. Receives agenda input from the Meeting Prep Agent and produces structured outputs for the Knowledge Extraction Agent. Commitment and next-step extractions trigger CRM task creation automatically. Objection patterns are aggregated and fed back to the Multi-Channel Outreach Agent.',
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
      'Information from a sales call has a short half-life if it isn\'t structured and stored immediately. This agent converts conversation extractions into permanent CRM assets: updated records, follow-up tasks, and strategic learnings that the organization actually retains.',
    howItWorks:
      'The agent receives structured extractions from the Conversation Intelligence Agent. It maps each extraction to the appropriate CRM object: contact property updates, deal notes, activity log entries, and task creation with owner and due date. Strategic learnings about the buyer\'s process, budget cycle, or competitive situation are tagged and added to the account\'s intelligence layer.',
    pipelineRole:
      'Final step in the meeting conversion layer and the primary feedback loop into the intelligence layer. CRM updates ensure the account profile reflects current qualitative intelligence. Strategic learnings feed back into the Deep Research Agent. Also triggers the Follow-Up Intelligence Agent to begin monitoring for post-call engagement signals.',
  },

  // OPS
  {
    id: 'sheet-formatter-agent',
    name: 'Sheet Formatter Agent',
    description:
      'Cleans, restructures, and standardizes spreadsheet data for downstream pipeline consumption.',
    details:
      'Applies intelligent formatting rules to raw sheets -- fixing headers, normalizing values, removing junk rows, and ensuring structural consistency for data processing.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: TableProperties,
    whatItIs:
      'Every pipeline eventually breaks on bad data. This agent is the structural integrity check that ensures every spreadsheet entering the pipeline meets schema requirements before it touches a processing agent.',
    howItWorks:
      'The agent ingests the raw sheet and runs a structural analysis pass: detecting header rows, identifying column semantics, and flagging anomalies like empty columns, all-null rows, and inconsistent formats. It then applies a transformation plan: renaming columns to match the canonical schema, converting date formats, stripping whitespace, and removing formula artifacts. A validation report lists every transformation applied and every anomaly flagged for human review.',
    pipelineRole:
      'Entry point of the Ops layer for externally sourced data. Feeds cleaned, schema-compliant data to the Data Normalisation Agent and Deduplication Agent. Also acts as a pre-processing step for the CRM Update Agent to prevent bulk upload failures.',
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
      '"Accenture," "Accenture PLC," and "accenture.com" are the same company but a naive database treats them as three records. This agent resolves fragmentation issues at scale by standardizing names, domains, phone formats, and geographic identifiers across every data source.',
    howItWorks:
      'Each record passes through a multi-step normalization pipeline. Company names are resolved against a canonical entity graph using fuzzy matching and domain anchoring. Contact names are parsed into structured components. Phone numbers are normalized to E.164 format. Geographic data is standardized to ISO country and state codes. Industry classifications are mapped to a canonical taxonomy. Each normalized record is written with a confidence score and a list of transformations applied.',
    pipelineRole:
      'Runs after the Sheet Formatter Agent and before the Deduplication Agent. Without normalization, deduplication produces false negatives. Normalized records also improve Firmographic Enricher match rates. Output feeds the CRM Update Agent, Intent Signal Aggregator, and scoring model.',
  },
  {
    id: 'deduplication-agent',
    name: 'Deduplication Agent',
    description:
      'Identifies and merges duplicate company and contact records across all pipeline data sources.',
    details:
      'Applies multi-signal entity matching to detect duplicates -- including near-matches -- and produces a deduplicated master record set.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: Files,
    whatItIs:
      'Duplicates are not just a data quality problem. They are a revenue problem. A rep working two records of the same company wastes capacity. A scoring model that sees the same company twice inflates signal density. This agent removes that problem using multi-signal entity matching across all sources.',
    howItWorks:
      'The agent applies a three-pass matching strategy. First, exact domain matching identifies clear duplicates. Second, fuzzy name matching with Levenshtein distance and token overlap catches name variants. Third, LLM-assisted disambiguation resolves edge cases like subsidiaries, acquired companies, and regional entities sharing a parent domain. For each duplicate cluster, a master record is elected based on data completeness and duplicates are merged with a full provenance log.',
    pipelineRole:
      'Runs after data normalization and before any enrichment or scoring step. Ensures the Firmographic Enricher processes unique entities, the intent scoring model does not double-count signals, and the CRM Update Agent does not create duplicate records.',
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
      'A list that reaches the scoring model missing half its required fields produces unreliable scores, and the problem won\'t surface until a rep calls an account that was never a real prospect. This agent catches those issues before they propagate.',
    howItWorks:
      'The agent runs a four-layer audit. Completeness check: every required field is present and non-null. Validity check: values conform to expected formats. Consistency check: cross-field logic holds, such as headcount band matching revenue range. Confidence check: enriched fields from external sources meet a minimum confidence threshold. Each failing record is annotated with the specific issues detected. Output includes an overall quality score, a row-level annotation file, and a summary report by field and issue type.',
    pipelineRole:
      'Quality gate between the normalization and enrichment steps and the scoring and outreach layers. Lists that fail are returned for remediation. Only lists that pass are forwarded to the Firmographic Enricher and Intent Signal Aggregator.',
  },
  {
    id: 'crm-update-agent',
    name: 'CRM Update Agent',
    description:
      'Pushes structured pipeline outputs -- account records, scores, notes, and tasks -- to your CRM.',
    details:
      'Maps pipeline agent outputs to CRM objects and field schemas, performing creates, updates, and merges with full conflict resolution logic.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: UploadCloud,
    whatItIs:
      'Intelligence that never reaches the CRM has zero value to the sales team. This agent is the integration layer that writes every pipeline output, enriched records, intent scores, tier assignments, rationale cards, and follow-up tasks, to your CRM in the right object and the right field.',
    howItWorks:
      'The agent receives structured records from upstream agents and maps them to the target CRM\'s object schema. For each record, it performs a lookup to determine whether to create, update, or merge. Conflict resolution logic handles cases where the CRM already holds a different value, applying a priority rule: pipeline data wins for intent fields, CRM wins for manually entered fields. API calls are batched for efficiency and rate-limit compliance. A write log is generated for every operation.',
    pipelineRole:
      'Final delivery mechanism for every agent in the pipeline that produces structured account or contact data. Sits at the output end of the Ops layer as the integration bridge to HubSpot, Salesforce, or any other CRM. Write log errors serve as an indirect quality signal for the entire pipeline.',
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
      'Pipeline data sitting in spreadsheets does not communicate. This agent converts raw pipeline data into executive-ready reports: account coverage summaries, intent signal trends, tier distribution breakdowns, and outreach performance reviews.',
    howItWorks:
      'The agent ingests pipeline data from specified sources including account lists, scoring outputs, outreach engagement logs, and CRM activity records. A synthesis pass reads the structured data and generates a narrative summary that interprets key metrics in plain language: what changed this week, what top accounts have in common, and where the pipeline has gaps. Charts and tables are generated from the raw data. Output formats include a Slack digest, a formatted document, and a structured JSON payload for CRM embedding.',
    pipelineRole:
      'Observability layer of the entire pipeline. Consumes outputs from every other layer and surfaces the patterns that inform GTM strategy decisions. Runs on a configurable cadence and serves as the primary interface between the AI pipeline and the revenue leadership team.',
  },
  {
    id: 'image-text-extractor',
    name: 'Image Text Extractor',
    description:
      'Extracts structured data from screenshots, images, and scanned documents into row-based records.',
    details:
      'Uses vision models to interpret image content -- tables, business cards, screenshots -- and converts them into structured, pipeline-ready data rows.',
    stage: 'Ops',
    stageSlug: 'ops',
    status: 'coming-soon',
    icon: ImageIcon,
    whatItIs:
      'Valuable prospect data does not always arrive in structured formats. Conference lists come as PDFs. Org charts are shared as screenshots. Business cards sit in a rep\'s camera roll. This agent converts all of it into clean, structured data rows using vision AI.',
    howItWorks:
      'The agent accepts image inputs including PNG, JPEG, PDF page renders, and screenshots. It identifies the content type: table, list, form, business card, or document, and applies the appropriate extraction schema. For tables, it reconstructs column headers and row values. For business cards, it extracts name, title, company, email, and phone. Output is written as structured rows to a spreadsheet or JSON, with a confidence score per extracted field and flags for low-confidence extractions requiring human review.',
    pipelineRole:
      'Feeds the Ops layer\'s normalization and quality pipeline. Extracted records flow into the Data Normalisation Agent and Deduplication Agent before entering the main pipeline as account or contact records. Particularly valuable in field sales and event-driven prospecting contexts.',
  },
];

export function getAgentById(id: string): Agent | undefined {
  return allAgents.find((a) => a.id === id);
}

export function getAgentsByStage(stageSlug: string): Agent[] {
  return allAgents.filter((a) => a.stageSlug === stageSlug);
}
