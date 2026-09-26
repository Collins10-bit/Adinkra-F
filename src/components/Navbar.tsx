import React, { useState, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'products', 'why-us', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Products', href: '#products', id: 'products' },
    { label: 'Why Choose Us', href: '#why-us', id: 'why-us' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#0738A6]/10 py-2.5'
          : 'bg-[#FFF8ED]/95 backdrop-blur-sm border-b border-[#0738A6]/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single Brand Lockup */}
          <a
            href="#home"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0738A6] rounded-md transition-opacity hover:opacity-95"
            aria-label="Adinkra Frontiers Ltd - Home"
          >
            <Logo />
          </a>

          {/* Zone 2: Navigation Links (Clean text links with subtle hover underlines) */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#0738A6] font-bold'
                      : 'text-[#172033] hover:text-[#0738A6]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F5A300] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Contact */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+233244902287"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#082B66] bg-white border border-[#0738A6]/20 rounded-lg hover:bg-[#FFF8ED] transition-colors whitespace-nowrap"
              aria-label="Call Adinkra Frontiers Ltd at +233244902287"
            >
              <Phone className="w-3.5 h-3.5 text-[#0738A6]" />
              <span>+233 24 490 2287</span>
            </a>

            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0738A6] hover:bg-[#082B66] active:scale-[0.98] rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOrderClick}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0738A6] rounded-md"
            >
              Order Now
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#082B66] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#0738A6]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#0738A6]/10 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-base font-semibold rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'text-[#0738A6] bg-[#FFF8ED] font-bold'
                    : 'text-[#172033] hover:text-[#0738A6] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="https://wa.me/233244902287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-bold text-white bg-[#25D366] rounded-lg shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+233244902287"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-bold text-[#082B66] bg-[#FFF8ED] border border-[#0738A6]/20 rounded-lg"
              >
                <Phone className="w-4 h-4 text-[#0738A6]" />
                <span>Call +233 24 490 2287</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
