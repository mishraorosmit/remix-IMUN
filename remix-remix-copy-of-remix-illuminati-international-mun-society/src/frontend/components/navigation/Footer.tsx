import React from 'react';
import { playStampSound } from '../../utils/audio';
import { ArrowUp } from 'lucide-react';
import { PageId } from '../../types';
import { scrollToTop as performScrollToTop } from '../../utils/smoothScroll';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    performScrollToTop(false);
    playStampSound();
  };

  const handlePageClick = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="relative bg-[#0B192C] text-[#E6D5B8] border-t border-[#0B192C] pt-12 pb-8 px-4 select-none font-editorial">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-8 border-b border-[#E6D5B8]/15">
          {/* Col 1: Identity & Description */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3.5 cursor-pointer group select-none" onClick={() => handlePageClick('home')}>
              <div className="w-12 h-12 bg-[#F8F4E6] rounded-[2.88px] border border-[#E6D5B8]/60 overflow-hidden flex items-center justify-center p-1 group-hover:border-[#C5A059] transition-colors shrink-0">
                <picture>
                  <source srcSet="/illuminati-logo.webp" type="image/webp" />
                  <img 
                    src="/illuminati-logo.png" 
                    alt="Illuminati International MUN Society Crest" 
                    className="w-full h-full object-contain block aspect-square"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-canopee text-3xl text-[#E6D5B8] uppercase tracking-[-0.02em] leading-none group-hover:text-[#C5A059] transition-colors">
                  ILLUMINATI MUN SOCIETY
                </h3>
                <span className="text-[12px] font-editorial text-[#F8F4E6] tracking-wider block mt-0.5 font-light">
                  A student-driven global diplomacy platform
                </span>
              </div>
            </div>
            <p className="font-editorial text-[14px] text-[#F8F4E6] leading-relaxed max-w-md font-normal">
              Advancing Model United Nations, youth diplomacy, leadership, and multilateral consensus. Empowering over 750+ delegates in Odisha and mentoring 1,000+ students across global circuits.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="badge-new">
                ODISHA'S PREMIER MUN ECOSYSTEM
              </span>
              <span className="inline-block px-2 py-0.5 text-[10px] font-editorial uppercase rounded-[2.88px] bg-[#E6D5B8]/20 text-[#E6D5B8] border border-[#E6D5B8]/40">
                GLOBAL CIRCUIT ALLIANCE
              </span>
            </div>
          </div>

          {/* Col 2: Directory Links */}
          <div className="md:col-span-4 space-y-2 text-[14px] font-editorial">
            <div className="text-[#C5A059] font-semibold tracking-wider uppercase mb-2 text-xs">
              ★ DIRECTORY / PAGES:
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-[#F8F4E6] font-medium">
              <button
                onClick={() => handlePageClick('home')}
                className="text-left hover:text-[#E6D5B8] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                • Home
              </button>
              <button
                onClick={() => handlePageClick('founder')}
                className="text-left hover:text-[#E6D5B8] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                • Founder Dossier
              </button>
              <button
                onClick={() => handlePageClick('mentors')}
                className="text-left hover:text-[#E6D5B8] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                • Global Collab
              </button>
              <button
                onClick={() => handlePageClick('advisor')}
                className="text-left hover:text-[#E6D5B8] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                • Advisory Board
              </button>
              <button
                onClick={() => handlePageClick('gallery')}
                className="text-left hover:text-[#E6D5B8] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                • Photo Archive
              </button>
              <button
                onClick={() => handlePageClick('contacts')}
                className="text-left hover:text-[#E6D5B8] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                • Contacts
              </button>
            </div>
          </div>

          {/* Col 3: Office Stamp */}
          <div className="md:col-span-3 bg-[#F8F4E6] text-[#0B192C] p-5 rounded-[11.52px] border border-[#E6D5B8]/20 relative">
            <div className="text-[11px] font-editorial text-[#1E3A8A] uppercase border-b border-[#0B192C]/15 pb-1 mb-2 font-medium">
              Secretariat Attestation
            </div>
            <div className="font-canopee text-2xl uppercase text-[#0B192C] tracking-tight">
              Office of the Founder
            </div>
            <div className="text-[13px] font-editorial text-[#0B192C] my-1 italic">
              "Building consensus through multilateral scrutiny."
            </div>
            <div className="font-editorial text-[#C5A059] text-lg my-1 font-medium">
              Subhrakant Biswal
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-editorial text-[#F8F4E6]">
          <div className="flex items-center gap-4">
            <span>© 2026 ILLUMINATI MUN SOCIETY. ALL RIGHTS RESERVED.</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#E6D5B8] transition-colors uppercase cursor-pointer font-medium"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
