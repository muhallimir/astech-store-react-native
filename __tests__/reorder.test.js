import {
  canReorder,
  getReorderItems,
  getReorderTotal,
  formatReorderMessage,
  isReorderable,
} from '../utils/reorder';

describe('Order Reorder Utils - ASTECH Feature 10', () => {
  const order = {
    _id: '123',
    status: 'delivered',
    orderItems: [
      { product: 'p1', name: 'Laptop', qty: 1, price: 999, image: 'img.jpg' },
      { product: 'p2', name: 'Mouse', qty: 2, price: 25, image: 'mouse.jpg' },
    ],
  };

  test('canReorder returns true for delivered', () => {
    expect(canReorder({ status: 'delivered' })).toBe(true);
    expect(canReorder({ status: 'completed' })).toBe(true);
    expect(canReorder({ status: 'cancelled' })).toBe(true);
  });

  test('canReorder returns false for pending/shipped', () => {
    expect(canReorder({ status: 'pending' })).toBe(false);
    expect(canReorder({ status: 'shipped' })).toBe(false);
    expect(canReorder(null)).toBe(false);
  });

  test('getReorderItems returns items', () => {
    const items = getReorderItems(order);
    expect(items).toHaveLength(2);
    expect(items[0].name).toBe('Laptop');
    expect(items[0].qty).toBe(1);
  });

  test('getReorderItems handles null/empty', () => {
    expect(getReorderItems(null)).toEqual([]);
    expect(getReorderItems({})).toEqual([]);
  });

  test('getReorderTotal calculates correctly', () => {
    expect(getReorderTotal(order)).toBe(1049); // 999 + 25*2
  });

  test('getReorderTotal handles null', () => {
    expect(getReorderTotal(null)).toBe(0);
  });

  test('formatReorderMessage formats correctly', () => {
    const msg = formatReorderMessage(order);
    expect(msg).toContain('2 item(s)');
    expect(msg).toContain('$1049.00');
  });

  test('formatReorderMessage handles null', () => {
    expect(formatReorderMessage(null)).toBe('');
  });

  test('isReorderable checks all conditions', () => {
    expect(isReorderable(order)).toBe(true);
    expect(isReorderable({ status: 'pending', orderItems: [] })).toBe(false);
    expect(isReorderable(null)).toBe(false);
  });
});