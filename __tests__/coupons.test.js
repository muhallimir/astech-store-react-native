import {
  validateCoupon,
  applyCoupons,
  removeCoupon,
  calculateTotal,
  getCouponSummary,
  AVAILABLE_COUPONS,
} from '../utils/coupons';

describe('Multiple Coupon Utils - ASTECH Feature 9', () => {
  test('validateCoupon validates valid code', () => {
    const result = validateCoupon('SAVE10');
    expect(result.valid).toBe(true);
    expect(result.coupon.code).toBe('SAVE10');
  });

  test('validateCoupon rejects invalid code', () => {
    const result = validateCoupon('INVALID');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Invalid promo code');
  });

  test('validateCoupon rejects empty', () => {
    const result = validateCoupon('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Enter a code');
  });

  test('applyCoupons applies single percent coupon', () => {
    const result = applyCoupons(100, 10, ['SAVE10']);
    expect(result.subtotal).toBe(90);
    expect(result.discount).toBe(10);
    expect(result.appliedCoupons).toHaveLength(1);
  });

  test('applyCoupons applies multiple coupons', () => {
    const result = applyCoupons(100, 10, ['SAVE10', 'FLAT15']);
    expect(result.subtotal).toBe(75); // 100 - 10 - 15
    expect(result.discount).toBe(25);
    expect(result.appliedCoupons).toHaveLength(2);
  });

  test('applyCoupons applies free shipping', () => {
    const result = applyCoupons(100, 10, ['FREESHIP']);
    expect(result.shipping).toBe(0);
    expect(result.subtotal).toBe(100);
  });

  test('applyCoupons skips duplicates', () => {
    const result = applyCoupons(100, 10, ['SAVE10', 'SAVE10']);
    expect(result.appliedCoupons).toHaveLength(1);
  });

  test('applyCoupons skips invalid codes', () => {
    const result = applyCoupons(100, 10, ['INVALID', 'SAVE10']);
    expect(result.appliedCoupons).toHaveLength(1);
  });

  test('applyCoupons handles empty array', () => {
    const result = applyCoupons(100, 10, []);
    expect(result.subtotal).toBe(100);
    expect(result.shipping).toBe(10);
    expect(result.discount).toBe(0);
  });

  test('removeCoupon removes by code', () => {
    const coupons = [AVAILABLE_COUPONS.SAVE10, AVAILABLE_COUPONS.FLAT15];
    const result = removeCoupon(coupons, 'SAVE10');
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('FLAT15');
  });

  test('calculateTotal adds subtotal and shipping', () => {
    expect(calculateTotal(90, 10)).toBe(100);
    expect(calculateTotal(0, 0)).toBe(0);
  });

  test('getCouponSummary returns summary', () => {
    expect(getCouponSummary([AVAILABLE_COUPONS.SAVE10])).toBe('SAVE10');
    expect(getCouponSummary([])).toBe('No coupons applied');
  });
});