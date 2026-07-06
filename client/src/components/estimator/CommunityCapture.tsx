import { useState } from 'react';
import { subscribe } from '@/lib/subscribe';

export default function CommunityCapture() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — stays empty for humans
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function validate(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitting(true);
    const result = await subscribe({ email, firstName, role, source: 'community', website });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError('Something went wrong — please try again in a moment.');
    }
  }

  if (submitted) {
    return (
      <div role="status" className="bg-[#D7E7FF]/40 border border-[#26006B]/20 rounded-2xl p-6 text-center space-y-2">
        <div className="text-2xl" aria-hidden="true">🎉</div>
        <p className="font-semibold text-[#26006B]">You're in.</p>
        <p className="text-sm text-gray-600">
          You'll receive practical tools, templates, and resources from Lxology.
          Unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#D7E7FF]/40 border border-[#26006B]/20 rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="font-bold text-[#26006B] text-lg">Want More Tools Like This?</h3>
        <p className="text-sm text-gray-600 mt-1">
          Join the Lxology community to receive practical tools, templates, planning resources,
          and updates when new Lxology products are released.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot — hidden from humans; bot fills are silently dropped server-side */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="lx-website">Website</label>
          <input
            id="lx-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="lx-email" className="block text-xs font-medium text-gray-700 mb-1">
              Email address <span className="text-[#FD6A02]">*</span>
            </label>
            <input
              id="lx-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20"
            />
            {error && <p role="alert" className="text-xs text-red-600 mt-1">{error}</p>}
          </div>
          <div>
            <label htmlFor="lx-name" className="block text-xs font-medium text-gray-700 mb-1">
              First name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="lx-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lx-role" className="block text-xs font-medium text-gray-700 mb-1">
            Role or area of interest <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="lx-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Instructional designer, L&D manager…"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#FD6A02] hover:bg-[#e05a00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-sm transition-colors"
        >
          {submitting ? 'Joining…' : 'Join the Community'}
        </button>
        <p className="text-xs text-gray-500">
          By joining, you agree to receive Lxology updates, tools, templates, and professional
          learning resources. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
