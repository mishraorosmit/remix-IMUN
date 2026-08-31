import React, { useState } from 'react';
import { GALLERY_ARCHIVES, GalleryItem } from '../../data/leadershipData';
import { playTypewriterSound } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';
import { 
  Image as ImageIcon, MapPin, Calendar, Users, 
  Filter
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({});

  const categories = ['ALL', 'All Conferences', 'Guest Talks', 'Live Proceedings', 'Executive Sessions'];

  const filteredItems = selectedCategory === 'ALL'
    ? GALLERY_ARCHIVES
    : GALLERY_ARCHIVES.filter((item) => item.category === selectedCategory);

  const handleImageError = (id: string) => {
    setFailedImageIds((prev) => ({ ...prev, [id]: true }));
  };

  const getImageSrc = (item: GalleryItem) => {
    if (failedImageIds[item.id] && item.fallbackUrl) {
      return item.fallbackUrl;
    }
    return item.imageUrl;
  };

  return (
    <section id="panel-gallery" className="scroll-mt-24 space-y-6 overflow-x-clip">
      {/* Filter Tabs */}
      <ScrollReveal direction="right" distance={70} duration={0.8}>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1 text-xs font-mono-tag font-black text-[#0B192C] pr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>CLASSIFICATION FILTER:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playTypewriterSound();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-2 text-xs font-mono-tag font-black uppercase transition-all flex-shrink-0 border-2 border-[#0B192C] cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B192C] text-[#F8F4E6] hard-stamp shadow-[3px_3px_0px_#C5A059]'
                    : 'bg-[#F8F4E6] text-[#0B192C] hover:bg-[#F8F4E6]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => {
          const imgSrc = getImageSrc(item);
          return (
            <ScrollReveal 
              key={item.id}
              direction="alternate"
              index={idx}
              distance={70}
              duration={0.75}
              className="h-full"
            >
              <div
                className="comic-panel bg-[#F8F4E6] border-3 border-[#0B192C] overflow-hidden group transition-all flex flex-col justify-between h-full hard-stamp relative"
              >
                {/* Image Container with Stamp Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B192C] border-b-2 border-[#0B192C]">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-transparent to-[#0B192C]/40" />

                  {/* Tag Badge Top Left */}
                  <div className="absolute top-3 left-3 bg-[#0B192C] text-[#F8F4E6] px-2.5 py-1 text-[10px] font-mono-tag font-black border border-[#F8F4E6]/40 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#C5A059] inline-block animate-pulse" />
                    {item.tag}
                  </div>

                  {/* Dossier Code Top Right */}
                  <div className="absolute top-3 right-3 bg-[#C5A059] text-[#F8F4E6] px-2 py-0.5 text-[9px] font-mono-tag font-black uppercase border border-[#0B192C]">
                    {item.dossierRef}
                  </div>

                  {/* Bottom bar overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tag font-bold text-[#F8F4E6]">
                    <span className="flex items-center gap-1.5 bg-[#0B192C]/80 px-2 py-0.5 border border-[#F8F4E6]/20">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#0B192C]/80 px-2 py-0.5 border border-[#F8F4E6]/20">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono-tag font-black text-[#C5A059] uppercase">
                      <span>CATEGORY: {item.category}</span>
                      {item.dimensions && <span className="text-[#1E3A8A]">{item.dimensions}</span>}
                    </div>

                    <h4 className="font-display font-black text-lg sm:text-xl text-[#0B192C] leading-tight">
                      {item.title}
                    </h4>

                    <p className="text-xs font-sans text-[#0B192C] leading-relaxed">
                      {item.caption}
                    </p>

                    {/* Highlights bullet chips */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.highlights.map((hl, hIdx) => (
                          <span 
                            key={hIdx} 
                            className="bg-[#F8F4E6] text-[#0B192C] px-2 py-0.5 text-[10px] font-mono-tag font-bold border border-[#0B192C]/30"
                          >
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t-2 border-[#0B192C] flex items-center justify-between text-[11px] font-mono-tag text-[#0B192C] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                      {item.attendees}
                    </span>
                    <span className="text-[#C5A059] font-black text-[10px] font-mono-tag uppercase">
                      ARCHIVE RECORD
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default GallerySection;
