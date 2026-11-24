import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Check } from 'lucide-react';
import pageHtml from './gtm-workshop/content.html?raw';
import apply from './gtm-workshop/apply.json';
import { GTM_STYLES_HREF } from './gtm-workshop/loadStyles';

// The GTM Engineering Workshop page is built from gtm-workshop/ by
// scripts/build-gtm-workshop.mjs. Its styles are scoped under .gtm-root.
// The page is split where its form goes; WorkshopForm (apply / ask a question)
// is rendered there and posts to /api/gtm-workshop.
const [beforeForm, formBand = '', afterForm = ''] = pageHtml.split(/<!--GTM_APPLY_SLOT:(alt)?-->/);

type Mode = 'apply' | 'question';
type ComingAs = 'Individual' | 'Team of 3+';
const SELL_MAX = 600;
// Any real email address: work domain or personal (Gmail etc.), but it must have
// a name, an @ and a domain with a dot, e.g. name@company.com. Same rule as the server.
const EMAIL_PATTERN = '[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}';
const isEmail = (v: string) => new RegExp(`^${EMAIL_PATTERN}$`).test(v.trim());
const QUESTION_MAX = 2000;

const emptyForm = {
  name: '',
  email: '',
  company: '',
  role: apply.roles[0],
  roleOther: '',
  sell: '',
  comingAs: 'Individual' as ComingAs,
  canAttend: false,
  question: '',
  consent: false,
  website: '',
};

