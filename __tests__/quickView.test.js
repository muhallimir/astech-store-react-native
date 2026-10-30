import {
  getQuickViewData,
  formatQuickViewPrice,
  getStockStatus,
  truncateDescription,
} from '../utils/quickView';

describe('Quick View Utils - ASTECH Feature 3', () => {
  const product = {
    _id: '1',
    name: 'Laptop A',
    price: 999.99,
    image: 'https://example.com/img.jpg',
    rating: 4.5,
    numReviews: 10,
    description: 'A great laptop for gaming and work',
    category: 'Electronics',
    countInStock: 15,
  };

  test('getQuickViewData returns formatted data', () => {
    const data = getQuickViewData(product);
    expect(data.id).toBe('1');
    expect(data.name).toBe('Laptop A');
    expect(data.price).toBe(999.99);
    expect(data.inStock).toBe(true);
    expect(data.stockCount).toBe(15);
  });

  test('getQuickViewData handles null product', () => {
    expect(getQuickViewData(null)).toBeNull();
  });

  test('getQuickViewData handles missing fields', () => {
    const data = getQuickViewData({ _id: '2' });
    expect(data.name).toBe('Unknown Product');
    expect(data.price).toBe(0);
    expect(data.inStock).toBe(false);
  });

  test('formatQuickViewPrice formats correctly', () => {
    expect(formatQuickViewPrice(999.99)).toBe('$999.99');
    expect(formatQuickViewPrice(0)).toBe('$0.00');
  });

  test('getStockStatus returns out of stock', () => {
    const status = getStockStatus(0);
    expect(status.text).toBe('Out of Stock');
    expect(status.available).toBe(false);
  });

  test('getStockStatus returns low stock', () => {
    const status = getStockStatus(3);
    expect(status.text).toBe('Only 3 left');
    expect(status.available).toBe(true);
  });

  test('getStockStatus returns in stock', () => {
    const status = getStockStatus(15);
    expect(status.text).toBe('In Stock');
    expect(status.available).toBe(true);
  });

  test('truncateDescription truncates long text', () => {
    const long = 'A'.repeat(200);
    const result = truncateDescription(long, 150);
    expect(result.length).toBe(153); // 150 + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  test('truncateDescription returns short text as-is', () => {
    expect(truncateDescription('Short text')).toBe('Short text');
  });

  test('truncateDescription handles empty', () => {
    expect(truncateDescription('')).toBe('');
    expect(truncateDescription(null)).toBe('');
  });
});