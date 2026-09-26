import React from 'react';
import { Logo } from './Logo.tsx';
import { Phone, Mail, MapPin, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#082B66] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="white" showSlogan={false} />
            <p className="text-sm text-[#FFF8ED]/80 font-medium tracking-wide">
              Expanding the frontiers of poultry agribusiness
            </p>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Adinkra Frontiers Ltd supplies fresh table eggs, quality poultry products and reliable farm supplies from Sanfo/Aduam, Ghana to households, retailers, and commercial partners.
            </p>

            {/* Social Media Placeholders (as requested: placeholders, no invented usernames/links) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5A300] block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <span
                  title="Social Media Channels Coming Soon"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-default"
                  aria-label="Social media platform placeholder"
                >
                  <Globe className="w-4 h-4 text-[#F5A300]" />
                </span>
                <span
                  title="Social Media Channels Coming Soon"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-default"
                  aria-label="Social media share placeholder"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5A300]">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us &amp; Values
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Leadership &amp; Team
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products &amp; Farm Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Production Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact &amp; Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5A300]">
              Contact Details
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A300] shrink-0 mt-0.5" />
                <a href="tel:+233244902287" className="hover:text-white transition-colors">
                  +233 24 490 2287
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A300] shrink-0 mt-0.5" />
                <a href="mailto:info@adinkra.biz" className="hover:text-white transition-colors">
                  info@adinkra.biz
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A300] shrink-0 mt-0.5" />
                <span>Sanfo/Aduam, Behind Manale Rest Stop, Ghana</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/233244902287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5A300] hover:underline"
              >
                <span>WhatsApp: +233 24 490 2287 &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Automatic Year Update */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>
            &copy; {currentYear} Adinkra Frontiers Ltd. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Expanding the frontiers of poultry agribusiness · Sanfo/Aduam, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
};
