import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Mail } from 'lucide-react';
import pageHtml from './gtm-workshop/content.html?raw';
import apply from './gtm-workshop/apply.json';
import { GTM_STYLES_HREF } from './gtm-workshop/loadStyles';

// The GTM Engineering Workshop page is built from gtm-workshop/ by
// scripts/build-gtm-workshop.mjs. Its styles are scoped under .gtm-root.
// The page is split where its application form used to be; an "email us" block
// is rendered there instead.
const [beforeForm, formBand = '', afterForm = ''] = pageHtml.split(/<!--GTM_APPLY_SLOT:(alt)?-->/);

const subjectByType: Record<string, string> = {
  individual: 'GTM Workshop enquiry',
  team: 'GTM Workshop enquiry: team of 3+',
  private: 'GTM Workshop enquiry: private cohort',
};

function EmailUs() {
  const [subject, setSubject] = useState(subjectByType.individual);
  const [copied, setCopied] = useState(false);

  // Pricing buttons ("Apply as a team", "Talk to us") and ?type=team set the email subject.
  useEffect(() => {
    const preset = subjectByType[new URLSearchParams(window.location.search).get('type') ?? ''];
    if (preset) setSubject(preset);
    const onClick = (e: MouseEvent) => {
      const type = (e.target as HTMLElement).closest?.('[data-apply-type]')?.getAttribute('data-apply-type');
      if (type && subjectByType[type]) setSubject(subjectByType[type]);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(apply.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="apply-grid">
      <div className="apply-copy">
        <h2 className="h2-bar">{apply.h2}</h2>
        <p className="sec-sub">{apply.sub}</p>
        <ul className="trust">
          {apply.trust.map((t) => (
            <li key={t}>
              <Check className="ic" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="card form-card email-card">
        <Mail className="ic ic-xl" aria-hidden="true" />
        <p className="tag-line">Send an email to</p>
        <p className="email-addr">
          <a href={`mailto:${apply.email}?subject=${encodeURIComponent(subject)}`}>{apply.email}</a>
        </p>
        <p>Include what you sell, your role, and how you'll join.</p>
        <div className="email-actions">
          <a className="btn btn-primary btn-lg" href={`mailto:${apply.email}?subject=${encodeURIComponent(subject)}`}>
            Email us <ArrowRight className="ic" aria-hidden="true" />
          </a>
          <button type="button" className="btn btn-ghost btn-lg" onClick={copy}>
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GtmWorkshop() {
  // "Copy note" button in the sponsor section.
  useEffect(() => {
    const onClick = async (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest?.('[data-copy-target]') as HTMLButtonElement | null;
      const text = btn && document.getElementById(btn.dataset.copyTarget ?? '')?.textContent;
      if (!btn || !text) return;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch {
        window.getSelection()?.selectAllChildren(document.getElementById(btn.dataset.copyTarget!)!);
        btn.textContent = 'Selected, press Ctrl+C';
      }
      setTimeout(() => (btn.textContent = 'Copy note'), 2500);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/gtm-workshop/main.js';
    document.body.appendChild(script);
    return () => {
      script.remove();
      // Stop the page's animations; their elements are gone once we navigate away.
      const w = window as Window & { __gtmTimers?: number[] };
      (w.__gtmTimers ?? []).forEach((id) => {
        clearInterval(id);
        clearTimeout(id);
      });
      w.__gtmTimers = [];
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={GTM_STYLES_HREF} />
        <link rel="preload" href="/gtm-workshop/fonts/montserrat.woff2" as="font" type="font/woff2" crossOrigin="" />
      </Helmet>
      <div className="gtm-root">
        <div dangerouslySetInnerHTML={{ __html: beforeForm }} />
        <section className={`section ${formBand}`} id="apply">
          <div className="wrap">
            <EmailUs />
          </div>
        </section>
        <div dangerouslySetInnerHTML={{ __html: afterForm }} />
      </div>
    </>
  );
}
