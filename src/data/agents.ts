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
