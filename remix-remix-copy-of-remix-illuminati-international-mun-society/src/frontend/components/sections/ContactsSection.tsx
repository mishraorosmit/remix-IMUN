import React, { useState } from 'react';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Shield, CheckCircle2, Globe, Sparkles, ExternalLink, HelpCircle, Loader2 } from 'lucide-react';
import { transmitDiplomaticCable } from '../../services/contactService';

export const ContactsSection: React.FC = () => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    institution: '',
    inquiryType: 'Delegate Registration & Query',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [transmissionCode, setTransmissionCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const inquiryOptions = [
    'Delegate Registration & Query',
    'Institutional Partnership / School MUN Support',
    'Masterclass & Mentorship Enrollment',
    'International Exchange & Collaboration',
    'Executive Board & Chair Applications',
    'Press & Media Inquiries',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) return;

    setIsSubmitting(true);
    playStampSound();

    try {
      const { transmissionCode: code } = await transmitDiplomaticCable(formData);
      setTransmissionCode(code);
      setSubmitted(true);

      showSuccess(
        'Diplomatic Cable Transmitted',
        `Inquiry from ${formData.senderName} received and logged at the Secretariat desk.`,
        code
      );
    } catch (err) {
      console.error('Failed to transmit diplomatic cable:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    playTypewriterSound();
    setSubmitted(false);
    setFormData({
      senderName: '',
      senderEmail: '',
      institution: '',
      inquiryType: 'Delegate Registration & Query',
      message: '',
    });
  };

  return (
    <section id="panel-contacts" className="scroll-mt-24 space-y-6 overflow-x-clip">


      {/* Main Grid: Contact Channels (Left) & Transmission Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Direct Channels & Chapter Headquarters */}
        <ScrollReveal direction="left" distance={90} duration={0.85} className="lg:col-span-5 space-y-4">
          {/* Official Secretariat Channels Box */}
          <div className="comic-panel p-6 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#0B192C]/30 pb-2">
              <Shield className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-display font-black text-base text-[#0B192C] uppercase tracking-wide">
                Secretariat Diplomatic Desk
              </h3>
            </div>

            <div className="space-y-3 font-sans">
              <div className="flex items-start gap-3 p-3 bg-[#F8F4E6] border border-[#0B192C]">
                <Mail className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono-tag font-bold text-[#1E3A8A] uppercase">
                    Official Email Inquiries
                  </div>
                  <div className="text-xs font-mono-tag font-bold text-[#0B192C]">
                    Subhrakantbiswal2003@gmail.com
                  </div>
                  <div className="text-[10px] text-[#1E3A8A] mt-0.5">
                    subratkumarsarangi@gmail.com
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#F8F4E6] border border-[#0B192C]">
                <Phone className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono-tag font-bold text-[#1E3A8A] uppercase">
                    Delegation Hotline & WhatsApp
                  </div>
                  <div className="text-[10px] font-mono-tag font-bold text-[#0B192C]">
                    Subrakant Biswal: +91 95568 75714
                  </div>
                  <div className="text-[10px] font-mono-tag font-bold text-[#0B192C]">
                    Mr. Subrat Kumar Sarangi: +91 98610 16985
                  </div>
                  <div className="text-[10px] text-[#1E3A8A] mt-0.5">
                    Mon–Sat: 09:00 – 21:00 IST
                  </div>
                </div>
              </div>
            </div>
          </div>

        </ScrollReveal>

        {/* Right Column: Diplomatic Transmission Form */}
        <ScrollReveal direction="right" distance={90} duration={0.85} className="lg:col-span-7">
          <div className="comic-panel p-6 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#0B192C]/30 pb-3">
              <div>
                <h3 className="font-display font-black text-xl text-[#0B192C]">
                  Dispatch a Diplomatic Cable to Secretariat
                </h3>
              </div>
              <span className="bg-[#0B192C] text-[#F8F4E6] px-2 py-0.5 text-[9px] font-mono-tag font-bold">
                ENCRYPTED
              </span>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tag font-bold text-[11px] text-[#0B192C] mb-1 uppercase">
                      Your Name / Delegation Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      placeholder="e.g. Delegate of France / Rahul Verma"
                      className="w-full p-2.5 bg-[#F8F4E6] border-2 border-[#0B192C] focus:outline-none focus:border-[#C5A059] font-mono-tag text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tag font-bold text-[11px] text-[#0B192C] mb-1 uppercase">
                      Official Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.senderEmail}
                      onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                      placeholder="e.g. diplomat@institution.edu"
                      className="w-full p-2.5 bg-[#F8F4E6] border-2 border-[#0B192C] focus:outline-none focus:border-[#C5A059] font-mono-tag text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tag font-bold text-[11px] text-[#0B192C] mb-1 uppercase">
                      School / University / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. Modern Public School / KIIT University"
                      className="w-full p-2.5 bg-[#F8F4E6] border-2 border-[#0B192C] focus:outline-none focus:border-[#C5A059] font-mono-tag text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tag font-bold text-[11px] text-[#0B192C] mb-1 uppercase">
                      Inquiry Classification *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4E6] border-2 border-[#0B192C] focus:outline-none focus:border-[#C5A059] font-mono-tag text-xs"
                    >
                      {inquiryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-tag font-bold text-[11px] text-[#0B192C] mb-1 uppercase">
                    Cable Message / Inquiry Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your inquiry, delegation size, partnership proposal, or questions for the Secretariat..."
                    className="w-full p-2.5 bg-[#F8F4E6] border-2 border-[#0B192C] focus:outline-none focus:border-[#C5A059] font-sans text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-case-stamp py-3 text-xs flex items-center justify-center gap-2 font-black tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#F8F4E6] animate-spin" />
                      <span>TRANSMITTING CABLE TO SECRETARIAT...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#F8F4E6]" />
                      <span>TRANSMIT DIPLOMATIC CABLE</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-6 bg-[#F8F4E6] border-2 border-[#0B192C] space-y-4 text-center">
                <div className="w-12 h-12 bg-[#C5A059] text-[#F8F4E6] mx-auto flex items-center justify-center rounded-full border-2 border-[#0B192C]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-[10px] font-mono-tag font-bold text-[#C5A059] uppercase tracking-widest">
                    TRANSMISSION CONFIRMED
                  </span>
                  <h4 className="font-display font-black text-xl text-[#0B192C] mt-1">
                    Cable Logged with Executive Secretariat
                  </h4>
                  <div className="mt-2 inline-block bg-[#0B192C] text-[#F8F4E6] px-3 py-1 font-mono-tag text-xs font-bold">
                    RECEIPT: {transmissionCode}
                  </div>
                </div>

                <p className="text-xs font-sans text-[#1E3A8A] max-w-md mx-auto">
                  Thank you, <strong>{formData.senderName}</strong>. Your communication regarding "{formData.inquiryType}" has been routed to the relevant Secretariat officer. A diplomatic response will be sent to <strong>{formData.senderEmail}</strong> within 24 hours.
                </p>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#0B192C] text-[#F8F4E6] text-xs font-mono-tag font-bold hover:bg-[#C5A059] transition-colors border border-[#0B192C]"
                >
                  TRANSMIT ANOTHER CABLE
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
