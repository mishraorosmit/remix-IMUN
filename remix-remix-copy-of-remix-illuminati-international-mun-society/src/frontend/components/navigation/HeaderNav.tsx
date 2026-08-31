import React, { useEffect, useState } from 'react';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { 
  Menu, X, ChevronRight, Phone, Mail, 
  BookOpen, Globe, Award, Image as ImageIcon, MessageSquare, Shield
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId } from '../../types';
import { playTypewriterSound } from '../../utils/audio';

interface HeaderNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenRegister?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageId) => {
    playTypewriterSound();
    onNavigate(page);
    setMobileMenuOpen(false);
    smoothScrollTo(0, { immediate: true });
  };

  const navItems: { id: PageId; label: string; isNew?: boolean; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'founder', label: 'Founder', icon: Shield },
    { id: 'mentors', label: 'International Collab', isNew: true, icon: Award },
    { id: 'advisor', label: 'Advisor', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F4E6]/95 backdrop-blur-md border-b-2 border-[#0B192C] select-none shadow-[0_4px_16px_rgba(11,25,44,0.08)] transition-all duration-200">
      {/* Top Golden Reading Progress Bar */}
      <div 
        className="h-[3px] bg-gradient-to-r from-[#C5A059] via-[#D97706] to-[#C5A059] transition-all duration-150 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Main Header Bar */}
      <div className="px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 max-w-7xl mx-auto min-h-[58px] sm:min-h-[64px]">
        
        {/* Left: Branding, Seal & Society Title */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0B192C] border-2 border-[#0B192C] overflow-hidden flex items-center justify-center p-0.5 sm:p-1 shrink-0 rounded-[4px] shadow-sm group-hover:scale-105 group-hover:border-[#C5A059] transition-transform">
            <picture>
              <source srcSet="/illuminati-logo.webp" type="image/webp" />
              <img 
                src="/illuminati-logo.png" 
                alt="Illuminati Society Seal" 
                className="w-full h-full object-contain block"
                width={36}
                height={36}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-canopee text-xl sm:text-2xl text-[#0B192C] uppercase tracking-[-0.02em] leading-none group-hover:text-[#C5A059] transition-colors">
                ILLUMINATI
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse hidden sm:inline-block" title="Active MUN Chapter" />
            </div>
            <div className="text-[10px] sm:text-[11px] font-editorial text-[#1E3A8A] font-semibold tracking-tight leading-tight hidden xs:block sm:block">
              Bhubaneswar • Youth Diplomacy
            </div>
          </div>
        </div>

        {/* Center/Right: Desktop Navigation Links with Moving Black Box */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-ubuntu text-[13.5px] xl:text-[14px] text-[#0B192C] relative p-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="relative px-3 xl:px-4 py-1.5 rounded-[4px] cursor-pointer transition-colors flex items-center gap-1.5 font-medium group select-none"
              >
                {/* Moving Animated Black Box Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavbarIndicator"
                    className="absolute inset-0 bg-[#0B192C] rounded-[4px] shadow-sm z-0"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}

                {/* Nav Label */}
                <span className={`relative z-10 transition-colors duration-150 ${
                  isActive ? 'text-[#F8F4E6] font-bold' : 'text-[#0B192C] hover:text-[#0B192C]'
                }`}>
                  {item.label}
                </span>

                {/* New Tag */}
                {item.isNew && (
                  <span className={`relative z-10 px-1.5 py-0.5 text-[9px] font-mono-tag font-black rounded-[2px] transition-colors ${
                    isActive ? 'bg-[#C5A059] text-[#0B192C]' : 'bg-[#0B192C] text-[#F59E0B]'
                  }`}>
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button (Visible on screens < 1024px) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playTypewriterSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 border-2 border-[#0B192C] bg-[#F8F4E6] hover:bg-[#E6D5B8] rounded-[4px] cursor-pointer flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 transition-colors shadow-[2px_2px_0px_#0B192C]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#0B192C]" />
            ) : (
              <Menu className="w-5 h-5 text-[#0B192C]" />
            )}
          </button>
        </div>
      </div>

      {/* Modern Slide-Down Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-[#0B192C]/70 backdrop-blur-sm z-40 top-[58px] sm:top-[64px]"
            />

            {/* Menu Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-[58px] sm:top-[64px] left-0 right-0 max-h-[calc(100vh-64px)] overflow-y-auto bg-[#F8F4E6] border-b-3 border-[#0B192C] z-50 p-4 sm:p-6 shadow-2xl space-y-4 font-editorial"
            >
              <div className="flex items-center justify-between border-b border-[#0B192C]/20 pb-2">
                <span className="text-xs font-mono-tag font-bold text-[#1E3A8A] uppercase tracking-wider">
                  ★ CONVOCATION DIRECTORY
                </span>
                <span className="text-[11px] font-mono-tag text-[#C5A059] font-bold">
                  ESTD. 2021
                </span>
              </div>

              {/* Navigation Links Grid with Mobile Active indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`relative w-full text-left p-3.5 border-2 rounded-[4px] flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#0B192C] bg-[#0B192C] text-[#F8F4E6] shadow-[2px_2px_0px_#C5A059]'
                          : 'border-[#0B192C]/30 bg-[#F8F4E6] text-[#0B192C] hover:bg-[#E6D5B8]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#1E3A8A]'}`} />
                        <span className="font-ubuntu font-bold text-[14px]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono-tag font-black rounded-[2px] bg-[#C5A059] text-[#0B192C]">
                            NEW
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#0B192C]/40'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct Secretariat Contacts Footer */}
              <div className="p-3 bg-[#E6D5B8]/60 border border-[#0B192C]/20 rounded-[4px] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tag text-[#0B192C]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>+91 95568 75714</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1E3A8A]">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Subhrakantbiswal2003@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

