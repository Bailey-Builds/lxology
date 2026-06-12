import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F5C2D9]/10">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-6">
              Expert Support When You Need It
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Research-backed products, expert services, and practical tools designed to help
              organizations develop people, improve performance, and navigate change.
            </p>
          </div>
        </section>

        {/* Service Offerings */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Design Studio */}
              <div className="lx-card flex flex-col">
                <div className="mb-4 inline-block px-3 py-1 bg-[#FD6A02]/10 rounded-full">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#FD6A02]">Service</span>
                </div>
                <h2 className="text-2xl font-bold text-[#26006B] mb-4">
                  Lxology Learning Design Studio™
                </h2>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Custom learning design and development services including learning experiences,
                  programs, content, and performance support resources. We work with organizations
                  that need tailored learning solutions built to their specific context, audience,
                  and goals.
                </p>
              </div>

              {/* Advisory Services */}
              <div className="lx-card flex flex-col">
                <div className="mb-4 inline-block px-3 py-1 bg-[#FD6A02]/10 rounded-full">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#FD6A02]">Service</span>
                </div>
                <h2 className="text-2xl font-bold text-[#26006B] mb-4">
                  Lxology Learning Advisory Services™
                </h2>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Strategic guidance for learning strategy, workforce capability, organizational
                  development, performance improvement, and transformation initiatives. We partner
                  with leaders who need expert thinking to solve complex learning and performance
                  challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#26006B] to-[#1a0047]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Let's Discuss Your Needs
            </h2>
            <a
              href="mailto:hello@lxology.com"
              className="inline-block bg-[#FD6A02] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200 shadow-lg"
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
