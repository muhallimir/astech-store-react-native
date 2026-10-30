// Stock Availability Notification utilities - pure functions for TDD

export function checkStockAvailability(product, threshold = 5) {
  if (!product) return null;
  const stock = product.countInStock || 0;
  if (stock <= 0) {
    return { productId: product._id, status: 'out_of_stock', message: `${product.name} is out of stock`, notify: true };
  }
  if (stock <= threshold) {
    return { productId: product._id, status: 'low_stock', message: `Only ${stock} left of ${product.name}`, notify: true };
  }
  return { productId: product._id, status: 'in_stock', message: `${product.name} is in stock`, notify: false };
}

export function getStockNotificationMessage(alert) {
  if (!alert) return '';
  if (alert.status === 'out_of_stock') return `${alert.message}. We'll notify you when it's back.`;
  if (alert.status === 'low_stock') return `${alert.message}. Order soon!`;
  return alert.message;
}

export function filterLowStockProducts(products, threshold = 5) {
  if (!Array.isArray(products)) return [];
  return products.filter(p => (p.countInStock || 0) > 0 && (p.countInStock || 0) <= threshold);
}

export function filterOutOfStockProducts(products) {
  if (!Array.isArray(products)) return [];
  return products.filter(p => (p.countInStock || 0) <= 0);
}

export function getRestockEstimate(daysFromNow = 7) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString();
}