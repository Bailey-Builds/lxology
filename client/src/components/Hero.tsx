export default function Hero() {
  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-end lg:min-h-[640px]">

        {/* Text — full width on mobile/tablet, 40% on desktop */}
        <div className="lg:w-[40%] shrink-0">
          <div className="px-6 sm:px-10 lg:pl-12 lg:pr-2 py-10 sm:py-14 lg:py-16">
            <div className="mb-4">
              <span
                className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02]"
                style={{ borderRadius: '4px' }}
              >
                Welcome to LXOLOGY
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#26006B] mb-5 leading-tight">
              Elevate Learning.
              <br />
              Enhance Experiences.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl lg:max-w-none">
              Professional learning solutions, scalable training programs, and workplace
              development resources designed to improve performance and build capability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToThreeWays}
                className="bg-[#FD6A02] text-white px-7 py-3 font-semibold text-base hover:bg-[#e55a00] transition-colors duration-200"
                style={{ borderRadius: '4px' }}
              >
                Work With Lxology
              </button>
              <button
                className="bg-[#26006B] text-white px-7 py-3 font-semibold text-base hover:bg-[#1a0047] transition-colors duration-200"
                style={{ borderRadius: '4px' }}
              >
                Explore Products
              </button>
            </div>
          </div>
        </div>

        {/* Illustration — capped height on mobile, full bleed on desktop */}
        <div className="flex-1 flex items-end">
          <img
            src="/hero-team.png"
            alt="Lxology team illustration"
            className="w-full h-auto block max-h-[320px] sm:max-h-[420px] lg:max-h-none object-contain object-bottom lg:object-fill"
          />
        </div>

      </div>
    </section>
  );
}
