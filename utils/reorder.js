// Order Reorder utilities - pure functions for TDD

export function canReorder(order) {
  if (!order) return false;
  const status = (order.status || '').toLowerCase();
  return ['delivered', 'completed', 'cancelled'].includes(status);
}

export function getReorderItems(order) {
  if (!order || !Array.isArray(order.orderItems)) return [];
  return order.orderItems.map(item => ({
    product: item.product || item._id,
    name: item.name,
    qty: item.qty || item.quantity || 1,
    price: item.price,
    image: item.image,
  }));
}

export function getReorderTotal(order) {
  if (!order || !Array.isArray(order.orderItems)) return 0;
  return order.orderItems.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.qty || item.quantity || 1);
  }, 0);
}

export function formatReorderMessage(order) {
  if (!order) return '';
  const items = getReorderItems(order);
  const total = getReorderTotal(order);
  return `Reorder ${items.length} item(s) for $${total.toFixed(2)}`;
}

export function isReorderable(order) {
  return canReorder(order) && getReorderItems(order).length > 0;
}