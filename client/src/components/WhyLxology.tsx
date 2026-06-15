import { BookOpen, CheckSquare, Users, Sparkles, Target } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Research-Based',
    description:
      'Lxology solutions are grounded in learning science, evidence-informed practices, and proven instructional design principles.',
  },
  {
    icon: CheckSquare,
    title: 'Practical',
    description:
      'Every resource is designed to be clear, usable, and immediately applicable in real workplace contexts.',
  },
  {
    icon: Users,
    title: 'Accessible',
    description:
      'We design with clarity, usability, and learner experience in mind so solutions can support a wide range of professionals and teams.',
  },
  {
    icon: Sparkles,
    title: 'AI-Enabled',
    description:
      'We use emerging AI tools thoughtfully to support smarter design, efficient workflows, and stronger learning experiences.',
  },
  {
    icon: Target,
    title: 'Performance-Focused',
    description:
      'Our work connects learning to measurable outcomes that improve capability, confidence, and workplace performance.',
  },
];

export default function WhyLxology() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-12">Why Lxology</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 bg-white border border-gray-100 shadow-sm flex flex-col"
                style={{ borderRadius: '6px' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ backgroundColor: '#D7E7FF', borderRadius: '4px' }}
                >
                  <Icon className="w-5 h-5 text-[#26006B]" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-[#26006B] text-base mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
