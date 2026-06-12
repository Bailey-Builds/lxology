export default function LxologyTools() {
  return (
    <section id="tools" className="py-20 md:py-32 bg-gradient-to-r from-[#26006B]/5 via-white to-[#F5C2D9]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-6">
            Plan Smarter. Deliver Faster.
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Use our free Timeline Estimator to generate planning assumptions, milestones, and estimated
            timelines for learning initiatives, projects, programs, and change efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-block bg-[#FD6A02] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e55a00] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Launch Timeline Estimator
            </a>
            <a
              href="#"
              className="inline-block border-2 border-[#26006B] text-[#26006B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#26006B] hover:text-white transition-colors duration-200"
            >
              Join the Lxology Pro Waitlist
            </a>
          </div>
        </div>

        {/* Coming Soon card */}
        <div className="mt-16 max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-wide text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-4">
            Coming Soon
          </span>
          <h3 className="text-xl font-bold text-[#26006B] mb-3">Lxology Pro</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Advanced planning tools, AI-powered workflows, prompt libraries, calculators, templates, and productivity resources.
          </p>
          <a
            href="#"
            className="inline-block border-2 border-[#FD6A02] text-[#FD6A02] px-6 py-3 rounded-lg font-semibold hover:bg-[#FD6A02] hover:text-white transition-colors duration-200"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
