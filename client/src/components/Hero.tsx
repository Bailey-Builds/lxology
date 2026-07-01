export default function Hero() {
  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="bg-white overflow-hidden pb-10 md:pb-0">
      <div className="flex flex-col lg:flex-row lg:items-center lg:min-h-[580px]">

        {/* Text — full width on mobile/tablet, 40% on desktop */}
        <div className="lg:w-1/2 shrink-0">
          <div className="px-6 sm:px-10 lg:pl-12 lg:pr-2 py-10 sm:py-14 lg:py-16">
            <div className="mb-4">
              <span
                className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02]"
                style={{ borderRadius: '4px' }}
              >
                Welcome to LXOLOGY
              </span>
            </div>
            <h1
              className="font-bold text-[#26006B] mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              <span className="block whitespace-nowrap">Elevate Learning.</span>
              <span className="block whitespace-nowrap">Enhance Experiences.</span>
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
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#26006B] text-white px-7 py-3 font-semibold text-base hover:bg-[#1a0047] transition-colors duration-200"
                style={{ borderRadius: '4px' }}
              >
                Explore Products
              </button>
            </div>
          </div>
        </div>

        {/* Illustration — capped height on mobile, full bleed on desktop */}
        <div className="flex-1 flex items-end relative">
          {/* Floating decorative accents — themed to the illustration */}
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            {/* Idea spark glow (over the lightbulb, upper-left) */}
            <span className="lx-glow absolute left-[18%] top-[8%] h-16 w-16 rounded-full bg-[#FD6A02]/40 blur-md" />

            {/* Play chip (near the video card, upper-right) */}
            <span className="lx-drift absolute right-[10%] top-[16%] flex h-11 w-11 items-center justify-center rounded-xl bg-[#26006B] shadow-lg">
              <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>

            {/* Document lines chip (near the text card, lower-left) */}
            <span className="lx-float-soft absolute left-[8%] top-[46%] flex h-11 w-11 flex-col items-start justify-center gap-1 rounded-xl bg-white px-2.5 shadow-lg ring-1 ring-black/5">
              <span className="h-1 w-4 rounded-full bg-[#FD6A02]" />
              <span className="h-1 w-6 rounded-full bg-[#26006B]/60" />
              <span className="h-1 w-5 rounded-full bg-[#26006B]/60" />
            </span>

            {/* Sparkle (upper-mid) */}
            <svg className="lx-float absolute left-[45%] top-[6%] h-6 w-6 fill-[#FD6A02]" viewBox="0 0 24 24">
              <path d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z" />
            </svg>

            {/* Floating dots */}
            <span className="lx-float absolute right-[22%] top-[52%] h-3 w-3 rounded-full bg-[#FD6A02]" />
            <span className="lx-float-soft absolute right-[6%] top-[40%] h-2.5 w-2.5 rounded-full bg-[#26006B]/50" />
            <span className="lx-drift absolute left-[30%] top-[62%] h-2 w-2 rounded-full bg-[#26006B]/40" />
          </div>

          <img
            src="/hero-team.png"
            alt="Lxology team illustration"
            className="lx-float-soft w-full h-auto block max-h-[320px] sm:max-h-[420px] lg:max-h-none object-contain object-bottom lg:object-fill"
          />
        </div>

      </div>
    </section>
  );
}
