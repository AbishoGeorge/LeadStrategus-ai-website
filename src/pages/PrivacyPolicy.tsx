import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 mb-10">
              Last updated: April 15, 2026
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  1. Data Collection
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  We collect information that you provide directly when using our platform, including:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 ml-2">
                  <li>Contact information (name, email, company, phone number)</li>
                  <li>Form submissions and inquiry details</li>
                  <li>Account configuration and agent preferences</li>
                  <li>Usage data and interaction logs for service improvement</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  2. Data Usage
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Your data is used to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 ml-2">
                  <li>Provide, maintain, and improve our AI agent services</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Communicate updates about our platform and services</li>
                  <li>Analyze usage patterns to enhance product performance</li>
                </ul>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  We do not sell, rent, or share your personal data with third parties for their marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  3. Agent Data Processing
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our AI agents process publicly available business data to deliver their functionality. This includes company information, job postings, news, and other open sources. Agents do not access, scrape, or process private or gated data without explicit authorization.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  4. Data Security
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  5. User Responsibility
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Users are responsible for the data they input into our platform and how they use agent outputs. If you upload or provide personal data of third parties, you must ensure you have the necessary consents and legal basis to do so.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  6. Cookies and Analytics
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We may use cookies and similar technologies to enhance your experience and collect usage analytics. You can manage cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  7. Changes to This Policy
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a revised date. Continued use of the platform constitutes acceptance of the updated policy.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-400">
                  For privacy-related inquiries, contact us at{' '}
                  <a href="mailto:email@leadstrategus.com" className="text-electric-500 hover:text-electric-600 transition-colors">
                    email@leadstrategus.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
