import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-5">About Lxology</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Lxology is a learning and performance solutions company that creates scalable learning
              products, custom solutions, practical tools, and strategic support to help organizations
              build capability, improve performance, and strengthen workplace learning experiences.
            </p>
          </div>
        </section>

        {/* Content sections */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-8 space-y-14">

            {/* What Lxology Means */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">What Lxology Means</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Lxology combines Learning Experience and Science. The name reflects our belief that
                effective workplace learning should be thoughtfully designed, grounded in
                evidence-informed practices, and built to support real-world performance.
              </p>
              <p className="text-gray-500 text-sm italic">Lxology is pronounced L-X-OLOGY.</p>
            </div>

            <div className="border-t border-gray-100" />

            {/* Who We Are */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                Lxology helps organizations develop people through scalable learning products, custom
                learning solutions, practical tools, and advisory support. We focus on creating
                workplace learning that is clear, useful, and connected to performance.
              </p>
            </div>

            <div className="border-t border-gray-100" />

            {/* What We Do */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">What We Do</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                We design scalable learning products, workplace development resources, custom learning
                content, and practical tools that help organizations solve learning, performance,
                project, program, and change-related challenges.
              </p>
              <ul className="space-y-2">
                {[
                  'Scalable learning products and toolkits',
                  'Custom learning design and development',
                  'Advisory support for learning and performance challenges',
                  'Practical tools for planning, productivity, and workplace capability',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#FD6A02] mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-100" />

            {/* Our Mission */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-3 font-medium">
                Elevate learning. Enhance experiences.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to make workplace learning more practical, accessible, and
                performance-focused so organizations and professionals can build the capabilities
                they need to grow.
              </p>
            </div>

            <div className="border-t border-gray-100" />

            {/* Leadership */}
            <div>
              <h2 className="text-2xl font-bold text-[#26006B] mb-6">Leadership</h2>
              <div
                className="max-w-2xl p-7 border border-gray-100 shadow-sm bg-white"
                style={{ borderRadius: '12px' }}
              >
                <h3 className="text-lg font-bold text-[#26006B] mb-1">Emily Bailey</h3>
                <p className="text-[#FD6A02] font-semibold text-sm mb-4">
                  Founder &amp; Principal Learning Strategist
                </p>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  Emily Bailey founded Lxology to help organizations create scalable learning
                  solutions that build capability, improve performance, and support meaningful
                  workplace growth.
                </p>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  With more than 20 years of experience across learning strategy, instructional
                  design, leadership development, organizational change, and workforce capability
                  development, Emily brings a practical, research-informed approach to learning and
                  performance solutions.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Her work is also driven by a commitment to helping professionals reach their career
                  goals, strengthen their confidence, and develop the capabilities they need to move
                  forward in their work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ backgroundColor: '#26006B' }}>
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Better Learning Experiences
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Whether you need a scalable learning product, custom learning solution, practical tool,
              or strategic support, Lxology can help you move from idea to action.
            </p>
            <a
              href="mailto:info@lxology.com"
              className="inline-block bg-[#FD6A02] text-white px-10 py-4 font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200 shadow-lg"
              style={{ borderRadius: '10px' }}
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
