export default function ThreeWaysWeHelp() {
  const ways = [
    {
      title: 'Products',
      description:
        'Practical resources, toolkits, and learning solutions designed to help organizations develop people and improve performance.',
      buttonLabel: 'Explore Products',
      href: '#products',
    },
    {
      title: 'Services',
      description:
        'Expert guidance, advisory support, and custom learning solutions designed to solve workplace challenges.',
      buttonLabel: 'Explore Services',
      href: '#services',
    },
    {
      title: 'Tools',
      description:
        'Professional planning and productivity tools designed to help learning professionals, project managers, program leaders, and change practitioners work smarter.',
      buttonLabel: 'Explore Tools',
      href: '#tools',
    },
  ];

  return (
    <section id="three-ways-we-help" className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F5C2D9]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">
            Three Ways We Help
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ways.map((way) => (
            <div
              key={way.title}
              className="lx-card flex flex-col"
            >
              <h3 className="text-2xl font-bold text-[#26006B] mb-4">{way.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-1">{way.description}</p>
              <a
                href={way.href}
                className="inline-block text-center bg-[#FD6A02] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors duration-200"
              >
                {way.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
