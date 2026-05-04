export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  slug: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: 'General',
    slug: 'general',
    items: [
      {
        question: 'What is LeadStrategus.ai?',
        answer:
          'A Contextual Intelligence Engine for B2B sales. It monitors buying signals, LinkedIn Sales Nav, Naukri, Monster, tenders, company news, annual reports - assembles a context dossier per account, and drafts outreach grounded in that specific context. Not an AI SDR. Not a database. The signal and context layer your outbound has been missing.',
      },
      {
        question: 'Who is LeadStrategus.ai built for?',
        answer:
          'Solo operators, freelance growth marketers, one-person sales consultants, and founder-sellers who have built a ChatGPT + Clay DIY stack and hit the maintenance ceiling. Also: revenue teams at companies selling into India, or into Indian arms of global enterprises, where Naukri, Monster, and tender signals are invisible to their current tools.',
      },
      {
        question: 'Do I need technical expertise to use the platform?',
        answer:
          'No. Unlike Clay, which requires RevOps engineering time to configure, LeadStrategus.ai is set up by our operator team. You tell us your ICP and signal model. We make the engine run.',
      },
      {
        question: 'How is LeadStrategus different from other sales tools?',
        answer:
          'We start before everyone else does. Every other outbound tool starts after the watching has happened - you bring the list, they send the list. We monitor the market continuously for signals that predict buying intent, then act on what we see. The context depth and the India signal layer (Naukri, Monster, tenders) are the structural moat.',
      },
    ],
  },
  {
    name: 'Platform',
    slug: 'platform',
    items: [
      {
        question: 'Can I use individual agents or do I need the full system?',
        answer:
          'Individual agents are available from our marketplace - pick one, plug it into your existing stack, pay per use. Most teams start with 2–3 agents and expand when they see what the signal depth unlocks.',
      },
      {
        question: 'How do agents work together?',
        answer:
          'Agents pass data between stages automatically. The Naukri Job Scraper feeds the Hiring Intent Interpreter. The Intent Signal Aggregator scores across all sources. The Account Prioritisation Agent tells you which 50 accounts to work this week. The LinkedIn Message Generator writes from the specific signal that triggered the score. One connected pipeline, no manual exports.',
      },
      {
        question: 'Can I request a custom agent?',
        answer:
          'Yes. The Custom Build option is specifically for this, agents built to your exact workflow, data sources, and ICP, on our infrastructure, maintained by our operators.',
      },
      {
        question: 'What integrations do you support?',
        answer:
          'API access is included. We integrate with major CRMs and email sequencers. Bring specific integration requirements to the scoping call.',
      },
    ],
  },
  {
    name: 'Legal & Usage',
    slug: 'legal',
    items: [
      {
        question: 'Is LeadStrategus compliant with data regulations?',
        answer:
          'All agents operate on publicly available data and user inputs. Users are responsible for ensuring compliance with applicable laws and platform terms.',
      },
      {
        question: 'Do you store my data?',
        answer:
          'Details in the Trust Center. We do not sell your data to third parties.',
      },
      {
        question: 'Can I use LeadStrategus for cold outreach?',
        answer:
          'Yes, within applicable laws and platform terms. Unlike autonomous AI SDRs, every outreach draft requires your approval before it sends, so you stay in control of what leaves your domain.',
      },
    ],
  },
  {
    name: 'Agents',
    slug: 'agents',
    items: [
      {
        question: 'How many agents are currently available?',
        answer:
          'Seven are live now. Over 25 are in active development across all 7 funnel stages. Full catalogue on the Agents page with live/coming-soon status.',
      },
      {
        question: 'What does "Coming Soon" mean on an agent?',
        answer:
          'In active development within the current roadmap cycle. Flag specific agents at the scoping call if they are critical to your use case.',
      },
      {
        question: 'Can agents run without human supervision?',
        answer:
          'The signal monitoring and context-assembly layers run continuously. The send layer does not, every outreach draft queues for your approval. This is a deliberate design choice. Operators who ran autonomous AI SDRs in 2024-2025 know why.',
      },
    ],
  },
  {
    name: 'Data',
    slug: 'data',
    items: [
      {
        question: 'What data sources do your agents use?',
        answer:
          'LinkedIn Sales Navigator, Naukri, Monster India, government tender portals (GeM, CPPP, all major state portals, PSU boards), company news and events, annual reports and public filings, technographic signals. All publicly available data.',
      },
      {
        question: 'How accurate is the data?',
        answer:
          'Multi-source cross-referencing with continuous context refresh. Context dossiers update when the underlying signal changes, not on a weekly export cycle. Our operator reviews flagged accounts where signal confidence is low.',
      },
      {
        question: 'Can I bring my own data?',
        answer:
          'Yes. Bring your existing target account list, CRM exports, and ICP definitions. The Contextual Intelligence layer enriches what you have, it does not replace it.',
      },
    ],
  },
];
