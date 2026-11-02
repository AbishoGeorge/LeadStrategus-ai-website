// Vercel serverless function: POST /api/contact
// Emails each enquiry via Resend and saves it to Supabase. Server-side only:
// RESEND_API_KEY is never sent to the browser.
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const TO_EMAIL = 'kingshuk@leadstrategus.com';
const FROM_EMAIL = 'Website Contact <contact@leadstrategus.com>';

const LIMITS = { name: 100, email: 254, company: 150, requirement: 100, message: 5000, source: 50 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-IP rate limit. Memory is per function instance, so this
// slows down bursts from one client but is not a hard global limit.
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
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
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

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof raw.website === 'string' && raw.website.trim() !== '') {
    return json(200, { ok: true });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return json(429, { error: 'Too many submissions. Please try again in a few minutes.' });
  }

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const value = raw[field];
    data[field] = typeof value === 'string' ? value.trim() : '';
  }

  const errors: string[] = [];
  if (!data.name) errors.push('Name is required.');
  if (!data.email) errors.push('Email is required.');
  else if (!EMAIL_RE.test(data.email)) errors.push('Please enter a valid email address.');
  if (!data.company) errors.push('Company is required.');
  if (!data.requirement) errors.push('Please select what you are looking for.');
  for (const field of Object.keys(LIMITS) as Field[]) {
    if (data[field].length > LIMITS[field]) {
      errors.push(`${field[0].toUpperCase()}${field.slice(1)} must be at most ${LIMITS[field]} characters.`);
    }
  }
  if (errors.length) return json(400, { error: errors.join(' ') });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not set');
    return json(500, { error: 'Something went wrong. Please try again.' });
  }

  // Keep a copy in Supabase so nothing is lost if email delivery fails.
  let saved = false;
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const { error } = await createClient(supabaseUrl, supabaseKey)
      .from('contact_submissions')
      .insert({
        name: data.name,
        company: data.company,
        email: data.email,
        requirement: data.requirement,
        message: data.message,
      });
    if (error) console.error('contact: Supabase insert failed:', error.message);
    else saved = true;
  }

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company],
    ['Looking for', data.requirement],
    ['Message', data.message || '(none)'],
    ['Form', data.source || 'website'],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
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

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: data.email,
    subject: `New enquiry from ${data.name.replace(/[\r\n]+/g, ' ')}`,
    text,
    html,
  });

  if (error) {
    console.error('contact: Resend send failed:', error.message);
    // The enquiry is still stored, so the visitor doesn't need to resubmit.
    if (saved) return json(200, { ok: true });
    return json(502, { error: 'We could not send your message. Please try again or email us directly.' });
  }

  return json(200, { ok: true });
}
