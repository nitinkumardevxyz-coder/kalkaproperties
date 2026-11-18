import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FileText, RotateCcw, AlertTriangle, CheckSquare } from 'lucide-react';
import {
  Language,
  MEDIA_ASSETS,
  OFFICE_RULES,
  RuleCategory,
  SELLER_DOCUMENTS,
  UNIFORM_LEASE_POLICY,
} from '../data/kalkaData';
import {
  calculateChecklistProgress,
  calculateTransactionEstimate,
  formatINR,
  getUniformLeaseProcessingSummary,
  LEASE_UNIT_OPTIONS,
  LeaseUnitType,
  TransactionType,
} from '../utils/consultingLogic';

interface AdvisoryToolsSectionProps {
  lang: Language;
  selectedTxType: TransactionType;
  onChangeTxType: (txType: TransactionType) => void;
  onOpenLightbox: (src: string, caption: string) => void;
}

const DEFAULT_AMOUNTS: Record<TransactionType, number> = {
  buy: 4500000,
  sell: 4500000,
  rent: 15000,
  lease: 500000,
};

export function AdvisoryToolsSection({
  lang,
  selectedTxType,
  onChangeTxType,
  onOpenLightbox,
}: AdvisoryToolsSectionProps) {
  const [amountInput, setAmountInput] = useState<string>(
    String(DEFAULT_AMOUNTS[selectedTxType])
  );
  const [leaseUnit, setLeaseUnit] = useState<LeaseUnitType>('2bhk');
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  const [ruleTab, setRuleTab] = useState<RuleCategory>('all');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setAmountInput(String(DEFAULT_AMOUNTS[selectedTxType]));
  }, [selectedTxType]);

  const handleTxChange = (nextType: TransactionType) => {
    onChangeTxType(nextType);
    setAmountInput(String(DEFAULT_AMOUNTS[nextType]));
  };

  const parsedAmount = Number(amountInput.replace(/[^\d]/g, '')) || 0;

  const estimate = useMemo(() => {
    if (selectedTxType === 'rent') {
      return getUniformLeaseProcessingSummary(leaseUnit, parsedAmount).estimate;
    }
    return calculateTransactionEstimate(selectedTxType, parsedAmount);
  }, [selectedTxType, parsedAmount, leaseUnit]);

  const checklistProgress = useMemo(
    () => calculateChecklistProgress(checkedDocs, SELLER_DOCUMENTS.length),
    [checkedDocs]
  );

  const filteredRules = useMemo(
    () =>
      ruleTab === 'all'
        ? OFFICE_RULES
        : OFFICE_RULES.filter((rule) => rule.category === ruleTab),
    [ruleTab]
  );

  const toggleDoc = (docId: string) => {
    setCheckedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const txTabs: { id: TransactionType; labelEn: string; labelHi: string }[] = [
    { id: 'buy', labelEn: 'Buy Property', labelHi: 'खरीदना (Buy)' },
    { id: 'sell', labelEn: 'Sell Property', labelHi: 'बेचना (Sell)' },
    { id: 'rent', labelEn: 'Rent (11-Mo)', labelHi: 'किराया (11 माह)' },
    { id: 'lease', labelEn: 'Long Lease', labelHi: 'लीज (Lease)' },
  ];

  const ruleTabs: { id: RuleCategory; labelEn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'All Rules', labelHi: 'सभी नियम' },
    { id: 'buyers', labelEn: 'Buyers', labelHi: 'खरीदार' },
    { id: 'sellers', labelEn: 'Sellers', labelHi: 'विक्रेता' },
    { id: 'rent', labelEn: 'Rent & Lease', labelHi: 'किराया व लीज' },
    { id: 'mcd', labelEn: 'MCD & Legal', labelHi: 'MCD व कानून' },
  ];

  const amountLabel =
    selectedTxType === 'rent'
      ? lang === 'en'
        ? 'Monthly Rent (₹)'
        : 'मासिक किराया (₹)'
      : selectedTxType === 'lease'
        ? lang === 'en'
          ? 'Total Lease Value (₹)'
          : 'कुल लीज राशि (₹)'
        : lang === 'en'
          ? 'Estimated Property Value (₹)'
          : 'संपत्ति का अनुमानित मूल्य (₹)';

  return (
    <section className="relative bg-transparent py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Part 1: Fee & Commission Estimator + 11-Point Seller Checklist */}
        <div id="estimator" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 6 Cols: Interactive Fee & Commission Estimator */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-white/10 bg-[#141923]/92 p-6 shadow-2xl sm:p-8 lg:col-span-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold text-amber-400">
                  {lang === 'en' ? 'Transparent Fee Structure' : 'पारदर्शी शुल्क गणना'}
                </p>
                <h1 className="mt-1 font-display text-2xl font-bold text-white">
                  {lang === 'en'
                    ? 'Brokerage & Registration Estimator'
                    : 'कमीशन व रजिस्ट्रेशन शुल्क कैलकुलेटर'}
                </h1>
              </div>
            </div>

            {/* Transaction Segmented Selector */}
            <div
              role="group"
              aria-label={lang === 'en' ? 'Transaction type' : 'लेन-देन का प्रकार'}
              className="mt-5 grid grid-cols-2 gap-1.5 rounded-lg border border-white/10 bg-[#0B0E14] p-1 sm:grid-cols-4"
            >
              {txTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTxChange(tab.id)}
                  className={`rounded-md px-2.5 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${
                    selectedTxType === tab.id
                      ? 'bg-[#B91C1C] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? tab.labelEn : tab.labelHi}
                </button>
              ))}
            </div>

            {/* Property Size / Segment Selector for 11-Month Rent */}
            {selectedTxType === 'rent' && (
              <div className="mt-4 rounded-lg border border-amber-500/30 bg-[#0B0E14] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-amber-400">
                    {lang === 'en'
                      ? 'Select Property Segment (Uniform 11-Mo Method)'
                      : 'संपत्ति श्रेणी चुनें (समान 11-माह प्रक्रिया)'}
                  </span>
                </div>
                <div
                  role="group"
                  aria-label="11-month lease property segment"
                  className="mt-2.5 flex flex-wrap gap-1.5"
                >
                  {LEASE_UNIT_OPTIONS.map((unit) => (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => setLeaseUnit(unit.id)}
                      className={`rounded-md px-2.5 py-1.5 font-mono-num text-[11px] font-semibold cursor-pointer ${
                        leaseUnit === unit.id
                          ? 'bg-amber-500 text-[#0B0E14]'
                          : 'border border-white/10 bg-[#141923] text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang === 'en' ? unit.labelEn : unit.labelHi}
                    </button>
                  ))}
                </div>
                <p
                  data-testid="uniform-lease-note"
                  className="mt-2.5 text-[11px] leading-relaxed text-slate-300"
                >
                  {lang === 'en'
                    ? UNIFORM_LEASE_POLICY.summaryEn
                    : UNIFORM_LEASE_POLICY.summaryHi}
                </p>
              </div>
            )}

            {/* Amount Input */}
            <div className="mt-5">
              <label
                htmlFor="property-amount-input"
                className="block text-xs font-semibold text-slate-200"
              >
                {amountLabel}
              </label>
              <div className="mt-1.5 flex items-center rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 focus-within:border-[#EF4444]">
                <span className="font-mono-num text-sm font-semibold text-slate-400">
                  ₹
                </span>
                <input
                  id="property-amount-input"
                  type="number"
                  min={0}
                  step={selectedTxType === 'rent' ? 1000 : 50000}
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="font-mono-num w-full bg-transparent px-2.5 py-2.5 text-base font-semibold text-white outline-none"
                />
              </div>
            </div>

            {/* Line-item Breakdown */}
            <div className="mt-6 divide-y divide-white/10 border-t border-b border-white/10">
              {estimate.items.map((item) => (
                <div
                  key={item.labelEn}
                  className="flex items-start justify-between gap-4 py-3.5"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">
                      {lang === 'en' ? item.labelEn : item.labelHi}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {lang === 'en' ? item.noteEn : item.noteHi}
                    </div>
                  </div>
                  <div className="font-mono-num shrink-0 text-sm font-semibold text-white">
                    {item.amount !== null
                      ? formatINR(item.amount)
                      : lang === 'en'
                        ? 'As Applicable'
                        : 'नियमानुसार'}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Row */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#0B0E14] px-4 py-3.5 text-white">
              <div>
                <div className="text-xs text-slate-300">
                  {selectedTxType === 'rent'
                    ? lang === 'en'
                      ? 'Estimated Upfront (Visit + Commission + 2 Mo. Rent)'
                      : 'कुल प्रारंभिक राशि (विजिट + कमीशन + 2 माह किराया)'
                    : lang === 'en'
                      ? 'Total Desk Fee & Documentation Estimate'
                      : 'कुल अनुमानित परामर्श व दस्तावेज शुल्क'}
                </div>
              </div>
              <div
                data-testid="estimate-total"
                className="font-mono-num text-xl font-bold text-amber-400"
              >
                {formatINR(estimate.totalPayableToDeskAndAdvance)}
              </div>
            </div>
          </motion.div>

          {/* Right 6 Cols: 11-Point Seller Document Readiness Checklist */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#141923]/92 p-6 shadow-2xl sm:p-8 lg:col-span-6"
          >
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold text-amber-400">
                    {lang === 'en'
                      ? 'Official Notice for Sellers'
                      : 'बेचने वाले के लिए नोटिस'}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white">
                    {lang === 'en'
                      ? '11-Document Seller Checklist'
                      : 'विक्रेता के 11 अनिवार्य दस्तावेज'}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenLightbox(
                      MEDIA_ASSETS.sellerNoticePhoto,
                      'Official Hindi Seller Notice Board — Kalka Properties'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0B0E14] px-3 py-1.5 text-xs font-semibold text-white hover:border-amber-400/50 cursor-pointer whitespace-nowrap"
                >
                  <FileText className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                  <span>{lang === 'en' ? 'View Notice Photo' : 'असली नोटिस देखें'}</span>
                </button>
              </div>

              {/* Progress Counter */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <CheckSquare className="h-4 w-4 text-amber-400" aria-hidden="true" />
                  <span data-testid="checklist-progress-label" className="font-mono-num">
                    {checklistProgress.readyCount} / {checklistProgress.totalCount}{' '}
                    {lang === 'en' ? 'Ready' : 'तैयार'} ({checklistProgress.percent}%)
                  </span>
                </div>

                {checkedDocs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCheckedDocs([])}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{lang === 'en' ? 'Reset' : 'रीसेट'}</span>
                  </button>
                )}
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#DC2626] transition-transform duration-200 origin-left"
                  style={{
                    transform: `scaleX(${checklistProgress.percent / 100})`,
                  }}
                />
              </div>

              {/* 11 Checkboxes — Clean Hairline Rows */}
              <div className="mt-4 divide-y divide-white/10 border-t border-b border-white/10">
                {SELLER_DOCUMENTS.map((doc) => {
                  const checked = checkedDocs.includes(doc.id);
                  return (
                    <label
                      key={doc.id}
                      className={`flex cursor-pointer items-start gap-3 px-2 py-2.5 text-left transition-colors ${
                        checked ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDoc(doc.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#DC2626]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-white">
                          <span className="font-mono-num mr-1.5 text-amber-400">
                            {doc.number}.
                          </span>
                          {lang === 'en' ? doc.titleEn : doc.titleHi}
                        </div>
                        <div className="mt-0.5 text-[11px] leading-snug text-slate-400">
                          {lang === 'en' ? doc.noteEn : doc.noteHi}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-1 text-xs text-slate-300">
              {checklistProgress.status === 'ready'
                ? lang === 'en'
                  ? 'All 11 seller documents verified ready — bring originals to Shop No. 10 for listing.'
                  : 'सभी 11 दस्तावेज तैयार हैं — लिस्टिंग के लिए मूल कागजात लेकर ऑफिस आएं।'
                : lang === 'en'
                  ? 'Tick the documents you currently hold to verify readiness before visiting our desk.'
                  : 'ऑफिस आने से पहले अपने पास उपलब्ध कागजातों पर टिक करके जांच लें।'}
            </div>
          </motion.div>
        </div>

        {/* Part 2: Official Office Rules & MCD Compliance Board */}
        <motion.div
          id="rules"
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-xl border border-white/10 bg-[#141923]/92 p-6 shadow-2xl sm:p-8"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold text-amber-400">
                {lang === 'en' ? 'Office Terms & Policies' : 'नियम एवं शर्तें'}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-white">
                {lang === 'en'
                  ? 'Official Client Rules & MCD Compliance Notice'
                  : 'खरीदने, बेचने, किराये एवं एम.सी.डी. के आधिकारिक नियम'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenLightbox(
                  MEDIA_ASSETS.officeRulesPhoto,
                  'Official Rules & Terms Board — Kalka Properties Office'
                )
              }
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-white/15 bg-[#0B0E14] px-3.5 py-2 text-xs font-semibold text-white hover:border-amber-400/50 cursor-pointer whitespace-nowrap"
            >
              <FileText className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              <span>
                {lang === 'en' ? 'Inspect Rules Board Photo' : 'असली नियम बोर्ड देखें'}
              </span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label={lang === 'en' ? 'Filter rules by category' : 'नियम श्रेणी चुनें'}
            className="mt-5 flex flex-wrap items-center gap-1.5"
          >
            {ruleTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={ruleTab === tab.id}
                onClick={() => setRuleTab(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                  ruleTab === tab.id
                    ? 'bg-[#B91C1C] text-white'
                    : 'border border-white/10 bg-[#0B0E14] text-slate-300 hover:text-white'
                }`}
              >
                {lang === 'en' ? tab.labelEn : tab.labelHi}
              </button>
            ))}
          </div>

          {/* Rules Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredRules.map((rule) => (
              <div
                key={rule.id}
                className={`rounded-lg border p-4 ${
                  rule.highlight
                    ? 'border-[#EF4444]/40 bg-[#B91C1C]/12'
                    : 'border-white/10 bg-[#0B0E14]/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'en' ? rule.titleEn : rule.titleHi}
                  </h3>
                  {rule.highlight && (
                    <AlertTriangle
                      className="h-4 w-4 shrink-0 text-[#F87171]"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {lang === 'en' ? rule.detailEn : rule.detailHi}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
