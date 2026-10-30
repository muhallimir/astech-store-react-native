// ASTECH Feature 24: Delivery Estimator utilities

export function estimateDeliveryDate(shippingMethod, now = new Date()) {
  const days = { standard: 5, express: 2, overnight: 1 };
  const d = days[shippingMethod] || 5;
  const date = new Date(now);
  date.setDate(date.getDate() + d);
  return date;
}

export function formatDeliveryDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getShippingOptions() {
  return [
    { id: 'standard', name: 'Standard Shipping', days: 5, price: 0, description: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', days: 2, price: 9.99, description: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', days: 1, price: 24.99, description: 'Next business day' },
  ];
}

export function getShippingCost(method, orderTotal, freeThreshold = 50) {
  if (orderTotal >= freeThreshold && method === 'standard') return 0;
  const options = getShippingOptions();
  const option = options.find(o => o.id === method);
  return option ? option.price : 0;
}

export function isFreeShippingEligible(orderTotal, threshold = 50) {
  return orderTotal >= threshold;
}