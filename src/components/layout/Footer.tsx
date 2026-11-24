import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

const productLinks = [
  { label: 'All Agents', to: '/agents' },
  { label: 'Custom Build', to: '/build' },
  { label: 'GTM Workshop', to: '/gtm-workshop' },
  { label: 'Book a Call', to: '/contact' },
];

const resourceLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Use Cases', to: '/use-cases' },
  { label: 'Why LeadStrategus.ai', to: '/why' },
];

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'The Team', to: '/about#team' },
];

const sisterSites = [
  { name: 'LeadStrategus.ai', url: 'https://leadstrategus.ai/', text: 'AI revenue agents for B2B pipeline automation.' },
  { name: 'LeadStrategus.com', url: 'https://www.leadstrategus.com/', text: 'B2B GTM strategy, demand generation and AI agents.' },
  { name: 'ExpoToFunnel', url: 'https://expotofunnel.com/', text: 'Trade shows ranked by how many of your ideal buyers attend, then meetings booked for you.' },
];

const legalLinks = [
  { label: 'Terms of Service', to: '/tos' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Trust Center', to: '/trust' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Product</h4>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Company</h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Contact</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact Sales
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <a
                    href="mailto:mail@leadstrategus.com"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 break-all"
                  >
                    mail@leadstrategus.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-1" />
                  <span className="text-sm text-gray-400">Bizzhub, Brigade Tech Park, near ITPL Main Road, Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-gray-800 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
            <div className="flex items-center gap-3">
              <img src="/gtm-workshop/brand/leadstrategus-shield@2x.webp" alt="" width={44} height={44} className="h-11 w-11" loading="lazy" />
              <div>
                <p className="font-semibold tracking-[0.14em] text-white">LEADSTRATEGUS</p>
                <p className="text-xs text-gray-400">Superpower your sales!</p>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {sisterSites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener"
                    className="group block h-full rounded-xl border border-brand-red-500/30 bg-white/[0.04] px-4 py-3 transition-colors duration-200 hover:border-brand-red-500/70 hover:bg-white/[0.08]"
                  >
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      {site.name}
                      <ArrowUpRight className="h-3.5 w-3.5 text-brand-red-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-400">{site.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LeadStrategus. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-gray-600 max-w-3xl">
            Our AI agents operate on publicly available data and user inputs. Users are responsible for ensuring compliance with applicable laws and platform terms. We are not affiliated with or endorsed by any third-party platforms. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
