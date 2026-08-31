import React, { useState } from 'react';
import { 
  Shield, Globe, Users, Trophy, CheckCircle2, Send, Sparkles, MapPin, Mail, Phone
} from 'lucide-react';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { 
  PORTFOLIO_PROJECTS, 
  PORTFOLIO_AWARDS, 
  ProjectItem 
} from '../../data/mirandaPortfolioData';
import { TactilePageTurn } from './TactilePageTurn';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { DiplomaticDeskInteractive } from './DiplomaticDeskInteractive';
import { TerminalSkewCard } from '../ui/TerminalSkewCard';

interface BroadsheetHeroProps {
  onOpenRegister: (committeeName?: string) => void;
  onExploreCouncils: () => void;
  onNavigateToPage?: (page: string) => void;
  onOpenProjectDetail?: (project: ProjectItem) => void;
}

export type MirandaNewspaperHomeProps = BroadsheetHeroProps;

const COUNCILS_SUMMARY = [
  {
    code: 'UNSC',
    name: 'UN Security Council',
    topic: 'International Peace, Security & Maritime Chokepoint Protection',
    level: 'Advanced',
    seats: 15,
  },
  {
    code: 'UNHRC',
    name: 'Human Rights Council',
    topic: 'Digital Privacy, Surveillance & Global Refugee Protection',
    level: 'Intermediate',
    seats: 47,
  },
  {
    code: 'AIPPM',
    name: 'All India Political Meet',
    topic: 'Federal Electoral Reforms, Regional Autonomy & Trade Policies',
    level: 'Intermediate / Bilingual',
    seats: 35,
  },
  {
    code: 'UNODC',
    name: 'UN Office on Drugs and Crime',
    topic: 'Combating Transnational Illicit Supply Chains & Cyber Trafficking',
    level: 'Intermediate',
    seats: 30,
  },
  {
    code: 'SOCHUM',
    name: 'Social, Humanitarian & Cultural',
    topic: 'Post-Crisis Education Access & Climate Displaced Communities',
    level: 'Beginner-Friendly',
    seats: 50,
  },
  {
    code: 'IPC',
    name: 'International Press Corps',
    topic: 'Investigative Journalism, Press Freedom & Real-Time Conference Reporting',
    level: 'Specialized',
    seats: 12,
  },
];

const CORE_PILLARS = [
  {
    step: '01',
    title: 'Research & Policy',
    desc: 'Developing comprehensive background knowledge, country policy alignment, and evidence-backed position papers.',
    details: ['UN Charter & Treaties', 'Geopolitical Strategy', 'Position Paper Crafting'],
  },
  {
    step: '02',
    title: 'Negotiation & Lobbying',
    desc: 'Mastering unmoderated caucuses, coalition building, and drafting consensus-driven working papers.',
    details: ['Bilateral Diplomacy', 'Bloc Coordination', 'Resolution Drafting'],
  },
  {
    step: '03',
    title: 'Oratory & Leadership',
    desc: 'Delivering structured speeches, handling points of order, and steering committee deliberations with confidence.',
    details: ['Rostrum Speaking', 'Crisis Resolution', 'Parliamentary Procedure'],
  },
];

