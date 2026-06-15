import { Package, Compass, LayoutDashboard } from 'lucide-react';

const ways = [
  {
    icon: Package,
    title: 'Products',
    description:
      'Ready-to-use learning products, toolkits, and workplace development resources designed to help organizations build skills, support performance, and strengthen capability.',
    buttonLabel: 'Explore Products',
    href: '/#products',
  },
  {
    icon: Compass,
    title: 'Services',
    description:
      'Strategic learning design, advisory support, and custom development services for organizations that need practical solutions to workplace learning and performance challenges.',
    buttonLabel: 'Explore Services',
    href: '/services',
  },
  {
    icon: LayoutDashboard,
    title: 'Tools',
    description:
      'Practical planning and productivity tools designed to help learning professionals, project leaders, and change practitioners scope work, make decisions, and move initiatives forward.',
    buttonLabel: 'Explore Tools',
    href: '/#tools',
  },
];

export default function ThreeWaysWeHelp() {
  return (
    <section id="three-ways-we-help" className="py-16 md:py-24" style={{ backgroundColor: '#F6F9FF' }}>
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-12">
          Three Ways Lxology Supports Growth
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {ways.map((way) => {
            const Icon = way.icon;
            return (
              <div
                key={way.title}
                className="bg-white flex flex-col p-7 border border-gray-100 shadow-sm"
                style={{ borderRadius: '12px' }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ backgroundColor: '#D7E7FF', borderRadius: '10px' }}
                >
                  <Icon className="w-5 h-5 text-[#26006B]" strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-bold text-[#26006B] mb-3">{way.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm">{way.description}</p>

                <a
                  href={way.href}
                  className="inline-block text-center bg-[#FD6A02] text-white px-6 py-3 font-semibold text-sm hover:bg-[#e55a00] transition-colors duration-200"
                  style={{ borderRadius: '10px' }}
                >
                  {way.buttonLabel}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
