import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useSeo } from '../lib/useSeo';

const requirementOptions = [
  'Individual Agent Access',
  'Full System Deployment',
  'Custom Agent Build',
  'Partnership Inquiry',
  'General Question',
];

export default function Contact() {
  useSeo(
    'Contact LeadStrategus | Book a Demo',
    'Talk to our team about deploying AI agents or building your revenue pipeline system.'
  );
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    requirement: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      company: form.company,
      email: form.email,
      requirement: form.requirement,
      message: form.message,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', company: '', email: '', requirement: '', message: '' });
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 sm:pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
                Let's Talk.
              </h1>
              <p className="mt-4 text-lg text-gray-500">
                Twenty minutes, no slides. Whether you want to try a single agent, deploy the full Contextual Intelligence pipeline, or get an honest second opinion on your current DIY stack.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-electric-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-electric-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900">Email</h3>
                    <p className="text-sm text-gray-500 mt-0.5">hello@leadstrategus.ai</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-electric-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-electric-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900">Location</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Bengaluru, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 text-white">
                <h3 className="text-lg font-bold mb-2">Typical response time</h3>
                <p className="text-gray-300 text-sm">
                  We respond within 24 hours on business days. For urgent requests, mention it in your message.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-green-50 border border-green-100 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message sent</h3>
                  <p className="text-gray-600">We'll get back to you soon.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm font-medium text-electric-500 hover:text-electric-600"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="requirement" className="block text-sm font-medium text-navy-900 mb-1.5">
                      What are you looking for?
                    </label>
                    <select
                      id="requirement"
                      required
                      value={form.requirement}
                      onChange={(e) => updateField('requirement', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select an option</option>
                      {requirementOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-sm resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
