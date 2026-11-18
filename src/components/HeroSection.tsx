import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Phone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Maximize2,
  Box,
  ArrowUpRight,
  Building2,
  Calculator,
  UserCheck,
  CalendarClock,
} from 'lucide-react';
import { Language, MEDIA_ASSETS, OFFICE_INFO } from '../data/kalkaData';
import { Kalka3DViewport } from './Kalka3DViewport';
import { TiltCard3D } from './TiltCard3D';
import { PageId } from '../utils/routerLogic';

type MediaTab = 'model3d' | 'video' | 'storefront' | 'card';

interface HeroSectionProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (src: string, caption: string) => void;
}

export function HeroSection({
  lang,
  onChangeLang,
  onNavigate,
  onOpenLightbox,
}: HeroSectionProps) {
  const [mediaTab, setMediaTab] = useState<MediaTab>('model3d');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReduced = useReducedMotion();

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const directoryCards: {
    page: PageId;
    index: string;
    icon: typeof Building2;
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
  }[] = [
    {
      page: 'services',
      index: '01',
      icon: Building2,
      titleEn: 'Advisory & 11-Mo Lease Guide',
      titleHi: 'परामर्श एवं 11-माह लीज प्रक्रिया',
      descEn:
        'Sale, Purchase, RERA & uniform 11-month lease method for 1BHK–4BHK, shops & farmhouses.',
      descHi:
        'खरीद-फरोख्त, रेरा और 1BHK–4BHK, दुकान व फार्महाउस हेतु समान 11-माह लीज नियम।',
    },
    {
      page: 'tools',
      index: '02',
      icon: Calculator,
      titleEn: 'Fee Estimator & 11-Doc Checklist',
      titleHi: 'कमीशन कैलकुलेटर व 11 दस्तावेज',
      descEn:
        'Calculate 2% brokerage, 15-day rent fees, check seller papers & read MCD office rules.',
      descHi:
        'कमीशन व रजिस्ट्रेशन शुल्क जांचें, विक्रेता के 11 कागजात व एम.सी.डी. नियम देखें।',
    },
    {
      page: 'leadership',
      index: '03',
      icon: UserCheck,
      titleEn: 'Founder Desk & Office Proof',
      titleHi: 'संस्थापक परिचय एवं ऑफिस फोटो',
      descEn:
        'Meet our principal consultant and inspect Shop No. 10 storefront & official visiting card.',
      descHi:
        'मुख्य प्रॉपर्टी सलाहकार से मिलें और मदनगीर दुकान नं. 10 व विजिटिंग कार्ड देखें।',
    },
    {
      page: 'contact',
      index: '04',
      icon: CalendarClock,
      titleEn: 'Book Madangir Office Slot',
      titleHi: 'मदनगीर ऑफिस विजिट बुक करें',
      descEn:
        'Reserve an in-person title review or site visit slot with direct phone desk confirmation.',
      descHi:
        'दस्तावेज जांच या मकान-दुकान देखने के लिए अपना समय व विजिट स्लॉट पक्का करें।',
    },
  ];

  return (
    <section id="top" className="relative bg-transparent">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Proposition & Primary Action */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121620]/82 p-6 sm:p-8 lg:col-span-6"
          >
            <div>
              {/* Language Switcher + Unboxed Location Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 sm:flex-nowrap">
                <div className="flex min-w-0 items-center gap-x-2 text-xs font-medium text-slate-300">
                  <span className="truncate">
                    {lang === 'en'
                      ? 'Madangir, New Delhi · 110062'
                      : 'मदनगीर, नई दिल्ली · 110062'}
                  </span>
                  <span className="hidden xl:inline" aria-hidden="true">
                    ·
                  </span>
                  <span className="hidden xl:inline truncate text-amber-400">
                    {lang === 'en'
                      ? '3D Property Advisory'
                      : '3D प्रॉपर्टी कंसल्टिंग'}
                  </span>
                </div>

                <div
                  role="group"
                  aria-label="Language selection"
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-[#0B0E14] p-1"
                >
                  <button
                    type="button"
                    onClick={() => onChangeLang('en')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[#B91C1C] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeLang('hi')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                      lang === 'hi'
                        ? 'bg-[#B91C1C] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              <h1
                className="mt-6 font-display font-bold tracking-tight text-white"
                style={{
                  fontSize: 'clamp(2.1rem, 3.5vw, 3.25rem)',
                  lineHeight: 1.08,
                  textWrap: 'balance',
                }}
              >
                {lang === 'en'
                  ? 'Clear-Title Property Advisory for South Delhi Homes & Shops.'
                  : 'दक्षिण दिल्ली में मकान, दुकान व फ्लैट के लिए विश्वसनीय प्रॉपर्टी कंसल्टिंग।'}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
                {lang === 'en'
                  ? 'Explore our Madangir Shop No. 10 & Builder Floor structure in interactive 3D, watch the Earth-to-Shop drone tour, verify 11-point seller records, and estimate exact fees before booking.'
                  : 'कालका प्रोपर्टीज की दुकान नं. 10 व बिल्डर फ्लोर को इंटरैक्टिव 3D मॉडल में देखें, ड्रोन वीडियो चलाएं, विक्रेता के 11 दस्तावेज जांचें और सटीक शुल्क गणना करें।'}
              </p>

              {/* Primary CTA + Secondary Direct Call */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-[#B91C1C] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#DC2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF4444] cursor-pointer"
                >
                  <span>
                    {lang === 'en'
                      ? 'Schedule Office Visit & Advisory'
                      : 'ऑफिस विजिट व परामर्श बुक करें'}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href={`tel:+91${OFFICE_INFO.phones[0]}`}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-white/15 bg-[#0B0E14] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:border-amber-400/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
                  <span className="font-mono-num">+91 98111 20585</span>
                </a>
              </div>
            </div>

            {/* Quiet Operational Note */}
            <div className="mt-8 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-300">
              <span className="font-semibold text-amber-400">
                {lang === 'en' ? 'Transparent Visit Policy: ' : 'स्पष्ट विजिट नियम: '}
              </span>
              {lang === 'en'
                ? '₹500 one-time registration fee prior to property or shop showing. Strictly zero deals on encroached, court-disputed, or bank-mortgaged properties.'
                : 'मकान या दुकान देखने से पहले ₹500/- रजिस्ट्रेशन फीस लागू है। कब्जे वाली, कोर्ट विवादित या बैंक में गिरवी संपत्ति का कोई सौदा नहीं किया जाता।'}
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Architectural Stage + Real Media Switcher */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-white/15 bg-[#121620]/95 p-3 text-white shadow-2xl lg:col-span-6"
          >
            <div className="flex items-center justify-between gap-2 pb-2.5">
              <div
                role="tablist"
                aria-label={lang === 'en' ? 'Office 3D and media switcher' : '3D मॉडल व मीडिया विकल्प'}
                className="flex flex-wrap items-center gap-1 rounded-lg bg-white/10 p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mediaTab === 'model3d'}
                  onClick={() => setMediaTab('model3d')}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                    mediaTab === 'model3d'
                      ? 'bg-white text-[#16191D]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Box className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{lang === 'en' ? '3D Model' : '3D मॉडल'}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mediaTab === 'video'}
                  onClick={() => setMediaTab('video')}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                    mediaTab === 'video'
                      ? 'bg-white text-[#16191D]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Drone Tour' : 'ड्रोन वीडियो'}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mediaTab === 'storefront'}
                  onClick={() => setMediaTab('storefront')}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                    mediaTab === 'storefront'
                      ? 'bg-white text-[#16191D]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Storefront' : 'दुकान'}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mediaTab === 'card'}
                  onClick={() => setMediaTab('card')}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                    mediaTab === 'card'
                      ? 'bg-white text-[#16191D]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Visiting Card' : 'कार्ड'}
                </button>
              </div>

              {(mediaTab === 'storefront' || mediaTab === 'card') && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenLightbox(
                      mediaTab === 'storefront'
                        ? MEDIA_ASSETS.storefrontPhoto
                        : MEDIA_ASSETS.visitingCardPhoto,
                      mediaTab === 'storefront'
                        ? 'Kalka Properties Storefront — Shop No. 10, Madangir'
                        : 'Kalka Properties Official Business Card'
                    )
                  }
                  aria-label="Inspect full size image"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-neutral-200 hover:bg-white/20 hover:text-white cursor-pointer"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative h-[410px] w-full overflow-hidden rounded-lg bg-[#0D0F12] sm:h-[450px]">
              <div
                className={
                  mediaTab === 'model3d'
                    ? 'h-full w-full'
                    : 'pointer-events-none invisible absolute inset-0 h-full w-full'
                }
              >
                <Kalka3DViewport
                  lang={lang}
                  active={mediaTab === 'model3d'}
                  onSelectFloorForConsult={() => undefined}
                />
              </div>

              {mediaTab === 'video' && (
                <div className="relative flex h-full w-full items-center justify-center">
                  <video
                    ref={videoRef}
                    src={MEDIA_ASSETS.droneVideo}
                    poster={MEDIA_ASSETS.storefrontPhoto}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="h-full w-full object-contain"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-neutral-200">
                      {lang === 'en'
                        ? 'Earth-to-Shop Drone Approach · Madangir'
                        : 'मदनगीर ऑफिस ड्रोन व्यू'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pause drone video' : 'Play drone video'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/70 text-white hover:bg-black cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute drone video' : 'Mute drone video'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/70 text-white hover:bg-black cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {mediaTab === 'storefront' &&
                (!imgError.storefront ? (
                  <img
                    src={MEDIA_ASSETS.storefrontPhoto}
                    alt="Kalka Properties office storefront at Shop No. 10, Madangir, New Delhi"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError((prev) => ({ ...prev, storefront: true }))}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-neutral-300">
                    Kalka Properties Storefront — Shop No. 10, Madangir
                  </div>
                ))}

              {mediaTab === 'card' &&
                (!imgError.card ? (
                  <img
                    src={MEDIA_ASSETS.visitingCardPhoto}
                    alt="Kalka Properties official visiting card with phone numbers 9811120585 and 9899955243"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError((prev) => ({ ...prev, card: true }))}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-neutral-300">
                    Kalka Properties — 9811120585 · 9899955243
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-2.5 text-xs text-slate-300">
              <span className="truncate">
                {mediaTab === 'model3d'
                  ? lang === 'en'
                    ? 'Drag to Orbit · Scroll to Zoom · Click Floor to Inspect'
                    : 'घुमाने के लिए ड्रैग करें · ज़ूम करें · फ्लोर पर क्लिक करें'
                  : lang === 'en'
                    ? 'Shop No. 10, Krishna Mandir, Madangir'
                    : 'दुकान नं. 10, कृष्ण मंदिर, मदनगीर'}
              </span>
              <span className="font-mono-num shrink-0 text-amber-400">
                9811120585
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Width 4-Column Credentials Strip */}
      <div className="border-t border-b border-white/10 bg-[#121620]/85">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-num text-xs font-medium text-amber-400">01</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {lang === 'en' ? 'Office Location' : 'कार्यालय पता'}
            </div>
            <div className="mt-0.5 text-xs text-slate-300">
              {lang === 'en'
                ? 'Shop No. 10, Near Pili Building School'
                : 'दुकान नं. 10, पीली बिल्डिंग स्कूल के पास'}
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-num text-xs font-medium text-amber-400">02</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {lang === 'en' ? 'Property Segments' : 'संपत्ति श्रेणियां'}
            </div>
            <div className="mt-0.5 text-xs text-slate-300">
              {lang === 'en'
                ? '1BHK–4BHK · Shop · Farmhouse · Plots'
                : '1BHK–4BHK · दुकान · फार्महाउस · प्लॉट'}
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-num text-xs font-medium text-amber-400">03</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {lang === 'en' ? 'Advisory & Finance' : 'रजिस्ट्रेशन व लोन'}
            </div>
            <div className="mt-0.5 text-xs text-slate-300">
              {lang === 'en'
                ? 'RERA · Registration · Loan Facility'
                : 'प्रॉपर्टी रजिस्ट्रेशन · रेरा · लोन सुविधा'}
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-num text-xs font-medium text-amber-400">04</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {lang === 'en' ? 'Direct Advisory Desk' : 'सीधा संपर्क नंबर'}
            </div>
            <div className="mt-0.5 font-mono-num text-xs text-slate-300">
              9811120585 · 9899955243
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Page Quick Directory Cards */}
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5">
          <h2 className="font-display text-lg font-bold text-white sm:text-xl">
            {lang === 'en'
              ? 'Explore Consulting Sections'
              : 'परामर्श अनुभाग खोलें'}
          </h2>
          <span className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Select a dedicated page to calculate fees, verify records, or book a visit'
              : 'शुल्क गणना, दस्तावेज जांच या विजिट बुकिंग के लिए पेज चुनें'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {directoryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <TiltCard3D key={card.page} delay={idx * 0.05} intensity={5}>
                <button
                  type="button"
                  onClick={() => onNavigate(card.page)}
                  className="group flex h-full w-full flex-col justify-between rounded-xl border border-white/10 bg-[#141923]/88 p-5 text-left transition-colors hover:border-amber-400/45 hover:bg-[#19202D] cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-num text-xs font-semibold text-amber-400">
                        {card.index}
                      </span>
                      <Icon className="h-4 w-4 text-slate-300 group-hover:text-white" />
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      {lang === 'en' ? card.titleEn : card.titleHi}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      {lang === 'en' ? card.descEn : card.descHi}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#F87171] group-hover:text-white">
                    <span>{lang === 'en' ? 'Open Page' : 'पेज खोलें'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
