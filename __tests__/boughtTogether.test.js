import { getBoughtTogether, getBundleDiscount, calculateBundlePrice, getBundleSavings } from '../utils/boughtTogether';

describe('Bought Together - ASTECH Feature 23', () => {
  const products = [
    { _id: '1', name: 'Laptop', category: 'Electronics', brand: 'Acer', price: 999 },
    { _id: '2', name: 'Mouse', category: 'Electronics', brand: 'Logitech', price: 25 },
    { _id: '3', name: 'Shirt', category: 'Clothing', brand: 'Nike', price: 50 },
  ];

  test('getBoughtTogether returns related', () => {
    const items = getBoughtTogether(products, '1', 2);
    expect(items.length).toBeGreaterThan(0);
    expect(items.every(i => i._id !== '1')).toBe(true);
  });

  test('getBundleDiscount returns discount', () => {
    expect(getBundleDiscount([products[0], products[1]])).toBe(10);
    expect(getBundleDiscount([products[0]])).toBe(0);
  });

  test('calculateBundlePrice calculates', () => {
    const price = calculateBundlePrice([products[0], products[1]], 10);
    expect(price).toBeCloseTo(921.6);
  });

  test('getBundleSavings calculates', () => {
    const savings = getBundleSavings([products[0], products[1]], 10);
    expect(savings).toBeCloseTo(102.4);
  });
});