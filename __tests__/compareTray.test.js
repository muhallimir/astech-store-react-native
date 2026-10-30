import { addToCompareTray, removeFromCompareTray, canCompareProducts, getCompareTrayCount, clearCompareTray } from '../utils/compareTray';

describe('Compare Tray - ASTECH Feature 28', () => {
  const products = [
    { _id: '1', name: 'Laptop', category: 'Electronics' },
    { _id: '2', name: 'Mouse', category: 'Electronics' },
    { _id: '3', name: 'Shirt', category: 'Clothing' },
  ];

  test('addToCompareTray adds product', () => {
    const tray = addToCompareTray([], products[0]);
    expect(tray).toHaveLength(1);
  });

  test('addToCompareTray does not duplicate', () => {
    const tray = addToCompareTray([products[0]], products[0]);
    expect(tray).toHaveLength(1);
  });

  test('canCompareProducts checks category', () => {
    const result = canCompareProducts([products[0]], products[2]);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('Different category');
  });

  test('canCompareProducts allows same category', () => {
    const result = canCompareProducts([products[0]], products[1]);
    expect(result.ok).toBe(true);
  });

  test('getCompareTrayCount returns count', () => {
    expect(getCompareTrayCount([products[0]])).toBe(1);
    expect(getCompareTrayCount(null)).toBe(0);
  });

  test('clearCompareTray clears', () => {
    expect(clearCompareTray()).toEqual([]);
  });
});