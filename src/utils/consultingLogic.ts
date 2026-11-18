export type TransactionType = 'buy' | 'sell' | 'rent' | 'lease';

export interface FeeBreakdownItem {
  labelEn: string;
  labelHi: string;
  amount: number | null; // null indicates variable / statutory
  noteEn: string;
  noteHi: string;
}

export interface TransactionEstimate {
  transactionType: TransactionType;
  baseAmount: number;
  visitRegistrationFee: number;
  commissionAmount: number;
  documentationFee: number;
  upfrontRentOrAdvance: number;
  totalPayableToDeskAndAdvance: number;
  items: FeeBreakdownItem[];
}

export const VISIT_REGISTRATION_FEE = 500;

export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function calculateTransactionEstimate(
  transactionType: TransactionType,
  rawAmount: number
): TransactionEstimate {
  const safeAmount = Number.isFinite(rawAmount) && rawAmount > 0 ? Math.round(rawAmount) : 0;

  if (transactionType === 'buy') {
    const commissionAmount = Math.round(safeAmount * 0.02);
    const documentationFee = 3000;
    const totalPayableToDeskAndAdvance =
      VISIT_REGISTRATION_FEE + commissionAmount + documentationFee;

    return {
      transactionType,
      baseAmount: safeAmount,
      visitRegistrationFee: VISIT_REGISTRATION_FEE,
      commissionAmount,
      documentationFee,
      upfrontRentOrAdvance: 0,
      totalPayableToDeskAndAdvance,
      items: [
        {
          labelEn: 'Site Visit Registration Fee',
          labelHi: 'रजिस्ट्रेशन / मकान देखने की फीस',
          amount: VISIT_REGISTRATION_FEE,
          noteEn: 'Payable once before property & shop showing',
          noteHi: 'मकान या दुकान देखने से पहले एक बार देय',
        },
        {
          labelEn: 'Buyer Brokerage (2%)',
          labelHi: 'खरीदार कमीशन (2%)',
          amount: commissionAmount,
          noteEn: 'Collected upfront along with Bayana (token)',
          noteHi: 'बयाने के साथ पहले ही देय',
        },
        {
          labelEn: 'GPA / Documentation Fee',
          labelHi: 'जी.पी. / दस्तावेज शुल्क',
          amount: documentationFee,
          noteEn: 'Fixed ₹3,000 paperwork fee',
          noteHi: 'निर्धारित ₹3,000/- कागजी शुल्क',
        },
        {
          labelEn: 'Circle-Rate Registry Charges',
          labelHi: 'सर्किल रेट रजिस्ट्री खर्च',
          amount: null,
          noteEn: 'As per Delhi Govt circle rate (borne by buyer)',
          noteHi: 'सर्किल रेट के अनुसार खरीदार द्वारा देय',
        },
      ],
    };
  }

  if (transactionType === 'sell') {
    return {
      transactionType,
      baseAmount: safeAmount,
      visitRegistrationFee: VISIT_REGISTRATION_FEE,
      commissionAmount: 0,
      documentationFee: 0,
      upfrontRentOrAdvance: 0,
      totalPayableToDeskAndAdvance: VISIT_REGISTRATION_FEE,
      items: [
        {
          labelEn: 'Listing & Verification Registration',
          labelHi: 'रजिस्ट्रेशन एवं फाइल शुल्क',
          amount: VISIT_REGISTRATION_FEE,
          noteEn: 'One-time registration & initial document check',
          noteHi: 'प्रारंभिक दस्तावेज जांच एवं पंजीकरण शुल्क',
        },
        {
          labelEn: 'New Registry / GPA Paperwork',
          labelHi: 'नये दस्तावेज (रजिस्ट्री / जी.पी.)',
          amount: null,
          noteEn: 'Borne by seller when creating missing chain docs',
          noteHi: 'नये दस्तावेज बनवाने पर सेलर द्वारा देय',
        },
        {
          labelEn: 'Utility & House Tax Clearance',
          labelHi: 'बिजली-पानी बिल एवं हाउस टैक्स',
          amount: null,
          noteEn: '3-month paid utility bills & cleared MCD House Tax mandatory',
          noteHi: '3 महीने के बिल व पुराना हाउस टैक्स क्लियर होना अनिवार्य',
        },
      ],
    };
  }

  if (transactionType === 'rent') {
    const commissionAmount = Math.round(safeAmount * 0.5); // 15 days rent = 50% of 1 month
    const upfrontRentOrAdvance = safeAmount * 2; // 1 month advance + 1 month running rent
    const totalPayableToDeskAndAdvance =
      VISIT_REGISTRATION_FEE + commissionAmount + upfrontRentOrAdvance;

    return {
      transactionType,
      baseAmount: safeAmount,
      visitRegistrationFee: VISIT_REGISTRATION_FEE,
      commissionAmount,
      documentationFee: 0,
      upfrontRentOrAdvance,
      totalPayableToDeskAndAdvance,
      items: [
        {
          labelEn: 'Site Visit Registration Fee',
          labelHi: 'रजिस्ट्रेशन शुल्क',
          amount: VISIT_REGISTRATION_FEE,
          noteEn: 'Payable prior to property inspection',
          noteHi: 'मकान देखने से पहले देय',
        },
        {
          labelEn: 'Brokerage (15 Days Rent)',
          labelHi: 'कमीशन (15 दिन का किराया)',
          amount: commissionAmount,
          noteEn: 'Standard half-month rent commission',
          noteHi: 'किराये का आधा (15 दिन) कमीशन',
        },
        {
          labelEn: '1 Month Advance + 1 Month Current Rent',
          labelHi: '1 माह एडवांस + 1 माह चालू किराया',
          amount: upfrontRentOrAdvance,
          noteEn: 'Paid at 11-month agreement signing',
          noteHi: '11 महीने के एग्रीमेंट के समय देय',
        },
      ],
    };
  }

  // lease
  const commissionAmount = Math.round(safeAmount * 0.05);
  const documentationFee = 2000;
  const totalPayableToDeskAndAdvance =
    VISIT_REGISTRATION_FEE + commissionAmount + documentationFee;

  return {
    transactionType,
    baseAmount: safeAmount,
    visitRegistrationFee: VISIT_REGISTRATION_FEE,
    commissionAmount,
    documentationFee,
    upfrontRentOrAdvance: 0,
    totalPayableToDeskAndAdvance,
    items: [
      {
        labelEn: 'Site Visit Registration Fee',
        labelHi: 'रजिस्ट्रेशन शुल्क',
        amount: VISIT_REGISTRATION_FEE,
        noteEn: 'Payable before property showing',
        noteHi: 'दुकान या मकान देखने से पहले देय',
      },
      {
        labelEn: 'Lease Brokerage (5%)',
        labelHi: 'लीज कमीशन (5%)',
        amount: commissionAmount,
        noteEn: '5% commission on total lease value',
        noteHi: 'लीज मूल्य पर 5% कमीशन देय',
      },
      {
        labelEn: 'Agreement & Police Verification Filing',
        labelHi: 'एग्रीमेंट शुल्क + पुलिस वेरिफिकेशन',
        amount: documentationFee,
        noteEn: 'Fixed ₹2,000 agreement charge; police verification mandatory',
        noteHi: '₹2,000/- एग्रीमेंट शुल्क व अनिवार्य पुलिस वेरिफिकेशन',
      },
    ],
  };
}

