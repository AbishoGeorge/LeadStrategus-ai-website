import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-4">
              Privacy Policy
            </h1>

            <div className="text-sm text-gray-500 space-y-1 mb-8">
              <p>Last Updated: April 15, 2026</p>
              <p>Governing Entity: LeadStrategus Pvt. Ltd.</p>
            </div>

            <div className="space-y-4 text-sm text-gray-600 leading-relaxed mb-10">
              <p>
                LeadStrategus Pvt. Ltd. (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                is committed to handling information responsibly. This Privacy Policy
                explains how we collect, use, store, and protect information in
                connection with our Platform. By using the Platform, you agree
                to the practices described here.
              </p>

              <p>
                Our practices are designed to align with the Digital Personal Data
                Protection Act, 2023 (India) (&quot;DPDP Act&quot;) and, where applicable,
                the General Data Protection Regulation (EU) (&quot;GDPR&quot;). We are not
                making a certified claim of full compliance but are committed to
                following best practices and continuously improving our processes.
              </p>
            </div>
          </motion.div>

          {/* CONTENT */}
          <div className="space-y-12 text-sm text-gray-700 leading-relaxed">

            {/* Section 1 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                1. Information We Collect
              </h2>

              <div className="space-y-6">

                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    1.1 Account and Registration Information
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    <li>Full name and work email address</li>
                    <li>Company name and role or designation</li>
                    <li>
                      Billing information (processed securely through our
                      third-party payment provider; we do not store full card details)
                    </li>
                    <li>
                      Login credentials (passwords are hashed and never stored in plain text)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    1.2 Usage and Interaction Data
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    <li>
                      Log data: IP address, browser type, device information,
                      pages visited, timestamps
                    </li>
                    <li>
                      Feature usage patterns and workflow configurations
                    </li>
                    <li>
                      Error logs and diagnostic data to improve Platform stability
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    1.3 User-Provided Data and Inputs
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    <li>
                      Business data and datasets you upload or submit for processing
                    </li>
                    <li>
                      Configuration settings, search queries, and filters applied within the Platform
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    1.4 Support Communications
                  </h3>

                  <p>
                    If you contact us, we collect the content of your communications
                    to respond to you and improve our service.
                  </p>
                </div>

              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                2. What We Do Not Collect
              </h2>

              <p className="mb-4">
                We are transparent about what we do not intentionally collect:
              </p>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Sensitive personal data such as health information,
                  government ID numbers, racial or ethnic origin,
                  political opinions, or biometric data
                </li>

                <li>
                  Private, restricted, or password-protected data
                  from third-party platforms
                </li>

                <li>
                  Consumer profiles for advertising or ad-targeting purposes
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                3. How We Use Your Information
              </h2>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  To provide, operate, maintain, and improve the Platform
                </li>

                <li>
                  To authenticate your identity and manage your account
                </li>

                <li>
                  To process payments and manage subscriptions
                </li>

                <li>
                  To communicate regarding your account, support requests,
                  and service updates
                </li>

                <li>
                  To send product updates or promotional materials where you
                  have opted in (you may opt out at any time)
                </li>

                <li>
                  To detect and prevent fraud, abuse, or violations
                  of our Terms of Service
                </li>

                <li>
                  To comply with legal and regulatory obligations
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                4. Personal Data Processed Through the Platform
              </h2>

              <div className="space-y-4">
                <p>
                  Where you use the Platform to process data about third parties
                  (e.g., business contact details from public sources):
                </p>

                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    LeadStrategus Pvt. Ltd. acts as a data processor.
                    You, as the user, are the data controller and are solely
                    responsible for establishing a lawful basis for processing such data.
                  </li>

                  <li>
                    You are responsible for honouring any data subject rights
                    requests (access, correction, deletion) relating to personal
                    data you process through the Platform.
                  </li>

                  <li>
                    We do not access or use personal data processed by you
                    through Platform workflows for our own purposes,
                    except as required to provide the service or as required by law.
                  </li>
                </ul>

                <p>
                  If you require a formal Data Processing Agreement (DPA),
                  which is common for enterprise and EU/UK clients,
                  please refer to Document III of this pack or contact us at
                  kingshuk@leadstrategus.com.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                5. Third-Party Data Sources
              </h2>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  We do not access private data or data behind authentication
                  on third-party platforms.
                </li>

                <li>
                  We do not represent that publicly available data accessed
                  through the Platform is free from copyright, proprietary rights,
                  or personal data considerations. You are responsible for your
                  own legal assessment.
                </li>

                <li>
                  LeadStrategus Pvt. Ltd. is not affiliated with any third-party platform.
                  Platform names referenced are trademarks of their respective owners.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                6. Cookies and Tracking
              </h2>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Essential cookies: Required for authentication,
                  security, and core Platform functionality.
                </li>

                <li>
                  Analytics cookies: To understand usage patterns and improve
                  the Platform. We use privacy-respecting analytics tools where possible.
                </li>

                <li>
                  Preference cookies: To remember your settings across sessions.
                </li>
              </ul>

              <p className="mt-5">
                You may manage cookies through your browser settings.
                Disabling essential cookies may affect Platform functionality.
                We do not use cookies for cross-site advertising tracking.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                7. Data Sharing and Disclosure
              </h2>

              <p className="mb-4">
                We do not sell your personal data. We may share information
                only in the following limited circumstances:
              </p>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  With trusted service providers who assist in operating
                  the Platform (hosting, payments, email), subject to confidentiality obligations
                </li>

                <li>
                  With professional advisers such as lawyers, accountants,
                  or auditors, where necessary
                </li>

                <li>
                  In connection with a merger, acquisition, or sale of assets,
                  provided the acquiring entity agrees to honour this Policy
                </li>

                <li>
                  Where required by law, court order, or regulatory authority,
                  or to protect the rights, property, or safety of LeadStrategus,
                  our users, or the public
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                8. Data Retention
              </h2>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Account and registration data: Retained for the duration
                  of your account, plus up to 3 years after closure for legal
                  and compliance purposes.
                </li>

                <li>
                  Usage logs: Typically retained for up to 12 months.
                </li>

                <li>
                  Billing records: Retained for a minimum of 7 years in accordance
                  with applicable tax and accounting laws.
                </li>

                <li>
                  Support communications: Retained for up to 2 years.
                </li>
              </ul>

              <p className="mt-5">
                Upon request, we will delete or anonymise your personal data
                in accordance with applicable law, subject to any overriding
                legal obligation to retain it.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                9. Security Practices
              </h2>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Encryption of data in transit using industry-standard TLS protocols
                </li>

                <li>
                  Encrypted (hashed) storage of passwords and sensitive credentials
                </li>

                <li>
                  Role-based access controls limiting internal access to personal data
                </li>

                <li>
                  Regular review and improvement of our security practices
                </li>
              </ul>

              <p className="mt-5">
                We do not claim absolute or guaranteed security.
                No method of electronic transmission or storage is 100% secure.
                In the event of a personal data breach likely to result in risk
                to your rights, we will notify you and relevant authorities
                as required by applicable law.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                10. Your Rights
              </h2>

              <p className="mb-4">
                Depending on your jurisdiction, you may have the right to:
              </p>

              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Access: Request confirmation of whether we process your data and receive a copy
                </li>

                <li>
                  Correction: Request correction of inaccurate or incomplete data
                </li>

                <li>
                  Erasure: Request deletion of your data, subject to legal obligations
                </li>

                <li>
                  Object: Object to certain types of processing
                </li>

                <li>
                  Withdraw consent: Where processing is consent-based,
                  withdraw it at any time
                </li>

                <li>
                  Lodge a complaint: With the relevant data protection authority in your jurisdiction
                </li>
              </ul>

              <p className="mt-5">
                To exercise any of these rights, contact us at
                kingshuk@leadstrategus.com. We will respond within
                a reasonable timeframe in accordance with applicable law.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                11. International Users
              </h2>

              <div className="space-y-4">
                <p>
                  The Platform is operated from India. If you access the Platform
                  from outside India, your data may be processed in India or other
                  countries where our service providers operate.
                </p>

                <p>
                  Cross-border transfers are conducted with appropriate safeguards
                  where required.
                </p>

                <p>
                  For users in the EEA or UK: we intend to ensure that international
                  data transfers comply with applicable data protection law.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                12. Children&apos;s Privacy
              </h2>

              <p>
                The Platform is intended for businesses and professionals.
                It is not directed at individuals under 18 years of age.
                We do not knowingly collect data from minors and will delete
                any such data if discovered.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                13. Changes to This Policy
              </h2>

              <p>
                We may update this Policy periodically. For material changes,
                we will notify you through the Platform or by email.
                Continued use of the Platform after notification constitutes
                acceptance of the updated Policy.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-base font-bold text-navy-900 mb-4">
                14. Contact
              </h2>

              <div className="space-y-2">
                <p>
                  <span className="font-medium text-navy-900">
                    Privacy enquiries:
                  </span>{' '}
                  kingshuk@leadstrategus.com
                </p>

                <p>
                  <span className="font-medium text-navy-900">
                    Registered office:
                  </span>{' '}
                  Bengaluru, India
                </p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
