import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, OFFICE_INFO } from '../data/kalkaData';
import { PAGE_ROUTES, PageId } from '../utils/routerLogic';

interface NavbarProps {
  lang: Language;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Navbar({ lang, currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: { page: PageId; label: string }[] =
    lang === 'en'
      ? [
          { page: 'home', label: 'Home' },
          { page: 'services', label: 'Services' },
          { page: 'leadership', label: 'Leadership' },
          { page: 'tools', label: 'Estimator & Rules' },
          { page: 'contact', label: 'Contact' },
        ]
      : [
          { page: 'home', label: 'होम' },
          { page: 'services', label: 'सेवाएं' },
          { page: 'leadership', label: 'नेतृत्व' },
          { page: 'tools', label: 'शुल्क व नियम' },
          { page: 'contact', label: 'संपर्क' },
        ];

  const brandName = lang === 'en' ? OFFICE_INFO.brandEn : OFFICE_INFO.brandHi;
  const ctaLabel = lang === 'en' ? 'Book Consultation' : 'परामर्श बुक करें';

  const handleLinkClick = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0E14]/95">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href={PAGE_ROUTES.home}
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF4444]"
        >
          {brandName}
        </a>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label={lang === 'en' ? 'Primary navigation' : 'मुख्य नेविगेशन'}
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {navLinks.map((item) => {
            const active = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={PAGE_ROUTES[item.page]}
                aria-current={active ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, item.page)}
                className={`relative whitespace-nowrap shrink-0 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF4444] ${
                  active
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#DC2626]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + mobile menu toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#B91C1C] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#DC2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF4444] cursor-pointer"
          >
            {ctaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-[#141923] text-white md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF4444] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#10141D] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = currentPage === item.page;
              return (
                <a
                  key={item.page}
                  href={PAGE_ROUTES[item.page]}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.page)}
                  className={`flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium ${
                    active
                      ? 'bg-[#B91C1C]/20 text-white border border-[#DC2626]/40'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigate('contact');
              }}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#B91C1C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#DC2626] cursor-pointer"
            >
              {ctaLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
