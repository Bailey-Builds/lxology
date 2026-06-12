const offerings = [
  {
    title: 'Lxology Learning Essentials™',
    type: 'Product',
    description: 'Focused, ready-to-deliver learning solutions designed to address specific workplace topics and challenges.',
    status: 'coming-soon' as const,
  },
  {
    title: 'Lxology Workshop-In-A-Box™',
    type: 'Product',
    description: 'Complete learning programs designed to help organizations build capability at scale.',
    status: 'coming-soon' as const,
  },
  {
    title: 'Workplace Capability Toolkit™',
    type: 'Product',
    description: 'Practical frameworks, templates, guides, and resources designed to help professionals build confidence and capability in key workplace responsibilities.',
    status: 'coming-soon' as const,
  },
  {
    title: 'Lxology Learning Design Studio™',
    type: 'Service',
    description: 'Custom learning design and development services for organizations that need tailored learning solutions, programs, and performance support resources.',
    status: 'coming-soon' as const,
  },
  {
    title: 'Lxology Learning Advisory Services™',
    type: 'Service',
    description: 'Strategic guidance focused on capability development, learning strategy, workforce transformation, organizational learning, and workplace performance.',
    status: 'coming-soon' as const,
  },
];

export default function FeaturedOfferings() {
  return (
    <section id="products" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">
            Featured Offerings
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="lx-card flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wide text-[#FD6A02] bg-[#FD6A02]/10 px-3 py-1 rounded-full">
                  {offering.type}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#26006B] mb-3">{offering.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">{offering.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
