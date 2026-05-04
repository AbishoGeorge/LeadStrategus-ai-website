import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { funnelStages } from '../../data/agents';
import type { Agent, FunnelStage } from '../../data/agents';

interface StageTheme {
  tileBg: string;
  tileHoverBg: string;
  iconBg: string;
  iconColor: string;
  accentDot: string;
  labelBg: string;
  borderHover: string;
  headerBg: string;
}

const themes: Record<string, StageTheme> = {
  'account-discovery': {
    tileBg: 'bg-gradient-to-br from-blue-50/60 via-white/40 to-blue-100/30',
    tileHoverBg: 'hover:from-blue-50 hover:via-blue-50/60 hover:to-blue-100/50',
    iconBg: 'bg-gradient-to-br from-blue-50 to-blue-100/80',
    iconColor: 'text-blue-600',
    accentDot: 'bg-blue-500',
    labelBg: 'bg-gradient-to-r from-blue-600 to-blue-500',
    borderHover: 'hover:border-blue-300/60',
    headerBg: 'bg-gradient-to-r from-blue-50/80 to-blue-50/30',
  },
  'buying-intent': {
    tileBg: 'bg-gradient-to-br from-emerald-50/60 via-white/40 to-emerald-100/30',
    tileHoverBg: 'hover:from-emerald-50 hover:via-emerald-50/60 hover:to-emerald-100/50',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/80',
    iconColor: 'text-emerald-600',
    accentDot: 'bg-emerald-500',
    labelBg: 'bg-gradient-to-r from-emerald-600 to-emerald-500',
    borderHover: 'hover:border-emerald-300/60',
    headerBg: 'bg-gradient-to-r from-emerald-50/80 to-emerald-50/30',
  },
  'account-prioritization': {
    tileBg: 'bg-gradient-to-br from-amber-50/60 via-white/40 to-amber-100/30',
    tileHoverBg: 'hover:from-amber-50 hover:via-amber-50/60 hover:to-amber-100/50',
    iconBg: 'bg-gradient-to-br from-amber-50 to-amber-100/80',
    iconColor: 'text-amber-600',
    accentDot: 'bg-amber-500',
    labelBg: 'bg-gradient-to-r from-amber-600 to-amber-500',
    borderHover: 'hover:border-amber-300/60',
    headerBg: 'bg-gradient-to-r from-amber-50/80 to-amber-50/30',
  },
  'messaging-outreach': {
    tileBg: 'bg-gradient-to-br from-rose-50/60 via-white/40 to-rose-100/30',
    tileHoverBg: 'hover:from-rose-50 hover:via-rose-50/60 hover:to-rose-100/50',
    iconBg: 'bg-gradient-to-br from-rose-50 to-rose-100/80',
    iconColor: 'text-rose-600',
    accentDot: 'bg-rose-500',
    labelBg: 'bg-gradient-to-r from-rose-600 to-rose-500',
    borderHover: 'hover:border-rose-300/60',
    headerBg: 'bg-gradient-to-r from-rose-50/80 to-rose-50/30',
  },
  'monitoring-reactivation': {
    tileBg: 'bg-gradient-to-br from-cyan-50/60 via-white/40 to-cyan-100/30',
    tileHoverBg: 'hover:from-cyan-50 hover:via-cyan-50/60 hover:to-cyan-100/50',
    iconBg: 'bg-gradient-to-br from-cyan-50 to-cyan-100/80',
    iconColor: 'text-cyan-600',
    accentDot: 'bg-cyan-500',
    labelBg: 'bg-gradient-to-r from-cyan-600 to-cyan-500',
    borderHover: 'hover:border-cyan-300/60',
    headerBg: 'bg-gradient-to-r from-cyan-50/80 to-cyan-50/30',
  },
  'meeting-conversion': {
    tileBg: 'bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/30',
    tileHoverBg: 'hover:from-green-50 hover:via-green-50/60 hover:to-green-100/50',
    iconBg: 'bg-gradient-to-br from-green-50 to-green-100/80',
    iconColor: 'text-green-600',
    accentDot: 'bg-green-500',
    labelBg: 'bg-gradient-to-r from-green-600 to-green-500',
    borderHover: 'hover:border-green-300/60',
    headerBg: 'bg-gradient-to-r from-green-50/80 to-green-50/30',
  },
  'data-ops': {
    tileBg: 'bg-gradient-to-br from-slate-50/60 via-white/40 to-slate-100/30',
    tileHoverBg: 'hover:from-slate-50 hover:via-slate-50/60 hover:to-slate-100/50',
    iconBg: 'bg-gradient-to-br from-slate-50 to-slate-100/80',
    iconColor: 'text-slate-600',
    accentDot: 'bg-slate-500',
    labelBg: 'bg-gradient-to-r from-slate-600 to-slate-500',
    borderHover: 'hover:border-slate-300/60',
    headerBg: 'bg-gradient-to-r from-slate-50/80 to-slate-50/30',
  },
};

function StatusBadge({ status }: { status: 'live' | 'coming-soon' }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-[3px]">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
        <span className="text-[7px] font-bold uppercase tracking-wider text-green-600">Live</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-[3px]">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
      <span className="text-[7px] font-medium uppercase tracking-wider text-gray-400">Soon</span>
    </span>
  );
}