/** Apply for Cohort 1, or ask a question. Posts to /api/gtm-workshop (Resend → mail@leadstrategus.com). */
function WorkshopForm() {
  const [mode, setMode] = useState<Mode>('apply');
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const emailInvalid = emailTouched && form.email.trim() !== '' && !isEmail(form.email);
  const thanksRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof typeof emptyForm>(field: K, value: (typeof emptyForm)[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Pricing buttons and ?type= pre-select the form: individual / team apply, private asks a question.
  useEffect(() => {
    const preset = (type: string | null) => {
      if (type === 'individual' || type === 'team') {
        setMode('apply');
        update('comingAs', type === 'team' ? 'Team of 3+' : 'Individual');
      } else if (type === 'private') {
        setMode('question');
      }
    };
    preset(new URLSearchParams(window.location.search).get('type'));
    const onClick = (e: MouseEvent) => {
      const type = (e.target as HTMLElement).closest?.('[data-apply-type]')?.getAttribute('data-apply-type');
      if (type) preset(type);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (status === 'success') thanksRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(form.email)) {
      setEmailTouched(true);
      document.getElementById('gtm-email')?.focus();
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/gtm-workshop', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: mode, ...form }),
      }).catch(() => {
        throw new Error('Network error. Please check your connection and try again.');
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const reset = () => {
    setEmailTouched(false);
    setForm(emptyForm);
    setStatus('idle');
  };

  const isApply = mode === 'apply';

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
        <p className="email-alt">
          Prefer email? <a href={`mailto:${apply.email}`}>{apply.email}</a>
        </p>
      </div>
      <div className="card form-card">
        {status === 'success' ? (
          <div className="thanks" tabIndex={-1} ref={thanksRef} role="status">
            <BadgeCheck className="ic ic-xl" aria-hidden="true" />
            <h3>{isApply ? apply.success : apply.questionSuccess}</h3>
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
              Send another
            </button>
          </div>
        ) : (
          <form id="gtm-form" onSubmit={handleSubmit}>
            <fieldset className="field coming mode-pick">
              <legend>What would you like to do?</legend>
              <div className="seg">
                {(['apply', 'question'] as Mode[]).map((m) => (
                  <label key={m}>
                    <input type="radio" name="gtm-mode" value={m} checked={mode === m} onChange={() => setMode(m)} />
                    <span>{m === 'apply' ? 'Apply for Cohort 1' : 'Ask a question'}</span>
                  </label>
                ))}
              </div>
            </fieldset>

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
                <input
                  id="gtm-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={254}
                  pattern={EMAIL_PATTERN}
                  title="Enter an email address, e.g. name@company.com"
                  placeholder="name@company.com"
                  aria-invalid={emailInvalid}
                  aria-describedby="gtm-email-err"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
                <p className="err" id="gtm-email-err" aria-live="polite">
                  {emailInvalid ? 'Please enter a valid email address, e.g. name@company.com.' : ''}
                </p>
              </div>
              <div className="field">
                <label htmlFor="gtm-company">
                  Company and website {isApply && <span className="req" aria-hidden="true">*</span>}
                </label>
                <input id="gtm-company" type="text" autoComplete="organization" required={isApply} maxLength={150} placeholder="Acme Ltd · acme.com" value={form.company} onChange={(e) => update('company', e.target.value)} />
              </div>
              {isApply && (
                <div className="field">
                  <label htmlFor="gtm-role">Your role</label>
                  <select id="gtm-role" value={form.role} onChange={(e) => update('role', e.target.value)}>
                    {apply.roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}
              {isApply && form.role === 'Other' && (
                <div className="field field-full">
                  <label htmlFor="gtm-role-other">Tell us your role (optional)</label>
                  <input id="gtm-role-other" type="text" autoComplete="organization-title" maxLength={80} placeholder="e.g. Partnerships manager" value={form.roleOther} onChange={(e) => update('roleOther', e.target.value)} />
                </div>
              )}
            </div>

            {isApply ? (
              <>
                <div className="field">
                  <label htmlFor="gtm-sell">What do you sell, and to whom? <span className="req" aria-hidden="true">*</span></label>
                  <textarea id="gtm-sell" rows={4} maxLength={SELL_MAX} required value={form.sell} onChange={(e) => update('sell', e.target.value)} aria-describedby="gtm-sell-count" />
                  <p className="counter" id="gtm-sell-count" aria-live="polite">{form.sell.length} / {SELL_MAX}</p>
                </div>

                <fieldset className="field coming">
                  <legend>Coming as <span className="req" aria-hidden="true">*</span></legend>
                  <div className="seg">
                    {(['Individual', 'Team of 3+'] as ComingAs[]).map((opt) => (
                      <label key={opt}>
                        <input type="radio" name="gtm-coming-as" value={opt} checked={form.comingAs === opt} onChange={() => update('comingAs', opt)} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            ) : (
              <div className="field">
                <label htmlFor="gtm-question">Your question <span className="req" aria-hidden="true">*</span></label>
                <textarea id="gtm-question" rows={5} maxLength={QUESTION_MAX} required placeholder="Ask us anything about the workshop, pricing, dates or team seats." value={form.question} onChange={(e) => update('question', e.target.value)} />
              </div>
            )}

            <div className="field checks">
              {isApply && (
                <label className="check">
                  <input type="checkbox" required checked={form.canAttend} onChange={(e) => update('canAttend', e.target.checked)} />
                  <span>I can attend all 5 days in {apply.city}. <span className="req" aria-hidden="true">*</span></span>
                </label>
              )}
              <label className="check">
                <input type="checkbox" required checked={form.consent} onChange={(e) => update('consent', e.target.checked)} />
                <span>
                  I agree to be contacted about this workshop and accept the{' '}
                  <button type="button" className="linkish" data-modal="privacy">Privacy Notice</button>.{' '}
                  <span className="req" aria-hidden="true">*</span>
                </span>
              </label>
            </div>

            {status === 'error' && <div className="form-status" role="alert">{errorMessage}</div>}
            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
              <span className="lbl">{status === 'loading' ? 'Sending…' : isApply ? 'Submit application' : 'Send question'}</span>
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
  const { hash, key } = useLocation();

  // Links like /gtm-workshop#apply (the announcement bar) land on that section,
  // including when the visitor is already on this page.
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }));
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);

  // "Why join." tiles rise in one after another when the section scrolls into view.
  // They render visible; the effect only hides tiles that are still below the fold.
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>('.gtm-root .benefits');
    if (!grid || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (grid.getBoundingClientRect().top < window.innerHeight) return;
    grid.classList.add('pre');
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        grid.classList.remove('pre');
        grid.classList.add('shown');
        // Drop the staggered transition afterwards so hover feels instant.
        timer = window.setTimeout(() => grid.classList.remove('shown'), 1400);
      },
      { threshold: 0.2 }
    );
    io.observe(grid);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // On phones the page's floating "Apply" bar would sit over the site footer; hide it there.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.gtm-root');
    const footer = Array.from(document.querySelectorAll('footer')).find((f) => !f.closest('.gtm-root'));
    if (!root || !footer || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => root.toggleAttribute('data-footer-visible', entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

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
            <WorkshopForm />
          </div>
        </section>
        <div dangerouslySetInnerHTML={{ __html: afterForm }} />
      </div>
    </>
  );
}
