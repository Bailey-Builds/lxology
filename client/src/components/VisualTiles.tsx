export default function VisualTiles() {
  const tiles = [
    {
      emoji: '🛍️',
      title: 'Shop',
      description: 'Digital products',
      color: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      hoverColor: 'hover:shadow-orange-200/50',
      href: '#shop',
    },
    {
      emoji: '🎓',
      title: 'Programs',
      description: 'Complete learning solutions',
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:shadow-blue-200/50',
      href: '#programs',
    },
    {
      emoji: '🤝',
      title: 'Services',
      description: 'Customization and advisory',
      color: 'from-pink-50 to-pink-100',
      borderColor: 'border-pink-200',
      hoverColor: 'hover:shadow-pink-200/50',
      href: '#services',
    },
    {
      emoji: '📚',
      title: 'Resources',
      description: 'Thought leadership and lead generation',
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:shadow-purple-200/50',
      href: '#resources',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F5C2D9]/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26006B] mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-gray-600">
            Instead of scrolling, select the option that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, index) => (
            <a
              key={index}
              href={tile.href}
              className={`p-8 rounded-2xl bg-gradient-to-br ${tile.color} border-2 ${tile.borderColor} cursor-pointer transition-all duration-300 hover:shadow-2xl ${tile.hoverColor} group block`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {tile.emoji}
              </div>
              <h3 className="text-2xl font-bold text-[#26006B] mb-2">
                {tile.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {tile.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
