export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  requirement: string;
  message?: string;
  /** Which form sent it, shown in the email. */
  source: string;
  /** Honeypot; must stay empty. */
  website: string;
}

/** Posts the form to /api/contact. Throws an Error with a user-facing message on failure. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || 'Something went wrong. Please try again.');
  }
}
