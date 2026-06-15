import { useState } from 'react';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);

  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[560px]">
          {/* Left: Content */}
          <div className="flex flex-col justify-center py-16 pr-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02]" style={{ borderRadius: '4px' }}>
                Welcome to LXOLOGY
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#26006B] mb-6 leading-tight">
              Elevate Learning.
              <br />
              Enhance Experiences.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Professional learning solutions, scalable training programs, and workplace development resources designed to improve performance and build capability.
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

          {/* Right: Illustration — fills full column height */}
          <div className="flex items-end justify-center pt-8">
            <div
              className={`w-full transition-all duration-500 ease-out ${isHovering ? 'translate-y-1' : 'translate-y-0'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src="/hero-team.png"
                alt="Lxology team illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
