import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const productLinks = [
  { label: 'All Agents', to: '/agents' },
  { label: 'Custom Build', to: '/build' },
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img src={logoImg} alt="LeadStrategus" className="h-7 w-auto brightness-0 invert" />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Contextual Intelligence for B2B Sales.
              </p>
              <p className="text-gray-500 text-sm mt-3">Bengaluru, India</p>
            </div>

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
                  <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-400">+91 9845980970</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <a
                    href="mailto:kingshuk@leadstrategus.com"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    kingshuk@leadstrategus.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-400">Bengaluru, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
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
