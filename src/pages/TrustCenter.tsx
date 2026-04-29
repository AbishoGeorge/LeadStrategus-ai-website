import { motion } from 'framer-motion';
import { Shield, Eye, Unplug, Scale } from 'lucide-react';

const principles = [
  {
    icon: Scale,
    title: 'Compliance Approach',
    description:
      'LeadStrategus is built with compliance in mind. Our agents operate within the boundaries of publicly available data and user-provided inputs. We design our systems to respect platform terms of service and applicable regulations. Users are responsible for ensuring their specific use cases comply with local laws.',
  },
  {
    icon: Eye,
    title: 'No Private Data Usage',
    description:
      'Our agents do not access, scrape, or process private, gated, or confidential data without explicit authorization. All data sources used by our agents are publicly available business information including company websites, news, job postings, and financial filings.',
  },
  {
    icon: Unplug,
    title: 'Platform Independence',
    description:
      'LeadStrategus is not affiliated with, endorsed by, or partnered with any third-party platforms whose data may appear in agent outputs. All trademarks and brand names belong to their respective owners. Our agents operate independently and do not violate platform terms.',
  },
  {
    icon: Shield,
    title: 'Responsible Usage',
    description:
      'We expect all users to use LeadStrategus responsibly and ethically. This means respecting opt-out preferences, complying with anti-spam regulations, not engaging in deceptive practices, and ensuring that outreach activities are conducted in good faith with legitimate business purposes.',
  },
];

export default function TrustCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">
              Trust Center
            </h1>
            <p className="text-lg text-gray-500 mb-12">
              How we approach data, compliance, and responsible AI usage.
            </p>
          </motion.div>

          <div className="space-y-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-electric-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-electric-500" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-navy-900 mb-2">
                        {p.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-100"
          >
            <h3 className="text-base font-bold text-navy-900 mb-2">
              Questions about our practices?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We are committed to transparency. If you have questions about how we handle data, our compliance approach, or responsible usage guidelines, reach out to us at{' '}
              <a href="mailto:email@leadstrategus.com" className="text-electric-500 hover:text-electric-600 transition-colors">
                email@leadstrategus.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
