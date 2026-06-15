import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToolsMsg, setShowToolsMsg] = useState(false);

  const handleToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToolsMsg(true);
    setTimeout(() => setShowToolsMsg(false), 3000);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/lx-logo.png"
            alt="Lxology logo"
            className="w-10 h-10 object-cover"
            style={{ borderRadius: '4px' }}
          />
          <span className="text-2xl font-bold text-[#26006b]">LXOLOGY</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 relative">
          <a href="/" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">Home</a>
          <a href="/#products" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">Products</a>
          <a href="/services" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">Services</a>
          <button
            onClick={handleToolsClick}
            className="text-gray-400 font-medium cursor-pointer transition-colors duration-200 hover:text-gray-500"
          >
            Tools
          </button>
          <a href="/about" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">About Lxology</a>
          <a href="/contact#topic-request" className="text-gray-700 hover:text-[#FD6A02] transition-colors duration-200 font-medium">Contact</a>

          {/* Tooltip */}
          {showToolsMsg && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-10 bg-gray-100 text-gray-500 text-xs px-3 py-1.5 shadow-sm whitespace-nowrap border border-gray-200"
              style={{ borderRadius: '4px' }}
            >
              Timeline Estimator Beta — Coming Soon
            </div>
          )}
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
          <nav className="max-w-6xl mx-auto px-8 flex flex-col gap-4">
            <a href="/" className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium" onClick={() => setIsOpen(false)}>Home</a>
            <a href="/#products" className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium" onClick={() => setIsOpen(false)}>Products</a>
            <a href="/services" className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium" onClick={() => setIsOpen(false)}>Services</a>
            <button
              onClick={(e) => { handleToolsClick(e); setIsOpen(false); }}
              className="text-gray-400 font-medium text-left py-2"
            >
              Tools
            </button>
            <a href="/about" className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium" onClick={() => setIsOpen(false)}>About Lxology</a>
            <a href="/contact#topic-request" className="text-gray-700 hover:text-[#FD6A02] transition-colors py-2 font-medium" onClick={() => setIsOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
