export type Language = 'en' | 'hi';

export interface AssetMedia {
  droneVideo: string;
  ownerPhoto: string;
  storefrontPhoto: string;
  visitingCardPhoto: string;
  sellerNoticePhoto: string;
  officeRulesPhoto: string;
}

export const MEDIA_ASSETS: AssetMedia = {
  droneVideo: '/assets/aistudio/Earth_to_shop_drone_zoom_2ab5ee37_62fe55b6.mp4',
  ownerPhoto: '/assets/aistudio/IMG-20261118-WA0006_9925fc81.jpg',
  storefrontPhoto: '/assets/aistudio/file_0000000053d4821287c760f0b2d2538b_b35901ce.png',
  visitingCardPhoto: '/assets/aistudio/IMG-20261118-WA0003_82752910.jpg',
  sellerNoticePhoto: '/assets/aistudio/IMG-20261118-WA0004_bc829a77.jpg',
  officeRulesPhoto: '/assets/aistudio/IMG-20261118-WA0005_4fa6225f.jpg',
};

export const OFFICE_INFO = {
  brandEn: 'Kalka Properties',
  brandHi: 'कालका प्रोपर्टीज',
  phones: ['9811120585', '9899955243'],
  addressEn: 'Shop No. 10, Krishna Mandir, Near Pili Building School, Madangir, New Delhi - 110062',
  addressHi: 'दुकान नं. 10, कृष्ण मंदिर, पीली बिल्डिंग स्कूल के पास, मदनगीर, नई दिल्ली - 110062',
  visitFee: 500,
  hoursEn: 'Mon – Sun · 10:00 AM – 8:00 PM',
  hoursHi: 'सोमवार – रविवार · सुबह 10:00 – रात 8:00',
};

export const UNIFORM_LEASE_POLICY = {
  titleEn: 'Uniform 11-Month Lease Processing Across All Property Sizes',
  titleHi: '1BHK, 2BHK, 3BHK, 4BHK, दुकान, फार्महाउस व फ्लैट के लिए समान 11-माह लीज प्रक्रिया',
  summaryEn:
    'The 11-month lease processing method is identical across 1BHK, 2BHK, 3BHK, and 4BHK properties, as legal requirements for shops, farmhouses, and flats depend on the rent amount, security deposit, and state rules rather than the number of bedrooms.',
  summaryHi:
    '1BHK, 2BHK, 3BHK और 4BHK सभी संपत्तियों के लिए 11 महीने की लीज प्रक्रिया बिल्कुल समान है, क्योंकि फ्लैट, दुकान और फार्महाउस की कानूनी आवश्यकताएं कमरों की संख्या पर नहीं बल्कि किराये की राशि, सिक्योरिटी डिपॉजिट और राज्य के नियमों पर निर्भर करती हैं।',
  factorsEn: [
    'Rent Amount: Determines stamp duty calculation & 15-day brokerage slab.',
    'Security Deposit: Agreed advance & refundable deposit recorded on stamp paper.',
    'State Rules: Delhi Rent & Stamp Act norms apply equally to flats, shops & farmhouses.',
  ],
  factorsHi: [
    'किराये की राशि: इसी के आधार पर स्टाम्प ड्यूटी और 15-दिन की कमीशन तय होती है।',
    'सिक्योरिटी डिपॉजिट: एडवांस और रिफंडेबल राशि एग्रीमेंट में स्पष्ट दर्ज की जाती है।',
    'राज्य नियम: दिल्ली के स्टाम्प व किराया नियम फ्लैट, दुकान और फार्महाउस सभी पर समान लागू हैं।',
  ],
};

