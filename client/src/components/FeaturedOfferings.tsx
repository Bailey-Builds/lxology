const offerings = [
  {
    label: 'Product',
    title: 'Lxology Learning Essentials™',
    description:
      'Focused, ready-to-deliver learning solutions designed to help organizations address specific workplace topics, build skills, and support performance.',
    status: 'Coming Soon',
  },
  {
    label: 'Product',
    title: 'Lxology Workshop-In-A-Box™',
    description:
      'Complete, scalable learning programs designed to help organizations build capability through structured workshops, facilitator resources, and practical implementation support.',
    status: 'Coming Soon',
  },
  {
    label: 'Product',
    title: 'Workplace Capability Toolkit™',
    description:
      'Practical frameworks, templates, guides, and resources designed to help professionals build confidence and capability in key workplace responsibilities.',
    status: 'Coming Soon',
  },
  {
    label: 'Service',
    title: 'Lxology Learning Design Studio™',
    description:
      'Custom learning design and development services for organizations that need tailored learning solutions, workplace programs, and performance support resources.',
    status: 'Coming Soon',
  },
  {
    label: 'Service',
    title: 'Lxology Learning Advisory Services™',
    description:
      'Strategic guidance for organizations navigating capability development, learning strategy, workforce transformation, organizational learning, and workplace performance.',
    status: 'Coming Soon',
  },
  {
    label: 'Community',
    title: 'The LX Hub™',
    description:
      'A professional growth community designed to support learners, leaders, and workplace professionals through focused labs, resources, live sessions, and practical capability-building support.',
    status: 'Coming Soon',
  },
];

export default function FeaturedOfferings() {
  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-12">
          Featured Offerings
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="flex flex-col p-6 border border-gray-100 shadow-sm"
              style={{ borderRadius: '6px', backgroundColor: offering.title === 'The LX Hub™' ? '#F6F9FF' : '#ffffff' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-wide text-[#FD6A02] px-3 py-1"
                  style={{ backgroundColor: '#FFF1E8', borderRadius: '4px' }}
                >
                  {offering.label}
                </span>
                <span
                  className="text-xs font-semibold text-gray-500 px-3 py-1"
                  style={{ backgroundColor: '#F3F4F6', borderRadius: '4px' }}
                >
                  Coming Soon
                </span>
              </div>
              <h3 className="text-base font-bold text-[#26006B] mb-3">{offering.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">{offering.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
