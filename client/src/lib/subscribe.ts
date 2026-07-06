export interface SubscribePayload {
  email: string;
  firstName?: string;
  role?: string;
  source: string;
  /** Honeypot — hidden in the UI; forwarded so the server can drop bot fills. */
  website?: string;
}

/** Shared submit helper for all email-capture forms (community signup, Pro waitlist). */
export async function subscribe(payload: SubscribePayload): Promise<{ ok: boolean }> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
