import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Mail, Phone, Building2, Sparkles, Shield, 
  CheckCircle2, MessageSquare, Send, ArrowLeft, Award, BookOpen, 
  Globe, ChevronRight, Copy, Check, Video, MapPin, Star, UserCheck, Loader2
} from 'lucide-react';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useToast } from '../../context/ToastContext';
import { PageId } from '../../types';
import { createSessionBooking } from '../../services/bookingService';

interface BookSessionSectionProps {
  onNavigate?: (page: PageId) => void;
}

interface SessionCategory {
  id: string;
  title: string;
  badge: string;
  duration: string;
  tagline: string;
  description: string;
  outcomes: string[];
}

const SESSION_CATEGORIES: SessionCategory[] = [
  {
    id: 'delegate-mastery',
    title: '1-on-1 Delegate Strategy & Gavel Masterclass',
    badge: 'FOR DELEGATES',
    duration: '45-60 MIN',
    tagline: 'Comprehensive foreign policy prep, resolution drafting & caucus leadership.',
    description: 'Personalized strategic consultation for delegates seeking Best Delegate awards in General Assemblies, Specialized Agencies, and Crisis Committees.',
    outcomes: [
      'Tailored Country Policy & Strategic Positioning review',
      'High-impact GSL / Opening Speech refinement & rhetorical hook building',
      'Unmoderated caucus bloc-formation and negotiation blueprints',
      'Crisis arc formulation, directive drafting, and counter-intel tactics'
    ]
  }
];

