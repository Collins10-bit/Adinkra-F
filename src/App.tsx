import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutUs } from './components/AboutUs.tsx';
import { Products } from './components/Products.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { Gallery } from './components/Gallery.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { BackToTop } from './components/BackToTop.tsx';
import type { EnquiryType } from './types.ts';

export default function App() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryType>('Egg Order');

  const scrollToContact = (enquiryType?: EnquiryType) => {
    if (enquiryType) {
      setSelectedEnquiry(enquiryType);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8ED]/30 text-[#172033] selection:bg-[#F5A300]/30 selection:text-[#082B66]">
      {/* Fixed Navigation */}
      <Navbar onOrderClick={() => scrollToContact('Egg Order')} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOrderEggsClick={() => scrollToContact('Egg Order')}
          onSendEnquiryClick={() => scrollToContact('General Enquiry')}
          onSelectProduct={(productName) => {
            const mappedType: EnquiryType =
              productName === 'Poultry Products'
                ? 'Poultry Products'
                : productName === 'Bulk Supply'
                ? 'Bulk Supply'
                : 'Egg Order';
            scrollToContact(mappedType);
          }}
        />

        {/* About Us: Company Overview, Mission, Vision, Values */}
        <AboutUs />

        {/* Products and Services */}
        <Products onSelectProduct={(type) => scrollToContact(type)} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Gallery */}
        <Gallery />

        {/* Contact Page & Secure Form */}
        <ContactSection initialEnquiryType={selectedEnquiry} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
