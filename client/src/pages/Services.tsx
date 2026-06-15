import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Layers, Compass } from 'lucide-react';

const bestFitItems = [
  'A custom learning solution instead of a generic course',
  'Help turning complex information into clear learning experiences',
  'Strategic guidance before building a program or initiative',
  'Practical resources that support performance after training',
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-5">
              Strategic Learning Support<br />for Workplace Growth
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Lxology provides custom learning design, advisory support, and practical workplace
              development solutions for organizations that need to build capability, improve
              performance, and navigate change.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Card 1 */}
              <div
                className="flex flex-col p-8 border border-gray-100 shadow-sm bg-white"
                style={{ borderRadius: '6px' }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#D7E7FF', borderRadius: '4px' }}
                >
                  <Layers className="w-5 h-5 text-[#26006B]" strokeWidth={1.8} />
                </div>
                <span
                  className="inline-block self-start text-xs font-bold uppercase tracking-wide text-[#FD6A02] px-3 py-1 mb-4"
                  style={{ backgroundColor: '#FFF1E8', borderRadius: '4px' }}
                >
                  Service
                </span>
                <h2 className="text-xl font-bold text-[#26006B] mb-3">
                  Lxology Learning Design Studio™
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm flex-1">
                  Custom learning design and development services for organizations that need
                  tailored learning solutions, workplace programs, and performance support
                  resources built for their specific context, audience, and goals.
                </p>
                <ul className="space-y-2">
                  {['Custom learning programs', 'Training materials and facilitator resources', 'Performance support tools', 'Branded workplace learning assets'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#FD6A02] mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2 */}
              <div
                className="flex flex-col p-8 border border-gray-100 shadow-sm bg-white"
                style={{ borderRadius: '6px' }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#D7E7FF', borderRadius: '4px' }}
                >
                  <Compass className="w-5 h-5 text-[#26006B]" strokeWidth={1.8} />
                </div>
                <span
                  className="inline-block self-start text-xs font-bold uppercase tracking-wide text-[#FD6A02] px-3 py-1 mb-4"
                  style={{ backgroundColor: '#FFF1E8', borderRadius: '4px' }}
                >
                  Service
                </span>
                <h2 className="text-xl font-bold text-[#26006B] mb-3">
                  Lxology Learning Advisory Services™
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm flex-1">
                  Strategic guidance for organizations navigating learning strategy, workforce
                  capability, performance improvement, organizational learning, and transformation
                  initiatives.
                </p>
                <ul className="space-y-2">
                  {['Learning strategy support', 'Capability development planning', 'Program and curriculum guidance', 'Performance-focused recommendations'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#FD6A02] mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Fit */}
        <section className="py-14" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-[#26006B] mb-8">
              Best for organizations that need:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {bestFitItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white p-5 border border-gray-100 shadow-sm"
                  style={{ borderRadius: '6px' }}
                >
                  <span className="text-[#FD6A02] font-bold mt-0.5 flex-shrink-0">→</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ backgroundColor: '#26006B' }}>
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Discuss Your Learning Needs
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Tell us what you're trying to build, improve, or solve. Lxology can help you
              determine the right level of support.
            </p>
            <a
              href="mailto:info@lxology.com"
              className="inline-block bg-[#FD6A02] text-white px-10 py-4 font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200 shadow-lg"
              style={{ borderRadius: '4px' }}
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
