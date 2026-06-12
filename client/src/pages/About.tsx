import Header from '@/components/Header';
import Footer from '@/components/Footer';

const specialtyAreas = [
  'Learning Design',
  'Learning Science',
  'Accessibility',
  'AI-Enabled Learning',
  'Workplace Performance',
  'Specialized Consulting',
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Dictionary-style brand section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-16">About Lxology</h1>

            <div className="border-t border-gray-200 pt-12 mb-16">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">pronunciation</p>
              <p className="text-2xl font-bold text-[#26006B] mb-1">Lxology</p>
              <p className="text-gray-500 italic mb-4">(pronounced L-X-OLOGY)</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-700">noun</span> &nbsp;|&nbsp; Learning Experience + Science
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                The belief that effective workplace learning is created when engaging learning
                experiences are combined with evidence-based practices to improve performance,
                build capability, and drive meaningful results.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-12 mb-16">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Origin</p>
              <div className="space-y-3 text-gray-600">
                <p><span className="font-semibold text-[#26006B]">LX</span> = Learning Experience</p>
                <p><span className="font-semibold text-[#26006B]">-ology</span> = The study, understanding, and application of knowledge</p>
                <p className="mt-4 leading-relaxed">
                  <span className="font-semibold text-[#26006B]">Lxology</span> = The practice of combining learning experience design,
                  learning science, strategy, and practical application to improve workplace performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are / Mission / What We Do / How We Work */}
        <section className="py-20 bg-gradient-to-b from-[#F5C2D9]/5 to-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-16">

            <div className="border-t-2 border-[#FD6A02] pt-10">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Lxology is a learning and performance solutions company dedicated to helping
                organizations develop people, build capability, and improve workplace performance.
              </p>
            </div>

            <div className="border-t-2 border-[#FD6A02] pt-10">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Elevate Learning. Enhance Experiences.
              </p>
            </div>

            <div className="border-t-2 border-[#FD6A02] pt-10">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">What We Do</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We create practical products, provide expert services, and develop professional
                tools that help organizations solve learning, performance, project, program, and
                change-related challenges.
              </p>
            </div>

            <div className="border-t-2 border-[#FD6A02] pt-10">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">How We Work</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our approach combines learning experience design, evidence-based practices,
                business strategy, and practical implementation guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Network */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="border-t-2 border-[#FD6A02] pt-10">
              <h2 className="text-2xl font-bold text-[#26006B] mb-4">
                Lxology Learning Specialist Partnership Network
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Lxology collaborates with a trusted network of experienced learning and performance
                professionals who provide specialized expertise when needed.
              </p>
              <div className="flex flex-wrap gap-3">
                {specialtyAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-gradient-to-br from-[#26006B]/5 to-[#FD6A02]/5 border border-gray-200 rounded-full text-sm font-semibold text-[#26006B]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-gradient-to-b from-[#F5C2D9]/5 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="border-t-2 border-[#FD6A02] pt-10">
              <h2 className="text-2xl font-bold text-[#26006B] mb-8">Leadership</h2>
              <div className="lx-card">
                <h3 className="text-xl font-bold text-[#26006B] mb-1">Emily Bailey</h3>
                <p className="text-[#FD6A02] font-semibold mb-4">Founder &amp; Principal Learning Strategist</p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Emily founded Lxology to help organizations develop people, build capability,
                  and improve workplace performance through practical, research-informed solutions.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With more than 20 years of experience across learning strategy, leadership
                  development, instructional design, organizational change, and workforce capability
                  development, she leads the strategic direction of Lxology and its growing network
                  of specialists.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
