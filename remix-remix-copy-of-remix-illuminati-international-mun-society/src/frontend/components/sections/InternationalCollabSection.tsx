import React, { useState, useEffect } from 'react';
import { INTERNATIONAL_COLLAB_DATA, CertificationItem, LeadershipRoleItem } from '../../data/internationalCollabData';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TerminalSkewCard } from '../ui/TerminalSkewCard';
import { 
  Globe2, Shield, Award, BookOpen, GraduationCap, CheckCircle2, 
  ExternalLink, Sparkles, MapPin, Flag, FileText,
  Maximize2, X, Star, Users, Briefcase, Eye, ChevronRight, Compass, Quote
} from 'lucide-react';

interface InternationalCollabSectionProps {
  onOpenRegister?: () => void;
  onNavigate?: (page: string) => void;
}

export const InternationalCollabSection: React.FC<InternationalCollabSectionProps> = ({ 
  onOpenRegister,
  onNavigate 
}) => {
  const data = INTERNATIONAL_COLLAB_DATA;
  const [activeTab, setActiveTab] = useState<'overview' | 'bio' | 'credentials' | 'footprint'>('overview');
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string; subtitle: string } | null>(null);
  
  // Image error state fallback handlers
  const [founderImgSrc, setFounderImgSrc] = useState<string>(data.photoUrl);
  const [logoImgSrc, setLogoImgSrc] = useState<string>(data.logoUrl);

  const handleFounderImgError = () => {
    if (founderImgSrc !== data.fallbackPhotoUrl) {
      setFounderImgSrc(data.fallbackPhotoUrl);
    }
  };

  const handleLogoImgError = () => {
    if (logoImgSrc !== data.fallbackLogoUrl) {
      setLogoImgSrc(data.fallbackLogoUrl);
    }
  };

  return (
    <section id="panel-international-collab" className="scroll-mt-24 space-y-8 overflow-x-clip">
      {/* Top Banner: Transatlantic Alliance Announcement */}
      <ScrollReveal direction="right" distance={80} duration={0.85}>
        <div className="comic-panel p-5 bg-[#F8F4E6] border-2 border-[#0B192C] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B192C] uppercase tracking-tight">
              Delegates Beyond Borders (DBBMUN) & Illuminati MUN Society
            </h3>
            <p className="text-xs font-sans text-[#0B192C] max-w-3xl leading-relaxed font-medium">
              Bridging Model United Nations circuits across North America, Latin America, Europe, and Asia. Empowering delegates through 30 years of global pedagogical excellence, cross-border crisis simulations, and high-level diplomatic mentorship.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
            <div className="px-3.5 py-2 bg-[#F8F4E6] border-2 border-[#0B192C] text-center">
              <div className="text-base font-mono-tag font-black text-[#1E3A8A]">30 YEARS</div>
              <div className="text-[9px] font-mono-tag text-[#0B192C] uppercase font-bold">Experience</div>
            </div>
            <div className="px-3.5 py-2 bg-[#F8F4E6] border-2 border-[#0B192C] text-center">
              <div className="text-base font-mono-tag font-black text-[#0B192C]">200+</div>
              <div className="text-[9px] font-mono-tag text-[#0B192C] uppercase font-bold">Conferences</div>
            </div>
            <div className="px-3.5 py-2 bg-[#F8F4E6] border-2 border-[#0B192C] text-center">
              <div className="text-base font-mono-tag font-black text-[#1E3A8A]">7+ NATIONS</div>
              <div className="text-[9px] font-mono-tag text-[#0B192C] uppercase font-bold">Global Reach</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Profile Grid: Photo & Brand Identity (Left) + Detailed Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Diplomatic Portrait Card & DBB Logo */}
        <ScrollReveal direction="left" distance={90} duration={0.85} className="lg:col-span-4 space-y-6">
          {/* Portrait Case Card */}
          <div className="comic-panel p-5 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-4 relative overflow-hidden">
            {/* Photo Container */}
            <div className="relative group border-2 border-[#0B192C] bg-[#0B192C] overflow-hidden aspect-[3/4] max-h-[420px] flex items-center justify-center">
              <img
                src={founderImgSrc}
                alt="Georgina Farrés Wartenweiler - Founder DBBMUN"
                onError={handleFounderImgError}
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
              />

              {/* Lightbox Trigger Overlay */}
              <button
                type="button"
                data-cursor="inspect"
                onClick={() => {
                  playStampSound();
                  setSelectedPhoto({
                    src: founderImgSrc,
                    title: 'Georgina Farrés Wartenweiler',
                    subtitle: 'Founder of Delegates Beyond Borders (DBBMUN - Mexico & USA) & President of Fundación Delegates Beyond Borders',
                  });
                }}
                className="absolute inset-0 bg-[#0B192C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-[#F8F4E6] font-mono-tag text-xs font-bold cursor-pointer backdrop-blur-[2px]"
                title="Click to inspect high-resolution archival portrait"
              >
                <Maximize2 className="w-8 h-8 text-[#C5A059]" />
                <span className="bg-[#0B192C] px-3 py-1 border border-[#F8F4E6]/50">INSPECT PORTRAIT</span>
              </button>
            </div>

            {/* Portrait Caption & Accolades */}
            <div className="space-y-1 text-center pt-1">
              <div className="font-display font-black text-xl text-[#0B192C] uppercase tracking-tight">
                Georgina Farrés Wartenweiler
              </div>
              <div className="text-xs font-mono-tag font-black text-[#C5A059] uppercase">
                (Gina)
              </div>
              <p className="text-[11px] font-mono-tag text-[#1E3A8A] font-bold">
                Senior Educational Consultant & MUN Expert
              </p>
            </div>

            {/* Quick Badges Strip */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-[#0B192C]">
              <div className="p-2 bg-[#F8F4E6] border border-[#0B192C] text-center">
                <div className="text-[10px] font-mono-tag text-[#1E3A8A]">TENURE</div>
                <div className="text-xs font-mono-tag font-black text-[#0B192C]">30 Years</div>
              </div>
              <div className="p-2 bg-[#F8F4E6] border border-[#0B192C] text-center">
                <div className="text-[10px] font-mono-tag text-[#1E3A8A]">CONFERENCES</div>
                <div className="text-xs font-mono-tag font-black text-[#C5A059]">200+ Global</div>
              </div>
            </div>
          </div>

          {/* Delegates Beyond Borders Official Logo Card */}
          <div className="comic-panel p-5 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-3">
            <div 
              className="relative group border-2 border-[#0B192C] bg-[#FFFFFF] p-3 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => {
                playStampSound();
                setSelectedPhoto({
                  src: logoImgSrc,
                  title: 'Delegates Beyond Borders, LLC',
                  subtitle: 'Official Organization Insignia & Crest — Mexico & USA Global Chapter',
                });
              }}
            >
              <img
                src={logoImgSrc}
                alt="Delegates Beyond Borders Logo"
                onError={handleLogoImgError}
                className="max-h-40 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[#0B192C]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F8F4E6] font-mono-tag text-xs font-bold">
                <span className="bg-[#0B192C] px-2 py-1 border border-[#F8F4E6]/50 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" /> VIEW LOGO
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono-tag text-[#1E3A8A] space-y-1">
              <div className="font-bold text-[#0B192C] uppercase">
                Delegates Beyond Borders, LLC & Fundación DBB
              </div>
              <p className="text-[10px] leading-relaxed">
                Global partner organisation facilitating cross-border diplomatic training, academic diplomacy, and Model UN delegations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Interactive Dossier Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Navigation Dossier Tabs */}
          <ScrollReveal direction="down" distance={40} duration={0.8}>
            <div className="comic-panel p-2 bg-[#F8F4E6] border-3 border-[#0B192C] flex flex-wrap gap-2 hard-stamp">
              {[
                { id: 'overview', label: '01 // EXECUTIVE SUMMARY', icon: FileText },
                { id: 'bio', label: '02 // FULL DOSSIER & BIO', icon: BookOpen },
                { id: 'credentials', label: '03 // CERTIFICATIONS & DEGREES', icon: GraduationCap },
                { id: 'footprint', label: '04 // GLOBAL FOOTPRINT (7+ NATIONS)', icon: Globe2 },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playTypewriterSound();
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`flex-1 min-w-[160px] px-3.5 py-2.5 border-2 text-xs font-mono-tag font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0B192C] text-[#F8F4E6] border-[#0B192C] hard-stamp shadow-[3px_3px_0px_#C5A059]'
                        : 'bg-[#F8F4E6] text-[#0B192C] border-[#0B192C] hover:bg-[#F8F4E6]'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#1E3A8A]'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'overview' && (
            <ScrollReveal direction="up" distance={60} duration={0.85} className="space-y-6">
              {/* Primary Profile Headline Slate */}
              <div className="comic-panel p-6 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-4 hard-stamp relative">
                <div className="border-b-2 border-[#0B192C] pb-3 space-y-1">
                  <div className="text-[10px] font-mono-tag font-bold text-[#C5A059] uppercase tracking-wider">
                    EXECUTIVE PROFILE & COLLABORATION HIGHLIGHTS
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight">
                    {data.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-tag font-bold text-[#0B192C]">
                    {data.title}
                  </p>
                  <p className="text-xs font-mono-tag font-bold text-[#C5A059]">
                    {data.subtitle}
                  </p>
                </div>

                {/* Opening Core Bio Paragraph */}
                <div className="text-xs sm:text-sm font-sans text-[#0B192C] leading-relaxed space-y-3">
                  <p className="font-medium bg-[#F8F4E6]/60 p-4 border-l-4 border-[#C5A059] hard-stamp">
                    {data.bioParagraphs[0]}
                  </p>
                  <p>
                    {data.bioParagraphs[1]}
                  </p>
                </div>

                {/* Quote Box */}
                <div className="comic-panel p-4 bg-[#0B192C] text-[#F8F4E6] border-2 border-[#0B192C] flex items-start gap-3">
                  <Quote className="w-6 h-6 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-sans italic text-[#E6D5B8]">
                      "{data.quote}"
                    </p>
                    <div className="text-[10px] font-mono-tag font-black text-[#C5A059] uppercase">
                      — Georgina Farrés Wartenweiler, Founder DBBMUN
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Appointments Grid with Terminal Skew Interactive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.leadershipRoles.slice(0, 4).map((item, idx) => (
                  <TerminalSkewCard
                    key={idx}
                    variant={idx % 2 === 0 ? 'dark' : 'navy'}
                    tag={`GLOBAL APPOINTMENT // 0${idx + 1}`}
                    badge={item.tenureOrScope}
                    title={item.role}
                    onClick={() => playStampSound()}
                  >
                    <div className="space-y-1.5 pt-1 text-[#E6D5B8]">
                      <div className="font-bold text-[#C5A059] text-xs">
                        {item.organization}
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">
                        {item.description}
                      </p>
                    </div>
                  </TerminalSkewCard>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* TAB 2: FULL DOSSIER & BIO */}
          {activeTab === 'bio' && (
            <ScrollReveal direction="up" distance={60} duration={0.85} className="space-y-6">
              <div className="comic-panel p-6 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-6 hard-stamp">
                <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B192C] uppercase tracking-tight">
                      Complete Verbatim Diplomatic Dossier
                    </h3>
                  </div>
                  <span className="bg-[#C5A059] text-[#F8F4E6] px-2 py-0.5 text-[10px] font-mono-tag font-black">
                    5 KEY CHAPTERS
                  </span>
                </div>

                {/* All 5 Paragraphs formatted as clean readable intelligence chapters */}
                <div className="space-y-5">
                  {data.bioParagraphs.map((para, pIdx) => {
                    const chapterHeaders = [
                      'I. EDUCATIONAL CONSULTANCY & GLOBAL PEDAGOGY (30 YEARS)',
                      'II. DELEGATES BEYOND BORDERS, HARVARD, UNHQ & BIMUN COORDINATION',
                      'III. CROSS-CULTURAL CURRICULUM, TRANSLATE SOLUTIONS & HUMAN RIGHTS',
                      'IV. DIPLOMATIC ACCREDITATIONS: YALE, UN DPI, CENEVAL & CAMBRIDGE',
                      'V. INTERNATIONAL ACADEMIC DIRECTION: SICMUN, NYC-FWWMUN & GLOBAL MENTORSHIP',
                    ];
                    return (
                      <div key={pIdx} className="comic-panel p-4 bg-[#F8F4E6]/70 border-2 border-[#0B192C] space-y-2 hard-stamp">
                        <div className="flex items-center justify-between text-[10px] font-mono-tag font-black text-[#C5A059] border-b border-[#0B192C]/30 pb-1.5">
                          <span>{chapterHeaders[pIdx]}</span>
                          <span className="text-[#1E3A8A]">SECTION 0{pIdx + 1}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-sans text-[#0B192C] leading-relaxed">
                          {para}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* All 6 Leadership Roles */}
                <div className="pt-4 border-t-2 border-[#0B192C] space-y-3">
                  <h4 className="font-display font-black text-lg text-[#0B192C] uppercase tracking-tight flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#C5A059]" />
                    Key Leadership Appointments & Faculty Positions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.leadershipRoles.map((role, rIdx) => (
                      <div key={rIdx} className="p-3 bg-[#F8F4E6] border border-[#0B192C] text-xs font-mono-tag space-y-1">
                        <div className="font-black text-[#C5A059] text-[11px] uppercase">{role.role}</div>
                        <div className="font-bold text-[#0B192C]">{role.organization}</div>
                        <div className="text-[10px] text-[#1E3A8A]">{role.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* TAB 3: CERTIFICATIONS & DEGREES */}
          {activeTab === 'credentials' && (
            <ScrollReveal direction="up" distance={60} duration={0.85} className="space-y-6">
              <div className="comic-panel p-6 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-5 hard-stamp">
                <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B192C] uppercase tracking-tight">
                      Accreditations, Diplomas & Global Certifications
                    </h3>
                  </div>
                  <span className="bg-[#0B192C] text-[#F8F4E6] px-2 py-0.5 text-[10px] font-mono-tag font-black">
                    8 VERIFIED CREDENTIALS
                  </span>
                </div>

                <p className="text-xs font-sans text-[#1E3A8A]">
                  Holding multiple degrees, diplomas, and certifications from premier institutions worldwide, reflecting a continuous commitment to professional development, human rights, student well-being, and academic diplomacy.
                </p>

                {/* Grid of Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="comic-panel p-4 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-2 hard-stamp relative hover:shadow-[3px_3px_0px_#0B192C] transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-[#0B192C] text-[#F8F4E6] px-1.5 py-0.5 text-[9px] font-mono-tag font-bold">
                          {cert.type}
                        </span>
                        {cert.year && (
                          <span className="bg-[#C5A059] text-[#F8F4E6] px-1.5 py-0.5 text-[9px] font-mono-tag font-bold">
                            {cert.year}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-black text-base text-[#0B192C] leading-snug pt-1">
                        {cert.title}
                      </h4>

                      <p className="text-xs font-mono-tag font-bold text-[#1E3A8A]">
                        {cert.institution}
                      </p>

                      <div className="pt-2 border-t border-[#0B192C]/20 flex items-center justify-between text-[10px] font-mono-tag text-[#0B192C]">
                        <span className="text-[#1E3A8A]">VERIFICATION REF:</span>
                        <span className="font-bold bg-[#F8F4E6] px-1.5 py-0.5 border border-[#0B192C]/30">
                          {cert.code}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured Educational Institutions Strip */}
                <div className="p-4 bg-[#0B192C] text-[#F8F4E6] border-2 border-[#0B192C] space-y-2">
                  <div className="text-[10px] font-mono-tag font-black text-[#C5A059] uppercase tracking-wider">
                    AFFILIATED UNIVERSITIES & GLOBAL BODIES
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono-tag">
                    {data.featuredInstitutions.map((inst, i) => (
                      <span key={i} className="bg-[#0B192C] px-2.5 py-1 border border-[#F8F4E6]/30 text-[#E6D5B8]">
                        • {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* TAB 4: GLOBAL FOOTPRINT */}
          {activeTab === 'footprint' && (
            <ScrollReveal direction="up" distance={60} duration={0.85} className="space-y-6">
              <div className="comic-panel p-6 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-6 hard-stamp">
                <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-3">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B192C] uppercase tracking-tight">
                      30-Year International Circuit Footprint
                    </h3>
                  </div>
                  <span className="bg-[#C5A059] text-[#F8F4E6] px-2 py-0.5 text-[10px] font-mono-tag font-black">
                    7+ KEY NATIONS
                  </span>
                </div>

                <p className="text-xs font-sans text-[#1E3A8A] leading-relaxed">
                  Gina has served as a mentor and diplomatic consultant at premier Model UN assemblies and educational conferences across 7+ nations, training thousands of students for over 200 international gatherings.
                </p>

                {/* Nation Flags & Roles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.nationsActive.map((nation, nIdx) => (
                    <div key={nIdx} className="p-3.5 bg-[#F8F4E6] border-2 border-[#0B192C] hard-stamp space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" role="img" aria-label={nation.name}>{nation.flag}</span>
                        <div className="font-display font-black text-base text-[#0B192C] uppercase">
                          {nation.name}
                        </div>
                      </div>
                      <p className="text-[11px] font-mono-tag text-[#1E3A8A] font-bold pt-1 border-t border-[#0B192C]/20">
                        {nation.role}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Conferences Highlight */}
                <div className="p-4 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-2 hard-stamp">
                  <div className="text-xs font-mono-tag font-black text-[#0B192C] uppercase">
                    PROMINENT CONFERENCES & HIGHLIGHTED PLATFORMS:
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono-tag text-[#1E3A8A]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>United Nations Headquarters (UNHQ, New York City)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>Harvard Model United Nations</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>Southwestern University MUN (USA)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>Liceo Marco Foscarini (Venice, Italy)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>HAPPY.MUN 2024 at Universidade Atlântica (Portugal)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>BIMUN & BIMUN Bajío (Fundación Cultural Baur — 20 Years)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>SICMUN Academic Direction (9 Years)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>NYC-FWWMUN Faculty Advising</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Action Dispatch & Delegation Collaboration CTA */}
          <ScrollReveal direction="up" distance={40} duration={0.85}>
            <div className="comic-panel p-5 bg-[#F8F4E6] border-3 border-[#0B192C] flex flex-col sm:flex-row items-center justify-between gap-4 hard-stamp">
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-display font-black text-lg text-[#0B192C] uppercase tracking-tight">
                  Cross-Border Delegations & International Mentorship
                </div>
                <p className="text-xs font-sans text-[#1E3A8A]">
                  Interested in international delegate exchange, bilingual workshops, or global conference training?
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-center">
                {onOpenRegister && (
                  <button
                    type="button"
                    onClick={() => {
                      playStampSound();
                      onOpenRegister();
                    }}
                    className="btn-case-stamp px-4 py-2.5 text-xs font-mono-tag font-black flex items-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-[#F8F4E6]" />
                    <span>FILE CREDENTIALS</span>
                  </button>
                )}
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      playStampSound();
                      onNavigate('contacts');
                    }}
                    className="px-4 py-2.5 bg-[#F8F4E6] text-[#0B192C] border-2 border-[#0B192C] hover:bg-[#0B192C] hover:text-[#F8F4E6] transition-colors text-xs font-mono-tag font-black cursor-pointer hard-stamp"
                  >
                    CONTACT ENVOY WING
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* High-Resolution Lightbox Modal for Photo / Logo Inspection */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-[#0B192C]/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="comic-panel p-4 sm:p-6 bg-[#F8F4E6] border-3 border-[#0B192C] max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 hard-stamp relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#C5A059] text-[#F8F4E6] px-2 py-0.5 text-[10px] font-mono-tag font-bold">
                  ARCHIVAL EVIDENCE
                </span>
                <span className="font-mono-tag text-xs font-bold text-[#0B192C]">
                  [DOC-REF // INT-COLLAB-2026]
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-1 border-2 border-[#0B192C] bg-[#F8F4E6] hover:bg-[#C5A059] hover:text-[#F8F4E6] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="border-3 border-[#0B192C] bg-[#0B192C] overflow-hidden max-h-[60vh] flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[58vh] w-auto object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="space-y-1">
              <h4 className="font-display font-black text-lg text-[#0B192C] uppercase">
                {selectedPhoto.title}
              </h4>
              <p className="text-xs font-mono-tag text-[#1E3A8A]">
                {selectedPhoto.subtitle}
              </p>
            </div>

            {/* Modal Footer Stamp */}
            <div className="flex items-center justify-between pt-2 border-t-2 border-[#0B192C] text-[10px] font-mono-tag text-[#0B192C]">
              <span>DELEGATES BEYOND BORDERS (DBBMUN)</span>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-3 py-1 bg-[#0B192C] text-[#F8F4E6] font-bold cursor-pointer hover:bg-[#C5A059] transition-colors"
              >
                DISMISS VIEWER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
