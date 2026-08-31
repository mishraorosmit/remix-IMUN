import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollReveal } from '../ui/ScrollReveal';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Pause, 
  Play, 
  RotateCcw, 
  ExternalLink, 
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  School
} from 'lucide-react';

export interface PartnerSchool {
  id: string;
  name: string;
  shortName: string;
  munName: string;
  location: string;
  logo: string;
  badge: string;
  role: string;
  description: string;
  highlights: string[];
  refCode: string;
}

export const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    id: 'odm-mun',
    name: 'ODM Public School',
    shortName: 'ODM PUBLIC SCHOOL',
    munName: 'ODMMUN',
    location: 'Bhubaneswar, Odisha',
    logo: '/collaborations/ODMMUN - ODM PUBLIC SCHOOL.webp',
    badge: 'FLAGSHIP PARTNERSHIP',
    role: 'Institutional Collaboration & Delegate Mentorship',
    description: 'Premier academic collaboration supporting committee development, crisis simulations, and high-impact delegate training across Odisha.',
    highlights: ['Executive Board Direction', 'Delegate Bootcamps', 'Crisis Simulation Architecture'],
    refCode: 'ALLIANCE // ODM-BBSR',
  },
  {
    id: 'fbs-mun',
    name: 'Future Bhubaneswar School',
    shortName: 'FUTURE BHUBANESWAR SCHOOL',
    munName: 'FBS MUN',
    location: 'Bhubaneswar, Odisha',
    logo: '/collaborations/FBS MUN (Future bhubnaeswar school).webp',
    badge: 'ACADEMIC ALLIANCE',
    role: 'Inter-School Debating & Youth Assembly Platform',
    description: 'Strategic partnership fostering grassroots oratory, multilateral diplomacy, and youth leadership training for middle and high school scholars.',
    highlights: ['Rules of Procedure Mastery', 'Youth Leadership Forums', 'Advisory Guidance'],
    refCode: 'ALLIANCE // FBS-BBSR',
  },
  {
    id: 'sx-mun',
    name: "St. Xavier's High School",
    shortName: "ST. XAVIER'S HIGH SCHOOL",
    munName: 'SXMUN',
    location: 'Barabati, Cuttack, Odisha',
    logo: '/collaborations/SXMUN - BARABATI CUTTACK.webp',
    badge: 'REGIONAL CHAPTER',
    role: 'Regional Model UN Convocation & Training Hub',
    description: 'Dynamic institutional engagement empowering hundreds of delegates across Cuttack with specialized oratory and diplomacy modules.',
    highlights: ['Statewide Delegate Outreach', 'Resolution Drafting Labs', 'EB Benchmarking'],
    refCode: 'ALLIANCE // SX-CTC',
  },
  {
    id: 'mps-mun',
    name: 'Modern Public School',
    shortName: 'MODERN PUBLIC SCHOOL',
    munName: 'MPS MUN',
    location: 'Balasore, Odisha',
    logo: '/collaborations/MODERN PUBLIC SCHOOL - MPS MUN.webp',
    badge: 'MENTORSHIP WING',
    role: 'Grassroots Model UN Society & Secretariat Incubation',
    description: 'Comprehensive MUN ecosystem development, secretariat training, and conference execution support established at Balasore.',
    highlights: ['Secretariat Incubation', 'Conference Setup Guidance', 'Speaker Training Clinics'],
    refCode: 'ALLIANCE // MPS-BLS',
  },
];

interface PartnerCarouselProps {
  onPartnerSelect?: (partner: PartnerSchool) => void;
  onBookDesk?: () => void;
}

