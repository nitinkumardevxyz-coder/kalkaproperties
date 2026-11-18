import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, MapPin, Clock, CheckCircle2, Copy, Check } from 'lucide-react';
import { Language, OFFICE_INFO } from '../data/kalkaData';
import {
  TransactionType,
  validateConsultationForm,
} from '../utils/consultingLogic';

interface ConsultationSectionProps {
  lang: Language;
  selectedTxType: TransactionType;
  onChangeTxType: (txType: TransactionType) => void;
}

interface ConfirmedBooking {
  referenceId: string;
  fullName: string;
  phone: string;
  transactionType: TransactionType;
  propertyCategory: string;
  notes: string;
}

export function ConsultationSection({
  lang,
  selectedTxType,
  onChangeTxType,
}: ConsultationSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('Builder Floor');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    phone?: string;
    propertyCategory?: string;
  }>({});
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateConsultationForm({
      fullName,
      phone,
      transactionType: selectedTxType,
      propertyCategory,
      notes,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const suffix = validation.normalizedPhone.slice(-4);
    const refId = `KP-${new Date().getFullYear()}-${suffix}`;
    setConfirmed({
      referenceId: refId,
      fullName: fullName.trim(),
      phone: validation.normalizedPhone,
      transactionType: selectedTxType,
      propertyCategory,
      notes: notes.trim(),
    });
  };

  const handleCopyPhone = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num);
      setCopiedPhone(num);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
  };

  return (
    <section id="contact" className="relative bg-transparent py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left 5 Cols: Office Coordinates & Direct Lines */}
          <div className="rounded-xl border border-white/10 bg-[#141923]/88 p-6 sm:p-8 lg:col-span-5">
            <p className="text-xs font-semibold text-amber-400">
              {lang === 'en' ? 'Visit Our Advisory Desk' : 'कार्यालय संपर्क एवं पता'}
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {lang === 'en'
                ? 'Schedule an In-Person Consultation in Madangir'
                : 'मदनगीर ऑफिस में व्यक्तिगत परामर्श बुक करें'}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {lang === 'en'
                ? 'Bring your identification documents or property chain papers for a confidential review before site visits or Bayana negotiations.'
                : 'प्रॉपर्टी देखने या बयाने की बात करने से पहले अपने पहचान पत्र या संपत्ति के कागजात लेकर हमारे कार्यालय पधारें।'}
            </p>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    {lang === 'en' ? 'Office Address' : 'कार्यालय का पता'}
                  </div>
                  <div className="mt-0.5 text-sm text-slate-300">
                    {lang === 'en' ? OFFICE_INFO.addressEn : OFFICE_INFO.addressHi}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div className="w-full">
                  <div className="text-xs font-semibold text-white">
                    {lang === 'en' ? 'Direct Phone Numbers' : 'सीधे फोन नंबर'}
                  </div>
                  <div className="mt-1.5 flex flex-col gap-2">
                    {OFFICE_INFO.phones.map((num) => (
                      <div
                        key={num}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0B0E14] px-3 py-2"
                      >
                        <a
                          href={`tel:+91${num}`}
                          className="font-mono-num text-sm font-semibold text-white hover:text-amber-400"
                        >
                          +91 {num}
                        </a>
                        <button
                          type="button"
                          onClick={() => void handleCopyPhone(num)}
                          aria-label={`Copy phone number ${num}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedPhone === num ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    {lang === 'en' ? 'Office Timings' : 'खुलने का समय'}
                  </div>
                  <div className="mt-0.5 text-sm text-slate-300">
                    {lang === 'en' ? OFFICE_INFO.hoursEn : OFFICE_INFO.hoursHi}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Validated Consultation Request Form */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-white/10 bg-[#141923]/92 p-6 shadow-2xl sm:p-8 lg:col-span-7"
          >
            {confirmed ? (
              <div data-testid="booking-confirmation" className="space-y-5">
                <div className="flex items-start gap-3 border-b border-white/10 pb-5">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
                  <div>
                    <div className="font-mono-num text-xs font-semibold text-emerald-400">
                      {confirmed.referenceId}
                    </div>
                    <h2 className="mt-1 font-display text-xl font-bold text-white">
                      {lang === 'en'
                        ? 'Consultation Request Registered'
                        : 'परामर्श अनुरोध दर्ज हो गया है'}
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                      {lang === 'en'
                        ? 'Please present this reference at Shop No. 10, Krishna Mandir, Madangir or call 9811120585 to confirm your exact visit slot.'
                        : 'कृपया दुकान नं. 10, कृष्ण मंदिर, मदनगीर में यह रेफरेंस नंबर दिखाएं या 9811120585 पर कॉल करके समय पक्का करें।'}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-slate-400">
                      {lang === 'en' ? 'Client Name' : 'ग्राहक का नाम'}
                    </dt>
                    <dd className="mt-0.5 font-semibold text-white">
                      {confirmed.fullName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400">
                      {lang === 'en' ? 'Mobile Number' : 'मोबाइल नंबर'}
                    </dt>
                    <dd className="font-mono-num mt-0.5 font-semibold text-white">
                      +91 {confirmed.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400">
                      {lang === 'en' ? 'Advisory Type' : 'परामर्श प्रकार'}
                    </dt>
                    <dd className="mt-0.5 font-semibold capitalize text-white">
                      {confirmed.transactionType} · {confirmed.propertyCategory}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400">
                      {lang === 'en' ? 'Desk Registration Fee' : 'ऑफिस रजिस्ट्रेशन शुल्क'}
                    </dt>
                    <dd className="font-mono-num mt-0.5 font-semibold text-amber-400">
                      ₹500 (Payable at Office)
                    </dd>
                  </div>
                </dl>

                <div className="rounded-lg border border-white/10 bg-[#0B0E14] p-4 text-xs leading-relaxed text-slate-300">
                  <span className="font-semibold text-white">
                    {lang === 'en' ? 'KYC Reminder: ' : 'आवश्यक कागजात: '}
                  </span>
                  {lang === 'en'
                    ? 'Carry 4 photographs, Aadhaar Card, PAN Card, Voter ID / Driving Licence, and details of 2 guarantors if proceeding to an agreement.'
                    : 'सौदा या एग्रीमेंट के लिए 4 फोटो, आधार कार्ड, पैन कार्ड, वोटर आईडी / ड्राइविंग लाइसेंस और 2 गारंटर साथ रखें।'}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(null);
                    setFullName('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#0B0E14] px-5 py-2.5 text-xs font-semibold text-white hover:border-amber-400/50 cursor-pointer"
                >
                  {lang === 'en' ? 'Submit Another Request' : 'नया अनुरोध दर्ज करें'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-display text-xl font-bold text-white">
                    {lang === 'en'
                      ? 'Book Property Visit & Advisory Slot'
                      : 'प्रॉपर्टी विजिट एवं परामर्श फॉर्म'}
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    {lang === 'en'
                      ? 'All visits follow the standard ₹500 office registration policy.'
                      : 'सभी प्रॉपर्टी विजिट ₹500/- ऑफिस रजिस्ट्रेशन नीति के अंतर्गत आते हैं।'}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      {lang === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'en' ? 'e.g. Rajesh Kumar' : 'जैसे: राजेश कुमार'}
                      aria-invalid={Boolean(errors.fullName)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#EF4444]"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="client-phone"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      {lang === 'en' ? 'Mobile Number (10 digits) *' : 'मोबाइल नंबर (10 अंक) *'}
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      aria-invalid={Boolean(errors.phone)}
                      className="font-mono-num mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#EF4444]"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="tx-type-select"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      {lang === 'en' ? 'Requirement Type *' : 'आवश्यकता का प्रकार *'}
                    </label>
                    <select
                      id="tx-type-select"
                      value={selectedTxType}
                      onChange={(e) =>
                        onChangeTxType(e.target.value as TransactionType)
                      }
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#EF4444]"
                    >
                      <option value="buy">
                        {lang === 'en' ? 'Buy Property (Purchase)' : 'प्रॉपर्टी खरीदना (Buy)'}
                      </option>
                      <option value="sell">
                        {lang === 'en' ? 'Sell Property (Sale)' : 'प्रॉपर्टी बेचना (Sell)'}
                      </option>
                      <option value="rent">
                        {lang === 'en' ? 'Rent (11-Month Agreement)' : 'किराये पर लेना (11 माह)'}
                      </option>
                      <option value="lease">
                        {lang === 'en' ? 'Commercial / Long Lease' : 'कमर्शियल / लंबी लीज'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="property-cat-select"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      {lang === 'en' ? 'Property Category *' : 'संपत्ति श्रेणी *'}
                    </label>
                    <select
                      id="property-cat-select"
                      value={propertyCategory}
                      onChange={(e) => setPropertyCategory(e.target.value)}
                      aria-invalid={Boolean(errors.propertyCategory)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#EF4444]"
                    >
                      <option value="1BHK–4BHK Flat">
                        {lang === 'en' ? '1BHK / 2BHK / 3BHK / 4BHK Flat' : '1BHK–4BHK फ्लैट'}
                      </option>
                      <option value="House / Makan">
                        {lang === 'en' ? 'House / Independent Makan' : 'मकान (House)'}
                      </option>
                      <option value="Commercial Shop">
                        {lang === 'en' ? 'Commercial Shop / Dukaan' : 'दुकान (Commercial Shop)'}
                      </option>
                      <option value="Builder Floor">
                        {lang === 'en' ? 'Builder Floor (1st–3rd)' : 'फ्लोर (1st–3rd Floor)'}
                      </option>
                      <option value="Farmhouse">
                        {lang === 'en' ? 'Farmhouse' : 'फार्महाउस'}
                      </option>
                      <option value="Residential / Commercial Plot">
                        {lang === 'en' ? 'Plot / Registration / Loan' : 'प्लॉट / रजिस्ट्रेशन / लोन'}
                      </option>
                    </select>
                    {errors.propertyCategory && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                        {errors.propertyCategory}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="client-notes"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    {lang === 'en'
                      ? 'Preferred Location, Budget & Loan Requirement'
                      : 'पसंदीदा क्षेत्र, बजट या लोन आवश्यकता (वैकल्पिक)'}
                  </label>
                  <textarea
                    id="client-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'e.g. 2 BHK floor or shop near Krishna Mandir, Madangir · 11-month agreement'
                        : 'जैसे: मदनगीर में 2 BHK फ्लोर या मुख्य रोड पर दुकान की तलाश'
                    }
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#EF4444]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <span className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'No 4th/5th floor deals · Clear-title verification guaranteed'
                      : 'चौथा-पाँचवा फ्लोर सौदा निषिद्ध · स्पष्ट कागजात की गारंटी'}
                  </span>

                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#B91C1C] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#DC2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF4444] cursor-pointer"
                  >
                    {lang === 'en'
                      ? 'Confirm Consultation Request'
                      : 'परामर्श अनुरोध पक्का करें'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
