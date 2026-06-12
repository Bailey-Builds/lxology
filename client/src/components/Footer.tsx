export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#26006B] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FD6A02] to-[#F5C2D9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LX</span>
              </div>
              <span className="text-2xl font-bold">LXOLOGY</span>
            </div>
            <p className="text-gray-300 text-lg font-semibold">
              Elevate Learning. Enhance Experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-white">Offerings</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#products" className="text-gray-300 hover:text-[#FD6A02] transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-[#FD6A02] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#tools" className="text-gray-300 hover:text-[#FD6A02] transition-colors">
                    Tools
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-[#FD6A02] transition-colors">
                    About Lxology
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-[#FD6A02] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#FD6A02] transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} LXOLOGY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
