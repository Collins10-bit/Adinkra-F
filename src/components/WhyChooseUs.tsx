import React from 'react';
import { Headphones, Sparkles, Award, PhoneCall, Users, Shield } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Headphones,
      title: 'Reliable Customer Service',
      description:
        'Direct and responsive communication for inquiries, quotes, order updates, and delivery confirmations via phone, email, and WhatsApp.',
    },
    {
      icon: Sparkles,
      title: 'Fresh Poultry Products',
      description:
        'Daily collection of table eggs and carefully managed farm products to ensure freshness, clean presentation, and culinary quality.',
    },
    {
      icon: Award,
      title: 'Professional Farm Management',
      description:
        'Strict hygiene routines, biosecure bird housing, proper feeding nutrition, and disciplined operational protocols on our farm.',
    },
    {
      icon: PhoneCall,
      title: 'Convenient Ordering & Enquiries',
      description:
        'Straightforward enquiry options through our website contact form, direct telephone line, or rapid WhatsApp messaging.',
    },
    {
      icon: Users,
      title: 'Support for Regular & Bulk Customers',
      description:
        'Customized supply schedules for recurring household orders, retailers, hotels, restaurants, bakeries, and educational institutions.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
            Our Commitment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B66] mt-2 tracking-tight">
            Why Choose Adinkra Frontiers Ltd
          </h2>
          <p className="text-base sm:text-lg text-[#172033]/80 mt-3 leading-relaxed">
            We build relationships on transparency, dependability, and authentic agribusiness professionalism.
          </p>
        </div>

        {/* 5 Points Grid with Asymmetric Visual Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="bg-[#FFF8ED]/40 rounded-2xl p-7 border border-[#0738A6]/10 hover:border-[#0738A6]/30 hover:bg-[#FFF8ED]/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0738A6]/20 flex items-center justify-center text-[#0738A6] mb-5 shadow-xs">
                    <Icon className="w-6 h-6 text-[#0738A6]" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-[#F5A300]">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-[#082B66]">{pt.title}</h3>
                  </div>
                  <p className="text-sm text-[#172033]/80 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Anchor Box: Farm Location Summary */}
          <div className="bg-[#0738A6] text-white rounded-2xl p-7 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F5A300] mb-5">
                <Shield className="w-6 h-6 text-[#F5A300]" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct Farm Source</h3>
              <p className="text-sm text-white/85 mt-2 leading-relaxed">
                Operating directly from Sanfo/Aduam, behind Manale Rest Stop, Ghana. Connecting you straight to fresh agribusiness supplies.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/15">
              <a
                href="#contact"
                className="inline-flex items-center text-xs font-bold text-[#F5A300] hover:text-white transition-colors"
              >
                <span>Connect With Our Team &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
