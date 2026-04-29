import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Wrench, Rocket } from 'lucide-react';
import Hero from '../components/home/Hero';
import TileSystem from '../components/home/TileSystem';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import { useSeo } from '../lib/useSeo';

const offerings = [
  {
    icon: Layers,
    title: 'Individual Agents',
    desc: 'Pick the agents you need. Use them standalone via our marketplace.',
    to: '/agents',
  },
  {
    icon: Rocket,
    title: 'Full System Deploy',
    desc: 'Deploy the complete agent pipeline for end-to-end revenue operations.',
    to: '/build',
  },
  {
    icon: Wrench,
    title: 'Custom Build',
    desc: 'Agents tailored to your exact workflow. Your logic, our infrastructure.',
    to: '/build',
  },
];

export default function Home() {
  useSeo(
    'AI Agents for B2B Lead Generation | LeadStrategus',
    'Find and convert high-intent B2B accounts using AI agents. Automate your pipeline from discovery to revenue.'
  );
  return (
    <>
      <Hero />
      <TileSystem />

      {/* 3 cards */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {offerings.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className="group block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-electric-500" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </>
  );
}
