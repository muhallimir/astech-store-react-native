import { SORT_OPTIONS, sortProducts, getSortLabel } from '../utils/sortSelect';

describe('Sort Select - ASTECH Feature 26', () => {
  const products = [
    { _id: '1', name: 'B', price: 100, rating: 4 },
    { _id: '2', name: 'A', price: 50, rating: 5 },
  ];

  test('SORT_OPTIONS has options', () => {
    expect(SORT_OPTIONS.length).toBeGreaterThan(0);
  });

  test('sortProducts sorts by price asc', () => {
    const sorted = sortProducts(products, 'price_asc');
    expect(sorted[0]._id).toBe('2');
  });

  test('sortProducts sorts by name', () => {
    const sorted = sortProducts(products, 'name');
    expect(sorted[0]._id).toBe('2');
  });

  test('getSortLabel returns label', () => {
    expect(getSortLabel('price_asc')).toBe('Price: Low to High');
  });
});