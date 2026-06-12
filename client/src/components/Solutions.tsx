import { Lightbulb, Users, TrendingUp, Zap, BookOpen, Target } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: Lightbulb,
      title: 'Custom Learning Design',
      description: 'Tailored learning solutions designed specifically for your organization\'s unique challenges, culture, and goals.',
    },
    {
      icon: BookOpen,
      title: 'Professional Development Resources',
      description: 'Ready-to-use templates, guides, and microlearning resources that professionals can access on-demand.',
    },
    {
      icon: Users,
      title: 'Leadership & Communication Programs',
      description: 'Comprehensive programs that develop leadership capabilities and enhance communication effectiveness across teams.',
    },
    {
      icon: TrendingUp,
      title: 'Workplace Performance Support',
      description: 'Practical tools and resources that support ongoing performance improvement and skill application in real work.',
    },
    {
      icon: Zap,
      title: 'Digital Learning Products',
      description: 'Interactive, engaging digital experiences that make learning accessible, practical, and effective.',
    },
    {
      icon: Target,
      title: 'Learning Experience Strategy',
      description: 'Strategic guidance to build a learning culture that supports organizational goals and employee development.',
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lx-section-title">Our Solutions</h2>
          <p className="lx-section-subtitle">
            Comprehensive learning solutions designed to build capability and drive performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="lx-card group"
              >
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-[#26006B]/10 to-[#FD6A02]/10 rounded-lg group-hover:from-[#26006B]/20 group-hover:to-[#FD6A02]/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#FD6A02]" />
                </div>
                <h3 className="text-xl font-bold text-[#26006B] mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
