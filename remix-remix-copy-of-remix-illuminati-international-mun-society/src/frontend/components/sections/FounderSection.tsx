import React, { useState, useEffect } from 'react';
import { FOUNDER_DOSSIER } from '../../data/leadershipData';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';
import { 
  Award, Globe, Shield, Sparkles, BookOpen, Quote, ChevronRight, 
  CheckCircle2, Star, Building, Maximize2, X, Camera, Eye, UserCheck, RefreshCw, Calendar
} from 'lucide-react';

interface FounderSectionProps {
  onOpenRegister?: () => void;
  onBookSession?: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenRegister, onBookSession }) => {
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [lightboxLoaded, setLightboxLoaded] = useState<boolean>(false);
  const [activePhotoSrc, setActivePhotoSrc] = useState<string>(FOUNDER_DOSSIER.photoUrl);
  const [hasError, setHasError] = useState<boolean>(false);

  // Preload and verify image on component mount for instant smooth reveal
  useEffect(() => {
    let isMounted = true;

    const testImg = new Image();
    testImg.src = FOUNDER_DOSSIER.photoUrl;

    testImg.onload = () => {
      if (isMounted) {
        setActivePhotoSrc(FOUNDER_DOSSIER.photoUrl);
        setImgLoaded(true);
      }
    };

    testImg.onerror = () => {
      // Try fallback PNG image
      const fallbackImg = new Image();
      fallbackImg.src = FOUNDER_DOSSIER.fallbackPhotoUrl;

      fallbackImg.onload = () => {
        if (isMounted) {
          setActivePhotoSrc(FOUNDER_DOSSIER.fallbackPhotoUrl);
          setImgLoaded(true);
        }
      };

      fallbackImg.onerror = () => {
        // Try original source file
        const origImg = new Image();
        origImg.src = FOUNDER_DOSSIER.originalPhotoUrl;

        origImg.onload = () => {
          if (isMounted) {
            setActivePhotoSrc(FOUNDER_DOSSIER.originalPhotoUrl);
            setImgLoaded(true);
          }
        };

        origImg.onerror = () => {
          // Ultimate safe vector fallback
          if (isMounted) {
            setActivePhotoSrc(FOUNDER_DOSSIER.vectorFallbackUrl);
            setHasError(true);
            setImgLoaded(true);
          }
        };
      };
    };

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="panel-founder" className="scroll-mt-24 space-y-8 overflow-x-clip">
      {/* Top Banner: Governor Award & Key Title Highlights */}
      <ScrollReveal direction="right" distance={80} duration={0.85}>
        <div className="comic-panel p-4 bg-[#0B192C] text-[#F8F4E6] border-3 border-[#0B192C] flex flex-col md:flex-row md:items-center justify-between gap-4 hard-stamp">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#C5A059] text-[#F8F4E6] flex items-center justify-center border-2 border-[#F8F4E6] hard-stamp flex-shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono-tag font-black text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#C5A059]" />
                {FOUNDER_DOSSIER.honor}
              </div>
              <div className="font-display font-black text-base sm:text-lg tracking-wide text-[#F8F4E6]">
                {FOUNDER_DOSSIER.name} — {FOUNDER_DOSSIER.societyRole}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono-tag text-[11px] font-black">
            <span className="px-3 py-1 bg-[#0B192C] border-2 border-[#F8F4E6]/40 text-[#F8F4E6]">
              7 YEARS IN MUN CIRCUIT
            </span>
            <span className="px-3 py-1 bg-[#C5A059] text-[#F8F4E6] border-2 border-[#0B192C] shadow-[2px_2px_0px_#F8F4E6]">
              60+ CONFERENCES ATTENDED
            </span>
            <span className="px-3 py-1 bg-[#0B192C] border-2 border-[#F8F4E6]/40 text-[#F8F4E6]">
              1,000+ MENTORED
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Official Founder Portrait & Credentials Card */}
        <ScrollReveal direction="left" distance={90} duration={0.85} className="lg:col-span-5">
          <div className="comic-panel p-6 bg-[#F8F4E6] space-y-6 relative overflow-hidden">
            {/* Official Portrait Section */}
            <div className="space-y-3">
              {/* Photo Container */}
              <div className="relative group border-2 border-[#0B192C] bg-[#0B192C] p-1 shadow-md">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0B192C] flex items-center justify-center">
                  {/* Portrait Image with Smooth Fade & Scale Reveal */}
                  <picture className="w-full h-full">
                    <source srcSet="/founder-portrait-opt.webp" type="image/webp" />
                    <source srcSet="/founder-portrait.png" type="image/png" />
                    <img
                      src={activePhotoSrc}
                      alt="Subhrakant Biswal - Founder of Illuminati MUN Society"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="async"
                      onLoad={() => setImgLoaded(true)}
                      onError={() => {
                        // Graceful fallback cascade
                        if (activePhotoSrc === FOUNDER_DOSSIER.photoUrl) {
                          setActivePhotoSrc(FOUNDER_DOSSIER.fallbackPhotoUrl);
                        } else if (activePhotoSrc === FOUNDER_DOSSIER.fallbackPhotoUrl) {
                          setActivePhotoSrc(FOUNDER_DOSSIER.originalPhotoUrl);
                        } else {
                          setActivePhotoSrc(FOUNDER_DOSSIER.vectorFallbackUrl);
                        }
                        setImgLoaded(true);
                        setHasError(true);
                      }}
                      className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                        imgLoaded ? 'opacity-100 filter-none' : 'opacity-0 blur-xs'
                      }`}
                    />
                  </picture>

                  {/* Watermark Label */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono-tag text-[#F8F4E6] bg-[#0B192C]/90 px-2.5 py-1.5 border border-[#F8F4E6]/30 z-15 backdrop-blur-xs">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="font-black tracking-wide">SUBHRAKANT BISWAL</span>
                    </div>
                    <span className="text-[#C5A059] font-black text-[9px] bg-[#000]/60 px-1.5 py-0.5 border border-[#C5A059]/40">
                      2023 GOVERNOR AWARDEE
                    </span>
                  </div>

                  {/* Inspect Zoom Button */}
                  <button
                    onClick={() => {
                      playTypewriterSound();
                      setIsPhotoLightboxOpen(true);
                    }}
                    className="absolute top-2 right-2 bg-[#0B192C]/85 hover:bg-[#C5A059] text-[#F8F4E6] p-2 border border-[#F8F4E6]/40 transition-colors opacity-90 group-hover:opacity-100 cursor-pointer z-15 shadow-md"
                    title="Inspect Full Resolution Portrait"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Founder Identity Titles */}
            <div className="border-t border-[#0B192C]/30 pt-3">
              <div className="text-[10px] font-mono-tag font-bold text-[#C5A059] tracking-widest uppercase">
                {FOUNDER_DOSSIER.societyRole}
              </div>
              <h3 className="font-display font-black text-2xl text-[#0B192C] tracking-tight">
                {FOUNDER_DOSSIER.name}
              </h3>
              <p className="text-xs font-mono-tag text-[#1E3A8A] mt-0.5">
                {FOUNDER_DOSSIER.title}
              </p>
              <div className="mt-2 inline-block bg-[#0B192C] text-[#F8F4E6] px-2 py-0.5 text-[9px] font-mono-tag font-bold">
                CIRCUIT: {FOUNDER_DOSSIER.tenure}
              </div>
            </div>

            {/* Core Metric Highlights */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {FOUNDER_DOSSIER.stats.map((stat, idx) => (
                <div key={idx} className="bg-[#F8F4E6] p-3 border-2 border-[#0B192C] hard-stamp">
                  <div className="text-xs font-mono-tag font-bold text-[#C5A059]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono-tag text-[#1E3A8A] uppercase mt-0.5 leading-tight font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Founder Quote Card */}
            <div className="p-4 bg-[#F8F4E6] border-l-4 border-[#C5A059] border-2 border-[#0B192C] relative">
              <Quote className="w-5 h-5 text-[#C5A059] opacity-40 absolute top-2 right-2" />
              <div className="text-[10px] font-mono-tag text-[#C5A059] font-bold uppercase mb-1">FOUNDER'S VISION</div>
              <p className="font-editorial-italic text-[15px] sm:text-[17px] text-[#0B192C] leading-relaxed pr-4">
                "{FOUNDER_DOSSIER.quote}"
              </p>
            </div>

            {/* Key Leadership Roles Overview */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono-tag font-bold text-[#0B192C] uppercase border-b border-[#0B192C]/30 pb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#C5A059]" />
                LEADERSHIP & ADVISORY PORTFOLIO
              </div>
              <div className="space-y-2 text-xs">
                {FOUNDER_DOSSIER.keyLeadershipRoles.map((item, idx) => (
                  <div key={idx} className="bg-[#F8F4E6] p-2.5 border border-[#0B192C]">
                    <div className="font-mono-tag font-bold text-[#0B192C] flex items-center justify-between">
                      <span>{item.role}</span>
                      <span className="text-[10px] text-[#C5A059] font-semibold">{item.body}</span>
                    </div>
                    <p className="text-[11px] text-[#1E3A8A] font-sans mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button: Book a Session with Founder */}
            {(onBookSession || onOpenRegister) && (
              <button
                onClick={() => {
                  playStampSound();
                  if (onBookSession) {
                    onBookSession();
                  } else if (onOpenRegister) {
                    onOpenRegister();
                  }
                }}
                className="w-full btn-case-stamp py-3.5 text-xs flex items-center justify-center gap-2 font-black tracking-wider cursor-pointer shadow-[4px_4px_0px_#0B192C]"
              >
                <Calendar className="w-4 h-4 text-[#F8F4E6]" />
                <span>BOOK A SESSION WITH ME</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Right Column: Full Biography, Impact & Journey */}
        <ScrollReveal direction="right" distance={90} duration={0.85} className="lg:col-span-7 space-y-6">
          {/* Detailed Biography Text Panels */}
          <div className="comic-panel p-6 bg-[#F8F4E6] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#0B192C]/30 pb-2">
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              <h4 className="font-display font-black text-lg text-[#0B192C] uppercase tracking-wide">
                Biography & Circuit Impact
              </h4>
            </div>

            <div className="space-y-3.5 text-sm font-sans text-[#0B192C] leading-relaxed">
              {FOUNDER_DOSSIER.bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="bg-[#F8F4E6]/40 p-3 border-l-2 border-[#0B192C] hover:bg-[#F8F4E6]/80 transition-colors">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Pillars of Leadership */}
          <div className="comic-panel p-6 bg-[#F8F4E6] space-y-4">
            <h4 className="font-display font-black text-base text-[#0B192C] uppercase tracking-wide flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C5A059]" />
              Core Pillars of the Illuminati Movement
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FOUNDER_DOSSIER.pillarsOfPhilosophy.map((pillar, idx) => (
                <div key={idx} className="bg-[#F8F4E6] p-3.5 border-2 border-[#0B192C] space-y-1.5 hard-stamp">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <span className="font-mono-tag font-black text-xs text-[#0B192C]">
                      {pillar.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1E3A8A] leading-normal font-sans">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Milestones Timeline */}
          <div className="comic-panel p-6 bg-[#F8F4E6] space-y-4">
            <div className="flex items-center justify-between border-b border-[#0B192C]/30 pb-2">
              <h4 className="font-display font-black text-base text-[#0B192C] uppercase tracking-wide flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C5A059]" />
                Seven-Year Leadership Milestones
              </h4>
              <span className="text-[10px] font-mono-tag font-bold text-[#1E3A8A]">
                TRACK RECORD & EXPANSION
              </span>
            </div>

            <div className="space-y-3">
              {FOUNDER_DOSSIER.journeyMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-[#F8F4E6]/60 hover:bg-[#F8F4E6] border-l-3 border-[#C5A059] transition-colors"
                >
                  <span className="bg-[#0B192C] text-[#F8F4E6] px-2 py-0.5 text-[10px] font-mono-tag font-bold flex-shrink-0">
                    {m.year}
                  </span>
                  <div>
                    <div className="font-mono-tag font-black text-xs text-[#0B192C]">
                      {m.title}
                    </div>
                    <div className="text-[11px] text-[#1E3A8A] font-sans mt-0.5 leading-snug">
                      {m.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox Modal for High Resolution Inspection */}
      {isPhotoLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative max-w-lg w-full bg-[#F8F4E6] border-3 border-[#0B192C] p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-2">
              <div className="text-xs font-mono-tag font-black text-[#0B192C] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                SUBHRAKANT BISWAL // OFFICIAL HIGH-RES PORTRAIT
              </div>
              <button
                onClick={() => {
                  playTypewriterSound();
                  setIsPhotoLightboxOpen(false);
                }}
                className="p-1 hover:bg-[#C5A059] hover:text-[#F8F4E6] text-[#0B192C] border border-[#0B192C] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-[#0B192C] bg-[#0B192C] flex items-center justify-center">
              {!lightboxLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent animate-spin" />
                </div>
              )}
              <picture className="w-full h-full">
                <source srcSet="/founder-portrait-opt.webp" type="image/webp" />
                <source srcSet="/founder-portrait.png" type="image/png" />
                <img
                  src={activePhotoSrc}
                  alt="Subhrakant Biswal Full Resolution Portrait"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onLoad={() => setLightboxLoaded(true)}
                  onError={() => {
                    setActivePhotoSrc(FOUNDER_DOSSIER.vectorFallbackUrl);
                    setLightboxLoaded(true);
                  }}
                  className={`w-full h-full object-cover object-center transition-all duration-500 ${
                    lightboxLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              </picture>
            </div>

            <div className="p-2.5 bg-[#F8F4E6] border border-[#0B192C] text-[11px] font-mono-tag text-[#0B192C] space-y-1">
              <div className="font-bold flex items-center justify-between">
                <span>Subhrakant Biswal (Founder, Illuminati MUN Society)</span>
                <span className="text-[#C5A059] font-black">2023 GOVERNOR AWARDEE</span>
              </div>
              <p className="text-[#1E3A8A] text-[10px]">
                7 Years MUN Circuit Experience • 60+ Conferences • ODMMUN & FBSMUN Senior Advisor • 1,000+ Students Mentored Worldwide
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

