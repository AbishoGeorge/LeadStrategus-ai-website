import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  X,
  Workflow,
  Settings,
  Layers,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const comparisonRows = [
  {
    category: 'Signal depth',
    us: 'LinkedIn Sales Nav + Naukri + Monster + tenders + news + annual reports',
    them: 'LinkedIn and Apollo - Naukri, Monster, and tenders structurally invisible',
  },
  {
    category: 'Context per account',
    us: 'Structured dossier, continuously refreshed from real-market signals',
    them: 'What you remember to ask the LLM, updated when you find the time',
  },
  {
    category: 'Messaging quality',
    us: 'Written from the specific signal that triggered the account, not generic',
    them: 'Drifts into template territory by Month 3 without someone tuning the prompt',
  },
  {
    category: 'Maintenance burden',
    us: 'Zero, our operator team maintains it weekly',
    them: '10+ hours a week after Month 3; founder doing RevOps instead of closing',
  },
  {
    category: 'India signal',
    us: 'Native - Naukri, Monster, GeM, CPPP, state portals, PSU boards',
    them: 'None, structural blind spot of every US-built tool',
  },
  {
    category: 'Operator expertise',
    us: '27 years demand-gen DNA, applied to your account list every week',
    them: 'Whoever is on your team and has time for it',
  },
  {
    category: 'Scale ceiling',
    us: 'Unlimited',
    them: '~200 accounts before context quality collapses',
  },
  {
    category: 'Setup time',
    us: '2-3 weeks, operator-guided',
    them: '1 weekend prototype; 3-6 months to production-grade',
  },
];

const whyCards = [
  {
    icon: Workflow,
    title: 'The signal nobody else has',
    description:
      'Naukri, Monster, and Indian tenders are invisible to every US-built tool. If your market includes India, or global companies with Indian operations, this is a structural moat that compounds every month you run it.',
  },
  {
    icon: Settings,
    title: 'Context before the LLM writes a word',
    description:
      'Same LLM as your DIY stack. Different input. A real context dossier per account, hiring signals, recent tender filings, tech-stack shifts, the CMO who joined eleven days ago, produces outreach that prospects actually reply to.',
  },
  {
    icon: Layers,
    title: 'An operator, not just a platform',
    description:
      'Every deployment includes operator time from the LeadStrategus team. Pattern recognition from 8 years of consulting and 27 years of the founder running this motion at AWS, SAP, Oracle, Gartner, and Pluralsight, applied to your account list weekly.',
  },
];

const requirementOptions = [
  'Individual Agent Access',
  'Full System Deployment',
  'Custom Agent Build',
  'Partnership Inquiry',
  'General Question',
];

export default function Why() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ComparisonSection />
      <WhyChooseSection />
      <IdealChoiceSection />
      <ContactFormSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.15]">
            Why LeadStrategus
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-[1.7] max-w-2xl mx-auto">
            Built to replace manual prospecting with intelligent systems
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="space-y-2">
      {comparisonRows.map((row, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={row.category}
            className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-navy-900">{row.category}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 space-y-3 border-t border-gray-100 pt-4">
                    <div className="rounded-xl bg-electric-50/60 border border-electric-100 px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-electric-500">
                          LeadStrategus
                        </span>
                        <Check className="w-3.5 h-3.5 text-electric-500" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{row.us}</p>
                    </div>

                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Traditional Tools
                        </span>
                        <X className="w-3.5 h-3.5 text-gray-300" />
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{row.them}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ComparisonSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight">
            How We Compare
          </h2>
        </motion.div>

        {/* Mobile accordion — hidden on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="block sm:hidden"
        >
          <ComparisonAccordion />
        </motion.div>

        {/* Desktop table — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden sm:block rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-white"
        >
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-gray-50 border-b border-gray-100">
            <div className="px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Category
              </span>
            </div>
            <div className="px-5 py-3 border-l border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-electric-500">
                LeadStrategus
              </span>
            </div>
            <div className="px-5 py-3 border-l border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Traditional Tools
              </span>
            </div>
          </div>

          {comparisonRows.map((row, i) => (
            <div
              key={row.category}
              className={`grid grid-cols-[1fr_1fr_1fr] ${
                i < comparisonRows.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="px-5 py-4 flex items-start">
                <span className="text-sm font-semibold text-navy-900">
                  {row.category}
                </span>
              </div>
              <div className="px-5 py-4 border-l border-gray-100 bg-electric-50/30 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-electric-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-relaxed">{row.us}</span>
              </div>
              <div className="px-5 py-4 border-l border-gray-100 flex items-start gap-2.5">
                <X className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-500 leading-relaxed">{row.them}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50/80 to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight">
            Why Choose LeadStrategus
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {whyCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-electric-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-electric-500" />
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-[1.7]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IdealChoiceSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-5"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-electric-50/50 border border-electric-100 shadow-sm">
            <h3 className="text-lg font-bold text-navy-900 mb-4">
              Choose LeadStrategus.ai if:
            </h3>
            <ul className="space-y-3">
              {[
                'You have built a ChatGPT + Clay DIY stack and hit the maintenance ceiling',
                'You sell into India, or into Indian arms of global companies, and your current tools miss the hiring and tender signals',
                'Your founder is doing outbound manually and the time cost is hurting you',
                'You need signal depth and context-rich messaging with a human keeping it calibrated',
          
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-electric-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-navy-900 mb-4">
              Other tools might fit if:
            </h3>
            <ul className="space-y-3">
              {[
                'You are early-stage, still finding PMF, and your ICP might change next quarter',
                'Your volume is under 50 accounts a month and you are hitting targets',
                "You want full autonomous send with no human review, that is not us, by design",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-500 leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    requirement: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('contact_submissions').insert({
      name: `${form.firstName} ${form.lastName}`.trim(),
      company: form.company,
      email: form.email,
      requirement: form.requirement,
      message: `Phone: ${form.phone}`,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', requirement: '' });
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 leading-[1.7] mb-6">
              Tell us about your team, your current stack, and what's frustrating you. We'll show you exactly how LeadStrategus.ai fits, and tell you honestly if it doesn't.
            </p>
            <p className="text-sm text-gray-500">
              Typical response time: within 24 hours on business days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-green-50 border border-green-100 text-center shadow-sm">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy-900 mb-2">Message sent</h3>
                <p className="text-gray-600">We'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm font-medium text-electric-500 hover:text-electric-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="why-fn" className="block text-sm font-medium text-navy-900 mb-1.5">
                      First Name
                    </label>
                    <input
                      id="why-fn"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="why-ln" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Last Name
                    </label>
                    <input
                      id="why-ln"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="why-email" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Email
                  </label>
                  <input
                    id="why-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="why-phone" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Phone
                  </label>
                  <input
                    id="why-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="why-company" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Company
                  </label>
                  <input
                    id="why-company"
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="why-req" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Requirement
                  </label>
                  <select
                    id="why-req"
                    required
                    value={form.requirement}
                    onChange={(e) => updateField('requirement', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select an option</option>
                    {requirementOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50/80 to-gray-50/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight mb-4">
            Ready to move past the DIY ceiling?
          </h2>
          <p className="text-gray-600 leading-[1.7] mb-8 max-w-xl mx-auto">
            Talk to Kingshuk and see how LeadStrategus.ai turns the signals your competitors can't see into meetings on your calendar.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors"
          >
            Book a Call with Kingshuk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
