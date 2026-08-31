import React, { useState } from 'react';
import { SUBRAT_SARANGI_DOSSIER } from '../../data/leadershipData';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';
import Carousel from '../ui/Carousel';
import { 
  Shield, BookOpen, Scale, Award, 
  Building2, BookOpenCheck, Users, HeartHandshake, 
  Maximize2, X, Camera, CheckCircle2, Sparkles, UserCheck, Eye
} from 'lucide-react';

export const AdvisorSection: React.FC = () => {
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState<boolean>(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);

  const advisorCarouselItems = [
    {
      id: 1,
      title: 'Executive Board Portrait',
      description: 'Mr. Subrat Kumar Sarangi — Official Diplomatic & Advisory Board Portrait',
      image: SUBRAT_SARANGI_DOSSIER.photos[0].fallbackUrl,
      icon: <Award className="carousel-icon" />,
    },
    {
      id: 2,
      title: 'Institutional Planning Suite',
      description: 'Academic Operations & Institutional Planning Suite',
      image: SUBRAT_SARANGI_DOSSIER.photos[1].fallbackUrl,
      icon: <Building2 className="carousel-icon" />,
    },
    {
      id: 3,
      title: '25+ Years Experience',
      description: 'Senior Consultant across International Educational Leadership & Administration',
      image: SUBRAT_SARANGI_DOSSIER.photos[0].fallbackUrl,
      icon: <UserCheck className="carousel-icon" />,
    },
    {
      id: 4,
      title: 'Academic Integrity & Ethics',
      description: 'Non-partisan diplomacy simulation guidelines and vetted background research',
      image: SUBRAT_SARANGI_DOSSIER.photos[1].fallbackUrl,
      icon: <Shield className="carousel-icon" />,
    },
  ];

  return (
    <section id="panel-advisor" className="scroll-mt-24 space-y-8 select-none overflow-x-clip">


      {/* ========================================================= */}
      {/* PRIMARY FEATURED DOSSIER: MR. SUBRAT KUMAR SARANGI        */}
      {/* ========================================================= */}
      <ScrollReveal direction="right" distance={90} duration={0.85}>
        <div className="comic-panel p-6 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-6 relative">
          {/* Top Identification Header Banner */}
          <div className="bg-[#0B192C] text-[#F8F4E6] p-4 border-2 border-[#0B192C] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#D97706] text-[#0B192C] flex items-center justify-center border-2 border-[#F8F4E6] shrink-0 rounded-[4px] shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl tracking-wide text-[#F8F4E6]">
                  {SUBRAT_SARANGI_DOSSIER.name}
                </h3>
                <p className="text-xs sm:text-sm font-ubuntu font-semibold text-[#E6D5B8]/90 mt-0.5">
                  {SUBRAT_SARANGI_DOSSIER.role}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-ubuntu text-[11px] font-bold">
              <span className="px-3 py-1.5 bg-[#1E3A8A] border border-[#F8F4E6]/30 text-[#F8F4E6] rounded-[3px]">
                25+ YEARS INTERNATIONAL EXPERIENCE
              </span>
              <span className="px-3 py-1.5 bg-[#D97706] text-[#0B192C] font-unbounded font-extrabold border border-[#0B192C] rounded-[3px] shadow-sm">
                EDUCATIONAL CONSULTANT
              </span>
            </div>
          </div>

        {/* Main Grid: Dual Images & Detailed Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): React Bits 3D Carousel & Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F8F4E6] border-2 border-[#0B192C] p-4 relative space-y-3 flex flex-col items-center">
              {/* React Bits Carousel */}
              <div className="w-full relative overflow-hidden" style={{ minHeight: '440px' }}>
                <Carousel
                  items={advisorCarouselItems}
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>

              {/* Carousel Sub-bar & Inspection Trigger */}
              <div className="w-full p-2.5 bg-[#FFFFFF] border-2 border-[#0B192C] text-[11px] font-ubuntu text-[#0B192C] flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  SWIPE / DRAG 3D CAROUSEL
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      playTypewriterSound();
                      setLightboxImageIndex(0);
                      setIsPhotoLightboxOpen(true);
                    }}
                    className="bg-[#0B192C] text-[#F8F4E6] hover:bg-[#D97706] hover:text-[#0B192C] px-2.5 py-1 text-[10px] font-bold font-unbounded border border-[#0B192C] transition-colors cursor-pointer flex items-center gap-1 rounded-[2px]"
                    title="View Archival Photo 1"
                  >
                    <Eye className="w-3 h-3 text-[#F59E0B]" />
                    PHOTO 1
                  </button>
                  <button
                    onClick={() => {
                      playTypewriterSound();
                      setLightboxImageIndex(1);
                      setIsPhotoLightboxOpen(true);
                    }}
                    className="bg-[#0B192C] text-[#F8F4E6] hover:bg-[#D97706] hover:text-[#0B192C] px-2.5 py-1 text-[10px] font-bold font-unbounded border border-[#0B192C] transition-colors cursor-pointer flex items-center gap-1 rounded-[2px]"
                    title="View Archival Photo 2"
                  >
                    <Eye className="w-3 h-3 text-[#F59E0B]" />
                    PHOTO 2
                  </button>
                </div>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              {SUBRAT_SARANGI_DOSSIER.stats.map((st, i) => (
                <div key={i} className="p-3 bg-[#FFFFFF] border-2 border-[#0B192C] hard-stamp shadow-[2px_2px_0px_#0B192C]">
                  <div className="text-xl font-unbounded font-black text-[#D97706]">{st.value}</div>
                  <div className="text-[10px] uppercase font-ubuntu font-bold text-[#0B192C] mt-0.5">
                    {st.label}
                  </div>
                  <div className="text-[10px] text-[#1E3A8A] font-eb-garamond mt-1 leading-snug">
                    {st.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (7 Cols): Official Profile & Comprehensive Biographical Text */}
          <div className="lg:col-span-7 space-y-5">
            {/* Title & Official Position Ribbon */}
            <div className="border-b-2 border-[#0B192C] pb-3">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight mt-1">
                Mr. Subrat Kumar Sarangi
              </h3>
              <p className="text-sm sm:text-base font-ubuntu font-bold text-[#0B192C] mt-1 bg-[#FFFFFF] p-2.5 border-2 border-[#0B192C]">
                Educational Consultant cum Board Of Advisory Illuminati International MUN Society
              </p>
            </div>

            {/* Exact Bio Paragraphs */}
            <div className="space-y-3.5 text-sm sm:text-[15px] font-eb-garamond text-[#0B192C] leading-relaxed">
              <p className="p-3.5 bg-[#FFFFFF] border-l-4 border-[#D97706] border border-[#0B192C]/30 shadow-xs">
                <strong>With over 25 years of International experience in education</strong>, spanning school leadership, administration, academic planning, and institutional operations, he has made significant contributions to the growth and development of students, teachers, and educational institutions.
              </p>

              <p className="p-3.5 bg-[#FFFFFF] border-l-4 border-[#0B192C] border border-[#0B192C]/30 shadow-xs">
                His unwavering focus on <strong>academic excellence, staff development, student well-being, and fostering a positive school culture</strong> has consistently driven institutional success and continuous improvement.
              </p>

              <p className="p-3.5 bg-[#FFFFFF] border-l-4 border-[#D97706] border border-[#0B192C]/30 shadow-xs">
                We are confident that his <strong>extensive experience, visionary leadership, and steadfast commitment to quality education</strong> will enable him to make a meaningful and lasting contribution to any organization he serves.
              </p>
            </div>

            {/* Core Leadership Pillars */}
            <div className="pt-2">
              <div className="text-xs font-unbounded font-bold uppercase text-[#0B192C] mb-3 flex items-center gap-1.5">
                <BookOpenCheck className="w-4 h-4 text-[#D97706]" />
                EXECUTIVE PILLARS & INSTITUTIONAL FOCUS:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-ubuntu">
                {SUBRAT_SARANGI_DOSSIER.corePillars.map((pillar, idx) => (
                  <div key={idx} className="p-3 bg-[#FFFFFF] border-2 border-[#0B192C] shadow-[2px_2px_0px_#0B192C]">
                    <div className="flex items-center gap-2 font-bold text-xs text-[#0B192C] uppercase">
                      <span className="w-2 h-2 bg-[#D97706] inline-block border border-[#0B192C]" />
                      {pillar.title}
                    </div>
                    <p className="text-[12px] text-[#1E3A8A] font-eb-garamond mt-1 leading-snug">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Impact Areas Tag Ribbon */}
            <div className="pt-2 border-t-2 border-[#0B192C]/30">
              <div className="text-[10px] font-unbounded font-bold uppercase text-[#1E3A8A] mb-2">
                KEY ADVISORY & CONSULTING COMPETENCIES:
              </div>
              <div className="flex flex-wrap gap-2 font-ubuntu text-[11px] font-semibold">
                {SUBRAT_SARANGI_DOSSIER.impactAreas.map((area, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#FFFFFF] border border-[#0B192C] text-[#0B192C] shadow-xs">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>

      {/* Advisory Council Charter Intro */}
      <ScrollReveal direction="left" distance={90} duration={0.85}>
        <div className="comic-panel p-6 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-3 hard-stamp">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-display font-black text-lg text-[#0B192C] uppercase tracking-tight">
              Academic Integrity, International Standards & Ethics Charter
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#0B192C] leading-relaxed">
            The Board of Advisory is guided by Senior Educational Consultant Mr. Subrat Kumar Sarangi to provide strategic oversight and ensure all Illuminati MUN simulations uphold rigorous academic standards, factual background research, transparent procedural conduct, and ethical student mentorship worldwide.
          </p>
        </div>
      </ScrollReveal>

      {/* Advisory Principles Bar */}
      <ScrollReveal direction="right" distance={90} duration={0.85}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="comic-panel p-4 bg-[#F8F4E6] border-3 border-[#0B192C] flex items-center gap-3 hard-stamp shadow-[3px_3px_0px_#0B192C]">
            <Scale className="w-6 h-6 text-[#C5A059] flex-shrink-0" />
            <div>
              <div className="font-mono-tag font-black text-xs text-[#0B192C]">NON-PARTISAN PEDAGOGY</div>
              <div className="text-[11px] text-[#1E3A8A] font-sans">Objective foreign policy simulation guidelines.</div>
            </div>
          </div>

          <div className="comic-panel p-4 bg-[#F8F4E6] border-3 border-[#0B192C] flex items-center gap-3 hard-stamp shadow-[3px_3px_0px_#0B192C]">
            <BookOpen className="w-6 h-6 text-[#C5A059] flex-shrink-0" />
            <div>
              <div className="font-mono-tag font-black text-xs text-[#0B192C]">FACT-CHECKED DOSSIERS</div>
              <div className="text-[11px] text-[#1E3A8A] font-sans">Verified background studies vetted by academics.</div>
            </div>
          </div>

          <div className="comic-panel p-4 bg-[#F8F4E6] border-3 border-[#0B192C] flex items-center gap-3 hard-stamp shadow-[3px_3px_0px_#0B192C]">
            <Award className="w-6 h-6 text-[#C5A059] flex-shrink-0" />
            <div>
              <div className="font-mono-tag font-black text-xs text-[#0B192C]">TRANSPARENT ADJUDICATION</div>
              <div className="text-[11px] text-[#1E3A8A] font-sans">Strict rubrics for Best Delegate gavel awards.</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* High-Resolution Photo Lightbox Modal */}
      {isPhotoLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative max-w-2xl w-full bg-[#F8F4E6] border-3 border-[#0B192C] p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-2">
              <div className="text-xs font-mono-tag font-black text-[#0B192C] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                MR. SUBRAT KUMAR SARANGI // ARCHIVAL DOSSIER PHOTO #{lightboxImageIndex + 1}
              </div>
              <button
                onClick={() => {
                  playStampSound();
                  setIsPhotoLightboxOpen(false);
                }}
                className="p-1 hover:bg-[#C5A059] hover:text-[#F8F4E6] border border-[#0B192C] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#0B192C] bg-[#0B192C] flex items-center justify-center">
              <picture className="w-full h-full">
                <source srcSet={SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].url} type="image/webp" />
                <source srcSet={SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].fallbackUrl} type="image/jpeg" />
                <img
                  src={SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].url}
                  alt={SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].caption}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].fallbackUrl;
                  }}
                  className="w-full h-full object-contain object-center"
                />
              </picture>
            </div>

            {/* Lightbox Switcher Controls */}
            <div className="flex items-center justify-between p-2.5 bg-[#F8F4E6] border border-[#0B192C] text-[11px] font-mono-tag text-[#0B192C]">
              <div>
                <strong className="text-[#0B192C] block font-black">
                  {SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].label}
                </strong>
                <span className="text-[#1E3A8A] text-[10px]">
                  {SUBRAT_SARANGI_DOSSIER.photos[lightboxImageIndex].caption}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxImageIndex(0)}
                  className={`px-2 py-1 border text-[10px] font-bold cursor-pointer ${
                    lightboxImageIndex === 0 ? 'bg-[#0B192C] text-[#F8F4E6]' : 'bg-[#F8F4E6] text-[#0B192C]'
                  }`}
                >
                  PHOTO 1
                </button>
                <button
                  onClick={() => setLightboxImageIndex(1)}
                  className={`px-2 py-1 border text-[10px] font-bold cursor-pointer ${
                    lightboxImageIndex === 1 ? 'bg-[#0B192C] text-[#F8F4E6]' : 'bg-[#F8F4E6] text-[#0B192C]'
                  }`}
                >
                  PHOTO 2
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


