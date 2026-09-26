import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import freshEggsImg from '../assets/images/fresh_table_eggs_1790453062937.jpg';
import poultryProductsImg from '../assets/images/poultry_farm_facility_1790453074148.jpg';
import farmSupplyImg from '../assets/images/packaged_eggs_stacked_1790453111581.jpg';
import type { EnquiryType } from '../types.ts';

interface ProductsProps {
  onSelectProduct: (enquiryType: EnquiryType) => void;
}

export const Products: React.FC<ProductsProps> = ({ onSelectProduct }) => {
  const products = [
    {
      id: 'fresh-table-eggs',
      name: 'Fresh Table Eggs',
      image: freshEggsImg,
      alt: 'Clean fresh brown table eggs from Adinkra Frontiers Ltd in Ghana',
      description:
        'Clean, fresh table eggs collected daily under hygienic conditions. Carefully inspected and suitable for households, grocery retailers, supermarkets, restaurants, hotels, bakeries, and educational institutions.',
      features: [
        'Suitable for households, retailers, restaurants & hotels',
        'Daily morning and afternoon collection from our farm',
        'Clean shell sorting and hygienic packing',
        'Available in standard crates and cartons',
      ],
      buttonText: 'Enquire Now',
      enquiryType: 'Egg Order' as EnquiryType,
      highlight: true,
    },
    {
      id: 'quality-poultry-products',
      name: 'Quality Poultry Products',
      image: poultryProductsImg,
      alt: 'Poultry farm birds and products at Adinkra Frontiers Ltd',
      description:
        'A comprehensive poultry category managed with dedicated bio-security and professional husbandry. Adinkra Frontiers Ltd adheres to responsible poultry practices to supply healthy, quality products.',
      features: [
        'Raised in well-ventilated, biosecure poultry facilities',
        'Strict nutrition and flock management standards',
        'Professional veterinary and hygiene oversight',
        'Direct farm sourcing at Sanfo/Aduam',
      ],
      buttonText: 'Enquire Now',
      enquiryType: 'Poultry Products' as EnquiryType,
      highlight: false,
    },
    {
      id: 'consistent-farm-supply',
      name: 'Consistent Farm Supply',
      image: farmSupplyImg,
      alt: 'Consistent bulk farm supply crates of eggs and poultry products',
      description:
        'Customers can contact Adinkra Frontiers Ltd about regular, weekly, or bulk poultry-product and fresh table egg supply. We partner with commercial clients requiring dependable delivery and standing orders.',
      features: [
        'Reliable standing orders and scheduled dispatches',
        'Bulk wholesale orders for distributors and businesses',
        'Transparent communication and order tracking',
        'Dedicated customer assistance for commercial clients',
      ],
      buttonText: 'Request Supply',
      enquiryType: 'Bulk Supply' as EnquiryType,
      highlight: false,
    },
  ];

  return (
    <section id="products" className="py-20 bg-[#FFF8ED]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B66] mt-2 tracking-tight">
            Products &amp; Farm Services
          </h2>
          <p className="text-base sm:text-lg text-[#172033]/80 mt-3 leading-relaxed">
            Freshness, quality standards, and dependable agribusiness delivery from our farm at Sanfo/Aduam.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#082B66]/80 bg-white border border-[#0738A6]/15 px-3 py-1 rounded-md shadow-xs">
            <span>Prices are provided upon enquiry based on quantity and delivery schedule.</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                item.highlight
                  ? 'border-[#0738A6]/40 ring-2 ring-[#0738A6]/10'
                  : 'border-slate-200 hover:border-[#0738A6]/30'
              }`}
            >
              {/* Product Image */}
              <div>
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {item.highlight && (
                    <div className="absolute top-3 right-3 bg-[#F5A300] text-[#082B66] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#082B66]">{item.name}</h3>
                  <p className="text-sm text-[#172033]/80 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {item.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-[#172033]/90">
                        <Check className="w-4 h-4 text-[#0738A6] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectProduct(item.enquiryType)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    item.highlight
                      ? 'bg-[#0738A6] hover:bg-[#082B66] text-white shadow-sm'
                      : 'bg-[#FFF8ED] hover:bg-[#0738A6] text-[#082B66] hover:text-white border border-[#0738A6]/20'
                  }`}
                >
                  <span>{item.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
