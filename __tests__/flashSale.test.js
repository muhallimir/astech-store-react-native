import { getTimeRemaining, formatCountdown, isFlashSaleActive, getDiscountedPrice, getFlashSaleBadge } from '../utils/flashSale';

describe('Flash Sale - ASTECH Feature 15', () => {
  test('getTimeRemaining returns time', () => {
    const future = new Date(Date.now() + 3600000);
    const remaining = getTimeRemaining(future);
    expect(remaining.expired).toBe(false);
    expect(remaining.hours).toBeGreaterThanOrEqual(0);
  });

  test('getTimeRemaining returns expired for past', () => {
    const past = new Date(Date.now() - 1000);
    const remaining = getTimeRemaining(past);
    expect(remaining.expired).toBe(true);
  });

  test('formatCountdown formats correctly', () => {
    expect(formatCountdown({ hours: 1, minutes: 30, seconds: 45, expired: false })).toBe('01:30:45');
    expect(formatCountdown({ expired: true })).toBe('Expired');
  });

  test('isFlashSaleActive checks time range', () => {
    const sale = {
      startTime: new Date(Date.now() - 1000),
      endTime: new Date(Date.now() + 3600000),
    };
    expect(isFlashSaleActive(sale)).toBe(true);
  });

  test('getDiscountedPrice calculates correctly', () => {
    expect(getDiscountedPrice(100, 20)).toBe(80);
    expect(getDiscountedPrice(100, 0)).toBe(100);
  });

  test('getFlashSaleBadge returns badge', () => {
    const badge = getFlashSaleBadge({ discountPercent: 30 });
    expect(badge.text).toBe('30% OFF');
  });
});