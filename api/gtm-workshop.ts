// Vercel serverless function: POST /api/gtm-workshop
// GTM Workshop form (apply for a cohort, or ask a question). Emails each
// submission to mail@leadstrategus.com via Resend and keeps a copy in Supabase.
// Separate from /api/contact so the Contact page form is unaffected.
// RESEND_API_KEY is read server-side only.
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const TO_EMAIL = 'mail@leadstrategus.com';
const FROM_EMAIL = 'GTM Workshop <contact@leadstrategus.ai>';

const LIMITS = { name: 100, email: 254, company: 150, role: 60, sell: 600, comingAs: 30, question: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COMING_AS = ['Individual', 'Team of 3+'];

// Best-effort per-IP rate limit (memory is per function instance).
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

type Field = keyof typeof LIMITS;

export async function POST(request: Request): Promise<Response> {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json(400, { error: 'Invalid request body.' });
  }

  // Honeypot: real visitors never fill this. Pretend success.
  if (typeof raw.website === 'string' && raw.website.trim() !== '') return json(200, { ok: true });

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return json(429, { error: 'Too many submissions. Please try again in a few minutes.' });

  const type = raw.type === 'question' ? 'question' : raw.type === 'apply' ? 'apply' : null;
  if (!type) return json(400, { error: 'Please choose whether you are applying or asking a question.' });

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const v = raw[field];
    data[field] = typeof v === 'string' ? v.trim() : '';
  }

  const errors: string[] = [];
  if (!data.name) errors.push('Full name is required.');
  if (!data.email) errors.push('Work email is required.');
  else if (!EMAIL_RE.test(data.email)) errors.push('Please enter a valid email address.');
  if (raw.consent !== true) errors.push('Please agree to be contacted about this workshop.');
  if (type === 'apply') {
    if (!data.company) errors.push('Company and website is required.');
    if (!data.sell) errors.push('Please tell us what you sell, and to whom.');
    if (!COMING_AS.includes(data.comingAs)) errors.push('Please choose how you are coming.');
    if (raw.canAttend !== true) errors.push('Please confirm you can attend all 5 days.');
  } else if (!data.question) {
    errors.push('Please enter your question.');
  }
  for (const field of Object.keys(LIMITS) as Field[]) {
    if (data[field].length > LIMITS[field]) errors.push(`Please shorten ${field} to ${LIMITS[field]} characters.`);
  }
  if (errors.length) return json(400, { error: errors.join(' ') });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('gtm-workshop: RESEND_API_KEY is not set');
    return json(500, { error: 'Something went wrong. Please try again.' });
  }

  const rows: [string, string][] =
    type === 'apply'
      ? [
          ['Type', 'Application for Cohort 1'],
          ['Name', data.name],
          ['Email', data.email],
          ['Company and website', data.company],
          ['Role', data.role || '(not given)'],
          ['What they sell, and to whom', data.sell],
          ['Coming as', data.comingAs],
          ['Can attend all 5 days', 'Yes'],
        ]
      : [
          ['Type', 'Question'],
          ['Name', data.name],
          ['Email', data.email],
          ['Company and website', data.company || '(not given)'],
          ['Question', data.question],
        ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  // Keep a copy in Supabase so nothing is lost if email delivery fails.
  let saved = false;
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const { error } = await createClient(supabaseUrl, supabaseKey)
      .from('contact_submissions')
      .insert({
        name: data.name,
        company: data.company || '(not given)',
        email: data.email,
        requirement: type === 'apply' ? `GTM Workshop: Application (${data.comingAs})` : 'GTM Workshop: Question',
        message: text,
      });
    if (error) console.error('gtm-workshop: Supabase insert failed:', error.message);
    else saved = true;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 16px">${type === 'apply' ? 'New GTM Workshop application' : 'New GTM Workshop question'}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;vertical-align:top;white-space:nowrap">${k}</td>` +
              `<td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
          )
          .join('')}
      </table>
    </div>`;

  const name = data.name.replace(/[\r\n]+/g, ' ');
  const { error } = await new Resend(apiKey).emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: data.email,
    subject: type === 'apply' ? `GTM Workshop application from ${name}` : `GTM Workshop question from ${name}`,
    text,
    html,
  });

  if (error) {
    console.error('gtm-workshop: Resend send failed:', error.message);
    if (saved) return json(200, { ok: true });
    return json(502, { error: 'We could not send your message. Please try again or email mail@leadstrategus.com.' });
  }
  return json(200, { ok: true });
}
