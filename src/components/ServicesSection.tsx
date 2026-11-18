import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language, SERVICES, UNIFORM_LEASE_POLICY } from '../data/kalkaData';
import { LEASE_UNIT_OPTIONS, TransactionType } from '../utils/consultingLogic';
import { TiltCard3D } from './TiltCard3D';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceTransaction: (txType: TransactionType) => void;
}

const SERVICE_TX_MAP: Record<string, TransactionType> = {
  'residential-sales': 'buy',
  'commercial-leasing': 'rent',
  'legal-rera': 'sell',
  'loan-facility': 'buy',
};

export function ServicesSection({
  lang,
  onSelectServiceTransaction,
}: ServicesSectionProps) {
  return (
    <section id="services" className="relative bg-transparent py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-400">
              {lang === 'en' ? 'Advisory Practice' : 'परामर्श एवं सेवा क्षेत्र'}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {lang === 'en'
                ? 'Four Core Consulting Pillars'
                : 'प्रॉपर्टी और बिजनेस कंसल्टिंग की मुख्य सेवाएं'}
            </h1>
          </div>
          <p className="max-w-md text-sm text-slate-300">
            {lang === 'en'
              ? 'Structured brokerage, legal title verification, and loan desk guidance tailored for South Delhi buyers, sellers, and commercial tenants.'
              : 'दक्षिण दिल्ली के खरीदारों, विक्रेताओं और किरायेदारों के लिए सुरक्षित सौदा, दस्तावेज जांच और होम लोन सहायता।'}
          </p>
        </div>

        {/* Asymmetric 3D-Tilt Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const title = lang === 'en' ? service.titleEn : service.titleHi;
            const subtitle = lang === 'en' ? service.subtitleEn : service.subtitleHi;
            const desc = lang === 'en' ? service.descEn : service.descHi;
            const deliverables =
              lang === 'en' ? service.deliverablesEn : service.deliverablesHi;

            return (
              <TiltCard3D
                key={service.id}
                delay={idx * 0.06}
                intensity={4}
                className={service.span === 'wide' ? 'lg:col-span-2' : 'lg:col-span-1'}
              >
                <article className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#141923]/90 p-6 shadow-xl transition-colors duration-150 hover:border-amber-400/40">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono-num text-sm font-semibold text-amber-400">
                        {service.index}.
                      </span>
                      <span className="text-right text-xs font-medium text-slate-300">
                        {subtitle}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-xl font-bold text-white">
                      {title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {desc}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-200">
                      {deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectServiceTransaction(SERVICE_TX_MAP[service.id] ?? 'buy')
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-white cursor-pointer whitespace-nowrap"
                    >
                      <span>
                        {lang === 'en'
                          ? 'Estimate fees & book consultation'
                          : 'शुल्क देखें और परामर्श लें'}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Dedicated Uniform 11-Month Lease Architecture Module */}
        <TiltCard3D delay={0.12} intensity={3} className="mt-10">
          <div className="rounded-xl border border-amber-500/30 bg-[#141923]/92 p-6 shadow-2xl sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold tracking-wide text-amber-400">
                  {lang === 'en'
                    ? '11-Month Agreement Legal Standard'
                    : '11 महीने का मानक लीज नियम'}
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-bold text-white">
                  {lang === 'en'
                    ? UNIFORM_LEASE_POLICY.titleEn
                    : UNIFORM_LEASE_POLICY.titleHi}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceTransaction('rent')}
                className="inline-flex items-center gap-1.5 self-start rounded-lg bg-[#B91C1C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#DC2626] cursor-pointer whitespace-nowrap"
              >
                <span>
                  {lang === 'en'
                    ? 'Open 11-Month Rent Estimator'
                    : '11-माह किराया कैलकुलेटर खोलें'}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-200 sm:text-base">
              {lang === 'en'
                ? UNIFORM_LEASE_POLICY.summaryEn
                : UNIFORM_LEASE_POLICY.summaryHi}
            </p>

            {/* All Covered Property Categories */}
            <div className="mt-6 flex flex-wrap gap-2">
              {LEASE_UNIT_OPTIONS.map((unit) => (
                <span
                  key={unit.id}
                  className="rounded-md border border-white/15 bg-[#0B0E14] px-3 py-1.5 font-mono-num text-xs font-semibold text-amber-300"
                >
                  {lang === 'en' ? unit.labelEn : unit.labelHi}
                </span>
              ))}
            </div>

            {/* 3 Governing Factors */}
            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
              {(lang === 'en'
                ? UNIFORM_LEASE_POLICY.factorsEn
                : UNIFORM_LEASE_POLICY.factorsHi
              ).map((factor) => (
                <div
                  key={factor}
                  className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-[#0D1118]/90 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-xs leading-relaxed text-slate-200">
                    {factor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard3D>
      </div>
    </section>
  );
}
