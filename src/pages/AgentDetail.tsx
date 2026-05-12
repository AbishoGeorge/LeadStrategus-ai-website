{/*import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { getAgentById, getAgentsByStage } from '../data/agents';
import { Helmet } from 'react-helmet-async';

export default function AgentDetail() {
  const { agentId } = useParams<{ agentId: string }>();
  const agent = agentId ? getAgentById(agentId) : undefined;

  if (!agent) return <Navigate to="/agents" replace />;

  const Icon = agent.icon;
  const relatedAgents = getAgentsByStage(agent.stageSlug).filter(
    (a) => a.id !== agent.id
  );

  const platformKeywords = ['linkedin', 'naukri', 'google scraper'];
  const usesExternalPlatform = platformKeywords.some((kw) =>
    agent.name.toLowerCase().includes(kw)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">

     
      <Helmet>
        <title>{agent.name} | AI Agent | LeadStrategus</title>

        <meta
          name="description"
          content={`${agent.name} - AI agent by LeadStrategus for automated B2B workflows, signal detection, and pipeline generation.`}
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={`${agent.name} | LeadStrategus AI Agents`} />
        <meta
          property="og:description"
          content="Explore AI agents that automate B2B pipeline generation using real-time market signals."
        />
      </Helmet>

   
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >

          <Link
            to="/agents"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">

            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-50 to-blue-50 border border-electric-100 flex items-center justify-center">
                <Icon className="w-7 h-7 text-electric-600" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
                    {agent.name}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-electric-500 bg-electric-50 px-2.5 py-0.5 rounded-lg">
                    {agent.stage}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        agent.status === 'live'
                          ? 'bg-green-500'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        agent.status === 'live'
                          ? 'text-green-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {agent.status === 'live' ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {agent.description}
            </p>
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8">
              <h3 className="text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wider">
                What it is
              </h3>
            
              <p className="text-gray-600 leading-relaxed">
                This agent is designed to automate B2B workflows by identifying opportunities, processing data signals, and enabling revenue generation through intelligent automation.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8">
              <h3 className="text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wider">
                How it works
              </h3>
            
              <p className="text-gray-600 leading-relaxed">
                {agent.details}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8">
              <h3 className="text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wider">
                How it fits into the pipeline
              </h3>
            
              <p className="text-gray-600 leading-relaxed">
                This agent works as part of the LeadStrategus AI pipeline. It collaborates with other agents to move prospects through discovery, enrichment, outreach, and conversion stages.
              </p>
            </div>

            {usesExternalPlatform && (
              <p className="text-[11px] text-gray-400 mb-6">
                Uses publicly available data. Ensure compliance with platform terms.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {agent.status === 'live' ? (
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors"
                >
                  Use This Agent
                  <ExternalLink className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
                >
                  Get Notified at Launch
                </Link>
              )}

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-navy-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Book Demo
              </Link>
            </div>
          </div>

          {relatedAgents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-bold text-navy-900 mb-4">
                Other agents in {agent.stage}
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {relatedAgents.slice(0, 4).map((related) => {
                  const RelIcon = related.icon;
                  return (
                    <Link
                      key={related.id}
                      to={`/agents/${related.id}`}
                      className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                        <RelIcon className="w-4 h-4 text-navy-700" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-navy-900 truncate">
                          {related.name}
                        </h4>

                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              related.status === 'live'
                                ? 'bg-green-500'
                                : 'bg-amber-400'
                            }`}
                          />
                          <span
                            className={`text-xs ${
                              related.status === 'live'
                                ? 'text-green-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {related.status === 'live'
                              ? 'Live'
                              : 'Coming Soon'}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-electric-500 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
*/}


import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { getAgentById, getAgentsByStage } from '../data/agents';
import { Helmet } from 'react-helmet-async';

export default function AgentDetail() {
  const { agentId } = useParams<{ agentId: string }>();
  const agent = agentId ? getAgentById(agentId) : undefined;

  if (!agent) return <Navigate to="/agents" replace />;
  if (!agent.whatItIs || !agent.howItWorks || !agent.pipelineRole) {
  return <Navigate to="/agents" replace />;
  }

  const Icon = agent?.icon;
  const relatedAgents = getAgentsByStage(agent.stageSlug).filter(
    (a) => a.id !== agent.id
  );

  const platformKeywords = ['linkedin', 'naukri', 'google scraper'];
  const usesExternalPlatform = platformKeywords.some((kw) =>
    agent.name.toLowerCase().includes(kw)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">

      {/* SEO */}
      <Helmet>
        <title>{agent.name} | AI Agent | LeadStrategus</title>

        <meta
          name="description"
          content={`${agent.name} - AI agent by LeadStrategus for automated B2B workflows, signal detection, and pipeline generation.`}
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={`${agent.name} | LeadStrategus AI Agents`} />
        <meta
          property="og:description"
          content="Explore AI agents that automate B2B pipeline generation using real-time market signals."
        />
      </Helmet>

      {/* PAGE WRAPPER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >

          <Link
            to="/agents"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">

            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-50 to-blue-50 border border-electric-100 flex items-center justify-center">
                {Icon && <Icon className="w-7 h-7 text-electric-600" />}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
                    {agent.name}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-electric-500 bg-electric-50 px-2.5 py-0.5 rounded-lg">
                    {agent.stage}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        agent.status === 'live'
                          ? 'bg-green-500'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        agent.status === 'live'
                          ? 'text-green-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {agent.status === 'live' ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {agent.description}
            </p>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8">
              <h3 className="text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wider">
                What it is
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {agent.whatItIs}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8">
              <h3 className="text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wider">
                How it works
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {agent.howItWorks}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8">
              <h3 className="text-sm font-semibold text-navy-900 mb-3 uppercase tracking-wider">
                How it fits into the pipeline
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {agent.pipelineRole}
              </p>
            </div>

            {usesExternalPlatform && (
              <p className="text-[11px] text-gray-400 mb-6">
                Uses publicly available data. Ensure compliance with platform terms.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {agent.status === 'live' ? (
                <a
                  href={agent.marketplaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors"
                >
                  Use This Agent
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link  
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
                >
                  Get Notified at Launch
                </Link>
              )}

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-navy-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Book Demo
              </Link>
            </div>
          </div>

          {relatedAgents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-bold text-navy-900 mb-4">
                Other agents in {agent.stage}
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {relatedAgents.slice(0, 4).map((related) => {
                  const RelIcon = related.icon;
                  return (
                    <Link
                      key={related.id}
                      to={`/agents/${related.id}`}
                      className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                        <RelIcon className="w-4 h-4 text-navy-700" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-navy-900 truncate">
                          {related.name}
                        </h4>

                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              related.status === 'live'
                                ? 'bg-green-500'
                                : 'bg-amber-400'
                            }`}
                          />
                          <span
                            className={`text-xs ${
                              related.status === 'live'
                                ? 'text-green-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {related.status === 'live'
                              ? 'Live'
                              : 'Coming Soon'}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-electric-500 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
