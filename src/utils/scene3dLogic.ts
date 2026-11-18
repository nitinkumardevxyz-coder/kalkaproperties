export type FloorId = 'shop' | 'floor1' | 'floor2' | 'floor3';
export type CameraPresetId = 'isometric' | 'shopfront' | 'top';
export type LightingPresetId = 'day' | 'evening';

export interface FloorSpec {
  id: FloorId;
  code: string;
  titleEn: string;
  titleHi: string;
  usageEn: string;
  usageHi: string;
  eligibilityEn: string;
  eligibilityHi: string;
  baseY: number;
  explodedOffset: number;
}

export const FLOOR_SPECS: Record<FloorId, FloorSpec> = {
  shop: {
    id: 'shop',
    code: 'GF · Shop 10',
    titleEn: 'Ground Floor — Kalka Properties Office & Retail',
    titleHi: 'ग्राउंड फ्लोर — कालका प्रोपर्टीज ऑफिस एवं दुकान',
    usageEn: 'Commercial Shop · Direct Advisory Desk · Sale / Lease',
    usageHi: 'कमर्शियल दुकान · परामर्श केंद्र · सेल / लीज',
    eligibilityEn: 'MCD Commercial Verified · 11-Mo & Long Lease Eligible',
    eligibilityHi: 'एम.सी.डी. व्यावसायिक मान्य · 11 माह व लीज योग्य',
    baseY: 0.25,
    explodedOffset: 0,
  },
  floor1: {
    id: 'floor1',
    code: '1F · Floor',
    titleEn: 'First Floor — Verified Builder Floor',
    titleHi: 'पहला फ्लोर — प्रमाणित बिल्डर फ्लोर',
    usageEn: '2/3 BHK Residential · Registry & GPA Eligible',
    usageHi: '2/3 BHK आवासीय · रजिस्ट्री व जी.पी.ए. योग्य',
    eligibilityEn: 'Home Loan Available · 2% Buyer Brokerage',
    eligibilityHi: 'होम लोन उपलब्ध · 2% खरीदार कमीशन',
    baseY: 2.35,
    explodedOffset: 0.75,
  },
  floor2: {
    id: 'floor2',
    code: '2F · Floor',
    titleEn: 'Second Floor — Builder Floor with Balcony',
    titleHi: 'दूसरा फ्लोर — बालकनी सहित बिल्डर फ्लोर',
    usageEn: 'Residential Flat / Floor · Clear Title Chain',
    usageHi: 'आवासीय फ्लैट / फ्लोर · स्पष्ट ओनर चेन',
    eligibilityEn: 'Home Loan Available · 11-Month Rent Eligible',
    eligibilityHi: 'होम लोन उपलब्ध · 11 माह किराये हेतु योग्य',
    baseY: 4.15,
    explodedOffset: 1.5,
  },
  floor3: {
    id: 'floor3',
    code: '3F · Top Legal',
    titleEn: 'Third Floor — Top Permitted Floor & Roof Rights',
    titleHi: 'तीसरा फ्लोर — अंतिम मान्य मंजिल व छत सुविधा',
    usageEn: 'Top Legal Residential Floor (4th & 5th Prohibited)',
    usageHi: 'अंतिम मान्य आवासीय फ्लोर (4 व 5 फ्लोर निषिद्ध)',
    eligibilityEn: 'MCD Compliant · RERA & Registry Guidance',
    eligibilityHi: 'एम.सी.डी. अनुरूप · रजिस्ट्री व रेरा मार्गदर्शन',
    baseY: 5.95,
    explodedOffset: 2.25,
  },
};

export interface CameraPreset {
  id: CameraPresetId;
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_PRESETS: Record<CameraPresetId, CameraPreset> = {
  isometric: {
    id: 'isometric',
    position: [14.4, 9.2, 15.4],
    target: [0, 4.1, 0],
  },
  shopfront: {
    id: 'shopfront',
    position: [0.4, 3.2, 14.2],
    target: [0, 2.7, 0],
  },
  top: {
    id: 'top',
    position: [0.2, 19.5, 6.4],
    target: [0, 3.5, 0],
  },
};

export function computeFloorTargetY(floorId: FloorId, exploded: boolean): number {
  const spec = FLOOR_SPECS[floorId];
  return spec.baseY + (exploded ? spec.explodedOffset : 0);
}

export function computeMcdCapTargetY(exploded: boolean): number {
  return 7.95 + (exploded ? 3.05 : 0);
}

export function computePresetFraming(
  presetId: CameraPresetId,
  exploded: boolean,
  showMcdCap: boolean
): { position: [number, number, number]; target: [number, number, number] } {
  const base = CAMERA_PRESETS[presetId];
  if (!exploded && !showMcdCap) {
    return {
      position: [...base.position],
      target: [...base.target],
    };
  }

  // Expand viewing distance and raise vertical look-at target so taller
  // exploded stacks and the MCD 4th/5th floor wireframe remain unclipped.
  const distanceScale =
    exploded && showMcdCap ? 1.38 : exploded || showMcdCap ? 1.18 : 1.0;
  const targetLift =
    exploded && showMcdCap ? 2.1 : exploded ? 1.15 : showMcdCap ? 1.05 : 0;

  const targetY =
    presetId === 'top' ? base.target[1] + targetLift * 0.6 : base.target[1] + targetLift;

  const dx = base.position[0] - base.target[0];
  const dy = base.position[1] - base.target[1];
  const dz = base.position[2] - base.target[2];

  return {
    position: [
      base.target[0] + dx * distanceScale,
      targetY + dy * distanceScale,
      base.target[2] + dz * distanceScale,
    ],
    target: [base.target[0], targetY, base.target[2]],
  };
}
