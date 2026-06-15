export default function Hero() {
  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:min-h-[640px]">

        {/* Left: Content — constrained width, padded from left */}
        <div className="md:w-[40%] shrink-0 flex items-center">
          <div className="px-8 md:pl-12 md:pr-2 py-16 w-full">
            <div className="mb-4">
              <span
                className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02]"
                style={{ borderRadius: '4px' }}
              >
                Welcome to LXOLOGY
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#26006B] mb-6 leading-tight">
              Elevate Learning.
              <br />
              Enhance Experiences.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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

        {/* Right: Illustration — fills remaining viewport width, bleeds to edge */}
        <div className="flex-1 flex items-end">
          <img
            src="/hero-team.png"
            alt="Lxology team illustration"
            className="w-full h-auto block"
          />
        </div>

      </div>
    </section>
  );
}
