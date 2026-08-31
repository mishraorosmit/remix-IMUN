import React, { useState } from 'react';
import { SOCIETY_INFO } from '../../data/conferenceData';
import { 
  Globe, 
  BookOpen, 
  Target, 
  Brain, 
  MessageSquare, 
  Scale, 
  Zap, 
  CheckCircle2, 
  Building,
  Sparkles
} from 'lucide-react';
import { playTypewriterSound, playStampSound } from '../../utils/audio';
import { TerminalSkewCard } from '../ui/TerminalSkewCard';

export const OverviewSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'methodology' | 'alliances'>('narrative');

  const skills = [
    { name: 'Research & Policy Analysis', icon: BookOpen, desc: 'Country background research, policy alignment, and evidence-backed position paper drafting.' },
    { name: 'Multilateral Negotiation', icon: Scale, desc: 'Drafting consensus resolutions, unmoderated caucus lobbying, and coalition building.' },
    { name: 'Diplomatic Oratory', icon: MessageSquare, desc: 'Structured rostrum speeches, points of order, and parliamentary debate decorum.' },
    { name: 'Crisis Management', icon: Zap, desc: 'Real-time directive formulation, press releases, and rapid strategic response.' },
    { name: 'Rules of Procedure (RoP)', icon: Brain, desc: 'UN4MUN and UNA-USA procedural motions, points of information, and formal caucus flow.' },
    { name: 'Leadership & Dais Direction', icon: Target, desc: 'Secretariat governance, committee chairing, and mentoring first-time delegates.' },
  ];

  return (
    <section id="panel-case-overview" className="relative my-8 select-none">
      {/* Section Header */}
      <div className="border-b border-[#0B192C] pb-4 mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C5A059] text-xs font-editorial font-bold uppercase tracking-widest mb-1">
            <span>★</span>
            <span>Organization Overview</span>
          </div>
          <h2 className="font-canopee text-4xl sm:text-5xl md:text-6xl text-[#0B192C] leading-tight tracking-[-0.03em] uppercase m-0">
            About Illuminati MUN Society
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-editorial text-[#1E3A8A] font-medium">
            Odisha's Leading Youth Diplomacy Network
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-[#F8F4E6] border border-[#0B192C] rounded-[6px]">
          <div className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider font-semibold">
            Active Members
          </div>
          <div className="text-4xl md:text-5xl font-canopee text-[#0B192C] mt-2 leading-none">
            750+
          </div>
          <p className="text-[13px] font-editorial text-[#1E3A8A] mt-2">
            Student leaders across Odisha
          </p>
        </div>

        <div className="p-5 bg-[#F8F4E6] border border-[#0B192C] rounded-[6px]">
          <div className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider font-semibold">
            Students Mentored
          </div>
          <div className="text-4xl md:text-5xl font-canopee text-[#0B192C] mt-2 leading-none">
            1,000+
          </div>
          <p className="text-[13px] font-editorial text-[#1E3A8A] mt-2">
            Through masterclasses & workshops
          </p>
        </div>

        <div className="p-5 bg-[#F8F4E6] border border-[#0B192C] rounded-[6px]">
          <div className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider font-semibold">
            Global Partnerships
          </div>
          <div className="text-2xl md:text-3xl font-canopee text-[#0B192C] mt-2 leading-tight">
            MEXICO & USA
          </div>
          <p className="text-[13px] font-editorial text-[#1E3A8A] mt-2">
            With DBBMUN International
          </p>
        </div>

        <div className="p-5 bg-[#F8F4E6] border border-[#0B192C] rounded-[6px]">
          <div className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider font-semibold">
            Partner Schools
          </div>
          <div className="text-4xl md:text-5xl font-canopee text-[#0B192C] mt-2 leading-none">
            4+
          </div>
          <p className="text-[13px] font-editorial text-[#1E3A8A] mt-2">
            Supported statewide conferences
          </p>
        </div>
      </div>

      {/* Main Tabbed Container */}
      <div className="p-6 sm:p-8 bg-[#F8F4E6] border border-[#0B192C] rounded-[8px]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B192C]/15 pb-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { id: 'narrative', label: 'Executive Profile & Mission', icon: Globe },
              { id: 'methodology', label: '6 Diplomatic Pillars', icon: Target },
              { id: 'alliances', label: 'Institutional & Global Alliances', icon: Building },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    playTypewriterSound();
                  }}
                  className={`px-4 py-2 text-[14px] font-editorial transition-colors flex items-center gap-2 cursor-pointer rounded-[4px] ${
                    isActive 
                      ? 'bg-[#0B192C] text-[#E6D5B8] font-semibold' 
                      : 'bg-[#E6D5B8] text-[#0B192C] hover:bg-[#F8F4E6] border border-[#0B192C]/20'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#0B192C]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Executive Profile */}
        {activeTab === 'narrative' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 text-[15px] font-editorial text-[#0B192C] leading-relaxed">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#0B192C] rounded-[4px] flex items-center justify-center p-1 shrink-0">
                  <picture>
                    <source srcSet="/illuminati-logo.webp" type="image/webp" />
                    <img 
                      src="/illuminati-logo.png" 
                      alt="Illuminati Seal" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div>
                  <span className="text-[11px] font-editorial text-[#C5A059] uppercase tracking-wider font-bold block">
                    Youth Platform & Educational Movement
                  </span>
                  <h3 className="font-editorial text-[20px] font-bold text-[#0B192C]">
                    Illuminati International MUN Society
                  </h3>
                </div>
              </div>

              <div className="p-5 bg-[#E6D5B8] rounded-[6px] border border-[#0B192C]/15 space-y-3">
                <p>
                  <strong>Illuminati International MUN Society</strong> is a youth diplomacy platform dedicated to advancing Model United Nations, public speaking, negotiation, and global affairs education among students. Founded with the vision of creating a stronger and more connected MUN ecosystem, the society has grown into one of Odisha’s largest MUN networks with over <strong>750 active members</strong>.
                </p>

                <p>
                  Beyond hosting conferences, Illuminati prepares delegates through structured workshops, training sessions, study guides, and dais mentorship. We empower students with critical research methods, crisis response techniques, and parliamentary debate standards.
                </p>

                <p>
                  Through online masterclasses and cross-border initiatives, Illuminati has reached over <strong>1,000 students globally</strong>, including direct collaborations with partners in Mexico and the United States.
                </p>
              </div>

              <div className="p-4 border border-[#0B192C]/20 bg-[#E6D5B8] rounded-[6px]">
                <div className="flex items-center gap-1.5 text-[11px] font-editorial text-[#C5A059] uppercase tracking-wider font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Guiding Vision</span>
                </div>
                <p className="font-editorial italic text-[15px] text-[#0B192C] leading-relaxed">
                  "{SOCIETY_INFO.vision}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="overflow-hidden rounded-[6px] border border-[#0B192C] bg-[#0B192C]">
                <picture>
                  <source srcSet="/gall/all-conferences.webp" type="image/webp" />
                  <img 
                    src="/gall/all-conferences.png" 
                    alt="Illuminati MUN Conference Opening Convocation" 
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="p-3 bg-[#0B192C] text-[#E6D5B8] text-xs font-editorial">
                  Plenary Convocation: Student delegates representing UN Member States in formal debate.
                </div>
              </div>

              <div className="p-4 border border-[#0B192C]/20 bg-[#E6D5B8] rounded-[6px] space-y-2">
                <span className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider block font-bold">
                  Conference Standards:
                </span>
                <div className="flex items-center gap-2 text-[13px] font-editorial text-[#0B192C]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Chatham House Rule Certified</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-editorial text-[#0B192C]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>UN4MUN & UNA-USA Rules of Procedure</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] font-editorial text-[#0B192C]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Real-Time Crisis Simulations</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pedagogy */}
        {activeTab === 'methodology' && (
          <div className="space-y-4">
            <div className="text-[13px] font-editorial text-[#1E3A8A] uppercase tracking-wider font-semibold">
              The 6 Core Diplomatic Pillars (Interactive Dossiers):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((skill, idx) => (
                <TerminalSkewCard
                  key={idx}
                  variant={idx % 2 === 0 ? 'dark' : 'navy'}
                  tag={`DIPLOMACY // PILLAR 0${idx + 1}`}
                  badge="CORE CURRICULUM"
                  title={skill.name}
                  onClick={() => playStampSound()}
                >
                  <p className="text-[#E6D5B8] text-[13px] leading-relaxed pt-1">
                    {skill.desc}
                  </p>
                </TerminalSkewCard>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Alliances */}
        {activeTab === 'alliances' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#E6D5B8] p-5 border border-[#0B192C]/15 rounded-[6px] space-y-4">
              <div className="flex items-center justify-between border-b border-[#0B192C]/15 pb-2">
                <span className="text-[15px] font-editorial font-bold text-[#0B192C] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C5A059]" />
                  <span>Cross-Border Partnerships</span>
                </span>
                <span className="text-[10px] font-editorial font-bold uppercase px-2 py-0.5 bg-[#0B192C] text-[#E6D5B8] rounded-[2px]">GLOBAL</span>
              </div>
              <div className="space-y-3">
                {SOCIETY_INFO.collaborations.map((collab, i) => (
                  <div key={i} className="p-3.5 bg-[#F8F4E6] border border-[#0B192C]/10 rounded-[4px]">
                    <div className="flex items-center justify-between">
                      <strong className="font-editorial text-[15px] font-semibold text-[#0B192C]">{collab.name}</strong>
                      <span className="text-[10px] font-editorial bg-[#0B192C] text-[#E6D5B8] px-2 py-0.5 rounded-[2px]">EXCHANGE</span>
                    </div>
                    <p className="text-[13px] font-editorial text-[#1E3A8A] mt-1.5 leading-relaxed">
                      {collab.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#E6D5B8] p-5 border border-[#0B192C]/15 rounded-[6px] space-y-4">
              <div className="flex items-center justify-between border-b border-[#0B192C]/15 pb-2">
                <span className="text-[15px] font-editorial font-bold text-[#0B192C] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#C5A059]" />
                  <span>Statewide Model UN Collaborations</span>
                </span>
                <span className="text-[10px] font-editorial font-bold uppercase px-2 py-0.5 bg-[#0B192C] text-[#E6D5B8] rounded-[2px]">ODISHA</span>
              </div>
              <div className="space-y-3">
                {SOCIETY_INFO.associatedInitiatives.map((init, idx) => (
                  <div key={idx} className="p-3 bg-[#F8F4E6] border border-[#0B192C]/10 rounded-[4px] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
                    <div>
                      <strong className="text-[14px] font-editorial font-semibold text-[#0B192C] block">{init.name}</strong>
                      <span className="text-[12px] font-editorial text-[#1E3A8A]">Conference Architecture & Dais Support</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

