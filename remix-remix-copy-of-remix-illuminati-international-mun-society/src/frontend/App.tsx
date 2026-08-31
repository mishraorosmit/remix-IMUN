import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

// Navigation & Global UI
import { HeaderNav } from './components/navigation/HeaderNav';
import { Footer } from './components/navigation/Footer';
import { PaperCurtainLoader } from './components/navigation/PaperCurtainLoader';
import { ScrollReveal } from './components/ui/ScrollReveal';
import DotField from './DotField';

// Home Sections
import { BroadsheetHero } from './components/home/BroadsheetHero';
import { MarqueeTicker } from './components/home/MarqueeTicker';
import { OverviewSection } from './components/home/OverviewSection';
import { PartnerCarousel } from './components/home/PartnerCarousel';
import { WarRoomMap } from './components/home/WarRoomMap';
import { FAQSection } from './components/home/FAQSection';

// Page Sections
import { FounderSection } from './components/sections/FounderSection';
import { InternationalCollabSection } from './components/sections/InternationalCollabSection';
import { AdvisorSection } from './components/sections/AdvisorSection';
import { GallerySection } from './components/sections/GallerySection';
import { ContactsSection } from './components/sections/ContactsSection';
import { BookSessionSection } from './components/sections/BookSessionSection';

// Modals
import { DelegateRegistrationModal } from './components/modals/DelegateRegistrationModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';

// State & Utilities
import { PORTFOLIO_PROJECTS, ProjectItem } from './data/mirandaPortfolioData';
import { ToastProvider } from './context/ToastContext';
import { initSmoothScroll, smoothScrollTo, destroySmoothScroll, scrollToTop } from './utils/smoothScroll';
import { PageId } from './types';