export interface ServiceItem {
  id: string;
  index: string;
  span: 'wide' | 'normal';
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  descEn: string;
  descHi: string;
  deliverablesEn: string[];
  deliverablesHi: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential-sales',
    index: '01',
    span: 'wide',
    titleEn: 'Residential Sale & Purchase Advisory',
    titleHi: 'आवासीय मकान, फ्लैट और फ्लोर क्रय-विक्रय',
    subtitleEn: 'Houses · Builder Floors · Flats · Verified Plots',
    subtitleHi: 'मकान · बिल्डर फ्लोर · फ्लैट · प्रमाणित प्लॉट',
    descEn:
      'End-to-end brokerage and advisory for buying and selling residential properties across Madangir and South Delhi. Every property undergoes strict ownership-chain, MCD allotment, and house-tax clearance verification before any deal.',
    descHi:
      'मदनगीर और दक्षिण दिल्ली में मकान, फ्लैट, फ्लोर और प्लॉट की खरीद-फरोख्त के लिए पूर्ण परामर्श। प्रत्येक संपत्ति का सौदा करने से पहले ओनर चेन, एम.सी.डी. आवंटन और हाउस टैक्स की गहन जांच की जाती है।',
    deliverablesEn: [
      'Complete ownership chain & MCD allotment slip audit',
      'Circle-rate registry & GPA documentation guidance',
      'Transparent 2% buyer brokerage linked with Bayana',
    ],
    deliverablesHi: [
      'संपूर्ण ओनर चेन और एम.सी.डी. अलॉटमेंट पर्ची की जांच',
      'सर्किल रेट के अनुसार रजिस्ट्री और जी.पी.ए. दस्तावेज़ मार्गदर्शन',
      'बयाने के साथ पारदर्शी 2% खरीदार कमीशन प्रक्रिया',
    ],
  },
  {
    id: 'commercial-leasing',
    index: '02',
    span: 'normal',
    titleEn: 'Commercial Shops, Rentals & 11-Month Leases',
    titleHi: 'दुकान, फार्महाउस, फ्लैट व 11-माह लीज सेवाएं',
    subtitleEn: '1BHK–4BHK Flats · Shops · Farmhouses · 11-Mo Agreements',
    subtitleHi: '1BHK–4BHK फ्लैट · दुकान · फार्महाउस · 11 माह एग्रीमेंट',
    descEn:
      'The 11-month lease processing method is identical across 1BHK, 2BHK, 3BHK, and 4BHK properties, as legal requirements for shops, farmhouses, and flats depend on rent amount, security deposit, and state rules rather than bedroom count.',
    descHi:
      '1BHK, 2BHK, 3BHK और 4BHK सभी संपत्तियों में 11 महीने के लीज एग्रीमेंट की प्रक्रिया समान रहती है—दुकान, फार्महाउस व फ्लैट के कानूनी नियम किराये, सिक्योरिटी डिपॉजिट और राज्य नियमों पर निर्भर करते हैं।',
    deliverablesEn: [
      'Identical 11-mo process for 1BHK–4BHK, shops & farmhouses',
      'Governed by rent amount, security deposit & state rules',
      'Mandatory police verification & 2-guarantor onboarding',
    ],
    deliverablesHi: [
      '1BHK–4BHK, दुकान व फार्महाउस हेतु समान 11-माह प्रक्रिया',
      'किराये की राशि, सिक्योरिटी डिपॉजिट व राज्य नियमों पर आधारित',
      'अनिवार्य पुलिस वेरिफिकेशन और 2 गारंटर की व्यवस्था',
    ],
  },
  {
    id: 'legal-rera',
    index: '03',
    span: 'normal',
    titleEn: 'Property Registration, RERA & Title Chain',
    titleHi: 'प्रॉपर्टी रजिस्ट्रेशन, रेरा और कानूनी दस्तावेज',
    subtitleEn: 'Sale Deed · GPA · Mutation · Succession NOC',
    subtitleHi: 'रजिस्ट्री · पावर ऑफ अटॉर्नी · दाखिल खारिज · वारिसना NOC',
    descEn:
      'Complete paperwork consulting for property registration, RERA compliance, Court Succession (Warisna), Dakhil Kharij, and family NOCs so titles remain 100% dispute-free.',
    descHi:
      'प्रॉपर्टी रजिस्ट्रेशन, रेरा (RERA), कोर्ट से वारिसना, दाखिल खारिज और सभी हकदारों की नॉन ऑब्जेक्शन सर्टिफिकेट (NOC) प्रक्रिया में पूर्ण सहयोग।',
    deliverablesEn: [
      'Succession & Dakhil Kharij verification for inherited assets',
      'Zero tolerance for encroached or court-disputed property',
      'Multi-heir NOC coordination before listing',
    ],
    deliverablesHi: [
      'वारिसना, दाखिल खारिज और मृत्यु प्रमाण पत्र की जांच',
      'कब्जे वाली या कोर्ट केस वाली प्रॉपर्टी का सख्त निषेध',
      'एक से अधिक हकदार होने पर अनिवार्य NOC समन्वय',
    ],
  },
  {
    id: 'loan-facility',
    index: '04',
    span: 'wide',
    titleEn: 'Home Loan Facilitation & Debt-Free Screening',
    titleHi: 'होम लोन सुविधा और ऋण-मुक्त प्रॉपर्टी जांच',
    subtitleEn: 'Loan Assistance · Clear-Title Only Policy',
    subtitleHi: 'लोन सुविधा उपलब्ध · बैंक-मुक्त स्पष्ट दस्तावेज नीति',
    descEn:
      'Dedicated loan facilitation for eligible flats, floors, and commercial spaces. We strictly screen out properties whose documents are pledged or mortgaged with any bank.',
    descHi:
      'योग्य फ्लैट, फ्लोर और दुकानों के लिए होम लोन की सुविधा उपलब्ध है। बैंक में रखी हुई या गिरवी प्रॉपर्टी के दस्तावेजों का कोई सौदा नहीं किया जाता।',
    deliverablesEn: [
      'Bank loan eligibility & document file preparation',
      'Strict ban on trading bank-mortgaged property papers',
      '3-month utility bill & tax clearance pre-check',
    ],
    deliverablesHi: [
      'बैंक लोन पात्रता और फाइल तैयार करने में सहायता',
      'बैंक में रखी संपत्ति के कागजात पर पूर्ण रोक',
      '3 महीने के बिजली-पानी बिल और हाउस टैक्स क्लियरेंस की जांच',
    ],
  },
];