export interface ChecklistProgress {
  readyCount: number;
  totalCount: number;
  percent: number;
  status: 'incomplete' | 'partial' | 'ready';
}

export function calculateChecklistProgress(
  checkedIds: string[],
  totalCount: number
): ChecklistProgress {
  if (totalCount <= 0) {
    return { readyCount: 0, totalCount: 0, percent: 0, status: 'incomplete' };
  }
  const uniqueChecked = new Set(checkedIds);
  const readyCount = Math.min(uniqueChecked.size, totalCount);
  const percent = Math.round((readyCount / totalCount) * 100);
  const status =
    readyCount === 0 ? 'incomplete' : readyCount >= totalCount ? 'ready' : 'partial';

  return { readyCount, totalCount, percent, status };
}

export interface ConsultationFormInput {
  fullName: string;
  phone: string;
  transactionType: TransactionType;
  propertyCategory: string;
  notes: string;
}

export interface ConsultationValidationResult {
  isValid: boolean;
  normalizedPhone: string;
  errors: {
    fullName?: string;
    phone?: string;
    propertyCategory?: string;
  };
}

export function normalizeIndianPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function validateConsultationForm(
  input: ConsultationFormInput
): ConsultationValidationResult {
  const errors: ConsultationValidationResult['errors'] = {};
  const trimmedName = input.fullName.trim();
  const normalizedPhone = normalizeIndianPhone(input.phone);

  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!input.propertyCategory.trim()) {
    errors.propertyCategory = 'Please select a property category.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    normalizedPhone,
    errors,
  };
}

export type LeaseUnitType =
  | '1bhk'
  | '2bhk'
  | '3bhk'
  | '4bhk'
  | 'shop'
  | 'farmhouse'
  | 'flat';

export interface LeaseUnitOption {
  id: LeaseUnitType;
  labelEn: string;
  labelHi: string;
}

export const LEASE_UNIT_OPTIONS: LeaseUnitOption[] = [
  { id: '1bhk', labelEn: '1 BHK', labelHi: '1 BHK' },
  { id: '2bhk', labelEn: '2 BHK', labelHi: '2 BHK' },
  { id: '3bhk', labelEn: '3 BHK', labelHi: '3 BHK' },
  { id: '4bhk', labelEn: '4 BHK', labelHi: '4 BHK' },
  { id: 'shop', labelEn: 'Shop', labelHi: 'दुकान (Shop)' },
  { id: 'farmhouse', labelEn: 'Farmhouse', labelHi: 'फार्महाउस' },
  { id: 'flat', labelEn: 'Flat', labelHi: 'फ्लैट (Flat)' },
];

export function getUniformLeaseProcessingSummary(
  unitType: LeaseUnitType,
  monthlyRent: number
) {
  const estimate = calculateTransactionEstimate('rent', monthlyRent);
  return {
    unitType,
    processingDurationMonths: 11,
    dependsOnBedrooms: false,
    governingFactors: ['rent_amount', 'security_deposit', 'state_rules'] as const,
    estimate,
  };
}

