import React, { useState } from 'react';
import { X, ZoomIn, Info, ChevronRight, Layers } from 'lucide-react';
import type { GalleryItem } from '../types.ts';

// High-fidelity agricultural imagery assets
import heroFarmImg from '../assets/images/hero_adinkra_farm_1790453050746.jpg';
import freshEggsImg from '../assets/images/fresh_table_eggs_1790453062937.jpg';
import poultryFlockImg from '../assets/images/poultry_farm_facility_1790453074148.jpg';
import packagedEggsImg from '../assets/images/packaged_eggs_stacked_1790453111581.jpg';
import farmOperationsImg from '../assets/images/poultry_farm_operations_1790453121790.jpg';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Clean Daily Egg Production',
    category: 'Egg Production',
    image: freshEggsImg,
    alt: 'Fresh table eggs collected daily at Adinkra Frontiers farm',
    description:
      'Carefully gathered, sorted, and inspected brown table eggs ready for consumer distribution.',
  },
  {
    id: 'gal-2',
    title: 'Healthy Layer Flock',
    category: 'Poultry Birds',
    image: poultryFlockImg,
    alt: 'Healthy poultry flock in ventilated agricultural housing',
    description:
      'Laying hens housed in a well-ventilated, biosecure, clean environment with fresh feeding and care.',
  },
  {
    id: 'gal-3',
    title: 'Commercial Egg Crates & Packaging',
    category: 'Packaged Eggs',
    image: packagedEggsImg,
    alt: 'Packaged table eggs stacked in crates for bulk supply',
    description:
      'Eco-friendly molded pulp egg trays and sturdy crates stacked for wholesale and retailer dispatch.',
  },
  {
    id: 'gal-4',
    title: 'Sanfo/Aduam Farm Facility',
    category: 'Farm Facilities',
    image: heroFarmImg,
    alt: 'Farm grounds and poultry infrastructure at Sanfo/Aduam',
    description:
      'Our farm compound located behind Manale Rest Stop, designed for strict bio-security and efficient workflow.',
  },
  {
    id: 'gal-5',
    title: 'Staff Inspection & Egg Handling',
    category: 'Staff & Operations',
    image: farmOperationsImg,
    alt: 'Farm operations staff handling eggs in clean protective gear',
    description:
      'Dedicated agricultural personnel following hygiene protocols, sorting, and packaging fresh produce.',
  },
];

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [showAdminGuide, setShowAdminGuide] = useState(false);

  const categories = [
    'All',
    'Egg Production',
    'Poultry Birds',
    'Packaged Eggs',
    'Farm Facilities',
    'Staff & Operations',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-[#FFF8ED]/40 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
            Visual Tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B66] mt-2 tracking-tight">
            Farm &amp; Production Gallery
          </h2>
          <p className="text-base sm:text-lg text-[#172033]/80 mt-3 leading-relaxed">
            Photographic documentation of our poultry flock, egg collection, hygienic packaging, and farm operations in Ghana.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0738A6] text-white shadow-sm'
                  : 'bg-white text-[#172033]/80 hover:text-[#0738A6] hover:bg-[#FFF8ED] border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div
                className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setActiveItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#082B66] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {item.category}
                </div>

                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#0738A6] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-[#082B66]">{item.title}</h3>
                <p className="text-xs text-[#172033]/75 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0738A6] font-semibold">
                  <span className="text-[11px] text-slate-500">Adinkra Frontiers Ltd</span>
                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>View photo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Administrator Guide Banner */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-5 border border-[#0738A6]/20 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FFF8ED] text-[#0738A6] flex items-center justify-center shrink-0 border border-[#F5A300]/30 mt-0.5">
                  <Info className="w-5 h-5 text-[#0738A6]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#082B66]">
                    Photo Replacement Guide for Site Administrator
                  </h4>
                  <p className="text-xs text-[#172033]/80 mt-1">
                    All images are modularly organized. You can drop original high-resolution company photographs directly into the assets folder to update this gallery anytime.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminGuide(!showAdminGuide)}
                className="text-xs font-bold text-[#0738A6] hover:text-[#082B66] px-3 py-1.5 rounded-md bg-[#FFF8ED] border border-[#0738A6]/15 shrink-0"
              >
                {showAdminGuide ? 'Hide Steps' : 'View Instructions'}
              </button>
            </div>

            {showAdminGuide && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-[#172033]/85 space-y-2">
                <p className="font-semibold text-[#082B66]">To update or add photos:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    Place your photo files in <code className="bg-slate-100 px-1 py-0.5 rounded text-[#0738A6]">public/images/gallery/</code> or <code className="bg-slate-100 px-1 py-0.5 rounded text-[#0738A6]">src/assets/images/</code>.
                  </li>
                  <li>
                    Open <code className="bg-slate-100 px-1 py-0.5 rounded text-[#0738A6]">src/components/Gallery.tsx</code>.
                  </li>
                  <li>
                    Edit the <code className="bg-slate-100 px-1 py-0.5 rounded text-[#0738A6]">galleryItems</code> array to set the title, category, image path, and description.
                  </li>
                  <li>
                    Categories supported: <em>Poultry Birds</em>, <em>Egg Production</em>, <em>Packaged Eggs</em>, <em>Farm Facilities</em>, <em>Staff &amp; Operations</em>.
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[65vh] bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="w-full h-auto max-h-[65vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#F5A300] bg-[#082B66] px-2.5 py-0.5 rounded">
                  {activeItem.category}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 font-medium">Adinkra Frontiers Ltd Farm</span>
              </div>
              <h3 className="text-xl font-bold text-[#082B66] mt-2">{activeItem.title}</h3>
              <p className="text-sm text-[#172033]/80 mt-1 leading-relaxed">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
