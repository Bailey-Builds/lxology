import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const shopCategories = {
    'Professional Development': [
      'Communication',
      'Leadership',
      'Workplace Culture',
      'Productivity',
      'Business Skills',
    ],
    'Learning & Development': [
      'Instructional Design',
      'Facilitation',
      'Learning Strategy',
      'Learning Measurement',
      'Accessibility',
      'Visual Learning Products',
    ],
    'Featured Topics': [
      'Leadership',
      'Workplace Culture',
      'Cybersecurity',
      'Women in Business',
      'Business Fundamentals',
      'Books',
    ],
    'Bundles': [],
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#26006B] to-[#FD6A02] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">LX</span>
          </div>
          <span className="text-2xl font-bold text-[#26006B] hidden sm:inline">LXOLOGY</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#home" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">
            Home
          </a>

          {/* Shop Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium flex items-center gap-1">
              Shop
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 mt-0 w-96 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(shopCategories).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-bold text-[#26006B] mb-3 text-sm">{category}</h4>
                    {items.length > 0 && (
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item}>
                            <a href="#" className="text-sm text-gray-600 hover:text-[#FD6A02] transition-colors">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a href="#programs" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">
            Programs
          </a>
          <a href="#services" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">
            Services
          </a>
          <a href="#resources" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">
            Resources
          </a>
          <a href="#about" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4">
          <nav className="container mx-auto px-4 flex flex-col gap-4">
            <a
              href="#home"
              className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>

            {/* Mobile Shop Dropdown */}
            <div>
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium w-full text-left flex items-center justify-between"
              >
                Shop
                <ChevronDown size={16} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <div className="pl-4 mt-2 space-y-3 border-l-2 border-[#FD6A02]">
                  {Object.entries(shopCategories).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-bold text-[#26006B] text-sm mb-2">{category}</h4>
                      {items.length > 0 && (
                        <ul className="space-y-1">
                          {items.map((item) => (
                            <li key={item}>
                              <a href="#" className="text-sm text-gray-600 hover:text-[#FD6A02] transition-colors">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#programs"
              className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programs
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#resources"
              className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
