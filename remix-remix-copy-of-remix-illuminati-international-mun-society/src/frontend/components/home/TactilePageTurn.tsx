import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Hand, CheckCircle2, Eye, ExternalLink, Sparkles
} from 'lucide-react';
import { ProjectItem } from '../../data/mirandaPortfolioData';
import { playStampSound, playTypewriterSound } from '../../utils/audio';

interface TactilePageTurnProps {
  projects: ProjectItem[];
  onOpenProjectDetail?: (project: ProjectItem) => void;
  onOpenRegister?: (committeeName?: string) => void;
}

export const TactilePageTurn: React.FC<TactilePageTurnProps> = ({
  projects,
  onOpenProjectDetail,
  onOpenRegister,
}) => {
  // Total spreads calculation (2 projects per spread for desktop)
  const totalSpreads = Math.max(1, Math.ceil(projects.length / 2));
  const [spreadIndex, setSpreadIndex] = useState<number>(0);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const [isTurning, setIsTurning] = useState<boolean>(false);

  // Motion values for ultra-smooth 60fps / 120fps hardware-accelerated drag without React re-render thrashing
  const dragX = useMotionValue(0);
  const smoothDragX = useSpring(dragX, { stiffness: 400, damping: 35, mass: 0.8 });
  
  // Transform drag distance to rotation angle for page peel (0 to -180 deg for next, 0 to 180 deg for prev)
  const dragRotateY = useTransform(smoothDragX, [-300, 0, 300], [-140, 0, 140]);
  const dragShadowOpacity = useTransform(smoothDragX, [-300, -50, 0, 50, 300], [0.6, 0.25, 0, 0.25, 0.6]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDown = useRef<boolean>(false);
  const startX = useRef<number>(0);

  const currentSpread = spreadIndex % totalSpreads;
  const nextSpread = (currentSpread + 1) % totalSpreads;
  const prevSpread = (currentSpread - 1 + totalSpreads) % totalSpreads;

  const leftProject = projects[(currentSpread * 2) % projects.length];
  const rightProject = projects[(currentSpread * 2 + 1) % projects.length] || projects[0];

  const nextLeftProject = projects[(nextSpread * 2) % projects.length];
  const nextRightProject = projects[(nextSpread * 2 + 1) % projects.length] || projects[0];

  const prevLeftProject = projects[(prevSpread * 2) % projects.length];
  const prevRightProject = projects[(prevSpread * 2 + 1) % projects.length] || projects[0];

  // Smooth turn execution
  const executeTurn = useCallback((dir: 'next' | 'prev') => {
    if (isTurning) return;
    setIsTurning(true);
    setTurnDirection(dir);
    playTypewriterSound();

    // Reset drag offsets smoothly
    dragX.set(0);

    const timer = setTimeout(() => {
      setSpreadIndex((prev) => 
        dir === 'next' ? (prev + 1) % totalSpreads : (prev - 1 + totalSpreads) % totalSpreads
      );
      setIsTurning(false);
    }, 240);

    return () => clearTimeout(timer);
  }, [isTurning, totalSpreads, dragX]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        executeTurn('next');
      } else if (e.key === 'ArrowLeft') {
        executeTurn('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [executeTurn, projects.length]);

  // Pointer Drag Event Handlers with zero React state overhead on tick
  const onPointerDown = (e: React.PointerEvent) => {
    if (isTurning) return;
    isPointerDown.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || isTurning) return;
    const deltaX = e.clientX - startX.current;
    // Constrain delta drag
    dragX.set(Math.max(-300, Math.min(300, deltaX)));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const currentDelta = dragX.get();
    if (currentDelta < -60) {
      executeTurn('next');
    } else if (currentDelta > 60) {
      executeTurn('prev');
    } else {
      dragX.set(0);
    }
  };

  return (
    <div className="w-full space-y-3 select-none font-editorial">
      
      {/* Top Editorial Masthead Deck for ALL WORK */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#0B192C] pb-2 gap-2">
        <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
          <h2 className="font-domaine text-2xl sm:text-3xl lg:text-4xl text-[#0B192C] italic font-semibold leading-none tracking-[-0.03em] m-0">
            ALL WORK!
          </h2>
          <span className="hidden sm:inline text-[#0B192C]/40">•</span>
          <p className="font-editorial text-[12px] sm:text-[13px] text-[#1E3A8A] font-light max-w-xl">
            Turn through our broadsheet archive of institutional Model UN summits and conferences.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET VIEW (< 1024px): Dense Content Grid                       */}
      {/* ========================================================================= */}
      <div className="block lg:hidden space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-[#F8F4E6] border-2 border-[#0B192C] rounded-[8px] p-3 shadow-[-2px_2px_6px_rgba(105,100,95,0.15)] flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all hover:bg-[#E6D5B8]/40"
          >
            {/* Visual Image Banner - smaller, left-aligned on tablet, top on mobile */}
            <div 
              onClick={() => onOpenProjectDetail && onOpenProjectDetail(project)}
              className="relative w-full sm:w-2/5 md:w-1/3 h-36 sm:h-auto bg-[#0B192C] border-2 border-[#0B192C] rounded-[4px] overflow-hidden group cursor-pointer flex items-center justify-center shrink-0"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-1 left-1">
                <span className="text-[8px] px-1.5 py-0.5 rounded-[2px] bg-[#C5A059] text-[#0B192C] font-bold tracking-widest uppercase shadow-sm border border-[#0B192C]">
                  {project.badge || 'CONFIDENTIAL'}
                </span>
              </div>
            </div>

            {/* Content area */}
            <div className="flex flex-col justify-between flex-grow">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-editorial text-[#1E3A8A]">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-[#0B192C] uppercase">{project.category}</span>
                    <span>•</span>
                    <span className="text-[#C5A059]">{project.year}</span>
                  </div>
                </div>
                
                <h3 className="font-canopee text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight leading-none m-0">
                  {project.title}
                </h3>
                <div className="text-[11px] font-ubuntu font-bold text-[#C5A059] leading-tight">
                  {project.subtitle}
                </div>
                <p className="font-editorial text-[14px] text-[#0B192C] leading-snug line-clamp-2 mt-1.5">
                  {project.description}
                </p>
                
                {/* Recognition Chips - condensed */}
                {project.recognition && project.recognition.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.recognition.slice(0, 2).map((rec, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[2px] bg-[#0B192C]/5 border border-[#0B192C]/15 text-[9px] font-ubuntu text-[#0B192C]"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#C5A059]" />
                        <span className="truncate max-w-[140px]">{rec}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action / Footer */}
              <div className="pt-2 mt-2 border-t border-[#0B192C]/20 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onOpenProjectDetail && onOpenProjectDetail(project)}
                  className="px-2.5 py-1.5 bg-[#0B192C] text-[#F8F4E6] rounded-[3px] text-[10px] font-mono-tag font-bold hover:bg-[#C5A059] hover:text-[#0B192C] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3 h-3 text-[#C5A059]" />
                  <span>INSPECT DOSSIER</span>
                </button>
                <div className="text-[9px] font-ubuntu font-bold text-[#1E3A8A] bg-[#E6D5B8] px-1.5 py-0.5 rounded-[2px] border border-[#0B192C]/10 truncate max-w-[120px]">
                  {project.client}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= 1024px): 3D Broadsheet Book Spread                       */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        <div 
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative w-full min-h-[420px] bg-[#F8F4E6] border-2 border-[#0B192C] rounded-[9px] shadow-[-4px_4px_10px_rgba(105,100,95,0.25)] overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
          style={{ perspective: 2400 }}
        >
          {/* Subtle Underneath Center Crease / Spine Fold */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 z-20 pointer-events-none bg-gradient-to-r from-transparent via-[#0B192C]/12 to-transparent border-l border-r border-[#0B192C]/10" />

          {/* UNDERLYING TARGET SPREAD */}
          <div className="absolute inset-0 grid grid-cols-2 z-0 bg-[#F8F4E6]">
            {/* Target Left Page */}
            <div className="p-5 border-r border-[#0B192C]/30 flex flex-col justify-between">
              <SpreadPageContent 
                project={turnDirection === 'next' ? nextLeftProject : prevLeftProject} 
                pageNumber={((turnDirection === 'next' ? nextSpread : prevSpread) * 2) + 1}
                totalPages={totalSpreads * 2}
                side="left"
                onOpenDetail={onOpenProjectDetail}
              />
            </div>

            {/* Target Right Page */}
            <div className="p-5 flex flex-col justify-between">
              <SpreadPageContent 
                project={turnDirection === 'next' ? nextRightProject : prevRightProject} 
                pageNumber={((turnDirection === 'next' ? nextSpread : prevSpread) * 2) + 2}
                totalPages={totalSpreads * 2}
                side="right"
                onOpenDetail={onOpenProjectDetail}
              />
            </div>
          </div>

          {/* ACTIVE STATIC SPREAD */}
          <div className={`relative z-10 grid grid-cols-2 min-h-[420px] bg-[#F8F4E6] ${isTurning ? 'pointer-events-none' : ''}`}>
            {/* LEFT BROADSHEET PAGE (Verso) */}
            <div className="relative p-5 border-r-2 border-[#0B192C] flex flex-col justify-between bg-[#F8F4E6] group">
              <SpreadPageContent 
                project={leftProject} 
                pageNumber={currentSpread * 2 + 1}
                totalPages={totalSpreads * 2}
                side="left"
                onOpenDetail={onOpenProjectDetail}
              />
            </div>

            {/* RIGHT BROADSHEET PAGE (Recto) */}
            <div className="relative p-5 flex flex-col justify-between bg-[#F8F4E6] group">
              <SpreadPageContent 
                project={rightProject} 
                pageNumber={currentSpread * 2 + 2}
                totalPages={totalSpreads * 2}
                side="right"
                onOpenDetail={onOpenProjectDetail}
              />
            </div>
          </div>

          {/* 3D TURNING PAGE LEAF */}
          <AnimatePresence mode="wait">
            {isTurning && (
              <motion.div
                key={`leaf-turn-${spreadIndex}-${turnDirection}`}
                initial={{ 
                  rotateY: turnDirection === 'next' ? 0 : -180,
                }}
                animate={{ 
                  rotateY: turnDirection === 'next' ? -180 : 0 
                }}
                transition={{ 
                  duration: 0.22, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: turnDirection === 'next' ? '50%' : '0%',
                  width: '50%',
                  zIndex: 40,
                  transformOrigin: turnDirection === 'next' ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
                className="bg-[#F8F4E6] border-l border-r border-[#0B192C] shadow-[-12px_0_24px_rgba(0,0,0,0.3)] pointer-events-none"
              >
                {/* Front side of flipping leaf */}
                <div 
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 p-5 bg-[#F8F4E6] flex flex-col justify-between"
                >
                  <SpreadPageContent 
                    project={turnDirection === 'next' ? rightProject : prevLeftProject} 
                    pageNumber={turnDirection === 'next' ? currentSpread * 2 + 2 : (prevSpread * 2) + 1}
                    totalPages={totalSpreads * 2}
                    side={turnDirection === 'next' ? 'right' : 'left'}
                    isFlippingLeaf
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/20 via-transparent to-black/10 pointer-events-none" />
                </div>

                {/* Back side of flipping leaf */}
                <div 
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)' 
                  }}
                  className="absolute inset-0 p-5 bg-[#F8F4E6] flex flex-col justify-between text-[#0B192C] border-r border-[#0B192C]"
                >
                  <SpreadPageContent 
                    project={turnDirection === 'next' ? nextLeftProject : leftProject} 
                    pageNumber={turnDirection === 'next' ? (nextSpread * 2) + 1 : currentSpread * 2 + 1}
                    totalPages={totalSpreads * 2}
                    side="left"
                    isBackOfLeaf
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#0B192C]/20 via-transparent to-black/10 pointer-events-none" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic Drag Peel Motion */}
          {!isTurning && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '50%',
                zIndex: 35,
                transformOrigin: 'left center',
                rotateY: dragRotateY,
                transformStyle: 'preserve-3d',
                opacity: dragShadowOpacity,
                willChange: 'transform',
              }}
              className="bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none"
            />
          )}
        </div>

        {/* Bottom Physical Page Turn Toolbar & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 px-1">
          {/* Previous Page Turn Button */}
          <button
            type="button"
            onClick={() => executeTurn('prev')}
            disabled={isTurning}
            className="px-3 py-1.5 rounded-[2.88px] border border-[#0B192C] bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#F8F4E6] text-[#0B192C] transition-all flex items-center gap-1.5 text-[11px] font-mono-tag font-bold shadow-xs cursor-pointer disabled:opacity-50 active:scale-98"
            title="Turn to previous broadsheet spread"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>PREV SPREAD</span>
          </button>

          {/* Center Folio Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono-tag text-[#1E3A8A]">
            <span className="font-bold uppercase tracking-wider text-[#0B192C]">
              FOLIO {currentSpread + 1} OF {totalSpreads}
            </span>
          </div>

          {/* Next Page Turn Button */}
          <button
            type="button"
            onClick={() => executeTurn('next')}
            disabled={isTurning}
            className="px-3 py-1.5 rounded-[2.88px] border border-[#0B192C] bg-[#0B192C] hover:bg-[#C5A059] text-[#F8F4E6] transition-all flex items-center gap-1.5 text-[11px] font-mono-tag font-bold shadow-xs cursor-pointer disabled:opacity-50 active:scale-98"
            title="Turn to next broadsheet spread"
          >
            <span>NEXT SPREAD</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#F8F4E6]" />
          </button>
        </div>
      </div>

    </div>
  );
};

// =============================================================================
// SUB-COMPONENT: SPREAD PAGE CONTENT (Rendered inside each broadsheet leaf)
// =============================================================================
interface SpreadPageContentProps {
  project: ProjectItem;
  pageNumber: number;
  totalPages: number;
  side: 'left' | 'right';
  isFlippingLeaf?: boolean;
  isBackOfLeaf?: boolean;
  onOpenDetail?: (project: ProjectItem) => void;
}

const SpreadPageContent: React.FC<SpreadPageContentProps> = ({
  project,
  pageNumber,
  totalPages,
  side,
  isFlippingLeaf,
  isBackOfLeaf,
  onOpenDetail,
}) => {
  if (!project) return null;

  return (
    <div className="h-full flex flex-col justify-between space-y-2">
      
      {/* Top Editorial Page Header Rule */}
      <div className="border-b border-[#0B192C] pb-1 flex items-center justify-between text-[10px] font-editorial text-[#1E3A8A]">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#0B192C] uppercase">SECTION {side === 'left' ? 'A' : 'B'}</span>
          <span>•</span>
          <span className="uppercase text-[#C5A059] font-medium">{project.category}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>SUMMIT {project.year}</span>
          <span>•</span>
          <span className="font-mono-tag font-bold text-[#0B192C]">PAGE {pageNumber.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Main Body: Halftone Photograph & Editorial Layout */}
      <div className="space-y-2 flex-grow">
        
        {/* Halftone Newspaper Photograph with Perforated Frame */}
        <div 
          onClick={() => onOpenDetail && onOpenDetail(project)}
          className="relative w-full h-32 sm:h-40 lg:h-48 bg-[#0B192C] border border-[#0B192C] rounded-[4px] overflow-hidden group/img halftone-photo shadow-xs cursor-pointer"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-contain p-2 transition-transform group-hover/img:scale-105"
            loading="eager"
            decoding="async"
          />

          {/* Category Badge Stamp */}
          <div className="absolute top-1.5 left-1.5">
            <span className="badge-new">
              {project.badge || 'CONFIDENTIAL'}
            </span>
          </div>

          {/* Client Secretariat Stamp */}
          <div className="absolute bottom-1.5 right-1.5 bg-[#0B192C]/90 backdrop-blur-xs text-[#F8F4E6] text-[8px] px-1.5 py-0.5 rounded-[2px] font-ubuntu font-semibold">
            {project.client}
          </div>
        </div>

        {/* Headline Deck in Canopee Display Font */}
        <div 
          onClick={() => onOpenDetail && onOpenDetail(project)}
          className="cursor-pointer group"
        >
          <h3 className="font-canopee text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-[-0.02em] leading-[0.92] m-0 group-hover:text-[#D97706] transition-colors">
            {project.title}
          </h3>
          <div className="text-[11px] font-ubuntu font-bold text-[#D97706] mt-0.5">
            {project.subtitle}
          </div>
        </div>

        {/* Newspaper Article Body Text */}
        <p className="font-eb-garamond text-[13px] sm:text-[14px] text-[#0B192C] leading-tight line-clamp-2 font-normal">
          {project.description}
        </p>

        {/* Accreditations & Key Highlights Pills */}
        {project.recognition && project.recognition.length > 0 && (
          <div className="pt-0.5 flex flex-wrap gap-1">
            {project.recognition.slice(0, 2).map((rec, i) => (
              <span 
                key={i} 
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[2px] bg-[#0B192C]/5 border border-[#0B192C]/15 text-[10px] font-ubuntu text-[#0B192C]"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-[#D97706]" />
                <span className="truncate max-w-[160px]">{rec}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer Folio */}
      <div className="pt-1.5 border-t border-[#0B192C] flex items-center justify-between gap-2">
        <div className="text-[10px] font-ubuntu text-[#1E3A8A] truncate font-medium">
          ROLE: <span className="text-[#0B192C] font-bold">{project.role}</span>
        </div>
        <button
          type="button"
          onClick={() => onOpenDetail && onOpenDetail(project)}
          className="text-[9px] font-mono-tag text-[#C5A059] hover:underline font-bold uppercase tracking-wider cursor-pointer"
        >
          VIEW DOSSIER ➔
        </button>
      </div>

    </div>
  );
};

export const TactileBroadsheetPageTurn = TactilePageTurn;


