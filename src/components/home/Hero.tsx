import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-electric-50/40 via-white to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-electric-100/30 to-brand-red-50/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/5 border border-navy-900/10 mb-6">
            <Bot className="w-4 h-4 text-electric-500" />
            <span className="text-sm font-medium text-navy-900">AI Agent Platform for B2B Revenue</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight tracking-tight">
            Contextual Intelligence for B2B Sales.{' '}
            <span className="bg-gradient-to-r from-electric-500 to-electric-700 bg-clip-text text-transparent">
              ChatGPT + Claude + Clay got you 80% of the way. We take it the rest.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            LeadStrategus.ai monitors buying signals across LinkedIn Sales Nav, Naukri, Monster, tenders, and news - assembles a context dossier per account, then drafts outreach from the signal. You approve. It sends. Meetings land on your calendar.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/agents"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-all hover:shadow-lg hover:shadow-navy-900/20"
            >
              Explore Agents
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-navy-200 text-navy-900 font-medium hover:border-navy-300 hover:bg-navy-50 transition-all"
            >
              Book a Call with Kingshuk
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
