import { useState } from 'react';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);

  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="bg-white overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-[#FD6A02]/10 rounded-full text-sm font-semibold text-[#FD6A02]">
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
                style={{ borderRadius: '10px' }}
              >
                Work With Lxology
              </button>
              <button
                className="bg-[#26006B] text-white px-7 py-3 font-semibold text-base hover:bg-[#1a0047] transition-colors duration-200"
                style={{ borderRadius: '10px' }}
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex items-center justify-center">
            <div
              className={`transition-all duration-500 ease-out ${isHovering ? 'translate-y-2' : 'translate-y-0'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src="/hero-team.png"
                alt="Lxology team illustration"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
