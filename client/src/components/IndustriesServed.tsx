const industries = [
  'Financial Services',
  'Healthcare',
  'Technology',
  'Utilities',
  'Manufacturing',
  'Professional Services',
  'Government',
];

export default function IndustriesServed() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">Industries Served</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="px-8 py-4 bg-gradient-to-br from-[#26006B]/5 to-[#FD6A02]/5 rounded-2xl border border-gray-200 hover:border-[#FD6A02]/40 hover:shadow-md transition-all duration-300"
            >
              <span className="font-semibold text-[#26006B] text-lg">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
