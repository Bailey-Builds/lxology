const pillars = [
  {
    title: 'Research-Based',
    description: 'Our solutions are grounded in learning science, evidence-based practices, and proven instructional design principles.',
  },
  {
    title: 'Practical',
    description: 'Everything we create is designed to be immediately applicable in real workplace contexts.',
  },
  {
    title: 'Accessible',
    description: 'We design for inclusivity, ensuring learning solutions are available and effective for all learners.',
  },
  {
    title: 'AI-Enabled',
    description: 'We leverage emerging AI tools and technologies to enhance the design, delivery, and impact of learning.',
  },
  {
    title: 'Performance-Focused',
    description: 'Our work is centered on measurable outcomes that improve individual and organizational performance.',
  },
];

export default function WhyLxology() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#F5C2D9]/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">Why Lxology</h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#FD6A02]/40 hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#26006B]/10 to-[#FD6A02]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 bg-[#FD6A02] rounded-full" />
              </div>
              <h3 className="font-bold text-[#26006B] text-lg mb-3">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