export interface SellerDocumentItem {
  id: string;
  number: string;
  titleEn: string;
  titleHi: string;
  noteEn: string;
  noteHi: string;
}

export const SELLER_DOCUMENTS: SellerDocumentItem[] = [
  {
    id: 'mcd-allotment',
    number: '01',
    titleEn: 'MCD Allotment Slip (MCD की पर्ची / अलॉटमेंट पर्ची)',
    titleHi: 'MCD की पर्ची / अलॉटमेंट पर्ची',
    noteEn: 'Original municipal allotment slip & sanctioned layout plan (नक्शा).',
    noteHi: 'मूल एम.सी.डी. आवंटन पर्ची एवं स्वीकृत नक्शा।',
  },
  {
    id: 'water-bill',
    number: '02',
    titleEn: 'Water Connection Slip & Current Bill (3 Months)',
    titleHi: 'पानी लगाने की पर्ची और करंट बिल (3 महीने)',
    noteEn: 'Initial water installation receipt and last 3 months paid bills.',
    noteHi: 'पानी कनेक्शन की रसीद और पिछले 3 महीने का करंट बिल।',
  },
  {
    id: 'electricity-bill',
    number: '03',
    titleEn: 'Electricity Connection Slip & Current Bill (3 Months)',
    titleHi: 'बिजली लगाने की पर्ची और बिजली का करंट बिल (3 महीने)',
    noteEn: 'Meter installation slip and up-to-date 3-month electricity bills.',
    noteHi: 'मीटर लगाने की पर्ची और पिछले 3 महीने का बिजली का करंट बिल।',
  },
  {
    id: 'owner-poa',
    number: '04',
    titleEn: 'Owner Power of Attorney (GPA)',
    titleHi: 'मकान मालिक की ओनर पावर ऑफ अटॉर्नी',
    noteEn: 'Registered General Power of Attorney / Sale Deed in owner name.',
    noteHi: 'मकान मालिक के नाम पंजीकृत पावर ऑफ अटॉर्नी एवं संबंधित कागजात।',
  },
  {
    id: 'owner-chain',
    number: '05',
    titleEn: 'Complete Ownership Chain (ओनर चेन)',
    titleHi: 'संपूर्ण ओनर चेन',
    noteEn: 'Unbroken chain of previous registries/GPAs; if deceased, Warisna, Dakhil Kharij & Death Certificate required.',
    noteHi: 'पिछले सभी मालिकों की चेन; मालिक न होने पर कोर्ट से वारिसना, दाखिल खारिज व मृत्यु प्रमाण पत्र।',
  },
  {
    id: 'aadhaar-card',
    number: '06',
    titleEn: 'Aadhaar Card (आधार कार्ड)',
    titleHi: 'आधार कार्ड',
    noteEn: 'Self-attested copy of property owner Aadhaar card.',
    noteHi: 'संपत्ति मालिक का स्व-सत्यापित आधार कार्ड।',
  },
  {
    id: 'voter-card',
    number: '07',
    titleEn: 'Voter ID Card (वोटर कार्ड)',
    titleHi: 'वोटर कार्ड',
    noteEn: 'Valid Electoral Photo Identity Card for address verification.',
    noteHi: 'पहचान व पते के सत्यापन हेतु मान्य वोटर आईडी कार्ड।',
  },
  {
    id: 'pan-card',
    number: '08',
    titleEn: 'PAN Card (पैन कार्ड)',
    titleHi: 'पैन कार्ड',
    noteEn: 'Mandatory for property registration, TDS compliance & banking.',
    noteHi: 'रजिस्ट्री और वित्तीय लेन-देन के लिए अनिवार्य पैन कार्ड।',
  },
  {
    id: 'bank-details',
    number: '09',
    titleEn: 'Bank Account Details (बैंक डिटेल)',
    titleHi: 'बैंक डिटेल',
    noteEn: 'Passbook front page or cancelled cheque for transparent payment trail.',
    noteHi: 'सुरक्षित भुगतान के लिए बैंक पासबुक या कैंसिल चेक विवरण।',
  },
  {
    id: 'photos-4',
    number: '10',
    titleEn: '4 Passport-Size Photographs (4 फोटो)',
    titleHi: '4 पासपोर्ट साइज फोटो',
    noteEn: 'Recent colour photographs of the property owner/seller.',
    noteHi: 'संपत्ति मालिक की 4 नवीनतम पासपोर्ट साइज फोटो।',
  },
  {
    id: 'guarantors-2',
    number: '11',
    titleEn: '2 Verified Guarantors (2 गैरेंटर)',
    titleHi: '2 गैरेंटर (पहचान पत्र सहित)',
    noteEn: 'Two local witnesses/guarantors with valid ID proofs.',
    noteHi: 'मान्य पहचान पत्र के साथ दो विश्वसनीय गारंटर।',
  },
];

