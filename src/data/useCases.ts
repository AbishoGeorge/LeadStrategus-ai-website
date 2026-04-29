import { Search, TrendingUp, Users, Mail, BarChart3, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface UseCase {
  slug: string;
  icon: LucideIcon;
  image: string;
  title: string;
  description: string;
  metaDescription: string;
  content: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'discover-high-fit-accounts',
    icon: Search,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Discover High-Fit Accounts Automatically',
    description: 'AI agents continuously scan public data to identify companies matching your ideal customer profile, eliminating manual research hours.',
    metaDescription: 'Learn how AI agents automatically discover high-fit accounts matching your ICP, eliminating hours of manual research.',
    content: `Finding the right accounts to target is one of the most time-consuming and imprecise tasks in B2B sales. Sales reps spend hours each week manually researching companies, cross-referencing lists, and trying to determine which accounts actually fit their ideal customer profile. AI agents change this entirely.

## How Account Discovery Works

An account discovery agent operates continuously in the background, scanning thousands of data points across public sources: company websites, LinkedIn, job boards, press releases, funding databases, and industry directories. It doesn't just match surface-level firmographic criteria — it evaluates fit across multiple dimensions simultaneously.

The agent applies your ICP criteria dynamically. If your ideal customer is a Series A SaaS company with 50–200 employees, using Salesforce, with an active hiring push in sales and marketing — the agent checks all of those signals in combination, not just individually.

## What Gets Surfaced

When an agent identifies a high-fit account, it doesn't just add a company name to a list. It produces a structured account record containing:

- **Firmographic summary:** Size, funding stage, industry, geography, growth rate
- **Tech stack snapshot:** Key tools in use, recently added technologies, integration gaps
- **ICP match score:** A composite score based on how well the account aligns with each dimension of your ICP criteria
- **Source citations:** Where each data point came from, so your team can validate and trust the output

## Why This Matters

The average SDR spends 20–40% of their time on research and list building. That's time not spent on actual outreach, discovery calls, or deal progression. Account discovery agents reclaim that time and redirect it toward higher-value work.

More importantly, AI-driven discovery doesn't have the same bias toward familiar accounts that human researchers develop. Agents will surface the right small company in a segment you've never targeted, the recent spinout from a known enterprise, or the fast-growing startup that just crossed your ICP threshold last month.

## Integration with Your Workflow

Account discovery integrates naturally into your existing CRM and sales tools. New accounts surface as enriched records in your pipeline, tagged with their ICP match rationale, ready for rep review and prioritization.

The result: your team spends time evaluating good accounts, not finding them.`,
  },
  {
    slug: 'detect-buying-intent',
    icon: TrendingUp,
    image: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Detect Buying Intent Before Competitors',
    description: 'Monitor hiring signals, funding rounds, technology changes, and expansion patterns to surface accounts ready to buy right now.',
    metaDescription: 'Use AI to detect buying intent signals — hiring, funding, and tech changes — before your competitors do.',
    content: `The difference between a cold account and a hot one isn't just fit — it's timing. A company that matches your ICP perfectly but is in cost-cutting mode is not the same as one that just raised a Series B and is building out its revenue team. Detecting that difference, at scale, across thousands of accounts, is what buying intent monitoring does.

## The Signal Landscape

Buying intent isn't a single signal — it's a composite of behavioral patterns that, when read together, indicate a company is in or entering a purchasing window. The signals fall into several categories:

**Hiring signals:** Job postings reveal strategic priorities. A cluster of revenue-focused hires — SDRs, AEs, RevOps, demand gen — signals a go-to-market expansion. Role requirements that mention specific tools your product integrates with (or competes with) are even more specific indicators.

**Funding events:** Seed, Series A, B, and beyond each represent different buying windows. Post-funding, companies have both budget and mandate to build out their infrastructure. The first 60–90 days after a raise are the highest-value window.

**Technology changes:** Adding a new CRM, replacing a marketing automation tool, or adopting a data warehouse signals an infrastructure investment cycle — prime time for adjacent tooling.

**Expansion indicators:** New office openings, geographic expansion, new product lines, and headcount growth all indicate a company scaling up and needing more infrastructure.

**Content engagement:** Companies actively researching your category — reading comparison guides, visiting review sites, engaging with thought leadership — are showing early-stage buying intent.

## How the Agent Works

The buying intent agent continuously monitors all of these signals across your ICP account list and net-new accounts. When a combination of signals fires for a specific account, the agent calculates an intent score and surfaces it to your team with a clear rationale: "Acme Corp is showing elevated intent — Series A announced 3 weeks ago, 4 new sales hires in the past month, and recently added Salesforce."

That's not a guess. It's a data-backed recommendation with an action attached to it.

## The Competitive Advantage

Most sales teams don't have systematic intent monitoring. They rely on manual research, occasional Crunchbase checks, and cold list uploads. Teams running intent agents are consistently reaching high-fit accounts days or weeks earlier in their buying process — when receptivity is highest and competition is lowest.

The window matters. Companies that respond to buying signals within 72 hours have dramatically higher conversion rates than those that respond weeks later. Speed is a function of infrastructure.`,
  },
  {
    slug: 'prioritize-pipeline',
    icon: BarChart3,
    image: 'https://images.pexels.com/photos/7681070/pexels-photo-7681070.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Prioritize Pipeline with Confidence',
    description: 'Score and rank accounts based on fit, intent, and engagement data so your team focuses on the highest-value opportunities first.',
    metaDescription: 'AI-powered account scoring combines fit, intent, and engagement signals to help your team prioritize pipeline with confidence.',
    content: `Sales reps make prioritization decisions every day, often with incomplete information and no systematic framework. Should they call the account they've been warming for six weeks, or the one that just went cold after a promising intro call? Should they re-engage the big-logo deal that stalled, or push harder on three smaller accounts that are moving fast? These decisions, made intuitively at scale, determine your pipeline velocity.

AI-powered prioritization gives reps a data-backed answer to the question: where should I focus right now?

## The Three Dimensions of Account Score

**Fit score:** How well does this account match your ICP? This dimension draws on firmographic and technographic data — company size, industry, growth rate, tech stack — and scores each account against your defined ICP criteria. Fit is relatively stable; it changes when the account's characteristics change.

**Intent score:** Is this account showing signs of being in a buying window? This is the dynamic layer, updating continuously as signals fire. A high-fit account with a rising intent score is your highest-priority target. A high-fit account with flat intent is a good nurture candidate.

**Engagement score:** Has this account engaged with your brand? Pricing page visits, content downloads, email opens, event attendance, champion outreach — engagement signals that someone at this account is actively interested. Combined with fit and intent, engagement confirms that an outreach effort will land in a receptive environment.

## How Prioritization Works in Practice

The prioritization agent synthesizes all three scores and produces a ranked list of accounts for each rep, updated daily. The list isn't just a ranking — each entry includes the rationale: why this account is high-priority right now, which signals are most active, and what the recommended next action is.

Reps don't have to decide where to start. They open their dashboard, see their prioritized list, and execute. The cognitive load of "what should I work on?" is replaced by "here's your highest-priority accounts and why."

## What This Does to Pipeline Velocity

Teams running systematic prioritization consistently outperform those using intuition or static lists. They make more calls to accounts that convert, waste less time on accounts that won't move, and catch high-fit accounts at the moment their intent peaks.

The compounding effect over time is significant: higher conversion rates, shorter sales cycles, and more predictable pipeline.`,
  },
  {
    slug: 'personalize-outreach-at-scale',
    icon: Mail,
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Personalize Outreach at Scale',
    description: 'Generate contextual, account-specific messaging that resonates with prospects without the manual effort of one-by-one personalization.',
    metaDescription: 'AI agents generate genuinely personalized outreach for each account based on real signals — not templates.',
    content: `Mass personalization — "Hi {first_name}, I noticed {company} is in {industry}" — has become so common that buyers filter it automatically. Real personalization requires real context: understanding what this specific company is doing right now, why your product is relevant to their current situation, and what would make them want to reply.

Doing that for every account, at the volume needed to run effective outbound, is impossible without AI. With agents, it's the default.

## What Genuine Personalization Looks Like

A genuine personalized message has three components that aren't templates:

**A specific, current trigger:** Something that happened recently that makes your outreach timely and relevant. Not "I see you're in SaaS" — "I saw you posted the new head of sales role last week" or "Congratulations on the Series B you announced."

**A real connection to their situation:** Not "we help companies like yours" — "teams scaling from 20 to 60 reps typically hit three specific friction points in their outbound motion, and that's exactly the window we're built for."

**A clear, low-friction next step:** Not "let me know if you'd like to connect" — "would a 20-minute call this week be useful to explore if there's a fit?"

The difference is specificity. Specific messages feel personal because they are.

## How the Outreach Agent Works

The outreach agent takes the account data, signal context, and your messaging framework as inputs. For each target account, it:

1. Identifies the most relevant signal from the account's recent activity
2. Matches that signal to the relevant product value proposition
3. Drafts a message that connects the signal to the proposition in a natural, direct way
4. Stages the draft for rep review before sending

Reps see the draft, the signal it was built on, and can approve, edit, or reject. They're not writing from scratch — they're editing from a substantive draft.

## The Scale Advantage

A rep who manually researches and writes 10 personalized messages a day is doing excellent work by most standards. An agent can prepare 100+ substantive drafts per day, each grounded in real account context. Reps spend their time reviewing, editing, and sending — not researching.

The volume goes up. The quality stays high. The reply rates follow.`,
  },
  {
    slug: 'convert-meetings-to-pipeline',
    icon: Users,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Convert More Meetings to Pipeline',
    description: 'Agents prepare pre-meeting intelligence briefings and follow-up workflows so every conversation is informed and productive.',
    metaDescription: 'AI agents prepare pre-meeting briefings and automate follow-up workflows so every meeting advances your pipeline.',
    content: `A booked meeting is an opportunity, not a conversion. The gap between meetings booked and meetings that advance to qualified pipeline is one of the most common points of revenue leakage in B2B sales. Reps go in underprepared, discovery is shallow, and follow-through is inconsistent.

AI agents address this at two critical moments: before the meeting and after it.

## Pre-Meeting Intelligence

The night before (or morning of) any booked meeting, the agent prepares a briefing for the rep that covers:

**Account snapshot:** Current company size, recent funding, key hires in the past 90 days, recent news or press releases, technology stack.

**Contact profile:** The meeting attendees' backgrounds, their tenure at the company, their likely role in the buying process, any public content they've posted that's relevant.

**Signal summary:** What intent signals are active for this account, and what they suggest about the company's current priorities and pain points.

**Recommended discovery questions:** Based on the account's profile and signals, suggested questions that will surface the most relevant information quickly.

**Competitor context:** If known, what alternatives this account might be evaluating and how to position against them.

The rep walks in with the equivalent of 2 hours of research done for them. They can focus on the conversation, not catching up.

## Post-Meeting Follow-Through

After the meeting, the agent supports the follow-up workflow:

- Auto-draft a personalized recap email based on the meeting notes
- Create a follow-up task sequence with recommended timing
- Flag stakeholders who weren't in the meeting but should be looped in
- Update the account's intent score based on the conversation signals
- Surface the meeting in deal review with a recommended next step

Consistent follow-through is the difference between meetings that advance and meetings that ghost. Agents make consistency the default, not the exception.

## The Outcome

Teams using pre-meeting briefings report more productive discovery calls, higher champion trust, and better stakeholder mapping. Teams using automated follow-up workflows report lower no-show rates for second meetings and faster progression from initial meeting to proposal stage.

Every meeting has more impact. Pipeline velocity increases. The funnel tightens.`,
  },
  {
    slug: 'reactivate-stale-leads',
    icon: RefreshCw,
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Reactivate Stale Leads Intelligently',
    description: 'Monitor dormant accounts for new buying signals and trigger re-engagement sequences at the right moment to revive dead pipeline.',
    metaDescription: 'AI agents monitor dormant accounts for new buying signals and trigger re-engagement at exactly the right moment.',
    content: `Every CRM has a graveyard: accounts that were once promising, went cold, and now sit in limbo — not formally lost, not actively pursued. This dormant pipeline represents real revenue potential that most teams systematically ignore because there's no systematic way to know when to re-engage.

AI agents solve this by monitoring dormant accounts continuously and triggering re-engagement exactly when conditions change.

## Why Leads Go Dormant

Leads go cold for a variety of reasons, and not all of them mean the opportunity is dead:

- **Timing mismatch:** They weren't ready to buy when you first engaged. Budget cycles, organizational changes, or competing priorities pushed the decision out.
- **Champion change:** The person you were talking to left. Their replacement may have entirely different priorities — and may be open to a fresh conversation.
- **No urgency then:** The problem was real but not burning. Something needs to change to create urgency.
- **Lost to status quo:** They decided to stay with their current approach. But if their current approach starts failing, that decision can reverse.

In most of these cases, circumstances change. The question is whether you'll know when they do.

## How Re-Engagement Monitoring Works

The re-engagement agent maintains a watchlist of dormant accounts. For each account, it monitors the same signal categories used for active pipeline: hiring patterns, funding events, technology changes, leadership moves, and engagement signals.

When a meaningful signal fires for a dormant account — a new CRO joins, a funding round closes, a relevant job gets posted — the agent surfaces the account to the rep with a recommended re-engagement message and the signal context.

The rep doesn't have to remember to check on cold leads. The system surfaces the right ones at the right moment.

## What Good Re-Engagement Looks Like

A re-engagement message built on a fresh signal is fundamentally different from a "just checking in" bump. Instead of:

*"Hi Sarah, just wanted to circle back to see if your priorities have changed..."*

You can say:

*"I saw you recently brought on a new head of revenue operations — that's often when teams revisit how they're structuring their pipeline intelligence. Wanted to see if it would be worth reconnecting."*

That's a message grounded in reality. It shows you're paying attention, and it gives them a reason to respond.

## The ROI of Dormant Pipeline

Every company has invested sales time in dormant accounts. Re-activating a fraction of that pipeline through systematic signal monitoring is often more efficient than building net-new pipeline from scratch. The accounts already know you. The relationship, however cold, already exists.

AI-driven re-engagement turns your CRM graveyard into a continuous source of reclaimed revenue.`,
  },
];
