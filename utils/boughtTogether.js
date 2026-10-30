// ASTECH Feature 23: Bought Together utilities

export function getBoughtTogether(products, currentProductId, limit = 3) {
  if (!Array.isArray(products) || !currentProductId) return [];
  const current = products.find(p => (p._id || p.id) === currentProductId);
  if (!current) return [];
  return products
    .filter(p => (p._id || p.id) !== currentProductId)
    .filter(p => p.category === current.category || p.brand === current.brand)
    .slice(0, limit);
}

export function getBundleDiscount(items) {
  if (!Array.isArray(items) || items.length < 2) return 0;
  return 10; // 10% bundle discount
}

export function calculateBundlePrice(items, discountPercent = 10) {
  if (!Array.isArray(items)) return 0;
  const total = items.reduce((sum, i) => sum + (i.price || 0), 0);
  return total * (1 - discountPercent / 100);
}

export function getBundleSavings(items, discountPercent = 10) {
  if (!Array.isArray(items)) return 0;
  const total = items.reduce((sum, i) => sum + (i.price || 0), 0);
  return total * (discountPercent / 100);
}