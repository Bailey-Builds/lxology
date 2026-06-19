export default function Footer({ minimal = false }: { minimal?: boolean }) {
  const currentYear = new Date().getFullYear();

  if (minimal) {
    return (
      <footer style={{ backgroundColor: '#26006B' }} className="text-white py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} LXOLOGY. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ backgroundColor: '#26006B' }} className="text-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/lx-logo.png"
                alt="Lxology logo"
                className="w-9 h-9 object-cover flex-shrink-0"
                style={{ borderRadius: '4px' }}
              />
              <span className="text-xl font-bold">LXOLOGY</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Elevate Learning. Enhance Experiences.
            </p>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wide">Offerings</h4>
            <ul className="space-y-2">
              {[
                { label: 'Products', href: '/#products' },
                { label: 'Services', href: '/services' },
                { label: 'Tools', href: '/#tools' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-[#FD6A02] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Lxology', href: '/about' },
                { label: 'Contact', href: '/contact#topic-request' },
                { label: 'Privacy', href: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-[#FD6A02] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} LXOLOGY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