export const MirandaNewspaperHome: React.FC<MirandaNewspaperHomeProps> = ({
  onOpenRegister,
  onExploreCouncils,
  onNavigateToPage,
  onOpenProjectDetail,
}) => {
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSent, setContactSent] = useState<boolean>(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    playStampSound();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactEmail('');
    }, 4000);
  };

  return (
    <div className="w-full select-none bg-[#F8F4E6] text-[#0B192C]">
      
      {/* Masthead */}
      <header className="border-b-2 border-[#0B192C] bg-[#F8F4E6] pt-4 pb-3 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-2 border-b border-[#0B192C]">
            <div className="text-[10px] sm:text-[12px] font-editorial uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#1E3A8A] mb-1 font-semibold">
              BHUBANESWAR, ODISHA • GLOBAL YOUTH DIPLOMACY PLATFORM • ESTD. 2021
            </div>
            <h1 className="font-canopee text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#0B192C] uppercase tracking-[-0.03em] leading-[0.85] sm:leading-[0.82] m-0 hover:text-[#C5A059] transition-colors cursor-default break-words">
              ILLUMINATI
            </h1>
          </div>

          {/* Folio Bar */}
          <div className="my-2 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-[10.5px] sm:text-[12px] font-editorial uppercase tracking-wider text-[#0B192C] text-center sm:text-left">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span className="font-bold">MODEL UNITED NATIONS SOCIETY</span>
              <span>•</span>
              <span className="font-editorial-italic">DEBATE • NEGOTIATE • UNITE</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span>
                <AnimatedCounter end={750} suffix="+ ACTIVE MEMBERS" duration={1600} />
              </span>
              <span>•</span>
              <span>
                <AnimatedCounter end={1000} suffix="+ STUDENTS MENTORED" duration={1600} />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Spreads Section */}
      <section className="border-b-2 border-[#0B192C] bg-[#F8F4E6] pt-4 pb-6 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-center py-2 border-b border-[#0B192C]">
            <h2 className="font-canopee text-2xl sm:text-3xl md:text-4xl text-[#0B192C] uppercase tracking-[-0.02em] leading-tight m-0">
              YOUTH DIPLOMACY SUMMITS, MASTERCLASSES & CONFERENCES
            </h2>
            <p className="font-editorial text-[13px] sm:text-[15px] text-[#1E3A8A] max-w-3xl mx-auto mt-1 leading-relaxed">
              Empowering delegates and student leaders across India, Mexico, and the United States through specialized committees and expert mentorship.
            </p>
          </div>

          {/* Tactile Page Turn Portfolio */}
          <TactilePageTurn 
            projects={PORTFOLIO_PROJECTS}
            onOpenProjectDetail={onOpenProjectDetail}
            onOpenRegister={onOpenRegister}
          />
        </div>
      </section>

      {/* Lead Story & Organization Profile */}
      <section className="border-b-2 border-[#0B192C] bg-[#F8F4E6] py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 5 Columns: Founder Feature */}
            <div className="lg:col-span-5 space-y-5 lg:border-r border-[#0B192C]/20 lg:pr-8">
              <div className="border-b border-[#0B192C] pb-2">
                <div className="text-[11px] font-editorial uppercase tracking-widest text-[#C5A059] font-bold mb-0.5">
                  ★ LEADERSHIP SPOTLIGHT
                </div>
                <h2 className="font-canopee text-3xl sm:text-4xl text-[#0B192C] uppercase tracking-[-0.02em] leading-tight m-0">
                  Subhrakant Biswal
                </h2>
                <div className="text-[12px] font-editorial-italic text-[#1E3A8A] mt-0.5">
                  Founder & Senior Advisor • Governor Award Recipient
                </div>
              </div>

              {/* Portrait Card */}
              <div className="broadsheet-card p-4 bg-[#F8F4E6] border border-[#0B192C]">
                <div className="aspect-[4/3] sm:aspect-[4/4.5] w-full bg-[#0B192C] rounded-[2.88px] overflow-hidden relative border border-[#0B192C] group">
                  <img 
                    src="/founder-portrait-opt.webp" 
                    alt="Subhrakant Biswal, Founder" 
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#F8F4E6]/95 backdrop-blur-xs text-[#0B192C] px-3 py-1.5 border border-[#0B192C] rounded-[2.88px] text-[11px] font-editorial">
                    <div className="font-bold">Subhrakant Biswal</div>
                    <div className="text-[#1E3A8A] text-[10px]">Founder & Senior Advisor</div>
                  </div>
                </div>
              </div>

              {/* Lead Paragraph */}
              <div className="p-4 bg-[#F8F4E6] border border-[#0B192C]/20 rounded-[8px]">
                <p className="font-editorial text-[15px] text-[#0B192C] leading-relaxed font-light">
                  Illuminati MUN Society was established to bridge the gap in grassroots diplomatic education, empowering school and university delegates with real-world oratory, research, and negotiation skills.
                </p>
                <div className="mt-3 pt-2 border-t border-[#0B192C]/15 flex items-center justify-between text-[12px] font-editorial text-[#1E3A8A]">
                  <span>7+ Years in the Circuit</span>
                  <button 
                    type="button"
                    onClick={() => {
                      playStampSound();
                      onNavigateToPage && onNavigateToPage('founder');
                    }}
                    className="text-[#C5A059] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Founder Profile ➔
                  </button>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Key Mission & Quick Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1 border-b border-[#0B192C] pb-4">
                <div className="font-canopee text-3xl sm:text-4xl md:text-5xl text-[#0B192C] leading-tight uppercase tracking-[-0.02em]">
                  EMPOWERING THE NEXT GENERATION OF DIPLOMATS
                </div>
                <p className="font-editorial text-[14px] text-[#1E3A8A] leading-relaxed pt-1">
                  Connecting over 750 members in Odisha and building international collaborations with DBBMUN in Mexico and the United States.
                </p>
              </div>

              {/* Two Highlight Columns with Terminal Skew Interactive Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TerminalSkewCard
                  variant="dark"
                  tag="Institutional Module"
                  badge="SCHOOL MUN SUPPORT"
                  title="Turnkey Conference Support"
                  onClick={() => playStampSound()}
                >
                  <p className="text-[#E6D5B8] text-[13px] leading-relaxed">
                    End-to-end assistance for schools and colleges: executive board curation, agenda design, study guides, and delegate training.
                  </p>
                </TerminalSkewCard>

                <TerminalSkewCard
                  variant="navy"
                  tag="Global Protocol"
                  badge="GLOBAL COLLABORATION"
                  title="International Mentorship"
                  onClick={() => playStampSound()}
                >
                  <p className="text-[#E6D5B8] text-[13px] leading-relaxed">
                    Joint initiatives with Delegates Beyond Borders (DBBMUN Mexico & USA), creating global speaking opportunities for Indian students.
                  </p>
                </TerminalSkewCard>
              </div>

              {/* Connect with Illuminati MUN & Interactive Diplomatic Workbench */}
              <DiplomaticDeskInteractive onOpenRegister={onOpenRegister} />
            </div>

          </div>
        </div>
      </section>

      {/* Core Educational Pillars */}
      <section className="border-b-2 border-[#0B192C] bg-[#F8F4E6] py-10 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-[#0B192C] pb-3 mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-editorial uppercase tracking-widest text-[#C5A059] font-bold mb-0.5">
                ★ PEDAGOGICAL APPROACH
              </div>
              <h2 className="font-canopee text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-[-0.03em] leading-tight m-0">
                HOW WE TRAIN DELEGATES
              </h2>
            </div>
            <div className="text-right font-editorial text-[13px] text-[#1E3A8A] max-w-sm">
              Structured training methodology from foundational research to advanced resolution drafting.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_PILLARS.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 bg-[#F8F4E6] border border-[#0B192C] rounded-[8px] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="font-mono-tag text-xs font-bold text-[#C5A059] mb-1">
                    PHASE {step.step}
                  </div>
                  <h3 className="font-editorial font-bold text-xl text-[#0B192C] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-editorial text-[14px] text-[#1E3A8A] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0B192C]/15 space-y-1.5">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[12px] font-editorial text-[#0B192C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Committee Directory */}
      <section id="panel-councils-dossier" className="border-b-2 border-[#0B192C] bg-[#F8F4E6] py-10 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-b-2 border-[#0B192C] pb-3 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-editorial uppercase tracking-widest text-[#C5A059] font-bold">
                ★ COMMITTEE SIMULATIONS
              </span>
              <h3 className="font-canopee text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-[-0.03em] m-0">
                ACTIVE COMMITTEES & AGENDAS
              </h3>
            </div>
            <div className="text-[13px] font-editorial text-[#1E3A8A]">
              Standardized committees simulated at Illuminati conferences
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COUNCILS_SUMMARY.map((council, idx) => (
              <div 
                key={idx} 
                className="bg-[#F8F4E6] p-5 flex flex-col justify-between hover:border-[#C5A059] transition-all border border-[#0B192C] rounded-[6px] cursor-pointer"
                onClick={() => {
                  playStampSound();
                  onExploreCouncils();
                }}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#0B192C]/15 pb-2 mb-3">
                    <span className="font-canopee text-3xl text-[#0B192C] tracking-tight">
                      {council.code}
                    </span>
                    <span className="text-[11px] font-editorial uppercase px-2 py-0.5 bg-[#0B192C] text-[#E6D5B8] rounded-[3px]">
                      {council.level}
                    </span>
                  </div>

                  <h4 className="font-editorial text-[16px] font-semibold text-[#0B192C] mb-1">
                    {council.name}
                  </h4>
                  <p className="font-editorial text-[13px] text-[#1E3A8A] leading-snug mb-3">
                    <strong className="font-medium text-[#0B192C]">Agenda:</strong> {council.topic}
                  </p>
                </div>

                <div className="border-t border-[#0B192C]/15 pt-2 flex items-center justify-between text-[12px] font-editorial text-[#0B192C]">
                  <span>{council.seats} Delegations</span>
                  <span className="text-[#1E3A8A] font-medium">Standard RoP Protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record: Separated Society Accomplishments & Founder Personal Achievements */}
      <section className="border-b-2 border-[#0B192C] bg-[#F8F4E6] py-10 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="border-b-2 border-[#0B192C] pb-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-editorial uppercase tracking-widest text-[#C5A059] font-bold mb-0.5">
                ★ VERIFIED TRACK RECORD
              </div>
              <h2 className="font-canopee text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-[-0.03em] m-0">
                ACCOMPLISHMENTS & HONOURS
              </h2>
            </div>
            <div className="text-right font-editorial text-[13px] text-[#1E3A8A]">
              Distinctly categorizing Society impact and Founder credentials
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* PART 1: Illuminati International MUN Society Accomplishments */}
            <div className="p-6 bg-[#F8F4E6] border-2 border-[#0B192C] rounded-[8px] space-y-5">
              <div className="border-b border-[#0B192C] pb-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-tag text-[#C5A059] font-bold uppercase tracking-wider">
                    ORGANIZATIONAL SCALE & IMPACT
                  </div>
                  <h3 className="font-canopee text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight m-0">
                    Illuminati Society Accomplishments
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#0B192C] text-[#E6D5B8] text-[10px] font-mono-tag font-bold rounded-[3px]">
                  SOCIETY
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5">
                  <div className="font-canopee text-3xl text-[#0B192C] leading-none shrink-0 w-16 text-center pt-1">
                    750+
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Active Community Members in Odisha
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Established as one of Odisha's largest and most vibrant youth diplomacy networks.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5">
                  <div className="font-canopee text-3xl text-[#0B192C] leading-none shrink-0 w-16 text-center pt-1">
                    1,000+
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Students Mentored Globally via Masterclasses
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Accessible online training sessions, masterclasses, and pre-conference bootcamps worldwide.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5">
                  <div className="font-canopee text-3xl text-[#0B192C] leading-none shrink-0 w-16 text-center pt-1">
                    03+
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Key Associated Institutional Conferences
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Turnkey support, delegate engagement, and mentorship for ODMMUN, FBSMUN, and MPS MUN Balasore.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5">
                  <div className="font-canopee text-3xl text-[#0B192C] leading-none shrink-0 w-16 text-center pt-1">
                    GLOBAL
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Bilateral Ties: DBBMUN Mexico & United States
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Cross-border collaborations creating authentic international debate and exchange opportunities.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PART 2: Subhrakant Biswal Personal Achievements */}
            <div className="p-6 bg-[#F8F4E6] border-2 border-[#0B192C] rounded-[8px] space-y-5">
              <div className="border-b border-[#0B192C] pb-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-tag text-[#C5A059] font-bold uppercase tracking-wider">
                    FOUNDER PERSONAL AFFAIRS & HONOURS
                  </div>
                  <h3 className="font-canopee text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight m-0">
                    Subhrakant Biswal's Track Record
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#C5A059] text-[#0B192C] text-[10px] font-mono-tag font-bold rounded-[3px]">
                  FOUNDER
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 bg-[#F8F4E6] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5 shadow-xs">
                  <div className="font-unbounded font-bold text-2xl text-[#D97706] leading-none shrink-0 w-16 text-center pt-1">
                    2023
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Governor Awardee, Odisha
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Distinguished state award recognition for outstanding youth leadership, diplomacy, and community building.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8F4E6] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5 shadow-xs">
                  <div className="font-unbounded font-bold text-xl text-[#D97706] leading-none shrink-0 w-16 text-center pt-1">
                    7 YRS
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      MUN Circuit Track Record (2019 – Present)
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Seven continuous years of competitive participation, executive chairing, and strategic conference direction.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8F4E6] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5 shadow-xs">
                  <div className="font-unbounded font-bold text-2xl text-[#D97706] leading-none shrink-0 w-16 text-center pt-1">
                    60+
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Conferences Attended in India & Globally
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Participation across major state, national, and international Model UN circuits.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8F4E6] border border-[#0B192C]/20 rounded-[4px] flex items-start gap-3.5 shadow-xs">
                  <div className="font-unbounded font-bold text-lg text-[#D97706] leading-none shrink-0 w-16 text-center pt-1">
                    LEAD
                  </div>
                  <div>
                    <div className="font-editorial font-bold text-[15px] text-[#0B192C]">
                      Advisor & Strategist (ODMMUN, FBSMUN, MPS MUN)
                    </div>
                    <div className="text-[12px] font-editorial text-[#1E3A8A] mt-0.5">
                      Personally held leadership roles directing committee planning, EB coordination, and delegate affairs.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="bg-[#0B192C] text-[#F8F4E6] py-14 sm:py-18 border-b-2 border-[#0B192C] px-4">
        <div className="max-w-7xl mx-auto text-center space-y-5">
          <div className="text-xs font-unbounded uppercase tracking-[0.2em] text-[#F59E0B] font-bold">
            ★ GET IN TOUCH
          </div>

          <h2 className="font-canopee text-4xl sm:text-6xl md:text-7xl text-[#F8F4E6] uppercase tracking-[-0.03em] leading-tight m-0 max-w-4xl mx-auto">
            CONNECT WITH ILLUMINATI MUN SOCIETY
          </h2>

          <p className="font-editorial text-[16px] sm:text-[18px] text-[#E6D5B8] max-w-2xl mx-auto leading-relaxed font-normal">
            Interested in hosting a Model UN at your institution, participating in our next conference, or joining our delegate masterclasses?
          </p>

          <div className="max-w-md mx-auto pt-2">
            {contactSent ? (
              <div className="p-3.5 rounded-[6px] bg-[#1E3A8A] border border-[#F59E0B]/50 text-[#F59E0B] font-ubuntu text-sm font-semibold flex items-center justify-center gap-2 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-[#F59E0B]" />
                <span>Message Received! We will get in touch shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col sm:flex-row gap-2 p-1.5 sm:p-1 bg-[#1E3A8A]/40 border border-[#F8F4E6]/20 rounded-2xl sm:rounded-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="flex-grow px-4 sm:px-5 py-2.5 rounded-full bg-transparent text-[#F8F4E6] font-ubuntu text-sm placeholder:text-[#E6D5B8]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#D97706] text-[#0B192C] font-mono-tag text-[12px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-md active:scale-95"
                >
                  <span>Connect</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs font-ubuntu text-[#E6D5B8] font-medium text-center">
            <span>Subhrakant Biswal: Subhrakantbiswal2003@gmail.com (+91 95568 75714)</span>
            <span className="hidden sm:inline">•</span>
            <span>Mr. Subrat Kumar Sarangi: subratkumarsarangi@gmail.com (+91 98610 16985)</span>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="bg-[#F8F4E6] text-[#0B192C] py-4 border-b-2 border-[#0B192C] overflow-hidden">
        <div className="flex whitespace-nowrap gap-8 animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 font-canopee text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-wider">
              <span>★ DEBATE • NEGOTIATE • UNITE</span>
              <span>✦</span>
              <span>750+ ACTIVE MEMBERS</span>
              <span>✦</span>
              <span>1,000+ STUDENTS MENTORED</span>
              <span>✦</span>
              <span>MEXICO & USA ALLIANCE</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export const BroadsheetHero = MirandaNewspaperHome;
