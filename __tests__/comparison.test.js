import {
  addToComparison,
  removeFromComparison,
  isInComparison,
  canAddMore,
  getComparisonFields,
  getComparisonValue,
  clearComparison,
  MAX_COMPARE,
} from '../utils/comparison';

describe('Product Comparison Utils - ASTECH Feature 1', () => {
  const product1 = { _id: '1', name: 'Laptop A', price: 999, rating: 4.5, category: 'Electronics', brand: 'Acer' };
  const product2 = { _id: '2', name: 'Laptop B', price: 1299, rating: 4.0, category: 'Electronics', brand: 'ASUS' };
  const product3 = { _id: '3', name: 'Shirt C', price: 50, rating: 3.5, category: 'Shirts', brand: 'Adidas' };

  test('MAX_COMPARE is 3', () => {
    expect(MAX_COMPARE).toBe(3);
  });

  test('addToComparison adds a product', () => {
    const result = addToComparison([], product1);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('1');
  });

  test('addToComparison does not add duplicate', () => {
    const result = addToComparison([product1], product1);
    expect(result).toHaveLength(1);
  });

  test('addToComparison does not add when max reached', () => {
    const full = [product1, product2, product3];
    const result = addToComparison(full, { _id: '4', name: 'New' });
    expect(result).toHaveLength(3);
  });

  test('addToComparison handles null/invalid product', () => {
    expect(addToComparison([], null)).toEqual([]);
    expect(addToComparison([], {})).toEqual([]);
    expect(addToComparison([], { name: 'No ID' })).toEqual([]);
  });

  test('removeFromComparison removes by id', () => {
    const result = removeFromComparison([product1, product2], '1');
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('2');
  });

  test('isInComparison checks membership', () => {
    expect(isInComparison([product1], '1')).toBe(true);
    expect(isInComparison([product1], '99')).toBe(false);
    expect(isInComparison([], '1')).toBe(false);
  });

  test('canAddMore returns true when under limit', () => {
    expect(canAddMore([])).toBe(true);
    expect(canAddMore([product1, product2])).toBe(true);
  });

  test('canAddMore returns false when at limit', () => {
    expect(canAddMore([product1, product2, product3])).toBe(false);
  });

  test('getComparisonFields returns common fields', () => {
    const fields = getComparisonFields([product1, product2]);
    expect(fields).toContain('name');
    expect(fields).toContain('price');
    expect(fields).toContain('rating');
  });

  test('getComparisonFields returns empty for no products', () => {
    expect(getComparisonFields([])).toEqual([]);
    expect(getComparisonFields(null)).toEqual([]);
  });

  test('getComparisonValue formats price', () => {
    expect(getComparisonValue(product1, 'price')).toBe('$999.00');
  });

  test('getComparisonValue formats rating', () => {
    expect(getComparisonValue(product1, 'rating')).toBe('4.5/5');
  });

  test('getComparisonValue returns N/A for missing', () => {
    expect(getComparisonValue(product1, 'nonexistent')).toBe('N/A');
    expect(getComparisonValue(null, 'name')).toBe('N/A');
  });

  test('clearComparison returns empty array', () => {
    expect(clearComparison()).toEqual([]);
  });
});