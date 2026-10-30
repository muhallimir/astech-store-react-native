import { getFlashSaleProducts, getFlashSaleCountdown, formatFlashSaleCountdown, getFlashSaleDiscount, isFlashSaleActive } from '../utils/flashSaleBar';

describe('Flash Sale Bar - ASTECH Feature 20', () => {
  test('getFlashSaleProducts filters on sale', () => {
    const products = [{ _id: '1', onSale: true }, { _id: '2', onSale: false }];
    const result = getFlashSaleProducts(products, Date.now() + 10000);
    expect(result).toHaveLength(1);
  });

  test('getFlashSaleCountdown returns countdown', () => {
    const cd = getFlashSaleCountdown(new Date(Date.now() + 3600000));
    expect(cd.expired).toBe(false);
    expect(cd.hours).toBeGreaterThanOrEqual(0);
  });

  test('getFlashSaleCountdown returns expired', () => {
    const cd = getFlashSaleCountdown(new Date(Date.now() - 1000));
    expect(cd.expired).toBe(true);
  });

  test('formatFlashSaleCountdown formats', () => {
    expect(formatFlashSaleCountdown({ hours: 1, minutes: 30, seconds: 45, expired: false })).toBe('01:30:45');
    expect(formatFlashSaleCountdown({ expired: true })).toBe('Sale Ended');
  });

  test('getFlashSaleDiscount returns discount', () => {
    expect(getFlashSaleDiscount({ discountPercent: 20 })).toBe(20);
    expect(getFlashSaleDiscount(null)).toBe(0);
  });

  test('isFlashSaleActive checks time', () => {
    const sale = { startTime: new Date(Date.now() - 1000), endTime: new Date(Date.now() + 3600000) };
    expect(isFlashSaleActive(sale)).toBe(true);
  });
});