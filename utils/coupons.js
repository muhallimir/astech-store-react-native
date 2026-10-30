// Multiple Coupon Support utilities - pure functions for TDD

export const AVAILABLE_COUPONS = {
  SAVE10: { code: 'SAVE10', type: 'percent', value: 10, description: '10% off' },
  FLAT15: { code: 'FLAT15', type: 'fixed', value: 15, description: '$15 off' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, description: 'Free shipping' },
  SAVE20: { code: 'SAVE20', type: 'percent', value: 20, description: '20% off' },
};

export function validateCoupon(code) {
  if (!code) return { valid: false, error: 'Enter a code' };
  const coupon = AVAILABLE_COUPONS[code.toUpperCase()];
  if (!coupon) return { valid: false, error: 'Invalid promo code' };
  return { valid: true, coupon };
}

export function applyCoupons(subtotal, shipping, couponCodes) {
  if (!Array.isArray(couponCodes) || couponCodes.length === 0) {
    return { subtotal, shipping, discount: 0, appliedCoupons: [] };
  }

  let currentSubtotal = subtotal;
  let currentShipping = shipping;
  const applied = [];
  let totalDiscount = 0;

  for (const code of couponCodes) {
    const result = validateCoupon(code);
    if (!result.valid) continue;
    if (applied.some(c => c.code === result.coupon.code)) continue;

    const coupon = result.coupon;
    if (coupon.type === 'percent') {
      const discount = (currentSubtotal * coupon.value) / 100;
      currentSubtotal -= discount;
      totalDiscount += discount;
    } else if (coupon.type === 'fixed') {
      currentSubtotal = Math.max(0, currentSubtotal - coupon.value);
      totalDiscount += coupon.value;
    } else if (coupon.type === 'shipping') {
      currentShipping = 0;
    }
    applied.push(coupon);
  }

  return {
    subtotal: Math.max(0, currentSubtotal),
    shipping: currentShipping,
    discount: totalDiscount,
    appliedCoupons: applied,
  };
}

export function removeCoupon(appliedCoupons, code) {
  if (!Array.isArray(appliedCoupons)) return [];
  return appliedCoupons.filter(c => c.code !== code);
}

export function calculateTotal(subtotal, shipping) {
  return Math.max(0, subtotal + shipping);
}

export function getCouponSummary(appliedCoupons) {
  if (!Array.isArray(appliedCoupons) || appliedCoupons.length === 0) return 'No coupons applied';
  return appliedCoupons.map(c => c.code).join(', ');
}