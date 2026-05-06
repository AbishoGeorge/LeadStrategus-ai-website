import { motion } from 'framer-motion';

export default function TrustCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">
              Trust Center
            </h1>

            <p className="text-sm text-gray-500 mb-2">
              Last Updated: April 15, 2026
            </p>

            <p className="text-lg text-gray-500 mb-12">
              How LeadStrategus approaches data, privacy, compliance, and security.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-10 text-gray-700 text-sm leading-relaxed">

            <p>
              We believe that powerful tools and responsible practices are not in conflict, they reinforce each other. This page explains our philosophy, what we do, and what we do not do. We keep this language plain because trust is built on clarity, not legal fencing.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">1. Our Approach to Data</h2>
              <p>
                LeadStrategus is built on a simple principle: we work with data that is publicly accessible and legitimately available. Our AI agents are designed to extract, structure, and analyse information from open, public-facing sources.
              </p>

              <p className="mt-3 font-semibold">What 'publicly available' means to us:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Data accessible without login credentials, authentication, or circumvention of any access control</li>
                <li>Information visible and indexable on the public web</li>
                <li>Data that individuals or organisations have voluntarily made available in public-facing contexts</li>
              </ul>

              <p className="mt-3">
                We recognise that 'public' does not automatically mean 'free to use for any purpose.' Our Terms and this page reflect that nuance. We encourage users to approach data responsibility with the same care we do.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">2. Platform Independence</h2>
              <p>
                LeadStrategus is an independent software company. We are not affiliated with, endorsed by, or partnered with LinkedIn, Microsoft, Indeed, ZoomInfo, or any other platform our tools may reference or work alongside.
              </p>
              <p className="mt-2">
                When our tools reference platforms like LinkedIn or job boards, this describes the types of publicly accessible data those tools are designed to work with, not a formal relationship or approval by those platforms.
              </p>
              <p className="mt-2">
                All product names, trademarks, and service marks referenced belong to their respective owners. We respect intellectual property rights and make no claim of affiliation.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">3. Compliance Philosophy</h2>
              <p>
                We take legal and regulatory compliance seriously. Our practices are designed to align with:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Digital Personal Data Protection Act, 2023 (India)</li>
                <li>Information Technology Act, 2000 (India)</li>
                <li>GDPR principles (for users in the EU and UK)</li>
                <li>Generally accepted SaaS industry standards for data handling and security</li>
              </ul>
              <p className="mt-3">
                We do not claim certified compliance with every regulation in every jurisdiction. Instead, we commit to transparency and continuous improvement.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">4. What We Don't Do</h2>

              <p className="font-semibold">We do not access private data.</p>
              <p className="mb-2">
                Our tools are not designed to log in on your behalf, bypass authentication, or access any data that is not freely available to the public.
              </p>

              <p className="font-semibold">We do not bypass security measures.</p>
              <p className="mb-2">
                We do not circumvent CAPTCHAs, rate limiters, IP blocking, or access-control systems.
              </p>

              <p className="font-semibold">We do not support misuse.</p>
              <p className="mb-2">
                We prohibit violation of third-party terms, unauthorised data collection, or unlawful processing.
              </p>

              <p className="font-semibold">We do not sell your data.</p>
              <p className="mb-2">
                We do not sell, rent, or trade user data.
              </p>

              <p className="font-semibold">We do not make promises we cannot back up.</p>
              <p>
                We do not guarantee uninterrupted access or compatibility with third-party platforms.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">5. User Responsibility</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Review third-party platform terms before use</li>
                <li>Ensure lawful use under applicable laws</li>
                <li>Obtain required consents before processing data</li>
                <li>Use only for legitimate business purposes</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">6. Security Practices</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Data in transit is encrypted using TLS</li>
                <li>Passwords are hashed and not stored in plain text</li>
                <li>Internal access is restricted</li>
                <li>Regular internal security reviews</li>
                <li>Incident response process in place</li>
              </ul>

              <p className="mt-3 font-semibold">Security Roadmap (Planned, Not Yet Implemented):</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>SOC 2 Type II audit: Targeted within 12 months</li>
                <li>ISO 27001 review: Year 2 evaluation</li>
                <li>Penetration testing before enterprise launch</li>
                <li>Bug bounty programme under consideration</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-2">7. Contact and Reporting</h2>
              <ul className="space-y-1">
                <li>enquiries: kingshuk@leadstrategus.com</li>
              </ul>

              <p className="mt-3">
                We aim to respond to all enquiries within 2 business days.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
