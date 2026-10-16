import { allAgents } from '../data/agents';
import { blogPosts } from '../data/blog';
import { useCases } from '../data/useCases';

export const SITE_URL = 'https://leadstrategus.ai';
export const DEFAULT_IMAGE = `${SITE_URL}/WhatsApp_Image_2026-04-15_at_2.26.01_PM.jpeg`;

export interface PageSeo {
  title: string;
  description: string;
}

const DEFAULT_SEO: PageSeo = {
  title: 'LeadStrategus – AI Agents for B2B Revenue',
  description:
    'AI-powered agents that find, qualify, and convert your next best customers. From discovery to revenue.',
};

const STATIC_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'AI Revenue Agents for B2B Pipeline Automation | LeadStrategus',
    description:
      'LeadStrategus builds AI agents that detect buying signals, identify high-intent B2B accounts, and automate pipeline generation from discovery to booked meetings.',
  },
  '/agents': {
    title: 'AI Sales Agents for Pipeline Growth | LeadStrategus',
    description: 'Explore AI agents that find, qualify, and convert your next best customers automatically.',
  },
  '/build': {
    title: 'Custom AI Agents for B2B Workflows | LeadStrategus',
    description: 'Build AI agents tailored to your workflow. Automate prospecting, outreach, and pipeline growth.',
  },
  '/blog': {
    title: 'B2B AI & GTM Insights Blog | LeadStrategus',
    description: 'Insights on AI agents, intent signals, and B2B revenue systems to grow your pipeline.',
  },
  '/about': {
    title: 'About LeadStrategus | AI Revenue Systems',
    description: 'We build AI systems, not services. Learn how LeadStrategus helps B2B teams generate pipeline.',
  },
  '/contact': {
    title: 'Contact LeadStrategus | Book a Demo',
    description: 'Talk to our team about deploying AI agents or building your revenue pipeline system.',
  },
  '/faq': {
    title: 'FAQ | LeadStrategus AI Revenue Agents',
    description: 'Answers to common questions about LeadStrategus AI agents, data, pricing, and how the platform builds B2B pipeline.',
  },
  '/use-cases': {
    title: 'AI Agent Use Cases for B2B Revenue Teams | LeadStrategus',
    description: 'See how B2B teams use LeadStrategus AI agents to discover accounts, detect buying intent, and book more meetings.',
  },
  '/why': {
    title: 'Why LeadStrategus | Signal-Led AI for B2B Pipeline',
    description: 'Why B2B teams choose LeadStrategus: proprietary buying signals, context-rich AI messaging, and an operator that runs your pipeline.',
  },
  '/tos': {
    title: 'Terms of Service | LeadStrategus',
    description: 'Terms of Service governing the use of the LeadStrategus website and AI agent platform.',
  },
  '/privacy': {
    title: 'Privacy Policy | LeadStrategus',
    description: 'How LeadStrategus collects, uses, and protects personal data.',
  },
  '/trust': {
    title: 'Trust Center | LeadStrategus',
    description: 'Security, privacy, and compliance practices at LeadStrategus.',
  },
};

/** Agents that render a detail page (others redirect to /agents). */
export const detailAgents = allAgents.filter((a) => a.whatItIs && a.howItWorks && a.pipelineRole);

export function getSeo(pathname: string): PageSeo {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (STATIC_SEO[path]) return STATIC_SEO[path];

  const [, section, slug] = path.split('/');
  if (section === 'agents') {
    const agent = detailAgents.find((a) => a.id === slug);
    if (agent) {
      return {
        title: `${agent.name} | AI Agent | LeadStrategus`,
        description: agent.description,
      };
    }
  }
  if (section === 'blog') {
    const post = blogPosts.find((p) => p.slug === slug);
    if (post) return { title: `${post.title} | LeadStrategus`, description: post.description };
  }
  if (section === 'use-cases') {
    const uc = useCases.find((u) => u.slug === slug);
    if (uc) return { title: `${uc.title} | LeadStrategus`, description: uc.metaDescription };
  }
  return DEFAULT_SEO;
}

export function canonicalUrl(pathname: string): string {
  const path = pathname.replace(/\/+$/, '');
  return `${SITE_URL}${path || '/'}`;
}

/** Every route that is prerendered to static HTML at build time. */
export function getPrerenderRoutes(): string[] {
  return [
    ...Object.keys(STATIC_SEO),
    ...detailAgents.map((a) => `/agents/${a.id}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    ...useCases.map((u) => `/use-cases/${u.slug}`),
  ];
}
