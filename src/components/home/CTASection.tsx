import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="pt-8 pb-16 sm:pb-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(24,95,165,0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(186,117,23,0.15),transparent_50%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to see what's after the DIY ceiling?
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
              Explore the full agent system, or talk to the team about a custom deployment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/agents"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-navy-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Explore Agents
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
