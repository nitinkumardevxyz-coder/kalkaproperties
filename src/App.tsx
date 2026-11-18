import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Language } from './data/kalkaData';
import { TransactionType } from './utils/consultingLogic';
import { PAGE_ROUTES, PageId, parseRouteToPage } from './utils/routerLogic';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { LeadershipSection } from './components/LeadershipSection';
import { AdvisoryToolsSection } from './components/AdvisoryToolsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    parseRouteToPage(window.location.pathname, window.location.hash)
  );
  const [selectedTxType, setSelectedTxType] = useState<TransactionType>('buy');
  const [lightbox, setLightbox] = useState<{ src: string | null; caption: string }>({
    src: null,
    caption: '',
  });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(
        parseRouteToPage(window.location.pathname, window.location.hash)
      );
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    const targetUrl = PAGE_ROUTES[page];
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectServiceTransaction = (txType: TransactionType) => {
    setSelectedTxType(txType);
    navigateTo('tools');
  };

  return (
    <div className="relative min-h-screen bg-[#0B0E14] text-slate-100">
      {/* Persistent Animated 3D Wireframe & Blueprint Canvas Backdrop */}
      <AmbientBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          lang={lang}
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        <main className="flex-1">
          <motion.div
            key={currentPage}
            initial={prefersReduced ? false : { opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
              {currentPage === 'home' && (
                <>
                  <HeroSection
                    lang={lang}
                    onChangeLang={setLang}
                    onNavigate={navigateTo}
                    onOpenLightbox={(src, caption) => setLightbox({ src, caption })}
                  />
                  <TestimonialsSection lang={lang} />
                </>
              )}

              {currentPage === 'services' && (
                <ServicesSection
                  lang={lang}
                  onSelectServiceTransaction={handleSelectServiceTransaction}
                />
              )}

              {currentPage === 'leadership' && (
                <>
                  <LeadershipSection
                    lang={lang}
                    onOpenLightbox={(src, caption) => setLightbox({ src, caption })}
                  />
                  <TestimonialsSection lang={lang} />
                </>
              )}

              {currentPage === 'tools' && (
                <AdvisoryToolsSection
                  lang={lang}
                  selectedTxType={selectedTxType}
                  onChangeTxType={setSelectedTxType}
                  onOpenLightbox={(src, caption) => setLightbox({ src, caption })}
                />
              )}

              {currentPage === 'contact' && (
                <ConsultationSection
                  lang={lang}
                  selectedTxType={selectedTxType}
                  onChangeTxType={setSelectedTxType}
                />
              )}
          </motion.div>
        </main>

        <Footer lang={lang} onNavigate={navigateTo} />
      </div>

      <LightboxModal
        src={lightbox.src}
        caption={lightbox.caption}
        onClose={() => setLightbox({ src: null, caption: '' })}
      />
    </div>
  );
}
