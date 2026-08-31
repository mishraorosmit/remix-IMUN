import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PageCurtainLoaderProps {
  onComplete?: () => void;
}

export const PageCurtainLoader: React.FC<PageCurtainLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'revealing' | 'opening' | 'done'>('revealing');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Phase 1: Logo & Crest Reveal (0ms - 1050ms)
    const t1 = setTimeout(() => {
      setPhase('opening');
    }, 1050);

    // Phase 2: Smooth Curtain Parting (1050ms - 1850ms)
    const t2 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      onClick={() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-transparent cursor-pointer pointer-events-auto"
      title="Click anywhere to skip intro"
    >
      {/* Left Panel */}
      <motion.div 
        className="absolute top-0 bottom-0 left-0 w-[50.5%] bg-[#0B192C] z-10 border-r border-[#C5A059]/40 shadow-[8px_0_30px_rgba(0,0,0,0.6)]"
        initial={{ x: 0 }}
        animate={phase === 'opening' ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      
      {/* Right Panel */}
      <motion.div 
        className="absolute top-0 bottom-0 right-0 w-[50.5%] bg-[#0B192C] z-10 border-l border-[#C5A059]/40 shadow-[-8px_0_30px_rgba(0,0,0,0.6)]"
        initial={{ x: 0 }}
        animate={phase === 'opening' ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Ambient Glow */}
      <motion.div 
        className="absolute inset-0 z-15 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase === 'opening' ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-[320px] h-[320px] bg-[#C5A059]/20 blur-[60px] rounded-full" />
      </motion.div>

      {/* Logo & Society Name */}
      <motion.div
        className="absolute z-20 flex flex-col items-center justify-center pointer-events-none px-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          phase === 'opening' 
            ? { scale: 1.2, opacity: 0, filter: 'blur(4px)' } 
            : { scale: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: phase === 'opening' ? 0.6 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex items-center justify-center">
          <motion.img 
            src="/logo.png" 
            alt="Illuminati Society Logo"
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] relative z-10"
            loading="eager"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="font-editorial-heading tracking-[0.3em] uppercase text-xs sm:text-sm text-[#C5A059] font-bold">
            Illuminati International MUN Society
          </div>
          <div className="text-[10px] font-mono-tag tracking-[0.25em] text-[#E6D5B8]/60 uppercase mt-1">
            Diplomatic Intelligence & Leadership
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const PaperCurtainLoader = PageCurtainLoader;
