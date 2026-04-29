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
        question: 'What is LeadStrategus?',
        answer:
          'LeadStrategus is an AI-powered platform that provides specialized agents for every stage of the B2B sales funnel. From account discovery to meeting conversion, our agents automate and optimize the entire revenue pipeline.',
      },
      {
        question: 'Who is LeadStrategus built for?',
        answer:
          'LeadStrategus is built for B2B revenue teams including sales development reps, account executives, marketing operations, and revenue leaders who want to automate prospecting, qualification, and outreach at scale.',
      },
      {
        question: 'Do I need technical expertise to use the platform?',
        answer:
          'No. Our agents are designed to be deployed with minimal setup. You configure your parameters, and the agents handle the rest. For custom builds, our team works directly with you to tailor the system to your workflow.',
      },
      {
        question: 'How is LeadStrategus different from other sales tools?',
        answer:
          'Most sales tools are point solutions that require manual stitching. LeadStrategus is a connected system of AI agents that covers the entire funnel. Each agent does one thing well, and together they form an automated pipeline from discovery to revenue.',
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
          'Both. You can pick individual agents from our marketplace and use them standalone, or deploy the full system for end-to-end pipeline automation. Start with one agent and scale when ready.',
      },
      {
        question: 'How do agents work together?',
        answer:
          'Each agent handles a specific funnel stage and passes enriched data to the next. For example, the Account Discovery agent feeds qualified accounts to the Buying Intent agent, which then routes high-intent prospects to the Outreach agent.',
      },
      {
        question: 'Can I request a custom agent?',
        answer:
          'Yes. Our Custom Build service lets you request agents tailored to your exact workflow, data sources, and business logic. We handle the infrastructure, you define the requirements.',
      },
      {
        question: 'What integrations do you support?',
        answer:
          'Our agents work with publicly available data sources and can integrate with common CRM platforms, email systems, and enrichment tools. Contact us for specific integration requirements.',
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
          'Our agents operate on publicly available data and user-provided inputs. Users are responsible for ensuring their usage complies with applicable laws and platform terms of service in their jurisdiction.',
      },
      {
        question: 'Do you store my data?',
        answer:
          'We process data as needed to deliver agent functionality. We do not sell or share your data with third parties. Refer to our Privacy Policy for detailed information about data handling practices.',
      },
      {
        question: 'Can I use LeadStrategus for cold outreach?',
        answer:
          'Our agents can assist with outreach workflows, but users must ensure compliance with anti-spam laws such as CAN-SPAM, GDPR, and other applicable regulations. We provide tools, not legal advice.',
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
          'We have a growing catalog of agents covering account discovery, buying intent detection, account prioritization, messaging and outreach, monitoring and reactivation, meeting conversion, and data operations. Check our Agent Catalog for the latest availability.',
      },
      {
        question: 'What does "Coming Soon" mean on an agent?',
        answer:
          'Agents marked as "Coming Soon" are in active development and will be available shortly. You can contact us to get early access or be notified when they launch.',
      },
      {
        question: 'Can agents run without human supervision?',
        answer:
          'Agents are designed to operate autonomously within the parameters you set. However, we recommend periodic review of outputs, especially during initial deployment, to ensure alignment with your business goals.',
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
          'Our agents work with publicly available business data, company websites, job postings, news, financial filings, and other open sources. We do not scrape private or gated platforms without authorization.',
      },
      {
        question: 'How accurate is the data?',
        answer:
          'We use multiple data points and cross-referencing to maintain high accuracy. However, publicly available data can change rapidly. Our Data Ops agents include validation and enrichment steps to keep information current.',
      },
      {
        question: 'Can I bring my own data?',
        answer:
          'Yes. You can feed your own account lists, CRM exports, or custom datasets into our agents. This is especially useful for Custom Build deployments where agents are tailored to your specific data ecosystem.',
      },
    ],
  },
];
