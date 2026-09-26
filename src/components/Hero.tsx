import React from 'react';
import { Logo } from './Logo.tsx';
import { MessageSquare, ArrowRight, Egg, ShieldCheck, Truck, MapPin } from 'lucide-react';
import heroImage from '../assets/images/hero_adinkra_farm_1790453050746.jpg';

interface HeroProps {
  onOrderEggsClick: () => void;
  onSendEnquiryClick: () => void;
  onSelectProduct: (productName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderEggsClick,
  onSendEnquiryClick,
  onSelectProduct,
}) => {
  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8ED] via-[#FFF8ED]/80 to-white -z-10" />
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#0738A6]/5 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-16 w-80 h-80 rounded-full bg-[#F5A300]/10 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand, Headlines, Narrative, and Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Location & Agri-Entity Kicker (Clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0738A6]">
              <MapPin className="w-3.5 h-3.5 text-[#F5A300]" />
              <span>Sanfo/Aduam, Behind Manale Rest Stop, Ghana</span>
            </div>

            {/* Official Logo Display */}
            <div className="inline-block py-1">
              <Logo className="scale-105 origin-left" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082B66] tracking-tight leading-[1.15] text-balance">
              Expanding the frontiers of{' '}
              <span className="text-[#0738A6] relative inline-block">
                poultry agribusiness
                <svg
                  className="absolute left-0 -bottom-1 w-full h-2 text-[#F5A300]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Slogan & Introduction Text */}
            <p className="text-base sm:text-lg text-[#172033]/85 leading-relaxed max-w-2xl font-normal">
              Adinkra Frontiers Ltd is a poultry agribusiness located at Sanfo/Aduam in Ghana. We focus on supplying fresh table eggs, quality poultry products and reliable farm supplies to households, retailers, institutions and business customers.
            </p>

            {/* Action Buttons: 3 key CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOrderEggsClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#0738A6] hover:bg-[#082B66] active:scale-[0.98] rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                <span>Order Fresh Eggs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onSendEnquiryClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-[#082B66] bg-white hover:bg-[#FFF8ED] border-2 border-[#0738A6]/25 rounded-xl transition-all whitespace-nowrap"
              >
                <span>Send an Enquiry</span>
              </button>

              <a
                href="https://wa.me/233244902287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap"
                aria-label="Chat with Adinkra Frontiers on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust Markers without fake metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#172033]/70 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0738A6]" />
                Sanfo/Aduam Farm Facility
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#F5A300]" />
                Household, Retail & Bulk Supply
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Egg className="w-4 h-4 text-[#0738A6]" />
                Daily Fresh Collection
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img
                src={heroImage}
                alt="Adinkra Frontiers Ltd poultry agribusiness and farm-fresh table eggs in Ghana"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082B66]/85 via-[#082B66]/30 to-transparent" />

              {/* In-Image Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#F5A300]">
                  Sanfo/Aduam Agribusiness
                </span>
                <p className="text-sm font-medium text-white/95 mt-0.5">
                  Consistent, dependable poultry agribusiness built on quality and hygiene.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Three Attractive Service Cards */}
        <div className="mt-14 pt-8 border-t border-[#0738A6]/10">
          <div className="text-center mb-6">
            <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
              Core Capabilities
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#082B66] mt-1">
              Our Core Products &amp; Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Fresh Table Eggs */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-[#0738A6]/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#FFF8ED] border border-[#F5A300]/30 flex items-center justify-center mb-4 text-[#0738A6]">
                  <Egg className="w-6 h-6 text-[#F5A300]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B66]">Fresh Table Eggs</h3>
                <p className="text-sm text-[#172033]/80 mt-2 leading-relaxed">
                  Clean, sorted and farm-fresh table eggs packaged for households, retailers, bakeries, restaurants, and hotels.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProduct('Egg Order')}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#0738A6] hover:text-[#082B66] group"
              >
                <span>Enquire about Fresh Eggs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: Quality Poultry Products */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-[#0738A6]/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#FFF8ED] border border-[#0738A6]/20 flex items-center justify-center mb-4 text-[#0738A6]">
                  <ShieldCheck className="w-6 h-6 text-[#0738A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B66]">Quality Poultry Products</h3>
                <p className="text-sm text-[#172033]/80 mt-2 leading-relaxed">
                  Farm-raised poultry products produced with rigorous bio-security, attentive flock care, and hygienic handling.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProduct('Poultry Products')}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#0738A6] hover:text-[#082B66] group"
              >
                <span>Enquire about Poultry</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: Consistent Farm Supply */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-[#0738A6]/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#FFF8ED] border border-[#0738A6]/20 flex items-center justify-center mb-4 text-[#0738A6]">
                  <Truck className="w-6 h-6 text-[#082B66]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B66]">Consistent Farm Supply</h3>
                <p className="text-sm text-[#172033]/80 mt-2 leading-relaxed">
                  Scheduled deliveries, standing commercial contracts, and dependable bulk volume fulfillment for businesses and institutions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProduct('Bulk Supply')}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#0738A6] hover:text-[#082B66] group"
              >
                <span>Request Supply Schedule</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
