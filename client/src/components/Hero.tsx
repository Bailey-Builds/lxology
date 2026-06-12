import { useState } from 'react';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);

  const scrollToThreeWays = () => {
    document.getElementById('three-ways-we-help')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-white overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="z-10">
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
              Professional learning solutions, training programs, and workplace development resources designed to improve performance and build capability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToThreeWays}
                className="lx-button-primary"
              >
                Work With Lxology
              </button>
              <button className="lx-button-primary bg-[#26006B] hover:bg-[#1a0047]">
                Explore Products
              </button>
            </div>
          </div>

          {/* Right: Image with Floating Effect */}
          <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
            <div
              className={`transition-all duration-500 ease-out ${
                isHovering ? 'translate-y-8' : 'translate-y-0'
              }`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src="/manus-storage/2_08e544b3.png"
                alt="Girl typing on laptop"
                className="w-full h-auto max-w-md mx-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5C2D9] to-transparent opacity-20"></div>
    </section>
  );
}
