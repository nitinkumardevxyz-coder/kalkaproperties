import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Expand, PhoneCall } from 'lucide-react';
import { Language, MEDIA_ASSETS, OFFICE_INFO } from '../data/kalkaData';
import { TiltCard3D } from './TiltCard3D';

interface LeadershipSectionProps {
  lang: Language;
  onOpenLightbox: (src: string, caption: string) => void;
}

export function LeadershipSection({ lang, onOpenLightbox }: LeadershipSectionProps) {
  const [ownerError, setOwnerError] = useState(false);
  const [storeError, setStoreError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <section id="leadership" className="relative bg-transparent py-12 text-white lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Founder Portrait with 3D Perspective Tilt */}
          <TiltCard3D intensity={5} className="lg:col-span-5">
            <div className="h-full overflow-hidden rounded-xl border border-white/15 bg-[#141923]/92 shadow-2xl">
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#1B212E]">
                {!ownerError ? (
                  <img
                    src={MEDIA_ASSETS.ownerPhoto}
                    alt="Founder & Principal Property Consultant at Kalka Properties, Madangir, New Delhi"
                    referrerPolicy="no-referrer"
                    onError={() => setOwnerError(true)}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-sm text-neutral-300">
                    <span className="font-display text-lg font-bold text-white">
                      {lang === 'en' ? OFFICE_INFO.brandEn : OFFICE_INFO.brandHi}
                    </span>
                    <span className="mt-1 text-xs text-neutral-400">
                      Principal Consultant · Madangir, New Delhi
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                <div>
                  <div className="font-display text-base font-bold text-white">
                    {lang === 'en'
                      ? 'Founder & Principal Consultant'
                      : 'संस्थापक एवं मुख्य प्रॉपर्टी सलाहकार'}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-300">
                    {lang === 'en' ? OFFICE_INFO.brandEn : OFFICE_INFO.brandHi} · Madangir
                  </div>
                </div>
                <a
                  href={`tel:+91${OFFICE_INFO.phones[0]}`}
                  aria-label="Call Kalka Properties founder desk"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#B91C1C] text-white transition-transform duration-150 hover:scale-105 hover:bg-[#DC2626]"
                >
                  <PhoneCall className="h-4 w-4" />
                </a>
              </div>
            </div>
          </TiltCard3D>

          {/* Advisory Ethos & Office Proof */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#141923]/88 p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <p className="text-xs font-semibold tracking-wide text-amber-400">
                {lang === 'en' ? 'Leadership & Accountability' : 'नेतृत्व एवं कार्यप्रणाली'}
              </p>
              <h1
                className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'en'
                  ? 'Every Transaction Backed by Strict Title Discipline and Local Accountability.'
                  : 'हर सौदा पूर्ण कागजी जांच, पारदर्शिता और स्थानीय विश्वास पर आधारित।'}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                {lang === 'en'
                  ? 'Operating directly from Shop No. 10, Krishna Mandir near Pili Building School in Madangir, our consulting desk protects both buyers and sellers from title disputes, hidden loans, incomplete heirship records, and unauthorized construction risks.'
                  : 'मदनगीर में पीली बिल्डिंग स्कूल के पास कृष्ण मंदिर स्थित हमारे कार्यालय से हम खरीदारों और विक्रेताओं को किसी भी विवाद, अधूरी ओनर चेन, बैंक गिरवी या अनधिकृत निर्माण के जोखिम से सुरक्षित रखते हैं।'}
              </p>

              {/* 3 Concrete Trust Commitments */}
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                    <span>{lang === 'en' ? 'Clear-Title Only' : 'स्पष्ट दस्तावेज नीति'}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {lang === 'en'
                      ? 'Zero deals on encroached, court-disputed, or bank-mortgaged properties.'
                      : 'कब्जे वाली, कोर्ट केस या बैंक में रखी संपत्ति का कोई सौदा नहीं।'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                    <span>{lang === 'en' ? 'Verified Parties' : 'सत्यापित पहचान'}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {lang === 'en'
                      ? 'Aadhaar, PAN, Voter ID, 4 photos & 2 guarantors checked on every file.'
                      : 'प्रत्येक सौदे में आधार, पैन, वोटर आईडी, 4 फोटो व 2 गारंटर अनिवार्य।'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                    <span>{lang === 'en' ? 'CCTV Monitored Desk' : 'CCTV सुरक्षित ऑफिस'}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {lang === 'en'
                      ? 'Structured office decorum under 24/7 CCTV surveillance for client safety.'
                      : 'ग्राहकों की सुरक्षा हेतु पूरा कार्यालय 24 घंटे CCTV निगरानी में।'}
                  </p>
                </div>
              </div>
            </div>

            {/* Real Office Visual Proof Strip (Click to zoom) */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-xs font-medium text-slate-300">
                {lang === 'en'
                  ? 'Verify Our Physical Office & Visiting Card (click to enlarge)'
                  : 'हमारे कार्यालय व विजिटिंग कार्ड की वास्तविक तस्वीरें (बड़ा देखने के लिए क्लिक करें)'}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TiltCard3D intensity={6}>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        MEDIA_ASSETS.storefrontPhoto,
                        'Kalka Properties Storefront — Shop No. 10, Madangir, New Delhi'
                      )
                    }
                    className="group flex w-full items-center gap-3 rounded-lg border border-white/10 bg-[#0B0E14]/90 p-2.5 text-left transition-colors hover:border-amber-400/50 cursor-pointer"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-black/40">
                      {!storeError && (
                        <img
                          src={MEDIA_ASSETS.storefrontPhoto}
                          alt="Kalka Properties Storefront thumbnail"
                          referrerPolicy="no-referrer"
                          onError={() => setStoreError(true)}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-white">
                        <span className="truncate">
                          {lang === 'en' ? 'Madangir Office Front' : 'मदनगीर ऑफिस फोटो'}
                        </span>
                        <Expand className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-white" />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-300">
                        Shop No. 10 · Loan &amp; Registration
                      </p>
                    </div>
                  </button>
                </TiltCard3D>

                <TiltCard3D intensity={6}>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        MEDIA_ASSETS.visitingCardPhoto,
                        'Kalka Properties Official Business Card — 9811120585, 9899955243'
                      )
                    }
                    className="group flex w-full items-center gap-3 rounded-lg border border-white/10 bg-[#0B0E14]/90 p-2.5 text-left transition-colors hover:border-amber-400/50 cursor-pointer"
                  >
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md bg-black/40">
                      {!cardError && (
                        <img
                          src={MEDIA_ASSETS.visitingCardPhoto}
                          alt="Kalka Properties Business Card thumbnail"
                          referrerPolicy="no-referrer"
                          onError={() => setCardError(true)}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-white">
                        <span className="truncate">
                          {lang === 'en' ? 'Official Business Card' : 'आधिकारिक विजिटिंग कार्ड'}
                        </span>
                        <Expand className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-white" />
                      </div>
                      <p className="mt-0.5 truncate font-mono-num text-xs text-slate-300">
                        9811120585 · 9899955243
                      </p>
                    </div>
                  </button>
                </TiltCard3D>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
