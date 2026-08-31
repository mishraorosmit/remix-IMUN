import React, { useState } from 'react';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { Globe, FileText, Vote, Check, Copy } from 'lucide-react';
import { WorldMapVector } from '../ui/WorldMapVector';

interface AllianceHub {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  cx: number;
  cy: number;
  role: string;
  activeInitiatives: string;
  description: string;
  flagEmoji: string;
  membersCount: string;
}

const ALLIANCE_HUBS: AllianceHub[] = [
  {
    id: 'india',
    name: 'National Secretariat HQ',
    location: 'Bhubaneswar, Odisha, India',
    coordinates: '20.29° N, 85.82° E',
    cx: 1442,
    cy: 362,
    role: 'Central Secretariat & Training Academy',
    activeInitiatives: 'Annual Statewide MUNs, Inter-School Delegations, Masterclasses',
    description: 'National headquarters managing comprehensive delegate training, secretariat operations, rules of procedure curriculum, and school partnerships across Odisha.',
    flagEmoji: '🇮🇳',
    membersCount: '750+ Active Members',
  },
  {
    id: 'mexico',
    name: 'DBBMUN Global Alliance',
    location: 'Mexico City, Mexico',
    coordinates: '19.43° N, 99.13° W',
    cx: 429,
    cy: 350,
    role: 'International Bilateral Exchange Partner',
    activeInitiatives: 'Delegates Beyond Borders Exchange, Joint Dais Panels',
    description: 'International collaboration partner coordinating cross-border committee simulations, transatlantic delegate dialogues, and youth leadership mentorship.',
    flagEmoji: '🇲🇽',
    membersCount: 'Global Exchange Network',
  },
];

const PRE_AMBULATORY_OPTIONS = [
  'Affirming its commitment to the sovereign equality and diplomatic cooperation of all Member States,',
  'Recognizing the urgent necessity of multilateral dialogue in addressing global challenges,',
  'Guided by the principles enshrined in the Charter of the United Nations,',
  'Recalling previous resolutions concerning sustainable development and youth empowerment,',
  'Emphasizing the vital importance of collaborative international diplomacy,',
  'Conscious of the shared responsibility to protect human rights and foster global peace,',
];

const OPERATIVE_OPTIONS = [
  'Encourages all Member States to establish permanent bilateral communication channels and regular multilateral consultations;',
  'Calls upon international educational bodies to expand youth leadership and diplomatic training programs;',
  'Urges signatories to develop transparent frameworks for cross-border cooperation and crisis prevention;',
  'Recommends the formation of regional working groups to monitor compliance with international agreements;',
  'Invites non-governmental organizations to support grassroots civic engagement and policy research;',
  'Decides to remain actively seized of the matter.',
];

const SAMPLE_COUNTRIES = [
  { code: 'USA', name: 'United States', isP5: true, vote: 'Yes' as const },
  { code: 'GBR', name: 'United Kingdom', isP5: true, vote: 'Yes' as const },
  { code: 'FRA', name: 'France', isP5: true, vote: 'Yes' as const },
  { code: 'CHN', name: 'PR China', isP5: true, vote: 'Abstain' as const },
  { code: 'RUS', name: 'Russian Fed.', isP5: true, vote: 'No' as const },
  { code: 'JPN', name: 'Japan', isP5: false, vote: 'Yes' as const },
  { code: 'IND', name: 'India', isP5: false, vote: 'Yes' as const },
  { code: 'DEU', name: 'Germany', isP5: false, vote: 'Yes' as const },
  { code: 'BRA', name: 'Brazil', isP5: false, vote: 'Abstain' as const },
  { code: 'ZAF', name: 'South Africa', isP5: false, vote: 'Yes' as const },
  { code: 'CHE', name: 'Switzerland', isP5: false, vote: 'Yes' as const },
  { code: 'TUR', name: 'Turkey', isP5: false, vote: 'Yes' as const },
  { code: 'KOR', name: 'Republic of Korea', isP5: false, vote: 'Yes' as const },
  { code: 'SGP', name: 'Singapore', isP5: false, vote: 'Yes' as const },
  { code: 'ARE', name: 'UAE', isP5: false, vote: 'Abstain' as const },
];

export const DiplomaticCanvasWarRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'resolution'>('map');
  const [selectedHub, setSelectedHub] = useState<AllianceHub>(ALLIANCE_HUBS[0]);

  // Resolution Builder State
  const [resCommittee, setResCommittee] = useState('UN Security Council');
  const [resTopic, setResTopic] = useState('Strengthening International Cooperation & Maritime Security');
  const [selectedPreambs, setSelectedPreambs] = useState<number[]>([0, 1, 4]);
  const [selectedOps, setSelectedOps] = useState<number[]>([0, 1, 2, 5]);
  const [sponsors, setSponsors] = useState<string[]>(['India', 'France', 'Japan']);
  const [signatories, setSignatories] = useState<string[]>(['Germany', 'Switzerland', 'Singapore', 'South Africa']);
  const [votes, setVotes] = useState<{ [country: string]: 'Yes' | 'No' | 'Abstain' }>(() => {
    const initial: { [k: string]: 'Yes' | 'No' | 'Abstain' } = {};
    SAMPLE_COUNTRIES.forEach(c => { initial[c.name] = c.vote; });
    return initial;
  });
  const [isCopied, setIsCopied] = useState(false);

  const toggleVote = (countryName: string) => {
    setVotes(prev => {
      const current = prev[countryName];
      const next = current === 'Yes' ? 'No' : current === 'No' ? 'Abstain' : 'Yes';
      return { ...prev, [countryName]: next };
    });
    playStampSound();
  };

  const yesVotes = Object.values(votes).filter(v => v === 'Yes').length;
  const noVotes = Object.values(votes).filter(v => v === 'No').length;
  const abstainVotes = Object.values(votes).filter(v => v === 'Abstain').length;
  const p5Vetoed = SAMPLE_COUNTRIES.some(c => c.isP5 && votes[c.name] === 'No');
  const isResolutionPassed = yesVotes >= 9 && !p5Vetoed;

  const copyResolutionText = () => {
    const text = `UNITED NATIONS ${resCommittee.toUpperCase()}\nWORKING DRAFT RESOLUTION 1.1\nTOPIC: ${resTopic}\n\nSPONSORS: ${sponsors.join(', ')}\nSIGNATORIES: ${signatories.join(', ')}\n\n` +
      selectedPreambs.map(i => PRE_AMBULATORY_OPTIONS[i]).join('\n\n') + '\n\n' +
      selectedOps.map((i, idx) => `${idx + 1}. ${OPERATIVE_OPTIONS[i]}`).join('\n\n') +
      `\n\nVOTE TALLY: ${yesVotes} Yes, ${noVotes} No, ${abstainVotes} Abstain.\nSTATUS: ${isResolutionPassed ? 'ADOPTED' : 'NOT ADOPTED'}`;
    
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    playTypewriterSound();
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="panel-diplomatic-canvas" className="relative my-10 select-none overflow-x-clip">
      {/* Section Header */}
      <div className="border-b border-[#0B192C] pb-4 mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C5A059] text-xs font-editorial font-bold uppercase tracking-widest mb-1">
            <span>★</span>
            <span>Interactive Diplomatic Studio</span>
          </div>
          <h2 className="font-canopee text-4xl sm:text-5xl md:text-6xl text-[#0B192C] leading-tight tracking-[-0.03em] uppercase m-0">
            Global Footprint & Resolution Drafting
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab('map');
            playStampSound();
          }}
          className={`px-5 py-2.5 text-[14px] font-editorial flex items-center gap-2 transition-colors rounded-[4px] cursor-pointer ${
            activeTab === 'map'
              ? 'bg-[#0B192C] text-[#E6D5B8] font-semibold'
              : 'bg-[#E6D5B8] text-[#0B192C] hover:bg-[#F8F4E6] border border-[#0B192C]/20'
          }`}
        >
          <Globe className="w-4 h-4 text-[#C5A059]" />
          <span>01 / Global Alliance Map</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('resolution');
            playStampSound();
          }}
          className={`px-5 py-2.5 text-[14px] font-editorial flex items-center gap-2 transition-colors rounded-[4px] cursor-pointer ${
            activeTab === 'resolution'
              ? 'bg-[#0B192C] text-[#E6D5B8] font-semibold'
              : 'bg-[#E6D5B8] text-[#0B192C] hover:bg-[#F8F4E6] border border-[#0B192C]/20'
          }`}
        >
          <FileText className="w-4 h-4 text-[#C5A059]" />
          <span>02 / Interactive Resolution Builder</span>
        </button>
      </div>

      {/* Viewport 1: Global Map */}
      {activeTab === 'map' && (
        <div className="p-6 bg-[#F8F4E6] border border-[#0B192C] rounded-[8px] space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Map Canvas */}
            <div className="lg:col-span-8 bg-[#E6D5B8] border border-[#0B192C]/20 p-4 rounded-[6px]">
              <div className="flex items-center justify-between text-[13px] font-editorial pb-2 mb-3 border-b border-[#0B192C]/15">
                <div className="flex items-center gap-2 font-semibold text-[#0B192C]">
                  <Globe className="w-4 h-4 text-[#C5A059]" />
                  <span>Illuminati Global & National Network</span>
                </div>
                <span className="text-[11px] font-editorial uppercase px-2 py-0.5 bg-[#0B192C] text-[#E6D5B8] rounded-[2px] font-bold">
                  2 Active Hubs
                </span>
              </div>

              <div className="relative w-full aspect-[2000/857] bg-[#F8F4E6] border border-[#0B192C]/20 overflow-hidden select-none rounded-[4px]">
                {/* World Map Vector */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <WorldMapVector className="w-full h-full opacity-60" />
                </div>

                {/* SVG Overlay */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 2000 857">
                  {/* Connection Arc */}
                  <path
                    d="M 429 350 Q 935 150 1442 362"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />

                  {/* Hub Pins */}
                  {ALLIANCE_HUBS.map((hub) => {
                    const isSelected = selectedHub.id === hub.id;
                    return (
                      <g
                        key={hub.id}
                        transform={`translate(${hub.cx}, ${hub.cy})`}
                        onClick={() => {
                          setSelectedHub(hub);
                          playStampSound();
                        }}
                        className="cursor-pointer"
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected ? '28' : '20'}
                          fill={isSelected ? '#C5A059' : '#0B192C'}
                          fillOpacity="0.25"
                          stroke={isSelected ? '#C5A059' : '#0B192C'}
                          strokeWidth="2"
                        />
                        <rect
                          x="-16"
                          y="-16"
                          width="32"
                          height="32"
                          fill={isSelected ? '#0B192C' : '#E6D5B8'}
                          stroke="#0B192C"
                          strokeWidth="2"
                          rx="4"
                        />
                        <text
                          x="0"
                          y="5"
                          textAnchor="middle"
                          fontSize="16"
                          className="select-none"
                        >
                          {hub.flagEmoji}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-editorial text-[#1E3A8A]">
                <span>Click pins on the map to inspect hub details.</span>
                <span>Coordinates: {selectedHub.coordinates}</span>
              </div>
            </div>

            {/* Hub Details Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[6px] space-y-3">
                <div className="flex items-center justify-between border-b border-[#0B192C]/15 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedHub.flagEmoji}</span>
                    <div>
                      <h4 className="font-editorial text-[17px] font-bold text-[#0B192C]">
                        {selectedHub.name}
                      </h4>
                      <div className="text-[12px] font-editorial text-[#1E3A8A]">
                        {selectedHub.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-[14px] font-editorial text-[#0B192C]">
                  <div>
                    <strong className="text-[#1E3A8A] block text-[11px] uppercase tracking-wider">Role & Scope</strong>
                    <span>{selectedHub.role}</span>
                  </div>
                  <div>
                    <strong className="text-[#1E3A8A] block text-[11px] uppercase tracking-wider">Key Initiatives</strong>
                    <span>{selectedHub.activeInitiatives}</span>
                  </div>
                  <div>
                    <strong className="text-[#1E3A8A] block text-[11px] uppercase tracking-wider">Overview</strong>
                    <p className="text-[13px] text-[#1E3A8A] mt-0.5 leading-relaxed">
                      {selectedHub.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0B192C]/15 text-xs font-editorial font-bold text-[#C5A059]">
                  {selectedHub.membersCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Viewport 2: Resolution Builder */}
      {activeTab === 'resolution' && (
        <div className="p-6 bg-[#F8F4E6] border border-[#0B192C] rounded-[8px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5: Builder Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-editorial uppercase font-bold text-[#1E3A8A] block">
                  Simulated Committee
                </label>
                <input
                  type="text"
                  value={resCommittee}
                  onChange={(e) => setResCommittee(e.target.value)}
                  className="w-full px-3 py-2 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[4px] text-sm font-editorial text-[#0B192C] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-editorial uppercase font-bold text-[#1E3A8A] block">
                  Agenda Topic
                </label>
                <input
                  type="text"
                  value={resTopic}
                  onChange={(e) => setResTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[4px] text-sm font-editorial text-[#0B192C] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              {/* Preambulatory Selection */}
              <div className="space-y-2 pt-2 border-t border-[#0B192C]/15">
                <div className="text-xs font-editorial uppercase font-bold text-[#1E3A8A]">
                  Pre-ambulatory Clauses
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {PRE_AMBULATORY_OPTIONS.map((clause, idx) => {
                    const isSelected = selectedPreambs.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedPreambs(prev => 
                            isSelected ? prev.filter(i => i !== idx) : [...prev, idx]
                          );
                          playStampSound();
                        }}
                        className={`w-full p-2 text-left text-xs font-editorial rounded-[3px] border transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#0B192C] text-[#E6D5B8] border-[#0B192C]' 
                            : 'bg-[#E6D5B8] text-[#0B192C] border-[#0B192C]/15 hover:bg-[#F8F4E6]'
                        }`}
                      >
                        {clause}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Operative Selection */}
              <div className="space-y-2 pt-2 border-t border-[#0B192C]/15">
                <div className="text-xs font-editorial uppercase font-bold text-[#1E3A8A]">
                  Operative Clauses
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {OPERATIVE_OPTIONS.map((clause, idx) => {
                    const isSelected = selectedOps.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedOps(prev => 
                            isSelected ? prev.filter(i => i !== idx) : [...prev, idx]
                          );
                          playStampSound();
                        }}
                        className={`w-full p-2 text-left text-xs font-editorial rounded-[3px] border transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#0B192C] text-[#E6D5B8] border-[#0B192C]' 
                            : 'bg-[#E6D5B8] text-[#0B192C] border-[#0B192C]/15 hover:bg-[#F8F4E6]'
                        }`}
                      >
                        {clause}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={copyResolutionText}
                className="w-full py-2.5 px-4 bg-[#0B192C] text-[#E6D5B8] hover:bg-[#C5A059] hover:text-[#0B192C] text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Copied to Clipboard' : 'Copy Draft Resolution'}</span>
              </button>
            </div>

            {/* Right 7: Rendered Resolution & Voting Simulation */}
            <div className="lg:col-span-7 space-y-5">
              {/* Document Sheet */}
              <div className="p-6 bg-[#E6D5B8] border border-[#0B192C]/20 rounded-[6px] space-y-4">
                <div className="flex items-start justify-between border-b border-[#0B192C]/15 pb-3">
                  <div>
                    <span className="text-[11px] font-editorial uppercase tracking-wider text-[#1E3A8A] font-bold">
                      WORKING DRAFT RESOLUTION 1.1
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#0B192C]">
                      {resCommittee}
                    </h3>
                    <p className="text-xs font-editorial text-[#0B192C] mt-0.5">
                      <strong>Topic:</strong> {resTopic}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] ${
                      isResolutionPassed 
                        ? 'bg-[#0B192C] text-[#E6D5B8]' 
                        : 'bg-[#C5A059] text-[#0B192C]'
                    }`}>
                      {isResolutionPassed ? 'STATUS: ADOPTED' : p5Vetoed ? 'STATUS: VETOED' : 'STATUS: PENDING'}
                    </span>
                    <div className="text-[11px] font-editorial text-[#1E3A8A] mt-1 font-medium">
                      {yesVotes} Yes / {noVotes} No / {abstainVotes} Abs
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-editorial p-2.5 bg-[#F8F4E6] rounded-[4px] border border-[#0B192C]/10">
                  <div>
                    <strong className="text-[#0B192C]">Sponsors:</strong> {sponsors.join(', ')}
                  </div>
                  <div>
                    <strong className="text-[#0B192C]">Signatories:</strong> {signatories.join(', ')}
                  </div>
                </div>

                {/* Preambles */}
                <div className="space-y-2 text-sm font-editorial italic text-[#0B192C] leading-relaxed">
                  {selectedPreambs.map(i => (
                    <p key={i}>
                      {PRE_AMBULATORY_OPTIONS[i]}
                    </p>
                  ))}
                </div>

                {/* Operatives */}
                <div className="space-y-2 text-sm font-editorial text-[#0B192C] leading-relaxed border-t border-[#0B192C]/15 pt-3">
                  {selectedOps.map((i, idx) => (
                    <div key={i} className="flex gap-2">
                      <span className="font-bold text-[#C5A059]">{idx + 1}.</span>
                      <p>{OPERATIVE_OPTIONS[i]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roll-call Voting Placards */}
              <div className="p-4 bg-[#E6D5B8] border border-[#0B192C]/15 rounded-[6px] space-y-3">
                <div className="flex items-center justify-between border-b border-[#0B192C]/15 pb-2">
                  <div className="flex items-center gap-2 font-editorial text-sm font-bold text-[#0B192C]">
                    <Vote className="w-4 h-4 text-[#C5A059]" />
                    <span>Roll-Call Voting (Click country to cycle vote)</span>
                  </div>
                  <span className="text-xs font-editorial text-[#1E3A8A]">
                    9+ Yes votes & No P5 Veto required
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {SAMPLE_COUNTRIES.map((c) => {
                    const vote = votes[c.name];
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => toggleVote(c.name)}
                        className={`p-2 text-left border rounded-[3px] transition-colors cursor-pointer ${
                          vote === 'Yes'
                            ? 'bg-[#0B192C] text-[#E6D5B8] border-[#0B192C]'
                            : vote === 'No'
                            ? 'bg-[#C5A059] text-[#0B192C] border-[#C5A059] font-bold'
                            : 'bg-[#F8F4E6] text-[#0B192C] border-[#0B192C]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span>{c.code}</span>
                          {c.isP5 && <span className="text-[#C5A059]">P5</span>}
                        </div>
                        <div className="text-xs truncate font-medium mt-0.5">{c.name}</div>
                        <div className="text-[10px] mt-1 uppercase font-semibold">
                          {vote}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const WarRoomMap = DiplomaticCanvasWarRoom;
