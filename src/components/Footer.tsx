import { Language, OFFICE_INFO } from '../data/kalkaData';
import { PAGE_ROUTES, PageId } from '../utils/routerLogic';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const navItems: { page: PageId; label: string }[] =
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

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#080A0F]/95 py-12 text-slate-300">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-start">
          <div className="max-w-md">
            <div className="font-display text-lg font-bold text-white">
              {lang === 'en' ? OFFICE_INFO.brandEn : OFFICE_INFO.brandHi}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {lang === 'en' ? OFFICE_INFO.addressEn : OFFICE_INFO.addressHi}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono-num text-xs text-slate-200">
              <a href={`tel:+91${OFFICE_INFO.phones[0]}`} className="hover:text-white">
                +91 {OFFICE_INFO.phones[0]}
              </a>
              <span aria-hidden="true">·</span>
              <a href={`tel:+91${OFFICE_INFO.phones[1]}`} className="hover:text-white">
                +91 {OFFICE_INFO.phones[1]}
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-300"
          >
            {navItems.map((item) => (
              <a
                key={item.page}
                href={PAGE_ROUTES[item.page]}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.page);
                }}
                className="hover:text-white cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {OFFICE_INFO.brandEn}.{' '}
            {lang === 'en'
              ? 'Sale · Purchase · Renting · Registration · Loan Advisory.'
              : 'सेल · परचेस · रेन्टिंग · रजिस्ट्रेशन · लोन परामर्श।'}
          </p>
          <p>
            {lang === 'en'
              ? 'Subject to Delhi MCD & Legal Clear-Title Norms'
              : 'दिल्ली एम.सी.डी. एवं कानूनी स्पष्ट दस्तावेज नियमों के अधीन'}
          </p>
        </div>
      </div>
    </footer>
  );
}
