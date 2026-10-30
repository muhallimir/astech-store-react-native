import {
  canCancelOrder,
  getCancelReasons,
  calculateRefund,
  getCancelMessage,
  formatOrderStatus,
  CANCELLABLE_STATUSES,
} from '../utils/orderCancel';

describe('Order Cancellation Utils - ASTECH Feature 5', () => {
  test('CANCELLABLE_STATUSES includes pending, processing, placed', () => {
    expect(CANCELLABLE_STATUSES).toContain('pending');
    expect(CANCELLABLE_STATUSES).toContain('processing');
    expect(CANCELLABLE_STATUSES).toContain('placed');
  });

  test('canCancelOrder returns true for cancellable', () => {
    expect(canCancelOrder({ status: 'pending' })).toBe(true);
    expect(canCancelOrder({ status: 'processing' })).toBe(true);
    expect(canCancelOrder({ status: 'placed' })).toBe(true);
  });

  test('canCancelOrder returns false for non-cancellable', () => {
    expect(canCancelOrder({ status: 'shipped' })).toBe(false);
    expect(canCancelOrder({ status: 'delivered' })).toBe(false);
    expect(canCancelOrder({ status: 'cancelled' })).toBe(false);
    expect(canCancelOrder(null)).toBe(false);
  });

  test('getCancelReasons returns array', () => {
    const reasons = getCancelReasons();
    expect(Array.isArray(reasons)).toBe(true);
    expect(reasons.length).toBeGreaterThan(0);
  });

  test('calculateRefund calculates correctly', () => {
    expect(calculateRefund({ totalPrice: 100 })).toBe(100);
    expect(calculateRefund({ totalPrice: 100 }, 10)).toBe(90);
    expect(calculateRefund({ total: 50 })).toBe(50);
  });

  test('calculateRefund handles null', () => {
    expect(calculateRefund(null)).toBe(0);
  });

  test('getCancelMessage formats correctly', () => {
    const msg = getCancelMessage({ _id: '123', status: 'pending', totalPrice: 100 });
    expect(msg).toContain('123');
    expect(msg).toContain('can be cancelled');
  });

  test('getCancelMessage for non-cancellable', () => {
    const msg = getCancelMessage({ _id: '456', status: 'shipped', totalPrice: 100 });
    expect(msg).toContain('cannot be cancelled');
  });

  test('formatOrderStatus capitalizes', () => {
    expect(formatOrderStatus('pending')).toBe('Pending');
    expect(formatOrderStatus('SHIPPED')).toBe('Shipped');
    expect(formatOrderStatus(null)).toBe('Unknown');
  });
});