import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { playTypewriterSound, playStampSound } from '../../utils/audio';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  FileQuestion, 
  Sparkles, 
  BookOpen, 
  Users, 
  School,
  Lock,
  Unlock
} from 'lucide-react';

interface FAQItem {
  id: string;
  refCode: string;
  category: 'participation' | 'methodology' | 'desk';
  categoryLabel: string;
  question: string;
  answer: string;
  classification: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    refCode: 'DOSSIER // FAQ-01',
    category: 'participation',
    categoryLabel: 'ELIGIBILITY & DELEGATES',
    question: 'Who is eligible to participate in Illuminati MUN sessions and cohorts?',
    answer: 'Participation is open to middle school, high school, and collegiate scholars aged 12–24 across India and international circuits. Both individual independent delegates and school delegations are eligible. First-time delegates receive foundational Rule of Procedure (RoP) masterclasses before entering committee.',
    classification: 'DELEGATE CLEARANCE // OPEN',
  },
  {
    id: 'faq-2',
    refCode: 'DOSSIER // FAQ-02',
    category: 'methodology',
    categoryLabel: 'METHODOLOGY & CRISIS',
    question: 'What is the proprietary Illuminati diplomacy methodology?',
    answer: 'Unlike rote academic simulations, our methodology prioritizes dynamic crisis management, directive drafting, rapid multilateral lobbying, and real-time press leaks. Delegates learn psychological negotiation, coalition architecture, and high-impact oratory derived from real-world diplomatic crises.',
    classification: 'TACTICAL DOCTRINE // LEVEL 2',
  },
  {
    id: 'faq-3',
    refCode: 'DOSSIER // FAQ-03',
    category: 'desk',
    categoryLabel: 'SCHOOL ALLIANCE & HOSTING',
    question: 'Can schools invite the Illuminati Society to host a MUN on their campus?',
    answer: 'Yes. Through the "MUN Desk Arrangement", our Executive Secretariat provides end-to-end conference incubation: comprehensive background guides, Executive Board staffing, dais training, delegate orientation workshops, and event logistics customized for your institution.',
    classification: 'CAMPUS ARRANGEMENT // VERIFIED',
  },
  {
    id: 'faq-4',
    refCode: 'DOSSIER // FAQ-04',
    category: 'methodology',
    categoryLabel: 'CERTIFICATION & AWARDS',
    question: 'Are certificates, awards, and performance analytics provided?',
    answer: 'All registered participants receive official verified certificates of completion from the Illuminati International MUN Society. Outstanding delegates, High Commendations, Best Position Papers, and Verbal Mentions receive ceremonial gavels and classified commendation plaques.',
    classification: 'AUTHENTICATION // ISO-DIPLOMA',
  },
  {
    id: 'faq-5',
    refCode: 'DOSSIER // FAQ-05',
    category: 'participation',
    categoryLabel: 'PREPARATION & STUDY GUIDES',
    question: 'What preparation resources do delegates receive after registration?',
    answer: 'Upon confirmation, delegates receive a classified Committee Dossier containing exhaustive Background Guides, Country Matrix Portfolios, procedural cheat sheets, and access to private preparatory webinars and mock unmoderated caucus simulations.',
    classification: 'INTEL DOSSIER // DISPATCHED',
  },
];

interface FAQSectionProps {
  onContactClick?: () => void;
  onRegisterClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick, onRegisterClick }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeFilter, setActiveFilter] = useState<'all' | 'participation' | 'methodology' | 'desk'>('all');

  const toggleFAQ = (id: string) => {
    if (openId === id) {
      setOpenId(null);
      playTypewriterSound();
    } else {
      setOpenId(id);
      playStampSound();
    }
  };

  const filteredFAQs = activeFilter === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter((item) => item.category === activeFilter);

  return (
    <section id="panel-faq-section" className="relative my-8 select-none overflow-x-clip">
      {/* Compact Dossier Frame */}
      <div className="broadsheet-card p-6 relative">
        {/* Top Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0B192C]/15 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A059] text-[#E6D5B8] rounded-[2.88px]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-canopee text-3xl sm:text-4xl uppercase tracking-[-0.03em] text-[#0B192C] leading-[0.85] m-0">
                Frequently Asked Inquiries
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 font-editorial text-[13px]">
            <span className="badge-new">DECLASSIFIED</span>
            <span className="text-[#1E3A8A] hidden sm:inline">5 Core Protocols</span>
          </div>
        </div>

        {/* Compact Category Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[12px] font-editorial uppercase tracking-wider text-[#1E3A8A] mr-1 hidden sm:inline">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'participation', label: 'Eligibility & Delegates' },
            { id: 'methodology', label: 'Methodology' },
            { id: 'desk', label: 'School MUN Desk' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id as any);
                playTypewriterSound();
              }}
              className={`px-3 py-1.5 text-[13px] font-editorial rounded-[2.88px] transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#0B192C] text-[#E6D5B8]'
                  : 'bg-[#E6D5B8] text-[#0B192C] hover:bg-[#F8F4E6] border border-[#0B192C]/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFAQs.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`border rounded-[2.88px] transition-all duration-200 ${
                  isOpen 
                    ? 'bg-[#E6D5B8] border-[#0B192C]' 
                    : 'bg-[#E6D5B8]/60 border-[#0B192C]/15 hover:bg-[#E6D5B8]'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span
                      className={`text-[11px] font-editorial px-2 py-0.5 rounded-[2.88px] shrink-0 mt-0.5 sm:mt-0 font-medium ${
                        isOpen
                          ? 'bg-[#C5A059] text-[#E6D5B8]'
                          : 'bg-[#F8F4E6] text-[#0B192C]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-editorial text-[#1E3A8A] uppercase tracking-wider">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h4 className="font-editorial text-base sm:text-lg text-[#0B192C] font-medium leading-snug group-hover:text-[#C5A059] transition-colors">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] font-editorial text-[#1E3A8A] hidden sm:inline">
                      {isOpen ? 'Close' : 'Read'}
                    </span>
                    <div
                      className={`p-1.5 rounded-[2.88px] transition-transform duration-200 ${
                        isOpen ? 'bg-[#0B192C] text-[#E6D5B8] rotate-180' : 'bg-[#F8F4E6] text-[#0B192C]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Foldable Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-[#0B192C]/10">
                        <div className="bg-[#F8F4E6]/40 p-4 rounded-[2.88px] border border-[#0B192C]/10 text-[14px] font-editorial text-[#0B192C] leading-relaxed relative">
                          <p>{faq.answer}</p>

                          <div className="mt-3 pt-3 border-t border-[#0B192C]/10 flex flex-wrap items-center justify-between gap-2 text-[12px] font-editorial">
                            <span className="text-[#C5A059] flex items-center gap-1.5 font-medium">
                              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                              {faq.classification}
                            </span>
                            <span className="text-[#1E3A8A]">
                              Archive Status: Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Micro Support Banner */}
        <div className="mt-6 pt-4 border-t border-[#0B192C]/15 flex flex-wrap items-center justify-between gap-2 text-[13px] font-editorial">
          <span className="text-[#1E3A8A]">
            Have an unlisted diplomatic inquiry?
          </span>
          <div className="flex items-center gap-2">
            {onContactClick && (
              <button
                onClick={() => {
                  playStampSound();
                  onContactClick();
                }}
                className="px-4 py-1.5 text-[13px] font-editorial bg-[#0B192C] text-[#E6D5B8] hover:bg-[#C5A059] rounded-[2.88px] transition-colors cursor-pointer"
              >
                Contact Secretariat →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