export const BookSessionSection: React.FC<BookSessionSectionProps> = ({ onNavigate }) => {
  const { showSuccess } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('delegate-mastery');
  const [sessionFormat, setSessionFormat] = useState<'virtual' | 'in-person'>('virtual');
  
  // Form fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('Intermediate (3-7 Conferences)');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('Evening (6:00 PM – 9:00 PM IST)');
  const [goals, setGoals] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    id: string;
    name: string;
    categoryTitle: string;
    format: string;
    preferredDate: string;
    timeSlot: string;
    timestamp: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCategorySelect = (id: string) => {
    playTypewriterSound();
    setSelectedCategory(id);
  };

  const handleFormatSelect = (fmt: 'virtual' | 'in-person') => {
    playTypewriterSound();
    setSessionFormat(fmt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert('Please provide your name, email, and phone number for session confirmation.');
      return;
    }

    setIsSubmitting(true);
    playStampSound();

    const categoryObj = SESSION_CATEGORIES.find(c => c.id === selectedCategory) || SESSION_CATEGORIES[0];

    try {
      const { bookingRef } = await createSessionBooking({
        category: categoryObj.title,
        sessionFormat,
        fullName,
        email,
        phone,
        institution,
        experienceLevel,
        preferredDate: preferredDate || 'Earliest Available Slot',
        preferredTimeSlot,
        goals,
      });

      setSubmittedBooking({
        id: bookingRef,
        name: fullName,
        categoryTitle: categoryObj.title,
        format: sessionFormat === 'virtual' ? 'Virtual Diplomatic Room (Google Meet / Zoom)' : 'In-Person Consultation (Bhubaneswar / Regional)',
        preferredDate: preferredDate || 'Earliest Available Slot',
        timeSlot: preferredTimeSlot,
        timestamp: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });

      // Trigger subtle success toast notification
      showSuccess(
        'Founder Session Booked',
        `1-on-1 Strategic Session confirmed with Subhrakant Biswal for ${fullName}.`,
        bookingRef
      );
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Session booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!submittedBooking) return;
    navigator.clipboard.writeText(submittedBooking.id);
    setCopiedCode(true);
    playTypewriterSound();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetBooking = () => {
    playStampSound();
    setSubmittedBooking(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setInstitution('');
    setGoals('');
    setPreferredDate('');
  };

  return (
    <section className="space-y-8 animate-in fade-in duration-300 overflow-x-clip">
      {/* Top Banner with Navigation & Classification Badge */}
      <ScrollReveal direction="left" distance={80} duration={0.8}>
        <div className="comic-panel p-6 bg-[#F8F4E6] text-[#0B192C] border-2 border-[#0B192C] space-y-3 relative shadow-[5px_5px_0px_#C5A059]">
          <div className="flex flex-wrap items-center justify-end gap-3 border-b border-[#0B192C]/20 pb-3">
            {onNavigate && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playTypewriterSound();
                    onNavigate('home');
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono-tag font-bold text-[#F8F4E6] bg-[#0B192C] px-3 py-1 border border-[#0B192C] hover:bg-[#C5A059] transition-colors cursor-pointer"
                  title="Return to Home Page"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>RETURN TO HOME</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTypewriterSound();
                    onNavigate('founder');
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono-tag font-bold text-[#0B192C] hover:text-[#C5A059] transition-colors cursor-pointer px-2 py-1"
                  title="Return to Founder Dossier"
                >
                  <span>← FOUNDER PROFILE</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-1">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B192C] tracking-tight uppercase skew-heading">
              Book a 1-on-1 Strategic Session with Founder
            </h2>
            <p className="text-xs sm:text-sm font-mono-tag text-[#0B192C] mt-1 max-w-3xl leading-relaxed font-medium">
              Direct personal mentorship and conference advisory with <strong className="text-[#C5A059]">Subhrakant Biswal</strong> (Founder & Senior Advisor, 2023 Governor Awardee, 60+ MUNs, 1,000+ Delegates Mentored Worldwide).
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* SUCCESS CONFIRMATION RECEIPT */}
      {submittedBooking ? (
        <div className="comic-panel p-6 sm:p-8 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-6 hard-stamp shadow-[6px_6px_0px_#0B192C] animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C5A059] text-[#F8F4E6] flex items-center justify-center border-2 border-[#0B192C]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tag font-black text-[#C5A059] uppercase">
                  APPOINTMENT DISPATCHED // PENDING FINAL CLEARANCE
                </span>
                <h3 className="font-display font-black text-xl text-[#0B192C]">
                  Session Request Logged Successfully
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono-tag text-[#1E3A8A] block">TRACKING REFERENCE</span>
              <div className="flex items-center gap-1.5 font-mono-tag font-black text-sm text-[#0B192C] bg-[#F8F4E6] px-2.5 py-1 border border-[#0B192C]">
                <span>{submittedBooking.id}</span>
                <button
                  onClick={handleCopyCode}
                  title="Copy Reference Code"
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#C5A059]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F4E6] p-5 border-2 border-[#0B192C] space-y-3 font-mono-tag text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[#1E3A8A] text-[10px] block">CLIENT DIPLOMAT:</span>
                <strong className="text-[#0B192C] text-sm">{submittedBooking.name}</strong>
              </div>
              <div>
                <span className="text-[#1E3A8A] text-[10px] block">SESSION FOCUS:</span>
                <strong className="text-[#C5A059] text-sm">{submittedBooking.categoryTitle}</strong>
              </div>
              <div>
                <span className="text-[#1E3A8A] text-[10px] block">MEETING FORMAT:</span>
                <span className="text-[#0B192C] font-bold">{submittedBooking.format}</span>
              </div>
              <div>
                <span className="text-[#1E3A8A] text-[10px] block">PREFERRED TIME WINDOW:</span>
                <span className="text-[#0B192C] font-bold">{submittedBooking.preferredDate} ({submittedBooking.timeSlot})</span>
              </div>
            </div>

            <div className="border-t border-[#0B192C]/30 pt-3 text-[11px] text-[#1E3A8A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
              <span>
                Our secretariat will review Subhrakant's diplomatic calendar and transmit your formal calendar invitation & meeting link via email / WhatsApp within 6–12 hours.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919938833909?text=Hello%20Subhrakant,%20I%20have%20booked%20a%20session%20with%20you%20(Ref:%20${submittedBooking.id})%20for%20${encodeURIComponent(submittedBooking.categoryTitle)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-case-stamp px-4 py-2.5 text-xs flex items-center gap-2 font-black tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#F8F4E6]" />
                <span>CONFIRM INSTANTLY VIA WHATSAPP</span>
              </a>

              <a
                href={`mailto:Subhrakantbiswal2003@gmail.com?subject=Session%20Booking%20Confirmation%20%5B${submittedBooking.id}%5D&body=Hello%20Subhrakant,%0A%0AI%20have%20submitted%20a%201-on-1%20session%20booking%20request%20with%20reference%20code%20${submittedBooking.id}.%0A%0AName:%20${encodeURIComponent(submittedBooking.name)}%0ACategory:%20${encodeURIComponent(submittedBooking.categoryTitle)}%0AFormat:%20${encodeURIComponent(submittedBooking.format)}`}
                className="px-4 py-2.5 bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#F8F4E6] text-[#0B192C] border-2 border-[#0B192C] text-xs font-mono-tag font-bold transition-all cursor-pointer hard-stamp"
              >
                <Mail className="w-4 h-4 inline mr-1.5" />
                TRANSMIT VIA EMAIL
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetBooking}
                className="px-3 py-2 text-xs font-mono-tag font-bold text-[#1E3A8A] hover:text-[#C5A059] underline cursor-pointer"
              >
                Book Another Session
              </button>
              {onNavigate && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="px-3 py-2 bg-[#C5A059] text-[#F8F4E6] text-xs font-mono-tag font-black border border-[#0B192C] cursor-pointer hover:bg-[#0B192C] transition-colors"
                  >
                    Return to Home
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('founder')}
                    className="px-3 py-2 bg-[#0B192C] text-[#F8F4E6] text-xs font-mono-tag font-black border border-[#0B192C] cursor-pointer hover:bg-[#C5A059] transition-colors"
                  >
                    Return to Founder Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* BOOKING WORKFLOW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Founder Statement & Session Category Cards (5 cols) */}
          <ScrollReveal direction="left" distance={90} duration={0.85} className="lg:col-span-5 space-y-6">
            {/* Founder Note Card */}
            <div className="comic-panel p-5 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-3 hard-stamp shadow-[4px_4px_0px_#0B192C]">
              <div className="flex items-center gap-2 text-xs font-mono-tag font-black text-[#C5A059] uppercase">
                <Shield className="w-4 h-4" />
                DIRECT MENTORSHIP PROTOCOL
              </div>
              <p className="font-editorial-italic text-[15px] sm:text-[17px] text-[#0B192C] leading-relaxed">
                "Every aspiring diplomat has a distinctive voice. In our 1-on-1 sessions, we strip away generic textbook theory and focus strictly on high-leverage caucus strategy, persuasive speechwriting, crisis room psychology, and institutional leadership."
              </p>
              <div className="pt-2 border-t border-[#0B192C]/30 flex items-center justify-between text-[11px] font-mono-tag">
                <span className="font-black text-[#0B192C]">— Subhrakant Biswal</span>
                <span className="text-[#C5A059] font-bold">2023 GOVERNOR AWARDEE</span>
              </div>
            </div>

            {/* Session Type Selectors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-black text-sm uppercase text-[#0B192C] tracking-wider flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#C5A059]" />
                  SELECT CONSULTATION CATEGORY
                </h4>
                <span className="text-[10px] font-mono-tag text-[#1E3A8A] font-bold">STEP 1 OF 2</span>
              </div>

              <div className="space-y-3">
                {SESSION_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`p-4 border-2 transition-all cursor-pointer hard-stamp ${
                        isSelected
                          ? 'bg-[#F8F4E6] border-[#C5A059] shadow-[4px_4px_0px_#C5A059]'
                          : 'bg-[#F8F4E6]/60 hover:bg-[#F8F4E6] border-[#0B192C]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block bg-[#0B192C] text-[#F8F4E6] px-2 py-0.5 text-[9px] font-mono-tag font-bold">
                            {cat.badge}
                          </span>
                          <h5 className="font-display font-black text-sm text-[#0B192C] mt-1">
                            {cat.title}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono-tag font-bold text-[#C5A059] bg-[#F8F4E6] px-2 py-0.5 border border-[#0B192C] flex-shrink-0">
                          {cat.duration}
                        </span>
                      </div>

                      <p className="text-[11px] font-sans text-[#1E3A8A] mt-2 leading-relaxed">
                        {cat.tagline}
                      </p>

                      {isSelected && (
                        <div className="mt-3 pt-2.5 border-t border-[#0B192C]/30 space-y-1.5 animate-in fade-in duration-200">
                          <span className="text-[10px] font-mono-tag font-black text-[#C5A059] uppercase block">
                            WHAT WE COVER IN THIS SESSION:
                          </span>
                          {cat.outcomes.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#0B192C] font-sans">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="p-4 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-2 text-xs font-mono-tag">
              <div className="font-black text-[#0B192C] uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C5A059]" />
                FOUNDER'S MENTORSHIP RECORD
              </div>
              <ul className="text-[11px] text-[#1E3A8A] space-y-1">
                <li>• <strong>7 Years</strong> Continuous Active Circuit Experience</li>
                <li>• <strong>60+ Conferences</strong> Chaired, Mentored & Organized</li>
                <li>• <strong>1,000+ Students</strong> Mentored Across India & Globally</li>
                <li>• <strong>ODMMUN & FBSMUN</strong> Senior Institutional Advisor</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Booking Appointment Form (7 cols) */}
          <ScrollReveal direction="right" distance={90} duration={0.85} className="lg:col-span-7">
            <div className="comic-panel p-6 sm:p-7 bg-[#F8F4E6] border-3 border-[#0B192C] space-y-6 hard-stamp shadow-[5px_5px_0px_#0B192C]">
              <div className="flex items-center justify-between border-b-2 border-[#0B192C] pb-3">
                <div>
                  <span className="text-[10px] font-mono-tag font-black text-[#C5A059] uppercase">
                    CONFIDENTIAL DISPATCH // DIRECT APPOINTMENT
                  </span>
                  <h3 className="font-display font-black text-xl text-[#0B192C] uppercase">
                    Schedule Your Session
                  </h3>
                </div>
                <div className="w-8 h-8 bg-[#0B192C] text-[#F8F4E6] flex items-center justify-center font-black text-xs border-2 border-[#0B192C]">
                  Δ
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Meeting Format Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase block">
                    1. Preferred Consultation Format:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleFormatSelect('virtual')}
                      className={`p-3 border-2 flex items-center gap-2 text-left cursor-pointer transition-all ${
                        sessionFormat === 'virtual'
                          ? 'bg-[#0B192C] text-[#F8F4E6] border-[#0B192C] hard-stamp'
                          : 'bg-[#F8F4E6] text-[#0B192C] border-[#0B192C] hover:bg-[#F8F4E6]'
                      }`}
                    >
                      <Video className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <div>
                        <div className="font-mono-tag font-black text-xs">VIRTUAL DIPLOMATIC ROOM</div>
                        <div className={`text-[10px] ${sessionFormat === 'virtual' ? 'text-[#E6D5B8]' : 'text-[#1E3A8A]'}`}>
                          Google Meet / Zoom (Global)
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFormatSelect('in-person')}
                      className={`p-3 border-2 flex items-center gap-2 text-left cursor-pointer transition-all ${
                        sessionFormat === 'in-person'
                          ? 'bg-[#0B192C] text-[#F8F4E6] border-[#0B192C] hard-stamp'
                          : 'bg-[#F8F4E6] text-[#0B192C] border-[#0B192C] hover:bg-[#F8F4E6]'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <div>
                        <div className="font-mono-tag font-black text-xs">IN-PERSON CONSULTATION</div>
                        <div className={`text-[10px] ${sessionFormat === 'in-person' ? 'text-[#E6D5B8]' : 'text-[#1E3A8A]'}`}>
                          Bhubaneswar / Regional Circuit
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C5A059]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Advait Patnaik"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. delegate@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Institution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      School / University / Affiliation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. KIIT Law School / ODM Public School"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-1">
                  <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase block">
                    Your Current MUN / Circuit Experience:
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none cursor-pointer"
                  >
                    <option>First-Timer (0-1 Conferences)</option>
                    <option>Intermediate Delegate (2-5 Conferences)</option>
                    <option>Experienced Delegate (6-10 Conferences)</option>
                    <option>Executive Board / Crisis Director aspirant</option>
                    <option>Secretary General / Secretariat Member</option>
                    <option>Faculty Advisor / Teacher Coordinator</option>
                  </select>
                </div>

                {/* Preferred Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      Preferred Date Window
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      Preferred Time Slot (IST)
                    </label>
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none cursor-pointer"
                    >
                      <option>Morning (10:00 AM – 1:00 PM IST)</option>
                      <option>Afternoon (2:00 PM – 5:00 PM IST)</option>
                      <option>Evening (6:00 PM – 9:00 PM IST)</option>
                      <option>Late Evening (9:00 PM – 11:00 PM IST)</option>
                      <option>Weekend Intensive Slot</option>
                    </select>
                  </div>
                </div>

                {/* Goals & Focus Topics */}
                <div className="space-y-1">
                  <label className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                    Specific Goals / Topics you wish to discuss with Subhrakant:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need assistance with my upcoming UNSC portfolio on Indo-Pacific maritime security, improving my unmod speaking style, or reviewing our school's upcoming MUN budget structure..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="w-full bg-[#F8F4E6] border-2 border-[#0B192C] px-3 py-2 text-xs font-mono-tag text-[#0B192C] focus:bg-[#F8F4E6] focus:border-[#C5A059] outline-none resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-case-stamp py-3.5 text-xs flex items-center justify-center gap-2 font-black tracking-wider cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#F8F4E6] border-t-transparent animate-spin" />
                      <span>DISPATCHING APPOINTMENT CABLE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#F8F4E6]" />
                      <span>CONFIRM & DISPATCH SESSION REQUEST</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Alternative Inquiries */}
              <div className="p-3.5 bg-[#F8F4E6] border border-[#0B192C] text-[11px] font-mono-tag flex flex-wrap items-center justify-between gap-2">
                <span className="text-[#1E3A8A]">Urgent or institutional query?</span>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:Subhrakantbiswal2003@gmail.com"
                    className="font-bold text-[#C5A059] hover:underline"
                  >
                    Subhrakantbiswal2003@gmail.com
                  </a>
                  <span className="text-[#0B192C]">|</span>
                  <a
                    href="tel:+919556875714"
                    className="font-bold text-[#0B192C] hover:underline"
                  >
                    +91 95568 75714
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      )}
    </section>
  );
};
