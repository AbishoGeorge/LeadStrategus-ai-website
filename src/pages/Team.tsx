import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';
import { useSeo } from '../lib/useSeo';

const teamMembers = [
  {
    name: 'Arjun Nair',
    role: 'Founder & CEO',
    description: 'Builds systems that turn data into pipeline.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
  },
  {
    name: 'Priya Menon',
    role: 'Head of GTM Strategy',
    description: 'Turns revenue goals into executable AI-driven workflows.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
  },
  {
    name: 'Rohan Desai',
    role: 'Lead AI Engineer',
    description: 'Architects the agent infrastructure that powers every deployment.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Revenue Operations Lead',
    description: 'Connects agent outputs to CRM, outreach, and measurable results.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
  },
  {
    name: 'Karan Bhat',
    role: 'Growth & Partnerships',
    description: 'Expands the platform across verticals and partner ecosystems.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
  },
];

const achievements = [
  { value: '50+', label: 'GTM Systems Built' },
  { value: '100K+', label: 'Leads Processed' },
  { value: '5+', label: 'Industries Served' },
  { value: '3x', label: 'Avg. Pipeline Velocity Gain' },
];

const howWeWork = [
  {
    title: 'AI meets GTM expertise',
    body: 'We don\'t bolt AI onto outdated playbooks. Every system is designed by people who have run sales pipelines and built the technology to automate them.',
  },
  {
    title: 'Outcomes over activity',
    body: 'Vanity metrics don\'t close deals. We measure success by pipeline generated, meetings booked, and revenue unlocked — not emails sent.',
  },
  {
    title: 'Systems, not campaigns',
    body: 'A one-off campaign decays the moment it ends. We build compounding pipeline infrastructure that works every day without manual input.',
  },
];

export default function Team() {
  useSeo(
    'Meet the Team | LeadStrategus',
    'Meet the team building AI-powered B2B revenue systems and pipeline automation.'
  );
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TeamGridSection />
      <AchievementsSection />
      <HowWeWorkSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-16 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-50 border border-electric-100 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-500" />
            <span className="text-xs font-semibold text-electric-600 tracking-wide uppercase">
              Built by GTM + AI Experts
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.15]">
            <div>
              Not another AI startup.
            </div>
            <div className="mt-1 text-navy-700 font-semibold">
              A consulting firm that productised itself.
            </div>
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-[1.7] max-w-2xl mx-auto">
            Meet the operators, GTM practitioners, and engineers behind LeadStrategus.ai. Eight years of consulting. Twenty-seven years of the founder building this exact motion at AWS, SAP, Oracle, Gartner, and Pluralsight.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TeamGridSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-navy-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-electric-500 mt-0.5 uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
                <a
                  href={member.linkedin}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg hover:bg-gray-50"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="w-4 h-4 text-gray-400 hover:text-navy-900 transition-colors" />
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-[1.7]">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50/80 to-gray-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight">
            What We've Built
          </h2>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            Numbers that reflect real pipeline work, not marketing projections.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-medium text-gray-500 uppercase tracking-wider leading-snug">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight leading-tight">
            How We Work
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {howWeWork.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-gray-50/70 border border-gray-100"
            >
              <div className="w-7 h-7 rounded-lg bg-electric-50 border border-electric-100 flex items-center justify-center mb-4">
                <span className="text-xs font-bold text-electric-500">{i + 1}</span>
              </div>
              <h3 className="text-base font-bold text-navy-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-[1.7]">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
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
            Want to see how this team can build your pipeline?
          </h2>
          <p className="text-gray-600 leading-[1.7] mb-8 max-w-xl mx-auto">
            Talk to us about your growth goals. We'll show you exactly how we'd automate your pipeline from discovery to booked meetings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors"
            >
              Book Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/agents"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 text-sm font-medium hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              Explore Agents
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