function BrickTile({ agent }: { agent: Agent }) {
  const Icon = agent.icon;
  const t = themes[agent.stageSlug];

  return (
    <Link
      to={`/agents/${agent.id}`}
      className={`group flex flex-col items-center justify-center text-center px-1.5 py-2 h-full border-r border-b border-gray-200/50 ${t.tileBg} ${t.tileHoverBg} ${t.borderHover} transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.02)]`}
    >
      <div className={`w-6 h-6 rounded-lg ${t.iconBg} shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center mb-1 group-hover:scale-110 group-hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-all duration-200`}>
        <Icon className={`w-3 h-3 ${t.iconColor}`} />
      </div>
      <h4 className="text-[9.5px] font-semibold text-gray-800 leading-[1.25] mb-0.5 px-0.5 group-hover:text-gray-950 transition-colors">
        {agent.name}
      </h4>
      <StatusBadge status={agent.status} />
    </Link>
  );
}

function DesktopStageRow({ stage, stageIndex, isLast }: { stage: FunnelStage; stageIndex: number; isLast: boolean }) {
  const count = stage.agents.length;
  const t = themes[stage.slug];

  return (
    <div className={`flex ${!isLast ? 'border-b-0' : ''}`}>
      <div className={`w-36 xl:w-40 shrink-0 flex items-center border-r border-gray-200/50 px-3 py-2 ${t.headerBg}`}>
        <div className="flex items-start gap-2">
          <div className={`w-2 h-2 rounded-full shrink-0 mt-[3px] ${t.accentDot} shadow-[0_0_4px_rgba(0,0,0,0.15)]`} />
          <div>
            <span className="block text-[8px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
              Stage {stageIndex + 1}
            </span>
            <span className="block text-[10.5px] font-bold text-gray-900 leading-tight">
              {stage.name}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
        {stage.agents.map((agent) => (
          <BrickTile key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

function TabletTile({ agent }: { agent: Agent }) {
  const Icon = agent.icon;
  const t = themes[agent.stageSlug];

  return (
    <Link
      to={`/agents/${agent.id}`}
      className={`group flex items-center gap-2 px-2.5 py-2 border-r border-b border-gray-200/50 ${t.tileBg} ${t.tileHoverBg} ${t.borderHover} transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.02)]`}
    >
      <div className={`shrink-0 w-6 h-6 rounded-lg ${t.iconBg} shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
        <Icon className={`w-3 h-3 ${t.iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-[10px] font-semibold text-gray-800 leading-tight truncate group-hover:text-gray-950">
          {agent.name}
        </h4>
        <div className="mt-px">
          <StatusBadge status={agent.status} />
        </div>
      </div>
    </Link>
  );
}

function TabletStageRow({ stage, stageIndex }: { stage: FunnelStage; stageIndex: number }) {
  const t = themes[stage.slug];
  const cols = stage.agents.length <= 3 ? 3 : stage.agents.length <= 5 ? Math.min(stage.agents.length, 4) : Math.min(stage.agents.length, 5);

  return (
    <div>
      <div className={`flex items-center gap-2 px-3 py-1.5 border-b border-gray-200/50 ${t.headerBg}`}>
        <div className={`w-2 h-2 rounded-full shrink-0 ${t.accentDot} shadow-[0_0_4px_rgba(0,0,0,0.15)]`} />
        <span className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
          {stageIndex + 1}
        </span>
        <span className="text-[10.5px] font-bold text-gray-900">{stage.name}</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {stage.agents.map((agent) => (
          <TabletTile key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

function MobileTile({ agent }: { agent: Agent }) {
  const Icon = agent.icon;
  const t = themes[agent.stageSlug];
  const isLive = agent.status === 'live';

  return (
    <Link
      to={`/agents/${agent.id}`}
      className={`group relative flex flex-col items-center text-center rounded-xl border border-gray-200/60 ${t.tileBg} ${t.tileHoverBg} transition-all duration-200 px-2 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.7)] active:scale-[0.98]`}
    >
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-green-400 to-emerald-400" />
      )}
      <div className={`w-8 h-8 rounded-xl ${t.iconBg} shadow-[0_2px_6px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center mb-1.5`}>
        <Icon className={`w-4 h-4 ${t.iconColor}`} />
      </div>
      <h4 className="text-[11px] font-semibold text-gray-900 leading-snug mb-1 px-0.5">
        {agent.name}
      </h4>
      {isLive ? (
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
          <span className="text-[8px] font-bold uppercase tracking-wider text-green-600">Live</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300/80" />
          <span className="text-[8px] font-medium uppercase tracking-wider text-gray-400">Soon</span>
        </span>
      )}
    </Link>
  );
}

function MobileStageRow({ stage, stageIndex }: { stage: FunnelStage; stageIndex: number }) {
  const t = themes[stage.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: stageIndex * 0.04 }}
      className={`rounded-2xl border border-gray-200/60 ${t.headerBg} shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden`}
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.accentDot} shadow-[0_0_5px_rgba(0,0,0,0.15)]`} />
        <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
          Stage {stageIndex + 1}
        </span>
        <span className="text-[13px] font-bold text-gray-900">{stage.name}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 pb-3">
        {stage.agents.map((agent) => (
          <MobileTile key={agent.id} agent={agent} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TileSystem() {
  return (
    <section className="pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-10 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Seven signal sources. One connected pipeline.
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
            Every stage of your B2B funnel, powered by specialised AI agents that work together, each one fed by the real-market signals your competitors can't see.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="hidden lg:block border border-gray-200/70 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
            {funnelStages.map((stage, i) => (
              <DesktopStageRow
                key={stage.slug}
                stage={stage}
                stageIndex={i}
                isLast={i === funnelStages.length - 1}
              />
            ))}
          </div>

          <div className="hidden sm:block lg:hidden border border-gray-200/70 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
            {funnelStages.map((stage, i) => (
              <TabletStageRow key={stage.slug} stage={stage} stageIndex={i} />
            ))}
          </div>

          <div className="sm:hidden flex flex-col gap-3">
            {funnelStages.map((stage, i) => (
              <MobileStageRow key={stage.slug} stage={stage} stageIndex={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
