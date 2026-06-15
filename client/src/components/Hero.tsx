export default function Hero() {
  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-stretch">

        {/* Text — 58% on desktop so headline fits on two lines */}
        <div className="lg:w-[58%] shrink-0 flex items-center">
          <div className="px-6 sm:px-10 lg:pl-14 lg:pr-10 py-12 sm:py-16 lg:py-20 w-full">
            <div className="mb-5">
              <span
                className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02]"
                style={{ borderRadius: '4px' }}
              >
                Welcome to LXOLOGY
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#26006B] mb-6 leading-tight">
              Elevate Learning.
              <br />
              Enhance Experiences.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
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

        {/* Image — overflow hidden clips the blank top portion of the PNG */}
        <div className="lg:flex-1 overflow-hidden flex items-end"
          style={{ maxHeight: '520px' }}>
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