export type RuleCategory = 'all' | 'sellers' | 'buyers' | 'rent' | 'mcd';

export interface OfficeRule {
  id: string;
  category: Exclude<RuleCategory, 'all'>;
  titleEn: string;
  titleHi: string;
  detailEn: string;
  detailHi: string;
  highlight?: boolean;
}

export const OFFICE_RULES: OfficeRule[] = [
  {
    id: 'visit-fee',
    category: 'buyers',
    titleEn: 'Mandatory ₹500 Registration Fee Before Site Visits',
    titleHi: 'प्रॉपर्टी देखने से पहले ₹500/- रजिस्ट्रेशन फीस अनिवार्य',
    detailEn:
      'Every buyer, seller, or prospective tenant must pay a one-time ₹500 registration fee before any house or shop is shown.',
    detailHi:
      'खरीदने वाले, बेचने वाले या लीज पर मकान लेने वाले को पहले रजिस्ट्रेशन फीस ₹500/- देनी होगी। इसके बाद आपको मकान, दुकान दिखाई जाएगी।',
    highlight: true,
  },
  {
    id: 'buyer-commission',
    category: 'buyers',
    titleEn: '2% Buyer Commission & Documentation Charges',
    titleHi: 'खरीदार के लिए 2% कमीशन एवं दस्तावेज शुल्क',
    detailEn:
      '2% commission is payable upfront at the time of Bayana (token agreement). Circle-rate registry charges and ₹3,000 GPA fees are borne by the buyer.',
    detailHi:
      'खरीदार से 2% कमीशन बयाने के साथ पहले ही ली जाएगी। सर्किल रेट के अनुसार रजिस्ट्री के पैसे व जी.पी. के ₹3,000/- खरीदार को देने पड़ेंगे।',
  },
  {
    id: 'buyer-kyc',
    category: 'buyers',
    titleEn: 'Buyer KYC & Guarantor Package',
    titleHi: 'खरीदार के अनिवार्य दस्तावेज एवं गारंटर',
    detailEn:
      'Buyers must submit 4 photographs, PAN Card, Aadhaar Card, Driving Licence, Voter ID, and 2 verified Guarantors.',
    detailHi:
      'खरीदार को 4 फोटो, पैन कार्ड, आधार कार्ड, ड्राइविंग लाइसेंस, वोटर कार्ड और 2 गारंटर देने होंगे।',
  },
  {
    id: 'seller-succession',
    category: 'sellers',
    titleEn: 'Chain & Succession (Warisna / Dakhil Kharij)',
    titleHi: 'ओनर चेन, वारिसना और दाखिल खारिज नियम',
    detailEn:
      'If the named person on the MCD allotment, map, registry chain, or POA is deceased, Court/MCD Warisna (succession), Dakhil Kharij, and Death Certificate are mandatory.',
    detailHi:
      'एम.सी.डी. की आवंटन पर्ची, नक्शा, रजिस्ट्री या पावर ऑफ अटॉर्नी जिस व्यक्ति के नाम है यदि वह इस दुनिया में नहीं हैं, तो एम.सी.डी./कोर्ट से वारिसना, दाखिल खारिज और मृत्यु प्रमाण पत्र जरूरी है।',
  },
  {
    id: 'seller-clearances',
    category: 'sellers',
    titleEn: 'Cleared House Tax, Bills & Seller Documentation Cost',
    titleHi: 'हाउस टैक्स, 3 महीने के बिल और नए दस्तावेज खर्च',
    detailEn:
      'Last 3 months of water & electricity bills and previous House Tax must be cleared. Seller pays for preparing new seller-side registry/GPA papers.',
    detailHi:
      'बिजली व पानी का बिल 3 महीने का और पुराना हाउस टैक्स क्लियर होना चाहिए। नए दस्तावेज बनाने के लिए रजिस्ट्री या जी.पी. के पैसे सेलर को देने होंगे।',
  },
  {
    id: 'seller-dispute-ban',
    category: 'sellers',
    titleEn: 'Zero Tolerance: No Encroached, Mortgaged or Disputed Assets',
    titleHi: 'कब्जा, बैंक गिरवी या कोर्ट केस प्रॉपर्टी पर सख्त रोक',
    detailEn:
      'Encroached properties or documents pledged in a bank will not be traded. All legal heirs must furnish an NOC. Any hidden court case triggers a Section 420 FIR against the owner.',
    detailHi:
      'कब्जे वाली या बैंक में रखी हुई संपत्ति के डॉक्यूमेंट का सौदा नहीं होगा। ज्यादा हकदार होने पर सभी की NOC अनिवार्य है। कोर्ट केस पाए जाने पर ऑनर के विरुद्ध धारा 420 के तहत FIR होगी।',
    highlight: true,
  },
  {
    id: 'rent-terms',
    category: 'rent',
    titleEn: 'Uniform 11-Month Lease Method (1BHK–4BHK, Shops, Farmhouses & Flats)',
    titleHi: 'सभी श्रेणियों में समान 11-माह लीज नियम (1BHK–4BHK, दुकान व फार्महाउस)',
    detailEn:
      'The 11-month lease processing method is identical across 1BHK, 2BHK, 3BHK, and 4BHK properties, as legal, shop, farmhouse, and flat requirements depend on the rent amount, security deposit, and state rules rather than bedroom count. Standard terms: 15-day rent commission + 1-month advance + 1-month current rent with 2 guarantors.',
    detailHi:
      '1BHK, 2BHK, 3BHK और 4BHK संपत्तियों में 11 महीने की लीज प्रक्रिया समान है, क्योंकि दुकान, फार्महाउस और फ्लैट के कानूनी नियम कमरों की संख्या के बजाय किराये, सिक्योरिटी डिपॉजिट और राज्य नियमों पर निर्भर करते हैं। शुल्क: 15 दिन कमीशन + 1 माह एडवांस + 1 माह चालू किराया।',
  },
  {
    id: 'lease-terms',
    category: 'rent',
    titleEn: '5% Lease Commission & Mandatory Police Verification',
    titleHi: 'लीज पर मकान लेने के नियम एवं पुलिस वेरिफिकेशन',
    detailEn:
      'Long-term lease clients pay 5% commission and ₹2,000 agreement charges, with mandatory Police Verification completed prior to possession.',
    detailHi:
      'लीज पर मकान लेने वालों के लिए 5% कमीशन, ₹2,000/- एग्रीमेंट शुल्क और पुलिस वेरिफिकेशन कराना अनिवार्य होगा।',
  },
  {
    id: 'mcd-floor-warning',
    category: 'mcd',
    titleEn: 'MCD 4th & 5th Floor Prohibition & Sealing Disclaimer',
    titleHi: 'चौथा व पाँचवा फ्लोर तथा एम.सी.डी. सीलिंग चेतावनी',
    detailEn:
      '4th and 5th floors are NOT bought or sold through Kalka Properties. If MCD seals any building, the property dealer bears no liability.',
    detailHi:
      'चौथा और पाँचवा फ्लोर खरीदा और बेचा नहीं जाएगा। एम.सी.डी. की ओर से यदि बिल्डिंग सील होती है तो प्रॉपर्टी डीलर की कोई जिम्मेदारी नहीं होगी।',
    highlight: true,
  },
  {
    id: 'office-cctv-decorum',
    category: 'mcd',
    titleEn: '24/7 CCTV Surveillance & Office Decorum',
    titleHi: '24 घंटे CCTV निगरानी एवं कार्यालय अनुशासन',
    detailEn:
      'Office premises are monitored by CCTV cameras at all times. Visitors are requested not to loiter during idle hours and to maintain respectful language and decorum.',
    detailHi:
      'खाली समय में बैठकर अपना समय बेकार न करें और भाषा व संयम बनाये रखें। आप 24 घंटे CCTV कैमरे की निगरानी में हैं।',
    highlight: false,
  },
];

