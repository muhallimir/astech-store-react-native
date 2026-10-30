import {
  checkPriceDrop,
  getPriceDropBadge,
  filterPriceDrops,
  getPriceDropMessage,
  sortPriceDrops,
} from '../utils/priceDrop';

describe('Price Drop Alert Utils - ASTECH Feature 2', () => {
  const product = { _id: '1', name: 'Laptop', price: 899 };

  test('checkPriceDrop detects price drop', () => {
    const alert = checkPriceDrop(product, 999);
    expect(alert).not.toBeNull();
    expect(alert.dropAmount).toBe(100);
    expect(alert.percentDrop).toBe(10.0);
    expect(alert.isOnSale).toBe(true);
  });

  test('checkPriceDrop returns null when no drop', () => {
    expect(checkPriceDrop(product, 899)).toBeNull();
    expect(checkPriceDrop(product, 800)).toBeNull();
  });

  test('checkPriceDrop handles invalid input', () => {
    expect(checkPriceDrop(null, 100)).toBeNull();
    expect(checkPriceDrop(product, null)).toBeNull();
    expect(checkPriceDrop({ _id: '1', name: 'X', price: 'abc' }, 100)).toBeNull();
  });

  test('getPriceDropBadge returns badge info', () => {
    const alert = checkPriceDrop(product, 999);
    const badge = getPriceDropBadge(alert);
    expect(badge.text).toBe('10% OFF');
    expect(badge.color).toBe('#dc2626');
  });

  test('getPriceDropBadge returns null for no alert', () => {
    expect(getPriceDropBadge(null)).toBeNull();
  });

  test('filterPriceDrops filters valid alerts', () => {
    const alert = checkPriceDrop(product, 999);
    expect(filterPriceDrops([alert, null, undefined])).toHaveLength(1);
    expect(filterPriceDrops(null)).toEqual([]);
  });

  test('getPriceDropMessage formats message', () => {
    const alert = checkPriceDrop(product, 999);
    expect(getPriceDropMessage(alert)).toContain('Laptop');
    expect(getPriceDropMessage(alert)).toContain('10% off');
  });

  test('getPriceDropMessage returns empty for null', () => {
    expect(getPriceDropMessage(null)).toBe('');
  });

  test('sortPriceDrops sorts by percent drop desc', () => {
    const a1 = { percentDrop: 10 };
    const a2 = { percentDrop: 25 };
    const a3 = { percentDrop: 5 };
    const sorted = sortPriceDrops([a1, a2, a3]);
    expect(sorted[0].percentDrop).toBe(25);
    expect(sorted[2].percentDrop).toBe(5);
  });

  test('sortPriceDrops handles empty/null', () => {
    expect(sortPriceDrops(null)).toEqual([]);
    expect(sortPriceDrops([])).toEqual([]);
  });
});