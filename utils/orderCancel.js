// Order Cancellation utilities - pure functions for TDD

export const CANCELLABLE_STATUSES = ['pending', 'processing', 'placed'];

export function canCancelOrder(order) {
  if (!order) return false;
  const status = (order.status || '').toLowerCase();
  return CANCELLABLE_STATUSES.includes(status);
}

export function getCancelReasons() {
  return [
    'Changed my mind',
    'Found better price',
    'Ordered by mistake',
    'Delivery too slow',
    'Other',
  ];
}

export function calculateRefund(order, cancelFee = 0) {
  if (!order) return 0;
  const total = Number(order.totalPrice || order.total || 0);
  return Math.max(0, total - cancelFee);
}

export function getCancelMessage(order) {
  if (!order) return '';
  if (canCancelOrder(order)) {
    return `Order #${order._id || order.id} can be cancelled. Refund: $${calculateRefund(order).toFixed(2)}`;
  }
  return `Order #${order._id || order.id} cannot be cancelled (status: ${order.status})`;
}

export function formatOrderStatus(status) {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}