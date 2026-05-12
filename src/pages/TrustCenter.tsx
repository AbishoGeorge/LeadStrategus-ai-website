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
          <div className="space-y-12 text-gray-700 text-sm leading-relaxed">

            <p>
              We believe that powerful tools and responsible practices are not in conflict,
              they reinforce each other. This page explains our philosophy, what we do,
              and what we do not do. We keep this language plain because trust is built
              on clarity, not legal fencing.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                1. Our Approach to Data
              </h2>

              <p>
                LeadStrategus is built on a simple principle: we work with data
                that is publicly accessible and legitimately available. Our AI agents
                are designed to extract, structure, and analyse information from open,
                public-facing sources.
              </p>

              <p className="mt-5 font-semibold text-navy-900">
                What &apos;publicly available&apos; means to us:
              </p>

              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>
                  Data accessible without login credentials, authentication,
                  or circumvention of any access control
                </li>
                <li>
                  Information visible and indexable on the public web
                </li>
                <li>
                  Data that individuals or organisations have voluntarily
                  made available in public-facing contexts
                </li>
              </ul>

              <p className="mt-5">
                We recognise that &apos;public&apos; does not automatically mean
                &apos;free to use for any purpose.&apos; Our Terms and this page
                reflect that nuance. We encourage users to approach data responsibility
                with the same care we do.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                2. Platform Independence
              </h2>

              <p>
                LeadStrategus is an independent software company. We are not
                affiliated with, endorsed by, or partnered with LinkedIn, Microsoft,
                Indeed, ZoomInfo, or any other platform our tools may reference
                or work alongside.
              </p>

              <p className="mt-4">
                When our tools reference platforms like LinkedIn or job boards,
                this describes the types of publicly accessible data those tools
                are designed to work with, not a formal relationship or approval
                by those platforms.
              </p>

              <p className="mt-4">
                All product names, trademarks, and service marks referenced belong
                to their respective owners. We respect intellectual property rights
                and make no claim of affiliation.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                3. Compliance Philosophy
              </h2>

              <p>
                We take legal and regulatory compliance seriously. Our practices
                are designed to align with:
              </p>

              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>Digital Personal Data Protection Act, 2023 (India)</li>
                <li>Information Technology Act, 2000 (India)</li>
                <li>GDPR principles (for users in the EU and UK)</li>
                <li>
                  Generally accepted SaaS industry standards for data handling
                  and security
                </li>
              </ul>

              <p className="mt-5">
                We do not claim certified compliance with every regulation in
                every jurisdiction. Instead, we commit to:
              </p>

              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>
                  Following best practices and improving our processes continuously
                </li>
                <li>
                  Being transparent about what we do and do not do with data
                </li>
                <li>
                  Responding constructively to regulatory developments
                </li>
                <li>
                  Providing a formal DPA to enterprise and EU/UK clients who require one
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                4. What We Don&apos;t Do
              </h2>

              <p className="mb-4">
                Clarity matters as much as reassurance. Here is what LeadStrategus
                does not do:
              </p>

              <div className="space-y-6">

                <div>
                  <p className="font-semibold text-navy-900 mb-1">
                    We do not access private data.
                  </p>

                  <p>
                    Our tools are not designed to log in on your behalf, bypass
                    authentication, or access any data that is not freely available
                    to the public. We do not support, encourage, or facilitate
                    the circumvention of access controls on any platform.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-navy-900 mb-1">
                    We do not bypass security measures.
                  </p>

                  <p>
                    We do not build or support functionality that circumvents
                    CAPTCHAs, rate limiters, IP blocking, or any other access-control
                    or anti-bot measure implemented by a third party.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-navy-900 mb-1">
                    We do not support misuse.
                  </p>

                  <p>
                    Our Terms of Service explicitly prohibit use of the Platform
                    to violate third-party platform terms, engage in unauthorised
                    data collection, or process personal data without a lawful basis.
                    We take reports of misuse seriously and act on them.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-navy-900 mb-1">
                    We do not sell your data.
                  </p>

                  <p>
                    We do not sell, rent, or trade your personal information or
                    the data you process through the Platform to third parties
                    for commercial or advertising purposes.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-navy-900 mb-1">
                    We do not make promises we cannot back up.
                  </p>

                  <p>
                    We do not guarantee uninterrupted access, data accuracy,
                    or compatibility with any third-party platform. We will always
                    be honest about the limitations of our tools. If something breaks
                    or changes, we communicate openly.
                  </p>
                </div>

              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                5. User Responsibility
              </h2>

              <p>
                LeadStrategus is a platform, not a managed service. Our tools
                give you powerful capabilities. How you use them is your responsibility.
              </p>

              <p className="mt-5">
                Before using any LeadStrategus tool, we ask that you:
              </p>

              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>
                  Review the terms of service of any third-party platform you intend to work with
                </li>
                <li>
                  Confirm that your intended use case is lawful and compliant
                  with applicable data protection laws in your jurisdiction
                </li>
                <li>
                  Obtain any necessary consents or authorisations before collecting
                  or processing personal data
                </li>
                <li>
                  Use the Platform only for legitimate business purposes
                </li>
              </ul>

              <p className="mt-5">
                We can provide guidance, but we are not your legal adviser.
                If you are unsure about the legality of a specific use case,
                we recommend consulting a qualified legal professional before proceeding.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                6. Security Practices
              </h2>

              <p>
                We approach security as an ongoing practice, not a checkbox.
                Our current commitments:
              </p>

              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>
                  Data in transit is encrypted using TLS (industry-standard)
                </li>
                <li>
                  Passwords and sensitive credentials are hashed and never stored in plain text
                </li>
                <li>
                  Internal access to user data is restricted on a need-to-know basis
                </li>
                <li>
                  We conduct regular internal reviews of our security controls
                </li>
                <li>
                  We have a defined process for detecting and responding to security incidents
                </li>
              </ul>

              <p className="mt-6 font-semibold text-navy-900">
                Security Roadmap (Planned, Not Yet Implemented):
              </p>

              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>
                  SOC 2 Type II audit: Targeted for initiation within 12 months of commercial launch
                </li>
                <li>
                  ISO 27001 alignment review: Under evaluation for Year 2
                </li>
                <li>
                  Formal penetration testing: Planned ahead of enterprise tier launch
                </li>
                <li>
                  Bug bounty programme: Under consideration for post-launch phase
                </li>
              </ul>

              <p className="mt-5">
                We will update this section as milestones are achieved.
                If you have specific security questionnaires or requirements,
                contact us at kingshuk@leadstrategus.com and we will respond
                as completely as we can.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-base font-bold text-navy-900 mb-3">
                7. Contact and Reporting
              </h2>

              <p>
                We welcome questions, concerns, and responsible disclosure
                of any issues with our practices.
              </p>

              <ul className="mt-4 space-y-2">
                <li>
                  <span className="font-medium text-navy-900">
                    Enquiries:
                  </span>{' '}
                  kingshuk@leadstrategus.com
                </li>
              </ul>

              <p className="mt-5">
                We aim to respond to all substantive enquiries within
                2 business days.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
