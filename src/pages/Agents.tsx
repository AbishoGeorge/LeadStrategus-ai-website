import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
import { funnelStages, allAgents } from '../data/agents';
import type { Agent } from '../data/agents';
import { useSeo } from '../lib/useSeo';

const statusFilters = ['All', 'Live', 'Coming Soon'] as const;

export default function Agents() {
  useSeo(
    'AI Sales Agents for Pipeline Growth | LeadStrategus',
    'Explore AI agents that find, qualify, and convert your next best customers automatically.'
  );
  const [activeStage, setActiveStage] = useState('all');
  const [activeStatus, setActiveStatus] = useState<typeof statusFilters[number]>('All');

  const filteredAgents = allAgents.filter((agent) => {
    const stageMatch = activeStage === 'all' || agent.stageSlug === activeStage;
    const statusMatch =
      activeStatus === 'All' ||
      (activeStatus === 'Live' && agent.status === 'live') ||
      (activeStatus === 'Coming Soon' && agent.status === 'coming-soon');
    return stageMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Agent Catalog
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl">
              Every agent in the LeadStrategus.ai Contextual Intelligence system. Pick one, combine many, or deploy the full pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <button
                onClick={() => setActiveStage('all')}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeStage === 'all'
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Stages
              </button>
              {funnelStages.map((stage) => (
                <button
                  key={stage.slug}
                  onClick={() => setActiveStage(stage.slug)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeStage === stage.slug
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {stage.name}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeStatus === status
                      ? 'bg-electric-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No agents match your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link
        to={`/agents/${agent.id}`}
        className="group block p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5 text-navy-700" />
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                agent.status === 'live' ? 'bg-green-500' : 'bg-amber-400'
              }`}
            />
            <span
              className={`text-xs font-medium ${
                agent.status === 'live' ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {agent.status === 'live' ? 'Live' : 'Coming Soon'}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-navy-900 mb-1">{agent.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">{agent.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-electric-500 bg-electric-50 px-2 py-0.5 rounded-md">
            {agent.stage}
          </span>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-electric-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
