import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCases } from '../data/useCases';
import { useSeo } from '../lib/useSeo';

function renderContent(content: string) {
  const blocks = content.trim().split('\n\n');
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl sm:text-2xl font-bold text-navy-900 mt-10 mb-4 leading-snug">
          {block.slice(3)}
        </h2>
      );
    }
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-gray-600 leading-relaxed mb-0">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={j} className="font-semibold text-navy-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
}

export default function UseCaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const useCase = useMemo(() => useCases.find((uc) => uc.slug === slug), [slug]);

  useSeo(
    useCase ? `${useCase.title} | LeadStrategus` : 'Use Cases | LeadStrategus',
    useCase ? useCase.metaDescription : 'Explore how AI agents power real B2B revenue workflows.'
  );

  if (!useCase) return <Navigate to="/use-cases" replace />;

  const Icon = useCase.icon;

  const related = useCases.filter((uc) => uc.slug !== useCase.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/30 to-white">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <Link
          to="/use-cases"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Use Cases
        </Link>
      </div>

      {/* Article header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-electric-50 border border-electric-100 mb-6">
            <Icon className="w-5 h-5 text-electric-500" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight tracking-tight mb-5">
            {useCase.title}
          </h1>

          {/* Lead */}
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            {useCase.description}
          </p>
        </motion.div>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-12 shadow-md"
        >
          <img
            src={useCase.image}
            alt={useCase.title}
            className="w-full aspect-[16/7] object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-5 text-base"
        >
          {renderContent(useCase.content)}
        </motion.div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-navy-900 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Ready to deploy this workflow?</h3>
          <p className="text-white/60 mb-6 text-sm">Talk to our team about setting up AI agents for your pipeline.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-electric-500 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-electric-600 transition-colors"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            to="/use-cases"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Use Cases
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-navy-900 mb-8">More Use Cases</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((uc, i) => {
                const RelIcon = uc.icon;
                return (
                  <motion.div
                    key={uc.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                  >
                    <Link
                      to={`/use-cases/${uc.slug}`}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                    >
                      <div className="relative overflow-hidden" style={{ paddingTop: '55%' }}>
                        <img
                          src={uc.image}
                          alt={uc.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <div className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                            <RelIcon className="w-3.5 h-3.5 text-electric-500" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-sm font-bold text-navy-900 mb-2 leading-snug group-hover:text-electric-600 transition-colors flex-1">
                          {uc.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-electric-500">
                          Read more
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
