import React, { useState } from 'react';
import { 
  MessageSquare, ExternalLink, Copy, Check, 
  RefreshCw, Compass
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface DiplomaticDeskInteractiveProps {
  onOpenRegister?: () => void;
}

// Fast RoP (Rules of Procedure) scenarios for delegates
const ROP_SCENARIOS = [
  {
    id: 1,
    question: "A delegate introduces factual statistics that directly contradict an official UN treaty. What is the most appropriate point to raise?",
    options: [
      "Point of Personal Privilege",
      "Point of Order",
      "Point of Parliamentary Inquiry",
      "Right of Reply"
    ],
    correctIndex: 1,
    explanation: "Point of Order is raised to address procedural errors or factual/procedural irregularities according to standard UNA-USA & HMUN rules."
  },
  {
    id: 2,
    question: "You need 15 minutes of informal negotiation to draft working papers and form a draft resolution coalition. Which motion should you propose?",
    options: [
      "Motion for a Moderated Caucus",
      "Motion for an Unmoderated Caucus",
      "Motion to Table the Debate",
      "Motion to Divide the Question"
    ],
    correctIndex: 1,
    explanation: "An Unmoderated Caucus allows delegates to leave their seats, hold bilateral consultations, and draft working papers collaboratively."
  },
  {
    id: 3,
    question: "Another delegate explicitly insults your head of state during their GSL speech. What diplomatic procedure is available?",
    options: [
      "Point of Information to the Speaker",
      "Motion to Adjourn the Meeting",
      "Right of Reply (submitted in writing to the Chair)",
      "Appeal the Decision of the Chair"
    ],
    correctIndex: 2,
    explanation: "A Right of Reply is requested when the national dignity or sovereignty of a delegation has been severely impugned in formal speech."
  },
  {
    id: 4,
    question: "What is the standard majority required to pass a substantive Draft Resolution in the United Nations General Assembly?",
    options: [
      "Simple Majority (50% + 1 of present and voting)",
      "Two-Thirds Majority (on important questions)",
      "Unanimous Consensus",
      "Absolute Majority of all registered member states"
    ],
    correctIndex: 0,
    explanation: "Most General Assembly substantive resolutions require a Simple Majority of delegations present and voting, except designated charter 'Important Questions' which require Two-Thirds."
  },
  {
    id: 5,
    question: "During formal debate, a delegate cannot hear the speaker due to room air conditioning noise. What point must be raised immediately?",
    options: [
      "Point of Parliamentary Inquiry",
      "Point of Order",
      "Point of Personal Privilege",
      "Point of Information"
    ],
    correctIndex: 2,
    explanation: "Point of Personal Privilege relates to the delegate's personal physical comfort and audibility, and may interrupt a speaker if it pertains to audibility."
  }
];

export const DiplomaticDeskInteractive: React.FC<DiplomaticDeskInteractiveProps> = ({ 
  onOpenRegister: _onOpenRegister 
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'connect' | 'quiz'>('connect');
  
  // WhatsApp Link Copy State
  const [copiedLink, setCopiedLink] = useState(false);
  const whatsappUrl = "https://chat.whatsapp.com/KQkd0gqiUZ0DjaAGdePF3C";

  // RoP Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleCopyWhatsAppLink = () => {
    navigator.clipboard.writeText(whatsappUrl);
    setCopiedLink(true);
    showToast({
      title: "Community Invite Copied",
      message: "Official WhatsApp Community link copied to clipboard!",
      type: "success"
    });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSelectQuizOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === ROP_SCENARIOS[currentQuestionIdx].correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      showToast({
        title: "Point Sustained",
        message: "Correct Rules of Procedure answer! +10 Diplomatic Honor",
        type: "success"
      });
    } else {
      setStreak(0);
      showToast({
        title: "Point Overruled",
        message: "Consult standard UN Rules of Procedure for clarification.",
        type: "info"
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setCurrentQuestionIdx((prev) => (prev + 1) % ROP_SCENARIOS.length);
  };

  const currentQ = ROP_SCENARIOS[currentQuestionIdx];

  return (
    <div className="w-full bg-[#F8F4E6] border border-[#0B192C] rounded-[8px] overflow-hidden shadow-sm flex flex-col font-editorial">
      
      {/* Top Banner Header / Interactive Modes Bar */}
      <div className="bg-[#E6D5B8] border-b border-[#0B192C] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-mono-tag font-bold text-[11px] uppercase tracking-wider text-[#0B192C]">
            ILLUMINATI DIPLOMATIC HUB & WORKBENCH
          </span>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center gap-1 bg-[#F8F4E6] p-0.5 rounded-[4px] border border-[#0B192C]/40 text-[10px] font-mono-tag">
          <button
            type="button"
            onClick={() => setActiveTab('connect')}
            className={`px-2.5 py-1 rounded-[2px] transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === 'connect'
                ? 'bg-[#0B192C] text-[#F8F4E6]'
                : 'text-[#1E3A8A] hover:text-[#0B192C]'
            }`}
          >
            <MessageSquare className="w-3 h-3 text-[#25D366]" />
            <span>CONNECT</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-2.5 py-1 rounded-[2px] transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#0B192C] text-[#F8F4E6]'
                : 'text-[#1E3A8A] hover:text-[#0B192C]'
            }`}
          >
            <Compass className="w-3 h-3 text-[#C5A059]" />
            <span>ROP DRILL</span>
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="p-4 sm:p-5">
        
        {/* 1. CONNECT TAB: WhatsApp Official Group & Network */}
        {activeTab === 'connect' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0B192C]/15 pb-3">
              <div>
                <div className="text-[10px] font-mono-tag font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  OFFICIAL DELEGATE DISPATCH
                </div>
                <h3 className="font-canopee text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight mt-0.5">
                  CONNECT WITH ILLUMINATI MUN
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#E6D5B8] border border-[#0B192C]/30 text-[10px] font-mono-tag font-semibold text-[#0B192C] rounded-[2px]">
                  750+ MEMBERS
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono-tag font-semibold rounded-[2px]">
                  ACTIVE CIRCUIT
                </span>
              </div>
            </div>

            <p className="font-editorial text-[13.5px] text-[#1E3A8A] leading-relaxed">
              Join our primary WhatsApp diplomatic network for priority conference alerts, committee study guide drops, turnkey EB opportunities, and direct mentoring with national circuit gaveliers.
            </p>

            {/* Core Motto Accent Inside Connect */}
            <div className="bg-[#E6D5B8]/70 border border-[#0B192C]/30 p-2.5 rounded-[4px] flex items-center justify-between text-xs">
              <span className="font-mono-tag text-[10px] uppercase text-[#1E3A8A] font-bold">OUR CORE MOTTO</span>
              <span className="font-editorial-italic font-bold text-[#0B192C] text-[13px] tracking-wide">
                DEBATE • NEGOTIATE • UNITE
              </span>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0B192C] hover:bg-[#25D366] text-[#F8F4E6] hover:text-[#0B192C] font-mono-tag font-bold text-xs uppercase tracking-wider rounded-[4px] border border-[#0B192C] transition-all duration-200 group shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:text-[#0B192C] transition-colors" />
                <span>JOIN WHATSAPP GROUP</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>

              <button
                type="button"
                onClick={handleCopyWhatsAppLink}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F8F4E6] hover:bg-[#E6D5B8] text-[#0B192C] font-mono-tag font-bold text-xs uppercase tracking-wider rounded-[4px] border border-[#0B192C] transition-all duration-150 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>INVITE LINK COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#1E3A8A]" />
                    <span>COPY INVITE LINK</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* 2. ROP DRILL TAB: Rules of Procedure Scenario Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#0B192C]/15 pb-2.5 text-xs">
              <div className="flex items-center gap-2 font-mono-tag">
                <span className="font-bold text-[#C5A059]">QUESTION {currentQuestionIdx + 1} / {ROP_SCENARIOS.length}</span>
                <span className="text-[#1E3A8A]">| SCORE: <strong className="text-[#0B192C]">{score} PTS</strong></span>
              </div>
              {streak > 1 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-mono-tag text-[10px] font-bold rounded-[2px]">
                  🔥 {streak}X COMBO
                </span>
              )}
            </div>

            <div className="font-editorial text-[14px] text-[#0B192C] font-semibold leading-snug">
              {currentQ.question}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-[#F8F4E6] border-[#0B192C]/40 text-[#0B192C] hover:bg-[#E6D5B8]";
                if (hasAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "bg-emerald-100 border-emerald-700 text-emerald-950 font-bold";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-100 border-rose-600 text-rose-950";
                  } else {
                    btnStyle = "bg-[#F8F4E6]/50 border-gray-300 text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuizOption(idx)}
                    disabled={hasAnswered}
                    className={`p-2.5 text-left border rounded-[4px] text-xs font-editorial transition-all cursor-pointer flex items-start gap-2 ${btnStyle}`}
                  >
                    <span className="font-mono-tag text-[10px] font-bold text-[#1E3A8A] shrink-0 mt-0.5">
                      [{String.fromCharCode(65 + idx)}]
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className="p-3 bg-[#E6D5B8] border border-[#0B192C]/30 rounded-[4px] text-xs font-editorial space-y-2">
                <div className="text-[#0B192C] font-medium leading-relaxed">
                  <strong>Secretariat Ruling:</strong> {currentQ.explanation}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-3 py-1 bg-[#0B192C] text-[#F8F4E6] text-[11px] font-mono-tag font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C5A059] hover:text-[#0B192C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>NEXT DRILL</span>
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
