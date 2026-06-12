import { FileText, Zap, Users, BookMarked, Layers, Package } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      icon: FileText,
      title: 'Professional Development Guides',
      description: 'Comprehensive guides covering key professional skills, leadership topics, and career development strategies.',
    },
    {
      icon: Zap,
      title: 'Microlearning Resources',
      description: 'Bite-sized learning modules designed for busy professionals who learn on-the-go.',
    },
    {
      icon: BookMarked,
      title: 'Templates & Toolkits',
      description: 'Ready-to-use templates and toolkits that professionals can customize for their specific needs.',
    },
    {
      icon: Users,
      title: 'Facilitator Materials',
      description: 'Complete facilitator guides, presentation decks, and activity materials for training delivery.',
    },
    {
      icon: Layers,
      title: 'Workplace Learning Assets',
      description: 'Curated collections of resources, articles, and tools for ongoing workplace learning and development.',
    },
    {
      icon: Package,
      title: 'Digital Learning Products',
      description: 'Interactive digital experiences including courses, simulations, and learning platforms.',
    },
  ];

  return (
    <section id="resources" className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F5C2D9]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lx-section-title">
            Resources & Digital Products
          </h2>
          <p className="lx-section-subtitle">
            Ready-to-use professional development tools and learning assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="lx-card"
              >
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-[#26006B]/10 to-[#FD6A02]/10 rounded-lg">
                  <Icon className="w-6 h-6 text-[#26006B]" />
                </div>
                <h3 className="text-xl font-bold text-[#26006B] mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-[#26006B]/5 to-[#FD6A02]/5 rounded-2xl border border-[#FD6A02]/20 text-center">
          <p className="text-gray-700 mb-6 text-lg">
            Explore our complete library of resources and find the tools you need to succeed.
          </p>
          <button className="lx-button-primary">
            Browse All Resources
          </button>
        </div>
      </div>
    </section>
  );
}
