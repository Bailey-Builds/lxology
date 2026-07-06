import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field-length caps: generous for humans, hostile to payload abuse.
const MAX_EMAIL_LENGTH = 254; // RFC 5321 practical limit
const MAX_NAME_LENGTH = 100;
const MAX_ROLE_LENGTH = 200;
const MAX_SOURCE_LENGTH = 50;

interface SubscribeBody {
  email?: string;
  firstName?: string;
  role?: string;
  source?: string;
  /** Honeypot — hidden in the UI; humans never fill it. */
  website?: string;
}

function clip(value: unknown, max: number): string | undefined {
  return typeof value === 'string' ? value.slice(0, max) : undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = (req.body ?? {}) as SubscribeBody;

    // Honeypot tripped: respond as if successful (don't tip off bots), but
    // never forward the submission anywhere.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      res.status(200).json({ ok: true });
      return;
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: 'A valid email address is required' });
      return;
    }

    const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL;
    if (!webhookUrl) {
      res.status(503).json({ error: 'Subscription service not configured' });
      return;
    }

    const payload = {
      email,
      firstName: clip(body.firstName, MAX_NAME_LENGTH),
      role: clip(body.role, MAX_ROLE_LENGTH),
      source: clip(body.source, MAX_SOURCE_LENGTH),
      submittedAt: new Date().toISOString(),
    };

    const webhookRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      res.status(502).json({ error: 'Subscription service unavailable' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Unexpected server error' });
  }
}
