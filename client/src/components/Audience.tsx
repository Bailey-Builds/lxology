import { User, Users, Briefcase, Lightbulb, Building2, Users2 } from 'lucide-react';

export default function Audience() {
  const audiences = [
    {
      icon: User,
      title: 'Individuals',
      description: 'Professionals seeking to develop skills and advance their careers through practical, engaging learning.',
    },
    {
      icon: Users,
      title: 'Trainers & Facilitators',
      description: 'Learning professionals who need high-quality resources and tools to deliver effective training programs.',
    },
    {
      icon: Briefcase,
      title: 'Managers & Leaders',
      description: 'Leaders looking to develop their teams and create a culture of continuous learning and performance.',
    },
    {
      icon: Lightbulb,
      title: 'Consultants',
      description: 'Consultants and coaches who want to enhance their service offerings with proven learning solutions.',
    },
    {
      icon: Building2,
      title: 'HR and L&D Teams',
      description: 'Human resources and learning & development professionals building organizational capability and culture.',
    },
    {
      icon: Users2,
      title: 'Organizations',
      description: 'Companies of all sizes seeking to improve performance, build capability, and support employee development.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lx-section-title">
            Built for Professionals, Teams, and Organizations
          </h2>
          <p className="lx-section-subtitle">
            Whether you're an individual professional or a large organization, LXOLOGY has solutions designed for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-white to-[#F5C2D9]/5 rounded-2xl border border-gray-200 hover:border-[#FD6A02]/30 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-[#FD6A02]/20 to-[#F5C2D9]/20 rounded-full">
                    <Icon className="w-6 h-6 text-[#FD6A02]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#26006B] mb-3">
                  {audience.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
