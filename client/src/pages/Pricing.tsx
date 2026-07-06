import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { subscribe } from '@/lib/subscribe';

const SUITE_TOOLS = [
  { name: 'Timeline Calculator Pro', description: 'Saved projects, richer stakeholder-ready reports, and stronger recommendations built on the free Timeline Calculator.' },
  { name: 'Knowledge Transfer Sprint™ Planner', description: 'Plan focused knowledge-transfer sprints before a role, project, or team transition.' },
  { name: 'AI Readiness Assessment', description: 'Assess organizational readiness before an AI-related initiative or rollout.' },
  { name: 'LaunchReady Planner', description: 'Plan launch readiness activities and go/no-go criteria before a rollout.' },
  { name: 'Manager Message Kit Builder', description: 'Build manager-ready messaging and talking points for change and program rollouts.' },
  { name: 'Change Readiness Assessment', description: 'Assess stakeholder and organizational readiness before a change initiative.' },
  { name: 'Learning Needs Diagnostic', description: 'Diagnose learning and capability needs before scoping a training solution.' },
  { name: 'Template & resource library', description: 'A growing library of planning templates and workplace capability resources.' },
];

const COMPARISON_ROWS: { label: string; free: string | null; pro: string }[] = [
  { label: 'Timeline estimates', free: 'Unlimited free estimates', pro: 'Timeline Calculator Pro — saved projects with revision history' },
  { label: 'Downloadable summaries (PDF, PowerPoint, Word)', free: 'Included', pro: 'Included' },
  { label: 'Stakeholder-ready Pro reports', free: null, pro: 'Coming soon' },
  { label: 'Saved projects', free: null, pro: '5 with Project Pass, more with Annual Pro' },
  { label: 'AI Readiness Assessment', free: null, pro: 'Coming soon' },
  { label: 'Knowledge Transfer Sprint™ Planner', free: null, pro: 'Coming soon' },
  { label: 'LaunchReady Planner', free: null, pro: 'Coming soon' },
  { label: 'Manager Message Kit Builder', free: null, pro: 'Coming soon' },
  { label: 'Change Readiness Assessment', free: null, pro: 'Coming soon' },
  { label: 'Learning Needs Diagnostic', free: null, pro: 'Coming soon' },
  { label: 'Template & resource library', free: null, pro: 'Coming soon' },
];

function ProWaitlistForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — stays empty for humans
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function validate(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitting(true);
    const result = await subscribe({ email, firstName, source: 'pro-waitlist', website });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError('Something went wrong — please try again in a moment.');
    }
  }

  if (submitted) {
    return (
      <div role="status" className="bg-[#D7E7FF]/40 border border-[#26006B]/20 p-6 text-center space-y-2" style={{ borderRadius: '8px' }}>
        <p className="font-semibold text-[#26006B]">You're on the list — we'll email you when Tools Pro opens.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      {/* Honeypot — hidden from humans; bot fills are silently dropped server-side */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="pro-website">Website</label>
        <input
          id="pro-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="pro-email" className="block text-xs font-medium text-gray-700 mb-1">
            Email address <span className="text-[#FD6A02]">*</span>
          </label>
          <input
            id="pro-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20"
            style={{ borderRadius: '4px' }}
          />
          {error && <p role="alert" className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
        <div>
          <label htmlFor="pro-name" className="block text-xs font-medium text-gray-700 mb-1">
            First name <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="pro-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full px-3 py-2 text-sm border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20"
            style={{ borderRadius: '4px' }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-6 py-2.5 bg-[#FD6A02] hover:bg-[#e05a00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
        style={{ borderRadius: '4px' }}
      >
        {submitting ? 'Joining…' : 'Join the waitlist'}
      </button>
      <p className="text-xs text-gray-500">
        We'll only email you about Workplace Capability Tools Pro. Unsubscribe anytime.
      </p>
    </form>
  );
}

function PriceCard({
  name,
  price,
  period,
  badge,
  description,
}: {
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
}) {
  return (
    <div
      className="flex-1 bg-white border-2 border-[#26006B]/15 p-8 space-y-4"
      style={{ borderRadius: '8px' }}
    >
      {badge && (
        <span
          className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#FD6A02]"
          style={{ backgroundColor: '#FFF1E8', borderRadius: '4px' }}
        >
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-[#26006B]">{name}</h3>
      <p>
        <span className="text-4xl font-bold text-[#26006B]">{price}</span>{' '}
        <span className="text-gray-500 text-sm">{period}</span>
      </p>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      <a
        href="#waitlist"
        className="inline-block bg-[#26006B] text-white px-6 py-3 font-semibold text-sm hover:bg-[#3d0099] transition-colors duration-200"
        style={{ borderRadius: '4px' }}
      >
        Join the waitlist
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <span
              className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02] mb-4"
              style={{ borderRadius: '4px' }}
            >
              Coming Soon
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-5">
              Workplace Capability Tools Pro
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              The free Timeline Calculator is just the beginning. Tools Pro brings the full
              planning toolkit for learning, project, program, and change work.
            </p>
          </div>
        </section>

        {/* Three tiers explained */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200" style={{ borderRadius: '8px' }}>
                <span
                  className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 mb-3"
                  style={{ backgroundColor: '#E7F6EC', borderRadius: '4px' }}
                >
                  Available now
                </span>
                <h2 className="font-bold text-[#26006B] text-lg mb-2">Free Timeline Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Estimate a realistic planning range for a learning initiative, project, program,
                  or change effort. No account required.
                </p>
                <Link href="/timeline-estimator" asChild>
                  <a className="text-sm font-semibold text-[#FD6A02] hover:text-[#e55a00] transition-colors">
                    Try it free →
                  </a>
                </Link>
              </div>

              <div className="p-6 border border-gray-200" style={{ borderRadius: '8px' }}>
                <span
                  className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-500 mb-3"
                  style={{ backgroundColor: '#F3F4F6', borderRadius: '4px' }}
                >
                  Planned paid upgrade
                </span>
                <h2 className="font-bold text-[#26006B] text-lg mb-2">Timeline Calculator Pro</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Save projects, generate richer stakeholder-ready reports, and get stronger
                  recommendations — built on the same estimate you already trust.
                </p>
              </div>

              <div className="p-6 border border-gray-200" style={{ borderRadius: '8px' }}>
                <span
                  className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-500 mb-3"
                  style={{ backgroundColor: '#F3F4F6', borderRadius: '4px' }}
                >
                  Planned paid suite
                </span>
                <h2 className="font-bold text-[#26006B] text-lg mb-2">Workplace Capability Tools Pro</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Timeline Calculator Pro plus seven more planning tools for readiness, change,
                  and capability building.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-16" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#26006B] mb-2 text-center">
              Planned pricing
            </h2>
            <p className="text-sm text-gray-500 text-center mb-10">
              Prices shown are planned launch pricing. No payment is collected today.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <PriceCard
                name="Project Pass"
                price="$9.97"
                period="/ 30 days"
                description="Full Pro access for a single planning push. Up to 5 saved projects. All Pro tools included."
              />
              <PriceCard
                name="Annual Pro"
                price="$49.97"
                period="/ year"
                badge="Best value"
                description="Everything in Project Pass, for a full year, with a higher project limit."
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              Same tools in both plans — you choose the duration.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#26006B] mb-8 text-center">
              Free vs. Pro
            </h2>
            <div className="overflow-x-auto border border-gray-200" style={{ borderRadius: '8px' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#26006B]/5 text-left">
                    <th className="px-5 py-4 font-bold text-[#26006B]">Feature</th>
                    <th className="px-5 py-4 font-bold text-[#26006B]">Free Timeline Calculator</th>
                    <th className="px-5 py-4 font-bold text-[#26006B]">Workplace Capability Tools Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-5 py-4 text-gray-700 border-t border-gray-100">{row.label}</td>
                      <td className="px-5 py-4 text-gray-500 border-t border-gray-100">
                        {row.free ?? '—'}
                      </td>
                      <td className="px-5 py-4 text-gray-700 border-t border-gray-100">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Pro tools launch progressively; waitlist members get first access.
            </p>
          </div>
        </section>

        {/* Suite tools */}
        <section className="py-16" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#26006B] mb-8 text-center">
              What's in Workplace Capability Tools Pro
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUITE_TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="p-5 bg-white border border-gray-200 flex flex-col"
                  style={{ borderRadius: '8px' }}
                >
                  <span
                    className="inline-block self-start text-xs font-bold uppercase tracking-wide text-gray-500 px-3 py-1 mb-3"
                    style={{ backgroundColor: '#F3F4F6', borderRadius: '4px' }}
                  >
                    Coming Soon
                  </span>
                  <h3 className="font-bold text-[#26006B] text-sm mb-2">{tool.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed flex-1">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#26006B] mb-3">
              Join the Workplace Capability Tools Pro waitlist
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Be the first to know when Project Pass and Annual Pro open.
            </p>
            <ProWaitlistForm />
            <p className="text-xs text-gray-400 mt-8 max-w-xl">
              Prices shown are planned launch pricing and may change. No payment is collected
              today.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
