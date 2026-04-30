import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    rating: 5,
    quote:
      "LeadStrategus's commitment to in-depth understanding exceeded initial project goals.",
    name: 'Abhishek Rungta',
    role: 'CEO, Indus Net Technologies Limited',
  },
  {
    rating: 5,
    quote:
      'They were flexible enough to make any last-minute changes.',
    name: 'Jeffrey Rakesh',
    role: 'Head of Strategic Initiatives, Stibo Systems',
  },
  {
    rating: 5,
    quote:
      'I liked the deep interest with which they worked on different aspects.',
    name: 'Srinibas Behera',
    role: 'Founder & CEO, Retigence',
  },
  {
    rating: 5,
    quote:
      'Their expertise in digging out information through secondary research at every stage was very impressive.',
    name: 'Vidya A Mohan',
    role: 'Director, Ernst & Young',
  },
  {
    rating: 5,
    quote:
      "LeadStrategus' ABM model is extremely well-researched.",
    name: 'Anonymous',
    role: 'Head of Marketing, Speridian',
  },
  {
    rating: 5,
    quote:
      'They delivered on time and were dedicated to their work.',
    name: 'Ravi Kumar',
    role: 'Director of Technology, AskMeIdentity',
  },
  {
    rating: 5,
    quote:
      'We had a good time working with LeadStrategus across multiple instances.',
    name: 'Prashant Shetty',
    role: 'Former VP, SOA IT Solutions',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const n = testimonials.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % n);
  }, [n]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + n) % n);
  }, [n]);

  const getCardProps = (i: number) => {
    const prevIdx = (active - 1 + n) % n;
    const nextIdx = (active + 1) % n;

    if (i === active) {
      return { translateX: '0px', scale: 1, opacity: 1, zIndex: 3, visible: true };
    }
    if (i === prevIdx) {
      return { translateX: '-52%', scale: 0.9, opacity: 0.6, zIndex: 2, visible: true };
    }
    if (i === nextIdx) {
      return { translateX: '52%', scale: 0.9, opacity: 0.6, zIndex: 2, visible: true };
    }
    return {
      translateX: direction > 0 ? '100%' : '-100%',
      scale: 0.85,
      opacity: 0,
      zIndex: 1,
      visible: false,
    };
  };

  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-50/80 to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight">
            Here's what our customers say about us
          </h2>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <div
            className="relative w-full max-w-xl"
            style={{ height: '260px' }}
          >
            {testimonials.map((t, i) => {
              const { translateX, scale, opacity, zIndex } = getCardProps(i);
              return (
                <motion.div
                  key={t.name + i}
                  animate={{ x: translateX, scale, opacity, zIndex }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transformOrigin: 'center center',
                  }}
                >
                  <div
                    className={`p-6 rounded-2xl bg-white border transition-shadow duration-300 ${
                      i === active
                        ? 'border-gray-200 shadow-xl'
                        : 'border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, si) => (
                        <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-[1.7] mb-5 italic">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-navy-900 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-6 h-2 bg-navy-900'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-navy-900 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
