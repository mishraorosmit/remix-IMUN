import React, { useState } from 'react';
import { COMMITTEES_DATA } from '../../data/conferenceData';
import { DelegateApplication } from '../../types';
import { playStampSound, playTypewriterSound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { useToast } from '../../context/ToastContext';
import { X, ShieldCheck, Printer, Copy, Check, QrCode, FileText, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { submitDelegateRegistration } from '../../services/registrationService';

interface DelegateRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommittee?: string;
}

export const DelegateRegistrationModal: React.FC<DelegateRegistrationModalProps> = ({
  isOpen,
  onClose,
  initialCommittee,
}) => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState<Partial<DelegateApplication>>({
    fullName: '',
    institution: '',
    email: '',
    phone: '',
    delegationType: 'Single Delegate',
    preferredCommittee: initialCommittee || 'UN Security Council',
    countryPreference1: 'United States',
    countryPreference2: 'United Kingdom',
    countryPreference3: 'France',
    experienceLevel: '1-3 Conferences',
    crisisRoleInterest: true,
  });

  const [submittedDossier, setSubmittedDossier] = useState<DelegateApplication | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    playTypewriterSound();
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.institution || !formData.email) {
      setErrorMsg('All mandatory dossier credentials (Name, Institution, Email) must be filed.');
      playStampSound();
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { clearanceCode } = await submitDelegateRegistration(formData);
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

      const newDossier: DelegateApplication = {
        fullName: formData.fullName || 'DELEGATE ANONYMOUS',
        institution: formData.institution || 'UNAFFILIATED ACADEMY',
        email: formData.email || 'classified@diplomacy.int',
        phone: formData.phone || '+41 22 917 1234',
        delegationType: formData.delegationType || 'Single Delegate',
        preferredCommittee: formData.preferredCommittee || 'UN Security Council',
        countryPreference1: formData.countryPreference1 || 'General Assignment',
        countryPreference2: formData.countryPreference2 || 'Secondary Assignment',
        countryPreference3: formData.countryPreference3 || 'Tertiary Assignment',
        experienceLevel: formData.experienceLevel || '1-3 Conferences',
        crisisRoleInterest: !!formData.crisisRoleInterest,
        clearanceCode,
        timestamp,
      };

      setSubmittedDossier(newDossier);
      playStampSound();

      // Trigger subtle success toast notification
      showSuccess(
        'Delegate Registration Submitted',
        `Credentials for ${newDossier.fullName} successfully registered for ${newDossier.preferredCommittee}.`,
        clearanceCode
      );

      // Trigger paper scrap confetti
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#0B192C', '#C5A945', '#F8F4E6'],
        shapes: ['square'],
        scalar: 1.1,
      });
    } catch (err: any) {
      console.error('Error in registration submission:', err);
      setErrorMsg(err.message || 'Transmission failed. Please verify credentials and re-submit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCredentials = () => {
    if (!submittedDossier) return;
    const text = `ILLUMINATI MODEL UNITED NATIONS 2026\nOFFICIAL DELEGATE CASE FILE\n\nCLEARANCE CODE: ${submittedDossier.clearanceCode}\nDELEGATE: ${submittedDossier.fullName}\nINSTITUTION: ${submittedDossier.institution}\nASSIGNED COUNCIL PREFERENCE: ${submittedDossier.preferredCommittee}\nPORTFOLIO PREFERENCES: ${submittedDossier.countryPreference1}, ${submittedDossier.countryPreference2}, ${submittedDossier.countryPreference3}\nEXPERIENCE: ${submittedDossier.experienceLevel}\nFILED: ${submittedDossier.timestamp}\n\nSTATUS: AUTHENTICATED BY SECRETARIAT`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    playStampSound();
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      id="delegate-registration-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none overflow-y-auto"
    >
      <div
        id="delegate-registration-modal"
        className="relative w-full max-w-3xl bg-[#F8F4E6] border-2 border-[#0B192C] hard-stamp p-4 sm:p-8 my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Halftone texture */}
        <div className="absolute inset-0 halftone-pattern pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between border-b-2 border-[#0B192C] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-[#C5A059] inline-block animate-jitter"></span>
            <div>
              <span className="font-mono-tag text-[10px] text-[#1E3A8A] tracking-widest block uppercase font-bold">
                SECURITY DOSSIER ENTRY PROTOCOL // FORM IMUN-09
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B192C] uppercase tracking-tight skew-heading">
                {submittedDossier ? 'CLASSIFIED DELEGATE CREDENTIALS ISSUED' : 'DELEGATE CONVOCATION APPLICATION'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              playStampSound();
              onClose();
            }}
            className="p-1.5 border-2 border-[#0B192C] bg-[#E6D5B8] hover:bg-[#C5A059] hover:text-[#F8F4E6] transition-colors hard-stamp cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: Either Form or Generated Pass */}
        {!submittedDossier ? (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-[#C5A059]/10 border-2 border-[#C5A059] text-xs font-mono-tag text-[#C5A059] flex items-center gap-2 font-bold hard-stamp">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  FULL DELEGATE NAME *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none focus:bg-[#F8F4E6] hard-stamp"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  SCHOOL / ACADEMY / INSTITUTION *
                </label>
                <input
                  type="text"
                  name="institution"
                  required
                  placeholder="e.g. Oxford Diplomatic Society"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none focus:bg-[#F8F4E6] hard-stamp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  ENCRYPTED DISPATCH EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="delegate@diplomacy.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none focus:bg-[#F8F4E6] hard-stamp"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  TELEGRAPH / CONTACT PHONE
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+41 22 917 1234"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none focus:bg-[#F8F4E6] hard-stamp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  PRIMARY COUNCIL PREFERENCE
                </label>
                <select
                  name="preferredCommittee"
                  value={formData.preferredCommittee}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none hard-stamp"
                >
                  {COMMITTEES_DATA.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.code} — {c.name} ({c.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  DELEGATION FORMAT
                </label>
                <select
                  name="delegationType"
                  value={formData.delegationType}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none hard-stamp"
                >
                  <option value="Single Delegate">Single Delegate (Standard Assignment)</option>
                  <option value="Double Delegation">Double Delegation (Partnered Bloc)</option>
                  <option value="Head Delegate">Head Delegate (School Delegation Lead)</option>
                </select>
              </div>
            </div>

            {/* Country Preferences 1, 2, 3 */}
            <div>
              <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                PORTFOLIO / COUNTRY PREFERENCES (PRIORITY 1 / 2 / 3)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  name="countryPreference1"
                  placeholder="1st Preference (e.g. USA)"
                  value={formData.countryPreference1}
                  onChange={handleInputChange}
                  className="bg-[#E6D5B8] border-2 border-[#0B192C] p-2 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none hard-stamp"
                />
                <input
                  type="text"
                  name="countryPreference2"
                  placeholder="2nd Preference (e.g. France)"
                  value={formData.countryPreference2}
                  onChange={handleInputChange}
                  className="bg-[#E6D5B8] border-2 border-[#0B192C] p-2 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none hard-stamp"
                />
                <input
                  type="text"
                  name="countryPreference3"
                  placeholder="3rd Preference (e.g. India)"
                  value={formData.countryPreference3}
                  onChange={handleInputChange}
                  className="bg-[#E6D5B8] border-2 border-[#0B192C] p-2 text-xs font-mono-tag text-[#0B192C] font-bold focus:outline-none hard-stamp"
                />
              </div>
            </div>

            {/* Experience and Crisis Checkbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
              <div>
                <label className="block text-xs font-mono-tag font-black uppercase text-[#0B192C] mb-1">
                  PAST MUN DIPLOMATIC EXPERIENCE
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full bg-[#E6D5B8] border-2 border-[#0B192C] p-2.5 text-xs font-mono-tag text-[#0B192C] font-bold hard-stamp"
                >
                  <option value="First-Timer">First-Timer (Rookie Diplomat)</option>
                  <option value="1-3 Conferences">1–3 Conferences (Intermediate)</option>
                  <option value="4-7 Conferences">4–7 Conferences (Advanced)</option>
                  <option value="Crisis Specialist (8+)">Crisis Specialist (8+ Veteran)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4 sm:pt-0">
                <input
                  type="checkbox"
                  id="crisisRoleInterest"
                  name="crisisRoleInterest"
                  checked={formData.crisisRoleInterest}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                />
                <label
                  htmlFor="crisisRoleInterest"
                  className="text-xs font-mono-tag text-[#0B192C] font-bold cursor-pointer select-none"
                >
                  Authorize assignment to high-tempo <strong>Midnight Crisis Directives</strong>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="border-t-2 border-[#0B192C] pt-4 flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-tag text-[#1E3A8A] font-bold hidden sm:inline">
                SECURITY PROTOCOL: RECORD TRANSMITTED DIRECTLY TO SECRETARIAT
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-case-stamp px-6 py-3 text-sm flex items-center gap-2 ml-auto font-black tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#F8F4E6] animate-spin" />
                    SEALING DOSSIER IN SECRETARIAT...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#F8F4E6]" />
                    FILE APPLICATION & ISSUE DOSSIER
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Stamped Issued Credentials Badge */
          <div className="relative z-10 space-y-6">
            <div
              id="printable-delegate-badge"
              className="bg-[#E6D5B8] border-2 border-[#0B192C] hard-stamp p-6 relative overflow-hidden"
            >
              {/* Halftone texture */}
              <div className="absolute inset-0 halftone-dense pointer-events-none" />

              {/* Watermark Stamp */}
              <div className="absolute right-6 top-6 text-[#C5A059] font-stamp-script text-3xl opacity-40 rotate-[-12deg] pointer-events-none select-none">
                AUTHORIZED
              </div>

              {/* Badge Top Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-[#0B192C] pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0B192C] border-2 border-[#0B192C] overflow-hidden hard-stamp p-0.5 shrink-0 shadow-[2px_2px_0px_#0B192C]">
                    <img 
                      src="/illuminati-logo.png" 
                      alt="Illuminati Official Seal" 
                      className="w-full h-full object-contain block aspect-square"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tag bg-[#0B192C] text-[#F8F4E6] px-2 py-0.5 font-bold uppercase">
                      OFFICIAL CONVOCATION PASS
                    </span>
                    <h4 className="font-display font-black text-2xl text-[#0B192C] uppercase tracking-tight mt-1 skew-heading">
                      {submittedDossier.fullName}
                    </h4>
                    <div className="text-xs font-mono-tag font-bold text-[#1E3A8A]">
                      {submittedDossier.institution}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="stamp-box text-xs stamp-crimson font-bold">
                    {submittedDossier.clearanceCode}
                  </div>
                  <div className="text-[10px] font-mono-tag font-bold text-[#1E3A8A] mt-1">
                    FILED: {submittedDossier.timestamp}
                  </div>
                </div>
              </div>

              {/* Badge Grid Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-[#F8F4E6] border-2 border-[#0B192C] p-3 text-xs font-mono-tag mb-4 hard-stamp">
                <div>
                  <span className="text-[#1E3A8A] font-bold block">ASSIGNED COUNCIL:</span>
                  <strong className="text-[#0B192C]">{submittedDossier.preferredCommittee}</strong>
                </div>
                <div>
                  <span className="text-[#1E3A8A] font-bold block">PORTFOLIO PREF 1:</span>
                  <strong className="text-[#0B192C]">{submittedDossier.countryPreference1}</strong>
                </div>
                <div>
                  <span className="text-[#1E3A8A] font-bold block">DELEGATION STATUS:</span>
                  <strong className="text-[#C5A059]">{submittedDossier.delegationType}</strong>
                </div>
              </div>

              {/* Barcode & Security Hologram Graphic */}
              <div className="flex items-center justify-between pt-2 border-t-2 border-[#0B192C]">
                <div className="flex items-center gap-2">
                  <div className="h-8 flex items-center space-x-0.5">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-[#0B192C] h-full"
                        style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2.5)}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono-tag text-[#0B192C] tracking-widest font-bold">
                    IMUN-SIG-SEC-09
                  </span>
                </div>

                <div className="text-[10px] font-mono-tag text-[#1E3A8A] font-bold text-right">
                  PRESIDENT OF GENERAL ASSEMBLY SEAL
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmittedDossier(null);
                  playStampSound();
                }}
                className="btn-case-secondary px-3.5 py-2 text-xs font-black tracking-wider"
              >
                SUBMIT ANOTHER APPLICATION
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCredentials}
                  className="btn-case-secondary px-3.5 py-2 text-xs flex items-center gap-1.5 font-black tracking-wider"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#C5A059]" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? 'COPIED TO CLIPBOARD' : 'COPY CASE PASS'}
                </button>
                <button
                  onClick={handlePrint}
                  className="btn-case-stamp px-4 py-2 text-xs flex items-center gap-1.5 font-black tracking-wider"
                >
                  <Printer className="w-3.5 h-3.5 text-[#F8F4E6]" />
                  PRINT OFFICIAL BADGE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
