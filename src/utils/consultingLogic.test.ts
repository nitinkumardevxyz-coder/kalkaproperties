import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTransactionEstimate,
  calculateChecklistProgress,
  validateConsultationForm,
  formatINR,
  VISIT_REGISTRATION_FEE,
} from './consultingLogic';

test('calculates buyer 2% commission + ₹3,000 GPA + ₹500 visit registration', () => {
  const result = calculateTransactionEstimate('buy', 4000000);
  assert.equal(result.visitRegistrationFee, VISIT_REGISTRATION_FEE);
  assert.equal(result.commissionAmount, 80000);
  assert.equal(result.documentationFee, 3000);
  assert.equal(result.totalPayableToDeskAndAdvance, 83500);
});

test('calculates rental 15 days commission + 2 months advance/current + ₹500 visit fee', () => {
  const result = calculateTransactionEstimate('rent', 15000);
  assert.equal(result.commissionAmount, 7500);
  assert.equal(result.upfrontRentOrAdvance, 30000);
  assert.equal(result.totalPayableToDeskAndAdvance, 38000);
});

test('calculates lease 5% commission + ₹2,000 agreement + ₹500 visit fee', () => {
  const result = calculateTransactionEstimate('lease', 500000);
  assert.equal(result.commissionAmount, 25000);
  assert.equal(result.documentationFee, 2000);
  assert.equal(result.totalPayableToDeskAndAdvance, 27500);
});

test('handles zero or negative amounts safely without NaN', () => {
  const result = calculateTransactionEstimate('buy', -5000);
  assert.equal(result.baseAmount, 0);
  assert.equal(result.commissionAmount, 0);
  assert.equal(result.totalPayableToDeskAndAdvance, 3500);
});

test('computes seller 11-document readiness progress accurately', () => {
  assert.deepEqual(calculateChecklistProgress([], 11), {
    readyCount: 0,
    totalCount: 11,
    percent: 0,
    status: 'incomplete',
  });

  const partial = calculateChecklistProgress(['mcd-allotment', 'pan-card', 'pan-card'], 11);
  assert.equal(partial.readyCount, 2);
  assert.equal(partial.percent, 18);
  assert.equal(partial.status, 'partial');

  const complete = calculateChecklistProgress(
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    11
  );
  assert.equal(complete.status, 'ready');
  assert.equal(complete.percent, 100);
});

test('validates consultation form inputs and normalizes Indian phone numbers', () => {
  const invalid = validateConsultationForm({
    fullName: 'A',
    phone: '12345',
    transactionType: 'buy',
    propertyCategory: '',
    notes: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.propertyCategory);

  const valid = validateConsultationForm({
    fullName: 'Rajesh Sharma',
    phone: '+91 98111-20585',
    transactionType: 'buy',
    propertyCategory: 'Builder Floor',
    notes: 'Looking near Krishna Mandir',
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.normalizedPhone, '9811120585');
  assert.deepEqual(valid.errors, {});
});

test('formats INR cleanly with Indian grouping', () => {
  assert.equal(formatINR(150000), '₹1,50,000');
});

import {
  getUniformLeaseProcessingSummary,
  LEASE_UNIT_OPTIONS,
} from './consultingLogic';

test('applies identical 11-month lease processing across 1BHK, 2BHK, 3BHK, 4BHK, shops, farmhouses, and flats', () => {
  const summaries = LEASE_UNIT_OPTIONS.map((u) =>
    getUniformLeaseProcessingSummary(u.id, 22000)
  );
  const baseTotal = summaries[0].estimate.totalPayableToDeskAndAdvance;
  for (const s of summaries) {
    assert.equal(s.processingDurationMonths, 11);
    assert.equal(s.dependsOnBedrooms, false);
    assert.equal(s.estimate.totalPayableToDeskAndAdvance, baseTotal);
    assert.deepEqual(s.governingFactors, ['rent_amount', 'security_deposit', 'state_rules']);
  }
});

