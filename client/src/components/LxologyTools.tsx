import { Link } from 'wouter';

export default function LxologyTools() {
  return (
    <section id="tools" className="py-20 md:py-32 bg-gradient-to-r from-[#26006B]/5 via-white to-[#F5C2D9]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02] mb-4"
            style={{ borderRadius: '4px' }}
          >
            Free Timeline Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-6">
            Plan Smarter. Deliver Faster.
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Use our free Timeline Calculator to generate planning assumptions, milestones, and
            estimated timelines for learning initiatives, projects, programs, and change efforts.
            No account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/timeline-estimator" asChild>
              <a className="inline-block bg-[#FD6A02] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200 shadow-md hover:shadow-lg">
                Launch the Free Timeline Calculator
              </a>
            </Link>
            <Link href="/pricing" asChild>
              <a className="inline-block border-2 border-[#26006B] text-[#26006B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#26006B] hover:text-white transition-colors duration-200">
                Join the Workplace Capability Tools Pro Waitlist
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
