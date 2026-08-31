import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../data/mirandaPortfolioData';
import { X, ArrowRight, ArrowLeft, ExternalLink, Award, Shield, CheckCircle2 } from 'lucide-react';
import { playStampSound, playTypewriterSound } from '../../utils/audio';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  allProjects: ProjectItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenRegister?: (title?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
  onOpenRegister,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B192C]/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 select-none">
        
        {/* Paper Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F8F4E6] text-[#0B192C] w-full max-w-5xl rounded-[11.52px] border-2 border-[#0B192C] shadow-2xl overflow-hidden my-auto flex flex-col font-editorial relative max-h-[92vh]"
        >
          {/* Top Modal Folio Bar */}
          <div className="bg-[#F8F4E6] px-5 py-3 border-b-2 border-[#0B192C] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono-tag font-bold text-[#C5A059]">PROJECT DOSSIER</span>
              <span className="text-[#1E3A8A]">•</span>
              <span className="font-medium text-[#0B192C] uppercase">{project.category}</span>
              <span className="hidden sm:inline text-[#1E3A8A]">({project.year})</span>
            </div>

            <button
              onClick={() => {
                playTypewriterSound();
                onClose();
              }}
              className="p-1.5 rounded-full border border-[#0B192C] bg-[#F8F4E6] hover:bg-[#C5A059] hover:text-[#E6D5B8] transition-colors cursor-pointer"
              title="Close Dossier (Esc)"
              aria-label="Close Dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8 flex-grow">
            
            {/* Title Header Spread */}
            <div className="border-b-2 border-[#0B192C] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="badge-new">{project.badge || 'VERIFIED'}</span>
                <span className="font-mono-tag text-xs text-[#1E3A8A]">CLIENT: {project.client}</span>
              </div>
              <h1 className="font-canopee text-4xl sm:text-6xl md:text-7xl text-[#0B192C] uppercase tracking-[-0.04em] leading-[0.85] m-0">
                {project.title}
              </h1>
              <div className="text-base sm:text-lg text-[#C5A059] font-medium mt-1">
                {project.subtitle}
              </div>
            </div>

            {/* Main Visual Presentation */}
            <div className="w-full bg-[#0B192C] rounded-[2.88px] border-2 border-[#0B192C] overflow-hidden relative halftone-photo max-h-[420px] flex items-center justify-center p-4">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[380px] w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Two-Column Editorial Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Columns: Brief & Solution */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono-tag font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                    ★ THE DIPLOMATIC BRIEF
                  </div>
                  <p className="text-base sm:text-lg text-[#0B192C] leading-relaxed font-light">
                    {project.brief}
                  </p>
                </div>

                <div className="p-5 bg-[#F8F4E6]/60 border border-[#0B192C]/20 rounded-[11.52px]">
                  <div className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase tracking-wider mb-1">
                    EXECUTION & RESOLUTION
                  </div>
                  <p className="text-sm sm:text-base text-[#0B192C] leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Right 5 Columns: Metadata & Recognitions */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-5 bg-[#F8F4E6] border-2 border-[#0B192C] rounded-[11.52px] space-y-3">
                  <div className="text-xs font-mono-tag font-bold text-[#0B192C] uppercase border-b border-[#0B192C]/20 pb-2">
                    SPECIFICATIONS
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#1E3A8A]">ROLE:</span>
                      <span className="font-medium text-[#0B192C] text-right">{project.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1E3A8A]">YEAR:</span>
                      <span className="font-medium text-[#0B192C]">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1E3A8A]">CIRCUIT:</span>
                      <span className="font-medium text-[#0B192C]">{project.category}</span>
                    </div>
                  </div>

                  {project.recognition && project.recognition.length > 0 && (
                    <div className="pt-3 border-t border-[#0B192C]/20 space-y-2">
                      <div className="text-[11px] font-mono-tag font-bold text-[#C5A059] uppercase flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> ACCREDITATIONS
                      </div>
                      <div className="space-y-1">
                        {project.recognition.map((rec, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-[#0B192C]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {onOpenRegister && (
                    <button
                      onClick={() => {
                        playStampSound();
                        onClose();
                        onOpenRegister(project.title);
                      }}
                      className="w-full mt-3 py-2.5 px-4 rounded-[2.88px] bg-[#0B192C] hover:bg-[#C5A059] text-[#E6D5B8] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Inquire for School Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Gallery Thumbnails if available */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="pt-4 border-t border-[#0B192C]/20">
                <div className="text-xs font-mono-tag font-bold text-[#1E3A8A] uppercase mb-3">
                  SUMMIT PHOTOGRAPHY & SPREADS
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((imgSrc, idx) => (
                    <div key={idx} className="h-32 bg-[#0B192C] border border-[#0B192C] rounded-[2.88px] overflow-hidden halftone-photo">
                      <img 
                        src={imgSrc} 
                        alt={`${project.title} ${idx + 1}`} 
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Next/Prev Pagination Footer */}
          <div className="bg-[#F8F4E6] px-6 py-4 border-t-2 border-[#0B192C] flex items-center justify-between shrink-0">
            <button
              onClick={() => {
                playTypewriterSound();
                onSelectProject(prevProject);
              }}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#0B192C] hover:text-[#C5A059] cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Prev: {prevProject.title}</span>
            </button>

            <button
              onClick={() => {
                playTypewriterSound();
                onSelectProject(nextProject);
              }}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#0B192C] hover:text-[#C5A059] cursor-pointer transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