export interface TestimonialItem {
  id: string;
  clientName: string;
  localityEn: string;
  localityHi: string;
  serviceTagEn: string;
  serviceTagHi: string;
  quoteEn: string;
  quoteHi: string;
  rating: number;
}

export const CLIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-madangir-floor',
    clientName: 'Rajeev Verma',
    localityEn: 'Madangir · 2nd Floor Purchase',
    localityHi: 'मदनगीर · दूसरा फ्लोर खरीदारी',
    serviceTagEn: 'Clear-Title & Home Loan',
    serviceTagHi: 'स्पष्ट दस्तावेज व होम लोन',
    quoteEn:
      'Before paying Bayana, the team verified the entire ownership chain, MCD allotment slip, and previous house tax receipts. Their ₹500 visit policy kept everything organized and transparent.',
    quoteHi:
      'बयाना देने से पहले ही ऑफिस में पूरी ओनर चेन, एम.सी.डी. पर्ची और पुराना हाउस टैक्स जांचा गया। ₹500 विजिट नियम से काम बिल्कुल पारदर्शी रहा।',
    rating: 5,
  },
  {
    id: 't-shop-lease',
    clientName: 'Harish Chandra Gupta',
    localityEn: 'Krishna Mandir Road · Retail Shop',
    localityHi: 'कृष्ण मंदिर रोड · कमर्शियल दुकान',
    serviceTagEn: '11-Month Commercial Lease',
    serviceTagHi: '11-माह दुकान लीज एग्रीमेंट',
    quoteEn:
      'Took a retail shop near Krishna Mandir on an 11-month lease. Agreement fees, security deposit terms, and mandatory police verification were explained clearly upfront with zero hidden surprises.',
    quoteHi:
      'मुख्य रोड पर दुकान 11 महीने के एग्रीमेंट पर ली। एग्रीमेंट शुल्क, सिक्योरिटी डिपॉजिट और पुलिस वेरिफिकेशन की पूरी जानकारी पहले ही स्पष्ट दी गई।',
    rating: 5,
  },
  {
    id: 't-seller-docs',
    clientName: 'Suresh & Sunita Rawat',
    localityEn: 'Dakshinpuri · House Sale',
    localityHi: 'दक्षिणपुरी · मकान बिक्री',
    serviceTagEn: '11-Document Seller Audit',
    serviceTagHi: '11-दस्तावेज विक्रेता जांच',
    quoteEn:
      'Their 11-document seller checklist helped us arrange our Warisna, Dakhil Kharij, and 3-month paid utility bills in advance. Our buyer completed registration without any last-minute delay.',
    quoteHi:
      '11 दस्तावेजों की सूची से हमने वारिसना, दाखिल खारिज और 3 महीने के बिल पहले ही तैयार कर लिए। रजिस्ट्री बिना किसी देरी के पूरी हो गई।',
    rating: 5,
  },
  {
    id: 't-3bhk-rent',
    clientName: 'Ankita Chauhan',
    localityEn: 'Madangir · 3BHK Builder Floor',
    localityHi: 'मदनगीर · 3BHK फ्लोर किराया',
    serviceTagEn: '11-Month Rent Agreement',
    serviceTagHi: '11-माह किराया एग्रीमेंट',
    quoteEn:
      'We appreciated how straightforward the 11-month rental process was—15-day brokerage, 1-month advance, and guarantor verification were identical to their published office rules.',
    quoteHi:
      '11 महीने की किराया प्रक्रिया बहुत सीधी और साफ रही—15 दिन कमीशन, 1 माह एडवांस और 2 गारंटर नियम ऑफिस बोर्ड के बिल्कुल अनुसार थे।',
    rating: 5,
  },
  {
    id: 't-mcd-honesty',
    clientName: 'Deepak Malhotra',
    localityEn: 'Greater Kailash & Madangir',
    localityHi: 'साउथ दिल्ली · निवेश परामर्श',
    serviceTagEn: 'MCD Compliance Advisory',
    serviceTagHi: 'एम.सी.डी. नियम मार्गदर्शन',
    quoteEn:
      'Instead of pushing risky deals, Kalka Properties flatly advised against 4th and 5th floor units and bank-mortgaged papers. That honest screening saved our family from future sealing trouble.',
    quoteHi:
      'गलत सौदा कराने के बजाय कालका प्रोपर्टीज ने चौथे-पाँचवे फ्लोर और बैंक में रखे कागजात से साफ मना किया। उनकी ईमानदार सलाह ने हमें बड़े जोखिम से बचाया।',
    rating: 5,
  },
  {
    id: 't-farmhouse-lease',
    clientName: 'Vikramjit Singh',
    localityEn: 'Chhatarpur · 4BHK & Farmhouse',
    localityHi: 'छतरपुर · 4BHK व फार्महाउस',
    serviceTagEn: 'Uniform 11-Month Lease',
    serviceTagHi: 'समान 11-माह लीज प्रक्रिया',
    quoteEn:
      'Whether it was our 2BHK flat or a farmhouse lease inquiry, the 11-month documentation method stayed consistent—strictly anchored on rent amount, security deposit, and Delhi state rules.',
    quoteHi:
      'चाहे 2BHK फ्लैट हो या फार्महाउस, 11 महीने की कानूनी प्रक्रिया बिल्कुल एक जैसी रही—सिर्फ किराये, सिक्योरिटी डिपॉजिट और राज्य नियमों पर आधारित।',
    rating: 5,
  },
];

