import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCases } from '../data/useCases';

export default function UseCases() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              How Teams Use LeadStrategus.ai
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Real workflows powered by Contextual Intelligence
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={uc.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/use-cases/${uc.slug}`}
                    className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
                  >
                    <div className="relative overflow-hidden" style={{ paddingTop: '58%' }}>
                      <img
                        src={uc.image}
                        alt={uc.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <Icon className="w-4 h-4 text-electric-500" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-navy-900 mb-2 leading-snug group-hover:text-electric-600 transition-colors">
                        {uc.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                        {uc.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-electric-500 pt-4 border-t border-gray-50">
                        Read more
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
