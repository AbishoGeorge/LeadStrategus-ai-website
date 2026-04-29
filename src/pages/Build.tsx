import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Rocket, Wrench, ArrowRight, Check } from 'lucide-react';
import { useSeo } from '../lib/useSeo';

const offerings = [
  {
    icon: Layers,
    title: 'Individual Agents',
    subtitle: 'Pick & use',
    description: 'Access agents from our marketplace. Each agent works standalone. Plug into your existing stack.',
    features: [
      'Pay per use or subscribe',
      'API access included',
      'No setup required',
      'Works with any CRM',
    ],
    cta: 'Browse Agents',
    ctaLink: '/agents',
    gradient: 'from-blue-50 to-sky-50',
    border: 'border-blue-100',
  },
  {
    icon: Rocket,
    title: 'Full System Deployment',
    subtitle: 'Deploy the pipeline',
    description: 'Deploy the complete LeadStrategus agent system. End-to-end pipeline from discovery to revenue.',
    features: [
      'All 7 funnel stages',
      'Connected agent workflows',
      'Centralized dashboard',
      'Priority support',
    ],
    cta: 'Talk to Us',
    ctaLink: '/contact',
    gradient: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    featured: true,
  },
  {
    icon: Wrench,
    title: 'Custom Agent Build',
    subtitle: 'Built for you',
    description: 'Need something specific? We build agents tailored to your exact workflow and data sources.',
    features: [
      'Your logic, our infrastructure',
      'Custom data integrations',
      'Dedicated agent training',
      'Ongoing optimization',
    ],
    cta: 'Start a Project',
    ctaLink: '/contact',
    gradient: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
  },
];

export default function Build() {
  useSeo(
    'Custom AI Agents for B2B Workflows | LeadStrategus',
    'Build AI agents tailored to your workflow. Automate prospecting, outreach, and pipeline growth.'
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Three ways to deploy agents.
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Standalone agents. Full system. Custom builds. Choose what fits your team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {offerings.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} ${
                    item.featured ? 'ring-2 ring-electric-500/20' : ''
                  }`}
                >
                  {item.featured && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-electric-500 text-white text-xs font-semibold">
                      Most Popular
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-navy-700" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.subtitle}
                  </span>
                  <h2 className="text-xl font-bold text-navy-900 mt-1 mb-3">{item.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.description}</p>

                  <ul className="space-y-2.5 mb-8">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={item.ctaLink}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      item.featured
                        ? 'bg-navy-900 text-white hover:bg-navy-800'
                        : 'bg-white text-navy-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-2xl bg-navy-900 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(24,95,165,0.3),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Not sure which option fits?
              </h2>
              <p className="text-gray-300 mb-6">
                We will help you figure it out. No pressure, no sales pitch.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-navy-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Let's Talk
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
