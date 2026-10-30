// Product comparison utilities - pure functions for TDD

export const MAX_COMPARE = 3;

export function addToComparison(current, product) {
  if (!product || !product._id) return current;
  if (current.some(p => p._id === product._id)) return current;
  if (current.length >= MAX_COMPARE) return current;
  return [...current, product];
}

export function removeFromComparison(current, productId) {
  return current.filter(p => p._id !== productId);
}

export function isInComparison(current, productId) {
  return current.some(p => p._id === productId);
}

export function canAddMore(current) {
  return current.length < MAX_COMPARE;
}

export function getComparisonFields(products) {
  if (!products || products.length === 0) return [];
  const fields = ['name', 'price', 'rating', 'category', 'brand'];
  return fields.filter(field => products.some(p => p[field] !== undefined));
}

export function getComparisonValue(product, field) {
  if (!product) return 'N/A';
  const val = product[field];
  if (val === undefined || val === null) return 'N/A';
  if (field === 'price') return `$${Number(val).toFixed(2)}`;
  if (field === 'rating') return `${val}/5`;
  return String(val);
}

export function clearComparison() {
  return [];
}