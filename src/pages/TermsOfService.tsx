import { motion } from 'framer-motion';

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-gray-400 mb-10">
              Last updated: April 15, 2026
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  By accessing or using LeadStrategus and its services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our platform.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  2. Usage Responsibility
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Users are solely responsible for how they use the data and outputs provided by LeadStrategus agents. This includes ensuring compliance with:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 ml-2">
                  <li>All applicable local, national, and international laws</li>
                  <li>Anti-spam regulations (CAN-SPAM, GDPR, and others)</li>
                  <li>Third-party platform terms of service</li>
                  <li>Data protection and privacy regulations in your jurisdiction</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  3. No Misuse
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You agree not to use LeadStrategus for any unlawful, deceptive, or harmful purpose. This includes but is not limited to: sending unsolicited bulk communications in violation of applicable laws, scraping or accessing private or gated data without authorization, impersonating individuals or organizations, or any activity that violates the rights of others.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  4. No Liability
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  LeadStrategus provides its services "as is" without warranties of any kind, express or implied. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our platform, including but not limited to loss of data, revenue, or business opportunities. The accuracy, completeness, and timeliness of data provided by our agents cannot be guaranteed.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  5. Intellectual Property
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All content, technology, branding, and agent designs on the LeadStrategus platform are the intellectual property of LeadStrategus. You may not reproduce, distribute, or create derivative works without prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  6. Account Termination
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate access to our services at our discretion, particularly in cases of terms violation, misuse, or activities that may harm the platform or other users.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-3">
                  7. Changes to Terms
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the revised terms. We recommend reviewing this page periodically.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-400">
                  For questions about these terms, contact us at{' '}
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