export const PartnerCarousel: React.FC<PartnerCarouselProps> = ({ onPartnerSelect, onBookDesk }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedPartner, setSelectedPartner] = useState<PartnerSchool | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Duplicate items 4 times to ensure seamless infinite looping on any screen width
  const carouselItems = [...PARTNER_SCHOOLS, ...PARTNER_SCHOOLS, ...PARTNER_SCHOOLS, ...PARTNER_SCHOOLS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate width of one full set of partners
    const singleSetWidth = track.scrollWidth / 4;

    // Set initial position
    gsap.set(track, { x: 0 });

    // Create infinite seamless GSAP horizontal scrolling animation
    const baseDuration = 32 / speed;

    tweenRef.current = gsap.to(track, {
      x: -singleSetWidth,
      duration: baseDuration,
      ease: 'none',
      repeat: -1,
      force3D: true,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % singleSetWidth;
        }),
      },
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [speed]);

  // Pause / Resume on Play State change
  useEffect(() => {
    if (!tweenRef.current) return;
    if (isPlaying) {
      tweenRef.current.play();
    } else {
      tweenRef.current.pause();
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (tweenRef.current && isPlaying) {
      gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current && isPlaying) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    playTypewriterSound();
  };

  const toggleSpeed = () => {
    setSpeed((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 0.6 : 1));
    playTypewriterSound();
  };

  const handlePartnerClick = (partner: PartnerSchool) => {
    setSelectedPartner(partner);
    playStampSound();
    if (onPartnerSelect) {
      onPartnerSelect(partner);
    }
  };

  return (
    <section id="panel-partner-carousel" className="relative my-10 select-none overflow-x-clip">
      {/* Top Section Header with Section Divider */}
      <ScrollReveal direction="left" distance={80} duration={0.8}>
        <div className="border-b border-[#0B192C] pb-4 mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono-tag font-bold uppercase tracking-widest mb-1">
              <span>★</span>
              <span>SECTION 02 // INSTITUTIONAL ALLIANCES</span>
            </div>
            <h2 className="font-canopee text-3xl sm:text-5xl md:text-6xl text-[#0B192C] leading-tight tracking-[-0.03em] uppercase m-0">
              Institutional Partners & Collaborating Schools
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 border border-[#0B192C] rounded-[3px] bg-[#F8F4E6] hover:bg-[#E6D5B8] text-[#0B192C] text-xs font-mono-tag font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title={isPlaying ? 'Pause Marquee' : 'Play Marquee'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#16A34A]" />}
              <span className="hidden sm:inline">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            <span className="badge-new">4+ PARTNER SCHOOLS</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Continuous GSAP Scrolling Marquee Container */}
      <div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden border border-[#0B192C]/20 bg-[#F8F4E6]/40 p-4 py-6 rounded-[11.52px]"
      >
        {/* Left & Right Subtle Paper Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F8F4E6] via-[#F8F4E6]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F8F4E6] via-[#F8F4E6]/80 to-transparent pointer-events-none z-10" />

        {/* Scrolling Inner Track */}
        <div 
          ref={trackRef}
          className="flex items-stretch gap-5 whitespace-nowrap will-change-transform"
        >
          {carouselItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              onClick={() => handlePartnerClick(partner)}
              className="inline-flex flex-col justify-between w-[280px] sm:w-[320px] bg-[#FFFFFF] text-[#0B192C] border border-[#0B192C]/20 p-4 rounded-[8px] transition-all duration-300 group cursor-pointer shrink-0 hover:border-[#0B192C] hover:shadow-lg relative"
            >
              {/* Top Reference Code & Badge */}
              <div className="flex items-center justify-between border-b border-[#0B192C]/10 pb-2 mb-3">
                <span className="text-[11px] font-ubuntu text-[#D97706] font-bold tracking-wide">
                  {partner.refCode}
                </span>
                <span className="badge-new">
                  {partner.badge}
                </span>
              </div>

              {/* High-Resolution Logo Frame */}
              <div className="bg-[#F8F4E6]/50 p-3 border border-[#0B192C]/10 flex items-center justify-center h-28 w-full mb-3 rounded-[4px] overflow-hidden relative">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                />
              </div>

              {/* Title & Organization Name */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-unbounded font-bold text-[#D97706]">
                    [{partner.munName}]
                  </span>
                  <span className="text-[12px] font-ubuntu text-[#1E3A8A] flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3" />
                    {partner.location}
                  </span>
                </div>

                <h4 className="font-ubuntu text-[16px] font-bold text-[#0B192C] truncate leading-snug">
                  {partner.name}
                </h4>

                <p className="text-[13px] font-eb-garamond text-[#1E3A8A] line-clamp-2 leading-relaxed whitespace-normal font-normal">
                  {partner.description}
                </p>
              </div>

              {/* Bottom Tags / Highlights */}
              <div className="mt-3 pt-2.5 border-t border-[#0B192C]/10 flex items-center justify-between text-[12px] font-ubuntu">
                <span className="text-[#1E3A8A] font-medium">Verified Chapter</span>
                <span className="text-[#D97706] font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Dossier ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Partner Detailed Dossier Modal / Drawer */}
      {selectedPartner && (
        <div className="mt-6 broadsheet-card p-6 animate-fadeIn">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#0B192C]/20 pb-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white p-2 border border-[#0B192C]/20 shrink-0 flex items-center justify-center rounded-[0px]">
                <img
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge-new">{selectedPartner.badge}</span>
                  <span className="text-[13px] font-editorial text-[#1E3A8A]">{selectedPartner.refCode}</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#0B192C] font-light mt-0.5">
                  {selectedPartner.name} ({selectedPartner.munName})
                </h3>
                <p className="text-[13px] font-editorial text-[#C5A059] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {selectedPartner.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPartner(null)}
              className="px-3 py-1 text-[13px] font-editorial bg-[#E6D5B8] hover:bg-[#0B192C] hover:text-[#E6D5B8] border border-[#0B192C]/20 rounded-[2.88px] transition-colors cursor-pointer"
            >
              ✕ Close Inspection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-[#E6D5B8] p-4 border border-[#0B192C]/15 rounded-[2.88px]">
                <h5 className="font-editorial text-[15px] font-medium text-[#0B192C] mb-1.5">
                  Collaboration Scope & Engagement
                </h5>
                <p className="text-[14px] font-editorial text-[#0B192C] leading-relaxed">
                  {selectedPartner.description}
                </p>
              </div>

              <div className="bg-[#E6D5B8] p-4 border border-[#0B192C]/15 rounded-[2.88px]">
                <h5 className="font-editorial text-[15px] font-medium text-[#0B192C] mb-2">
                  Key Alliance Highlights
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedPartner.highlights.map((item, idx) => (
                    <div key={idx} className="bg-[#F8F4E6]/60 p-2.5 border border-[#0B192C]/10 rounded-[2.88px] text-[13px] font-editorial text-[#0B192C] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#E6D5B8] p-5 border border-[#0B192C]/15 rounded-[2.88px] flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider block">Status:</span>
                <span className="text-[16px] font-editorial font-medium text-[#0B192C] flex items-center gap-1.5 mt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Active Diplomatic Alliance
                </span>
                <p className="text-[13px] font-editorial text-[#1E3A8A] mt-2 leading-relaxed">
                  Interested in organizing an official Model UN conference or mentorship session at your institution?
                </p>
              </div>

              {onBookDesk && (
                <button
                  onClick={() => {
                    playStampSound();
                    onBookDesk();
                  }}
                  className="w-full btn-broadsheet-primary py-2.5 text-[14px] flex items-center justify-center gap-2 font-normal cursor-pointer"
                >
                  <School className="w-4 h-4 text-[#E6D5B8]" />
                  <span>Request MUN at School</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Educational Alliance Summary Cards */}
      <ScrollReveal direction="left" distance={70} duration={0.75}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="broadsheet-card p-4">
            <span className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider block">Total Students Mentored</span>
            <strong className="text-[#0B192C] font-editorial text-[17px] font-medium block mt-1">1,000+ Aspiring Diplomats</strong>
          </div>
          <div className="broadsheet-card p-4">
            <span className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider block">Alliance Network</span>
            <strong className="text-[#C5A059] font-editorial text-[17px] font-medium block mt-1">Statewide & International Chapters</strong>
          </div>
          <div className="broadsheet-card p-4">
            <span className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider block">Collaboration Inquiries</span>
            <strong className="text-[#0B192C] font-editorial text-[17px] font-medium block mt-1">Subhrakantbiswal2003@gmail.com</strong>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
