export default function SocialProof() {
  const stats = [
    {
      number: '15+',
      label: 'Years of Experience',
    },
    {
      number: '50+',
      label: 'Industries Served',
    },
    {
      number: '200+',
      label: 'Programs Developed',
    },
    {
      number: '500+',
      label: 'Organizations Supported',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">
            Simple.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gradient-to-br from-[#F5C2D9]/10 to-[#FD6A02]/10 rounded-2xl border border-gray-200 hover:border-[#FD6A02]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#FD6A02] mb-3">
                {stat.number}
              </div>
              <p className="text-lg font-semibold text-[#26006B]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
