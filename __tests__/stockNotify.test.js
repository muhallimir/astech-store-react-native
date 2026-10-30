import {
  checkStockAvailability,
  getStockNotificationMessage,
  filterLowStockProducts,
  filterOutOfStockProducts,
  getRestockEstimate,
} from '../utils/stockNotify';

describe('Stock Notification Utils - ASTECH Feature 8', () => {
  test('checkStockAvailability returns out of stock', () => {
    const result = checkStockAvailability({ _id: '1', name: 'Laptop', countInStock: 0 });
    expect(result.status).toBe('out_of_stock');
    expect(result.notify).toBe(true);
  });

  test('checkStockAvailability returns low stock', () => {
    const result = checkStockAvailability({ _id: '1', name: 'Laptop', countInStock: 3 });
    expect(result.status).toBe('low_stock');
    expect(result.notify).toBe(true);
  });

  test('checkStockAvailability returns in stock', () => {
    const result = checkStockAvailability({ _id: '1', name: 'Laptop', countInStock: 15 });
    expect(result.status).toBe('in_stock');
    expect(result.notify).toBe(false);
  });

  test('checkStockAvailability handles null', () => {
    expect(checkStockAvailability(null)).toBeNull();
  });

  test('getStockNotificationMessage formats correctly', () => {
    const alert = checkStockAvailability({ _id: '1', name: 'Laptop', countInStock: 0 });
    const msg = getStockNotificationMessage(alert);
    expect(msg).toContain('out of stock');
    expect(msg).toContain('notify');
  });

  test('filterLowStockProducts filters correctly', () => {
    const products = [
      { _id: '1', countInStock: 3 },
      { _id: '2', countInStock: 15 },
      { _id: '3', countInStock: 0 },
    ];
    const result = filterLowStockProducts(products);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('1');
  });

  test('filterOutOfStockProducts filters correctly', () => {
    const products = [
      { _id: '1', countInStock: 3 },
      { _id: '2', countInStock: 0 },
    ];
    const result = filterOutOfStockProducts(products);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('2');
  });

  test('filterLowStockProducts handles null', () => {
    expect(filterLowStockProducts(null)).toEqual([]);
  });

  test('getRestockEstimate returns date string', () => {
    const estimate = getRestockEstimate(7);
    expect(typeof estimate).toBe('string');
    expect(estimate.length).toBeGreaterThan(0);
  });
});