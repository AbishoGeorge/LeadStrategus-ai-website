import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BadgeCheck, Check } from 'lucide-react';
import pageHtml from './gtm-workshop/content.html?raw';
import apply from './gtm-workshop/apply.json';
import { submitContact } from '../lib/submitContact';

// The GTM Engineering Workshop page is built from gtm-workshop/ by
// scripts/build-gtm-workshop.mjs. Its styles are scoped under .gtm-root.
// The page is split where its application form goes; the form is rendered here
// and posts to the same endpoint as the Contact page.
const [beforeForm, formBand = '', afterForm = ''] = pageHtml.split(/<!--GTM_APPLY_SLOT:(alt)?-->/);

type ComingAs = 'Individual' | 'Team of 3+' | 'Private cohort';
const comingAsByType: Record<string, ComingAs> = { individual: 'Individual', team: 'Team of 3+', private: 'Private cohort' };
const SELL_MAX = 600;

const emptyForm = {
  name: '',
  email: '',
  company: '',
  role: apply.roles[0],
  sell: '',
  comingAs: 'Individual' as ComingAs,
  message: '',
  canAttend: false,
  consent: false,
  website: '',
};

function ApplyForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const thanksRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof typeof emptyForm>(field: K, value: (typeof emptyForm)[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Pricing buttons ("Apply as a team", "Talk to us") and ?type=team pre-select "Coming as".
  useEffect(() => {
    const preset = comingAsByType[new URLSearchParams(window.location.search).get('type') ?? ''];
    if (preset) update('comingAs', preset);
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.('[data-apply-type]');
      const type = el?.getAttribute('data-apply-type');
      if (type && comingAsByType[type]) update('comingAs', comingAsByType[type]);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (status === 'success') thanksRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.canAttend || !form.consent) {
      setErrorMessage('Please confirm you can attend all 5 days and agree to be contacted.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        company: form.company,
        requirement: `GTM Workshop: ${form.comingAs}`,
        message: form.message,
        source: 'GTM Workshop',
        website: form.website,
        details: {
          Role: form.role,
          'Coming as': form.comingAs,
          'What they sell, and to whom': form.sell,
          [`Can attend all 5 days in ${apply.city}`]: 'Yes',
        },
      });
      setStatus('success');
      setForm(emptyForm);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
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
      <div className="card form-card">
        {status === 'success' ? (
          <div className="thanks" tabIndex={-1} ref={thanksRef} role="status">
            <BadgeCheck className="ic ic-xl" aria-hidden="true" />
            <h3>{apply.success}</h3>
          </div>
        ) : (
          <form id="gtm-apply-form" onSubmit={handleSubmit}>
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor="gtm-website">Website</label>
              <input id="gtm-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} />
            </div>

            <div className="fgrid">
              <div className="field">
                <label htmlFor="gtm-name">Full name <span className="req" aria-hidden="true">*</span></label>
                <input id="gtm-name" type="text" autoComplete="name" required maxLength={100} value={form.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="gtm-email">Work email <span className="req" aria-hidden="true">*</span></label>
                <input id="gtm-email" type="email" autoComplete="email" inputMode="email" required maxLength={254} value={form.email} onChange={(e) => update('email', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="gtm-company">Company and website <span className="req" aria-hidden="true">*</span></label>
                <input id="gtm-company" type="text" autoComplete="organization" required maxLength={150} placeholder="Acme Ltd · acme.com" value={form.company} onChange={(e) => update('company', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="gtm-role">Your role</label>
                <select id="gtm-role" value={form.role} onChange={(e) => update('role', e.target.value)}>
                  {apply.roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="gtm-sell">What do you sell, and to whom? <span className="req" aria-hidden="true">*</span></label>
              <textarea id="gtm-sell" rows={4} maxLength={SELL_MAX} required value={form.sell} onChange={(e) => update('sell', e.target.value)} aria-describedby="gtm-sell-count" />
              <p className="counter" id="gtm-sell-count" aria-live="polite">{form.sell.length} / {SELL_MAX}</p>
            </div>

            <fieldset className="field coming">
              <legend>Coming as <span className="req" aria-hidden="true">*</span></legend>
              <div className="seg">
                {(Object.values(comingAsByType) as ComingAs[]).map((opt) => (
                  <label key={opt}>
                    <input type="radio" name="gtm-coming-as" value={opt} checked={form.comingAs === opt} onChange={() => update('comingAs', opt)} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="gtm-message">Anything else? (optional)</label>
              <textarea id="gtm-message" rows={3} maxLength={5000} value={form.message} onChange={(e) => update('message', e.target.value)} />
            </div>

            <div className="field checks">
              <label className="check">
                <input type="checkbox" checked={form.canAttend} onChange={(e) => update('canAttend', e.target.checked)} />
                <span>I can attend all 5 days in {apply.city}. <span className="req" aria-hidden="true">*</span></span>
              </label>
              <label className="check">
                <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} />
                <span>
                  I agree to be contacted about this workshop and accept the{' '}
                  <button type="button" className="linkish" data-modal="privacy">Privacy Notice</button>.{' '}
                  <span className="req" aria-hidden="true">*</span>
                </span>
              </label>
            </div>

            {status === 'error' && <div className="form-status" role="alert">{errorMessage}</div>}
            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
              <span className="lbl">{status === 'loading' ? 'Sending…' : 'Submit application'}</span>
              <ArrowRight className="ic" aria-hidden="true" />
            </button>
            <p className="req-note"><span className="req">*</span> Required</p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function GtmWorkshop() {
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
        <link rel="stylesheet" href="/gtm-workshop/styles.css" />
        <link rel="preload" href="/gtm-workshop/fonts/montserrat.woff2" as="font" type="font/woff2" crossOrigin="" />
      </Helmet>
      <div className="gtm-root">
        <div dangerouslySetInnerHTML={{ __html: beforeForm }} />
        <section className={`section ${formBand}`} id="apply">
          <div className="wrap">
            <ApplyForm />
          </div>
        </section>
        <div dangerouslySetInnerHTML={{ __html: afterForm }} />
      </div>
    </>
  );
}
