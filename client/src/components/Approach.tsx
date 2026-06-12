import { Brain, Eye, Accessibility, Zap, Layers, BarChart3, Cpu } from 'lucide-react';

export default function Approach() {
  const approaches = [
    {
      icon: Brain,
      title: 'Instructional Design',
      description: 'Evidence-based design principles that create clear learning pathways and measurable outcomes.',
    },
    {
      icon: Users,
      title: 'Adult Learning Principles',
      description: 'Designs that respect how adults learn—practical, relevant, and immediately applicable.',
    },
    {
      icon: Zap,
      title: 'Neuroscience',
      description: 'Learning experiences informed by cognitive science to enhance retention and transfer.',
    },
    {
      icon: Accessibility,
      title: 'Accessibility',
      description: 'Inclusive design that ensures learning is available and effective for all learners.',
    },
    {
      icon: Eye,
      title: 'Visual Communication',
      description: 'Strategic use of visuals, design, and multimedia to enhance clarity and engagement.',
    },
    {
      icon: BarChart3,
      title: 'Performance Improvement',
      description: 'Focus on measurable business impact and real-world application of learning.',
    },
    {
      icon: Cpu,
      title: 'Emerging Technologies',
      description: 'Leveraging AI, microlearning, and digital tools to create modern learning experiences.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#F5C2D9]/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lx-section-title">
            Where Learning Science Meets Workplace Impact
          </h2>
          <p className="lx-section-subtitle">
            Our approach is grounded in proven methodologies and emerging best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approaches.map((approach, index) => {
            const Icon = approach.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-[#FD6A02]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#FD6A02]/10 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#FD6A02]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#26006B] mb-2">
                      {approach.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Placeholder icon for Users since it's used but not imported
function Users({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 10H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