export default function App() {
  const resolvePageFromHash = (hash: string): PageId => {
    const cleanHash = hash.replace('#/', '').replace('#', '').trim().toLowerCase();
    if (cleanHash === 'collab' || cleanHash === 'international-collab' || cleanHash === 'internationalcollab') {
      return 'mentors';
    }
    const validPages: PageId[] = ['home', 'founder', 'mentors', 'advisor', 'gallery', 'contacts', 'book-session'];
    return validPages.includes(cleanHash as PageId) ? (cleanHash as PageId) : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(() => resolvePageFromHash(window.location.hash));
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState('UN Security Council');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Smooth scroll initialization
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const targetPage = resolvePageFromHash(window.location.hash);
      setCurrentPage(targetPage);
      scrollToTop(true);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reset scroll position on page change
  useEffect(() => {
    scrollToTop(true);
  }, [currentPage]);

  const navigateToPage = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    scrollToTop(true);
  };

  const handleOpenRegister = (committeeName?: string) => {
    if (committeeName) {
      setSelectedCommittee(committeeName);
    }
    setIsRegisterModalOpen(true);
  };

  const handleOpenProjectDetail = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleScrollToCouncils = () => {
    if (currentPage !== 'home') {
      navigateToPage('home');
      setTimeout(() => {
        smoothScrollTo('#panel-councils-dossier', { offset: -70, duration: 0.35 });
      }, 50);
    } else {
      smoothScrollTo('#panel-councils-dossier', { offset: -70, duration: 0.35 });
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8F4E6] text-[#0B192C] relative selection:bg-[#C5A059] selection:text-[#F8F4E6] flex flex-col justify-between font-editorial overflow-x-clip">
        {/* Subtle Ambient Interactive DotField Canvas Background */}
        <div 
          className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
          aria-hidden="true"
        >
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
          />
        </div>

        {/* Intro Curtain Loader */}
        <PaperCurtainLoader />

        {/* Global Navigation Header */}
        <HeaderNav
          currentPage={currentPage}
          onNavigate={navigateToPage}
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* Main Content View */}
        <main className="w-full flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && (
                <div className="space-y-10">
                  <BroadsheetHero
                    onOpenRegister={() => handleOpenRegister()}
                    onExploreCouncils={handleScrollToCouncils}
                    onNavigateToPage={navigateToPage}
                    onOpenProjectDetail={handleOpenProjectDetail}
                  />

                  <MarqueeTicker variant="dark" />

                  <div className="max-w-7xl mx-auto px-4 py-4 space-y-12 relative z-20 overflow-x-clip">
                    <ScrollReveal direction="left" distance={30} duration={0.3} showBlueprintHash>
                      <OverviewSection />
                    </ScrollReveal>

                    <ScrollReveal direction="right" distance={30} duration={0.3} showBlueprintHash>
                      <PartnerCarousel onBookDesk={() => navigateToPage('book-session')} />
                    </ScrollReveal>

                    <ScrollReveal direction="left" distance={30} duration={0.3} showBlueprintHash>
                      <WarRoomMap />
                    </ScrollReveal>

                    <ScrollReveal direction="right" distance={30} duration={0.3}>
                      <FAQSection 
                        onContactClick={() => navigateToPage('contacts')}
                        onRegisterClick={() => handleOpenRegister()}
                      />
                    </ScrollReveal>
                  </div>
                </div>
              )}

              {currentPage !== 'home' && (
                <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative z-20">
                  {/* Breadcrumb Navigation */}
                  <div className="flex items-center justify-between border-2 border-[#0B192C] pb-3 bg-[#F8F4E6] p-3.5 rounded-[11.52px] shadow-xs flex-wrap gap-3 font-editorial">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigateToPage('home')}
                        className="px-3.5 py-1.5 rounded-[2.88px] border border-[#0B192C] bg-[#0B192C] text-[#E6D5B8] hover:bg-[#C5A059] transition-colors flex items-center gap-2 text-xs font-mono-tag font-bold cursor-pointer"
                        title="Return to Home Page"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>RETURN TO HOME</span>
                      </button>

                      {currentPage === 'book-session' && (
                        <button
                          type="button"
                          onClick={() => navigateToPage('founder')}
                          className="px-3 py-1.5 border border-[#0B192C] bg-[#E6D5B8] text-[#0B192C] hover:bg-[#0B192C] hover:text-[#E6D5B8] transition-colors flex items-center gap-1.5 text-xs font-mono-tag font-bold cursor-pointer rounded-[2.88px]"
                          title="Return to Founder Profile"
                        >
                          <span>← FOUNDER PROFILE</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono-tag font-bold text-[#1E3A8A]">
                      <button
                        type="button"
                        className="cursor-pointer hover:text-[#C5A059] uppercase transition-colors"
                        onClick={() => navigateToPage('home')}
                      >
                        HOME
                      </button>
                      <ChevronRight className="w-3.5 h-3.5" />
                      {currentPage === 'book-session' ? (
                        <>
                          <button
                            type="button"
                            className="cursor-pointer hover:text-[#C5A059] uppercase transition-colors"
                            onClick={() => navigateToPage('founder')}
                          >
                            FOUNDER
                          </button>
                          <ChevronRight className="w-3.5 h-3.5" />
                          <span className="text-[#C5A059] uppercase">BOOK A SESSION</span>
                        </>
                      ) : currentPage === 'mentors' ? (
                        <span className="text-[#C5A059] uppercase">INTERNATIONAL COLLAB</span>
                      ) : (
                        <span className="text-[#C5A059] uppercase">{currentPage}</span>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Page Views */}
                  {currentPage === 'founder' && (
                    <ScrollReveal direction="up" distance={20}>
                      <FounderSection 
                        onOpenRegister={() => handleOpenRegister()} 
                        onBookSession={() => navigateToPage('book-session')}
                      />
                    </ScrollReveal>
                  )}

                  {currentPage === 'book-session' && (
                    <ScrollReveal direction="up" distance={20}>
                      <BookSessionSection onNavigate={navigateToPage} />
                    </ScrollReveal>
                  )}

                  {currentPage === 'mentors' && (
                    <ScrollReveal direction="up" distance={20}>
                      <InternationalCollabSection 
                        onOpenRegister={() => handleOpenRegister()} 
                        onNavigate={navigateToPage}
                      />
                    </ScrollReveal>
                  )}

                  {currentPage === 'advisor' && (
                    <ScrollReveal direction="up" distance={20}>
                      <AdvisorSection />
                    </ScrollReveal>
                  )}

                  {currentPage === 'gallery' && (
                    <ScrollReveal direction="up" distance={20}>
                      <GallerySection />
                    </ScrollReveal>
                  )}

                  {currentPage === 'contacts' && (
                    <ScrollReveal direction="up" distance={20}>
                      <ContactsSection />
                    </ScrollReveal>
                  )}

                  {/* Bottom Page Navigation Switcher */}
                  <div className="p-4 bg-[#F8F4E6] border-2 border-[#0B192C] rounded-[11.52px] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tag shadow-[-3px_3px_6px_rgba(105,100,95,0.2)]">
                    <span className="font-bold text-[#1E3A8A] uppercase">NAVIGATE DOSSIERS:</span>
                    <div className="flex flex-wrap items-center gap-2 font-bold">
                      <button
                        onClick={() => navigateToPage('home')}
                        className={`px-2.5 py-1 rounded-[2.88px] border border-[#0B192C] cursor-pointer transition-colors ${
                          currentPage === 'home' ? 'bg-[#C5A059] text-[#E6D5B8]' : 'bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#E6D5B8]'
                        }`}
                      >
                        HOME
                      </button>
                      <button
                        onClick={() => navigateToPage('founder')}
                        className={`px-2.5 py-1 rounded-[2.88px] border border-[#0B192C] cursor-pointer transition-colors ${
                          currentPage === 'founder' ? 'bg-[#C5A059] text-[#E6D5B8]' : 'bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#E6D5B8]'
                        }`}
                      >
                        01 FOUNDER
                      </button>
                      <button
                        onClick={() => navigateToPage('mentors')}
                        className={`px-2.5 py-1 rounded-[2.88px] border border-[#0B192C] cursor-pointer transition-colors ${
                          currentPage === 'mentors' ? 'bg-[#C5A059] text-[#E6D5B8]' : 'bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#E6D5B8]'
                        }`}
                      >
                        02 INT COLLAB
                      </button>
                      <button
                        onClick={() => navigateToPage('advisor')}
                        className={`px-2.5 py-1 rounded-[2.88px] border border-[#0B192C] cursor-pointer transition-colors ${
                          currentPage === 'advisor' ? 'bg-[#C5A059] text-[#E6D5B8]' : 'bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#E6D5B8]'
                        }`}
                      >
                        03 ADVISOR
                      </button>
                      <button
                        onClick={() => navigateToPage('gallery')}
                        className={`px-2.5 py-1 rounded-[2.88px] border border-[#0B192C] cursor-pointer transition-colors ${
                          currentPage === 'gallery' ? 'bg-[#C5A059] text-[#E6D5B8]' : 'bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#E6D5B8]'
                        }`}
                      >
                        04 GALLERY
                      </button>
                      <button
                        onClick={() => navigateToPage('contacts')}
                        className={`px-2.5 py-1 rounded-[2.88px] border border-[#0B192C] cursor-pointer transition-colors ${
                          currentPage === 'contacts' ? 'bg-[#C5A059] text-[#E6D5B8]' : 'bg-[#F8F4E6] hover:bg-[#0B192C] hover:text-[#E6D5B8]'
                        }`}
                      >
                        05 CONTACTS
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer */}
        <ScrollReveal direction="up" distance={20}>
          <Footer onNavigate={navigateToPage} />
        </ScrollReveal>

        {/* Project Modal */}
        <ProjectDetailModal
          project={selectedProject}
          allProjects={PORTFOLIO_PROJECTS}
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenRegister={handleOpenRegister}
        />

        {/* Registration Modal */}
        <DelegateRegistrationModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          initialCommittee={selectedCommittee}
        />
      </div>
    </ToastProvider>
  );
}
