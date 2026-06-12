export default function MissionVision() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-[#26006B]/5 via-white to-[#F5C2D9]/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mission */}
          <div className="lx-card">
            <div className="mb-4 inline-block px-4 py-2 bg-[#FD6A02]/20 rounded-full">
              <span className="text-sm font-bold text-[#FD6A02] uppercase tracking-wide">Our Mission</span>
            </div>
            <h3 className="text-3xl font-bold text-[#26006B] mb-6">
              Making Professional Learning Accessible and Effective
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To make professional learning more accessible, practical, engaging, and effective by providing organizations and professionals with high-quality learning solutions that improve performance, build capability, and support long-term success.
            </p>
          </div>

          {/* Vision */}
          <div className="lx-card bg-gradient-to-br from-[#26006B]/5 to-[#FD6A02]/5">
            <div className="mb-4 inline-block px-4 py-2 bg-[#26006B]/20 rounded-full">
              <span className="text-sm font-bold text-[#26006B] uppercase tracking-wide">Our Vision</span>
            </div>
            <h3 className="text-3xl font-bold text-[#26006B] mb-6">
              The Trusted Partner for Modern Learning
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become a trusted learning partner for organizations and professionals seeking modern, practical, and scalable learning solutions that elevate performance and enhance workplace experiences.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { label: 'Practical', description: 'Solutions that work in the real world' },
            { label: 'Engaging', description: 'Learning experiences people want to take' },
            { label: 'Effective', description: 'Measurable impact on performance' },
            { label: 'Accessible', description: 'Inclusive and available to all' },
          ].map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-gray-200 text-center hover:border-[#FD6A02]/30 hover:shadow-md transition-all duration-300"
            >
              <h4 className="font-bold text-[#26006B] text-lg mb-2">
                {value.label}
              </h4>
              <p className="text-sm text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
