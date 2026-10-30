import { getCategoryChips, getCategoryCount, isCategoryActive } from '../utils/categoryChips';

describe('Category Chips - ASTECH Feature 27', () => {
  const products = [
    { _id: '1', category: 'Electronics' },
    { _id: '2', category: 'Clothing' },
    { _id: '3', category: 'Electronics' },
  ];

  test('getCategoryChips returns unique categories', () => {
    const chips = getCategoryChips(products);
    expect(chips).toContain('All');
    expect(chips).toContain('Electronics');
    expect(chips).toContain('Clothing');
  });

  test('getCategoryCount counts correctly', () => {
    expect(getCategoryCount(products, 'Electronics')).toBe(2);
    expect(getCategoryCount(products, 'All')).toBe(3);
  });

  test('isCategoryActive checks', () => {
    expect(isCategoryActive('Electronics', 'Electronics')).toBe(true);
    expect(isCategoryActive('All', 'Electronics')).toBe(false);
  });
});